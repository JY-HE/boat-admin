<template>
    <div class="BoatCountTo">
        <div class="text-h1 font-style-1">
            {{ displayStr }}
        </div>
    </div>
</template>

<script setup lang="ts">
interface CountToProps {
    /** 起始值，默认 0 */
    startValue?: number;
    /** 目标值 */
    endValue: number;
    /** 动画时长，毫秒 */
    duration?: number;
    /** 保留小数位数 */
    decimalPlaces?: number;
}

const props = defineProps<CountToProps>();
const displayStr = ref<string>(formatNumber(props.startValue ?? 0, props.decimalPlaces ?? 0));

/**
 * 对数字加千分位分隔符
 */
function formatNumber(value: number, decimalPlaces: number): string {
    // 保留指定位数
    const fixed = value.toFixed(decimalPlaces);
    // 插入千分位逗号
    return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 数字滚动动画：从 start 到 end，在 duration 毫秒内平滑过渡
 */
function countTo() {
    const start = props.startValue ?? 0;
    const end = props.endValue;
    const duration = props.duration ?? 500;
    const decimalPlaces = props.decimalPlaces ?? 0;

    const change = end - start;
    const startTime = performance.now();

    function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + change * progress;
        displayStr.value = formatNumber(current, decimalPlaces);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            displayStr.value = formatNumber(end, decimalPlaces);
        }
    }

    requestAnimationFrame(step);
}

onMounted(countTo);

watch(
    () => [props.startValue, props.endValue],
    () => {
        displayStr.value = formatNumber(props.startValue ?? 0, props.decimalPlaces ?? 0);
        countTo();
    }
);
</script>
