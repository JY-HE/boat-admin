/**
 * 权限类型定义
 */
export type Permission = {
    /**
     * 系统中需要进行权限控制的对象或实体。如页面、组件等
     */
    resource: string;
    /**
     * 具有的权限，如：查看、新增、修改、删除等
     */
    action: string;
};

/**
 * 用户类型定义
 */
export type User = {
    /**
     * 用户id
     */
    id: number;
    /**
     * 用户名
     */
    name: string;
    /**
     * 用户拥有的权限
     */
    permissions: Permission[];
};
