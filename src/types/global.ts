/**
 * 全局类型定义
 */
import type { Mutable } from 'element-plus/es/utils';

/**
 * ref 绑定的元素类型
 */
export type ElementRefType = HTMLElement | null;

/**
 * setTimeout 类型
 */
export type Timeout = ReturnType<typeof setTimeout> | null;

/**
 * setInterval 类型
 */
export type Interval = ReturnType<typeof setInterval> | null;

/**
 * 普通的对象的泛型
 */
export type RecordType = {
    [index: keyof any]: any;
};

/**
 * 允许null的泛型
 */
export type Nullable<T> = T | null;

/**
 * 去除只读状态
 */
export { Mutable };
