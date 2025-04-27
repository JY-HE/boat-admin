<template>
    <div class="Module w-full h-fit-content flex flex-col gap-4">
        <div class="title text-h3 font-style-4 flex justify-between items-center gap-6">
            {{ title }}
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        default: '',
    },
});
</script>

<style lang="scss">
.Module {
    .title {
        &::before,
        &::after {
            content: '';
            display: block;
            flex: 1;
            height: pxToRem(1);
            @include themeColor(var(--dividingLineAlpha), background-color);
        }
    }
}
</style>
