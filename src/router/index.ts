import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/Home.vue'),
                meta: {
                    isShow: true, // 控制当前项是否在菜单栏中渲染出来，比如你写了 login 页面的路由，但是并不希望 login在menu菜单中渲染出来，即可设为false
                    title: '首页', // menu菜单项的名称，没啥好说的
                    icon: '&#xe622;', // menu菜单项的图标，我此处是与封装好的 svg 组件结合使用的
                },
            },
            {
                path: '/echarts',
                name: 'echartIndex',
                // component: () => import('@/views/echarts/index.vue'),
                meta: {
                    isShow: true,
                    title: 'Echarts页',
                    icon: '&#xe622;',
                },
                children: [
                    {
                        path: '/echarts/barCharts',
                        name: 'barCharts',
                        component: () => import('@/views/echarts/barCharts.vue'),
                        meta: {
                            title: '柱状图',
                        },
                    },
                    {
                        path: '/echarts/pieCharts',
                        name: 'pieCharts',
                        component: () => import('@/views/echarts/pieCharts.vue'),
                        meta: {
                            title: '饼图',
                        },
                    },
                ],
            },
            {
                path: '/package',
                name: 'packageIndex',
                component: () => import('@/views/package/index.vue'),
                meta: {
                    isShow: true,
                    title: '组件',
                    icon: '&#xe622;',
                },
            },
            {
                path: '/menu',
                name: 'menuIndex',
                redirect: '/menu/menu-1',
                meta: {
                    isShow: true,
                    title: '一级菜单',
                    icon: '&#xe622;',
                },
                children: [
                    {
                        path: '/menu/menu-1',
                        name: 'menu-1',
                        component: () => import('@/views/menu/menu1.vue'),
                        meta: {
                            title: '二级菜单-1',
                        },
                    },
                    {
                        path: '/menu/menu-2',
                        name: 'menu-2',
                        component: () => import('@/views/menu/menu2.vue'),
                        meta: {
                            title: '二级菜单-2',
                        },
                        children: [
                            {
                                path: '/menu/menu-2/children',
                                name: 'menu3',
                                component: () => import('@/views/menu/menu3.vue'),
                                meta: {
                                    title: '三级菜单',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
