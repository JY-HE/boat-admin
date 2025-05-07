import { defineStore } from 'pinia';

export interface ScrollPos {
    x: number;
    y: number;
}

export const useSaveScrollStore = defineStore('saveScroll', {
    state: () => ({
        // key: 路由 fullPath，value: 滚动位置
        positions: {} as Record<string, ScrollPos>,
    }),
    actions: {
        /**
         * 保存页面滚动位置
         * @param path 路由 fullPath
         * @param pos 滚动位置
         * @example
         * useSaveScrollStore().save('/function/saveScroll', { x: 0, y: 100 });
         */
        save(path: string, pos: ScrollPos) {
            this.positions[path] = pos;
        },
        /**
         * 获取页面滚动位置
         * @param path 路由 fullPath
         * @returns 滚动位置。如果没有保存过，返回 { x: 0, y: 0 }
         * @example
         * const pos = useSaveScrollStore().get('/function/saveScroll');
         * console.log(pos); // { x: 0, y: 0 }
         */
        get(path: string): ScrollPos {
            return this.positions[path] || { x: 0, y: 0 };
        },
    },
});
