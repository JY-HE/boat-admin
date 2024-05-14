import { createApp } from 'vue';
import '@/assets/css/public.css';
import App from './App.vue';
import store from './store';
import router from '@/router';
import adaptiveResolution from '@/utils/adaptiveResolution';

const app = createApp(App);

app.use(store);
app.use(router);

async function initializeApp() {
    await adaptiveResolution();

    app.mount('#app');

    setTimeout(() => {
        // 暂时让loading持续1s
        const loadingView = window.document.getElementById('loadingMaskView');
        if (loadingView) loadingView.style.display = 'none';
    }, 1000);
}

initializeApp();
