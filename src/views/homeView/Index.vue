<template>
    <div>
        <div class="HomeView p-4 flex justify-start items-start flex-col scrollbarStyle gap-4">
            <StatisticInfo class="col-start-1 col-end-4" />
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
    /* 关键属性：固定4列 */
    grid-template-columns: repeat(4, 1fr);
    /* 自动行高 */
    grid-auto-rows: minmax(100px, auto);
    /* 间距 */
    gap: 20px;
}
</style>
