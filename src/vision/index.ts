import Image from 'image-js';
const cannyEdgeDetector = require('canny-edge-detector');

/**
 * Returns an array of 1s and 0s where a 1 denotes an edge pixel determined by
 * the Canny algorithm
 * @param img image object
 * @returns binary array representing where the edges within the image are
 */
const getBinaryPixelArray = (img: Image) : Array<number> => {
    const grey = img.grey()
    const edge = cannyEdgeDetector.default(grey, { lowThreshold: 100, highThreshold: 10, gaussianBlur: 1. })
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
const convertToCoordinates = (edgePixels: Array<number>, w: number) : Array<Array<number>> => {
    let imageEdgePath = [] as Array<Array<number>>
    for (let i = 0; i < edgePixels.length; i++) {
        if (edgePixels[i] > 0) {
            imageEdgePath.push([i % w, Math.floor(i / w)])
        }
    }
    return imageEdgePath
}

/**
 * Takes a base 64 encoded image and returns an array of the coordinates of the
 * edges in a continuous order
 * @param b64string image encoded as a base 64 string
 * @returns array of (x, y) coordinates
 */
export const getImageEdgePath = (b64string: string) : Array<Array<number>> => {
    let edgePixels = [] as Array<number>
    let w = 0

    Image.load(Buffer.from(b64string, 'base64')).then((img) => {
        w = img.width
        edgePixels = getBinaryPixelArray(img)
    })

    return convertToCoordinates(edgePixels, w)
}