const router = {
    path: '/eCharts',
    name: 'ECharts示例',
    meta: {
        isShow: true,
        title: 'ECharts示例',
        icon: '&#xe609;',
    },
    redirect: '/eCharts/line',
    children: [
        {
            path: '/eCharts/line',
            name: '折线图',
            component: () =>
                import(
                    /* webpackChunkName: "line" */ '@/views/eChartsView/components/line/Index.vue'
                ),
            meta: {
                title: '折线图',
            },
        },
        {
            path: '/eCharts/bar',
            name: '柱状图',
            component: () =>
                import(
                    /* webpackChunkName: "bar" */ '@/views/eChartsView/components/bar/Index.vue'
                ),
            meta: {
                title: '柱状图',
            },
        },
        {
            path: '/eCharts/pie',
            name: '饼图',
            component: () =>
                import(
                    /* webpackChunkName: "pie" */ '@/views/eChartsView/components/pie/Index.vue'
                ),
            meta: {
                title: '饼图',
            },
        },
    ],
};

export default router;
