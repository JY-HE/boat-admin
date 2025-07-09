import elementResizeDetectorMaker, { ResizeDetector } from 'element-resize-detector';
import { Ref, shallowRef, unref } from 'vue';
import echarts, { ECOption } from '@/utils/eCharts';

/**
 * 统一处理 ECharts 实例
 * @param elRef 挂载 ECharts 的 ref 对象
 * @param options ECharts 配置项
 * @returns chartRef 实例 Ref
 * @returns initCharts 初始化方法
 * @returns setOptions 设置配置项
 * @returns clearCharts 清空图表
 * @returns resize 重新计算
 * @returns destroyCharts 销毁实例
 */
export const useECharts = (elRef: Ref<HTMLDivElement | null>, options?: ECOption) => {
    let resizeDetector: ResizeDetector | null = null;
    const chartRef = shallowRef<echarts.ECharts>();
    let timer: ReturnType<typeof setTimeout> | null = null;

    /**
     * 设置 ECharts 配置项
     * @param options 配置项
     */
    const setOptions = (options: ECOption) => {
        chartRef.value && chartRef.value.setOption(options);
    };

    // 初始化
    const initCharts = () => {
        // 获取 ref 对象的值
        const el = unref(elRef);
        if (!el) return;
        //  初始化 ECharts 实例
        chartRef.value = echarts.init(el);
        options && setOptions(options);
    };

    /**
     * 监听容器大小变化，自动调整图表大小
     */
    const resize = () => {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        resizeDetector = elementResizeDetectorMaker();
        if (elRef.value) {
            resizeDetector.listenTo(elRef.value, () => {
                timer = setTimeout(() => {
                    chartRef.value && chartRef.value.resize();
                }, 100);
            });
        }
    };

    /**
     * 销毁 ECharts 实例
     */
    const destroyCharts = () => {
        if (!chartRef.value) return;
        const dom = chartRef.value.getDom();
        // 只有在 DOM 还挂载在页面上的时候，才去 dispose
        if (dom.parentNode) {
            chartRef.value.dispose();
        }
        chartRef.value = undefined;
    };

    /**
     * 清除 ECharts 实例
     */
    const clearCharts = () => {
        chartRef.value && chartRef.value.clear();
    };

    onMounted(() => {
        resize();
    });

    onBeforeUnmount(() => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (elRef.value && resizeDetector) {
            resizeDetector.uninstall(elRef.value);
        }
        destroyCharts();
    });

    return {
        chartRef,
        initCharts,
        setOptions,
        clearCharts,
        resize,
        destroyCharts,
    };
};
