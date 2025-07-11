<template>
    <div ref="virtualListRef" class="w-full h-full scrollbarStyle relative" @scroll="scrollEvent">
        <div
            class="w-full absolute top-0 left-0 z-[-1]"
            :style="{ height: listHeight + 'px' }"
        ></div>
        <div
            class="w-full absolute top-0 left-0 flex gap-4 flex-col"
            :style="{ transform: getTransform }"
        >
            <div
                v-for="item in visibleData"
                ref="items"
                :key="item.index"
                class="flex justify-center items-center bg-themeColor-40 rounded font-style-1 text-h1"
                :style="{ height: localItemHeight + 'px' }"
            >
                {{ item.index + 1 }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useSystemConfigStore } from '@/store';

defineOptions({ name: 'FixedHeightVirtualList' });

const props = defineProps({
    listData: { type: Array as PropType<{ index: number; value: string }[]>, default: () => [] },
    itemHeight: { type: Number, default: 120 },
});

const systemConfigStore = useSystemConfigStore();

// 列表父容器的引用
const virtualListRef = ref<HTMLElement | null>(null);
const screenHeight = ref(0); // 可视区域高度
const startIndex = ref(0); // 起始索引
const endIndex = ref(0); // 结束索引
const startOffset = ref(0); // 偏移量
const localItemHeight = ref(props.itemHeight); // 每项高度
const bufferCount = 3; // 缓冲数量
/**
 * 列表总高度
 * @returns {number} 列表高度
 */
const listHeight = computed(() => props.listData.length * localItemHeight.value);

/**
 * 可显示的列表项数
 * @returns {number} 可显示的项数
 */
const visibleCount = computed(() => {
    // 增大可视 count，多渲染 3 条作 buffer，以避免快速滚动或分辨率微调时的空白闪烁
    return Math.ceil(screenHeight.value / localItemHeight.value) + bufferCount;
});

/**
 * 偏移量对应的 style
 * @returns {string} 平移量
 */
const getTransform = computed(() => {
    return `translate3d(0, ${startOffset.value}px, 0)`; // 计算平移量
});

/**
 * 获取真实显示的列表数据
 * @returns {any[]} 可见的列表数据
 */
const visibleData = computed(() => {
    return props.listData.slice(startIndex.value, Math.min(endIndex.value, props.listData.length));
});

/**
 * 滚动事件处理函数
 */
const scrollEvent = () => {
    if (!virtualListRef.value) return;
    // 当前滚动位置
    const scrollTop = virtualListRef.value.scrollTop;
    // 判断是否已经滚动到底部，防止不必要的事件触发
    if (
        scrollTop + screenHeight.value >= listHeight.value &&
        endIndex.value >= props.listData.length
    )
        return;
    // 计算当前的起始索引
    startIndex.value = Math.floor(scrollTop / localItemHeight.value);
    // 计算结束索引
    endIndex.value = startIndex.value + visibleCount.value;
    // 计算偏移量
    startOffset.value = scrollTop - (scrollTop % localItemHeight.value);
};

watchEffect(() => {
    // 重新计算参数渲染
    localItemHeight.value = props.itemHeight * systemConfigStore.scale;
    if (virtualListRef.value) {
        const { scrollTop, offsetHeight } = virtualListRef.value;
        screenHeight.value = offsetHeight;
        // scrollTop - localItemHeight.value * bufferCount 为了保证分辨率改变时出现偏移量留白问题
        startIndex.value = Math.floor(
            Math.max(0, scrollTop - localItemHeight.value * bufferCount) / localItemHeight.value
        );
        // 计算结束索引
        endIndex.value = startIndex.value + visibleCount.value;
        // 计算偏移量
        startOffset.value = scrollTop - (scrollTop % localItemHeight.value);
    }
});

onMounted(() => {
    if (virtualListRef.value) {
        // 获取可视区域高度
        screenHeight.value = virtualListRef.value.offsetHeight;
    }
    // 初始化结束索引
    endIndex.value = startIndex.value + visibleCount.value;
});
</script>
