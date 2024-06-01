import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.VITE_BASE_URL || '/',
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue(),
        // 自动引入
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            resolvers: [ElementPlusResolver()],
            // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
            dts: 'src/auto-import.d.ts',
            // 配置开启 eslint
            eslintrc: {
                enabled: false,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),
        // elementUi组件自动引入
        Components({
            resolvers: [ElementPlusResolver()],
            dts: 'src/components.d.ts',
        }),
        createHtmlPlugin({
            inject: {
                data: {
                    BASE_URL: process.env.VITE_BASE_URL || '/',
                },
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                // 静态资源拆分
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                },
            },
        },
        // 开启 minify 和 brotli 压缩
        minify: 'terser',
        chunkSizeWarningLimit: 1000, // 单个模块文件大小限制1000KB
        terserOptions: {
            compress: {
                drop_console: true, // 删除 console 语句
                drop_debugger: true, // 删除 debugger 语句
            },
        },
    },
    define: {
        'process.env': process.env,
    },
    optimizeDeps: {
        include: ['element-plus', 'vue', 'vue-router', 'pinia'], // 预打包 Element Plus 和常用库
    },
    server: {
        open: false,
        host: '127.0.0.1',
        port: 3456,
        hmr: true,
        // 设置 https 代理
        proxy: {
            '/api': {
                target: 'your https address',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
          @import '@/assets/scss/main.scss';
         `,
            },
        },
    },
});
