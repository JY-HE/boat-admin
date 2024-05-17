<template>
    <div menuGroup>
        <div v-for="menu in routerMenu" :key="menu.meta.title" menuItem>
            <button
                :class="{
                    active: menu.path === active,
                    expand: menu.meta?.isShowChildRouter,
                }"
                @click="jumpNavigation(menu)"
            >
                <div>
                    <BoatIconfont
                        v-if="menu.meta.icon"
                        :icon="menu.meta.icon as string"
                    ></BoatIconfont>
                    <h4 :title="menu.meta.title">{{ menu.meta.title }}</h4>
                </div>
                <BoatIconfont v-if="menu.children?.length" icon="&#xe625;"></BoatIconfont>
            </button>
            <div
                childrenMenu
                :class="{ show: menu.meta?.isShowChildRouter }"
                :style="{ '--height': `${(menu.children || []).length * 3}rem` }"
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
import { useRouterStore } from '@/store/router';
import { CustomRouteRecordRaw } from '@/views/indexView/types';

const props = defineProps({
    routerList: {
        type: Array as () => CustomRouteRecordRaw[],
        required: true,
    },
});
const routerMenu = reactive<CustomRouteRecordRaw[]>(props.routerList);

const routerStore = useRouterStore();
const router = useRouter();
const active = ref<string>('');

/**
 * 点击菜单跳转路由
 * @param routerItem 菜单项
 */
const jumpNavigation = (routerItem: CustomRouteRecordRaw) => {
    if (routerItem.children?.length) {
        routerItem.meta.isShowChildRouter = !routerItem.meta.isShowChildRouter;
    } else {
        routerStore.setActiveRouter(routerItem.path);
        router.push(routerItem.path);
    }
};

/**
 * 展开子路由
 */
const expandRouter = () => {
    const pathName = active.value
        ?.split('/')
        ?.filter(item => Boolean(item))
        ?.at(0);
    const findItem = routerMenu.find(item => item.path === `/${pathName}`);
    if (findItem && findItem.children?.length) {
        findItem.meta.isShowChildRouter = true;
    }
};

watchEffect(() => {
    active.value = routerStore.activeRouter;
    expandRouter();
});
</script>

<style lang="scss"></style>
