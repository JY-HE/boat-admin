<template>
    <div>
        <div class="HomeView p-4 flex justify-start items-start flex-col scrollbarStyle gap-4">
            <StatisticInfo />
            <StatisticCards />
            <Dynamics />
        </div>
    </div>
</template>

<script lang="ts" setup>
import StatisticInfo from './components/StatisticInfo.vue';
import StatisticCards from './components/StatisticCards.vue';
import Dynamics from './components/Dynamics.vue';
</script>

<style lang="scss">
.HomeView {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: pxToRem(126);
    gap: pxToRem(16);
}
</style>
