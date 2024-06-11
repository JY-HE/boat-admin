import { Ref, shallowRef, unref } from 'vue';

import echarts, { ECOption } from '@/utils/eCharts';

/**
 * 统一处理 ECharts 实例
 * @param elRef 挂载 ECharts 的 ref 对象
 * @param options ECharts 配置项
 * @returns initCharts 初始化方法
 * @returns setOptions 设置配置项
 * @returns resize 重新计算
 */
const useECharts = (elRef: Ref<HTMLDivElement | null>, options: ECOption) => {
    const charts = shallowRef<echarts.ECharts>();
    let timer: ReturnType<typeof setTimeout> | null = null;

    /**
     * 设置 ECharts 配置项
     * @param options 配置项
     */
    const setOptions = (options: ECOption) => {
        charts.value && charts.value.setOption(options);
    };

    // 初始化
    const initCharts = (themeColor?: Array<string>) => {
        // 获取 ref 对象的值
        const el = unref(elRef);
        if (!el) {
            return;
        }
        //  初始化 ECharts 实例
        charts.value = echarts.init(el);
        if (themeColor) {
            // 创建一个新的配置项对象，避免直接修改传入的options
            const newOptions = { ...options, color: themeColor };
            setOptions(newOptions);
        }
        setOptions(options);
    };

    /**
     * 重新窗口变化时，重新计算
     */
    const resize = () => {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            charts.value && charts.value.resize();
        }, 100);
    };

    onMounted(() => {
        window.addEventListener('resize', resize);
    });

    /**
     * 页面keepAlive时，不监听页面
     */
    onDeactivated(() => {
        window.removeEventListener('resize', resize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', resize);
        charts.value && charts.value.dispose();
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    });

    return {
        initCharts,
        setOptions,
        resize,
    };
};

export { useECharts };
