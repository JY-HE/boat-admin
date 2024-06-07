/**
 * 自动创建页面目录文件
 */
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';

// 获取项目根目录
const projectRoot = process.cwd();

// 定义一些函数来生成文件内容
const generateIndexVueContent = viewName => `<template>
    <div>
        <h1>${viewName} View</h1>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss"></style>
`;

const generateRouterIndexTsContent = viewName => `const router = {
    path: '/${viewName.toLowerCase()}',
    name: '${viewName}',
    component: () => import(/* webpackChunkName: "${viewName.toLowerCase()}" */ '@/views/${viewName.toLowerCase()}View/Index.vue'),
    meta: {
        isShow: true,
        title: '${viewName}',
        icon: '',
    },
};

export default router;
`;

async function main() {
    // 交互询问
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'viewName',
            message: 'Enter the view name:',
        },
    ]);

    const viewName = answers.viewName;
    const viewDir = path.join(projectRoot, 'src', 'views', `${viewName}View`);

    // 创建 View 文件夹
    await fs.ensureDir(viewDir);

    // 创建 Index.vue 文件
    const indexVuePath = path.join(viewDir, 'Index.vue');
    const indexVueContent = generateIndexVueContent(viewName);
    await fs.writeFile(indexVuePath, indexVueContent, 'utf8');

    // 创建 router 文件夹
    const routerDir = path.join(viewDir, 'router');
    await fs.ensureDir(routerDir);

    // 创建 index.ts 文件
    const routerIndexPath = path.join(routerDir, 'index.ts');
    const routerIndexTsContent = generateRouterIndexTsContent(viewName);
    await fs.writeFile(routerIndexPath, routerIndexTsContent, 'utf8');

    console.log(`${viewName}View folder and necessary files created successfully!`);

    await updateRouterFile(viewName);
    // 打开新建目录的路由文件
    openFileInVSCode(routerIndexPath);
    // 打开路由对象文件
    const routersFilePath = path.join(projectRoot, 'src', 'router', 'routers.ts');
    openFileInVSCode(routersFilePath);
}

/**
 * 更新路由对象文件
 * @param {string} viewName 目录名字
 */
async function updateRouterFile(viewName) {
    const routersFilePath = path.join(projectRoot, 'src', 'router', 'routers.ts');

    try {
        // 读取当前路由对象文件内容
        let content = await fs.readFile(routersFilePath, 'utf8');

        // 构造导入语句和路由对象
        const importStatement = `import ${viewName}View from '@/views/${viewName}View/router';\n`;
        const routerObject = `    ${viewName}View,\n`;

        // 在适当位置插入导入语句
        const lastImportIndex = content.lastIndexOf('import ');
        const nextLineIndex = content.indexOf('\n', lastImportIndex) + 1;
        content = content.slice(0, nextLineIndex) + importStatement + content.slice(nextLineIndex);

        // 在适当位置插入路由对象
        const exportDefaultIndex = content.indexOf('export default [');
        const closingBracketIndex = content.indexOf('];', exportDefaultIndex);
        content =
            content.slice(0, closingBracketIndex) +
            routerObject +
            content.slice(closingBracketIndex);

        // 写回修改后的内容
        await fs.writeFile(routersFilePath, content, 'utf8');

        console.log(`${viewName}View has been added to the router object file.`);
    } catch (error) {
        console.error(`Failed to update the router object file: ${error.message}`);
    }
}

/**
 * 在 VSCode 中打开文件
 * @param {string} filePath 文件路径
 */
function openFileInVSCode(filePath) {
    /**
     *  此代码在创建文件成功后，使用 code 命令打开 VS Code 并指向创建的 index.ts 文件。请确保 VS Code 的命令行工具 code 已经添加到系统的 PATH 环境变量中。如果未添加，可以参考以下步骤进行设置：
     *  1、打开 VS Code。
     *  2、按 Ctrl+Shift+P 调出命令面板。
     *  3、输入并选择 Shell Command: Install 'code' command in PATH 选项。
     *  4、重新启动命令行终端。
     */
    const command = `code "${filePath}"`;

    exec(command, error => {
        if (error) {
            console.error(`Failed to open file in VS Code: ${error.message}`);
        }
    });
}

main().catch(err => console.error(err));
