<template>
    <div class="StatisticBarAndPieChart h-full rounded-xl p-4 flex justify-between gap-4">
        <div class="w-[65%]">
            <BoatBaseECharts :options="barOptions" />
        </div>
        <div class="w-[35%]">
            <BoatBaseECharts :options="pieOptions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ECOption } from '@/utils/eCharts';

// 生成最近 7 天的日期标签 (MM/DD)
function getLast7Days(): string[] {
    return Array.from({ length: 7 }).map((_, idx) => {
        const date = new Date();
        // 计算从 6 天前到今天
        date.setDate(date.getDate() - (6 - idx));
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}/${day}`;
    });
}
const dates = getLast7Days();

// 随机生成近七天的告警与处置数据
interface DayData {
    date: string;
    total: number;
    processed: number;
    unprocessed: number;
}
const dayData = computed<DayData[]>(() =>
    dates.map(date => {
        const total = Math.floor(Math.random() * 301) + 200; // 200-500
        const processed = Math.floor(Math.random() * (total * 0.2 + 1)) + Math.floor(total * 0.8);
        return {
            date,
            total,
            processed,
            unprocessed: total - processed,
        };
    })
);

// 计算累计处置与未处置
const totalProcessed = computed(() => dayData.value.reduce((s, d) => s + d.processed, 0));
const totalUnprocessed = computed(() => dayData.value.reduce((s, d) => s + d.unprocessed, 0));

// 柱状图配置
const barOptions: ECOption = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['告警总数', '处置总数', '未处置总数'] },
    grid: { left: '1%', right: '1%', bottom: '0', containLabel: true },
    xAxis: [{ type: 'category', data: dates }],
    yAxis: [{ type: 'value', name: '次' }],
    series: [
        { name: '告警总数', type: 'bar', data: dayData.value.map(d => d.total) },
        { name: '处置总数', type: 'bar', data: dayData.value.map(d => d.processed) },
        { name: '未处置总数', type: 'bar', data: dayData.value.map(d => d.unprocessed) },
    ],
};

// 饼图配置
const pieOptions: ECOption = {
    title: { text: '近七天告警处置率', left: 'center', top: '0', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    series: [
        {
            name: '处置率',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
                show: true,
                position: 'center',
                formatter: () =>
                    `${(
                        (totalProcessed.value / (totalProcessed.value + totalUnprocessed.value)) *
                        100
                    ).toFixed(2)}%`,
                fontSize: 24,
                fontWeight: 'bold',
            },
            labelLine: { show: false },
            data: [
                { value: totalProcessed.value, name: '已处置' },
                { value: totalUnprocessed.value, name: '未处置' },
            ],
        },
    ],
};
</script>

<style lang="scss">
.StatisticBarAndPieChart {
    @include panelStyle;
    @include panelShadow(0.25);

    @include darkStyle {
        @include panelShadow(0.8);
    }
}
</style>
