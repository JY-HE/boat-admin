import { defineStore } from 'pinia';
import { PackageJson } from '@/types';

export const usePackageStore = defineStore({
    id: 'package',
    state: () => {
        return {
            package: {},
        };
    },
    actions: {
        async setPackage(data: PackageJson) {
            this.package = data;
        },
    },
});
