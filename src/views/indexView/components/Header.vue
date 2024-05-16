<template>
    <div header>
        <div breadcrumb>
            <div v-for="(item, index) in breadList" :key="index">
                <h2
                    :class="{ active: index === breadList.length - 1 }"
                    @click="breadcrumbClickHandler(item)"
                >
                    {{ item.meta.title }}
                </h2>
                <BoatIconfont v-if="index !== breadList.length - 1" icon="&#xe625;" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouteLocationMatched } from 'vue-router';

const router = useRouter();
const route = useRoute();

const breadList = ref<RouteLocationMatched[]>([]);

const getMatched = () => {
    breadList.value = route.matched.filter(item => item?.meta?.title);
};

const breadcrumbClickHandler = (item: RouteLocationMatched) => {
    router.push(item.path);
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
