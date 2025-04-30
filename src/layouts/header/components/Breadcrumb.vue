<template>
    <div class="Breadcrumb" :class="breadcrumbStyle">
        <div v-for="(item, index) in breadList" :key="index">
            <BoatIconfont
                v-if="breadcrumbStyle === 'default' && item.meta.icon"
                :icon="item.meta.icon as string"
            />
            <h2
                :class="{ active: index === breadList.length - 1 }"
                @click="breadcrumbClickHandler(item)"
            >
                {{ item.meta.title }}
            </h2>
            <BoatIconfont
                v-if="breadcrumbStyle === 'default' && index !== breadList.length - 1"
                icon="&#xe625;"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouteLocationMatched } from 'vue-router';
import { useSystemConfig } from '@/hooks/useSystemConfig';

const { breadcrumbStyle } = useSystemConfig();

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

<style lang="scss">
.Breadcrumb {
    height: 100%;
    @include flexCenter(flex-start, center);
    @include fontColor(3);

    &.default {
        & > div {
            @include flexCenter;
            .BoatIconfont {
                margin-right: pxToRem(9);
                @include iconSize(2);
                @include fontStyle(2);
            }
            h2 {
                margin-right: pxToRem(9);
                @include fontStyle(2);
                cursor: pointer;
                &:hover {
                    @include themeColor(0.8, color);
                }
                &.active {
                    @include themeColor(1, color);
                }
            }
        }
    }

    &.modern {
        gap: pxToRem(4);

        & > div {
            @include flexCenter;
            @include fontColor(5);
            @include themeColor(1, background-color);
            height: pxToRem(32);
            padding: 0 pxToRem(12 + 4);
            cursor: pointer;
            transition: background-color 0.2s ease;
            clip-path: polygon(
                0% 0%,
                calc(100% - #{pxToRem(12)}) 0%,
                100% 50%,
                calc(100% - #{pxToRem(12)}) 100%,
                0% 100%,
                pxToRem(12) 50%
            );

            &:hover {
                @include themeColor(0.8, background-color);
            }

            &:last-of-type {
                padding: 0 pxToRem(12 + 4) 0 pxToRem(12 + 6);
                border-radius: 0 pxToRem(6) pxToRem(6) 0;
                clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, pxToRem(12) 50%);
            }

            &:first-of-type {
                padding: 0 pxToRem(12 + 6) 0 pxToRem(12 + 4);
                border-radius: pxToRem(6) 0 0 pxToRem(6);
                clip-path: polygon(
                    0% 0%,
                    calc(100% - #{pxToRem(12)}) 0%,
                    100% 50%,
                    calc(100% - #{pxToRem(12)}) 100%,
                    0% 100%
                );
            }
        }
    }
}
</style>
