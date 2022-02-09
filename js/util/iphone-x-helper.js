import { Dimensions, Platform } from 'react-native';


const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896
const PAD_WIDTH = 768
const PAD_HEIGHT = 1024
const IPADPRO11_WIDTH = 834
const IPADPRO11_HEIGHT = 1194
const IPADPRO129_HEIGHT = 1024
const IPADPRO129_WIDTH = 1366

const IPHONE12_H = 844;
const IPHONE12_MAX = 926;
const IPHONE12_Mini = 780;

const getResolvedDimensions = () => {
    const { width, height } = Dimensions.get('window')
    if (width === 0 && height === 0) return Dimensions.get('screen')
    return { width, height }
  }

const { height: D_HEIGHT, width: D_WIDTH } = getResolvedDimensions()

const isIphoneX = (() => {
    if (Platform.OS === 'web') return false
    return (
      (Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
          (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
      (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT) ||
      D_HEIGHT === IPHONE12_H
      // D_HEIGHT === IPHONE12_Max ||
      // D_HEIGHT === IPHONE12_Mini
    )
})

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else {
        return regularStyle
    }
}

