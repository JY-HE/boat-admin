import fs from 'fs-extra';
import path from 'path';

// 获取项目根目录
const projectRoot: string = process.cwd();

interface AddResult {
    hasError: boolean;
    msg: string;
    statusCode: number;
}

/**
 * 构建菜单并更新路由
 * @param {number} level 菜单等级
 * @param {string} title 菜单名称
 * @param {string} fileName 菜单文件名称
 * @param {string} icon 图标 （一级菜单需传）
 * @param {string} parentName 父菜单名称（二级菜单需传）
 */
export default async function addDirectory(
    level: number,
    title: string,
    fileName: string,
    icon: string = '',
    parentName: string = ''
): Promise<AddResult> {
    try {
        if (level === 1) {
            // View 文件夹路径
            const fileDirPath: string = path.join(projectRoot, 'src', 'views', `${fileName}View`);
            // 创建 View 文件夹
            await fs.ensureDir(fileDirPath);
            await createIndexVue(fileDirPath, fileName);
            await createRouterFile(fileDirPath, fileName, title, icon);
            await updateRouterFile(title, fileName);
        } else {
            // 在 View 文件夹下创建 components 文件夹
            const componentsDirPath: string = path.join(
                projectRoot,
                'src',
                'views',
                parentName,
                'components'
            );
            await fs.ensureDir(componentsDirPath);
            // 在 components 文件夹下创建文件夹
            const fileDirPath: string = path.join(componentsDirPath, fileName);
            await fs.ensureDir(fileDirPath);
            await createIndexVue(fileDirPath, fileName);
            await updateParentRouterFile(parentName, fileName, title);
        }

        return { hasError: false, msg: '', statusCode: 200 };
    } catch (error: any) {
        return { hasError: true, msg: error.message, statusCode: 500 };
    }
}

/**
 * 创建 Index.vue 文件
 * @param {string} fileDirPath 文件夹目录路径
 * @param {string} fileName 文件名称
 */
async function createIndexVue(fileDirPath: string, fileName: string): Promise<void> {
    const indexVueContent = `<template>
    <div>
        <h1>${fileName}</h1>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss"></style>
`;

    const indexVuePath: string = path.join(fileDirPath, 'Index.vue');
    await fs.writeFile(indexVuePath, indexVueContent, 'utf8');
}

/**
 * 创建 router 文件夹和 index.ts 文件
 * @param {string} fileDirPath 文件夹目录路径
 * @param {string} fileName 文件名称
 * @param {string} title 菜单名称
 * @param {string} icon 图标
 */
async function createRouterFile(
    fileDirPath: string,
    fileName: string,
    title: string,
    icon: string
): Promise<void> {
    const routerDir: string = path.join(fileDirPath, 'router');
    // 创建 router 文件夹
    await fs.ensureDir(routerDir);
    // 创建 index.ts 文件
    const routerIndexPath: string = path.join(routerDir, 'index.ts');
    const routerIndexTsContent: string = `const router = {
    path: '/${fileName}',
    name: '${title}',
    component: () => import(/* webpackChunkName: "${fileName}" */ '@/views/${fileName}View/Index.vue'),
    meta: {
        isShow: true,
        title: '${title}',
        icon: '${icon}',
    },
};

export default router;
`;
    await fs.writeFile(routerIndexPath, routerIndexTsContent, 'utf8');
}

/**
 * 更新路由对象文件
 * @param {string} title 菜单名称
 * @param {string} fileName 目录名字
 */
async function updateRouterFile(title: string, fileName: string): Promise<void> {
    const routersFilePath: string = path.join(projectRoot, 'src', 'router', 'routers.ts');
    try {
        // 读取当前路由对象文件内容
        let content: string = fs.readFileSync(routersFilePath, 'utf8');
        // 构造导入语句和路由对象
        const importStatement: string = `// ${title}\nimport ${fileName}ViewRouter from '@/views/${fileName}View/router';\n`;
        const routerObject: string = `  ${fileName}ViewRouter,\n`;
        // 在适当位置插入导入语句
        const lastImportIndex: number = content.lastIndexOf('import ');
        const nextLineIndex: number = content.indexOf('\n', lastImportIndex) + 1;
        content = content.slice(0, nextLineIndex) + importStatement + content.slice(nextLineIndex);
        // 在适当位置插入路由对象
        const exportDefaultIndex: number = content.indexOf('export default [');
        const closingBracketIndex: number = content.indexOf('];', exportDefaultIndex);
        content =
            content.slice(0, closingBracketIndex) +
            routerObject +
            content.slice(closingBracketIndex);
        // 写回修改后的内容
        await fs.writeFile(routersFilePath, content, 'utf8');
    } catch (error) {
        console.error(`Failed to update the router object file: ${error}`);
    }
}

/**
 * 更新父级 router 文件
 * @param {string} parentName 父级菜单名称
 * @param {string} fileName 子级菜单名称
 * @param {string} title 菜单名称
 */
async function updateParentRouterFile(
    parentName: string,
    fileName: string,
    title: string
): Promise<void> {
    const parentPath: string = path.join(projectRoot, 'src', 'views', parentName, 'router');
    const parentRouterFilePath: string = path.join(parentPath, 'index.ts');
    try {
        // 读取当前路由对象文件内容
        let content: string = fs.readFileSync(parentRouterFilePath, 'utf8');
        // 构造子路由对象
        const childRouterObject: string = `{
            path: '/${parentName.replace('View', '')}/${fileName}',
            name: '${title}',
            component: () => import(/* webpackChunkName: "${fileName}" */ '@/views/${parentName}/components/${fileName}/Index.vue'),
            meta: { 
                title: '${title}' 
              },
        },`;
        // 查找children字段的位置
        const childrenIndex: number = content.indexOf('children: [');
        if (childrenIndex === -1) {
            // 没有children字段，新增children字段并插入子路由
            const exportDefaultIndex: number = content.indexOf('export default {');
            const closingBracketIndex: number = content.indexOf('};', exportDefaultIndex);
            // 添加children数组和重定向字段
            const newContent: string =
                content.slice(0, closingBracketIndex) +
                `  redirect: '/${parentName.replace(
                    'View',
                    ''
                )}/${fileName}',\n  children: [\n  ${childRouterObject}\n],\n` +
                content.slice(closingBracketIndex);
            // 写回修改后的内容
            await fs.writeFile(parentRouterFilePath, newContent, 'utf8');
        } else {
            // 存在children字段，在children数组中插入子路由
            const closingBracketIndex: number = content.indexOf(']', childrenIndex);
            const newContent =
                content.slice(0, closingBracketIndex) +
                `    ${childRouterObject}\n  ` +
                content.slice(closingBracketIndex);

            // 写回修改后的内容
            await fs.writeFile(parentRouterFilePath, newContent, 'utf8');
        }
    } catch (error) {
        console.error(`Failed to update the router object file: ${error}`);
    }
}
