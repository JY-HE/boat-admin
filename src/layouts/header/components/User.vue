<template>
    <div class="User">
        <el-popover
            placement="bottom-end"
            popper-class="user-container"
            :show-arrow="false"
            trigger="click"
        >
            <template #reference>
                <div>
                    <BoatIconfont v-show="!isLogin" icon="&#xe639;" />
                    <img
                        v-show="isLogin"
                        src="https://avatars.githubusercontent.com/u/90995238?v=4"
                        @load="isLogin = true"
                        @error="isLogin = false"
                    />
                </div>
            </template>
            <template #default>
                <div class="user-info">
                    <div class="user-avatar">
                        <BoatIconfont v-if="!isLogin" icon="&#xe639;" />
                        <img
                            v-else
                            src="https://avatars.githubusercontent.com/u/90995238?v=4"
                            alt="avatar"
                        />
                    </div>
                    <div class="ml-4">
                        <div class="font-style-3 text-h2">{{ isLogin ? 'koihe' : '未登录' }}</div>
                        <div v-if="isLogin" class="font-style-4 text-h3">koihe@gmail.com</div>
                    </div>
                </div>
                <div class="user-controls">
                    <div class="controls-item">
                        <BoatIconfont icon="&#xe639;" />
                        <span>个人中心</span>
                    </div>
                    <div class="controls-item">
                        <BoatIconfont icon="&#xe648;" />
                        <span>皮肤设置</span>
                    </div>
                    <div class="controls-item">
                        <BoatIconfont icon="&#xe654;" />
                        <span>语言设置</span>
                    </div>
                </div>
                <div class="user-button">
                    <boat-button plain type="error" @click="isLogin = false">退出登录</boat-button>
                </div>
            </template>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
// 通过请求头像图片是否成功来模拟是否登录
const isLogin = ref(false);
</script>

<style lang="scss">
@mixin avatarStyle {
    @include whrem(40);
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    @include themeColor(1, background-color);
    @include flexCenter;
    position: relative;

    img {
        @include wh;
        object-fit: contain;
    }

    .BoatIconfont {
        position: absolute;
        @include whiteColor(1, color);
        @include iconSize(1);
    }
}
.User {
    .el-tooltip__trigger {
        @include avatarStyle;
    }
}
.el-popover.el-popper.user-container {
    border-radius: pxToRem(12);
    padding: pxToRem(16);
    @include panelStyle;
    @include panelShadow(0.46);
    @include flexCenter(flex-start, flex-start, center);
    gap: pxToRem(16);

    .user-info {
        @include whrem(220, 60);
        @include flexCenter(flex-start);

        .user-avatar {
            @include avatarStyle;
            @include whrem(50);
        }
    }

    .user-controls {
        border-top: pxToRem(1) solid;
        border-bottom: pxToRem(1) solid;
        @include disabledColor(0.3, border-color);
        padding: pxToRem(16) 0;

        .controls-item {
            @include whrem(220, 48);
            @include flexCenter(flex-start);
            padding: 0 pxToRem(16);
            gap: pxToRem(12);
            @include fontStyle(4);
            @include fontColor(2);
            border-radius: pxToRem(12);
            cursor: pointer;

            &:hover {
                @include themeColor(0.16, background-color);
            }

            &:active {
                @include themeColor(1, background-color);
                @include whiteColor(1, color);
            }

            .BoatIconfont {
                font-size: pxToRem(20);
            }
        }
    }

    .user-button {
        width: pxToRem(220);

        .boat-button {
            width: 100%;
        }
    }
}
</style>
