<template>
    <div header>
        <div breadcrumb>
            <Breadcrumb />
        </div>
        <div operation>
            <RouterSearch />
            <Theme />
            <AddRouter v-if="!isProd" />
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

const isProd = import.meta.env.PROD; // 判断是否为生产环境
</script>
