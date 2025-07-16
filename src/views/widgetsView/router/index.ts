const router = {
    path: '/widgets',
    name: '组件中心',
    meta: {
        isShow: true,
        title: '组件中心',
        icon: '&#xe779;',
    },
    redirect: '/widgets/virtualList',
    children: [
        {
            path: '/widgets/picturePreview',
            name: '图片预览',
            component: () =>
                import(
                    /* webpackChunkName: "picturePreview" */ '@/views/widgetsView/components/picturePreview/Index.vue'
                ),
            meta: {
                isShow: false,
                title: '图片预览',
            },
        },
        {
            path: '/widgets/virtualList',
            name: '虚拟列表',
            component: () =>
                import(
                    /* webpackChunkName: "virtualList" */ '@/views/widgetsView/components/virtualList/Index.vue'
                ),
            meta: {
                title: '虚拟列表',
            },
        },
        {
            path: '/widgets/cards',
            name: '卡片',
            component: () =>
                import(
                    /* webpackChunkName: "cards" */ '@/views/widgetsView/components/cards/Index.vue'
                ),
            meta: {
                title: '卡片',
            },
        },
        {
            path: '/widgets/textScroll',
            name: '文字滚动',
            component: () =>
                import(
                    /* webpackChunkName: "textScroll" */ '@/views/widgetsView/components/textScroll/Index.vue'
                ),
            meta: {
                title: '文字滚动',
            },
        },
        {
            path: '/widgets/watermark',
            name: '水印',
            component: () =>
                import(
                    /* webpackChunkName: "watermark" */ '@/views/widgetsView/components/watermark/Index.vue'
                ),
            meta: {
                title: '水印',
            },
        },
        {
            path: '/widgets/imageCrop',
            name: '图片裁剪',
            component: () => import(/* webpackChunkName: "imageCrop" */ '@/views/widgetsView/components/imageCrop/Index.vue'),
            meta: { 
                title: '图片裁剪' 
              },
        },
  ],
};

export default router;
