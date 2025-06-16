<template>
    <div menuList>
        <MenuList></MenuList>
    </div>
    <div mainArea>
        <Header></Header>
        <div mainContent>
            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <component :is="Component" contentArea />
                </transition>
            </router-view>
        </div>
    </div>
    <boat-rotate-menu :menus="iconList" @click="handleRotateMenuClick">
        <template v-slot="{ data }">
            <BoatIconfont :icon="data.icon" class="text-5xl font-bold" />
        </template>
    </boat-rotate-menu>
    <BoatUpdateModal v-model="visibleUpdateModal" />
</template>

<script setup lang="ts">
import MenuList from '@/layouts/menu/Index.vue';
import Header from '@/layouts/header/Index.vue';
import { usePubSub, Topics } from '@/hooks/usePubSub';
import { useVersionChecker } from '@/hooks/useVersionChecker';

const router = useRouter();
const { publish: openConfigDrawer } = usePubSub(Topics.OpenSystemConfigDrawer);

const iconList = ref<{ icon: string; menu: string }[]>([
    {
        icon: '&#xeb95;',
        menu: 'workbench',
    },
    {
        icon: '&#xe662;',
        menu: 'search',
    },
    {
        icon: '&#xe63c;',
        menu: 'config',
    },
]);

function handleRotateMenuClick(data: { icon: string; menu: string }) {
    switch (data.menu) {
        case 'workbench':
            router.push('/dashboard/workbench');
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
        case 'config':
            openConfigDrawer(null);
            break;
        default:
            break;
    }
}

const visibleUpdateModal = ref(false);
const { hasNewVersion } = useVersionChecker();
watch(hasNewVersion, newValue => {
    if (newValue) {
        visibleUpdateModal.value = true;
    }
});
</script>

<style lang="scss">
@import './styles/layout.scss';
</style>
