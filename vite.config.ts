import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { BoatUIResolver } from '@koihe/boat-ui/dist/resolver';
import fileSystemOperationsPlugin from './src/plugins/fileSystemOperations';
import githubPagesFallbackPlugin from './src/plugins/pagesFallback';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        base: env.VITE_BASE_URL,
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
            // 输出打包体积报告
            visualizer({ open: true }),
            fileSystemOperationsPlugin(),
            githubPagesFallbackPlugin(),
        ],
        build: {
            rollupOptions: {
                output: {
                    // 静态资源拆分
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('element-plus')) return 'el-vendor';
                            if (id.includes('echarts')) return 'echarts-vendor';
                            if (id.includes('lodash-es')) return 'lodash-vendor';
                            if (id.includes('@koihe/boat-ui')) return 'koihe-vendor';
                            return 'vendor'; // 其他合并成 vendor
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
        optimizeDeps: {
            include: ['vue', 'vue-router', 'pinia', 'lodash-es'], // 预打包常用库
        },
        server: {
            open: false,
            hmr: true,
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
              @import '@/styles/_utils/_utils.scss';
             `,
                },
            },
        },
    };
});
