<template>
    <div class="flex justify-start items-start flex-col">
        <h1 class="text-h1 mb-8">防抖示例</h1>
        <p class="font-style-3 text-h1">
            防抖（debounce）是一种在前端开发中常见的概念，尤其在处理频繁触发的事件（如滚动、输入、点击等）时非常有用。防抖的基本思想是在事件被频繁触发时，通过设定一个延迟时间，确保在一定时间间隔内只执行一次回调函数，从而避免不必要的计算或DOM操作，提高应用程序的性能。
        </p>
        <p class="font-style-3 text-h1">
            简单来说，防抖就是：如果你持续触发事件，我会在你停止触发后的一段时间内执行一次回调，而不是每次你触发事件时都执行。
        </p>
        <div class="mt-8">
            <BoatTitle title="输入防抖"> </BoatTitle>
            <input v-model="inputValue" placeholder="请输入" />
            <p class="font-style-3 text-h1 mt-4">
                <span>输入的值1秒后触发更新：</span>
                <span>{{ inputValue }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { debounceRef } from '@/utils/debounce';
const inputValue = debounceRef('');
</script>
