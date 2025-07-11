<template>
    <div class="inclinedWheelSeeding">
        <div class="content">
            <img
                v-for="(i, index) in imgs"
                :key="index"
                :src="i"
                alt=""
                class="item"
                @click="handleImgClick(index)"
            />
        </div>
        <div class="prev" @click="handlePrev"></div>
        <div class="next" @click="handleNext"></div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'InclinedWheelSeeding' });

const imgs = computed(() => {
    return [
        new URL('@/assets/img/1.png', import.meta.url).href,
        new URL('@/assets/img/2.png', import.meta.url).href,
        new URL('@/assets/img/3.png', import.meta.url).href,
        new URL('@/assets/img/4.png', import.meta.url).href,
        new URL('@/assets/img/5.png', import.meta.url).href,
    ];
});
let items: NodeListOf<Element> | null = null;
let currentIndex = ref(2);

function handlePrev() {
    currentIndex.value = currentIndex.value - 1;
    if (currentIndex.value < 0) {
        currentIndex.value = 0;
    }
    handelLayout();
}

function handleNext() {
    currentIndex.value = currentIndex.value + 1;
    if (currentIndex.value > imgs.value.length - 1) {
        currentIndex.value = imgs.value.length - 1;
    }
    handelLayout();
}

function handleImgClick(index: number) {
    currentIndex.value = index;
    handelLayout();
}

function handelLayout() {
    if (!items) return;
    const xOffsetStep = 150; // 两种轮播图之间的间隔
    const scaleStep = 0.7; // 缩放的递减倍率
    const opacityStep = 0.7; // 透明度的递减倍率
    for (let i = 0; i < items.length; i += 1) {
        const item = items[i] as HTMLElement;
        const sign = Math.sign(i - currentIndex.value); // 正负符号
        let xOffset = (i - currentIndex.value) * xOffsetStep; // 偏移量
        if (i !== currentIndex.value) {
            xOffset = xOffset + 200 * sign;
        }
        const dis = Math.abs(i - currentIndex.value); // 距离
        const scale = scaleStep ** dis;
        const rotateY = i === currentIndex.value ? 0 : 60 * -sign;
        item.style.transform = `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
        item.style.opacity = (opacityStep ** dis).toString();
        item.style.zIndex = (items.length - dis).toString();
    }
}

onMounted(() => {
    items = document.querySelectorAll('.item');
    handelLayout();
});
</script>

<style lang="scss">
.inclinedWheelSeeding {
    position: relative;
    .content {
        @include wh;
        @include flexCenter(center, center);
        position: relative;
        img {
            position: absolute;
            @include whrem(670, 400);
            object-fit: cover;
            transition: 0.3s linear;
            cursor: pointer;
        }
    }
    .prev,
    .next {
        @include whrem(70, 100);
        @include disabledColor(0.2, background-color);
        @include whiteColor(0.6, color);
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        @include flexCenter;
        z-index: 100;
        &:hover {
            @include disabledColor(0.4, background-color);
            @include whiteColor(1, color);
        }
        &::after {
            display: block;
            @include flexCenter;
            font-size: pxToRem(50);
            line-height: pxToRem(50);
        }
    }
    .prev {
        left: pxToRem(50);
        &::after {
            content: '<';
        }
    }
    .next {
        right: pxToRem(50);
        &::after {
            content: '>';
        }
    }
}
</style>
