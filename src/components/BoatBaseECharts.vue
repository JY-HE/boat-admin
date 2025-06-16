<template>
    <div class="BoatBaseECharts">
        <div
            ref="echartsRef"
            :style="{
                width: '100%',
                height: '100%',
            }"
        ></div>
    </div>
</template>

<script setup lang="ts">
import type { LegendComponentOption } from 'echarts/components';
import { ECOption } from '@/utils/eCharts';
import { useECharts } from '@/hooks/useEcharts';
import { useSystemConfigStore } from '@/store';
import { getCssVariableValue } from '@/utils/global';

const props = withDefaults(
    defineProps<{
        options: ECOption;
        textColorAuto?: boolean;
    }>(),
    { textColorAuto: true }
);

const TEXT_COLOR = ref(getCssVariableValue('--chartTextColor'));
const FONT_SIZE = '12px';
const DARK_COLORS = ['#3966A2', '#457B9D', '#DBBACB', '#2161D3', '#C2C0D8', '#457B9D'];
const LIGHT_COLORS = ['#8AA4C7', '#F3CFD0', '#96B9D9', '#8C618C', '#6B8AA6'];

const echartsRef = ref<HTMLDivElement | null>(null);
const { setOptions, initCharts } = useECharts(echartsRef);
const systemConfigStore = useSystemConfigStore();
const emits = defineEmits(['dark-change']);

/**
 * 处理配置项并设置主题相关的选项
 * @param isDark 是否暗黑主题
 * @param options 图表配置项
 */
function handleThemeOptions(isDark: boolean, options: ECOption): ECOption {
    TEXT_COLOR.value = getCssVariableValue('--chartTextColor');
    const modifiedOptions: ECOption = {
        ...options,
        darkMode: isDark,
        color: isDark ? DARK_COLORS : LIGHT_COLORS,
    };
    return props.textColorAuto ? applyTextColor(modifiedOptions) : modifiedOptions;
}

/**
 * 应用文本颜色配置
 * @param options 图表配置项
 */
function applyTextColor(options: ECOption): ECOption {
    // 设置标题文本
    setTitleTextColor(options);
    // 设置图例文本
    setLegendTextColor(options);
    // 设置坐标轴文本
    setAxisTextColor(options);
    // 设置 xAxis
    setXAxisAxisTick(options);
    // 设置 yAxis
    setYAxisSplitLineColor(options);
    return options;
}

/**
 * 设置 title 文本颜色和字体大小
 * @param options 图表配置项
 */
function setTitleTextColor(options: ECOption): ECOption {
    if (Array.isArray(options.title)) {
        options.title.forEach(title => {
            title.textStyle = title.textStyle || {};
            title.textStyle.color = TEXT_COLOR.value;
            title.textStyle.fontSize = title.textStyle?.fontSize ?? FONT_SIZE;
        });
    } else if (options.title) {
        options.title.textStyle = options.title.textStyle || {};
        options.title.textStyle.color = TEXT_COLOR.value;
        options.title.textStyle.fontSize = options.title.textStyle?.fontSize ?? FONT_SIZE;
    }
    return options;
}

/**
 * 设置图例文本颜色和字体大小
 * @param options 图表配置项
 */
function setLegendTextColor(options: ECOption): ECOption {
    function updateLegendTextStyle(legendItem: LegendComponentOption) {
        legendItem.textStyle = legendItem.textStyle || {};
        legendItem.textStyle.color = TEXT_COLOR.value;
        legendItem.textStyle.fontSize = FONT_SIZE;
    }
    if (Array.isArray(options.legend)) {
        options.legend.forEach(updateLegendTextStyle);
    } else if (options.legend) {
        updateLegendTextStyle(options.legend);
    }
    return options;
}

/**
 * 设置坐标轴文本颜色和字体大小
 * @param options 图表配置项
 */
function setAxisTextColor(options: ECOption): ECOption {
    function updateAxisTextStyle(axisItem: any) {
        axisItem.axisLabel = axisItem.axisLabel || {};
        axisItem.axisLabel.color = TEXT_COLOR.value;
        axisItem.axisLabel.fontSize = FONT_SIZE;
    }
    const axes = [options.yAxis, options.xAxis];
    axes.forEach(axis => {
        if (Array.isArray(axis)) {
            axis.forEach(updateAxisTextStyle);
        } else if (axis) {
            updateAxisTextStyle(axis);
        }
    });
    return options;
}

/**
 * 设置 xAxis 的 axisTick
 */
function setXAxisAxisTick(options: ECOption): ECOption {
    if (Array.isArray(options.xAxis)) {
        options.xAxis.forEach(xAxis => {
            xAxis.axisTick = xAxis.axisTick || {};
            xAxis.axisTick.show = false;
        });
    } else if (options.xAxis) {
        options.xAxis.axisTick = options.xAxis.axisTick || {};
        options.xAxis.axisTick.show = false;
    }
    return options;
}

/**
 * 设置 yAxis
 * @param options 图表配置项
 */
function setYAxisSplitLineColor(options: ECOption): ECOption {
    if (Array.isArray(options.yAxis)) {
        options.yAxis.forEach(yAxis => {
            yAxis.splitLine = yAxis.splitLine || {};
            yAxis.splitLine.lineStyle = yAxis.splitLine.lineStyle || {};
            yAxis.splitLine.lineStyle.color = 'rgba(116, 130, 159, 0.25)';
        });
    } else if (options.yAxis) {
        options.yAxis.splitLine = options.yAxis.splitLine || {};
        options.yAxis.splitLine.lineStyle = options.yAxis.splitLine.lineStyle || {};
        options.yAxis.splitLine.lineStyle.color = 'rgba(116, 130, 159, 0.25)';
    }
    return options;
}

// 监听主题和 options 变化
watch(
    [() => systemConfigStore.isDark, () => props.options],
    ([newIsDark, newOptions]) => {
        emits('dark-change', newIsDark);
        setOptions(handleThemeOptions(newIsDark, newOptions));
    },
    { deep: true }
);

onMounted(() => {
    initCharts();
    setOptions(handleThemeOptions(systemConfigStore.isDark, props.options));
});
</script>

<style scoped>
.BoatBaseECharts {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
