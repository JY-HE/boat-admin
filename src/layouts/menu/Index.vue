<template>
    <div menuMain>
        <div id="systemTitle">
            <div id="logo">
                <img src="/logo.svg" alt="" />
            </div>
            <h1 class="title">Boat Admin</h1>
        </div>

        <div class="menu">
            <BoatMenu :routerList="routerList" />
        </div>

        <div
            class="collapseExpandButton"
            :title="isHideMenu ? '展开' : '折叠'"
            @click="collapseExpandButton"
        >
            <BoatIconfont icon="&#xe6d7;"></BoatIconfont>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusRouteRecordRaw } from '@/types';
import { useLayoutStore } from '@/store';

const router = useRouter();
const routerList = router
    .getRoutes()
    .filter(item => item?.meta?.isShow) as unknown as PlusRouteRecordRaw[];

const layoutStore = useLayoutStore();
const isHideMenu = ref<boolean>(layoutStore.isHideMenu);

/**
 * 处理折叠菜单
 */
const collapseExpandButton = () => {
    isHideMenu.value = !isHideMenu.value;
    layoutStore.setHideMenu(isHideMenu.value);
    const appElement = document.querySelector('#app') as HTMLElement;
    appElement.setAttribute('class', isHideMenu.value ? 'hide' : '');
};
</script>

<style lang="scss"></style>
