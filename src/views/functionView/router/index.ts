const router = {
    path: '/function',
    name: '功能',
    meta: {
        isShow: true,
        title: '功能',
        icon: '&#xe778;',
    },
    redirect: '/function/debounce',
    children: [
        {
            path: '/function/debounce',
            name: '防抖',
            component: () =>
                import(
                    /* webpackChunkName: "debounce" */ '@/views/functionView/components/debounce/Index.vue'
                ),
            meta: {
                title: '防抖',
            },
        },
        {
            path: '/function/clipboard',
            name: '剪贴板',
            component: () =>
                import(
                    /* webpackChunkName: "clipboard" */ '@/views/functionView/components/clipboard/Index.vue'
                ),
            meta: {
                title: '剪贴板',
            },
        },
    ],
};

export default router;
