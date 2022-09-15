<template>
    <div>{{ userStore.name }}</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

setTimeout(() => {
    userStore.updateName('李四');
}, 3000);
</script>
