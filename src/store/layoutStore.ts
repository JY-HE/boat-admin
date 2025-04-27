import { defineStore } from 'pinia';

export type ThemeMode = 'auto' | 'light' | 'dark';

/**
 * useLayoutStore
 * @description 管理全局布局相关状态（主题、缩放、菜单栏等）
 */
export const useLayoutStore = defineStore('layout', {
    state: () => ({
        // 主题相关
        isDark: false, // 当前是否暗黑模式
        themeMode: 'auto' as ThemeMode, // 当前主题模式

        // 布局相关
        isHideMenu: false, // 是否隐藏菜单栏
        scale: 1, // 页面缩放比例
    }),

    actions: {
        /**
         * 设置当前是否是暗黑模式
         * @param dark 是否暗黑
         */
        setIsDark(dark: boolean) {
            this.isDark = dark;
            document.body.setAttribute('mode', dark ? 'dark' : 'normal');
        },

        /**
         * 设置主题模式
         * @param mode 主题模式
         */
        setThemeMode(mode: ThemeMode) {
            this.themeMode = mode;
            localStorage.setItem('themeMode', mode);
        },

        /**
         * 设置菜单栏隐藏状态
         * @param hide 是否隐藏菜单栏
         */
        setHideMenu(hide: boolean) {
            this.isHideMenu = hide;
        },

        /**
         * 设置页面缩放比例
         * @param scale 缩放比例
         */
        setScale(scale: number) {
            this.scale = parseFloat(scale.toFixed(2));
        },
    },
});
