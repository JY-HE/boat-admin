<template>
    <template v-for="item in props.routerList" :key="item.path">
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
            <template #title v-if="item.meta.icon">
                <BoatIconfont :icon="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
            </template>
            <template #title v-else>{{ item.meta.title }}</template>

            <BoatSubMenu :routerList="item.children as CustomRouteRecordRaw[]" />
        </el-sub-menu>

        <el-menu-item :index="item.path" v-else>
            <template v-if="item.meta.icon">
                <BoatIconfont :icon="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
            </template>
            <template v-else>
                {{ item.meta.title }}
            </template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
// 做类型限制，解决ts类型报错
type CustomRouteRecordRaw = RouteRecordRaw & {
    meta: {
        isShow?: boolean;
    };
};
const props = defineProps({
    // 拿到父组件传递过来的路由列表进行渲染
    routerList: {
        type: Array as () => CustomRouteRecordRaw[],
        required: true,
    },
});
</script>

<style lang="scss">
.is-active {
    background: #409eff;
    font-weight: 700;
}

.el-menu-item {
    &:hover {
        color: #fff;
        font-weight: 700;
    }
}

.el-menu--collapse {
    .el-menu-item {
        justify-content: center;
    }
}

// 下列代码是用于兼容horizontal所写，酌情删或留
.el-menu--horizontal {
    .el-menu-item.is-active {
        background-color: transparent !important;
        border-bottom: 2px solid #409eff !important;

        .el-icon,
        span {
            color: #409eff !important;
        }
    }

    .el-sub-menu.is-active {
        .el-sub-menu__title {
            border: 0 !important;
        }

        .el-icon,
        span {
            color: #409eff !important;
        }
    }
}
</style>
