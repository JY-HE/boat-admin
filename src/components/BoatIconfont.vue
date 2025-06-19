<template>
    <em
        class="BoatIconfont iconfont"
        :class="[className, { errorColor: errorColor }]"
        @click="clickHandle($event)"
        v-html="icon"
    ></em>
</template>

<script setup lang="ts">
interface Props {
    /** 图标类名 */
    icon?: string;
    /** 额外的类名 */
    className?: string;
    /** 是否使用错误色 */
    errorColor?: boolean;
    /** 是否阻止冒泡 */
    isClickStop?: boolean;
}
const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'click'): void;
}>();

const clickHandle = (event: MouseEvent) => {
    // 默认阻止冒泡
    if (props.isClickStop) event.stopPropagation();

    emits('click');
};
</script>

<style lang="scss"></style>
