<template>
    <div class="ToDoItems h-full py-4 pl-4 rounded-xl flex flex-col overflow-hidden">
        <BoatTitle title="代办事项">
            <BoatIconButton
                icon="&#xe7c8;"
                title="新增代办事项"
                @click="dialogVisible = true"
            ></BoatIconButton>
        </BoatTitle>
        <main class="flex-1 scrollbarStyle pr-4">
            <ul v-if="todoItems.length" class="w-full h-fit-content flex flex-col gap-6">
                <li
                    v-for="item in todoItems"
                    :key="item.id"
                    class="w-full flex justify-start items-center"
                >
                    <el-checkbox v-model="item.checked">
                        <p class="text-h2 font-style-4">{{ item.time }}</p>
                        <p
                            class="text-h1 font-style-4 whitespace-pre-line"
                            :class="{ 'line-through': item.checked, 'text-h3': item.checked }"
                        >
                            {{ item.content }}
                        </p>
                    </el-checkbox>
                </li>
            </ul>
            <BoatNoData v-else title="暂无代办事项" />
        </main>
        <el-dialog
            v-model="dialogVisible"
            title="新增代办事项"
            destroyOnClose
            appendToBody
            alignCenter
        >
            <el-form
                ref="ruleFormRef"
                :model="form"
                :rules="rules"
                class="dialogForm"
                requireAsteriskPosition="right"
            >
                <el-form-item label="代办事项" prop="content">
                    <el-input
                        v-model.trim="form.content"
                        :autosize="{ minRows: 1, maxRows: 4 }"
                        type="textarea"
                        placeholder="请输入代办事项"
                    />
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
import type { FormInstance, FormRules } from 'element-plus';

interface TodoItem {
    id: number;
    time: string;
    content: string;
    checked?: boolean;
}

const dialogVisible = ref(false);

const todoItems = ref<TodoItem[]>([
    {
        id: 1,
        time: '2025-4-05 12:24:08',
        content: '完成项目报告',
        checked: false,
    },
    { id: 2, time: '2025-4-04 09:12:47', content: '参加团队会议', checked: false },
    { id: 3, time: '2025-4-03 08:34:25', content: '更新文档', checked: true },
    { id: 4, time: '2025-4-02 14:26:45', content: '处理客户反馈', checked: false },
    { id: 5, time: '2025-4-01 17:48:12', content: '准备演示材料', checked: true },
]);

interface RuleForm {
    content: string;
}
const ruleFormRef = ref<FormInstance | null>(null);
const form = ref<RuleForm>({
    content: '',
});
const rules = ref<FormRules<RuleForm>>({
    content: [{ required: true, message: '请输入待办事项', trigger: 'change' }],
});
/**
 * 表单校验
 * @param formEl 表单 form 的 ref 对象
 */
const submitForm = async (formEl: FormInstance | null) => {
    if (!formEl) return;

    await formEl.validate(async (valid, fields) => {
        if (valid) {
            addTodoItem();
        } else {
            console.error('error submit!', fields);
        }
    });
};
/**
 * 添加待办事项
 */
const addTodoItem = () => {
    if (!form.value.content.trim()) return;
    const newItem: TodoItem = {
        id: Date.now(),
        time: new Date().toLocaleString(),
        content: form.value.content.trim(),
        checked: false,
    };
    todoItems.value.unshift(newItem);
    form.value.content = '';
    dialogVisible.value = false;
};
</script>

<style lang="scss">
.ToDoItems {
    border: pxToRem(1) solid;
    @include themeColor(var(--chartModuleBorderAlpha), border-color);

    .BoatTitle {
        div[operation] {
            right: pxToRem(16);
            div[buttonlist] {
                justify-content: end;
            }
        }
    }

    ul {
        li {
            .el-checkbox {
                height: fit-content;
            }
        }
    }
}
</style>
