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
                    /* webpackChunkName: "rotationParallax" */ '@/views/cssView/components/RotationParallaxEffect.vue'
                ),
            meta: {
                title: '旋转中的视差效果',
            },
        },
    ],
};

export default router;
