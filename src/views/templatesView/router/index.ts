const router = {
    path: '/templates',
    name: '模板中心',
    meta: {
        isShow: true,
        title: '模板中心',
        icon: '&#xe779;',
    },
    redirect: '/templates/picturePreview',
    children: [
        {
            path: '/templates/picturePreview',
            name: '图片预览',
            component: () =>
                import(
                    /* webpackChunkName: "picturePreview" */ '@/views/templatesView/components/picturePreview/Index.vue'
                ),
            meta: {
                isShow: false,
                title: '图片预览',
            },
        },
        {
            path: '/templates/linkageForm',
            name: '联动表单',
            component: () =>
                import(
                    /* webpackChunkName: "linkageForm" */ '@/views/templatesView/components/linkageForm/Index.vue'
                ),
            meta: {
                title: '联动表单',
            },
        },
        {
            path: '/templates/virtualList',
            name: '虚拟列表',
            component: () =>
                import(
                    /* webpackChunkName: "virtualList" */ '@/views/templatesView/components/virtualList/Index.vue'
                ),
            meta: {
                title: '虚拟列表',
            },
        },
        {
            path: '/templates/cards',
            name: '卡片',
            component: () =>
                import(
                    /* webpackChunkName: "cards" */ '@/views/templatesView/components/cards/Index.vue'
                ),
            meta: {
                title: '卡片',
            },
        },
        {
            path: '/templates/textScroll',
            name: '文字滚动',
            component: () =>
                import(
                    /* webpackChunkName: "textScroll" */ '@/views/templatesView/components/textScroll/Index.vue'
                ),
            meta: {
                title: '文字滚动',
            },
        },
    ],
};

export default router;
