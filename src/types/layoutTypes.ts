import { RouteRecordRaw } from 'vue-router';

/**
 * 路由菜单的类型定义
 */
export interface CustomRouteMeta {
    title: string;
    isShow?: boolean;
    isShowChildRouter?: boolean;
}

export type CustomRouteRecordRaw = RouteRecordRaw & {
    meta: CustomRouteMeta;
    name: string;
};
