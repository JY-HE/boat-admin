<template>
    <div class="pt-4 pb-4 pl-4">
        <div
            class="lineChartsContent p-4 w-full h-full grid justify-items-center grid-cols-2 gap-8"
        >
            <BasicLine />
        </div>
    </div>
</template>

<script setup lang="ts">
import BasicLine from './components/BasicLine.vue';
</script>

<style lang="scss">
.lineChartsContent {
    @include scrollbarStyle;
}
</style>
