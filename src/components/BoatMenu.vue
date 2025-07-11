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
                <div v-if="!menu.children?.length">
                    <el-popover placement="right" popperClass="menuPopover" :disabled="!isHideMenu">
                        <template #reference>
                            <BoatIconfont
                                v-if="menu.meta.icon"
                                :icon="menu.meta.icon as string"
                            ></BoatIconfont>
                        </template>
                        <p>{{ menu.meta.title }}</p>
                    </el-popover>
                    <h4 :title="menu.meta.title">{{ menu.meta.title }}</h4>
                </div>
                <div v-else>
                    <el-popover
                        placement="right-start"
                        popperClass="menuPopover"
                        :disabled="!isHideMenu"
                    >
                        <template #reference>
                            <BoatIconfont
                                v-if="menu.meta.icon"
                                :icon="menu.meta.icon as string"
                            ></BoatIconfont>
                        </template>
                        <div class="buttonBox">
                            <button
                                v-for="subRouterItem in menu.children as PlusRouteRecordRaw[]  || []"
                                :key="subRouterItem.meta.title"
                                :class="{ active: subRouterItem.path === active }"
                                @click="jumpNavigation(subRouterItem)"
                            >
                                <h4 :title="subRouterItem.meta.title">
                                    {{ subRouterItem.meta.title }}
                                </h4>
                            </button>
                        </div>
                    </el-popover>
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
                    v-for="subRouterItem in menu.children as PlusRouteRecordRaw[]  || []"
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
import { useRouterStore } from '@/store';
import { PlusRouteRecordRaw } from '@/types';
import { useSystemConfig } from '@/hooks/useSystemConfig';

interface Props {
    /** 路由列表 */
    routerList: PlusRouteRecordRaw[];
}

const props = defineProps<Props>();

const routerStore = useRouterStore();
const { isHideMenu } = useSystemConfig();

const router = useRouter();
const active = ref<string>('');
const routerMenu = ref<PlusRouteRecordRaw[]>([]);

watch(
    () => props.routerList,
    newList => {
        // 过滤 children 中 isShow 为 false 的路由
        routerMenu.value = newList.map(item => {
            item.children = item.children?.filter(child => {
                if ('isShow' in child.meta) {
                    return child.meta.isShow;
                }
                return true;
            });
            return item;
        });
    },
    { immediate: true }
);

/**
 * 点击菜单跳转路由
 * @param routerItem 菜单项
 */
const jumpNavigation = (routerItem: PlusRouteRecordRaw) => {
    if (routerItem.children?.length) {
        routerItem.meta.isShowChildRouter = !routerItem.meta.isShowChildRouter;
    } else {
        routerStore.setActiveRouter(routerItem.path);
        router.push(routerItem.path);
    }
    collapseOtherMenus(routerItem);
};

/**
 * 展开子路由
 */
const expandRouter = () => {
    const pathName = active.value
        ?.split('/')
        ?.filter(item => Boolean(item))
        ?.at(0);
    const findItem = routerMenu.value.find(item => item.path === `/${pathName}`);
    if (findItem && findItem.children?.length) {
        findItem.meta.isShowChildRouter = true;
    }
};

/**
 * 折叠其他菜单
 */
const collapseOtherMenus = (menu: PlusRouteRecordRaw) => {
    routerMenu.value.forEach(router => {
        if (router.children?.length && !menu.path.startsWith(router.path)) {
            router.meta.isShowChildRouter = false;
        }
    });
};

watchEffect(() => {
    active.value = routerStore.activeRouter;
    expandRouter();
});
</script>

<style lang="scss">
.menuPopover {
    margin-left: pxToRem(48) !important;
    border-radius: pxToRem(12);

    p {
        @include fontColor(2);
        padding: pxToRem(10) pxToRem(16);
    }

    .buttonBox {
        @include wh;
        max-height: pxToRem((48+10) * 8 + 20);
        @include scrollbarStyle;
        padding: pxToRem(10) pxToRem(16);
    }
    button {
        @include whrem(228, 48);
        @include themeColor(0, background-color);
        @include flexCenter(flex-start);
        border-radius: pxToRem(12);
        outline: none;
        border: none;
        text-align: left;
        cursor: pointer;
        margin-top: pxToRem(10);
        padding-left: pxToRem(16);
        &:hover {
            @include themeColor(var(--datalistHoverBackgroundAlpha), background-color);
        }
        &:nth-child(1) {
            margin-top: 0;
        }
        h4 {
            @include fontColor(2);
            @include textHidden;
            width: 100%;
        }
        &.active {
            @include themeColor(1, background-color);
            &:hover {
                @include themeColor(1, background-color);
            }
            h4 {
                @include whiteColor(1, color);
            }
        }
    }
}
</style>
