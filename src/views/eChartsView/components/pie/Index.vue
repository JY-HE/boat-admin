<template>
    <div class="pie-echarts">
        <div v-for="(item, index) in echartsData" :key="index" class="echarts-item">
            <BoatBaseECharts :options="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { echartsData } from './echartsData';

defineOptions({ name: 'PieEcharts' });
</script>

<style lang="scss">
.pie-echarts {
    display: flex;
    flex-wrap: wrap;
    gap: pxToRem(32);

    .echarts-item {
        width: calc((100% - #{pxToRem(32)}) / 2);
        aspect-ratio: 6 / 3;
        border: pxToRem(1) solid;
        @include themeColor(var(--chartModuleBorderAlpha), border-color);
        border-radius: pxToRem(16);
        padding: pxToRem(16);
    }
}
</style>
