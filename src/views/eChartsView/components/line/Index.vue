<template>
    <div class="line-echarts">
        <div v-for="(item, index) in echartsData" :key="index" class="echarts-item">
            <BoatBaseECharts :options="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { echartsData } from './echartsData';
</script>

<style lang="scss">
.line-echarts {
    display: grid;
    gap: pxToRem(32);
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: pxToRem(380);

    .echarts-item {
        @include wh;
        border: pxToRem(1) solid;
        @include themeColor(var(--chartModuleBorderAlpha), border-color);
        border-radius: pxToRem(16);
        padding: pxToRem(16);
    }
}
</style>
