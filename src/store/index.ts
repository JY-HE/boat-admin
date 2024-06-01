import { createPinia } from 'pinia';

const store = createPinia();

export * from './packageStore';
export * from './routerStore';
export * from './themeStore';

export default store;
