import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Routes from './routers';
import { useRouterStore } from '@/store';
import NProgress from '@/utils/nprogress';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    ...Routes,
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/error/404',
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

router.beforeResolve((to, from, next) => {
    useRouterStore().setActiveRouter(to.path);
    next();
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
