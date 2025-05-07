import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(piniaPluginPersistedstate);

export * from './packageStore';
export * from './routerStore';
export * from './permissionStore';
export * from './authStore';
export * from './systemConfigStore';
export * from './saveScrollStore';

export default store;
