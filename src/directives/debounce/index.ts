import { DirectiveBinding } from 'vue';
import { debounce } from '@/utils/debounce';

// 定义 DebounceBinding，继承 DirectiveBinding 并覆盖 'value' 属性的类型
interface DebounceBinding extends Omit<DirectiveBinding, 'value'> {
    /**
     * 执行函数
     */
    value: (...args: any[]) => any;
    /**
     * 延迟时间
     */
    arg?: string;
}

const debounceDirective = {
    mounted(el: HTMLElement, binding: DebounceBinding) {
        // 检查绑定的值是否是一个函数
        if (typeof binding.value !== 'function') {
            throw new Error('v-debounce directive expects a function as the value');
        }
        // 解析延迟时间，默认为 500 毫秒
        const delay =
            binding.arg !== undefined && binding.arg !== null ? parseInt(binding.arg) : 500;
        // 创建防抖函数
        const debouncedFunction = debounce(binding.value, delay);
        // 为元素添加点击事件监听器，使用防抖函数
        el.addEventListener('click', debouncedFunction);
        // 将防抖函数保存到元素的自定义属性中，以便在 unmounted 钩子中访问
        (el as any)._debouncedFunction = debouncedFunction;
    },
    unmounted(el: HTMLElement) {
        // 访问保存的防抖函数
        const debouncedFunction = (el as any)._debouncedFunction;
        // 移除点击事件监听器
        if (debouncedFunction) {
            el.removeEventListener('click', debouncedFunction);
        }
    },
};

export default debounceDirective;
