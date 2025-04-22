<template>
    <div class="barChart">
        <div class="grid content">
            <BoatEchartsPreview v-for="(item, index) in echartsData" :key="index" v-bind="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import echartsData from './echartsData';
</script>
<style lang="scss">
.barChart {
    .content {
        grid-template-columns: repeat(auto-fill, minmax(#{pxToRem(322)}, 1fr));
    }
}
</style>
