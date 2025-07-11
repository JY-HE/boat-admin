<template>
    <div class="Dynamics h-full rounded-xl p-4 flex flex-col overflow-hidden">
        <BoatTitle title="最新动态">
            <boat-button type="link">查看更多</boat-button>
        </BoatTitle>
        <main class="flex-1 scrollbarStyle">
            <ul class="w-full h-fit-content">
                <li
                    v-for="item in recentDays"
                    :key="item.date"
                    class="flex justify-center items-start flex-col relative pl-10"
                >
                    <p class="text-h2 font-style-4">{{ `${item.date}（${item.weekday}）` }}</p>
                    <p class="text-h1 font-style-4">
                        新增
                        <span class="text-errorColor-100">{{ item.newCount }}</span>
                        条问题，
                        <span class="text-successColor-100">{{ item.solvedCount }}</span>
                        条已解决
                    </p>
                </li>
            </ul>
        </main>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dynamics' });

const recentDays = ref(
    Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return {
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            weekday: weekdays[date.getDay()],
            newCount: Math.floor(Math.random() * 1000),
            solvedCount: Math.floor(Math.random() * 1000),
        };
    })
);
</script>

<style lang="scss">
.Dynamics {
    $dot-colors: (
        (
            start: #667eea,
            end: #764ba2,
        ),
        (
            start: #adb90a,
            end: #14c7a3,
        ),
        (
            start: #c7f549,
            end: #c76317,
        ),
        (
            start: #f33f6c,
            end: #aa7ef1,
        ),
        (
            start: #93c3cc,
            end: #9a7ace,
        ),
        (
            start: #e7b16a,
            end: #7e7b66,
        ),
        (
            start: #4aca71,
            end: #345a2f,
        )
    );
    ul {
        li {
            height: pxToRem(64);

            &::before {
                content: '';
                position: absolute;
                left: pxToRem(20);
                top: 0;
                height: 100%;
                width: pxToRem(1);
                @include disabledColor(1, background-color);
                z-index: 1;
            }

            &::after {
                content: '';
                position: absolute;
                left: pxToRem(13);
                top: 50%;
                transform: translateY(-50%);
                @include whrem(16);
                border-radius: 50%;
                z-index: 2;
            }

            &:first-of-type {
                &::before {
                    top: 50%;
                }
            }

            &:first-of-type,
            &:last-of-type {
                &::before {
                    height: 50%;
                }
            }

            @for $i from 1 through length($dot-colors) {
                &:nth-child(#{$i}) {
                    $colors: nth($dot-colors, $i);
                    &::after {
                        background: linear-gradient(
                            135deg,
                            map-get($colors, start) 0%,
                            map-get($colors, end) 100%
                        );
                    }
                }
            }
        }
    }
    .BoatTitle {
        div[operation] {
            div[buttonlist] {
                justify-content: end;
            }
        }
    }
}
</style>
