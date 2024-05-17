const router = {
    path: '/css',
    name: '玩转Css',
    meta: {
        isShow: true,
        title: '玩转Css',
        icon: '&#xe778;',
    },
    redirect: '/css/barCharts',
    children: [
        {
            path: '/css/barCharts',
            name: '柱状图',
            component: () =>
                import(
                    /* webpackChunkName: "barCharts" */ '@/views/cssView/components/BarCharts.vue'
                ),
            meta: {
                title: '柱状图',
            },
        },
    ],
};

export default router;
