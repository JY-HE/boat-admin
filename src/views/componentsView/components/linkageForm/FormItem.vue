<template>
    <el-form ref="formRef" class="FormItem" :model="localValue">
        <div class="content">
            <template v-for="[name, item] in Object.entries(localValue)">
                <el-form-item
                    v-if="handlePrecondition(item)"
                    :key="name"
                    :label="item.desc"
                    :rules="item.rules"
                    :prop="`${name}.value`"
                >
                    <el-select
                        v-if="item.type === 'select'"
                        v-model="localValue[name].value"
                        v-bind="item.attrs"
                    >
                        <el-option
                            v-for="(option, index) in item.options"
                            :key="index"
                            :label="option.label"
                            :value="option.value"
                        >
                        </el-option>
                    </el-select>
                    <el-input
                        v-if="item.type === 'input'"
                        v-model.trim="localValue[name].value"
                        v-bind="item.attrs"
                    ></el-input>
                    <el-switch
                        v-if="item.type === 'switch'"
                        v-model="localValue[name].value"
                        v-bind="item.attrs"
                    >
                    </el-switch>
                    <el-input-number
                        v-if="item.type === 'inputNumber'"
                        v-model="localValue[name].value"
                        controlsPosition="right"
                        v-bind="item.attrs"
                    >
                    </el-input-number>
                    <BoatColorPick
                        v-if="item.type === 'colorPick'"
                        v-model="localValue[name].value"
                        v-bind="item.attrs"
                    />
                </el-form-item>
            </template>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash-es/cloneDeep';
import { PropType } from 'vue';
import { FromItemConfig, FromItem } from './type';
const props = defineProps({
    modelValue: {
        type: Object as PropType<FromItemConfig>,
        required: true,
    },
});
const emit = defineEmits(['update:modelValue']);
// 创建一个本地副本用于修改
const localValue = reactive(cloneDeep(props.modelValue));
const formRef = ref();
watch(
    localValue,
    newValue => {
        formRef.value.validate((valid: boolean) => {
            if (valid) {
                emit('update:modelValue', newValue);
                return true;
            }
            return false;
        });
    },
    { deep: true }
);

/**
 * 处理数据回显
 */
function handleConfig() {
    Object.keys(localValue).forEach(key => {
        const item = localValue[key];
        if (item.value === '' || item.value === undefined || item.value === null) {
            item.value = item.default;
        }
    });
}

/**
 * 判断前置条件是否全部成立
 * @param item 配置项
 */
function handlePrecondition(item: FromItem) {
    const { precondition = null } = item;
    if (precondition) {
        return Object.keys(precondition).every(key => localValue[key]?.value === precondition[key]);
    }
    return true;
}

onMounted(() => {
    handleConfig();
});
</script>

<style lang="scss">
.FormItem {
    .content {
        @include wh;
        @include scrollbarStyle;
        .el-form-item__label {
            width: pxToRem(150);
        }
        .el-input-number {
            width: 100%;
        }
    }
}
</style>
