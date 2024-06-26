import { createPinia } from 'pinia';

const store = createPinia();

export * from './packageStore';
export * from './routerStore';
export * from './themeStore';
export * from './permissionStore';

export default store;
