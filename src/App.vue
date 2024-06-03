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
import MenuList from '@/layouts/menu/Index.vue';
import Header from '@/layouts/header/Index.vue';
</script>

<style lang="scss">
@import './styles/layout.scss';
</style>
