import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { getTokenFromLocalStorage, refreshToken, setTokenInPinia } from '@/utils/auth';
import { GlobalRequestConfig } from './config';

class HttpService {
    private service: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        // 初始化 Axios 实例
        this.service = axios.create(config);

        // 添加请求拦截器
        this.service.interceptors.request.use(
            async config => {
                const token = getTokenFromLocalStorage();
                if (token && !config.headers?.Authorization) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => Promise.reject(error)
        );

        // 添加响应拦截器
        this.service.interceptors.response.use(
            async (response: AxiosResponse) => {
                // 请求成功直接返回
                return response.data;
            },
            async (error: AxiosError) => {
                const { response, config } = error;
                // 判断是否有原始请求的 config
                if (!config) {
                    return Promise.reject(error); // 如果没有原请求配置，直接拒绝
                }
                if (response) {
                    // 处理特定状态码，如 401、403 等
                    if (response.status === 401) {
                        try {
                            const newToken = await refreshToken(); // 刷新 token
                            if (newToken) {
                                setTokenInPinia(newToken); // 更新 Pinia 中的 token
                                return this.retryRequest(config, newToken); // 重试原请求
                            }
                        } catch (refreshError) {
                            // 刷新 Token 失败，跳转到登录页面或处理其他逻辑
                            return Promise.reject(refreshError);
                        }
                    }
                    this.handleError(response.status); // 全局错误处理
                }
                return Promise.reject(error);
            }
        );
    }

    /**
     * 重新发送原始请求
     * @param config 原请求的配置
     * @param newToken 刷新后的新 Token
     * @returns {Promise<AxiosResponse>}
     */
    private retryRequest(config: AxiosRequestConfig, token: string): Promise<AxiosResponse> {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        return this.service(config);
    }

    // 全局错误处理
    private handleError(status: number): void {
        switch (status) {
            case 401:
                ElMessage.error('认证失败，请重新登录');
                break;
            case 403:
                ElMessage.error('没有权限访问该资源');
                break;
            case 404:
                ElMessage.error('请求的资源不存在');
                break;
            default:
                ElMessage.error('请求失败');
        }
    }

    /**
     * GET 请求
     * @template T 响应数据的类型
     * @param url 请求的 URL
     * @param params 请求参数
     * @param config 自定义 Axios 配置项
     * @returns 返回包含响应数据的 Promise
     */
    public get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
        return this.service.get(url, { params, ...config });
    }

    /**
     * POST 请求
     * @template T 响应数据的类型
     * @param url 请求的 URL
     * @param data 请求体中的数据
     * @param config 自定义 Axios 配置项
     * @returns 返回包含响应数据的 Promise
     */
    public post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return this.service.post(url, data, config);
    }

    /**
     * PUT 请求
     * @template T 响应数据的类型
     * @param url 请求的 URL
     * @param data 请求体中的数据
     * @param config 自定义 Axios 配置项
     * @returns 返回包含响应数据的 Promise
     */
    public put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return this.service.put(url, data, config);
    }

    /**
     * DELETE 请求
     * @template T 响应数据的类型
     * @param url 请求的 URL
     * @param config 自定义 Axios 配置项
     * @returns 返回包含响应数据的 Promise
     */
    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.service.delete(url, config);
    }
}

// 导出实例
export default new HttpService(GlobalRequestConfig);
