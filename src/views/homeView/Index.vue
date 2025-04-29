<template>
    <div>
        <main class="grid gap-4 grid-cols-4 auto-rows-[7.875rem]">
            <StatisticInfo class="row-start-1 row-end-1 col-start-1 col-end-5" />
            <StatisticCards class="row-start-2 row-end-2 col-start-1 col-end-5" />
            <StatisticChart class="row-start-3 row-end-6 col-start-1 col-end-4" />
            <Dynamics class="row-start-3 row-end-6 col-start-4 col-end-5" />
            <StatisticBarAndPieChart class="row-start-6 row-end-9 col-start-1 col-end-4" />
            <Notice class="row-start-6 row-end-9 col-start-4 col-end-5" />
        </main>
        <footer
            v-if="copyrightConfig.enable"
            class="text-h1 font-style-4 flex justify-center items-center h-12"
        >
            <span class="mr-1">Copyright</span>
            <span class="mr-1">{{ copyrightConfig.protocol }}</span>
            <span class="mr-1">(c)</span>
            <span class="mr-1">{{ copyrightConfig.date }}</span>
            <a :href="copyrightConfig.url" target="_blank" class="hover:text-themeColor-100">{{
                copyrightConfig.name
            }}</a>
            <span class="ml-1">{{ copyrightConfig.registration }}</span>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import StatisticInfo from './components/StatisticInfo.vue';
import StatisticCards from './components/StatisticCards.vue';
import Dynamics from './components/Dynamics.vue';
import StatisticChart from './components/StatisticChart.vue';
import Notice from './components/Notice.vue';
import StatisticBarAndPieChart from './components/StatisticBarAndPieChart.vue';
import { useSystemConfig } from '@/hooks/useSystemConfig';

const { copyrightConfig } = useSystemConfig();
</script>
