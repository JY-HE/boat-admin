<template>
    <div class="BoatColorPick">
        <el-input v-model.trim="localValue" :placeholder="placeholder"></el-input>
        <el-color-picker
            v-model.trim="localValue"
            :class="modelValue ? '' : 'empty'"
            v-bind="$attrs"
            @active-change="(val: string | null) => {
                localValue = val as string;
            }"
        ></el-color-picker>
    </div>
</template>

<script setup lang="ts">
interface Props {
    /** 颜色值 */
    modelValue: string;
    /** 占位符 */
    placeholder?: string;
}
const props = withDefaults(defineProps<Props>(), {
    placeholder: '请输入颜色值',
});
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const localValue = ref(props.modelValue);

watch(localValue, newValue => {
    emits('update:modelValue', newValue);
});
</script>

<style lang="scss">
.BoatColorPick {
    @include flexCenter;
    position: relative;
    @include wh;
    .el-color-picker {
        position: absolute;
        right: pxToRem(16);
        &.empty {
            border: pxToRem(1) solid;
            @include disabledColor(var(--inputBorderAlpha), border-color);
        }
    }
}
</style>
