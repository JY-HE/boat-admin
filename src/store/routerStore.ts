import { defineStore } from 'pinia';

export const useRouterStore = defineStore('router', {
    state: () => {
        return {
            activeRouter: '',
        };
    },
    actions: {
        setActiveRouter(router: string) {
            this.activeRouter = router;
        },
    },
});
