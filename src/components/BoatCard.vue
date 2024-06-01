<template>
    <div class="BoatCard">
        <div class="title">
            <slot name="title">
                <h1>{{ title }}</h1>
            </slot>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    title: { type: String, default: '' },
});
</script>

<style lang="scss">
.BoatCard {
    @include flexCenter(flex-start, flex-start, true);
    @include panelStyle;
    @include panelShadow;
    border-radius: pxToRem(20);
    width: 100%;
    height: fit-content;

    .title {
        width: 100%;
        @include flexCenter(flex-start, center);
        @include fontColor(1);
        padding: pxToRem(16) pxToRem(24);
    }
    .content {
        width: 100%;
        @include flexCenter(flex-start, center);
        padding: pxToRem(16) pxToRem(24);
        min-height: pxToRem(96);
    }
}
</style>
