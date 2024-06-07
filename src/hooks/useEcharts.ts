import { Ref, shallowRef, unref } from 'vue';

import echarts, { ECOption } from '@/utils/echarts';

export type EChartsCoreOption = ECOption;

/**
 * 统一处理 ECharts 实例
 * @param elRef 挂载 ECharts 的 ref 对象
 * @param options ECharts 配置项
 * @returns initCharts 初始化方法
 * @returns setOptions 设置配置项
 * @returns resize 重新计算
 */
const useECharts = (elRef: Ref<HTMLDivElement>, options: EChartsCoreOption) => {
    const charts = shallowRef<echarts.ECharts>();
    let timer: ReturnType<typeof setTimeout> | null = null;

    /**
     * 设置 ECharts 配置项
     * @param options 配置项
     */
    const setOptions = (options: EChartsCoreOption) => {
        charts.value && charts.value.setOption(options);
    };

    // 初始化
    const initCharts = (themeColor?: Array<string>) => {
        // 获取 ref 对象的值
        const el = unref(elRef);
        if (!el || !unref(el)) {
            return;
        }
        //  初始化 ECharts 实例
        charts.value = echarts.init(el);
        if (themeColor) {
            options.color = themeColor;
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
