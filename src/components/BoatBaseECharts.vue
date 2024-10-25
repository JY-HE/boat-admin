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
import { useECharts } from '@/hooks';
import { useLayoutStore } from '@/store';
import { getCssVariableValue } from '@/utils/global';

const props = withDefaults(
    defineProps<{
        options: ECOption;
        textColorAuto?: boolean;
    }>(),
    { textColorAuto: true }
);

const echartsRef = ref<HTMLDivElement | null>(null);
const { setOptions, initCharts } = useECharts(echartsRef);
const layoutStore = useLayoutStore();
const emits = defineEmits(['dark-change']);

/**
 * 处理配置项并设置主题相关的选项
 * @param isDark 是否暗黑主题
 * @param options 图表配置项
 */
function handleThemeOptions(isDark: boolean, options: ECOption): ECOption {
    const modifiedOptions: ECOption = {
        ...options,
        darkMode: isDark,
        backgroundColor: getCssVariableValue('--chartBackgroundColor'),
    };
    return props.textColorAuto ? applyTextColor(modifiedOptions) : modifiedOptions;
}

/**
 * 应用文本颜色配置
 * @param options 图表配置项
 */
function applyTextColor(options: ECOption): ECOption {
    // 设置图例文本颜色
    setLegendTextColor(options);
    // 设置坐标轴文本颜色
    setAxisTextColor(options);
    return options;
}

/**
 * 设置图例文本颜色
 * @param options 图表配置项
 */
function setLegendTextColor(options: ECOption): ECOption {
    const textColor = getCssVariableValue('--chartTextColor');
    function updateLegendTextStyle(legendItem: LegendComponentOption) {
        legendItem.textStyle = legendItem.textStyle || {};
        legendItem.textStyle.color = textColor;
    }
    if (Array.isArray(options.legend)) {
        options.legend.forEach(updateLegendTextStyle);
    } else if (options.legend) {
        updateLegendTextStyle(options.legend);
    }
    return options;
}

/**
 * 设置坐标轴文本颜色
 */
function setAxisTextColor(options: ECOption): ECOption {
    const textColor = getCssVariableValue('--chartTextColor');
    function updateAxisTextStyle(axisItem: any) {
        axisItem.axisLabel = axisItem.axisLabel || {};
        axisItem.axisLabel.color = textColor;
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

// 监听主题和 options 变化
watch(
    [() => layoutStore.isDark, () => props.options],
    ([newIsDark, newOptions]) => {
        emits('dark-change', newIsDark);
        setOptions(handleThemeOptions(newIsDark, newOptions));
    },
    { deep: true }
);

onMounted(() => {
    initCharts();
    setOptions(handleThemeOptions(layoutStore.isDark, props.options));
});
</script>

<style scoped>
.BoatBaseECharts {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
