<template>
    <div class="IntroductionPage">
        <p>引导页常用于引导式介绍项目的基本功能或亮点</p>
        <span>
            本事例基于
            <a href="https://driverjs.com" target="\_blank">driver.js</a>
        </span>
        <div @click="driverHandler">Click me</div>
    </div>
</template>

<script setup lang="ts">
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const driverObj = driver({
    showProgress: false,
    showButtons: ['next', 'previous'],
    popoverClass: 'driverjs-theme',
    steps: [
        {
            element: '.collapseExpandButton',
            popover: {
                title: '折叠菜单栏',
                description: '您可以点击这里折叠左侧菜单栏。',
                side: 'left',
                align: 'start',
            },
        },
        {
            element: '.switchThemeMode',
            popover: {
                title: '切换主题模式',
                description: '您可以点击这里切换当前的主题模式。',
                side: 'right',
                align: 'start',
            },
        },
    ],
});
const driverHandler = () => {
    driverObj.drive();
};
</script>

<style lang="scss">
.IntroductionPage {
    @include fontColor(1);
    padding: pxToRem(16);
    p {
        @include fontStyle(1);
        margin-bottom: pxToRem(16);
    }
    span {
        @include fontStyle(2);
    }
    div {
        width: fit-content;
        height: fit-content;
        padding: pxToRem(16);
        border-radius: pxToRem(12);
        margin-top: pxToRem(16);
        cursor: pointer;
        @include themeColor(1, background-color);
        @include whiteColor(1, color);
    }
}
.driver-popover.driverjs-theme {
    @include themeColor(1, background-color);
    @include whiteColor(1, color);

    .driver-popover-title {
        @include fontStyle(1);
    }
    .driver-popover-description {
        @include fontStyle(2);
        margin-top: pxToRem(12);
    }
    button {
        flex: 1;
        text-align: center;
        text-shadow: none;
        border-radius: pxToRem(6);
        padding: pxToRem(4) pxToRem(8);
        border: pxToRem(2) solid;
        @include blackColor(1, border-color);
        @include blackColor(1, background-color);
        @include fontStyle(2);
        @include whiteColor(1, color);
    }
    .driver-popover-footer {
        margin-top: pxToRem(16);
    }
    .driver-popover-arrow-side-left.driver-popover-arrow {
        @include themeColor(1, border-left-color);
        transition: none;
    }

    .driver-popover-arrow-side-right.driver-popover-arrow {
        @include themeColor(1, border-right-color);
        transition: none;
    }

    .driver-popover-arrow-side-top.driver-popover-arrow {
        @include themeColor(1, border-top-color);
        transition: none;
    }

    .driver-popover-arrow-side-bottom.driver-popover-arrow {
        @include themeColor(1, border-bottom-color);
        transition: none;
    }
    .driver-popover-navigation-btns {
        justify-content: space-between;
        gap: pxToRem(4);
        .driver-popover-btn-disabled {
            opacity: 0.4;
        }
    }
}
</style>
