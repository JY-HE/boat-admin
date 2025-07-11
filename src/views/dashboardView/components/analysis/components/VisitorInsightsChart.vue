<template>
    <div class="h-full rounded-xl p-4">
        <BoatBaseECharts :options="options" />
    </div>
</template>

<script setup lang="ts">
import { ECOption } from '@/utils/eCharts';

defineOptions({ name: 'VisitorInsightsChart' });

// 定义图表的指标及其随机数范围，名称与统计卡片保持一致
interface ChartMetricConfig {
    name: string;
    min: number;
    max: number;
}

const metrics: ChartMetricConfig[] = [
    { name: '新客户', min: 100, max: 500 },
    { name: '忠实客户', min: 100, max: 600 },
];

const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

function generateOptions(): ECOption {
    return {
        title: {
            text: '访客洞察',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 18 },
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: { data: metrics.map(m => m.name), bottom: '0' },
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
                data: days,
            },
        ],
        yAxis: [{ type: 'value' }],
        series: metrics.map(metric => ({
            name: metric.name,
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: { width: 3 },
            emphasis: { focus: 'series' },
            data: days.map(
                () => Math.floor(Math.random() * (metric.max - metric.min + 1)) + metric.min
            ),
        })),
    };
}

const options = generateOptions();
</script>
