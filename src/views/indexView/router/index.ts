const router = {
    path: '/home',
    name: '首页',
    component: () => import(/* webpackChunkName: "home" */ '@/views/indexView/Home.vue'),
    meta: {
        isShow: true,
        title: '首页',
        icon: '&#xe61e;',
    },
};

export default router;
