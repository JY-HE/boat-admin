<template>
    <div class="menuMain">
        <!-- 项目名称及logo -->
        <div class="sidebar-logo flex-center">
            <div class="logo"></div>
            <h1>BoatAdmin</h1>
        </div>

        <!-- 导航菜单 -->
        <el-menu
            active-text-color="#fff"
            background-color="#001529"
            :default-active="$route.path"
            text-color="#999"
            :unique-opened="true"
            router
        >
            <!-- 引入子组件 -->
            <BoatSubMenu :routerList="routerList" />
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
// 路由列表
const routerList = router.getRoutes().filter(item => item?.meta?.isShow);
console.log('🚀 ~ MenuList.vue:10 ~ routerList:', routerList);
</script>

<style lang="scss">
.menuMain {
    height: 100%;
    .sidebar-logo {
        height: 48px;
        background-color: #002140;
        color: #fff;
        font-weight: 700;
        line-height: 48px;
        text-align: center;
        font-size: 20px;
    }
    .el-menu {
        height: calc(100% - 48px);
        border-right: 0;
        overflow: auto;
    }
}
</style>
