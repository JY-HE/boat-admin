<template>
    <div class="RouterSearch" @click="dialogVisible = true">
        <BoatIconButton
            title="搜索菜单"
            icon="&#xe662;"
            class="mr-2 hover:bg-themeColor-0"
            @click="dialogVisible = true"
        >
        </BoatIconButton>
        <div class="rounded-xl p-2 bg-themeColor-20">Ctrl+I</div>

        <el-dialog
            v-model="dialogVisible"
            :showClose="false"
            @closed="searchValue = ''"
            @opened="handleOpened"
        >
            <template #header>
                <el-input ref="inputRef" v-model="searchValue" placeholder="搜索菜单" />
            </template>
            <div class="searchList h-full py-0 px-2">
                <template v-if="searchList.length">
                    <div
                        v-for="(item, index) in searchList"
                        :key="index"
                        class="searchItem"
                        :class="selectedIndex === index ? 'active' : ''"
                        @click.stop="routerHandler(item)"
                    >
                        <p class="text-h1 font-style-3">{{ item.name }}</p>
                        <p class="text-h3 font-style-4">{{ item.path }}</p>
                    </div>
                </template>
                <BoatNoData v-else />
            </div>
            <template #footer>
                <div class="flex justify-start gap-4 text-h3 font-style-4">
                    <div class="flex items-center">
                        <BoatIconfont icon="&#xe757;" />
                        <span class="pl-2">选择</span>
                    </div>
                    <div class="flex items-center">
                        <BoatIconfont icon="&#xe62e;" />
                        <BoatIconfont icon="&#xe637;" />
                        <span class="pl-2">切换</span>
                    </div>
                    <div class="flex items-center">
                        <BoatIconfont icon="&#xe634;" />
                        <span class="pl-2">关闭</span>
                    </div>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { PlusRouteRecordRaw } from '@/types';

const router = useRouter();
const routerList = router
    .getRoutes()
    .filter(item => item.path !== '/' || item.name) as unknown as PlusRouteRecordRaw[];

const inputRef = ref<HTMLInputElement | null>(null);
const searchValue = ref<string>('');
const dialogVisible = ref<boolean>(false);
const selectedIndex = ref<number>(-1);
const searchList = ref<PlusRouteRecordRaw[]>([]);

watchEffect(() => {
    if (!searchValue.value) {
        searchList.value = [];
    } else {
        // 过滤搜索列表
        searchList.value = routerList.filter(item => {
            return (
                item.path?.includes(searchValue.value) ||
                item.meta?.title?.includes(searchValue.value)
            );
        });
    }
});

/**
 * 点击跳转路由
 * @param item 路由对象
 */
const routerHandler = (item: PlusRouteRecordRaw) => {
    dialogVisible.value = false;
    searchValue.value = '';
    selectedIndex.value = -1;
    nextTick(() => {
        router.push(item.path);
    });
};

/**
 * 监听键盘事件
 * @param event 键盘事件对象
 */
const handleKeydown = (event: KeyboardEvent) => {
    const { key } = event;
    const { length } = searchList.value;
    // 检查是否是 Ctrl + I 组合键
    if (!dialogVisible.value && event.ctrlKey && (event.key === 'I' || event.key === 'i')) {
        dialogVisible.value = true;
        return;
    }
    if (key === 'ArrowUp') {
        if (selectedIndex.value > 0) {
            selectedIndex.value--;
        } else {
            selectedIndex.value = length - 1; // 循环到最后一个
        }
    } else if (key === 'ArrowDown') {
        if (selectedIndex.value < length - 1) {
            selectedIndex.value++;
        } else {
            selectedIndex.value = 0; // 循环到第一个
        }
    }
    if (key === 'Enter' && dialogVisible.value && selectedIndex.value >= 0) {
        routerHandler(searchList.value[selectedIndex.value]);
    }
};

/**
 * Dialog 打开动画结束时的回调
 */
const handleOpened = () => {
    if (inputRef.value) {
        inputRef.value.focus();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<style lang="scss">
.RouterSearch {
    @include flexCenter;
    cursor: pointer;
    padding: pxToRem(8);
    border-radius: pxToRem(12);
    &:hover {
        @include themeColor(var(--datalistHoverBackgroundAlpha), background-color);
    }
    @include fontColor(3);

    .el-dialog {
        width: pxToRem(680);
        .el-dialog__header {
            height: fit-content;
            padding-top: pxToRem(8);
            padding-bottom: pxToRem(8);
            .el-input {
                width: 100%;
            }
        }
        .el-dialog__body {
            height: pxToRem(486);
            .searchList {
                @include scrollbarStyle;
                .searchItem {
                    height: pxToRem(68);
                    cursor: pointer;
                    @include flexCenter(center, flex-start, true);
                    padding-left: pxToRem(16);
                    border-radius: pxToRem(4);
                    &:hover {
                        @include themeColor(var(--datalistHoverBackgroundAlpha), background-color);
                    }
                    &.active {
                        @include themeColor(var(--datalistHoverBackgroundAlpha), background-color);
                    }
                }
            }
        }
        .el-dialog__footer {
            border-top: pxToRem(1) solid;
            @include themeColor(0.46, border-color);
        }
    }
}
</style>
