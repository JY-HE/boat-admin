const router = {
    path: '/error',
    name: '异常页',
    meta: {
        isShow: true,
        title: '异常页',
        icon: '&#xe612;',
    },
    redirect: '/error/403',
    children: [
        {
            path: '/error/403',
            name: '403',
            component: () =>
                import(/* webpackChunkName: "403" */ '@/views/errorView/components/403/Index.vue'),
            meta: {
                title: '403',
            },
        },
        {
            path: '/error/404',
            name: '404',
            component: () =>
                import(/* webpackChunkName: "404" */ '@/views/errorView/components/404/Index.vue'),
            meta: {
                title: '404',
            },
        },
        {
            path: '/error/500',
            name: '500',
            component: () =>
                import(/* webpackChunkName: "500" */ '@/views/errorView/components/500/Index.vue'),
            meta: {
                title: '500',
            },
        },
    ],
};

export default router;
