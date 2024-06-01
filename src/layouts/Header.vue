<template>
    <div header>
        <div breadcrumb>
            <div v-for="(item, index) in breadList" :key="index">
                <BoatIconfont v-if="item.meta.icon" :icon="item.meta.icon" />
                <h2
                    :class="{ active: index === breadList.length - 1 }"
                    @click="breadcrumbClickHandler(item)"
                >
                    {{ item.meta.title }}
                </h2>
                <BoatIconfont v-if="index !== breadList.length - 1" icon="&#xe625;" />
            </div>
        </div>
        <Theme />
    </div>
</template>

<script setup lang="ts">
import { RouteLocationMatched } from 'vue-router';
import Theme from './Theme.vue';

const router = useRouter();
const route = useRoute();

const breadList = ref<RouteLocationMatched[]>([]);

/**
 * 获取当前路由的路径
 */
const getMatched = () => {
    breadList.value = route.matched.filter(item => item?.meta?.title);
};

/**
 * 顶部导航栏点击处理
 * @param item 当前点击的导航栏
 */
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
