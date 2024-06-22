const router = {
    path: '/permission',
    name: '权限管理',
    meta: {
        isShow: true,
        title: '权限管理',
        icon: '&#xe69c;',
    },
    redirect: '/permission/button',
    children: [
        {
            path: '/permission/button',
            name: '按钮权限',
            component: () =>
                import(
                    /* webpackChunkName: "button" */ '@/views/permissionView/components/button/Index.vue'
                ),
            meta: {
                title: '按钮权限',
            },
        },
        {
            path: '/permission/page',
            name: '页面权限',
            component: () =>
                import(
                    /* webpackChunkName: "page" */ '@/views/permissionView/components/page/Index.vue'
                ),
            meta: {
                title: '页面权限',
            },
        },
    ],
};

export default router;
