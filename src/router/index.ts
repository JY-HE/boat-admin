import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Routes from './routers';
import { useRouterStore } from '@/store';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    ...Routes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeResolve((to, from, next) => {
    useRouterStore().setActiveRouter(to.path);
    next();
});

export default router;
