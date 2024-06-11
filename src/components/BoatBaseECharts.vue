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
import { ECOption } from '@/utils/eCharts';
import { useECharts } from '@/hooks';

const props = defineProps<{
    options: ECOption;
    themeColors?: string[];
    height?: string;
    width?: string;
}>();

const echartsRef = ref<HTMLDivElement | null>(null);
const { setOptions, initCharts } = useECharts(echartsRef, props.options);

watch(
    () => props.options,
    newValue => {
        let targetOptions: ECOption = {};
        targetOptions = { ...newValue };
        if (props.themeColors && props.themeColors.length > 0) {
            targetOptions.color = props.themeColors;
        }
        setOptions(targetOptions);
    }
);

onMounted(() => {
    initCharts(props.themeColors);
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
