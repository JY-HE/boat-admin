import { createPinia } from 'pinia';

const store = createPinia();

export * from './packageStore';
export * from './routerStore';
export * from './layoutStore';
export * from './permissionStore';
export * from './authStore';

export default store;
