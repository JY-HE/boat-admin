<script setup lang="ts">
import MenuList from '@/views/indexView/components/MenuList.vue';
import Header from '@/views/indexView/components/Header.vue';
</script>

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

<style lang="scss">
@import './assets/scss/layout.scss';
</style>
