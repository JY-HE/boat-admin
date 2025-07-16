<template>
    <div class="BoatImageCrop">
        <input
            v-show="false"
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleSelectImage"
        />

        <div class="crop-container">
            <BoatTitle :title="cropTitle" />
            <div
                class="canvas-container"
                @wheel.prevent="onWheel"
                @mousemove="onDragOrResize"
                @mouseup="endInteraction"
                @mouseleave="endInteraction"
            >
                <canvas ref="canvas" class="main-canvas"></canvas>
                <canvas ref="maskCanvas" class="mask-canvas"></canvas>
                <div
                    v-if="imageLoaded"
                    class="crop-control"
                    :style="{
                        left: crop.x + 'px',
                        top: crop.y + 'px',
                        width: crop.width + 'px',
                        height: crop.height + 'px',
                    }"
                    @mousedown.stop.prevent="startDrag($event)"
                >
                    <div
                        v-for="dir in dirs"
                        :key="dir"
                        class="control-btn"
                        :class="dir"
                        @mousedown.stop.prevent="startResize($event, dir)"
                    ></div>
                    <div
                        v-for="line in 4"
                        :key="line"
                        :class="['control-line', 'line-' + line]"
                    ></div>
                </div>
            </div>

            <div class="operation-btn">
                <boat-button @click="handleSelectImageBtn">选择图片</boat-button>
                <boat-button @click="resetCrop" type="error">重置</boat-button>
            </div>
        </div>

        <div class="preview-container">
            <BoatTitle :title="previewTitle" />
            <div class="preview-img">
                <img v-if="croppedDataUrl" :src="croppedDataUrl" alt="预览图" />
            </div>
            <boat-button @click="handleConfirmBtn" :disabled="!croppedDataUrl">{{
                confirmBtnText
            }}</boat-button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    /** 裁剪标题 */
    cropTitle?: string;
    /** 预览标题 */
    previewTitle?: string;
    /** 确定按钮文本 */
    confirmBtnText?: string;
}

const props = withDefaults(defineProps<Props>(), {
    cropTitle: '图片裁剪',
    previewTitle: '预览效果',
    confirmBtnText: '确定',
});

const emit = defineEmits<{
    (e: 'confirm', imageUrl: string): void;
}>();

// 获取组件实例及全局通知方法
const instance = getCurrentInstance();
if (!instance || !instance.proxy) throw new Error('getCurrentInstance() 失败');
const proxy = instance.proxy as any;

// 元素引用
const fileInput = ref<HTMLInputElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const maskCanvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let maskCtx: CanvasRenderingContext2D | null = null;

// 图片加载状态及尺寸
const image = new Image();
const imageLoaded = ref(false);
const containerSize = reactive({ width: 0, height: 0 });
const imageSize = reactive({ width: 0, height: 0 });

// 缩放与偏移
const scale = ref(1);
const minScale = ref(1);
const maxScale = ref(3);
const offset = reactive({ x: 0, y: 0 });

// 裁剪框与交互状态
const crop = reactive({ x: 50, y: 50, width: 200, height: 200 });
const dragging = ref(false);
const resizing = ref(false);
const resizeDir = ref('');
const startPos = reactive({ x: 0, y: 0, w: 0, h: 0, cx: 0, cy: 0 });

// 裁剪后结果
const croppedDataUrl = ref('');
const dirs = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

/**
 * 触发隐藏文件输入，用于选择图片
 */
function handleSelectImageBtn(): void {
    fileInput.value?.click();
}

/**
 * 处理文件选择事件，加载图片并初始化画布
 * @param e 文件输入 change 事件对象
 */
function handleSelectImage(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    if (!file.type.startsWith('image/')) {
        proxy.$BoatNotify({ title: 'Error', content: '请选择图片文件！', type: 'error' });
        target.value = '';
        return;
    }
    const url = URL.createObjectURL(file);
    image.src = url;
    image.onload = () => {
        imageLoaded.value = true;
        imageSize.width = image.width;
        imageSize.height = image.height;
        nextTick(() => {
            initCanvas();
            resetCanvasView();
            resetCrop();
        });
        URL.revokeObjectURL(url);
    };
}

/**
 * 初始化主图与蒙版 Canvas 大小和上下文
 */
function initCanvas(): void {
    if (!canvas.value || !maskCanvas.value) return;
    const rect = canvas.value.parentElement!.getBoundingClientRect();
    containerSize.width = rect.width;
    containerSize.height = rect.height;
    [canvas.value, maskCanvas.value].forEach(el => {
        el.width = rect.width;
        el.height = rect.height;
    });
    ctx = canvas.value.getContext('2d');
    maskCtx = maskCanvas.value.getContext('2d');
}

/**
 * 计算缩放比例并将图片居中绘制
 */
