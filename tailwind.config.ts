/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

// #region ------------------------- 将字体样式列表转换为 Tailwind CSS 实用工具类 -------------------------
const fontStyleList = {
    1: { fontSize: '1.375rem', lineHeight: '1.375rem', fontWeight: 'bolder' },
    2: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 'bolder' },
    3: { fontSize: '0.875rem', lineHeight: '1.375rem', fontWeight: 'bolder' },
    4: { fontSize: '0.875rem', lineHeight: '1.375rem', fontWeight: 'normal' },
    5: { fontSize: '0.75rem', lineHeight: '1.375rem', fontWeight: 'normal' },
};
//
const fontPlugin = plugin(({ addUtilities }) => {
    const utilities = Object.entries(fontStyleList).reduce((acc, [key, value]) => {
        // 定义类名，例如 `.font-style-1`
        const className = `.font-style-${key}`;
        const styles = {
            fontSize: value.fontSize,
            lineHeight: value.lineHeight,
            fontWeight: value.fontWeight,
            fontFamily: '微软雅黑',
        };

        return { ...acc, [className]: styles };
    }, {});
    // 添加新的实用工具类
    addUtilities(utilities);
});
// #endregion ---------------------- 将字体样式列表转换为 Tailwind CSS 实用工具类 - END -------------------

// #region ------------------------- 定义主题颜色 -------------------------

const colors = {
    whiteColor: 'var(--whiteColor)', // 基础白色
    blackColor: 'var(--blackColor)', // 基础黑色
    bodyBackground: 'var(--bodyBackground)',
    themeColor: 'var(--themeColor)', // 强调色/主题色
    successColor: 'var(--successColor)', // 成功/安全色
    normalColor: 'var(--normalColor)', // 常规色
    errorColor: 'var(--errorColor)', // 告警/错误色
    warnColor: 'var(--warnColor)', // 警告/提醒色
    assistColorYellow: 'var(--assistColorYellow)', // 警告/辅助色-黄
    disabledColor: 'var(--disabledColor)', // 故障/禁用色
};
const generateColorUtilities = (colors: { [key: string]: string }) => {
    const utilities: { [key: string]: { [key: string]: string } } = {};

    Object.entries(colors).forEach(([name, value]) => {
        for (let alpha = 0; alpha <= 100; alpha++) {
            const alphaValue = (alpha / 100).toFixed(2);
            const colorWithAlpha = `rgba(${value}, ${alphaValue})`;

            utilities[`.text-${name}-${alpha}`] = {
                color: colorWithAlpha,
                transition:
                    'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
            };
            utilities[`.bg-${name}-${alpha}`] = {
                backgroundColor: colorWithAlpha,
                transition:
                    'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
            };
            utilities[`.border-${name}-${alpha}`] = {
                borderColor: colorWithAlpha,
                transition:
                    'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
            };

            utilities[`.text-${name}-${alpha}-important`] = {
                color: colorWithAlpha + ' !important',
                transition:
                    'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
            };
            utilities[`.bg-${name}-${alpha}-important`] = {
                backgroundColor: colorWithAlpha + ' !important',
                transition:
                    'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
            };
            utilities[`.border-${name}-${alpha}-important`] = {
                borderColor: colorWithAlpha + ' !important',
                transition:
                    'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
            };
        }
        // 输入框边框色透明度
        utilities[`.border-${name}-inputBorderAlpha`] = {
            border: '0.0625rem solid',
            borderColor: `rgba(${value}, var(--inputBorderAlpha))`,
            transition:
                'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
        };
        // 分割线透明度
        utilities[`.border-${name}-dividingLineAlpha`] = {
            border: '0.0625rem solid',
            borderColor: `rgba(${value}, var(--dividingLineAlpha))`,
            transition:
                'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
        };
        // 图表模块边框色透明度
        utilities[`.border-${name}-chartModuleBorderAlpha`] = {
            border: '0.0625rem solid',
            borderColor: `rgba(${value}, var(--chartModuleBorderAlpha))`,
            transition:
                'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
        };
        // 图表模块鼠标移入边框色透明度
        utilities[`.border-${name}-chartModuleHoverBorderAlpha`] = {
            border: '0.0625rem solid',
            borderColor: `rgba(${value}, var(--chartModuleHoverBorderAlpha))`,
            transition:
                'color var(--baseTransition) background var(--baseTransition) border-color var(--baseTransition)',
        };
    });

    return utilities;
};
const colorPlugin = plugin(({ addUtilities }) => {
    const utilities = generateColorUtilities(colors);
    addUtilities(utilities);
});
// #endregion ---------------------- 定义主题颜色 - END -------------------

const config: Config = {
    content: ['./index.html', './src/**/*.{html,js,vue}'],
    theme: {
        colors: {
            h1: 'rgb(var(--textColor_1))',
            h2: 'rgb(var(--textColor_2))',
            h3: 'rgb(var(--textColor_3))',
            h4: 'rgb(var(--textColor_4))',
            whiteColor: colors.whiteColor,
            blackColor: colors.blackColor,
            bodyBackground: colors.bodyBackground,
            themeColor: colors.themeColor,
            successColor: colors.successColor,
            normalColor: colors.normalColor,
            errorColor: colors.errorColor,
            warnColor: colors.warnColor,
            assistColorYellow: colors.assistColorYellow,
            disabledColor: colors.disabledColor,
        },
        extend: {},
    },
    plugins: [fontPlugin, colorPlugin],
};

export default config;
