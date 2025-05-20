import { ref, onMounted, onUnmounted, Ref } from 'vue';

/**
 * 检查版本更新的选项
 * @param interval - 检查间隔，单位为毫秒，默认 5 * 60 * 1000
 * @param maxChecks - 最大检查次数，默认 30
 * @param maxErrors - 最大错误次数，默认 3
 */
export interface VersionCheckerOptions {
    interval?: number;
    maxChecks?: number;
    maxErrors?: number;
}

/**
 * 版本检测器的返回值
 * @param hasNewVersion - 是否有新版本
 * @param startPolling - 手动开始检查版本更新函数
 */
export interface VersionChecker {
    hasNewVersion: Ref<boolean>;
    startPolling: () => void;
}

/**
 * 可复用的版本检测器。该钩子会在组件挂载时开始检查版本更新，并在组件卸载时停止检查
 * @param options - 检查版本更新的选项
 * @returns { hasNewVersion, startPolling } - 返回一个响应式的 hasNewVersion 和一个 startPolling 函数
 * @example
 * const { hasNewVersion, startPolling } = useVersionChecker({ interval: 30000 });
 * if (hasNewVersion.value) {
 *   // 有新版本执行相关操作
 * }
 * startPolling(); // 手动开始检查
 */
export function useVersionChecker(options: VersionCheckerOptions = {}): VersionChecker {
    const { interval = 5 * 60 * 1000, maxChecks = 30, maxErrors = 3 } = options;

    const currentVersion = ref<string | null>(null);
    const hasNewVersion = ref(false);
    let checks = 0;
    let errors = 0;
    let timerId: number | null = null;

    // 用于跨标签页通信的新版本广播通道
    const bc = new BroadcastChannel('version-checker');
    bc.onmessage = e => {
        if (e.data === 'NEW_VERSION') {
            hasNewVersion.value = true;
            stopPolling();
        }
    };

    async function fetchVersion(): Promise<string | null> {
        try {
            const res = await fetch('/version.json', { cache: 'no-store' });
            if (!res.ok) {
                // 请求到文件但状态非 2xx
                console.error(`[VersionChecker] 请求 /version.json 失败: status ${res.status}`);
                errors++;
                return null;
            }
            const { version } = await res.json();
            errors = 0; // 请求成功则重置错误计数
            return version;
        } catch (err) {
            // 请求异常或网络错误
            console.error('[VersionChecker] 无法请求 /version.json:', err);
            errors++; // 请求失败，错误次数 +1
            return null;
        }
    }

    // 轮询检测是否有新版本
    async function checkUpdate() {
        if (checks >= maxChecks || errors >= maxErrors) {
            stopPolling(); // 达到最大次数或错误次数，停止轮询
            return;
        }
        checks++;
        const latest = await fetchVersion();
        // 如果存在初始版本，且获取的新版本不同，则认为有新版本
        if (currentVersion.value && latest && latest !== currentVersion.value) {
            bc.postMessage('NEW_VERSION'); // 通知其他标签页
            hasNewVersion.value = true;
            stopPolling();
        }
    }

    // 启动轮询
    function startPolling() {
        if (timerId != null) return; // 防止重复启动
        checks = 0;
        errors = 0;
        timerId = window.setInterval(checkUpdate, interval);
    }

    // 停止轮询
    function stopPolling() {
        if (timerId != null) {
            clearInterval(timerId);
            timerId = null;
        }
    }

    // 根据页面可见性切换轮询状态
    function handleVis() {
        if (document.hidden) stopPolling();
        else startPolling();
    }

    onMounted(async () => {
        if (import.meta.env.PROD) {
            currentVersion.value = await fetchVersion();
            document.addEventListener('visibilitychange', handleVis);
            if (!document.hidden) startPolling();
        }
    });

    onUnmounted(() => {
        stopPolling();
        document.removeEventListener('visibilitychange', handleVis);
        bc.close();
    });

    return { hasNewVersion, startPolling };
}
