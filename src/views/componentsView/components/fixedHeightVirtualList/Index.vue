<template>
    <div class="fixed-virtual-list">
        <div ref="containerRef" class="container" @scroll="handleScroll">
            <div class="container-list" :style="getStyle">
                <div v-for="i in renderList" :key="i" class="container-list-item">
                    {{ i }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    itemHeight: { type: Number, default: 120 },
});
// 可视区域容器
const containerRef = ref<HTMLElement | null>(null);

// 渲染的数据列表
let renderList = ref<number[]>([]);
// 可视区域高度
let containerHeight = ref(0);
// 每项高度（转换后）
let localItemHeight = ref(0);
// 起始索引
let startIndex = ref(0);
// 结束索引
let endIndex = ref(0);
// 偏移量
let startOffset = ref(0);
// 用于存储 requestAnimationFrame 的 ID
let animationFrameId = ref<number | null>(null);
// 模拟数据源
const dataSource = computed(() => {
    return Array.from({ length: 1000 }, (_, i) => i);
});
// 可视区域最大容纳量
const maxCount = computed(() => {
    return Math.ceil(containerHeight.value / localItemHeight.value) + 1;
});
// 偏移量对应的style
const getStyle = computed(() => {
    return {
        // 计算 height 用于解决偏移量导致的留白
        height: `${dataSource.value.length * localItemHeight.value - startOffset.value}px`,
        transform: `translate3d(0, ${startOffset.value}px, 0)`,
    };
});

/**
 * 处理滚动
 * @param event 滚动事件对象
 */
function handleScroll(event: Event) {
    const { scrollTop } = event.target as HTMLElement;
    startIndex.value = Math.floor(scrollTop / localItemHeight.value);
    startOffset.value = startIndex.value * localItemHeight.value;
    endIndex.value = startIndex.value + maxCount.value;
    // 使用 requestAnimationFrame 来优化更新频率
    if (animationFrameId.value === null) {
        animationFrameId.value = requestAnimationFrame(updateData);
    }
}

/*
 * 更新数据
 */
function updateData() {
    renderList.value = dataSource.value.slice(
        startIndex.value,
        Math.min(endIndex.value, dataSource.value.length)
    );
    // 重置 animationFrameId 以便下次可以再次请求
    animationFrameId.value = null;
}

/**
 * 初始化
 */
function init() {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    // 缩放后的每项高度（因为使用的是rem）
    localItemHeight.value = (Number.parseInt(fontSize) / 16) * props.itemHeight;
    containerHeight.value = containerRef.value?.offsetHeight || 0;
    endIndex.value = startIndex.value + maxCount.value;
    updateData();
}
onMounted(() => {
    init();
});
</script>

<style lang="scss">
.fixed-virtual-list {
    @include flexCenter;
    position: relative;

    .container {
        width: pxToRem(700);
        height: pxToRem(900);
        @include scrollbarStyle;
        border: pxToRem(2) solid;
        @include themeColor(0.3, border-color);

        &-list {
            @include wh;
            @include flexCenter(flex-start, center, true);
            gap: pxToRem(16);

            &-item {
                width: 90%;
                height: pxToRem(120);
                @include themeColor(0.4, background-color);
                flex-shrink: 0;
                border-radius: pxToRem(8);
                @include flexCenter;
                @include fontStyle(1);
                @include fontColor(1);
            }
        }
    }
}
</style>
