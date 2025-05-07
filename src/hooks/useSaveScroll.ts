import { onMounted, onBeforeUnmount, nextTick, Ref } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { useSaveScrollStore } from '@/store';

type ContainerRefOrSelector = Ref<HTMLElement | null> | string;

/**
 * 自动为指定容器保存 & 恢复滚动位置
 * 仅在路由 meta.saveScroll 为 true 时生效
 * @param containerRefOrClass - 指向滚动容器的 ref 或者容器的类名（不带 "."）
 */
export function useSaveScroll(containerRefOrClass: ContainerRefOrSelector) {
    const route = useRoute();
    const store = useSaveScrollStore();

    // 获取实际容器元素
    const getContainer = (): HTMLElement | null => {
        if (typeof containerRefOrClass === 'string') {
            return document.querySelector(`.${containerRefOrClass}`);
        }
        return containerRefOrClass.value;
    };

    // 组件挂载后恢复滚动
    onMounted(async () => {
        if (!route.meta.saveScroll) return;
        await nextTick();
        const el = getContainer();
        if (!el) return;
        const { x, y } = store.get(route.fullPath);
        el.scrollTo({ left: x, top: y, behavior: 'smooth' });
    });

    // 路由离开前保存滚动
    onBeforeRouteLeave(() => {
        if (!route.meta.saveScroll) return;
        const el = getContainer();
        if (!el) return;
        store.save(route.fullPath, {
            x: el.scrollLeft,
            y: el.scrollTop,
        });
    });

    // 页面销毁时也保存一次（防止非导航卸载）
    onBeforeUnmount(() => {
        if (!route.meta.saveScroll) return;
        const el = getContainer();
        if (!el) return;
        store.save(route.fullPath, {
            x: el.scrollLeft,
            y: el.scrollTop,
        });
    });
}
