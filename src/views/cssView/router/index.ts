const router = {
    path: '/css',
    name: '玩转Css',
    meta: {
        isShow: true,
        title: '玩转Css',
        icon: '&#xe778;',
    },
    redirect: '/css/rotationParallax',
    children: [
        {
            path: '/css/rotationParallax',
            name: '旋转中的视差效果',
            component: () =>
                import(
                    /* webpackChunkName: "rotationParallax" */ '@/views/cssView/components/rotationParallaxEffect/Index.vue'
                ),
            meta: {
                title: '旋转中的视差效果',
            },
        },
        {
            path: '/css/infiniteParallaxScrolling',
            name: '无限视差滚动效果',
            component: () =>
                import(
                    /* webpackChunkName: "infiniteParallaxScrolling" */ '@/views/cssView/components/infiniteParallaxScrolling/Index.vue'
                ),
            meta: {
                title: '无限视差滚动效果',
            },
        },
        {
            path: '/css/inclinedWheelSeeding',
            name: '3D倾斜轮播效果',
            component: () =>
                import(
                    /* webpackChunkName: "inclinedWheelSeeding" */ '@/views/cssView/components/inclinedWheelSeeding/Index.vue'
                ),
            meta: {
                title: '3D倾斜轮播效果',
            },
        },
    ],
};

export default router;
