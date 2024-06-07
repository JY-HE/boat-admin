<template>
    <div class="ChartBox">
        <div class="title"><h2>基础折线图</h2></div>
        <BoatBaseECharts :options="options" />
    </div>
</template>

<script setup lang="ts">
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
};
</script>
