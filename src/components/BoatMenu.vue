<template>
    <div menuGroup>
        <div menuItem v-for="menu in routerMenu" :key="menu.meta.title">
            <button
                :class="{
                    active: menu.path === active,
                    expand: menu.meta?.isShowChildRouter,
                }"
                @click="jumpNavigation(menu)"
            >
                <BoatIconfont :icon="menu.meta.icon"></BoatIconfont>
                <h4 :title="menu.meta.title">{{ menu.meta.title }}</h4>
                <BoatIconfont v-if="menu.children?.length" icon="&#xe622;"></BoatIconfont>
            </button>
            <div
                childrenMenu
                :class="{ show: menu.meta?.isShowChildRouter }"
                :style="{ '--height': `${(menu.children || []).length * 2.75}rem` }"
            >
                <div
                    v-for="subRouterItem in menu.children as CustomRouteRecordRaw[]  || []"
                    :key="subRouterItem.meta.title"
                >
                    <button
                        :class="{ active: subRouterItem.path === active }"
                        @click="jumpNavigation(subRouterItem)"
                    >
                        <h4 :title="subRouterItem.meta.title">{{ subRouterItem.meta.title }}</h4>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw, useRouter } from 'vue-router';
import { useRouterStore } from '@/store/router';

const props = defineProps({
    routerList: {
        type: Array as () => CustomRouteRecordRaw[],
        required: true,
    },
});

// 做类型限制，解决ts类型报错
type CustomRouteRecordRaw = RouteRecordRaw & {
    meta: {
        title: string;
        isShow?: boolean;
        isShowChildRouter?: boolean;
    };
};

const routerStore = useRouterStore();
const router = useRouter();
const active = ref<string>('');
const routerMenu = reactive(props.routerList);

const jumpNavigation = (routerItem: CustomRouteRecordRaw) => {
    if (routerItem.children?.length) {
        routerItem.meta.isShowChildRouter = !routerItem.meta.isShowChildRouter;
    } else {
        routerStore.setActiveRouter(routerItem.path);
        active.value = routerItem.path;
        router.push(routerItem.path);
    }
};
</script>

<style lang="scss"></style>
