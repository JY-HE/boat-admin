import { ECOption } from '@/utils/eCharts';

export const echartsData = [
    {
        title: {
            text: '基础柱状图',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: true,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#ddd',
                },
            },
        },
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle: {
                    borderRadius: [5, 5, 0, 0],
                },
                barWidth: '25%',
            },
        ],
    },
    {
        title: {
            text: '渐变色',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: true,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#ddd',
                },
            },
        },
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle: {
                    borderRadius: [5, 5, 0, 0],
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
                                offset: 0.5,
                                color: 'rgba(0, 157, 255, 0.56)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(0, 157, 255, 1)',
                            },
                        ],
                        global: false,
                    },
                },
                barWidth: '25%',
            },
        ],
    },
    {
        title: {
            text: '多组数据',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            valueFormatter: value => `${value} 万`,
        },
        legend: { data: ['销售额', '利润'] },
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        yAxis: {
            type: 'value',
            name: '万',
            axisLine: {
                show: true,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#ddd',
                },
            },
        },
        series: [
            {
                name: '销售额',
                type: 'bar',
                data: [10, 23, 45, 22, 28, 23],
                itemStyle: {
                    borderRadius: [5, 5, 0, 0],
                },
                barWidth: '25%',
            },
            {
                name: '利润',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle: {
                    borderRadius: [5, 5, 0, 0],
                },
                barWidth: '25%',
            },
        ],
    },
    {
        title: {
            text: '多组数据（堆叠）',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            valueFormatter: value => `${value} 万`,
        },
        legend: { data: ['销售额', '利润'] },
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        yAxis: {
            type: 'value',
            name: '万',
            axisLine: {
                show: true,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#ddd',
                },
            },
        },
        series: [
            {
                name: '销售额',
                type: 'bar',
                stack: '总量',
                data: [10, 23, 45, 22, 28, 23],
                itemStyle: {
                    borderRadius: [5, 5, 5, 5],
                },
                barWidth: '25%',
            },
            {
                name: '利润',
                type: 'bar',
                stack: '总量',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle: {
                    borderRadius: [5, 5, 5, 5],
                },
                barWidth: '25%',
            },
        ],
    },
    {
        title: {
            text: '水平柱状图',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        xAxis: {
            type: 'value',
            name: '万',
            axisLine: {
                show: true,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#ddd',
                },
            },
        },
        grid: {
            left: '1%',
            right: '4%',
            bottom: '2%',
            containLabel: true,
        },
        yAxis: {
            type: 'category',
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            axisTick: {
                show: false,
            },
        },
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle: {
                    borderRadius: [0, 5, 5, 0],
                },
                barWidth: '50%',
            },
        ],
    },
    {
        title: {
            text: '垂直双向堆叠',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            valueFormatter: value => `${value} 万`,
        },
        legend: {
            data: ['进货', '销售', '退货', '损耗'],
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月'],
            axisTick: { alignWithLabel: true },
        },
        yAxis: {
            type: 'value',
            name: '万',
            axisLabel: {
                formatter: value => Math.abs(value),
            },
            splitLine: {
                lineStyle: { type: 'dashed', color: '#ddd' },
            },
        },
        series: [
            // 正向堆叠（向上）
            {
                name: '进货',
                type: 'bar',
                stack: 'up',
                data: [5, 8, 6, 10, 7],
                barWidth: '40%',
                itemStyle: { borderRadius: [5, 5, 0, 0] },
            },
            {
                name: '销售',
                type: 'bar',
                stack: 'up',
                data: [3, 6, 4, 8, 6],
                barWidth: '40%',
                itemStyle: { borderRadius: [5, 5, 0, 0] },
            },
            // 负向堆叠（向下）
            {
                name: '退货',
                type: 'bar',
                stack: 'down',
                data: [-1, -1.5, -1.2, -1, -1.3],
                barWidth: '40%',
                itemStyle: { borderRadius: [0, 0, 5, 5] },
            },
            {
                name: '损耗',
                type: 'bar',
                stack: 'down',
                data: [-0.5, -0.8, -0.6, -0.7, -0.4],
                barWidth: '40%',
                itemStyle: { borderRadius: [0, 0, 5, 5] },
            },
        ],
    },
    {
        title: {
            text: '水平双向堆叠',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            valueFormatter: value => `${value} 万`,
        },
        legend: {
            data: ['收入', '成本', '退货', '损耗'],
            bottom: 0,
        },
        grid: {
            left: '1%',
            right: '10%',
            top: '12%',
            bottom: '10%',
            containLabel: true,
        },
        // X 轴为数值轴，左右两侧展开
        xAxis: {
            type: 'value',
            name: '金额（万）',
            axisLabel: {
                formatter: value => Math.abs(value),
            },
            splitLine: {
                lineStyle: { type: 'dashed', color: '#ddd' },
            },
        },
        // Y 轴为类目轴
        yAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月'],
            axisTick: { show: false },
        },
        series: [
            // 右侧正向堆叠
            {
                name: '收入',
                type: 'bar',
                stack: 'right',
                data: [8, 10, 9, 11, 10],
                barWidth: '40%',
                itemStyle: { borderRadius: 5 },
            },
            {
                name: '成本',
                type: 'bar',
                stack: 'right',
                data: [5, 6, 5.5, 7, 6.5],
                barWidth: '40%',
                itemStyle: { borderRadius: 5 },
            },
            // 左侧负向堆叠
            {
                name: '退货',
                type: 'bar',
                stack: 'left',
                data: [-1.2, -1.5, -1.3, -1.1, -1.4],
                barWidth: '40%',
                itemStyle: { borderRadius: 5 },
            },
            {
                name: '损耗',
                type: 'bar',
                stack: 'left',
                data: [-0.8, -1.0, -0.9, -0.7, -0.6],
                barWidth: '40%',
                itemStyle: { borderRadius: 5 },
            },
        ],
    },
] as ECOption[];
