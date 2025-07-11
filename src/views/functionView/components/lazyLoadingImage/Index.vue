<template>
    <div class="LazyLoadingImage">
        <BoatTips
            >实现一个 v-lazy 指令，利用 Intersection Observer
            监听元素进入视口后再动态加载图片，以提升性能和用户体验。</BoatTips
        >
        <div class="grid gap-4 grid-cols-4 mt-4">
            <div
                v-for="img in images"
                :key="img.id"
                class="overflow-hidden relative bg-disabledColor-50 w-full h-[18rem]"
            >
                <img
                    v-lazy="img.url"
                    alt="懒加载示例"
                    class="absolute w-full h-full object-cover"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'LazyLoadingImage' });

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
