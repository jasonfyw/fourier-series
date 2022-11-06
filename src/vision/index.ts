import Image from 'image-js';
const cannyEdgeDetector = require('canny-edge-detector');

const detectEdges = (b64string: string) : Array<Array<number>> => {
    let pixels = [[]]
    Image.load(Buffer.from(b64string, 'base64')).then((img) => {
        const grey = img.grey()
        const edge = cannyEdgeDetector.default(grey, { lowThreshold: 100, highThreshold: 10, gaussianBlur: 1. })
        pixels = edge.getPixelsArray()
    })
    return pixels
}

export {}