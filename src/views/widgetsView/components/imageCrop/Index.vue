<template>
    <div>
        <BoatImageCrop confirmBtnText="下载图片" @confirm="handleConfirm" />
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ImageCrop' });

function handleConfirm(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cropped.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
</script>

<style lang="scss"></style>
