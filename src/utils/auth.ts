import Cookies from 'js-cookie';
import { useAuthStore } from '@/store';

/**
 * 将 token 保存到 Pinia 中
 * @param token 要保存的 token 字符串
 */
export const setTokenInPinia = (token: string): void => {
    useAuthStore().setToken(token);
};

/**
 * 从 Pinia 中移除 token
 */
export const removeTokenFromPinia = (): void => {
    useAuthStore().removeToken();
};

/**
 * 从 Pinia 中获取当前用户的 token
 * @returns 返回 token 字符串，如果不存在则返回 null
 */
export const getTokenFromPinia = (): string | null => {
    return useAuthStore().getToken;
};

/**
 * 将 token 保存到 localStorage 中
 * @param token 要保存的 token 字符串
 */
export const setTokenInLocalStorage = (token: string): void => {
    localStorage.setItem('token', token);
};

/**
 * 从 localStorage 中移除用户的 token
 */
export const removeTokenFromLocalStorage = (): void => {
    localStorage.removeItem('token');
};

/**
 * 从 localStorage 中获取当前用户的 token
 * @returns 返回 token 字符串，如果不存在则返回 null
 */
export const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
};

/**
 * 将 token 保存到 cookie 中
 * @param token 要保存的 token 字符串
 * @param expires token 的过期天数
 */
export const setTokenInCookie = (token: string, expires: number): void => {
    Cookies.set('token', token, { expires });
};

/**
 * 从 cookie 中移除用户的 token
 */
export const removeTokenFromCookie = (): void => {
    Cookies.remove('token');
};

/**
 * 从 cookie 中获取当前用户的 token
 * @returns 返回 cookie 中的 token 字符串，如果不存在则返回 undefined
 */
export const getTokenFromCookie = (): string | undefined => {
    return Cookies.get('token');
};

/**
 * 刷新 token 逻辑
 * @returns {Promise<string | null>} 返回新的 token
 */
export const refreshToken = async (): Promise<string | null> => {
    try {
        // 模拟请求刷新 token
        const newToken = 'new-sample-token';
        // setTokenInPinia(newToken);
        setTokenInLocalStorage(newToken);
        // setTokenInCookie(newToken, 3);
        return newToken;
    } catch (error) {
        return null;
    }
};
