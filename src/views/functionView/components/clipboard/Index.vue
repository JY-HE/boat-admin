<template>
    <div>
        <BoatTitle title="剪贴板示例"></BoatTitle>

        <h2 class="font-style-2 text-h2 mt-8">v-copy指令</h2>
        <div class="mt-8 flex gap-8 items-center">
            <el-input v-model="copyValue" />
            <el-button v-copy="copyValue" type="primary">复制</el-button>
        </div>

        <h2 class="font-style-2 text-h2 mt-8">BoatCopyButton组件</h2>
        <div class="mt-8 flex gap-8 items-center">
            <span class="font-style-3 text-h3">{{ copyValue }}</span>
            <BoatCopyButton :copyText="copyValue" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const copyValue = ref('Hello boat-admin');

defineOptions({ name: 'Clipboard' });
</script>
