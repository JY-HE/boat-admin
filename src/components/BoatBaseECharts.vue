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
    };
    return props.textColorAuto ? applyTextColor(modifiedOptions) : modifiedOptions;
}

/**
 * 应用文本颜色配置
 * @param options 图表配置项
 */
function applyTextColor(options: ECOption): ECOption {
    // 设置标题文本颜色和字体大小
    setTitleTextColor(options);
    // 设置图例文本颜色和字体大小
    setLegendTextColor(options);
    // 设置坐标轴文本颜色和字体大小
    setAxisTextColor(options);
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
            title.textStyle.fontSize = FONT_SIZE;
        });
    } else if (options.title) {
        options.title.textStyle = options.title.textStyle || {};
        options.title.textStyle.color = TEXT_COLOR.value;
        options.title.textStyle.fontSize = FONT_SIZE;
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
