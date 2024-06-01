const router = {
    path: '/home',
    name: '首页',
    component: () => import(/* webpackChunkName: "home" */ '@/views/homeView/Index.vue'),
    meta: {
        isShow: true,
        title: '首页',
        icon: '&#xe61e;',
    },
};

export default router;
