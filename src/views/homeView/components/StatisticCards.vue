<template>
    <div class="StatisticCards w-full h-fit-content flex gap-4">
        <BoatCard v-for="card in statisticCards" :key="card.title" :title="card.title">
            <div class="flex justify-between">
                <BoatIconfont :icon="card.icon" class="font-style-1 text-whiteColor-100 text-3xl" />
                <p class="text-h4 font-style-1">
                    {{ formatNumberWithCommas(card.value) }}
                </p>
            </div>
        </BoatCard>
    </div>
</template>

<script setup lang="ts">
import { formatNumberWithCommas } from '@/utils/global';

const statisticCards = computed(() => {
    return [
        {
            title: '新增客户',
            value: 1245,
            icon: '&#xe647;',
        },
        {
            title: '在线人数',
            value: 124,
            icon: '&#xe688;',
        },
        {
            title: '活跃用户',
            value: 12433,
            icon: '&#xe635;',
        },
        {
            title: '访问人数',
            value: 124536,
            icon: '&#xe638;',
        },
    ];
});
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
