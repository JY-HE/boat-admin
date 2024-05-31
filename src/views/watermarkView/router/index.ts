const router = {
    path: '/watermark',
    name: '水印',
    meta: {
        isShow: true,
        title: '水印',
        icon: '&#xe734;',
    },
    redirect: '/watermark/textWatermark',
    children: [
        {
            path: '/watermark/textWatermark',
            name: '文字水印',
            component: () =>
                import(
                    /* webpackChunkName: "textWatermark" */ '@/views/watermarkView/components/TextWatermark.vue'
                ),
            meta: {
                title: '文字水印',
            },
        },
        {
            path: '/watermark/imageWatermark',
            name: '图片水印',
            component: () =>
                import(
                    /* webpackChunkName: "imageWatermark" */ '@/views/watermarkView/components/ImageWatermark.vue'
                ),
            meta: {
                title: '图片水印',
            },
        },
    ],
};

export default router;
