<template>
    <div class="Analysis">
        <main class="grid gap-4 grid-cols-4 auto-rows-[7.875rem]">
            <StatisticChart class="module row-start-1 row-end-4 col-start-1 col-end-3" />
            <VisitorInsightsChart class="module row-start-1 row-end-4 col-start-3 col-end-5" />
            <StatisticBarAndPieChart class="module row-start-4 row-end-7 col-start-1 col-end-4" />
            <CustomerSatisfactionChart class="module row-start-4 row-end-7 col-start-4 col-end-5" />
        </main>
    </div>
</template>

<script lang="ts" setup>
import StatisticChart from './components/StatisticChart.vue';
import StatisticBarAndPieChart from './components/StatisticBarAndPieChart.vue';
import VisitorInsightsChart from './components/VisitorInsightsChart.vue';
import CustomerSatisfactionChart from './components/CustomerSatisfactionChart.vue';

defineOptions({ name: 'Analysis' });
</script>

<style lang="scss">
.Analysis {
    .module {
        border: pxToRem(1) solid;
        @include themeColor(var(--chartModuleBorderAlpha), border-color);
    }
}
</style>
