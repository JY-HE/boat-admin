<template>
    <div class="RotationParallaxEffect">
        <div class="box">
            <div v-for="(url, index) in imageUrls" :key="index" class="item">
                <img :src="url" alt="" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getAssetsImg } from '@/utils/global';

defineOptions({ name: 'RotationParallaxEffect' });

const imageUrls = ref<string[]>([]);

for (let i = 0; i < 5; i += 1) {
    const url = getAssetsImg(`${i + 1}.png`);
    imageUrls.value.push(url);
}
</script>

<style lang="scss">
.RotationParallaxEffect {
    @include wh;
    @include flexCenter;
    .box {
        @include whrem(500);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-template:
            'A A B'
            'C D B'
            'C E E';
        grid-gap: pxToRem(10);
        --d: 360deg;
        animation: rotate 10s linear infinite;
        .item {
            overflow: hidden;
            border: pxToRem(2) solid;
            @include themeColor(1, border-color);
            @include flexCenter;
            $areas: A, B, C, D, E;
            @for $i from 1 through length($areas) {
                &:nth-child(#{$i}) {
                    grid-area: nth($areas, $i);
                }
            }
            img {
                width: 300%;
                height: 300%;
                object-fit: cover;
                --d: -360deg;
                animation: rotate 10s linear infinite;
            }
        }
        @keyframes rotate {
            to {
                transform: rotate(var(--d));
            }
        }
    }
}
</style>