function resetCanvasView(): void {
    if (!ctx) return;
    const sx = containerSize.width / imageSize.width;
    const sy = containerSize.height / imageSize.height;
    minScale.value =
        imageSize.width <= containerSize.width && imageSize.height <= containerSize.height
            ? 1
            : Math.min(sx, sy);
    scale.value = minScale.value;
    offset.x = (containerSize.width - imageSize.width * scale.value) / 2;
    offset.y = (containerSize.height - imageSize.height * scale.value) / 2;
    draw();
}

/**
 * 绘制主图与蒙版层
 */
function draw(): void {
    if (!ctx) return;
    ctx.clearRect(0, 0, containerSize.width, containerSize.height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale.value, scale.value);
    ctx.drawImage(image, 0, 0);
    ctx.restore();
    drawMask();
}

/**
 * 绘制暗色蒙版，仅保留裁剪区亮色
 */
function drawMask(): void {
    if (!maskCtx) return;
    // 全面填充半透明黑色
    maskCtx.clearRect(0, 0, containerSize.width, containerSize.height);
    maskCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    maskCtx.fillRect(0, 0, containerSize.width, containerSize.height);
    // 擦除裁剪区域
    maskCtx.clearRect(crop.x, crop.y, crop.width, crop.height);
}

/**
 * 处理滚轮事件，进行缩放并重新居中
 * @param e WheelEvent 对象
 */
function onWheel(e: WheelEvent): void {
    if (!imageLoaded.value) return; // 仅在加载后
    e.preventDefault();
    scale.value =
        e.deltaY < 0
            ? Math.min(maxScale.value, scale.value * 1.1)
            : Math.max(minScale.value, scale.value / 1.1);
    offset.x = (containerSize.width - imageSize.width * scale.value) / 2;
    offset.y = (containerSize.height - imageSize.height * scale.value) / 2;
    draw();
    cropImage();
}

/**
 * 开始拖拽裁剪框
 * @param e MouseEvent 对象
 */
function startDrag(e: MouseEvent): void {
    if (!imageLoaded.value) return;
    dragging.value = true;
    startPos.cx = crop.x;
    startPos.cy = crop.y;
    const rect = canvas.value!.getBoundingClientRect();
    startPos.x = e.clientX - rect.left;
    startPos.y = e.clientY - rect.top;
}

/**
 * 开始调整裁剪框大小
 * @param e MouseEvent 对象
 * @param dir 调整方向标识
 */
function startResize(e: MouseEvent, dir: string): void {
    if (!imageLoaded.value) return;
    resizing.value = true;
    resizeDir.value = dir;
    startPos.w = crop.width;
    startPos.h = crop.height;
    startPos.cx = crop.x;
    startPos.cy = crop.y;
    const rect = canvas.value!.getBoundingClientRect();
    startPos.x = e.clientX - rect.left;
    startPos.y = e.clientY - rect.top;
}

/**
 * 拖拽或调整过程中调用，更新裁剪框位置或大小
 * @param e MouseEvent 对象
 */
function onDragOrResize(e: MouseEvent): void {
    if (!imageLoaded.value || !canvas.value) return;
    const rect = canvas.value.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (dragging.value && !resizing.value) {
        const dx = mx - startPos.x;
        const dy = my - startPos.y;
        crop.x = Math.max(0, Math.min(startPos.cx + dx, containerSize.width - crop.width));
        crop.y = Math.max(0, Math.min(startPos.cy + dy, containerSize.height - crop.height));
    }
    if (resizing.value) {
        let dx = mx - startPos.x;
        let dy = my - startPos.y;
        if (resizeDir.value.includes('e'))
            crop.width = Math.min(containerSize.width - crop.x, Math.max(20, startPos.w + dx));
        if (resizeDir.value.includes('w')) {
            const newW = Math.max(20, startPos.w - dx);
            crop.x = Math.min(startPos.cx + dx, startPos.cx + startPos.w - 20);
            crop.width = Math.min(containerSize.width - crop.x, newW);
        }
        if (resizeDir.value.includes('s'))
            crop.height = Math.min(containerSize.height - crop.y, Math.max(20, startPos.h + dy));
        if (resizeDir.value.includes('n')) {
            const newH = Math.max(20, startPos.h - dy);
            crop.y = Math.min(startPos.cy + dy, startPos.cy + startPos.h - 20);
            crop.height = Math.min(containerSize.height - crop.y, newH);
        }
    }
    drawMask();
}

/**
 * 结束拖拽或调整，固定裁剪框并更新预览
 */
function endInteraction(): void {
    if (dragging.value || resizing.value) {
        dragging.value = false;
        resizing.value = false;
        cropImage();
    }
}

/**
 * 重置裁剪框至画布中心位置
 */
function resetCrop(): void {
    if (!imageLoaded.value) return;
    crop.x = (containerSize.width - crop.width) / 2;
    crop.y = (containerSize.height - crop.height) / 2;
    draw();
    cropImage();
}

/**
 * 生成裁剪结果的图片数据 URL
 */
