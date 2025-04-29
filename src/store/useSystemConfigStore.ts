import { defineStore } from 'pinia';

export type ThemeMode = 'auto' | 'light' | 'dark';

/**
 * useSystemConfigStore
 * @description 管理全局系统配置：主题模式、主题色、工具栏、导航栏等
 */
export const useSystemConfigStore = defineStore('systemConfig', {
    state: () => ({
        // 主题相关
        isDark: false, // 当前是否暗黑模式
        themeMode: 'auto' as ThemeMode, // 当前主题模式
        themeColor: '', // 主题色

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
         * 设置主题色
         * @param color 主题色 RGB值，格式为 'R, G, B'，例如 '63, 81, 181'
         * @example
         * setThemeColor('63, 81, 181')
         */
        setThemeColor(color: string) {
            this.themeColor = color;
            document.documentElement.style.setProperty('--themeColor', color);
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
