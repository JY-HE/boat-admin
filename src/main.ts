import App from './App.vue';
import { createApp } from 'vue';
import store from './store';
import router from '@/router';
import adaptiveResolution from '@/utils/adaptiveResolution';
import '@/styles/public.css';
import '@/styles/elementUI.scss';

async function initializeApp() {
    // 初始化自适应页面
    await adaptiveResolution();
    // 创建 vue 实例
    const app = createApp(App);
    // 注册 Pinia
    app.use(store);
    // 注册 Vue-router
    app.use(router);
    // 注册指令
    // 卸载载入动画
    const loadingView = window.document.getElementById('loadingMaskView');
    if (loadingView) loadingView.style.display = 'none';
    // 挂载
    app.mount('#app');
}

initializeApp();
