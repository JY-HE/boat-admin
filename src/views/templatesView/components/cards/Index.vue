<template>
    <div class="Cards">
        <div class="modules">
            <BoatTitle class="flex-1" title="统计卡片（数字滚动）" />
            <div class="w-full flex gap-6">
                <DigitalScrolling
                    class="flex-1"
                    v-for="(item, index) in digitalScrollingData"
                    :key="index"
                    :subContent="item.subContent"
                    :startValue="item.startValue"
                    :endValue="item.endValue"
                    :iconBackgroundColor="item.iconBackgroundColor"
                    :icon="item.icon"
                />
            </div>
        </div>
        <div class="modules">
            <BoatTitle class="flex-1" title="进度卡片" />
            <div class="w-full flex gap-6">
                <ProgressCard
                    class="flex-1"
                    v-for="(item, index) in progressCardData"
                    :key="index"
                    :subContent="item.subContent"
                    :value="item.value"
                    :iconBackgroundColor="item.iconBackgroundColor"
                    :icon="item.icon"
                    :progressColor="item.progressColor"
                />
            </div>
        </div>
        <div class="modules">
            <BoatTitle class="flex-1" title="图片卡片" />
            <div class="w-full flex gap-6">
                <ImageCard
                    class="flex-1"
                    v-for="(item, index) in imageCardData"
                    :key="index"
                    :image="item.image"
                    :tag="item.tag"
                    :title="item.title"
                    :views="item.views"
                    :reviews="item.reviews"
                    :date="item.date"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import DigitalScrolling from './DigitalScrolling.vue';
import ProgressCard from './ProgressCard.vue';
import ImageCard from './ImageCard.vue';

const digitalScrollingData = [
    {
        subContent: '销售产品',
        startValue: 0,
        endValue: 2000,
        iconBackgroundColor: '#67c23a',
        icon: '&#xeb95;',
    },
    {
        subContent: '用户增长',
        startValue: 1000,
        endValue: 5000,
        iconBackgroundColor: '#f56c6c',
        icon: '&#xeb95;',
    },
    {
        subContent: '订单金额',
        startValue: 5000,
        endValue: 15000,
        iconBackgroundColor: '#409eff',
        icon: '&#xeb95;',
    },
    {
        subContent: '访问量',
        startValue: 2000,
        endValue: 10000,
        iconBackgroundColor: '#f7ba1e',
        icon: '&#xeb95;',
    },
];

const progressCardData = [
    {
        subContent: '完成进度',
        value: 80,
        iconBackgroundColor: '#67c23a',
        icon: '&#xeb95;',
        progressColor: '#f56c6c',
    },
    {
        subContent: '项目进度',
        value: 40,
        iconBackgroundColor: '#f56c6c',
        icon: '&#xeb95;',
        progressColor: '#67c23a',
    },
    {
        subContent: '学习进度',
        value: 80,
        iconBackgroundColor: '#409eff',
        icon: '&#xeb95;',
        progressColor: '#f7ba1e',
    },
    {
        subContent: '任务进度',
        value: 60,
        iconBackgroundColor: '#f7ba1e',
        icon: '&#xeb95;',
        progressColor: '#409eff',
    },
];

const imageCardData = [
    {
        image: 'https://picsum.photos/400/240?1',
        tag: '热门',
        title: 'AI技术在医疗领域的创新应用与发展前景',
        views: 551245,
        reviews: 555,
        date: '1月19日 周一',
    },
    {
        image: 'https://picsum.photos/400/240?2',
        tag: '科技',
        title: 'AI技术在医疗领域的创新应用与发展前景',
        views: 12478,
        reviews: 1462,
        date: '5月9日 周二',
    },
    {
        image: 'https://picsum.photos/400/240?3',
        tag: '技术',
        title: 'AI技术在医疗领域的创新应用与发展前景',
        views: 12155,
        reviews: 7869,
        date: '11月29日 周一',
    },
    {
        image: 'https://picsum.photos/400/240?4',
        tag: '云计算',
        title: 'AI技术在医疗领域的创新应用与发展前景',
        views: 45746,
        reviews: 55125,
        date: '5月18日 周三',
    },
];
</script>

<style lang="scss">
.Cards {
    @include flexCenter(flex-start, flex-start, true);
    gap: pxToRem(48);
    padding: pxToRem(16);
    .modules {
        width: 100%;
        @include flexCenter(flex-start, flex-start, true);
        gap: pxToRem(16);
    }
}
</style>
