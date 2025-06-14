<template>
    <div>
        <main class="grid gap-4 grid-cols-4 auto-rows-[7.875rem]">
            <StatisticChart class="row-start-1 row-end-4 col-start-1 col-end-3" />
            <StatisticBarAndPieChart class="row-start-4 row-end-7 col-start-1 col-end-4" />
        </main>
    </div>
</template>

<script lang="ts" setup>
import StatisticChart from './components/StatisticChart.vue';
import StatisticBarAndPieChart from './components/StatisticBarAndPieChart.vue';
</script>
