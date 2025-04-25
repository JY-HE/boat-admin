<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane
                v-for="item in comps"
                :key="item.name"
                :label="item.name"
                :name="item.componentName"
            ></el-tab-pane>
        </el-tabs>
        <div class="w-full h-[calc(100%-3.5rem)] pt-4">
            <component :is="getCurrentComponent"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import BroadcastChannel from './components/BroadcastChannel.vue';

const activeName = ref<string>('BroadcastChannel');
const comps = computed(() => {
    return [{ name: 'BroadcastChannel API', componentName: 'BroadcastChannel' }];
});
// 组件映射
const componentMap: Record<string, typeof BroadcastChannel> = {
    BroadcastChannel,
};

// 根据 activeName 获取组件
const getCurrentComponent = computed(() => {
    return componentMap[activeName.value] || null;
});
</script>

<style lang="scss"></style>
