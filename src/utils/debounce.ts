import { Timeout } from '@/types';

/**
 * 防抖函数
 * @param fn 执行函数
 * @param delay 延迟时间
 * @returns 返回防抖后的函数
 */
export default function debounce<T extends any[]>(
    fn: (...args: T) => any,
    delay: number
): (...args: T) => void {
    let timer: Timeout = null;
    return function (this: any, ...args: T): void {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
