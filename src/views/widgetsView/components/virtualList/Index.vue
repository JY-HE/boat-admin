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
import { generateParagraph } from 'lipsum-zh';
import BoatFixedHeightVirtualList from '@/components/BoatFixedHeightVirtualList.vue';
import BoatIndefiniteHeightVirtualList from '@/components/BoatIndefiniteHeightVirtualList.vue';

defineOptions({ name: 'VirtualList' });

const activeName = ref<string>('BoatFixedHeightVirtualList');
const comps = computed(() => {
    return [
        { name: '定高虚拟列表', componentName: 'BoatFixedHeightVirtualList' },
        { name: '不定高虚拟列表', componentName: 'BoatIndefiniteHeightVirtualList' },
    ];
});
// 组件映射
const componentMap: Record<string, typeof BoatFixedHeightVirtualList> = {
    BoatFixedHeightVirtualList,
    BoatIndefiniteHeightVirtualList,
};

// 根据 activeName 获取组件
const getCurrentComponent = computed(() => {
    return componentMap[activeName.value] || null;
});

const dataSource = ref<{ index: number; value: string }[]>([
    ...Array.from({ length: 100 }, (_, i) => {
        return {
            index: i,
            value: randomChineseString(),
        };
    }),
]);

/**
 * 生成随机汉字字符串，长度在 minLen 到 maxLen 之间随机
 * @param minLen 最少汉字数，默认 200
 * @param maxLen 最多汉字数，默认 800
 * @returns 随机生成的汉字字符串
 */
function randomChineseString(minLen = 200, maxLen = 800): string {
    const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    return generateParagraph(length);
}
</script>

<style lang="scss"></style>
