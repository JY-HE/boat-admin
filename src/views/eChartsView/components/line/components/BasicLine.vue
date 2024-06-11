<template>
    <div class="w-full h-[calc(32rem)]">
        <BoatBaseECharts :options="options" title="基础折线图" />
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
