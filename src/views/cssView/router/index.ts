const router = {
    path: '/css',
    name: 'Css技巧',
    meta: {
        isShow: true,
        title: 'Css技巧',
        icon: '',
    },
    redirect: '/css/barCharts',
    children: [
        {
            path: '/css/barCharts',
            name: '柱状图',
            component: () => import('@/views/cssView/components/BarCharts.vue'),
            meta: {
                title: '柱状图',
            },
        },
    ],
};

export default router;
