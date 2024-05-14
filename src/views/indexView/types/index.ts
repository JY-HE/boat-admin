import { RouteRecordRaw } from 'vue-router';

export interface CustomRouteMeta {
    title: string;
    isShow?: boolean;
    isShowChildRouter?: boolean;
}

export type CustomRouteRecordRaw = RouteRecordRaw & {
    meta: CustomRouteMeta;
};
