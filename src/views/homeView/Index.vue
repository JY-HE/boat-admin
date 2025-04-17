<template>
    <div>
        <div class="p-4 flex justify-start items-start flex-col scrollbarStyle gap-4">
            <StatisticInfo />
            <StatisticCards />
        </div>
    </div>
</template>

<script lang="ts" setup>
import StatisticInfo from './components/StatisticInfo.vue';
import StatisticCards from './components/StatisticCards.vue';
</script>

<style lang="scss"></style>
