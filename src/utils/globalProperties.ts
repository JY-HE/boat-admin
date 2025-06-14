import type { App } from 'vue';
import { BoatNotification } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/notification/style/index';

/**
 * 注册全局属性
 * @param {App} app - Vue 应用实例
 */
export function registerGlobalProperties(app: App): void {
    app.config.globalProperties.$BoatNotify = BoatNotification;
}
