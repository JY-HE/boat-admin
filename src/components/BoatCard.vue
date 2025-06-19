<template>
    <div
        class="BoatCard flex justify-start items-start flex-col w-full rounded-xl"
        :class="className"
    >
        <div class="w-full flex justify-start items-center text-h1 py-4 px-6">
            <slot name="title">
                <h1>{{ title }}</h1>
            </slot>
        </div>
        <div class="content flex-1 w-full py-4 px-6 h-auto" :class="contentClassName">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    title?: string;
    className?: string;
    contentClassName?: string;
}
defineProps<Props>();
</script>

<style lang="scss">
.BoatCard {
    @include panelStyle;
    @include panelShadow(0.25);
    height: fit-content;
}
</style>
