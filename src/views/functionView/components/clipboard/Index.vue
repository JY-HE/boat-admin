<template>
    <div class="p-4">
        <h1 class="text-h1">剪贴板示例</h1>
        <div class="font-style-2 text-h1 mt-8">v-copy指令</div>
        <div class="mt-8 flex gap-8 items-center">
            <el-input v-model="copyValue" />
            <el-button v-copy="copyValue" type="primary">复制</el-button>
        </div>
        <div class="font-style-2 text-h1 mt-8">BoatCopyButton组件</div>
        <div class="mt-8 flex gap-8 items-center">
            <span class="font-style-3 text-h3">{{ copyValue }}</span>
            <BoatCopyButton :copyText="copyValue" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const copyValue = ref('Hello boat-admin');
</script>
