import { computed, onMounted, watch, onUnmounted } from 'vue';
import { useSystemConfigStore, useThemeVarsStore } from '@/store';
import type { ThemeMode, CopyrightConfig, BreadcrumbStyle } from '@/store';

/**
 * useSystemConfig
 * @description 统一管理系统配置：主题模式、主题色、工具栏、导航栏
 * @returns {Object} 主题模式、是否暗黑、切换主题模式等函数
 */
export function useSystemConfig() {
    const store = useSystemConfigStore();

    const mode = computed<ThemeMode>(() => store.themeMode);
    const themeColor = computed<string>(() => store.themeColor);
    const isDark = computed<boolean>(() => store.isDark);
    const isHideMenu = computed<boolean>(() => store.isHideMenu);
    const scale = computed<number>(() => store.scale);
    const copyrightConfig = computed<CopyrightConfig>(() => store.copyrightConfig);
    const breadcrumbStyle = computed<BreadcrumbStyle>(() => store.breadcrumbStyle);

    /**
     * 切换全局CSS变量
     * @param dark 是否暗黑模式
     */
    const updateGlobalStyles = (dark: boolean) => {
        const setRootCss = (cssName: string, value: string | number) => {
            document.documentElement.style.setProperty(`--${cssName}`, value.toString());
        };

        const { themeVars } = useThemeVarsStore();
        if (!themeVars) {
            console.warn('[useThemeVarsStore] themeVars is null');
            return;
        }
        const configs = dark ? themeVars.dark : themeVars.light;
        if (!configs || !configs.length) {
            console.warn('[useThemeVarsStore] configs is empty');
            return;
        }
        for (const { cssName, value } of configs) {
            setRootCss(cssName, value);
        }
    };

    /**
     * 当 store 中 isDark 改变时，自动更新全局样式
     */
    watch(
        isDark,
        dark => {
            document.body.setAttribute('mode', dark ? 'dark' : 'normal');
            updateGlobalStyles(dark);
        },
        { immediate: true }
    );

    /**
     * 监听系统主题变化（仅mode=auto时）
     */
    const watchSystemThemeChange = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = (e: MediaQueryListEvent) => {
            if (mode.value === 'auto') {
                store.setIsDark(e.matches);
            }
        };
        mediaQuery.addEventListener('change', listener);
        onUnmounted(() => {
            mediaQuery.removeEventListener('change', listener);
        });
    };

    /**
     * 切换主题颜色
     * @param color 主题色 RGB值，格式为 'R, G, B'，例如 '63, 81, 181'
     * @example
     * setThemeColor('63, 81, 181')
     */
    const setThemeColor = (color: string) => {
        store.setThemeColor(color);
        document.documentElement.style.setProperty('--themeColor', color);
    };

    /**
     * 切换主题模式接口
     * @param newMode 新主题模式
     */
    const setMode = (newMode: ThemeMode) => {
        store.setThemeMode(newMode);

        // 切完 mode 之后，马上同步一次 isDark
        if (newMode === 'auto') {
            const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            store.setIsDark(sysDark);
        } else {
            store.setIsDark(newMode === 'dark');
        }
    };

    /**
     * 从LocalStorage加载主题模式
     */
    const loadThemeModeFromLocalStorage = () => {
        const systemConfigSaved = localStorage.getItem('systemConfig') || null;
        if (systemConfigSaved) {
            const { themeColor } = JSON.parse(systemConfigSaved);
            setThemeColor(themeColor);
        }
    };

    onMounted(() => {
        loadThemeModeFromLocalStorage();
        watchSystemThemeChange();
    });

    return {
        mode,
        isDark,
        themeColor,
        isHideMenu,
        scale,
        copyrightConfig,
        breadcrumbStyle,
        setMode,
        setThemeColor,
        setHideMenu: store.setHideMenu,
        setScale: store.setScale,
        setCopyrightConfig: store.setCopyrightConfig,
        setBreadcrumbStyle: store.setBreadcrumbStyle,
    };
}
