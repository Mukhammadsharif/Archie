import { PixelRatio, Dimensions } from 'react-native'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const widthBaseScale = SCREEN_WIDTH / 414
const heightBaseScale = SCREEN_HEIGHT / 896

function normalize(size, based = 'width') {
    const newSize = (based === 'height')
        ? size * heightBaseScale : size * widthBaseScale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

// for width  pixel
const widthPixel = (size) => normalize(size, 'width')
// for height  pixel
const heightPixel = (size) => normalize(size, 'height')
// for font  pixel
const fontPixel = (size) => heightPixel(size)
// for Margin and Padding vertical pixel
const pixelSizeVertical = (size) => heightPixel(size)
// for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size) => widthPixel(size)
export {
    widthPixel,
    heightPixel,
    fontPixel,
    pixelSizeVertical,
    pixelSizeHorizontal,
}
