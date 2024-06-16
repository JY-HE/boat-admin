<template>
    <div class="BoatTitle w-full h-8 flex justify-between items-center mb-4 relative">
        <h2 :title="title" class="text-h1 relative flex-1">
            <p class="absolute truncate max-w-full">{{ title }}</p>
        </h2>
        <div operation :class="{ showMore: showMore, expand: expand }">
            <div buttonList :style="{ '--maxWidth': maxWidth }">
                <div ref="slotButtonList" slotButtonList><slot></slot></div>
                <BoatIconButton
                    v-if="showMore"
                    class="showMoreButton"
                    :icon="!expand ? '&#xeb26;' : '&#xec15;'"
                    :title="!expand ? '更多' : '收起'"
                    @click="showHideHandle"
                ></BoatIconButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElementRefType } from '@/types';
const props = withDefaults(
    defineProps<{
        title: string;
        maxShowBtnCount?: number;
    }>(),
    {
        maxShowBtnCount: 3,
    }
);

const showMore = ref(false);
const expand = ref(false);
const slotButtonList = ref<ElementRefType>(null);

const maxWidth = computed(() => {
    return `${(30 * props.maxShowBtnCount + 6 * props.maxShowBtnCount) / 16}rem`;
});

const showHideHandle = () => {
    expand.value = !expand.value;
};

onMounted(() => {
    if (slotButtonList.value) {
        const buttonList = slotButtonList.value.querySelectorAll('.BoatIconButton');
        if (buttonList.length > props.maxShowBtnCount) showMore.value = true;
    }
});
</script>

<style lang="scss">
.BoatTitle {
    div[operation] {
        @include wh(auto, 100%);
        position: absolute;
        right: 0;
        @include flexCenter(flex-end);
        transition: width 0.5s, background-color 0.5s, backdrop-filter 0.1s;
        backdrop-filter: blur(0);
        div[buttonList] {
            width: var(--maxWidth);
            overflow: hidden;
            @include flexCenter(space-between);

            div[slotButtonList] {
                @include flexCenter(flex-start);
            }
            .BoatIconButton {
                margin-left: pxToRem(6);
                &.showMoreButton {
                    position: absolute;
                    right: 0;
                }
            }
        }
        &.showMore {
            padding-right: pxToRem(36);
            div[buttonList] {
                width: var(--maxWidth);
                text-align: left;
            }
        }
        &.expand {
            width: 100%;
            backdrop-filter: blur(pxToRem(2));
            @include whiteColor(0.6, background-color);
            div[buttonList] {
                width: fit-content;
            }
        }
    }
}
</style>
