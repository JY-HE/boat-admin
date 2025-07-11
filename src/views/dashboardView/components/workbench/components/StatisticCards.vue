<template>
    <div class="StatisticCards w-full h-full flex gap-4">
        <BoatCard v-for="card in statisticCards" :key="card.title" :title="card.title">
            <div class="flex justify-between">
                <BoatIconfont :icon="card.icon" class="font-style-1 text-whiteColor-100 text-3xl" />
                <p class="text-h1 font-style-1">
                    {{ formatNumberWithCommas(card.value) }}
                </p>
            </div>
        </BoatCard>
    </div>
</template>

<script setup lang="ts">
import { formatNumberWithCommas } from '@/utils/global';

defineOptions({ name: 'StatisticCards' });

interface StatisticCardConfig {
    title: string;
    icon: string;
    min: number;
    max: number;
}

const configs: StatisticCardConfig[] = [
    { title: '今日新增客户数', icon: '&#xe647;', min: 100, max: 2000 },
    { title: '当前在线用户数', icon: '&#xe688;', min: 50, max: 500 },
    { title: '24h 活跃用户数', icon: '&#xe635;', min: 50, max: 2000 },
    { title: '今日访问量', icon: '&#xe638;', min: 100, max: 2000 },
];

const statisticCards = computed(() =>
    configs.map(cfg => ({
        title: cfg.title,
        icon: cfg.icon,
        value: Math.floor(Math.random() * (cfg.max - cfg.min + 1)) + cfg.min,
    }))
);
</script>

<style lang="scss">
.StatisticCards {
    $card-colors: (
        (
            start: #667eea,
            end: #764ba2,
        ),
        (
            start: #68b90a,
            end: #14c7a3,
        ),
        (
            start: #f54949,
            end: #c76317,
        ),
        (
            start: #f33f6c,
            end: #aa7ef1,
        )
    );
    .BoatCard {
        @for $i from 1 through length($card-colors) {
            &:nth-child(#{$i}) {
                $colors: nth($card-colors, $i);
                background: linear-gradient(
                    135deg,
                    map-get($colors, start) 0%,
                    map-get($colors, end) 100%
                );
            }
        }
        .BoatIconfont {
            font-size: pxToRem(28);
        }
        .BoatIconfont,
        p {
            line-height: pxToRem(40);
        }
    }
}
</style>
