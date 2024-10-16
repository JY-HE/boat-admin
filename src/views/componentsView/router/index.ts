const router = {
    path: '/components',
    name: '组件',
    meta: {
        isShow: true,
        title: '组件',
        icon: '&#xe779;',
    },
    redirect: '/components/picturePreview',
    children: [
        {
            path: '/components/picturePreview',
            name: '图片预览',
            component: () =>
                import(
                    /* webpackChunkName: "picturePreview" */ '@/views/componentsView/components/picturePreview/Index.vue'
                ),
            meta: {
                title: '图片预览',
            },
        },
        {
            path: '/components/linkageForm',
            name: '联动表单',
            component: () =>
                import(
                    /* webpackChunkName: "linkageForm" */ '@/views/componentsView/components/linkageForm/Index.vue'
                ),
            meta: {
                title: '联动表单',
            },
        },
        {
            path: '/components/fixedHeightVirtualList',
            name: '定高虚拟列表',
            component: () =>
                import(
                    /* webpackChunkName: "fixedHeightVirtualList" */ '@/views/componentsView/components/fixedHeightVirtualList/Index.vue'
                ),
            meta: {
                title: '定高虚拟列表',
            },
        },
    ],
};

export default router;
