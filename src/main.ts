import App from './App.vue';
import { createApp } from 'vue';
import store, { useLayoutStore } from './store';
import router from '@/router';
import adaptiveResolution from '@/utils/adaptiveResolution';
import directives from '@/directives';
import '@/styles/public.css';
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import '@/styles/tailwind.css';
// 自定义基础全局样式
import '@/styles/base.scss';
// 自定义element全局样式
import '@/styles/elementUI.scss';
import { BoatNotification } from '@koihe/boat-ui';
import '@koihe/boat-ui/es/notification/style/index';
import '@koihe/boat-ui/dist/iconfont.js';

async function initializeApp() {
    // 创建 vue 实例
    const app = createApp(App);
    // 注册 Pinia
    app.use(store);
    // 注册 Vue-router
    app.use(router);
    // 注册指令
    app.use(directives);
    // 全局配置
    app.config.globalProperties.$BoatNotify = BoatNotification;
    // 初始化自适应页面
    await adaptiveResolution(data => {
        const layoutStore = useLayoutStore();
        layoutStore.setScale(data.ratio);
    });
    // 卸载载入动画
    const loadingView = window.document.getElementById('loadingMaskView');
    if (loadingView) loadingView.style.display = 'none';
    // 挂载
    app.mount('#app');
}

initializeApp();
