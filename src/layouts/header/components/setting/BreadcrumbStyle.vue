<template>
    <div class="w-full">
        <Module title="面包屑导航">
            <div class="flex justify-between items-center text-h1 font-style-4">
                <div>风格</div>
                <div class="flex gap-2">
                    <div
                        v-for="style in breadcrumbStyles"
                        :key="style.name"
                        class="py-2 px-4 rounded-xl cursor-pointer border-solid border border-disabledColor-50"
                        :class="{
                            'bg-themeColor-100': breadcrumbStyle === style.type,
                            'text-h4': breadcrumbStyle === style.type,
                            'hover:bg-themeColor-10': breadcrumbStyle !== style.type,
                        }"
                        @click="setBreadcrumbStyle(style.type)"
                    >
                        {{ style.name }}
                    </div>
                </div>
            </div>
        </Module>
    </div>
</template>

<script setup lang="ts">
import Module from '@/layouts/commonComponents/Module.vue';
import { useSystemConfig } from '@/hooks/useSystemConfig';
import type { BreadcrumbStyle } from '@/store';

const { breadcrumbStyle, setBreadcrumbStyle } = useSystemConfig();

const breadcrumbStyles = [
    {
        name: '默认',
        type: 'default' as BreadcrumbStyle,
    },
    {
        name: '现代',
        type: 'modern' as BreadcrumbStyle,
    },
];
</script>
