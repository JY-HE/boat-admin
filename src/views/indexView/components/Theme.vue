<template>
    <div>
        <el-switch v-model="isDarkValue"></el-switch>
    </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();

const isDarkValue = ref<boolean>(false);

watch(isDarkValue, newValue => {
    themeModeHandler(newValue);
});

/**
 * 切换主题模式
 * @param isDark 是否暗黑模式
 */
const themeModeHandler = (isDark: boolean) => {
    themeStore.setThemeMode(isDark);
    globalStyleHandler(isDark);
};

/**
 * 切换全局样式变量
 * @param isDark 是否暗黑模式
 */
const globalStyleHandler = (isDark: boolean) => {
    // 底板背景色
    setRootCss(isDark, 'bodyBackground', '255, 255, 255', '0, 0, 0');
    // 底板背景透明度
    setRootCss(isDark, 'panelBackgroundAlpha', 0, 0.16);
    // T1-文本色
    setRootCss(isDark, 'textColor_1', '37, 57, 112', '220, 226, 237');
    // setTextColor1(!isDark ? '37, 57, 112' : '220, 226, 237');
    // T3-文本色
    setRootCss(isDark, 'textColor_3', '116, 130, 159', '185, 198, 224');
    // setTextColor3(!isDark ? '116, 130, 159' : '185, 198, 224');
    // 分割线透明度
    setRootCss(isDark, 'dividingLineAlpha', 0.46, 1);
    // 滚动条背景色透明度
    setRootCss(isDark, 'scrollbarAlpha', 0.26, 0.46);
    // 输入框边框色透明度
    setRootCss(isDark, 'inputBorderAlpha', 0.26, 0.46);
    // 列表头部背景色透明度
    setRootCss(isDark, 'datalistHeaderBackgroundAlpha', 0.12, 0.26);
    // 列表背景色透明度
    setRootCss(isDark, 'datalistBackgroundAlpha', 0.05, 0.12);
    // 列表鼠标划入背景色透明度
    setRootCss(isDark, 'datalistHoverBackgroundAlpha', 0.12, 0.26);
    // 分页器背景色透明度
    setRootCss(isDark, 'paginationBackgroundAlpha', 0.05, 0.12);
    // 分页器鼠标移入背景色透明度
    setRootCss(isDark, 'paginationHoverBackgroundAlpha', 0.12, 0.26);
    // 图表模块边框色透明度
    setRootCss(isDark, 'chartModuleBorderAlpha', 0.12, 1);
    // 图表模块鼠标移入边框色透明度
    setRootCss(isDark, 'chartModuleHoverBorderAlpha', 0.46, 1);
    // 统计数据背景色透明度
    setRootCss(isDark, 'dataCardBackgroundAlpha', 0.05, 0.26);
};

/**
 * 设置样式事件
 * @param isDark 是否暗黑模式
 * @param cssName 样式名
 * @param normalValue 正常模式值
 * @param isDarkValue 暗黑模式值
 */
const setRootCss = (
    isDark: boolean,
    cssName: string,
    normalValue: string | number,
    isDarkValue: string | number
) => {
    const value = isDark ? isDarkValue : normalValue;
    document.documentElement.style.setProperty(`--${cssName}`, value as string);
};

/**
 * 从localStorage获取主题模式
 */
const getThemeModeByLocalStorage = () => {
    const isDark = window.localStorage.getItem('isDark');
    isDarkValue.value = JSON.parse(isDark as string);
};

onMounted(() => {
    getThemeModeByLocalStorage();
});
</script>

<style lang="scss"></style>
