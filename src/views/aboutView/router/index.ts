const router = {
    path: '/about',
    name: '关于',
    component: () => import(/* webpackChunkName: "about" */ '@/views/aboutView/Index.vue'),
    meta: {
        isShow: true,
        title: '关于',
        icon: '&#xe631;',
    },
};

export default router;
