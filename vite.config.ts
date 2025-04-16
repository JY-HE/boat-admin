import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
// import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { BoatUIResolver } from '@koihe/boat-ui/dist/resolver';
import addDirectory from './public/addDirectory';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
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
        // 组件自动引入
        Components({
            resolvers: [ElementPlusResolver(), BoatUIResolver()],
            dts: 'src/components.d.ts',
        }),
        // createHtmlPlugin({
        //     inject: {
        //         data: {
        //             BASE_URL: process.env.VITE_BASE_URL || '/',
        //         },
        //     },
        // }),
        {
            name: 'file-system-operations',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/addDirectory' && req.method === 'POST') {
                        let body = '';
                        req.on('data', chunk => {
                            body += chunk.toString(); // 将 Buffer 对象转换为字符串并拼接到 body 中
                        });
                        req.on('end', async () => {
                            const { level, title, fileName, icon, parentName } = JSON.parse(body);
                            try {
                                const data = await addDirectory(
                                    level,
                                    title,
                                    fileName,
                                    icon,
                                    parentName
                                );
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(data);
                            } catch (error) {
                                res.statusCode = 500;
                                res.end(`Error creating directory: ${error.message}`);
                            }
                        });
                    } else {
                        next();
                    }
                });
            },
        },
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
                target: 'https://api.example.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
          @import '@/styles/main.scss';
         `,
            },
        },
    },
});
