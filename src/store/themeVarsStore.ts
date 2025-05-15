import { defineStore } from 'pinia';
import type { ThemeVars } from '@/utils/appConfig';

export const useThemeVarsStore = defineStore('themeVars', {
    state: () => {
        return {
            themeVars: null as ThemeVars | null,
        };
    },
    actions: {
        setThemeVars(vars: ThemeVars) {
            this.themeVars = vars;
        },
    },
});
