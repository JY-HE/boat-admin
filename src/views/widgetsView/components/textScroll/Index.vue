<template>
    <div>
        <BoatTextMarquee text="这是一条默认类型的滚动公告" />
        <BoatTextMarquee text="这是一条成功类型的滚动公告" type="success" :speed="200" />
        <BoatTextMarquee text="这是一条警告类型的滚动公告" type="warning" :speed="250" />
        <BoatTextMarquee text="这是一条危险类型的滚动公告" type="danger" :speed="300" />
        <BoatTextMarquee text="这是一条信息类型的滚动公告" type="info" :speed="400" />
        <BoatTextMarquee text="这是一条速度较慢、向右滚动的公告" direction="right" :speed="100" />
        <BoatTextMarquee text="这是一条可关闭的滚动公告" showClose />
        <BoatTextMarquee text="这是一条打字机效果的滚动公告，打字机速度为 200 毫秒" typewriter />
    </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'TextScroll' });
</script>

<style lang="scss"></style>
