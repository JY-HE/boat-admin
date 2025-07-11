<template>
    <div class="BoatLoading"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.BoatLoading {
    @include whrem(16);
    position: relative;
    left: pxToRem(-32);
    border-radius: 50%;
    @include whiteColor(1, color);
    background: currentColor;
    box-shadow: pxToRem(32) 0, pxToRem(-32) 0, pxToRem(64) 0;
}

.BoatLoading::after {
    content: '';
    position: absolute;
    left: pxToRem(-32);
    top: 0;
    @include whrem(16);
    border-radius: pxToRem(10);
    @include themeColor(1, background-color);
    animation: loading-move 3.5s linear infinite alternate;
}

@keyframes loading-move {
    0%,
    5% {
        left: pxToRem(-32);
        width: pxToRem(16);
    }
    15%,
    20% {
        left: pxToRem(-32);
        width: pxToRem(48);
    }
    30%,
    35% {
        left: 0;
        width: pxToRem(16);
    }
    45%,
    50% {
        left: 0;
        width: pxToRem(48);
    }
    60%,
    65% {
        left: pxToRem(32);
        width: pxToRem(16);
    }

    75%,
    80% {
        left: pxToRem(32);
        width: pxToRem(48);
    }
    95%,
    100% {
        left: pxToRem(64);
        width: pxToRem(16);
    }
}
</style>
