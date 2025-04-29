import { computed, onMounted, watch, onUnmounted } from 'vue';
import { useSystemConfigStore, type ThemeMode } from '@/store';

/**
 * useSystemConfig
 * @description 统一管理系统配置：主题模式、主题色、工具栏、导航栏
 * @returns {Object} 主题模式、是否暗黑、切换主题模式的函数
 * @example
 * const { mode, isDark, setMode } = useSystemConfig();
 * mode: 'auto' | 'light' | 'dark'
 * isDark: true | false
 * setMode('light') // 切换为亮色模式
 * setMode('dark') // 切换为暗黑模式
 * setMode('auto') // 切换为跟随系统模式
 */
export function useSystemConfig() {
    const store = useSystemConfigStore();

    /**
     * 主题模式
     */
    const mode = computed<ThemeMode>(() => store.themeMode);
    /**
     * 是否暗黑模式
     */
    const isDark = computed<boolean>(() => store.isDark);

    /**
     * 切换全局CSS变量
     * @param dark 是否暗黑模式
     */
    const updateGlobalStyles = (dark: boolean) => {
        const setRootCss = (
            cssName: string,
            lightValue: string | number,
            darkValue: string | number
        ) => {
            const value = dark ? darkValue : lightValue;
            document.documentElement.style.setProperty(`--${cssName}`, value.toString());
        };

        // 底板背景色
        setRootCss('bodyBackground', '255, 255, 255', '0, 0, 0');
        // 图表背景色
        setRootCss('chartBackgroundColor', '255, 255, 255', '10, 13, 31');
        // 图表文本字体色
        setRootCss('chartTextColor', '91, 91, 94', '255, 255, 255');
        // 底板背景透明度
        setRootCss('panelBackgroundAlpha', 0, 0.16);
        // T1-文本色
        setRootCss('textColor_1', '37, 57, 112', '220, 226, 237');
        // T3-文本色
        setRootCss('textColor_3', '116, 130, 159', '185, 198, 224');
        // 分割线透明度
        setRootCss('dividingLineAlpha', 0.46, 1);
        // 滚动条背景色透明度
        setRootCss('scrollbarAlpha', 0.26, 0.46);
        // 输入框边框色透明度
        setRootCss('inputBorderAlpha', 0.26, 0.46);
        // 列表头部背景色透明度
        setRootCss('datalistHeaderBackgroundAlpha', 0.12, 0.26);
        // 列表背景色透明度
        setRootCss('datalistBackgroundAlpha', 0.05, 0.12);
        // 列表鼠标划入背景色透明度
        setRootCss('datalistHoverBackgroundAlpha', 0.12, 0.26);
        // 分页器背景色透明度
        setRootCss('paginationBackgroundAlpha', 0.05, 0.12);
        // 分页器鼠标移入背景色透明度
        setRootCss('paginationHoverBackgroundAlpha', 0.12, 0.26);
        // 图表模块边框色透明度
        setRootCss('chartModuleBorderAlpha', 0.12, 1);
        // 图表模块鼠标移入边框色透明度
        setRootCss('chartModuleHoverBorderAlpha', 0.46, 1);
        // 统计数据背景色透明度
        setRootCss('dataCardBackgroundAlpha', 0.05, 0.26);
    };

    /**
     * 当 store 中 isDark 改变时，自动更新全局样式
     */
    watch(
        isDark,
        dark => {
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
        const saved = localStorage.getItem('themeMode') as ThemeMode | null;
        if (saved === 'auto' || saved === 'light' || saved === 'dark') {
            setMode(saved);
        } else {
            setMode('auto');
        }
    };

    onMounted(() => {
        loadThemeModeFromLocalStorage();
        watchSystemThemeChange();
    });

    return {
        mode,
        isDark,
        setMode,
    };
}
