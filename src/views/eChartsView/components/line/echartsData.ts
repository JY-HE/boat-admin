import { DefineComponent } from 'vue';
import BasicLine from './components/BasicLine.vue';

interface EChartsData {
    title: string;
    enTitle: string;
    componentChart: DefineComponent<object, object, any>;
    darkSrc: string;
    lightSrc: string;
}

export default [
    {
        title: '基础折线图',
        enTitle: 'Basic Line Chart',
        componentChart: BasicLine,
        darkSrc: 'https://s21.ax1x.com/2024/10/21/pAaofm9.png',
        lightSrc: 'https://s21.ax1x.com/2024/10/21/pAao4T1.png',
    },
] as EChartsData[];
