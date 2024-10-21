<template>
    <div class="w-full h-full overflow-hidden BoatBaseECharts">
        <div
            ref="echartsRef"
            :style="{
                width: '100%',
                height: '100%',
            }"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { ECOption } from '@/utils/eCharts';
import { useECharts } from '@/hooks';
import { useLayoutStore } from '@/store';
import { getCssVariableValue } from '@/utils/global';

const props = defineProps<{
    options: ECOption;
    themeColors?: string[];
}>();

const echartsRef = ref<HTMLDivElement | null>(null);
const { setOptions, initCharts } = useECharts(echartsRef, props.options);

const layoutStore = useLayoutStore();
const emits = defineEmits(['dark-change']);

watch(
    [() => layoutStore.isDark, () => props.options],
    ([newIsDark, newOptions]) => {
        emits('dark-change', newIsDark);
        let targetOptions: ECOption = {};
        targetOptions = {
            darkMode: newIsDark,
            backgroundColor: getCssVariableValue(newIsDark ? '--themeColor' : '--whiteColor', 0.03),
            ...newOptions,
        };
        if (props.themeColors && props.themeColors.length > 0) {
            targetOptions.color = props.themeColors;
        }
        setOptions(targetOptions);
    },
    {
        deep: true,
    }
);

onMounted(() => {
    initCharts(props.themeColors);
});
</script>
