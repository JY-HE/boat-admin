import { usePermissionStore } from '@/store';

/**
 * 检查当前登录用户是否具有指定资源和操作的权限
 * @param resource 指定资源
 * @param action 操作
 * @returns 是否具有权限
 */
export function hasPermission(resource: string, action: string): boolean {
    const permissionStore = usePermissionStore();
    return permissionStore.user.permissions.some(
        permission => permission.resource === resource && permission.action === action
    );
}
