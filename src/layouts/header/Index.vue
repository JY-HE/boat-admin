<template>
    <div header>
        <div breadcrumb>
            <Breadcrumb />
        </div>
        <div operation>
            <RouterSearch />
            <Theme />
            <AddRouter v-if="mode === 'development'" />
            <Setting />
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue';
import Theme from './components/Theme.vue';
import RouterSearch from './components/RouterSearch.vue';
import Setting from './components/Setting.vue';
import AddRouter from './components/AddRouter.vue';

const mode = ref(import.meta.env.VITE_NODE_ENV);
</script>
