<template>
    <div menuMain>
        <div id="systemTitle">
            <div id="logo"></div>
            <h1 class="title">BoatAdmin</h1>
        </div>

        <div class="menu">
            <BoatMenu :router-list="routerList" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CustomRouteRecordRaw } from '@/views/indexView/types';
const router = useRouter();
const routerList = router
    .getRoutes()
    .filter(item => item?.meta?.isShow) as unknown as CustomRouteRecordRaw[];
</script>

<style lang="scss"></style>
