<template>
    <div class="text-marquee" :class="[`text-marquee--${type}`]">
        <BoatIconfont icon="&#xe656;" />
        <div class="marquee-wrapper">
            <div
                class="marquee-content"
                :style="{
                    '--marquee-duration': `${duration}s`,
                    '--animation-direction': direction === 'left' ? 'normal' : 'reverse',
                }"
                @mouseenter="pause"
                @mouseleave="play"
                ref="contentEl"
            >
                <div v-for="(chunk, idx) in displayChunks" :key="idx" class="marquee-item">
                    {{ chunk }}
                </div>
            </div>
        </div>
        <BoatIconfont v-if="showClose" icon="&#xe622;" @click="emits('close')" />
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: 'close'): void }>();

interface Props {
    /** 文本 */
    text: string;
    /** 滚动速度 */
    speed?: number;
    /** 滚动方向 左/右 */
    direction?: 'left' | 'right';
    /** 类型 默认/成功/警告/危险/信息 */
    type?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    /** 是否显示关闭按钮 */
    showClose?: boolean;
    /** 是否启用打字机效果 */
    typewriter?: boolean;
    /** 打字机速度 */
    typewriterSpeed?: number;
}

const props = withDefaults(defineProps<Props>(), {
    speed: 300,
    direction: 'left',
    type: 'default',
    showClose: false,
    typewriter: false,
    typewriterSpeed: 200,
});

// 将 props 转为响应式引用
const { text, speed, direction, showClose, typewriter, typewriterSpeed } = toRefs(props);

// DOM 元素引用
const contentEl = ref<HTMLElement | null>(null);

// 容器和内容宽度，用于计算动画时长
const containerWidth = ref(0);
const contentWidth = ref(0);

// 打字机已输出文本
const typewriterText = ref('');

// 定时器 ID
let typewriterTimer: number | null = null;

/**
 * 生成滚动文本数组，打字机模式下使用 typewriterText，否则使用完整 text
 */
const displayChunks = computed(() => {
    const src = typewriter.value ? typewriterText.value : text.value;
    return [src, src];
});

/**
 * 计算滚动动画时长 (秒)
 */
const duration = computed(() => {
    const totalDistance = containerWidth.value + contentWidth.value;
    return (totalDistance / speed.value).toFixed(2);
});

/**
 * 更新容器 & 内容宽度
 */
function updateSizes() {
    if (!contentEl.value?.parentElement) return;
    containerWidth.value = contentEl.value.parentElement?.clientWidth || 0;
    contentWidth.value = contentEl.value.scrollWidth / 2;
}

/**
 * 暂停滚动动画
 */
function pause() {
    if (contentEl.value) contentEl.value.style.animationPlayState = 'paused';
}

/**
 * 恢复滚动动画
 */
function play() {
    if (contentEl.value) contentEl.value.style.animationPlayState = 'running';
}

/**
 * 启动打字机动画
 */
function startTypewriter() {
    clearTypewriter();
    typewriterText.value = '';
    let idx = 0;
    typewriterTimer = window.setInterval(() => {
        if (idx < text.value.length) {
            typewriterText.value += text.value[idx++];
            updateSizes();
        } else {
            clearTypewriter();
        }
    }, typewriterSpeed.value);
}

/**
 * 清除打字机定时器
 */
function clearTypewriter() {
    if (typewriterTimer !== null) {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
    }
}

let resizeObserver: ResizeObserver;

onMounted(() => {
    if (typewriter.value) {
        startTypewriter();
    } else {
        updateSizes();
        resizeObserver = new ResizeObserver(updateSizes);
        if (contentEl.value) resizeObserver.observe(contentEl.value.parentElement!);
    }
});

onBeforeUnmount(() => {
    if (resizeObserver && contentEl.value) resizeObserver.disconnect();
    clearTypewriter();
});

/**
 * 响应文字或模式变更，自动重置
 */
watchEffect(() => {
    if (typewriter.value) startTypewriter();
    else updateSizes();
});
</script>

<style lang="scss">
.text-marquee {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: pxToRem(8) pxToRem(12);
    border-radius: pxToRem(8);
    @include fontStyle(3);
    @include flexCenter(flex-start);
    gap: pxToRem(16);
    margin-bottom: pxToRem(20);

    $status-map: (
        default: normalColor,
        success: successColor,
        warning: warnColor,
        danger: errorColor,
        info: disabledColor,
    );

    @each $status, $color in $status-map {
        &--#{$status} {
            color: colorValue(#{$color}, 1);
            border: pxToRem(1) solid;
            border-color: colorValue(#{$color}, 1);
            background: linear-gradient(
                    0deg,
                    colorValue(#{$color}, 0.05),
                    colorValue(#{$color}, 0.05)
                ),
                colorValue(bodyBackground, 0.05);

            .BoatIconfont {
                color: colorValue(#{$color}, 1);
                cursor: pointer;
            }
        }
    }

    .BoatIconfont {
        @include iconSize(1);
        font-weight: normal;
    }

    .marquee-wrapper {
        flex: 1;
        overflow: hidden;

        .marquee-content {
            @include flexCenter(flex-start);
            white-space: nowrap;
            animation: marquee linear infinite;
            animation-duration: var(--marquee-duration);
            animation-direction: var(--animation-direction);

            .marquee-item {
                min-width: 100%;
            }
        }
    }
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>
