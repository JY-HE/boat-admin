<template>
    <div class="StatisticChart h-full rounded-xl p-4">
        <BoatBaseECharts :options="options" />
    </div>
</template>

<script setup lang="ts">
import { ECOption } from '@/utils/eCharts';

const options: ECOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
        },
    },
    legend: {
        data: ['新增客户', '在线人数', '活跃用户', '访问人数'],
    },
    grid: {
        left: '1%',
        right: '1%',
        bottom: '0',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
    ],
    yAxis: [
        {
            type: 'value',
        },
    ],
    series: [
        {
            name: '新增客户',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series',
            },
            data: [200, 300, 400, 500, 600, 700, 800],
        },
        {
            name: '在线人数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series',
            },
            data: [50, 60, 70, 80, 90, 100, 110],
        },
        {
            name: '活跃用户',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series',
            },
            data: [1000, 1100, 1200, 1300, 1400, 1500, 1600],
        },
        {
            name: '访问人数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series',
            },
            data: [5000, 5500, 6000, 6500, 7000, 7500, 8000],
        },
    ],
};
</script>

<style lang="scss">
.StatisticChart {
    @include panelStyle;
    @include panelShadow(0.25);
}
@include darkStyle {
    .StatisticChart {
        @include panelShadow(0.8);
    }
}
</style>
