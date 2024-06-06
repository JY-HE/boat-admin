<template>
    <div class="RouterSearch">
        <BoatIconButton title="搜索菜单" icon="&#xe662;" @click="dialogVisible = true">
        </BoatIconButton>

        <el-dialog v-model="dialogVisible" :showClose="false" @closed="searchValue = ''">
            <template #header>
                <input v-model="searchValue" type="text" placeholder="搜索菜单" />
            </template>
            <div class="searchList">
                <template v-if="searchList.length">
                    <div
                        v-for="(item, index) in searchList"
                        :key="index"
                        class="searchItem"
                        @click="routerHandler(item)"
                    >
                        <p name>{{ item.name }}</p>
                        <p path>{{ item.path }}</p>
                    </div>
                </template>
                <BoatNoData v-else />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
import { CustomRouteRecordRaw } from '@/types';

const router = useRouter();
const routerList = router
    .getRoutes()
    .filter(item => item.path !== '/' || item.name) as unknown as CustomRouteRecordRaw[];

const searchValue = ref<string>('');
const dialogVisible = ref<boolean>(false);

const searchList = computed<CustomRouteRecordRaw[]>(() => {
    if (!searchValue.value) return [];
    return routerList.filter(
        item => item.path.includes(searchValue.value) || item.name.includes(searchValue.value)
    );
});

const routerHandler = (item: RouteRecordRaw) => {
    dialogVisible.value = false;
    router.push(item.path);
    searchValue.value = '';
};
</script>

<style lang="scss">
.RouterSearch {
    .BoatIconfont {
        @include iconSize(1);
        @include fontColor(3);
        cursor: pointer;
    }
    .el-dialog {
        width: pxToRem(680);
        .el-dialog__header {
            height: fit-content;
            padding-top: pxToRem(8);
            padding-bottom: pxToRem(8);
            input {
                width: 100%;
            }
        }
        .el-dialog__body {
            height: pxToRem(486);
            .searchList {
                height: 100%;
                @include scrollbarStyle;
                padding: 0 pxToRem(8);
                .searchItem {
                    height: pxToRem(68);
                    cursor: pointer;
                    @include flexCenter(center, flex-start, true);
                    padding-left: pxToRem(16);
                    border-radius: pxToRem(4);
                    &:hover {
                        @include themeColor(var(--datalistHoverBackgroundAlpha), background-color);
                    }
                    p {
                        &[name] {
                            @include fontColor(1);
                            @include fontStyle(3);
                        }
                        &[path] {
                            @include fontColor(3);
                            @include fontStyle(4);
                        }
                    }
                }
            }
        }
    }
}
</style>
