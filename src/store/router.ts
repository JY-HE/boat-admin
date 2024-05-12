import { defineStore } from 'pinia';

export const useRouterStore = defineStore({
    id: 'router', // id必填，且需要唯一
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
