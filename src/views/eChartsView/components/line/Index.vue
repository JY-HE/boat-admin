<template>
    <div class="lineChart">
        <div v-for="(item, index) in echartsData" :key="index" class="module">
            <BoatBaseECharts :options="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { echartsData } from './echartsData';
</script>

<style lang="scss">
.lineChart {
    display: grid;
    gap: pxToRem(32);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fill, minmax(#{pxToRem(320)}, 1fr));
    .module {
        @include wh;
        border: pxToRem(1) solid;
        @include themeColor(var(--chartModuleBorderAlpha), border-color);
        border-radius: pxToRem(16);
    }
}
</style>
