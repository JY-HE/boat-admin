import { Timeout } from '@/types';

/**
 * 防抖函数
 * @param fn 执行函数
 * @param delay 延迟时间
 * @returns 返回防抖后的函数
 */
export function debounce<T extends any[]>(
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

/**
 * 防抖动的 ref 函数，用于 Vue3 的 Composition API。
 *
 * @param value 初始值
 * @param delay 防抖时间间隔，默认为 1000 毫秒
 * @returns 返回一个具有防抖功能的 ref 对象
 */
export function debounceRef<T>(value: T, delay = 1000) {
    let timer: Timeout = null;

    return customRef((track, trigger) => {
        return {
            get() {
                track(); // 依赖收集
                return value;
            },
            set(newValue: T) {
                if (timer !== null) {
                    clearTimeout(timer);
                    timer = null;
                }
                timer = setTimeout(() => {
                    value = newValue;
                    trigger(); // 派发更新
                }, delay);
            },
        };
    });
}
