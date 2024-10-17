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

/**
 * 重新计算并设置根元素的字体大小
 *
 * @param {CallbackFunction} callback 在分辨率改变时可选的回调函数，接收计算结果作为参数。
 * @param {number} designWidth 设计图的宽度，用于计算根字体大小。
 * @param {number} designHeight 设计图的高度，用于计算根字体大小。
 *
 * @example
 * reCalc((data) => {
 *     console.log('根字体大小已更新:', data);
 * }, 1920, 1080);
 */
function reCalc(callback: CallbackFunction, designWidth: number, designHeight: number) {
    // 延时执行，确保页面尺寸稳定后再进行计算
    setTimeout(() => {
        const data = getHtmlFontSize(designWidth, designHeight);
        pcSetRem(data);
        // 回调方法，提供外界可以在分辨率改变时做一些事情
        callback && callback(data);
    }, 100);
}

/**
 * 适应屏幕分辨率并执行回调函数
 *
 * @param {CallbackFunction} [callback] 可选的回调函数，在每次窗口大小调整时执行。
 * @param {number} [designWidth=1920] 设计图的宽度，默认为 1920。
 * @param {number} [designHeight=1080] 设计图的高度，默认为 1080。
 * @returns {Promise<void>} 返回一个 Promise，表示初始化完成。
 *
 * @example
 * adaptiveResolution(() => {
 *     console.log('屏幕尺寸已调整');
 * });
 */
export default function adaptiveResolution(
    callback?: CallbackFunction,
    designWidth = 1920,
    designHeight = 1080
): Promise<void> {
    return new Promise<void>(resolve => {
        const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        if (!document.addEventListener) {
            resolve();
            return;
        }
        const onResize = () => {
            reCalc(callback, designWidth, designHeight);
            resolve();
        };
        window.addEventListener(resizeEvt, onResize, false);
        document.addEventListener('DOMContentLoaded', onResize, false);
    });
}
