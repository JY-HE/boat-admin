<template>
    <div class="w-full">
        <Module title="首页底部版权">
            <el-form :model="copyright">
                <el-form-item label="是否启用" prop="enable">
                    <el-switch v-model="copyright.enable" />
                </el-form-item>
                <el-form-item label="协议" prop="protocol">
                    <el-input v-model.trim="copyright.protocol" placeholder="请输入协议" />
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-input v-model.trim="copyright.date" placeholder="请输入日期" />
                </el-form-item>
                <el-form-item label="公司" prop="name">
                    <el-input v-model.trim="copyright.name" placeholder="请输入公司" />
                </el-form-item>
                <el-form-item label="网址" prop="url">
                    <el-input v-model.trim="copyright.url" placeholder="请输入网址" />
                </el-form-item>
                <el-form-item label="备案" prop="registration">
                    <el-input v-model.trim="copyright.registration" placeholder="请输入备案" />
                </el-form-item>
            </el-form>
        </Module>
    </div>
</template>

<script setup lang="ts">
import Module from '@/layouts/commonComponents/Module.vue';
import cloneDeep from 'lodash-es/cloneDeep';
import { type CopyrightConfig } from '@/store';
import { useSystemConfig } from '@/hooks/useSystemConfig';

const { copyrightConfig, setCopyrightConfig } = useSystemConfig();

const copyright = reactive<CopyrightConfig>(cloneDeep(copyrightConfig.value));

watch(
    () => copyright,
    newValue => {
        setCopyrightConfig(newValue);
    },
    {
        deep: true,
    }
);
</script>

<style lang="scss"></style>
