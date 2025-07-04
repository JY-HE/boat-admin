<template>
    <div class="ImageCard">
        <div class="image-box">
            <img :src="image" alt="Image" />
        </div>
        <div class="image-info">
            <div v-if="tag" class="tag">{{ tag }}</div>
            <div class="title font-style-2 text-h2 mb-4">
                {{ title || '- -' }}
            </div>
            <div class="flex justify-start align-center gap-4 font-style-4 text-h3">
                <div>
                    <BoatIconfont icon="&#xe627;" />
                    <span class="ml-1">{{ formatNumberWithCommas(views || 0) }}</span>
                </div>
                <div>
                    <BoatIconfont icon="&#xe6af;" />
                    <span class="ml-1">{{ formatNumberWithCommas(reviews || 0) }}</span>
                </div>
                <div>{{ date || '- -' }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumberWithCommas } from '@/utils/global';

interface Props {
    image?: string;
    tag?: string;
    title?: string;
    views?: number;
    reviews?: number;
    date?: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.ImageCard {
    width: pxToRem(400);
    @include flexCenter(flex-start, flex-start, true);
    @include panelStyle;
    @include panelShadow(0.25);
    border-radius: pxToRem(12);
    overflow: hidden;

    .image-box {
        @include whrem(100%, 244);

        img {
            @include wh;
            object-fit: fill;
            cursor: pointer;
            transition: transform 0.3s ease-in-out;
            &:hover {
                transform: scale(1.05);
            }
        }
    }

    .image-info {
        @include whrem(100%, 146);
        padding: pxToRem(16);
        @include flexCenter(flex-start, flex-start, true);

        .tag {
            @include fontStyle(4);
            @include fontColor(2);
            padding: pxToRem(2) pxToRem(4);
            border-radius: pxToRem(4);
            @include disabledColor(0.15, background-color);
            margin-bottom: pxToRem(8);
        }

        .title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
@include darkStyle {
    .ImageCard {
        .image-info {
            .tag {
                @include whiteColor(1, color);
            }
        }
    }
}
</style>
