const router = {
    path: '/tabCommunication',
    name: '标签页通信',
    component: () =>
        import(/* webpackChunkName: "tabCommunication" */ '@/views/tabCommunicationView/Index.vue'),
    meta: {
        isShow: true,
        title: '标签页通信',
        icon: '&#xe603;',
    },
};

export default router;
