<template>
    <div class="BoatEchartsPreview">
        <div class="picture" @click.stop="dialogVisible = true">
            <img
                v-show="isLoading"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIAOEBLAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgQFAQMI/9oACAEBAAAAAPuYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAByJ2QAAAAHJ3LEuRqU5AAAADl62BHN8wAAAEdKwAczfIAAAC1ecrV1myOY0gAAAjs9Z9cemn0o1QAAA9dN5ZgL9khkSAAAFy4rUAe2kMSYAAA0LCtQBY0BjdAAAF+yhlAvLPWJMAAAe2k5m+Qa3lV0IZMgAABHZ65m+Q9L/AHtKuAAACzfOeVfnrZ6jjyAAABHRsgHMgAAAAjcu9B5ZgAAAAF309Vet4SAAAAAR4mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/xAA2EAACAQIDBQQIBQUAAAAAAAABAgMAEQQSMSAhQEFREBMycQUUIjBCYYGRIzNDULFSYnCAof/aAAgBAQABPwD/ACdcDU0XXrWccgazjoaDqef7AWC6mkgmmsQMinmajwMQ8V389woRxr4UA7CAdRT4XDP8Av1XdT4BgC0D3A1DUSyNlkUg8aSSQiC7GoMIqWeSzP8A8HuHjjkBVxep8M+GN97RE+LpxbHQKLkmsNAIRc2Mh1PuiAQQRWKw/qsnsm8ZO75fI8VgY9/rDDqE7SQASakxQFxGt/maM8xPit5C1esTD9Q1HjnG5xcdRrSsHAZTu2JEEiFGG41Zo3eJ9VNuIILlY11YgUqhFCLuAA7Z5jISAfYGzFI0TXH1FKwZQy8xfYx8YBSZdL5TxGEXPiC3JV/ntxT5Y8o1bbwUjXaIc9+xNH3kMqWucppDdRw/o/wzk82At5duPsJEUcl24CRKv1Gyoyl0HJiOH9Hsow8qnUyH+B2+kLGRCOltvCrmnjH12TYyzkad4388P6LcKcQh6g9uKTPDmUWCnbwqbi557hUk88bC9svK2lRyCRAw3crdqG5ZupJ4fBOI8Wt9GBGxNGYnI5cjtREGNMp5AVi2Hd2OuYWqGcxAra6k3NKwZQynUViXEcErc7ZR5mlFlHDtcZXXVSCPMVE4eNXX4h2yIJAVOnI1LC8R3jdyI02Y2kBtGTf5VHDvzynM/wBxU8UbKcqjMATcbtKgQrEAdx18qxsmZ44R8PtN5nicDP3LmF/CxupPI89ggEEGpMLGT+GxFeqS78tjQwkxBNhS4Tm7/akjSPwgdssggjLv9B1oXJZ3N2JuTxLAGsNie8URSm0g0P8AUPdO6xqzsbAVJI0752FlHhHQcWQDUGMy+xiPow5+dAggEHblxEcPiPtclGtO7zMGk0Gi8aRekaWL8pyBzHI0vpJifx4939ulLisO36oHmDQniOkifehPh495lUn5Gmx0Q8N28qfFTyXCgIPuaC6k3J/YSoNd2vSsi9KAHT/Rz//EABQRAQAAAAAAAAAAAAAAAAAAAID/2gAIAQIBAT8ADv8A/8QAFBEBAAAAAAAAAAAAAAAAAAAAgP/aAAgBAwEBPwAO/wD/2Q=="
                alt="default"
                class="default-img"
            />
            <img
                v-show="!isLoading"
                :src="isDarkMode ? darkSrc : lightSrc"
                class="chart-img"
                @error="isLoading = true"
                @load="isLoading = false"
            />
        </div>
        <div class="w-full h-12 pl-2 info">
            <div class="text-h1 font-style-2">{{ title }}</div>
            <div class="text-h2 font-style-3">{{ enTitle }}</div>
        </div>
        <el-dialog
            v-model="dialogVisible"
            class="echarts-preview-dialog"
            :title="title || enTitle"
            appendToBody
            draggable
            destroyOnClose
        >
            <component :is="componentChart"></component>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store';
defineProps({
    title: {
        type: String,
        default: '',
    },
    enTitle: {
        type: String,
        default: '',
    },
    darkSrc: {
        type: String,
        default: '',
    },
    lightSrc: {
        type: String,
        default: '',
    },
    componentChart: {
        type: Object,
        default: () => ({}),
    },
});

const dialogVisible = ref(false);
const isLoading = ref(true);
const isDarkMode = computed(() => useLayoutStore().isDark);
</script>

<style lang="scss">
.BoatEchartsPreview {
    @include whrem(322, 336);
    @include flexCenter(center, center, true);
    overflow: hidden;
    gap: pxToRem(16);

    .picture {
        width: 100%;
        height: calc(100% - #{pxToRem(48)});
        cursor: pointer;
        border-radius: pxToRem(8);
        border: pxToRem(1) solid;
        @include themeColor(var(--chartModuleBorderAlpha), border-color);
        overflow: hidden;
        position: relative;

        &:hover {
            img {
                transform: scale(1.1);
            }
        }
        img {
            @include wh;
            transition: all 0.3s ease;
            object-fit: fill;
            position: absolute;
            top: 0;
            left: 0;
        }
        .default-img {
            z-index: 1;
        }
        .chart-img {
            z-index: 2;
        }
    }
}
.echarts-preview-dialog {
    @include whrem(1524, 800);
    .el-dialog__body {
        height: calc(100% - #{pxToRem(48)});
    }
}
</style>
