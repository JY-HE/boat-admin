import { createApp } from 'vue';
import '@/assets/css/public.css';
import '@/assets/font/iconfont.css';
import '@/assets/font/iconfont.js';
import App from './App.vue';
import store from './store';
import router from '@/router';
import adaptiveResolution from '@/utils/adaptiveResolution';

// 创建vue实例
const app = createApp(App);

// 挂载pinia
app.use(store);
// 挂载vue-router
app.use(router);

adaptiveResolution();

// 挂载实例
app.mount('#app');
