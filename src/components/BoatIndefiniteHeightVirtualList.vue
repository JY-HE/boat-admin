<template>
    <div
        ref="virtualListRef"
        class="BoatIndefiniteHeightVirtualList w-full h-full scrollbarStyle relative"
        @scroll="scrollEvent"
    >
        <div
            class="w-full absolute top-0 left-0 z-[-1]"
            :style="{ height: listHeight + 'px' }"
        ></div>
        <div
            class="w-full absolute top-0 left-0 flex gap-4 flex-col"
            :style="{ transform: getTransform }"
        >
            <div
                v-for="item in renderList"
                class="flex justify-center items-center bg-themeColor-40 rounded font-style-1 text-h1 p-4"
                ref="itemRefs"
                :key="item.index"
                :data-index="item.index"
            >
                <span class="mr-4">{{ item.index }}</span>
                <span class="font-style-3"> {{ item.value }} </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useSystemConfigStore } from '@/store';

const props = defineProps({
    listData: { type: Array as PropType<{ index: number; value: string }[]>, default: () => [] },
    itemHeight: { type: Number, default: 70 },
});

const systemConfigStore = useSystemConfigStore();

const virtualListRef = ref<HTMLElement | null>(null); // 列表父容器的引用
const itemRefs = ref<HTMLElement[]>([]); // 列表项的引用数组

const screenHeight = ref(0); // 可视区域高度
const startIndex = ref(0); // 起始索引
const offset = ref(0); // 偏移量
const localItemHeight = ref(props.itemHeight); // 根据系统配置缩放计算每项高度
const bufferCount = 3; // 缓冲数量

watch(
    () => systemConfigStore.scale,
    newScale => {
        if (!virtualListRef.value) return;

        localItemHeight.value = props.itemHeight * newScale;

        // 更新 screenHeight
        screenHeight.value = virtualListRef.value.offsetHeight;

        // 获取当前 scrollTop
        const scrollTop = virtualListRef.value.scrollTop;

        // 重新计算起始索引和偏移量
        startIndex.value = getStart(scrollTop);
        offset.value = positions.value[startIndex.value]?.top || 0;
    },
    { immediate: true }
);

const positions = ref<
    {
        index: number;
        height: number;
        top: number;
        bottom: number;
    }[]
>([]);

watch(() => props.listData, initPosition, {
    immediate: true,
});

/**
 * 初始化位置数组，计算每个列表项的位置
 */
function initPosition() {
    positions.value = [];
    props.listData.forEach((_, index) => {
        positions.value.push({
            index,
            height: localItemHeight.value,
            top: index * localItemHeight.value,
            bottom: (index + 1) * localItemHeight.value,
        });
    });
}

/**
 * 更新每个列表项的高度和位置
 */
function updatePosition() {
    itemRefs.value.forEach(el => {
        const dataIndex = el.getAttribute('data-index');
        if (dataIndex === null) return;
        const index = +dataIndex as number;
        const realHeight = el.getBoundingClientRect().height;
        // 计算当前项的高度差
        let diffVal = positions.value[index].height - realHeight;
        const curItem = positions.value[index];
        // 说明item的高度不等于预估值
        if (diffVal !== 0) {
            // 更新当前项的高度和位置
            curItem.height = realHeight;
            curItem.bottom = curItem.bottom - diffVal;
            // 更新后续项的位置
            for (let i = index + 1; i < positions.value.length; i++) {
                positions.value[i].top = positions.value[i].top - diffVal;
                positions.value[i].bottom = positions.value[i].bottom - diffVal;
            }
        }
    });
}

/**
 * 获取列表总高度
 * @returns {number} 列表高度
 */
const listHeight = computed(() => positions.value.at(-1)?.bottom || 0);

/**
 * 获取渲染的列表项数量
 * @returns {number} 渲染的列表项数量
 */
const renderCount = computed(
    () => Math.ceil(screenHeight.value / localItemHeight.value) + bufferCount
);

/**
 * 获取结束索引
 * @returns {number} 结束索引
 */
const endIndex = computed(() => startIndex.value + renderCount.value);

/**
 * 获取真实显示的列表数据
 * @returns {any[]} 可见的列表数据
 */
const renderList = computed(() => {
    return props.listData.slice(startIndex.value, Math.min(endIndex.value, props.listData.length));
});

/**
 * 偏移量对应的 style
 * @returns {string} 平移量
 */
const getTransform = computed(() => {
    return `translate3d(0, ${offset.value}px, 0)`; // 计算平移量
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
    startIndex.value = getStart(scrollTop);
    offset.value = positions.value[startIndex.value].top;
};

/**
 * 获取起始索引，使用二分查找法来获取起始索引
 * @param scrollTop 当前滚动位置
 * @returns 起始索引
 */
function getStart(scrollTop: number): number {
    let left = 0;
    let right = positions.value.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (positions.value[mid].bottom === scrollTop) {
            return mid + 1;
        } else if (positions.value[mid].bottom < scrollTop) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}

onMounted(() => {
    if (virtualListRef.value) {
        // 获取可视区域高度
        screenHeight.value = virtualListRef.value.offsetHeight;
    }
});

onUpdated(() => {
    updatePosition();
});
</script>
