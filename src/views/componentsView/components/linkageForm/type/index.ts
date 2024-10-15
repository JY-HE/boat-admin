import type { FormItemRule } from 'element-plus';
import type { InputProps } from 'element-plus/es/components/input';
import type { ISelectProps } from 'element-plus/es/components/select';
import type { SwitchProps } from 'element-plus/es/components/switch';
import type { InputNumberProps } from 'element-plus/es/components/input-number';

export type FromItem = {
    /** 配置项类型 */
    type: 'input' | 'select' | 'switch' | 'inputNumber' | 'colorPick';
    /** 配置项描述 */
    desc: string;
    /** 配置项值 */
    value: string;
    /** 配置项默认值 */
    default: any;
    /** 配置项自定义属性 */
    attrs?: InputProps | ISelectProps | SwitchProps | InputNumberProps | Record<string, any>;
    /** 触发显示配置项前置条件 */
    precondition?: Record<string, any>;
    /** 选择框配置项 options */
    options?: Array<{ label: string; value: string | number | boolean }>;
    /** 配置项校验规则 */
    rules?: FormItemRule[];
};

export type FromItemConfig = {
    [key: string]: FromItem;
};
