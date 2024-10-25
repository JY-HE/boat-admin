<template>
    <div class="pt-8 pb-8 pl-8 lineChart">
        <div class="w-full h-full pr-4 grid scrollbarStyle content">
            <BoatEchartsPreview v-for="(item, index) in echartsData" :key="index" v-bind="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import echartsData from './echartsData';
</script>
<style lang="scss">
.lineChart {
    .content {
        grid-template-columns: repeat(auto-fill, minmax(#{pxToRem(322)}, 1fr));
    }
}
</style>
