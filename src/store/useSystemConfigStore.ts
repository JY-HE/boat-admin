import { defineStore } from 'pinia';

/**
 * 主题模式
 */
export type ThemeMode = 'auto' | 'light' | 'dark';

/**
 * 系统配置状态
 */
export interface SystemConfigState {
    /**
     * 主题模式
     */
    themeMode: ThemeMode;
    /**
     * 当前是否是暗黑模式
     */
    isDark: boolean;
    /**
     * 主题色 RGB值，格式为 'R, G, B'，例如 '63, 81, 181'
     */
    themeColor: string;
    /**
     * 是否隐藏菜单栏
     */
    isHideMenu: boolean;
    /**
     * 页面缩放比例
     */
    scale: number;
}

/**
 * useSystemConfigStore
 * @description 管理全局系统配置：主题模式、主题色、工具栏、导航栏等
 */
export const useSystemConfigStore = defineStore('systemConfig', {
    persist: {
        key: 'systemConfig',
        storage: window.localStorage,
    },
    state: (): SystemConfigState => ({
        // 主题相关
        isDark: false,
        themeMode: 'auto' as ThemeMode,
        themeColor: '63, 81, 181',

        // 布局相关
        isHideMenu: false,
        scale: 1,
    }),
    actions: {
        /**
         * 设置当前是否是暗黑模式
         * @param dark 是否暗黑
         * @example
         * setIsDark(true)
         */
        setIsDark(dark: boolean) {
            this.isDark = dark;
        },

        /**
         * 设置主题模式
         * @param mode 主题模式
         * @example
         * setThemeMode('auto')
         */
        setThemeMode(mode: ThemeMode) {
            this.themeMode = mode;
        },

        /**
         * 设置主题色
         * @param color 主题色 RGB值，格式为 'R, G, B'，例如 '63, 81, 181'
         * @example
         * setThemeColor('63, 81, 181')
         */
        setThemeColor(color: string) {
            this.themeColor = color;
        },

        /**
         * 设置菜单栏隐藏状态
         * @param hide 是否隐藏菜单栏
         * @example
         * setHideMenu(true)
         */
        setHideMenu(hide: boolean) {
            this.isHideMenu = hide;
        },

        /**
         * 设置页面缩放比例
         * @param scale 缩放比例
         * @example
         * setScale(1.2)
         */
        setScale(scale: number) {
            this.scale = parseFloat(scale.toFixed(2));
        },
    },
});
