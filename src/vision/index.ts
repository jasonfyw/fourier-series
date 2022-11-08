import Image from 'image-js';
const cannyEdgeDetector = require('canny-edge-detector');

const getPixelArray = (img: Image) : Array<Array<number>> => {
    const grey = img.grey()
    const edge = cannyEdgeDetector.default(grey, { lowThreshold: 100, highThreshold: 10, gaussianBlur: 1. })
    return edge.getPixelsArray()
}

export const getImageEdgePath = (b64string: string) : Array<Array<number>> => {
    let pixels = [[]] as Array<Array<number>>
    let w = 0
    let h = 0
    let imageEdgePath = [[]] as Array<Array<number>>

    Image.load(Buffer.from(b64string, 'base64')).then((img) => {
        w = img.width
        h = img.height
        pixels = getPixelArray(img)
    })

    return imageEdgePath
}