export const EMOTIONS_DATA = {
    '/{huaji}': require('../../static/images/emoji/huaji.png'), /* 滑稽 */
    '/{goutou}': require('../../static/images/emoji/goutou.png'), /* 狗头 */
    '/{nb}': require('../../static/images/emoji/nb.png'), /* nb */   
    '/{pen}': require('../../static/images/emoji/pen.png'), /* 喷 */
    '/{pu}': require('../../static/images/emoji/pu.png'), /* 噗 */
    '/{qinqin}': require('../../static/images/emoji/qinqin.png'), /* 亲亲 */
    '/{qqgoutou}': require('../../static/images/emoji/qqgoutou.png'), /* qq狗头 */
    '/{tuosai}': require('../../static/images/emoji/tuosai.png'), /* 托腮 */
    '/{weiqu}': require('../../static/images/emoji/weiqu.png'), /* 委屈 */
    '/{weiweiyixiao}': require('../../static/images/emoji/weiweiyixiao.png'), /* 微微一笑 */
    '/{weixiao}': require('../../static/images/emoji/weixiao.png'), /* 微笑 */
    '/{wozuimei}': require('../../static/images/emoji/wozuimei.png'), /* 我最美 */
    '/{wunai}': require('../../static/images/emoji/wunai.png'), /* 无奈 */
    '/{wuyu}': require('../../static/images/emoji/wuyu.png'), /* 无语 */
    '/{xiaoku}': require('../../static/images/emoji/xiaoku.png'), /* 笑哭 */
    '/{ye}': require('../../static/images/emoji/ye.png'), /* 耶 */
    '/{yinxian}': require('../../static/images/emoji/yinxian.png'), /* 阴险 */
    '/{yiwen}}': require('../../static/images/emoji/yiwen.png'), /* 疑问 */
    '/{zaijian}': require('../../static/images/emoji/zaijian.png'), /* 再见 */
    '/{zhoumei}': require('../../static/images/emoji/zhoumei.png'), /* 皱眉 */
}

//符号->中文
export const EMOTIONS_ZHCN = {
    '/{huaji}': '[滑稽]',
    '/{goutou}': '[狗头]', 
    '/{nb}': '[nb]' ,
    '/{pen}':'[喷]',
    '/{pu}':'[噗]' ,
    '/{qinqin}':'[亲亲]', 
    '/{qqgoutou}':'[qq狗头]' ,
    '/{tuosai}':'[托腮]' ,
    '/{weiqu}':'[委屈]' ,
    '/{weiweiyixiao}':'[微微一笑]',
    '/{weixiao}':'[微笑]',
    '/{wozuimei}':'[我最美]',
    '/{wunai}':'[无奈] ',
    '/{wuyu}':'[无语]' ,
    '/{xiaoku}':'[笑哭]' ,
    '/{ye}': '[耶]' ,
    '/{yinxian}':'[阴险]', /*  */
    '/{yiwen}}':'[疑问]' , /*  */
    '/{zaijian}': '[再见]',
    '/{zhoumei}': '[皱眉]'
};

//反转对象的键值
export const invertKeyValues = obj =>
    Object.keys(obj).reduce((acc, key) => {
        acc[obj[key]] = key;
        return acc;
    }, {});