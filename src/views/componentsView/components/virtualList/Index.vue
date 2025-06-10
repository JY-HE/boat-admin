<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane v-for="item in comps" :key="item.name" :name="item.componentName">
                <template #label>
                    <div class="label">{{ item.name }}</div>
                </template>
            </el-tab-pane>
        </el-tabs>
        <div class="w-full h-[calc(100%-3.5rem)] pt-4">
            <component :is="getCurrentComponent" :listData="dataSource"></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker';
import FixedHeightVirtualList from './components/FixedHeightVirtualList.vue';
import IndefiniteHeightVirtualList from './components/IndefiniteHeightVirtualList.vue';

const activeName = ref<string>('FixedHeightVirtualList');
const comps = computed(() => {
    return [
        { name: '定高虚拟列表', componentName: 'FixedHeightVirtualList' },
        { name: '不定高虚拟列表', componentName: 'IndefiniteHeightVirtualList' },
    ];
});
// 组件映射
const componentMap: Record<string, typeof FixedHeightVirtualList> = {
    FixedHeightVirtualList,
    IndefiniteHeightVirtualList,
};

// 根据 activeName 获取组件
const getCurrentComponent = computed(() => {
    return componentMap[activeName.value] || null;
});

const dataSource = ref<{ index: number; value: string }[]>([
    ...Array.from({ length: 100 }, (_, i) => {
        return {
            index: i,
            value: faker.lorem.sentences(),
        };
    }),
]);
</script>

<style lang="scss"></style>
