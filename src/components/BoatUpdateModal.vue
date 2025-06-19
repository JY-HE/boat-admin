<template>
    <el-dialog
        v-model="visible"
        title="系统提示"
        destroyOnClose
        :closeOnClickModal="false"
        :closeOnPressEscape="false"
        :showClose="false"
    >
        <div class="modal-content">
            <p class="text-h2 font-style-4">检测到新版本，是否刷新页面以更新？</p>
            <BoatCancelConfirmButton
                class="flex justify-end mt-4"
                @cancel="visible = false"
                @submit-form="refreshPage"
            />
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
interface Props {
    modelValue: boolean;
}
const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const visible = ref(props.modelValue);

watch(
    () => props.modelValue,
    newValue => {
        visible.value = newValue;
    }
);

watch(visible, newValue => {
    if (newValue !== props.modelValue) {
        emits('update:modelValue', newValue);
    }
});

function refreshPage() {
    location.reload();
}
</script>
