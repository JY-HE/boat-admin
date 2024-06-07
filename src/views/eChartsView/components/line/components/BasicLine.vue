<template>
    <div class="ChartBox">
        <div class="title"><h2>基础折线图</h2></div>
        <div ref="chart" class="chart"></div>
    </div>
</template>

<script setup lang="ts">
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    // 数据集组件
    DatasetComponent,
    // 内置数据转换器组件 (filter, sort)
    TransformComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 系列类型的定义后缀都为 SeriesOption
import type { LineSeriesOption } from 'echarts/charts';
// 组件类型的定义后缀都为 ComponentOption
import type {
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    DatasetComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
]);

const chart = ref<HTMLDivElement | null>(null);

const option: ECOption = {
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

onMounted(() => {
    if (chart.value) {
        // 初始化 ECharts 实例
        const myChart = echarts.init(chart.value);
        // 使用配置项和数据显示图表
        myChart.setOption(option);
    }
});
</script>
