<template>
    <div class="LineCharts">
        <div class="lineChartsContent">
            <BasicLine />
        </div>
    </div>
</template>

<script setup lang="ts">
import BasicLine from './components/BasicLine.vue';
</script>

<style lang="scss">
.LineCharts {
    .lineChartsContent {
        @include wh;
        padding: pxToRem(32);
        @include scrollbarStyle;
        display: grid;
        justify-items: center;
        row-gap: pxToRem(32);
        grid-template-columns: repeat(2, 1fr);

        .ChartBox {
            @include whrem(800, 500);
            .title {
                @include whrem(100%, 48);
                @include fontColor(1);
            }
            .BoatBaseECharts {
                width: 100%;
                height: calc(100% - #{pxToRem(48)});
            }
        }
    }
}
</style>
