<template>
    <div>
        <!-- 检查用户是否有访问user-management-page的权限 -->
        <div v-permission="['user-management-page', 'view']">User Management Page Content</div>
        <!-- 检查用户是否有点击delete-button的权限 -->
        <button v-permission="['delete-button', 'click']">Delete</button>
        <!-- 检查用户是否有编辑orders-table的权限 -->
        <button v-permission="['orders-table', 'edit']">Edit Order</button>

        <!-- 用户没有访问设置页面的权限，因此该内容不应显示 -->
        <div v-permission="['settings-page', 'view']">Settings Page Content</div>

        <!-- 用户没有点击admin按钮的权限，因此按钮不应显示 -->
        <button v-permission="['admin-button', 'click']">Admin Button</button>

        <!-- 用户没有删除用户表的权限，因此按钮不应显示 -->
        <button v-permission="['users-table', 'delete']">Delete User</button>
        <button v-permission>Delete User</button>
    </div>
</template>

<script lang="ts" setup>
import { usePermissionStore } from '@/store';
const permissionStore = usePermissionStore();
permissionStore.setUser({
    id: 1,
    name: 'John Doe',
    permissions: [
        { resource: 'user-management-page', action: 'view' },
        { resource: 'delete-button', action: 'click' },
        { resource: 'orders-table', action: 'edit' },
    ],
});
</script>

<style lang="scss"></style>
