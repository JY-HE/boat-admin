<template>
    <div class="ProgressCard">
        <div class="w-full flex justify-between">
            <div
                class="flex justify-center items-center rounded-lg w-[3rem] h-[3rem]"
                :style="{ backgroundColor: iconBackgroundColor }"
            >
                <BoatIconfont :icon="icon" />
            </div>
            <div class="flex flex-col justify-start items-start gap-2">
                <BoatCountTo :endValue="value" unit="%" />
                <p class="text-h3 font-style-4">{{ subContent }}</p>
            </div>
        </div>
        <div class="progress-bar">
            <div
                class="progress"
                :style="{
                    backgroundColor: progressColor,
                    '--width': value ? `${value}%` : '0%',
                }"
            ></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ProgressCard' });

defineProps({
    icon: { type: String, default: '&#xeb95;' },
    subContent: { type: String, default: '' },
    value: { type: Number, default: 0 },
    iconBackgroundColor: { type: String, default: 'transparent' },
    progressColor: { type: String, default: '#409eff' },
});
</script>

<style lang="scss">
.ProgressCard {
    @include panelStyle;
    @include panelShadow(0.25);
    height: fit-content;
    min-height: pxToRem(128);
    padding: pxToRem(16);
    @include flexCenter(space-around, center, true);
    border-radius: pxToRem(12);

    .BoatIconfont {
        @include whiteColor(1, color);
        @include iconSize(1);
    }
    .progress-bar {
        width: 100%;
        height: pxToRem(8);
        @include disabledColor(0.15, background-color);
        border-radius: pxToRem(4);
        overflow: hidden;

        .progress {
            width: 0%;
            height: 100%;
            animation: progress 4s ease;
            animation-fill-mode: forwards;
            border-radius: pxToRem(4);
        }
    }
    @keyframes progress {
        0% {
            width: 0;
        }
        100% {
            width: var(--width);
        }
    }
}
</style>
