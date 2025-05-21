<template>
    <div class="w-full">
        <Module title="颜色主题风格">
            <div
                class="w-fit-content text-h1 font-style-4 flex justify-between items-center gap-3 px-2 py-1 m-auto"
                :class="isDark ? 'bg-disabledColor-30' : 'bg-blackColor-7'"
            >
                <div
                    v-for="item in styles"
                    :key="item.name"
                    class="flex items-center gap-2 px-3 py-2 cursor-pointer"
                    :class="
                        mode === item.type
                            ? isDark
                                ? 'bg-blackColor-100'
                                : 'bg-whiteColor-100'
                            : ''
                    "
                    @click="setMode(item.type)"
                >
                    <BoatIconfont :icon="item.icon" />
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <div class="flex items-center justify-center text-h1 font-style-4 gap-40">
                <span>自定义主题色</span>
                <el-color-picker
                    v-model.trim="colorPick"
                    colorFormat="rgb"
                    @change="getRgbColor"
                ></el-color-picker>
            </div>
            <div class="flex flex-wrap justify-center gap-7">
                <div
                    v-for="color in colors"
                    :key="color"
                    class="w-[6rem] h-[4rem] rounded-xl flex items-center justify-center cursor-pointer border-solid border-disabledColor-50"
                    :style="{
                        'border-color': currentColor === color ? `rgba(${currentColor}, 0.5)` : '',
                        'border-width': currentColor === color ? '2px' : '1px',
                    }"
                    @click="changeThemeColor(color)"
                >
                    <div
                        class="w-[2.5rem] h-[1.2rem] rounded-[50%]"
                        :class="currentColor === color ? '-rotate-[30deg]' : ''"
                        :style="{ background: `rgb(${color})` }"
                    ></div>
                </div>
            </div>
        </Module>
    </div>
</template>

<script setup lang="ts">
import Module from '@/layouts/commonComponents/Module.vue';
import { useSystemConfig } from '@/hooks/useSystemConfig';
import { type ThemeMode } from '@/store';

const { themeColor, isDark, mode, setMode, setThemeColor } = useSystemConfig();

// 主题色变量
const currentColor = ref<string>('');
const colorPick = ref<string>('');
// 主题模式选项
const styles = [
    { name: '明亮', icon: '&#xe600;', type: 'light' as ThemeMode },
    { name: '暗黑', icon: '&#xe650;', type: 'dark' as ThemeMode },
    { name: '系统', icon: '&#xe994;', type: 'auto' as ThemeMode },
];
// 主题色预设
const colors = [
    '63, 81, 181',
    '0, 200, 140',
    '255, 77, 77',
    '255, 153, 0',
    '251, 218, 0',
    '116, 130, 159',
    '25, 62, 93',
    '115, 199, 237',
    '0, 255, 255',
];

const changeThemeColor = (color: string) => {
    currentColor.value = color;
    colorPick.value = `rgb(${color})`;
    setThemeColor(color);
};

const getRgbColor = (color: string | null) => {
    if (!color) return '';

    const match = color.match(/^rgb\s*\(\s*([\d\s,]+)\s*\)$/i);
    if (!match) return '';

    const rgbStr = match[1]
        .split(',')
        .map(v => v.trim())
        .filter(v => v !== '')
        .join(', ');

    changeThemeColor(rgbStr);
};

onMounted(() => {
    currentColor.value = themeColor.value;
    colorPick.value = `rgb(${currentColor.value})`;
});
</script>
