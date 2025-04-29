<template>
    <div menuMain>
        <div id="systemTitle">
            <div id="logo">
                <img src="/logo.svg" alt="logo" />
            </div>
            <h1 class="title">Boat Admin</h1>
        </div>

        <div class="menu">
            <BoatMenu :routerList="routerList" />
        </div>

        <div
            class="collapseExpandButton"
            :title="hideMenu ? '展开' : '折叠'"
            @click="collapseExpandButton"
        >
            <BoatIconfont icon="&#xe6d7;"></BoatIconfont>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusRouteRecordRaw } from '@/types';
import { useSystemConfig } from '@/hooks/useSystemConfig';

const router = useRouter();
const routerList = router
    .getRoutes()
    .filter(item => item?.meta?.isShow) as unknown as PlusRouteRecordRaw[];

const { isHideMenu, setHideMenu } = useSystemConfig();

const hideMenu = ref<boolean>(false);

/**
 * 处理折叠菜单
 */
const collapseExpandButton = () => {
    hideMenu.value = !hideMenu.value;
    setHideMenu(hideMenu.value);
    addHideClass();
};

/**
 * 添加折叠菜单的类名
 */
const addHideClass = () => {
    const appElement = document.querySelector('#app') as HTMLElement;
    appElement.setAttribute('class', hideMenu.value ? 'hide' : '');
};

onMounted(() => {
    hideMenu.value = isHideMenu.value;
    addHideClass();
});
</script>
