// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入图表，图表后缀都为 Chart
import {
    BarChart,
    LineChart,
    PieChart,
    // MapChart,
    // RadarChart,
    // PictorialBarChart,
} from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent,
    DataZoomComponent,
    DatasetComponent, // 数据集组件
    TransformComponent, // 数据转换器组件(filter, sort)
    // PolarComponent,
    // AriaComponent,
    // ParallelComponent,
    // RadarComponent,
    // VisualMapComponent,
    // TimelineComponent,
    // CalendarComponent,
    // GraphicComponent,
} from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 系列类型的定义后缀都为 SeriesOption
import type {
    BarSeriesOption,
    LineSeriesOption,
    PieSeriesOption,
    // MapSeriesOption,
    // RadarSeriesOption,
    // PictorialBarSeriesOption,
} from 'echarts/charts';
// 组件类型的定义后缀都为 ComponentOption
import type {
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    LegendComponentOption,
    ToolboxComponentOption, // 工具栏
    DataZoomComponentOption, // 数据缩放
    DatasetComponentOption,
    // VisualMapComponentOption, // 视觉映射
    // TimelineComponentOption, // 时间轴
    // CalendarComponentOption, // 日历
    // GeoComponentOption, // 地理坐标系
    // GraphicComponentOption, // 图形元素
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | PieSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | LegendComponentOption
    | ToolboxComponentOption
    | DataZoomComponentOption
    // | MapSeriesOption
    // | RadarSeriesOption
    // | PictorialBarSeriesOption
    // | VisualMapComponentOption
    // | TimelineComponentOption
    // | CalendarComponentOption
    // | GeoComponentOption
    // | GraphicComponentOption
>;

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    // PolarComponent,
    // AriaComponent,
    // ParallelComponent,
    LegendComponent,
    // RadarComponent,
    ToolboxComponent,
    DataZoomComponent,
    // VisualMapComponent,
    // TimelineComponent,
    // CalendarComponent,
    // GraphicComponent,
    BarChart,
    LineChart,
    PieChart,
    // MapChart,
    // RadarChart,
    // PictorialBarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
]);

export default echarts;
