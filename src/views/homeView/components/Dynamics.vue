<template>
    <div class="Dynamics rounded-xl"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.Dynamics {
    width: pxToRem(414);
    height: pxToRem(200);
    @include panelStyle;
    @include panelShadow(0.25);
}
</style>
