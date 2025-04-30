<template>
    <div class="Setting">
        <BoatIconButton
            icon="&#xe63c;"
            title="系统配置"
            @click="drawerVisible = true"
        ></BoatIconButton>

        <el-drawer v-model="drawerVisible" direction="rtl" title="系统配置">
            <template #default>
                <div class="w-full flex flex-col h-fit-content gap-4">
                    <div class="bg-errorColor-20 text-errorColor-100 rounded-xl px-4 py-2">
                        应用配置可实时预览效果，但只是临时生效，保存于 localStorage
                        中，要想真正应用于项目，可以将配置对象保存于数据库中，在加载项目时从数据库中获取配置。
                    </div>
                    <ThemeStyle />
                    <BreadcrumbStyle />
                    <Copyright />
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { usePubSub, Topics } from '@/hooks/usePubSub';
import ThemeStyle from './setting/ThemeStyle.vue';
import BreadcrumbStyle from './setting/BreadcrumbStyle.vue';
import Copyright from './setting/Copyright.vue';

const drawerVisible = ref<boolean>(false);

usePubSub(Topics.OpenSystemConfigDrawer, () => {
    drawerVisible.value = !drawerVisible.value;
});
</script>

<style lang="scss">
.Setting {
    .el-drawer {
        .el-drawer__body {
            @include scrollbarStyle;
        }
    }
}
</style>
