<template>
    <div class="watermark">
        <BoatTitle title="文本水印" />
        <BoatWatermark type="text">
            <div class="w-full h-[20rem] mb-4"></div>
        </BoatWatermark>
        <BoatTitle title="多行文本水印" />
        <BoatWatermark type="text" :content="['Boat Admin', '专注用户体验，视觉设计']">
            <div class="w-full h-[20rem] mb-4"></div>
        </BoatWatermark>
        <BoatTitle title="图片水印" />
        <BoatWatermark type="image" :content="['Boat Admin', '专注用户体验，视觉设计']">
            <div class="w-full h-[20rem] mb-4"></div>
        </BoatWatermark>
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'Watermark' });
</script>

<style lang="scss"></style>
