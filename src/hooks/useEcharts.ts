import { Ref, shallowRef, unref, onMounted, onBeforeUnmount } from 'vue';
import echarts, { ECOption } from '@/utils/eCharts';

/**
 * 统一处理 ECharts 实例，使用原生 ResizeObserver 自动监听容器尺寸变化
 * @param elRef 挂载 ECharts 的 ref 对象
 * @param options ECharts 配置项
 * @returns chartRef 实例 Ref
 * @returns initCharts 初始化方法
 * @returns setOptions 设置配置项
 * @returns clearCharts 清空图表
 * @returns destroyCharts 销毁实例
 */
export const useECharts = (elRef: Ref<HTMLDivElement | null>, options?: ECOption) => {
    const chartRef = shallowRef<echarts.ECharts>();
    let ro: ResizeObserver | null = null;

    /**
     * 初始化 ECharts 实例
     */
    const initCharts = () => {
        const el = unref(elRef);
        if (!el) return;
        chartRef.value = echarts.init(el);
        options && chartRef.value.setOption(options);
        // 初始化后绑定 ResizeObserver
        if (ro && elRef.value) {
            ro.observe(elRef.value);
        }
    };

    /**
     * 设置 ECharts 配置项
     */
    const setOptions = (opts: ECOption) => {
        chartRef.value && chartRef.value.setOption(opts);
    };

    /**
     * 清除 ECharts 内容
     */
    const clearCharts = () => {
        chartRef.value && chartRef.value.clear();
    };

    /**
     * 销毁 ECharts 实例
     */
    const destroyCharts = () => {
        if (!chartRef.value) return;
        const dom = chartRef.value.getDom();
        if (dom.parentNode) {
            chartRef.value.dispose();
        }
        chartRef.value = undefined;
        // 解绑 ResizeObserver
        if (ro && elRef.value) {
            ro.unobserve(elRef.value);
        }
    };

    onMounted(() => {
        // 创建 ResizeObserver 但不立即初始化图表
        ro = new ResizeObserver(() => {
            chartRef.value?.resize();
        });
    });

    onBeforeUnmount(() => {
        if (ro && elRef.value) {
            ro.disconnect();
        }
        destroyCharts();
    });

    return {
        chartRef,
        initCharts,
        setOptions,
        clearCharts,
        destroyCharts,
    };
};
