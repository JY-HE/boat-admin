import { ECOption } from '@/utils/eCharts';

export const echartsData = [
    {
        title: {
            text: '环形图',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        legend: {
            top: '10%',
            left: 'center',
        },
        series: [
            {
                name: '销量',
                type: 'pie',
                center: ['50%', '60%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: 1048, name: '分类A' },
                    { value: 735, name: '分类B' },
                    { value: 580, name: '分类C' },
                ],
            },
        ],
    },
    {
        title: {
            text: '圆角环形图',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        legend: {
            top: '10%',
            left: 'center',
        },
        series: [
            {
                name: '销量',
                type: 'pie',
                center: ['50%', '60%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                padAngle: 1,
                itemStyle: {
                    borderRadius: 15,
                },
                data: [
                    { value: 1048, name: '分类A' },
                    { value: 735, name: '分类B' },
                    { value: 580, name: '分类C' },
                ],
            },
        ],
    },
    {
        title: {
            text: '饼图',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        legend: {
            top: 'center',
            left: 'right',
            orient: 'vertical',
            itemGap: 20,
        },
        series: [
            {
                name: '销量',
                type: 'pie',
                center: ['50%', '60%'],
                radius: ['0', '100%'],
                top: '10%',
                bottom: '10%',
                avoidLabelOverlap: false,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                padAngle: 1,
                itemStyle: {
                    borderRadius: 15,
                },
                data: [
                    { value: 1048, name: '分类A' },
                    { value: 735, name: '分类B' },
                    { value: 580, name: '分类C' },
                ],
            },
        ],
    },
    {
        title: {
            text: '半环形图',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        legend: {
            top: '15%',
            left: 'center',
        },
        series: [
            {
                name: '销量',
                type: 'pie',
                center: ['50%', '80%'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                startAngle: 180,
                endAngle: 360,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: 1048, name: '分类A' },
                    { value: 735, name: '分类B' },
                    { value: 580, name: '分类C' },
                ],
            },
        ],
    },
    {
        title: {
            text: '南丁格尔玫瑰图',
            left: 'left',
            top: '0',
            textStyle: { fontSize: 16 },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        legend: {
            top: 'bottom',
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: ['30%', '80%'],
                center: ['50%', '50%'],
                roseType: 'area',
                top: '5%',
                bottom: '5%',
                itemStyle: {
                    borderRadius: 8,
                },
                data: [
                    { value: 40, name: 'rose 1' },
                    { value: 38, name: 'rose 2' },
                    { value: 32, name: 'rose 3' },
                    { value: 30, name: 'rose 4' },
                    { value: 28, name: 'rose 5' },
                    { value: 26, name: 'rose 6' },
                    { value: 22, name: 'rose 7' },
                    { value: 18, name: 'rose 8' },
                ],
            },
        ],
    },
] as ECOption[];
