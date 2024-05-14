<script setup lang="ts">
import MenuList from '@/views/indexView/components/MenuList.vue';
</script>

<template>
    <div menuList>
        <MenuList></MenuList>
    </div>
    <div mainArea>
        <!-- 顶部 -->
        <!-- <Header></Header> -->
        <!-- 内容区 -->
        <div mainContent>
            <transition name="fade">
                <router-view content-area></router-view>
            </transition>
        </div>
    </div>
</template>

<style lang="scss">
@import './assets/scss/layout.scss';
</style>
