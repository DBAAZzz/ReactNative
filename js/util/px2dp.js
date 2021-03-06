import { Dimensions } from 'react-native'

const deviceWidthDp = Dimensions.get('window').width;
const uiWidthPx = 640;

export default function px2dp(uiElementPx){
    return uiElementPx * deviceWidthDp / uiWidthPx;
}