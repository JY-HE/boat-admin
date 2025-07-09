import { ECOption } from '@/utils/eCharts';

export const echartsData = [
    {
        title: {
            text: '基础折线图',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        xAxis: {
            data: ['一月', '二月', '三月', '四月', '五月', '六月'],
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '销量',
                type: 'line',
                data: [15, 20, 36, 22, 10, 50],
                symbol: 'none',
                smooth: true,
            },
        ],
    },
    {
        title: {
            text: '渐变背景',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        xAxis: {
            data: ['一月', '二月', '三月', '四月', '五月', '六月'],
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '销量',
                type: 'line',
                data: [20, 30, 16, 25, 13, 30],
                symbol: 'none',
                smooth: true,
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
                                color: 'rgba(0, 157, 255, 0.45)',
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(0, 157, 255, 0.28)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(0, 157, 255, 0.05)',
                            },
                        ],
                        global: false,
                    },
                },
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
            trigger: 'axis',
        },
        legend: { data: ['销售额', '利润'], top: '0' },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['1月', '2月', '3月', '4月', '5月', '6月'],
            },
        ],
        yAxis: [{ type: 'value' }],
        series: [
            {
                name: '销售额',
                type: 'line',
                smooth: true,
                data: [4000, 3500, 4300, 3700, 4500, 3500, 4000],
                symbol: 'none',
            },
            {
                name: '利润',
                type: 'line',
                smooth: true,
                data: [1800, 2800, 1800, 2300, 2600, 2500, 3000],
                symbol: 'none',
            },
        ],
    },
    {
        title: {
            text: '无坐标轴',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: { data: ['上月', '本月'], bottom: '0' },
        grid: {
            left: '1%',
            right: '1%',
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
    },
    {
        title: {
            text: '折线渐变',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        grid: {
            left: '1%',
            right: '2%',
            bottom: '2%',
            containLabel: true,
        },
        xAxis: {
            data: ['一月', '二月', '三月', '四月', '五月', '六月'],
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '销量',
                type: 'line',
                data: [23, 20, 36, 12, 10, 20],
                symbol: 'none',
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(0, 157, 255, 1)',
                            },
                            {
                                offset: 1,
                                color: 'rgba(152, 124, 255, 1)',
                            },
                        ],
                        global: false,
                    },
                },
            },
        ],
    },
] as ECOption[];
