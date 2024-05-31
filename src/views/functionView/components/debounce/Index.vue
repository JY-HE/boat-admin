<template>
    <div class="Debounce">
        <p>
            防抖（debounce）是一种在前端开发中常见的概念，尤其在处理频繁触发的事件（如滚动、输入、点击等）时非常有用。防抖的基本思想是在事件被频繁触发时，通过设定一个延迟时间，确保在一定时间间隔内只执行一次回调函数，从而避免不必要的计算或DOM操作，提高应用程序的性能。
        </p>
        <p>
            简单来说，防抖就是：如果你持续触发事件，我会在你停止触发后的一段时间内执行一次回调，而不是每次你触发事件时都执行。
        </p>
        <p class="title">输入防抖</p>
        <input v-model="inputValue" type="text" placeholder="请输入" />
        <p>{{ inputValue }}</p>
    </div>
</template>

<script setup lang="ts">
import debounceRef from '@/utils/debounceRef';
const inputValue = debounceRef('');
</script>

<style lang="scss">
.Debounce {
    @include wh;
    @include flexCenter(flex-start, flex-start, true);
    padding: pxToRem(16);
    p {
        @include fontStyle(2);
        @include fontColor(1);

        &.title {
            @include fontStyle(1);
            margin: pxToRem(16) 0;
        }
    }
}
</style>
