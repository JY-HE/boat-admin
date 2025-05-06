<template>
    <div>
        <h1 class="text-h1 mb-8">页面离开提醒</h1>
        <p class="font-style-3 text-h1">
            在页面离开时，增加弹窗二次确认，避免因误操作导致当前页面数据清空
        </p>
    </div>
</template>

<script lang="ts" setup>
import { useRouterStore } from '@/store';

const routerStore = useRouterStore();

onBeforeRouteLeave((to, from, next) => {
    const leave = window.confirm('当前页面尚未保存，是否确定离开当前页面？');
    if (leave) {
        next();
    } else {
        next(false);
        // 当用户点击取消时，设置当前路由为激活路由，这样可以保持当前路由的状态
        routerStore.setActiveRouter(window.location.pathname);
    }
});
</script>
