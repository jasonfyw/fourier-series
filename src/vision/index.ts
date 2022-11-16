import Image from 'image-js';
import _ from 'lodash';
const cannyEdgeDetector = require('canny-edge-detector');
var Buffer = require('buffer/').Buffer

/**
 * Returns an array of 1s and 0s where a 1 denotes an edge pixel determined by
 * the Canny algorithm
 * @param img image object
 * @returns binary array representing where the edges within the image are
 */
const getBinaryPixelArray = (img: Image) : Array<number> => {
    const grey = img.grey()
    const edge = cannyEdgeDetector.default(grey, { lowThreshold: 50, highThreshold: 80, gaussianBlur: 1. })
    return edge.getPixelsArray().map((pixel: Array<number>) => pixel[0] === 0 ? 0 : 1)
}

/**
 * Converts an array of binary pixel values to an array of coordinates describing 
 * the location of pixels with value 1 given the width of the original image. 
 * This is done in order from left to right, up to down
 * @param edgePixels array of binary pixel values
 * @param w width of the original image
 * @returns array of (x, y) coordinates
 */
const convertToCoordinates = (edgePixels: Array<number>, w: number, h: number) : Array<[number, number]> => {
    let imageEdgePath = [] as Array<[number, number]>
    for (let i = 0; i < edgePixels.length; i++) {
        if (edgePixels[i] > 0) {
            imageEdgePath.push(
                [i % w - Math.floor(w/2), -Math.floor(i / w) + Math.floor(h/2)]
            )
        }
    }

    // compresses coordinates by <factor> to reduce the number of points
    // const factor = 2
    // imageEdgePath = imageEdgePath.map(p => (
    //     [Math.floor(p[0] / factor) * factor, Math.floor(p[1] / factor) * factor]
    // ))

    var seen: { [k: string]: boolean } = {};
    imageEdgePath = imageEdgePath.filter((item) => {
        var k = JSON.stringify(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })

    return imageEdgePath
}

/**
 * Returns <coordinates> in an order such that the distance between consecutive
 * points is locally minimised (the optimal solution is NP-hard but this approach
 * is close enough and only O(n^2))
 * @param coordinates array of [x, y] coordinates
 * @returns array of [x, y] coordinates
 */
const getOptimisedPath = (coordinates: Array<[number, number]>) : Array<[number, number]> => {
    const n = coordinates.length
    let curr = 0
    let path = [curr]
    // iterate over all points, calculate the distance to every other point not
    // in <path> and pick the closes point to be the next point in <path>
    for (let i of _.range(n)) {
        let dists = []
        for (let j of _.range(n)) {
            if (j !== i && !path.includes(j)) {
                const [x1, y1] = coordinates[curr]
                const [x2, y2] = coordinates[j]
                const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
                dists.push([dist, j])
            }
        }

        // get index with least distance
        let min_dist = Infinity
        let min_j = 0
        for (let [dist, j] of dists) {
            if (dist < min_dist) {
                min_j = j
                min_dist = dist
            }
        }
        path.push(min_j)
        curr = min_j
    }
    
    // omit the last value because it is a duplicate 0
    path = path.slice(0,-1)
    // create a copy of <coordinates> with each value at indices denote in <path>
    let res = [...Array(n)]
    for (let i of _.range(n)) res[i] = coordinates[path[i]]

    return res
}

/**
 * Takes a base 64 encoded image and returns an array of the coordinates of the
 * edges in a continuous order
 * @param b64string image encoded as a base 64 string
 * @returns array of (x, y) coordinates
 */
export const getImageEdgePath = async (b64string: string) : Promise<Array<[number, number]>> => {
    return await Image.load(Buffer.from(b64string.slice(22), 'base64')).then((img) => {
        const [w, h] = [img.width, img.height]
        const edgePixels = getBinaryPixelArray(img)
        return getOptimisedPath(convertToCoordinates(edgePixels, w, h))
    })
}