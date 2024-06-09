<template>
    <div class="Setting">
        <BoatIconButton
            icon="&#xe63c;"
            title="系统设置"
            @click="drawerVisible = true"
        ></BoatIconButton>

        <el-drawer v-model="drawerVisible" :direction="direction">
            <template #header>
                <h4>set title by slot</h4>
            </template>
            <template #default>
                <div>123</div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button type="danger" @click="resetClick">重置</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import type { DrawerProps } from 'element-plus';

const drawerVisible = ref<boolean>(false);
const direction = ref<DrawerProps['direction']>('rtl');

const resetClick = () => {};
</script>

<style lang="scss">
.Setting {
}
</style>
