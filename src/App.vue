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
    <boat-rotate-menu :menus="['home1', 'search']" @click="handleRotateMenuClick" />
</template>

<script setup lang="ts">
import MenuList from '@/layouts/menu/Index.vue';
import Header from '@/layouts/header/Index.vue';

const router = useRouter();

function handleRotateMenuClick(menu: string) {
    switch (menu) {
        case 'home1':
            router.push('/home');
            break;
        case 'search':
            const event = new KeyboardEvent('keydown', {
                key: 'i',
                code: 'KeyI',
                ctrlKey: true,
                bubbles: true,
            });
            document.dispatchEvent(event);
            break;
        default:
            break;
    }
}
</script>

<style lang="scss">
@import './styles/layout.scss';
</style>
