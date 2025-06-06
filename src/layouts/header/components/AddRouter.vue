<template>
    <div class="AddRouter">
        <BoatIconButton
            icon="&#xe7a5;"
            title="新增菜单"
            @click="dialogVisible = true"
        ></BoatIconButton>

        <el-dialog v-model="dialogVisible" title="新增菜单" destroyOnClose>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                class="dialogForm AddRouterForm"
                requireAsteriskPosition="right"
            >
                <el-form-item label="菜单等级" prop="menuLevel">
                    <el-radio-group v-model="ruleForm.menuLevel" @change="menuLevelChange">
                        <el-radio :value="1">一级</el-radio>
                        <el-radio :value="2">二级</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="ruleForm.menuLevel !== 1" label="所属菜单" prop="menuParent">
                    <el-select v-model="ruleForm.menuParent" placeholder="请选择所属菜单">
                        <el-option
                            v-for="item in routerOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model.trim="ruleForm.menuName" placeholder="请输入菜单名称" />
                </el-form-item>
                <el-form-item label="菜单文件名称" prop="menuFileName">
                    <el-input
                        v-model.trim="ruleForm.menuFileName"
                        placeholder="请输入菜单文件名称"
                    />
                </el-form-item>
                <el-form-item v-if="ruleForm.menuLevel === 1" label="icon图标" prop="icon">
                    <el-input v-model.trim="ruleForm.icon" placeholder="请输入icon图标" />
                </el-form-item>
                <el-form-item>
                    <BoatCancelConfirmButton
                        @cancel="dialogVisible = false"
                        @submit-form="submitForm(ruleFormRef)"
                    />
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { PlusRouteRecordRaw } from '@/types';
import type { FormInstance, FormRules } from 'element-plus';
import axios from 'axios';

interface RuleForm {
    menuLevel: number;
    menuParent: string;
    menuName: string;
    menuFileName: string;
    icon: string;
}
const ruleFormRef = ref<FormInstance | null>(null);
const ruleForm = ref<RuleForm>({
    menuLevel: 1,
    menuParent: '',
    menuName: '',
    menuFileName: '',
    icon: '',
});
const dialogVisible = ref<boolean>(false);
const rules = ref<FormRules<RuleForm>>({
    menuName: [{ required: true, message: '请输入菜单名称', trigger: 'change' }],
    menuFileName: [
        {
            required: true,
            message: '请输入菜单文件名称',
            trigger: 'change',
        },
        {
            message: '请输入英文字母或数字',
            trigger: 'change',
            pattern: /^[a-zA-Z0-9]*$/,
        },
    ],
    menuParent: [{ required: true, message: '请选择所属菜单', trigger: 'change' }],
    icon: [{ required: true, message: '请输入icon图标', trigger: 'change' }],
});

/**
 * 表单校验
 * @param formEl 表单 form 的 ref 对象
 */
const submitForm = async (formEl: FormInstance | null) => {
    if (!formEl) return;

    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                await axios.post('/addDirectory', {
                    level: ruleForm.value.menuLevel,
                    title: ruleForm.value.menuName,
                    fileName: ruleForm.value.menuFileName,
                    icon: ruleForm.value.icon,
                    parentName: ruleForm.value.menuParent,
                });
            } catch (error) {
                console.error('Error creating directory:', error);
            }
        } else {
            console.error('error submit!', fields);
        }
    });
};

const routerList = useRouter()
    .getRoutes()
    .filter(item => item?.meta?.isShow) as unknown as PlusRouteRecordRaw[];
const routerOptions = ref<{ label: string; value: string }[]>([]);
/**
 * 处理菜单等级改变事件
 */
const menuLevelChange = () => {
    // 新建二级菜单
    if (ruleForm.value.menuLevel === 2) {
        routerOptions.value = routerList.map(item => {
            const viewName = `${item.path
                ?.split('/')
                ?.filter(item => Boolean(item))
                ?.at(0)}View`;
            return {
                label: item.meta.title,
                value: viewName,
            };
        });
    }
};
</script>

<style lang="scss">
.el-form.dialogForm.AddRouterForm {
    .el-form-item {
        .el-form-item__label {
            width: pxToRem(148);
        }
    }
}
</style>
