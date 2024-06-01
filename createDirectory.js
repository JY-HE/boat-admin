/**
 * 自动创建页面目录文件
 */
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

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

    console.log(`${viewName}View folder and necessary files created successfully.`);
    console.log('Please import the routing file into the router/routers.ts file.');
}

main().catch(err => console.error(err));
