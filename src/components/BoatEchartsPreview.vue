<template>
    <div class="BoatEchartsPreview">
        <picture @click="dialogVisible = true">
            <source v-if="isDarkMode" :srcset="darkSrc" />
            <source v-else :srcset="lightSrc" />
            <img src="/img/logo.png" alt="default" />
        </picture>
        <div class="w-full h-12 pl-2 info">
            <div class="text-h1 font-style-2">{{ title }}</div>
            <div class="text-h2 font-style-3">{{ enTitle }}</div>
        </div>
        <el-dialog
            v-model="dialogVisible"
            class="echarts-preview-dialog"
            :title="title || enTitle"
            appendToBody
            draggable
            destroyOnClose
        >
            <component :is="componentChart"></component>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store';
defineProps({
    title: {
        type: String,
        default: '',
    },
    enTitle: {
        type: String,
        default: '',
    },
    darkSrc: {
        type: String,
        default: '',
    },
    lightSrc: {
        type: String,
        default: '',
    },
    componentChart: {
        type: Object,
        default: () => ({}),
    },
});

const isDarkMode = ref(false);
const dialogVisible = ref(false);
watch(
    () => useLayoutStore().isDark,
    newValue => {
        isDarkMode.value = newValue;
    },
    {
        immediate: true,
    }
);
</script>

<style lang="scss">
.BoatEchartsPreview {
    @include whrem(322, 336);
    @include flexCenter(center, center, true);
    overflow: hidden;
    gap: pxToRem(16);

    picture {
        width: 100%;
        height: calc(100% - #{pxToRem(48)});
        cursor: pointer;
        border-radius: pxToRem(8);
        border: pxToRem(1) solid;
        @include themeColor(var(--chartModuleBorderAlpha), border-color);
        overflow: hidden;

        &:hover {
            img {
                transform: scale(1.1);
            }
        }
        img {
            @include wh;
            transition: all 0.3s ease;
            object-fit: fill;
        }
    }
}
.echarts-preview-dialog {
    @include whrem(1524, 800);
    .el-dialog__body {
        height: calc(100% - #{pxToRem(48)});
    }
}
</style>
