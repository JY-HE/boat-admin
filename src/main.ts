import App from './App.vue';
import { createApp } from 'vue';
import store, { useSystemConfigStore } from '@/store';
import router from '@/router';
import adaptiveResolution from '@/utils/adaptiveResolution';
import appConfig from '@/utils/appConfig';
import { registerGlobalProperties } from '@/utils/globalProperties';
import directives from '@/directives';
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import '@/styles/tailwind.css';
// 全局样式
import '@/styles/global.scss';
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

    // 注册全局属性
    registerGlobalProperties(app);

    // 初始化自适应页面
    await adaptiveResolution(data => {
        const layoutStore = useSystemConfigStore();
        layoutStore.setScale(data.ratio);
    });

    // 配置初始化，获取并存储本地配置
    await appConfig.init();

    // 卸载载入动画
    const loadingView = window.document.getElementById('loadingMaskView');
    if (loadingView) loadingView.style.display = 'none';
    // 挂载
    app.mount('#app');
}

initializeApp();
