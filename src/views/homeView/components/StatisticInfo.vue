<template>
    <div
        class="StatisticInfo w-full h-full flex justify-between items-center gap-3 py-2 px-4 rounded-xl"
    >
        <div class="w-20 h-full flex justify-center items-center rounded-[50%] overflow-hidden">
            <img src="/logo.svg" alt="logo" class="w-full w-full" />
        </div>
        <main class="flex-1 h-full flex justify-center items-start flex-col gap-2">
            <p class="font-style-1 text-h1">早安，Boat Admin，今天又是活力满满的一天！</p>
            <p class="font-style-4 text-h3">今日多云转晴，20℃ ~ 28℃</p>
        </main>
        <div class="w-fit-content h-full flex items-center gap-6">
            <div
                v-for="item in currentStatistic"
                :key="item.title"
                class="h-full flex justify-center items-between flex-col gap-3"
            >
                <p class="font-style-4 text-h1">{{ item.title }}</p>
                <span class="font-style-1 text-h1">{{ item.value }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const currentStatistic = computed(() => {
    return [
        {
            title: '项目数',
            value: 25,
        },
        {
            title: '待办',
            value: '6/15',
        },
        {
            title: '消息',
            value: 32,
        },
    ];
});
</script>

<style lang="scss">
.StatisticInfo {
    @include panelStyle;
    @include panelShadow(0.25);
}
@include darkStyle {
    .StatisticInfo {
        @include panelShadow(0.8);
    }
}
</style>
