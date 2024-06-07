/**
 * 防抖动的 ref 函数，用于 Vue3 的 Composition API。
 *
 * @param value 初始值
 * @param delay 防抖时间间隔，默认为 1000 毫秒
 * @returns 返回一个具有防抖功能的 ref 对象
 */
function debounceRef<T>(value: T, delay = 1000) {
    let timer: ReturnType<typeof setTimeout> | null = null;

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

export default debounceRef;
