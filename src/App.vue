<template>
    <div menuList>
        <MenuList></MenuList>
    </div>
    <div mainArea>
        <Header></Header>
        <div mainContent>
            <transition name="fade">
                <router-view contentArea></router-view>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import MenuList from '@/layouts/MenuList.vue';
import Header from '@/layouts/Header.vue';
</script>

<style lang="scss">
@import './assets/scss/layout.scss';
</style>
