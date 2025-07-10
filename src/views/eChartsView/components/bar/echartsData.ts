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
] as ECOption[];
