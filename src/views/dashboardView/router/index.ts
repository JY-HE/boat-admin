const router = {
    path: '/dashboard',
    name: '仪表盘',
    meta: {
        isShow: true,
        title: '仪表盘',
        icon: '&#xeb95;',
    },
    redirect: '/dashboard/workbench',
    children: [
        {
            path: '/dashboard/workbench',
            name: '工作台',
            component: () =>
                import(
                    /* webpackChunkName: "workbench" */ '@/views/dashboardView/components/workbench/Index.vue'
                ),
            meta: {
                title: '工作台',
            },
        },
        {
            path: '/dashboard/analysis',
            name: '分析页',
            component: () =>
                import(
                    /* webpackChunkName: "analysis" */ '@/views/dashboardView/components/analysis/Index.vue'
                ),
            meta: {
                title: '分析页',
            },
        },
    ],
};

export default router;
