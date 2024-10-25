import { DefineComponent } from 'vue';
import BasicBar from './components/BasicBar.vue';

interface EChartsData {
    title: string;
    enTitle: string;
    componentChart: DefineComponent<object, object, any>;
    darkSrc: string;
    lightSrc: string;
}

export default [
    {
        title: '基础柱状图',
        enTitle: 'Basic Bar Chart',
        componentChart: BasicBar,
        darkSrc: 'https://s21.ax1x.com/2024/10/25/pAwrpS1.png',
        lightSrc: 'https://s21.ax1x.com/2024/10/25/pAwrCy6.png',
    },
] as EChartsData[];
