<template>
    <div class="p-4">
        <h1 class="text-h1">剪贴板示例</h1>
        <BoatTitle title="v-copy指令" class="mt-8"> </BoatTitle>
        <div class="mt-8 flex gap-8 items-center">
            <el-input v-model="copyValue" />
            <el-button v-copy="copyValue" type="primary">复制</el-button>
        </div>
        <BoatTitle title="BoatCopyButton组件" class="mt-8"> </BoatTitle>
        <div class="mt-8 flex gap-8 items-center">
            <span class="font-style-3 text-h3">{{ copyValue }}</span>
            <BoatCopyButton :copyText="copyValue" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const copyValue = ref('Hello boat-admin');
</script>
