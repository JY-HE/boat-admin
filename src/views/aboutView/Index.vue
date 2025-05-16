<template>
    <div class="AboutView">
        <div class="flex justify-start items-center flex-col gap-4">
            <BoatCard title="关于">
                <p class="text-h2 font-style-4">
                    {{ packageData.description }}
                </p>
            </BoatCard>
            <BoatCard title="信息" contentClassName="flex flex-wrap justify-start gap-x-4">
                <div>
                    <div label>GitHub</div>
                    <div value>
                        <a
                            href="https://github.com/JY-HE/boat-admin"
                            target="_blank"
                            class="underline"
                        >
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
                    <div value>{{ packageData.engines.node }}</div>
                </div>
            </BoatCard>
            <BoatCard title="生产环境依赖" contentClassName="flex flex-wrap justify-start gap-x-4">
                <div v-for="(value, label) in packageData.dependencies" :key="label">
                    <div label>{{ label }}</div>
                    <div value>{{ value }}</div>
                </div>
            </BoatCard>
            <BoatCard title="开发环境依赖" contentClassName="flex flex-wrap justify-start gap-x-4">
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
import { PackageJson } from '@/types';

const packageStore = usePackageStore();

onMounted(async () => {
    packageStore.setPackage(packageData as unknown as PackageJson);
});
</script>

<style lang="scss">
.AboutView {
    .BoatCard {
        .content {
            & > div {
                width: calc((100% - 2rem) / 3);
                @include flexCenter;
                border: pxToRem(1) solid;
                @include themeColor(0.16, border-color);
                div {
                    @include fontStyle(3);
                    @include fontColor(2);
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
