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
defineProps({
    cancelDescription: { type: String, default: '取消' },
    confirmDescription: { type: String, default: '确定' },
    disabledConfirm: { type: Boolean, default: false },
    isDisabledButton: { type: Boolean, default: false },
});

const emits = defineEmits(['cancel', 'submitForm']);
</script>
