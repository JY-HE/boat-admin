<template>
    <div class="Dynamics h-full rounded-xl"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.Dynamics {
    grid-area: 3 / 3 / 6 / 5;
    @include panelStyle;
    @include panelShadow(0.25);
}
</style>
