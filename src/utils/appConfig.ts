import axios, { type AxiosResponse } from 'axios';
import { useThemeVarsStore } from '@/store';

export interface ThemeVar {
    cssName: string;
    value: string | number;
    description?: string;
}

export interface ThemeVars {
    light: ThemeVar[];
    dark: ThemeVar[];
}

/**
 * AppConfig 类用于加载和管理应用的主题变量配置。
 * 它从指定的 JSON 文件中获取主题变量，并提供方法来访问这些变量。
 */
class AppConfig {
    private configStyle: ThemeVars = { light: [], dark: [] };

    async init(): Promise<void> {
        try {
            const response: AxiosResponse<ThemeVars> = await axios.get(
                `${import.meta.env.BASE_URL}theme-vars.json`,
                {
                    headers: {
                        'Cache-Control': 'no-cache',
                    },
                }
            );

            const configStyle = response.data;

            if (configStyle?.light && configStyle?.dark) {
                this.configStyle = configStyle;
                useThemeVarsStore().setThemeVars(configStyle);
            } else {
                console.warn('[AppConfig] Invalid structure:', configStyle);
            }
        } catch (err) {
            console.error('[AppConfig] Fetch failed:', err);
        }
    }

    getConfig(): ThemeVars {
        return this.configStyle;
    }

    getVarsByMode(mode: 'light' | 'dark'): ThemeVar[] {
        return this.configStyle[mode] || [];
    }
}

export default new AppConfig();
