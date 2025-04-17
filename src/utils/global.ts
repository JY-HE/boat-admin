/**
 * 获取图片路径
 * @param imgName assets/img/ 下的图片名称
 * @returns 图片的路径
 */
const images = import.meta.glob('@/assets/img/*', { eager: true });

export const getAssetsImg = (imgName: string) => {
    const imgPath = `/src/assets/img/${imgName}`;
    if (imgPath in images) {
        return (images[imgPath] as any).default;
    } else {
        throw new Error(`Image ${imgName} not found`);
    }
};

/**
 * 获取 CSS 变量的实际值
 * @param {string} variableName 变量名称
 * @param {string} opacity 透明度
 * @returns {string} 变量的值
 */
export const getCssVariableValue = (variableName: string, opacity = 1): string => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variableName);
    return `rgba(${value}, ${opacity})`;
};

/**
 * 实现数字千位分隔符格式化的方法，支持整数和负数处理
 * @param num 要格式化的数字
 * @returns 格式化后的字符串
 */
export const formatNumberWithCommas = (num: number) => {
    // 处理非数字类型输入
    if (typeof num !== 'number') return String(num);

    // 分解数字的符号、整数和小数部分
    const [sign, absNumber] = num < 0 ? ['-', Math.abs(num)] : ['', num];
    const numStr = String(absNumber);
    const [integerPart, decimalPart] = numStr.split('.');

    // 格式化整数部分
    let formattedInteger = '';
    let count = 0;

    // 从右向左遍历并插入逗号
    for (let i = integerPart.length - 1; i >= 0; i--) {
        formattedInteger = integerPart[i] + formattedInteger;
        count++;
        if (count % 3 === 0 && i !== 0) {
            formattedInteger = ',' + formattedInteger;
        }
    }

    // 合并所有部分
    return sign + formattedInteger + (decimalPart ? `.${decimalPart}` : '');
};
