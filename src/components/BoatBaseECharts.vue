<template>
    <div
        ref="echartsRef"
        :style="{
            width: width,
            height: height,
        }"
        class="BoatBaseECharts"
    ></div>
</template>

<script setup lang="ts">
import { useECharts, EChartsCoreOption } from '@/hooks';

const props = defineProps({
    options: { type: Object as PropType<EChartsCoreOption>, required: true },
    themeColors: { type: Array as PropType<string[]>, default: () => [] },
    height: { type: String, default: '' },
    width: { type: String, default: '' },
});

const echartsRef = ref<HTMLDivElement | null>(null);

const { setOptions, initCharts } = useECharts(echartsRef, props.options);

watch(
    () => props.options,
    newValue => {
        let targetOptions: EChartsCoreOption = {};
        targetOptions = { ...newValue };
        if (props.themeColors && props.themeColors.length > 0) {
            targetOptions.color = props.themeColors;
        }
        setOptions(targetOptions);
    }
);

onMounted(() => {
    initCharts();
});
</script>

<style lang="scss">
.BoatBaseECharts {
    @include wh;
    overflow: hidden;
    border: pxToRem(1) solid;
    @include themeColor(var(--dividingLineAlpha), border-color);
    border-radius: pxToRem(12);
}
</style>
