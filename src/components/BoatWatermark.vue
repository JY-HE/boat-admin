<template>
    <div class="BoatWatermark">
        <canvas ref="watermarkCanvas" class="canvas"></canvas>
        <slot></slot>
        <div ref="watermarkContainer" class="watermarkContainer"></div>
    </div>
</template>

<script setup lang="ts">
import { ElementRefType } from '@/types';

interface Prop {
    /** 水印类型 */
    type: 'text' | 'image';
    /** 文本水印内容 */
    content?: string | string[];
    /** 水印字体大小 */
    fontSize?: number;
    /** 水印字体颜色 */
    color?: string;
    /** 图片水印地址 */
    imageUrl?: string;
}

const props = withDefaults(defineProps<Prop>(), {
    type: 'text',
    content: 'Boat Admin',
    fontSize: 20,
    color: 'rgba(63, 81, 181, 0.3)',
    imageUrl: `${window.location.origin}${import.meta.env.BASE_URL}logo.svg`,
});

const watermarkContainer = ref<ElementRefType>(null);
const watermarkCanvas = ref<HTMLCanvasElement | null>(null);
const dataURL = ref<string | null>(null);

/**
 * 创建水印
 */
const createWatermark = () => {
    const canvas = watermarkCanvas.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 200;

    if (props.type === 'text') {
        handleTextWatermark(ctx, canvas);
    } else {
        handleImageWatermark(ctx, canvas);
    }
};

/**
 * 处理文本水印
 * @param ctx CanvasRenderingContext2D
 * @param canvas HTMLCanvasElement
 */
const handleTextWatermark = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // 处理 content：如果是数组，每项一行；否则整体作为一行
    const lines: string[] = Array.isArray(props.content) ? props.content : [props.content || ''];
    const lineHeight = props.fontSize * 1.2;
    const angle = (-20 * Math.PI) / 180;
    const startX = 20;
    const startY = 70;

    ctx.font = `${props.fontSize}px Arial`;
    ctx.fillStyle = props.color!;

    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate(angle);
    lines.forEach((line, idx) => {
        ctx.fillText(line, 0, idx * lineHeight);
    });
    ctx.restore();
    dataURL.value = canvas.toDataURL('image/png');
    applyBackground();
};

/**
 * 处理图片水印
 * @param ctx CanvasRenderingContext2D
 * @param canvas HTMLCanvasElement
 */
const handleImageWatermark = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = props.imageUrl!;
    img.onload = () => {
        ctx.globalAlpha = 0.3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        dataURL.value = canvas.toDataURL('image/png');
        applyBackground();
    };
};

/**
 * 应用背景图片
 */
const applyBackground = () => {
    if (watermarkContainer.value && dataURL.value) {
        watermarkContainer.value.style.backgroundImage = `url(${dataURL.value})`;
        watermarkContainer.value.style.backgroundRepeat = 'repeat';
    }
};

onMounted(() => {
    createWatermark();
});
</script>

<style lang="scss">
.BoatWatermark {
    // width: 100%;
    // height: fit-content;
    position: relative;

    .canvas {
        display: none;
    }

    .watermarkContainer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
}
</style>
