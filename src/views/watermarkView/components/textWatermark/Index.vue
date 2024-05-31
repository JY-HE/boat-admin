<template>
    <div ref="watermarkContainer" class="TextWatermark">
        <p>将文字水印作为背景图</p>
        <canvas ref="watermarkCanvas" class="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
const watermarkContainer = ref(null);
const watermarkCanvas = ref(null);

onMounted(() => {
    const canvas = watermarkCanvas.value;
    const ctx = canvas.getContext('2d');

    // 设置画布大小
    canvas.width = 300;
    canvas.height = 200;

    // 绘制水印文字
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(63, 81, 181, 0.3)';
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.fillText('版权所有，翻版必究', 50, 100);

    // 将canvas作为背景图片
    const dataURL = canvas.toDataURL('image/png');
    watermarkContainer.value.style.backgroundImage = `url(${dataURL})`;
    watermarkContainer.value.style.backgroundRepeat = 'repeat';
});
</script>

<style lang="scss">
.TextWatermark {
    position: relative;
    padding: pxToRem(16);
    @include fontColor(1);
    .canvas {
        display: none;
    }
}
</style>
