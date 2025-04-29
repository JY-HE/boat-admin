import { defineStore } from 'pinia';
import { User } from '@/types';

export const usePermissionStore = defineStore('permission', {
    state: () => {
        return {
            user: {} as User,
        };
    },
    actions: {
        /**
         * 设置当前用户信息
         * @param user 用户对象
         */
        setUser(user: User) {
            this.user = user;
        },
    },
});
