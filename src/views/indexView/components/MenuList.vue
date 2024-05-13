<template>
    <div menuMain>
        <div id="systemTitle">
            <div class="logo"></div>
            <h1 class="title">BoatAdmin</h1>
        </div>

        <div class="menu">
            <BoatMenu :routerList="routerList" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const routerList = router.getRoutes().filter(item => item?.meta?.isShow);
</script>

<style lang="scss"></style>
