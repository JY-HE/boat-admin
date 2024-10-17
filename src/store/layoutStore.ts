import { defineStore } from 'pinia';

/**
 * 页面相关配置
 */
export const useLayoutStore = defineStore({
    id: 'layout',
    state: () => {
        return {
            isDark: false, // 是否暗黑模式
            isHideMenu: false, // 是否隐藏菜单栏
            scale: 1, // 页面缩放比例
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
        setScale(scale: number) {
            this.scale = parseFloat(scale.toFixed(2));
        },
    },
});
