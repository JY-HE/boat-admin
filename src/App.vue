<script setup lang="ts">
import MenuList from '@/views/indexView/MenuList.vue';
</script>

<template>
    <div menuList>
        <MenuList></MenuList>
    </div>
    <div mainArea>
        <router-view />
    </div>
</template>

<style lang="scss">
@import './assets/scss/layout.scss';
</style>
