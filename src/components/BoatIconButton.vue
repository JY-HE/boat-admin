<template>
    <div
        class="BoatIconButton"
        :class="[
            { successColor: successColor, errorColor: errorColor, disabledColor: disabledColor },
        ]"
        @click.stop="clickHandle"
    >
        <el-tooltip :content="title" :placement="placement" popperClass="iconButtonTooltip">
            <em class="iconfont" v-html="icon"></em>
        </el-tooltip>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        title: string;
        icon: string;
        successColor?: boolean;
        errorColor?: boolean;
        disabledColor?: boolean;
        placement?:
            | 'top'
            | 'top-start'
            | 'top-end'
            | 'bottom'
            | 'bottom-start'
            | 'bottom-end'
            | 'left'
            | 'left-start'
            | 'left-end'
            | 'right'
            | 'right-start'
            | 'right-end';
    }>(),
    {
        placement: 'top-start',
    }
);

const emit = defineEmits(['click']);

const clickHandle = () => {
    if (props.disabledColor) return;
    emit('click');
};
</script>

<style lang="scss">
.BoatIconButton {
    @include whrem(30);
    @include flexCenter;
    border-radius: pxToRem(6);
    @include themeColor(0, background-color);
    .iconfont {
        @include iconSize;
        @include themeColor(1, color);
        cursor: pointer;
    }
    &:hover {
        @include themeColor(0.124, background-color);
    }

    &.successColor {
        &:hover {
            @include successColor(0.124, background-color);
        }
        .iconfont {
            @include successColor(1, color);
        }
    }

    &.errorColor {
        &:hover {
            @include errorColor(0.124, background-color);
        }
        .iconfont {
            @include errorColor(1, color);
        }
        &.disabledColor {
            cursor: not-allowed;
            &:hover {
                @include errorColor(0.124, background-color);
            }
            .iconfont {
                @include errorColor(0.124, color);
                cursor: not-allowed;
            }
        }
    }

    &.disabledColor {
        cursor: not-allowed;
        &:hover {
            @include themeColor(0.124, background-color);
        }
        .iconfont {
            @include themeColor(0.124, color);
            cursor: not-allowed;
        }
    }

    &:active {
        @include themeColor(1, background-color);
        .iconfont {
            @include whiteColor(1, color);
        }
        &.successColor {
            @include successColor(1, background-color);
        }
        &.errorColor {
            @include errorColor(1, background-color);
        }
        &.disabledColor {
            @include themeColor(0.124, background-color);
        }
    }
}
.iconButtonTooltip {
    @include themeColor(1, background-color, true);
    @include themeColor(1, border-color, true);
    @include whiteColor(1, color, true);
    @include fontStyle(4);
    .el-popper__arrow::before {
        @include themeColor(1, background, true);
        @include themeColor(1, border-color, true);
    }
}
</style>
