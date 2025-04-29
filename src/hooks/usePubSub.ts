import { onBeforeUnmount } from 'vue';
import PubSub from 'pubsub-js';

/**
 * PubSub 主题定义。主题是一个字符串，表示一个事件的名称。可以用来发布和订阅事件。
 */
export enum Topics {
    UserLoggedIn = 'USER_LOGGED_IN',
    UserLoggedOut = 'USER_LOGGED_OUT',
    ThemeChanged = 'THEME_CHANGED',
    OpenSystemConfigDrawer = 'OPEN_SYSTEM_CONFIG_DRAWER',
}

/**
 * 针对每个 Topics 的数据类型映射
 */
export interface TopicPayloads {
    [Topics.UserLoggedIn]: { userId: string; name: string };
    [Topics.UserLoggedOut]: null;
    [Topics.ThemeChanged]: { mode: 'light' | 'dark' | 'auto' };
    [Topics.OpenSystemConfigDrawer]: null;
}

/**
 * usePubSub
 * @param topic    要订阅的主题
 * @param handler  （可选）订阅回调，收到消息时触发
 * @returns publish 函数，调用它可以发布同主题的消息
 */
export function usePubSub<T extends Topics>(
    topic: T,
    handler?: (payload: TopicPayloads[T]) => void
) {
    let token: string | undefined;

    // 如果提供了 handler，就自动订阅
    if (handler) {
        token = PubSub.subscribe(topic, (_msg, data) => {
            handler(data as TopicPayloads[T]);
        });
        // 组件卸载时自动退订
        onBeforeUnmount(() => {
            if (token) PubSub.unsubscribe(token);
        });
    }

    /**
     * publish
     * @param payload 与主题对应的载荷
     */
    function publish(payload: TopicPayloads[T]) {
        PubSub.publish(topic, payload);
    }

    return { publish };
}
