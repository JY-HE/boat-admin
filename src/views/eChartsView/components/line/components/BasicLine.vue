<template>
    <div class="w-full h-[calc(32rem)]">
        <div class="w-full h-12 text-h1"><h2>基础折线图</h2></div>
        <BoatBaseECharts :options="options" class="w-full h-[calc(100%-3rem)]" />
    </div>
</template>

<script setup lang="ts">
import { ECOption } from '@/utils/eCharts';

const options = {
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20],
        },
    ],
} as ECOption;
</script>
