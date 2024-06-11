<template>
    <div class="BoatBaseECharts w-full h-full">
        <div v-if="title" class="w-full h-12 text-h1">
            <h2>{{ title }}</h2>
        </div>
        <div
            ref="echartsRef"
            :style="{
                width: width,
                height: height,
            }"
            class="w-full overflow-hidden rounded-xl border-themeColor-chartModuleBorderAlpha hover:border-themeColor-chartModuleHoverBorderAlpha"
            :class="title ? 'h-[calc(100%-3rem)]' : 'h-full'"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { ECOption } from '@/utils/eCharts';
import { useECharts } from '@/hooks';

const props = defineProps<{
    title?: string;
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

<style lang="scss"></style>
