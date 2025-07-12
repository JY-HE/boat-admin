<template>
    <div class="DigitalScrolling">
        <div
            class="flex justify-start items-center mr-4 rounded-[50%] p-3"
            :style="{ backgroundColor: iconBackgroundColor }"
        >
            <BoatIconfont :icon="icon" />
        </div>
        <div class="flex flex-col justify-start items-start gap-2">
            <BoatCountTo :startValue="startValue" :endValue="endValue" />
            <p class="text-h3 font-style-4">{{ subContent }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'DigitalScrolling' });

defineProps({
    icon: { type: String, default: '&#xeb95;' },
    subContent: { type: String, default: '' },
    startValue: { type: Number, default: 0 },
    endValue: { type: Number, default: 0 },
    iconBackgroundColor: { type: String, default: 'transparent' },
});
</script>

<style lang="scss">
.DigitalScrolling {
    @include panelStyle;
    @include panelShadow(0.25);
    height: fit-content;
    min-height: pxToRem(128);
    padding: pxToRem(16);
    @include flexCenter(flex-start);
    border-radius: pxToRem(12);

    .BoatIconfont {
        @include whiteColor(1, color);
        @include iconSize(1);
    }
}
</style>
