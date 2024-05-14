<template>
    <div header>123</div>
</template>

<script setup lang="ts">
import { RouteLocationMatched } from 'vue-router';

const router = useRouter();
const route = useRoute();

let breadList: RouteLocationMatched[] = reactive([]);

const getMatched = () => {
    breadList = route.matched.filter(item => item.meta && item.meta.title);
    console.log('🚀 ~ Header.vue:16 ~ breadList:', breadList);
};

onMounted(() => {
    getMatched();
});

watch(
    () => route.path,
    () => {
        getMatched();
    }
);
</script>

<style lang="scss"></style>
