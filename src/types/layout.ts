import type { RouteRecordRaw } from 'vue-router';
/**
 * 路由配置类型
 *
 * @description 继承自 vue-router 的 RouteRecordRaw，无侵入，仅仅只扩展 meta，meta除了扩展的属性外，同时支持添加任意自定义属性，
 * 外链的话  path给   '/'+链接   例： `/https://element-plus.org`
 *
 */
export type PlusRouteRecordRaw = Partial<Omit<RouteRecordRaw, 'children'>> & {
    /**
     * 路由地址，支持外链
     */
    path: string;
    /**
     * meta除了扩展的属性外，同时支持添加任意自定义属性
     *
     */
    meta: {
        /**
         * 页面标题
         */
        title: string;
        /**
         * 图标
         */
        icon?: string;
        /**
         * 是否显示在侧边栏（一级菜单需要设置）
         */
        isShow?: boolean;
        /**
         * 是否显示子菜单，默认 false
         */
        isShowChildRouter?: boolean;
        /**
         * 排序，默认为 0 只对第一级有效
         */
        sort?: number;
        /**
         * 在侧边栏菜单中隐藏，默认 false 不隐藏
         */
        hideInMenu?: boolean;
        /**
         * 隐藏面包屑，默认 false 不隐藏
         */
        hideInBreadcrumb?: boolean;
        /**
         * 是否保存页面滚动位置，默认 false 不保存
         */
        saveScroll?: boolean;
    };
    children?: PlusRouteRecordRaw[];
};
