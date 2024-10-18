import elementResizeDetectorMaker, { ResizeDetector } from 'element-resize-detector';
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
    let resizeDetector: ResizeDetector | null = null;
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
                    charts.value && charts.value.resize();
                }, 100);
            });
        }
    };

    onMounted(() => {
        resize();
    });

    onBeforeUnmount(() => {
        charts.value && charts.value.dispose();
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (elRef.value && resizeDetector) {
            resizeDetector.uninstall(elRef.value);
        }
    });

    return {
        initCharts,
        setOptions,
        resize,
    };
};

export { useECharts };
