import { defineStore } from 'pinia';
import type { PackageJson } from '@/types';

export const usePackageStore = defineStore({
    id: 'package',
    state: () => {
        return {
            package: {},
            isLoading: false,
            error: null as string | null,
        };
    },
    actions: {
        async loadPackage() {
            if (Object.keys(this.package).length) return;
            this.isLoading = true;
            this.error = null;
            try {
                const response = await fetch('/package.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch package.json: ${response.statusText}`);
                }
                const data: PackageJson = await response.json();
                this.package = data;
            } catch (err) {
                console.error('Error loading package.json:', err);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
