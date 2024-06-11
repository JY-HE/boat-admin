<template>
    <div class="BarCharts pt-4 pb-4 pl-4">
        <div class="barChartsContent p-4 w-full h-full grid justify-items-center grid-cols-2 gap-8">
            <BasicBar />
        </div>
    </div>
</template>

<script setup lang="ts">
import BasicBar from './components/BasicBar.vue';
</script>

<style lang="scss">
.BarCharts {
    .barChartsContent {
        @include scrollbarStyle;
    }
}
</style>
