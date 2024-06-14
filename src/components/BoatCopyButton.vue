<template>
    <em
        v-copy="copyText"
        class="iconfont text-[1.25rem] text-themeColor-100 cursor-pointer ml-1"
        title="复制"
        v-html="'&#xe8b0;'"
    ></em>
</template>

<script setup lang="ts">
defineProps<{ copyText: string }>();
</script>
