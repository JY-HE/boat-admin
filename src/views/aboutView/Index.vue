<template>
    <div class="AboutView pt-4 pb-4 pl-4">
        <div
            class="content flex justify-start items-center flex-col gap-4 pr-4 w-full h-full scrollbar-style-1"
        >
            <BoatCard title="关于">
                <p>
                    Boat-admin 是一款基于 Vue3 + Vite3 + TypeScript + Element-plus + Tailwindcss
                    的后台管理模板。力求开箱即用，降低学习门槛和维护成本，同时也记录了一些作者工作过程中积累的技术。
                </p>
            </BoatCard>
            <BoatCard title="信息">
                <div>
                    <div label>GitHub</div>
                    <div value>
                        <a href="https://github.com/JY-HE/boat-admin" target="_blank">
                            GitHub地址
                        </a>
                    </div>
                </div>
                <div>
                    <div label>版本</div>
                    <div value>{{ packageData.version }}</div>
                </div>
                <div>
                    <div label>推荐 Node 版本</div>
                    <div value>>=18.1.0</div>
                </div>
            </BoatCard>
            <BoatCard title="生产环境依赖">
                <div v-for="(value, label) in packageData.dependencies" :key="label">
                    <div label>{{ label }}</div>
                    <div value>{{ value }}</div>
                </div>
            </BoatCard>
            <BoatCard title="开发环境依赖">
                <div v-for="(value, label) in packageData.devDependencies" :key="label">
                    <div label>{{ label }}</div>
                    <div value>{{ value }}</div>
                </div>
            </BoatCard>
        </div>
    </div>
</template>

<script lang="ts" setup>
import packageData from '@/../package.json';
import { usePackageStore } from '@/store';
import type { PackageJson } from '@/types';

const packageStore = usePackageStore();

onMounted(async () => {
    packageStore.setPackage(packageData as PackageJson);
});
</script>

<style lang="scss">
.AboutView {
    .content {
        @include scrollbarStyle;
    }
    .BoatCard {
        .content {
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            p {
                @include fontStyle(2);
                @include fontColor(1);
                grid-area: 1 / 1 / 1 / 4;
            }

            & > div {
                width: 100%;
                @include flexCenter;
                border: pxToRem(1) solid;
                @include themeColor(0.16, border-color);
                div {
                    @include fontStyle(2);
                    @include fontColor(1);
                    padding: pxToRem(16);
                    &[label] {
                        width: 65%;
                        @include themeColor(0.46, background-color);
                    }
                    &[value] {
                        width: 35%;
                    }
                }
            }
        }
    }
}
</style>
