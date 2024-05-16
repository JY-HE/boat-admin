import { defineStore } from 'pinia';

export const useThemeStore = defineStore({
    id: 'theme', // id必填，且需要唯一
    state: () => {
        return {
            isDark: false, // 是否暗黑模式
        };
    },
    actions: {
        setThemeMode(mode: boolean) {
            this.isDark = mode;
        },
    },
});
