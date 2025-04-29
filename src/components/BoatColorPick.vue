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
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '请输入颜色值',
    },
});
const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue);
watch(localValue, newValue => {
    emit('update:modelValue', newValue);
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
