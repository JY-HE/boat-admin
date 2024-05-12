<template>
    <em
        class="BoatIconfont iconfont"
        :class="[className, { errorColor: errorColor }]"
        v-html="icon"
        @click="clickHandle($event)"
    ></em>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: { type: String, default: '' },
    className: { type: String, default: '' },
    errorColor: { type: Boolean, default: false },
    isClickStop: { type: Boolean, default: false }, // 传false可以冒泡，避免饿了么组件（如上传）插槽不能点击生效问题
});
const emits = defineEmits(['click']);

const clickHandle = (event: MouseEvent) => {
    // 默认阻止冒泡
    if (props.isClickStop) event.stopPropagation();

    emits('click');
};
</script>

<style lang="scss"></style>
