<template>
    <div class="BoatCancelConfirmButton">
        <el-button :disabled="isDisabledButton" @click="emits('cancel')">{{
            cancelDescription
        }}</el-button>
        <el-button
            type="primary"
            :disabled="disabledConfirm || isDisabledButton"
            @click="emits('submitForm')"
            >{{ confirmDescription }}</el-button
        >
    </div>
</template>

<script setup lang="ts">
interface Props {
    /** 取消按钮描述 */
    cancelDescription?: string;
    /** 确认按钮描述 */
    confirmDescription?: string;
    /** 确认按钮是否禁用 */
    disabledConfirm?: boolean;
    /** 整体按钮是否禁用 */
    isDisabledButton?: boolean;
}
withDefaults(defineProps<Props>(), {
    cancelDescription: '取消',
    confirmDescription: '确定',
});

const emits = defineEmits<{
    (e: 'cancel'): void;
    (e: 'submitForm'): void;
}>();
</script>
