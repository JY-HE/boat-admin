import { defineStore } from 'pinia';

export const useThemeStore = defineStore({
    id: 'theme',
    state: () => {
        return {
            isDark: false, // 是否暗黑模式
            isHideMenu: false, // 是否隐藏菜单栏
        };
    },
    actions: {
        setThemeMode(mode: boolean) {
            this.isDark = mode;
            window.localStorage.setItem('isDark', JSON.stringify(this.isDark));
            document.body.setAttribute('mode', this.isDark ? 'dark' : 'normal');
        },
        setHideMenu(hide: boolean) {
            this.isHideMenu = hide;
        },
    },
});
