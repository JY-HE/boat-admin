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
                    @click="setMode(item.type as ThemeMode)"
                >
                    <BoatIconfont :icon="item.icon" />
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </Module>
    </div>
</template>

<script setup lang="ts">
import Module from '@/layouts/commonComponents/Module.vue';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ThemeMode } from '@/store';

const { isDark, mode, setMode } = useThemeMode();

const styles = [
    {
        name: '明亮',
        icon: '&#xe600;',
        type: 'light',
    },
    {
        name: '暗黑',
        icon: '&#xe650;',
        type: 'dark',
    },
    {
        name: '系统',
        icon: '&#xe994;',
        type: 'auto',
    },
];
</script>
