<template>
    <div class="ToDoItems h-full py-4 pl-4 rounded-xl flex flex-col overflow-hidden">
        <BoatTitle title="代办事项">
            <BoatIconButton icon="&#xe7c8;" title="新增代办事项"></BoatIconButton>
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
    </div>
</template>

<script setup lang="ts">
interface TodoItem {
    id: number;
    time: string;
    content: string;
    checked?: boolean;
}

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
