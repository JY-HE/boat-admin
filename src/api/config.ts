import { AxiosRequestConfig } from 'axios';

export const GlobalRequestConfig = {
    baseURL: '/api', // 如果使用 proxy 代理，可以设置为相对路径
    timeout: 20000, // 超时时间
    withCredentials: true, // 跨域请求时携带 cookie
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
};

export interface RequestConfig extends AxiosRequestConfig {
    retry?: boolean; // 可扩展的重试机制
}
