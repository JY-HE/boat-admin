const router = {
    path: '/introductionPage',
    name: '引导页',
    component: () =>
        import(/* webpackChunkName: "introductionPage" */ '@/views/introductionPageView/Index.vue'),
    meta: {
        isShow: true,
        title: '引导页',
        icon: '&#xe649;',
    },
};

export default router;
