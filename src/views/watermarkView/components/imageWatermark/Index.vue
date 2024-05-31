<template>
    <div ref="watermarkContainer" class="ImageWatermark">
        <p>将图片水印作为背景图</p>
        <canvas ref="watermarkCanvas" class="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import watermarkImage from '/public/img/logo.png'; // 导入水印图片

const watermarkContainer = ref(null);
const watermarkCanvas = ref(null);

onMounted(() => {
    const canvas = watermarkCanvas.value;
    const ctx = canvas.getContext('2d');

    // 设置画布大小
    canvas.width = 400;
    canvas.height = 200;

    // 创建一个图像对象
    const img = new Image();
    img.src = watermarkImage;
    img.onload = () => {
        // 在画布上绘制图片水印
        ctx.globalAlpha = 0.3; // 设置透明度
        ctx.drawImage(img, 100, 0, 200, 200); // 调整图片位置和大小

        // 将canvas作为背景图片;
        const dataURL = canvas.toDataURL('image/png');
        watermarkContainer.value.style.backgroundImage = `url(${dataURL})`;
        watermarkContainer.value.style.backgroundRepeat = 'repeat';
    };
});
</script>

<style lang="scss">
.ImageWatermark {
    position: relative;
    padding: pxToRem(16);
    @include fontColor(1);
    .canvas {
        display: none;
    }
}
</style>
