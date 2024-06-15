import { DirectiveBinding } from 'vue';
import throttle from '@/utils/throttle';

// 定义 ThrottleBinding，继承 DirectiveBinding 并覆盖 'value' 属性的类型
interface ThrottleBinding extends Omit<DirectiveBinding, 'value'> {
    /**
     * 执行函数
     */
    value: (...args: any[]) => any;
    /**
     * 时间间隔
     */
    arg?: string;
}

const throttleDirective = {
    mounted(el: HTMLElement, binding: ThrottleBinding) {
        // 检查绑定的值是否是一个函数
        if (typeof binding.value !== 'function') {
            throw new Error('v-throttle directive expects a function as the value');
        }
        // 解析时间间隔，默认为 500 毫秒
        const limit =
            binding.arg !== undefined && binding.arg !== null ? parseInt(binding.arg) : 500;
        // 创建节流函数
        const throttledFunction = throttle(binding.value, limit);
        // 为元素添加点击事件监听器，使用节流函数
        el.addEventListener('click', throttledFunction);
        // 将节流函数保存到元素的自定义属性中，以便在 unmounted 钩子中访问
        (el as any)._throttledFunction = throttledFunction;
    },
    unmounted(el: HTMLElement) {
        // 访问保存的节流函数
        const throttledFunction = (el as any)._throttledFunction;
        // 移除点击事件监听器
        if (throttledFunction) {
            el.removeEventListener('click', throttledFunction);
        }
    },
};

export default throttleDirective;
