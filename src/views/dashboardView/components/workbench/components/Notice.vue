<template>
    <div class="Notice h-full py-4 pl-4 rounded-xl flex flex-col overflow-hidden">
        <BoatTitle title="最新公告">
            <boat-button type="link">查看更多</boat-button>
        </BoatTitle>
        <main class="flex-1 scrollbarStyle pr-4">
            <ul class="w-full h-fit-content flex flex-col gap-2">
                <li
                    v-for="item in recentNotices"
                    :key="item.id"
                    class="w-full flex justify-start items-center relative gap-4"
                >
                    <el-tag :type="item.type">
                        {{ item.label }}
                    </el-tag>
                    <p class="text-h2 font-style-4">{{ item.content }}</p>
                </li>
            </ul>
        </main>
    </div>
</template>

<script setup lang="ts">
interface NoticeItem {
    id: number;
    type: 'success' | 'warning' | 'danger' | 'info';
    label: string;
    content: string;
}

const recentNotices = ref<NoticeItem[]>([
    {
        id: 1,
        type: 'success',
        label: '通知',
        content:
            '系统将于 4 月 25 日 02:00-04:00 进行例行维护，届时部分功能可能暂时不可用，请提前做好准备。',
    },
    {
        id: 2,
        type: 'warning',
        label: '警告',
        content: '检测到多个账户存在异常登录行为，请及时修改密码并开启双因素认证。',
    },
    {
        id: 3,
        type: 'danger',
        label: '违规',
        content: '由于上传内容违规，您的一条评论已被删除，请遵守社区规范。',
    },
    {
        id: 4,
        type: 'info',
        label: '信息',
        content: '新功能“团队协作”已上线，您可以与同事在同一项目中实时协作。',
    },
    {
        id: 5,
        type: 'success',
        label: '通知',
        content: '已发布最新版本 2.3.0，更新了界面优化与性能提升，详情请查看更新日志。',
    },
    {
        id: 6,
        type: 'warning',
        label: '警告',
        content: '您的存储空间已使用 90%，请及时清理无用文件以免影响服务。',
    },
    {
        id: 7,
        type: 'danger',
        label: '违规',
        content: '检测到您上传的文件格式不符合要求，已被系统自动拒绝，请上传有效格式。',
    },
    {
        id: 8,
        type: 'info',
        label: '信息',
        content: '下周五（5 月 2 日）将举办线上产品体验会，欢迎报名参加。',
    },
    {
        id: 9,
        type: 'success',
        label: '通知',
        content: '所有 API 调用将逐步迁移至新的 3.0 版本，旧版接口将于 6 月底停止支持。',
    },
    {
        id: 10,
        type: 'info',
        label: '信息',
        content: '我们正在征求新功能意见，欢迎前往社区反馈您对产品的建议。',
    },
]);
</script>

<style lang="scss">
.Notice {
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
}
</style>