function cropImage(): void {
    if (!imageLoaded.value) return;
    const temp = document.createElement('canvas');
    temp.width = crop.width;
    temp.height = crop.height;
    const tctx = temp.getContext('2d')!;
    const sx = (crop.x - offset.x) / scale.value;
    const sy = (crop.y - offset.y) / scale.value;
    tctx.drawImage(
        image,
        sx,
        sy,
        crop.width / scale.value,
        crop.height / scale.value,
        0,
        0,
        crop.width,
        crop.height
    );
    croppedDataUrl.value = temp.toDataURL('image/png');
}

/**
 * 处理裁剪图下载
 */
function handleConfirmBtn(): void {
    if (!croppedDataUrl.value) {
        proxy.$BoatNotify({ title: 'Error', content: '请先裁剪图片！', type: 'error' });
        return;
    }
    emit('confirm', croppedDataUrl.value);
}
</script>

<style lang="scss">
$handle-size: pxToRem(8);
$handle-offset: ($handle-size / 2) * -1;
$dirs-map: (
    nw: (
        left: $handle-offset,
        top: $handle-offset,
        cursor: nwse-resize,
    ),
    n: (
        left: 50%,
        top: $handle-offset,
        transform: translateX(-50%),
        cursor: ns-resize,
    ),
    ne: (
        right: $handle-offset,
        top: $handle-offset,
        cursor: nesw-resize,
    ),
    e: (
        right: $handle-offset,
        top: 50%,
        transform: translateY(-50%),
        cursor: ew-resize,
    ),
    se: (
        right: $handle-offset,
        bottom: $handle-offset,
        cursor: nwse-resize,
    ),
    s: (
        left: 50%,
        bottom: $handle-offset,
        transform: translateX(-50%),
        cursor: ns-resize,
    ),
    sw: (
        left: $handle-offset,
        bottom: $handle-offset,
        cursor: nesw-resize,
    ),
    w: (
        left: $handle-offset,
        top: 50%,
        transform: translateY(-50%),
        cursor: ew-resize,
    ),
);
$lines: (
    1: (
        axis: y,
        percent: 33.333%,
    ),
    2: (
        axis: y,
        percent: 66.667%,
    ),
    3: (
        axis: x,
        percent: 33.333%,
    ),
    4: (
        axis: x,
        percent: 66.667%,
    ),
);
.BoatImageCrop {
    display: flex;
    gap: pxToRem(32);

    .crop-container {
        overflow: hidden;
        @include flexCenter(flex-start, flex-start, true);

        .canvas-container {
            @include whrem(700, 380);
            position: relative;
            overflow: hidden;

            canvas {
                @include wh;
                position: absolute;
                top: 0;
                left: 0;
            }

            .main-canvas {
                display: block;
                user-select: none;
                border: pxToRem(1) solid;
                @include themeColor(0.1, border-color);
                @include whiteColor(1, background-color);
                background-image: linear-gradient(
                        45deg,
                        rgba(0, 0, 0, 0.25) 25%,
                        transparent 0,
                        transparent 75%,
                        rgba(0, 0, 0, 0.25) 0
                    ),
                    linear-gradient(
                        45deg,
                        rgba(0, 0, 0, 0.25) 25%,
                        transparent 0,
                        transparent 75%,
                        rgba(0, 0, 0, 0.25) 0
                    );
                background-size: pxToRem(32) pxToRem(32);
                background-position: 0 0, pxToRem(16) pxToRem(16);
                z-index: 98;
            }

            .mask-canvas {
                pointer-events: none;
                z-index: 99;
            }

            .crop-control {
                position: absolute;
                border: pxToRem(2) solid;
                @include themeColor(1, border-color);
                pointer-events: auto;
                z-index: 100;

                @each $dir, $pos in $dirs-map {
                    .control-btn.#{$dir} {
                        position: absolute;
                        width: $handle-size;
                        height: $handle-size;
                        @include whiteColor(1, background-color);
                        border: pxToRem(1) solid;
                        @include themeColor(1, border-color);
                        @each $prop, $val in $pos {
                            #{$prop}: $val;
                        }
                    }
                }

                @each $i, $info in $lines {
                    $axis: map-get($info, axis);
                    $pct: map-get($info, percent);
                    .control-line.line-#{$i} {
                        position: absolute;
                        background: transparent;

                        @if $axis == y {
                            top: $pct;
                            left: 0;
                            width: 100%;
                            height: pxToRem(1);
                            border-bottom: pxToRem(1) dashed;
                            @include whiteColor(0.5, border-color);
                        } @else {
                            left: $pct;
                            top: 0;
                            width: pxToRem(1);
                            height: 100%;
                            border-right: pxToRem(1) dashed;
                            @include whiteColor(0.5, border-color);
                        }
                    }
                }
            }
        }

        .operation-btn {
            width: pxToRem(700);
            @include flexCenter(space-between);
            margin-top: pxToRem(32);
        }
    }

    .preview-container {
        @include flexCenter(flex-start, flex-end, true);

        .preview-img {
            @include whrem(500, 260);
            @include disabledColor(0.2, background-color);
            overflow: hidden;
            @include flexCenter;

            img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
        }

        .boat-button {
            margin-top: pxToRem(32);
        }
    }
}
</style>
