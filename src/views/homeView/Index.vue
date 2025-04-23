<template>
    <div class="grid gap-4 grid-cols-4 auto-rows-[7.875rem]">
        <StatisticInfo class="row-start-1 row-end-1 col-start-1 col-end-5" />
        <StatisticCards class="row-start-2 row-end-2 col-start-1 col-end-5" />
        <StatisticChart class="row-start-3 row-end-6 col-start-1 col-end-4" />
        <Dynamics class="row-start-3 row-end-6 col-start-4 col-end-5" />
        <Notice class="row-start-6 row-end-9 col-start-4 col-end-5" />
    </div>
</template>

<script lang="ts" setup>
import StatisticInfo from './components/StatisticInfo.vue';
import StatisticCards from './components/StatisticCards.vue';
import Dynamics from './components/Dynamics.vue';
import StatisticChart from './components/StatisticChart.vue';
import Notice from './components/Notice.vue';
</script>
