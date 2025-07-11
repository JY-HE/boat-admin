<template>
    <div ref="watermarkContainer" class="p-4 text-h1">
        <p>将文字水印作为背景图</p>
        <canvas ref="watermarkCanvas" class="hidden"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ElementRefType } from '@/types';

defineOptions({ name: 'TextWatermark' });

const watermarkContainer = ref<ElementRefType>(null);
const watermarkCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const canvas = watermarkCanvas.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 200;

    // 绘制水印文字
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(63, 81, 181, 0.3)';
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.fillText('版权所有，翻版必究', 50, 100);

    // 将canvas作为背景图片
    const dataURL = canvas.toDataURL('image/png');
    if (watermarkContainer.value) {
        watermarkContainer.value.style.backgroundImage = `url(${dataURL})`;
        watermarkContainer.value.style.backgroundRepeat = 'repeat';
    }
});
</script>
