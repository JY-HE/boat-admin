<template>
    <div class="ErrorTip">
        <img :src="getAssetsImg(`error-${type}.svg`)" alt="" />
        <div>
            <h2>{{ type }}</h2>
            <p class="text">{{ errorList.get(type) }}</p>
            <button @click="router.push('/')">返回首页</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getAssetsImg } from '@/utils/global';

defineProps<{
    /** 异常类型 403 404 500 */
    type: '403' | '404' | '500';
}>();
const router = useRouter();

const errorList = computed(() => {
    return new Map([
        ['403', '您没有权限访问该页面'],
        ['404', '您访问的页面不存在'],
        ['500', '服务器内部错误'],
    ]);
});
</script>

<style lang="scss">
.ErrorTip {
    @include flexCenter(center, center);
    gap: pxToRem(48);
    img {
        @include whrem(400);
    }
    div {
        button {
            margin-top: pxToRem(24);
            padding: pxToRem(12) pxToRem(16);
            @include fontStyle(2);
            @include whiteColor(1, color);
            @include themeColor(1, background-color);
            border-radius: pxToRem(12);
            border: none;
        }
        h2 {
            @include fontColor(1);
            font-size: pxToRem(32);
            line-height: pxToRem(32);
        }

        p {
            margin-top: pxToRem(32);
            @include fontColor(2);
            @include fontStyle(2);
        }
    }
}
</style>
