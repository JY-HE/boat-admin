<template>
    <div class="LazyLoadingImage">
        <div
            v-for="img in images"
            :key="img.id"
            class="overflow-hidden relative bg-disabledColor-50"
        >
            <img v-lazy="img.url" alt="懒加载示例" class="absolute w-full h-full object-cover" />
        </div>
    </div>
</template>

<script lang="ts" setup>
interface ImageItem {
    id: number;
    url: string;
}

// 创建 100 张图片（使用 picsum.photos 生成示例图）
const images = ref<ImageItem[]>(
    Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        url: `https://picsum.photos/400/200?${i + 1}`,
    }))
);
</script>

<style lang="scss">
.LazyLoadingImage {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: pxToRem(16);

    div {
        @include whrem(100%, 300);
    }
}
</style>
