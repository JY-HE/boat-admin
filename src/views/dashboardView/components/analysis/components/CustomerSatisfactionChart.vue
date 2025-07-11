<template>
    <div class="h-full rounded-xl p-4">
        <BoatBaseECharts :options="options" />
    </div>
</template>

<script setup lang="ts">
import { ECOption } from '@/utils/eCharts';

defineOptions({ name: 'CustomerSatisfactionChart' });

function generateOptions(): ECOption {
    return {
        title: {
            text: '客户满意度',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 18 },
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: { data: ['上月', '本月'], bottom: '0' },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                axisLabel: { show: false },
            },
        ],
        yAxis: [{ type: 'value', axisLabel: { show: false } }],
        series: [
            {
                name: '上月',
                type: 'line',
                smooth: true,
                data: [1800, 2800, 1800, 2300, 2600, 2500, 3000],
                areaStyle: {
                    opacity: 0.8,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(0, 157, 255, 0.33)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(255, 255, 255, 0)',
                            },
                        ],
                        global: false,
                    },
                },
                lineStyle: {
                    width: 2,
                    color: '#0086E1',
                },
                symbol: 'none',
                itemStyle: {
                    color: '#0095FF',
                },
            },
            {
                name: '本月',
                type: 'line',
                smooth: true,
                data: [4000, 3500, 4300, 3700, 4500, 3500, 4000],
                areaStyle: {
                    opacity: 0.8,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(147, 241, 180,0.33)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,255,0)',
                            },
                        ],
                        global: false,
                    },
                },
                lineStyle: {
                    width: 2,
                    color: '#14DEB9',
                },
                symbol: 'none',
                itemStyle: {
                    color: '#14DEB9',
                },
            },
        ],
    };
}

const options = generateOptions();
</script>
