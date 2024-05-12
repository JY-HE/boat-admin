type CallbackFunction = undefined | ((data: any) => void);
type AdaptiveResolution = {
    ratio: number;
    wdRatio?: number;
};

/**
 * 获取当前分辨率对应比例的宽度值和比例
 * @returns {ratio: number, wdRatio: number}
 */
function getHtmlFontSize(designWidth: number, designHeight: number): AdaptiveResolution {
    const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    const fixRatio = designWidth / designHeight;
    let ratio = 0;
    if (!clientWidth)
        return {
            ratio: fixRatio,
        };
    if (clientWidth / clientHeight < fixRatio) {
        ratio = clientWidth / designWidth;
    } else {
        ratio = clientHeight / designHeight;
    }
    // 分辨率比例需要计算宽度和高度，不能仅仅计算宽度
    const wdRatio = clientWidth / designWidth / (clientHeight / designHeight);
    return { ratio: ratio, wdRatio };
}

/**
 * 设置 pc 端font-size
 * @param data { ratio: ratio, wdRatio }
 */
function pcSetRem(data: AdaptiveResolution) {
    const htmlObj = document.documentElement;
    const baseFontSize = data.ratio * 16;
    htmlObj.style.fontSize = `${baseFontSize}px`;
}

function reCalc(callback: CallbackFunction, designWidth: number, designHeight: number) {
    // 延时执行，确保页面尺寸稳定后再进行计算
    setTimeout(() => {
        const data = getHtmlFontSize(designWidth, designHeight);
        pcSetRem(data);
        // 回调方法，提供外界可以在分辨率改变时做一些事情
        callback && callback(data);
    }, 100);
}

export default function init(
    callback?: CallbackFunction,
    designWidth: number = 1920,
    designHeight: number = 1080
) {
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    if (!document.addEventListener) return;

    const onResize = () => reCalc(callback, designWidth, designHeight);
    window.addEventListener(resizeEvt, onResize, false);
    document.addEventListener('DOMContentLoaded', onResize, false);
}
