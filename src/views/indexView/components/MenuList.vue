<template>
    <div menuMain>
        <div id="systemTitle">
            <div id="logo"></div>
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
import { CustomRouteRecordRaw } from '@/views/indexView/types';

const router = useRouter();
const routerList = router
    .getRoutes()
    .filter(item => item?.meta?.isShow) as unknown as CustomRouteRecordRaw[];

const isHideMenu = ref<boolean>(false);

/**
 * 处理折叠菜单
 */
const collapseExpandButton = () => {
    isHideMenu.value = !isHideMenu.value;
    const appElement = document.querySelector('#app') as HTMLElement;
    appElement.setAttribute('class', isHideMenu.value ? 'hide' : '');
};
</script>

<style lang="scss"></style>
