/**
 * 节流函数
 * @param fn 执行函数
 * @param limit 时间间隔
 * @returns 返回节流后的函数
 */
export default function throttle<T extends any[]>(
    fn: (...args: T) => any,
    limit: number
): (...args: T) => void {
    // 存储上次调用的时间戳
    let lastCall = 0;
    return function (this: any, ...args: T): void {
        // 获取当前时间戳
        const now = Date.now();
        // 如果距离上次调用的时间超过了限制时间
        if (now - lastCall >= limit) {
            // 更新上次调用的时间戳
            lastCall = now;
            fn.apply(this, args);
        }
    };
}
