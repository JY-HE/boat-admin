<template>
    <div class="BoatLayout">
        <div v-if="$slots.list" ref="boatLayoutList" class="boatLayout-list">
            <slot name="list"></slot>
        </div>
        <div v-if="$slots.content" class="boatLayout-main">
            <slot name="content"></slot>
        </div>
        <div v-if="isResize" ref="resize" class="resize" @mousedown="startResize"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    isResize: { type: Boolean, default: false },
    maxWidth: { type: Number, default: 0 },
});
const boatLayoutList = ref<HTMLElement | null>(null);
const resize = ref<HTMLElement | null>(null);

// 记录是否处于拖拽状态
let isResizing = ref(false);
// 鼠标开始拖拽时的初始横坐标
let startX = ref(0);
// 开始拖拽时左侧区域的初始宽度
let startWidth = ref(0);
// 左侧区域最小宽度
let minWidth = ref(0);
// 用于存储 requestAnimationFrame 的 ID
let animationFrameId = ref<number | null>(null);
// 当前的宽度变化值
let currentWidth = ref(0);

/**
 * 鼠标按下时，初始化拖拽状态，并开始监听鼠标移动事件
 * @param event 鼠标按下的事件对象
 */
const startResize = (event: MouseEvent) => {
    // 确保左侧布局 DOM 已绑定
    if (!boatLayoutList.value) return;

    // 设置拖拽状态为 true，记录初始鼠标位置和宽度
    isResizing.value = true;
    startX.value = event.clientX;
    startWidth.value = boatLayoutList.value.offsetWidth;

    // 监听鼠标移动和松开的事件
    document.addEventListener('mousemove', resizeHandler);
    document.addEventListener('mouseup', stopResize);
};

/**
 * 鼠标移动时，根据移动距离计算新的宽度并设置给左侧区域
 * @param event 鼠标移动的事件对象
 */
const resizeHandler = (event: MouseEvent) => {
    if (!isResizing.value || !boatLayoutList.value || !resize.value) return;

    // 计算新的宽度 = 初始宽度 + 鼠标移动的距离
    const newWidth = startWidth.value + (event.clientX - startX.value);
    // 将宽度限制在最小和最大范围之间
    currentWidth.value = Math.min(
        Math.max(newWidth, minWidth.value),
        props.maxWidth || minWidth.value * 2
    );
    // 使用 requestAnimationFrame 来优化更新频率
    if (animationFrameId.value === null) {
        animationFrameId.value = requestAnimationFrame(updateWidth);
    }
};

/**
 * 更新左侧布局宽度
 */
const updateWidth = () => {
    if (boatLayoutList.value && resize.value) {
        // 设置左侧区域的宽度
        boatLayoutList.value.style.width = `${currentWidth.value}px`;
        // 设置拖拽条的位置
        resize.value.style.left = `${currentWidth.value}px`;
    }
    // 重置 animationFrameId 以便下次可以再次请求
    animationFrameId.value = null;
};

/**
 * 鼠标松开时，停止拖拽并移除事件监听
 */
const stopResize = () => {
    if (!isResizing.value) return;

    // 停止拖拽，重置状态
    isResizing.value = false;
    // 移除全局的鼠标移动和松开事件监听
    document.removeEventListener('mousemove', resizeHandler);
    document.removeEventListener('mouseup', stopResize);
    // 如果有未执行的动画帧，则取消
    if (animationFrameId.value !== null) {
        cancelAnimationFrame(animationFrameId.value);
        animationFrameId.value = null;
    }
};

onMounted(() => {
    minWidth.value = boatLayoutList.value ? boatLayoutList.value.offsetWidth : 320 / 16;
});

onUnmounted(() => {
    document.removeEventListener('mousemove', resizeHandler);
    document.removeEventListener('mouseup', stopResize);
    if (animationFrameId.value !== null) {
        cancelAnimationFrame(animationFrameId.value);
    }
});
</script>
<style lang="scss">
.BoatLayout {
    @include wh;
    @include flexCenter;
    position: relative;

    .boatLayout-list {
        @include wh(pxToRem(320), 100%);
        overflow: hidden;
        padding: pxToRem(16) 0 pxToRem(16) pxToRem(16);
        border-right: pxToRem(1) solid;
        @include themeColor(var(--dividingLineAlpha), border-color);
    }

    .boatLayout-main {
        flex: 1;
        flex-shrink: 0;
        height: 100%;
        overflow: hidden;
        padding: pxToRem(16) pxToRem(16) pxToRem(16) pxToRem(32);
    }
    .resize {
        @include wh(pxToRem(2), 100%);
        @include themeColor(0, background-color);
        position: absolute;
        left: pxToRem(320);
        z-index: 100;
        cursor: col-resize;

        &:hover {
            @include themeColor(1, background-color);
        }
    }
}
</style>
