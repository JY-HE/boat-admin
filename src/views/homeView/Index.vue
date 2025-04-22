<template>
    <div>
        <div class="HomeView p-4 flex justify-start items-start flex-col scrollbarStyle gap-4">
            <StatisticInfo class="row-start-1 row-end-1 col-start-1 col-end-5" />
            <StatisticCards class="row-start-2 row-end-2 col-start-1 col-end-5" />
            <StatisticChart class="row-start-3 row-end-6 col-start-1 col-end-4" />
            <Dynamics class="row-start-3 row-end-6 col-start-4 col-end-5" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import StatisticInfo from './components/StatisticInfo.vue';
import StatisticCards from './components/StatisticCards.vue';
import Dynamics from './components/Dynamics.vue';
import StatisticChart from './components/StatisticChart.vue';
</script>

<style lang="scss">
.HomeView {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: pxToRem(126);
    gap: pxToRem(16);
}
</style>
