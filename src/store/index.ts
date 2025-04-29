import { createPinia } from 'pinia';

const store = createPinia();

export * from './packageStore';
export * from './routerStore';
export * from './permissionStore';
export * from './authStore';
export * from './useSystemConfigStore';

export default store;
