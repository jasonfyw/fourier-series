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
 * Takes a base 64 encoded image and returns an array of the coordinates of the
 * edges in a continuous order
 * @param b64string image encoded as a base 64 string
 * @returns array of (x, y) coordinates
 */
export const getImageEdgePath = (b64string: string) : Array<Array<number>> => {
    let edgePixels = []
    let w = 0
    let h = 0
    let imageEdgePath = [[]] as Array<Array<number>>

    Image.load(Buffer.from(b64string, 'base64')).then((img) => {
        w = img.width
        h = img.height
        edgePixels = getBinaryPixelArray(img)
    })

    return imageEdgePath
}