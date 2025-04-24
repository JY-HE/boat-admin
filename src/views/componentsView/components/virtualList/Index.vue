<template>
    <div>
        <el-tabs v-model="activeName" class="demo-tabs">
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
import FixedHeightVirtualList from './components/FixedHeightVirtualList.vue';

const activeName = ref<string>('FixedHeightVirtualList');
const comps = computed(() => {
    return [{ name: '定高虚拟列表', componentName: 'FixedHeightVirtualList' }];
});
// 组件映射
const componentMap: Record<string, typeof FixedHeightVirtualList> = {
    FixedHeightVirtualList,
};

// 根据 activeName 获取组件
const getCurrentComponent = computed(() => {
    return componentMap[activeName.value] || null;
});
</script>

<style lang="scss"></style>
