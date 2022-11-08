import Image from 'image-js';
const cannyEdgeDetector = require('canny-edge-detector');

const getBinaryPixelArray = (img: Image) : Array<number> => {
    const grey = img.grey()
    const edge = cannyEdgeDetector.default(grey, { lowThreshold: 100, highThreshold: 10, gaussianBlur: 1. })
    return edge.getPixelsArray().map((pixel: Array<number>) => pixel[0] === 0 ? 0 : 1)
}

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