<template>
    <BoatBaseECharts :options="options" />
</template>

<script setup lang="ts">
import { ECOption } from '@/utils/eCharts';

const options: ECOption = {
    tooltip: {
        show: true,
        trigger: 'axis',
    },
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
        },
    ],
};
</script>
