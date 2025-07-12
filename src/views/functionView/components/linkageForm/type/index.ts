import type { FormItemRule } from 'element-plus';
import type { InputProps } from 'element-plus/es/components/input';
import type { ISelectProps } from 'element-plus/es/components/select';
import type { SwitchProps } from 'element-plus/es/components/switch';
import type { InputNumberProps } from 'element-plus/es/components/input-number';

/**
 * 基础表单项接口，T 为表单项类型标识，V 为 value 的类型
 */
export interface BaseItem<T extends string, V> {
    /** 配置项类型 */
    type: T;
    /** 配置项描述 */
    desc: string;
    /** 配置项值 */
    value: V;
    /** 配置项默认值 */
    default: V;
    /** 触发显示配置项前置条件 */
    precondition?: Record<string, any>;
    /** 配置项校验规则 */
    rules?: FormItemRule[];
}

/** 文本输入框 */
export interface InputItem extends BaseItem<'input', string> {
    /** 配置项自定义属性 */
    attrs?: Partial<InputProps> & Record<string, any>;
}

/** 下拉选择框 */
export interface SelectItem extends BaseItem<'select', string | number | boolean> {
    attrs?: Partial<ISelectProps> & Record<string, any>;
    options: Array<{ label: string; value: string | number | boolean }>;
}

/** 开关 */
export interface SwitchItem extends BaseItem<'switch', boolean> {
    attrs?: Partial<SwitchProps> & Record<string, any>;
}

/** 数字输入框 */
export interface InputNumberItem extends BaseItem<'inputNumber', number> {
    attrs?: Partial<InputNumberProps> & Record<string, any>;
}

/** 颜色选择器 (自定义组件) */
export interface ColorPickItem extends BaseItem<'colorPick', string> {
    attrs?: Record<string, any>;
}

/** 联动表单的所有表单项类型 */
export type FromItem = InputItem | SelectItem | SwitchItem | InputNumberItem | ColorPickItem;

/** 联动表单配置对象 */
export type FromItemConfig = Record<string, FromItem>;
