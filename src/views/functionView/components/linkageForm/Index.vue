<template>
    <div class="linkageForm">
        <FormItem v-model="polygonConfig"></FormItem>
    </div>
</template>

<script lang="ts" setup>
import FormItem from './FormItem.vue';
import { FromItemConfig } from './type';

defineOptions({ name: 'LinkageForm' });

const polygonConfig = reactive<FromItemConfig>({
    layerType: {
        type: 'select',
        desc: '图层类型',
        value: 'pointConfig',
        default: 'pointConfig',
        options: [
            {
                label: '点',
                value: 'pointConfig',
            },
            {
                label: '线',
                value: 'lineConfig',
            },
            {
                label: '面',
                value: 'polygonConfig',
            },
            {
                label: '区划',
                value: 'areaConfig',
            },
            {
                label: '标牌',
                value: 'signageConfig',
            },
            {
                label: '柱图',
                value: 'barConfig',
            },
            {
                label: '多选',
                value: 'noPointConfig',
            },
        ],
        attrs: {
            clearable: true,
            placeholder: '请选择图层类型',
        },
        rules: [
            {
                required: true,
                message: '请选择图层类型',
                trigger: 'blur',
            },
        ],
    },
    fill: {
        type: 'switch',
        desc: '面是否填充',
        value: false,
        default: false,
    },
    color: {
        type: 'colorPick',
        desc: '面填充颜色',
        value: '#FF00FF',
        default: '#FF00FF',
        precondition: { fill: true },
        attrs: {
            placeholder: '请输入填充颜色',
        },
    },
    opacity: {
        type: 'inputNumber',
        desc: '面填充颜色透明度',
        value: 1,
        default: 1,
        precondition: { fill: true },
        attrs: { min: 0, max: 1, precision: 1, step: 0.1 },
    },
    isUseDataHeight: {
        type: 'switch',
        desc: '使用数据高度',
        value: true,
        default: true,
    },
    height: {
        type: 'inputNumber',
        desc: '面高度',
        value: 1000,
        default: 1000,
        precondition: { isUseDataHeight: false },
        attrs: {
            unit: 'm',
        },
    },
    outline: {
        type: 'switch',
        desc: '显示面的边线',
        value: false,
        default: false,
    },
    outlineWidth: {
        type: 'inputNumber',
        desc: '面的边线宽度',
        value: 2,
        default: 2,
        precondition: { outline: true },
        attrs: {
            min: 1,
            max: 10,
            unit: 'px',
        },
    },
    outlineColor: {
        type: 'colorPick',
        desc: '面的边线颜色',
        value: '#34E031',
        default: '#34E031',
        precondition: { outline: true },
        attrs: {
            placeholder: '请输入面的边线颜色',
        },
    },
    outlineColorOpacity: {
        type: 'inputNumber',
        desc: '面的边线颜色透明度',
        value: 1,
        default: 1,
        precondition: { outline: true },
        attrs: { min: 0, max: 1, precision: 1, step: 0.1 },
    },
    outlineHeight: {
        type: 'inputNumber',
        desc: '面的边线的离地高度',
        value: 50,
        default: 50,
        precondition: { outline: true },
        attrs: {
            unit: 'm',
        },
    },
});
</script>

<style lang="scss">
.linkageForm {
    padding: pxToRem(32);
    @include flexCenter;
    .FormItem {
        @include whrem(500, 100%);
    }
}
</style>
