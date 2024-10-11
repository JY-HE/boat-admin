import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            token: null as string | null,
        };
    },
    actions: {
        /**
         * 保存 token 到 store
         * @param token - 要保存的 token 字符串
         */
        setToken(token: string) {
            this.token = token;
        },

        /**
         * 清除 store 中的 token
         */
        removeToken() {
            this.token = null;
        },
    },
    getters: {
        /**
         * 获取当前存储的 token
         * @returns {string} token 返回 token 或 null
         */
        getToken: state => state.token,
    },
});
