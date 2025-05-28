import type { Plugin } from 'vite';
import addDirectory from '../utils/addDirectory';

/**
 * 拦截 /addDirectory 请求，构建路由菜单文件
 */
export default function fileSystemOperationsPlugin(): Plugin {
    return {
        name: 'file-system-operations',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/addDirectory' && req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString(); // 将 Buffer 对象转换为字符串并拼接到 body 中
                    });
                    req.on('end', async () => {
                        try {
                            const { level, title, fileName, icon, parentName } = JSON.parse(body);
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
                            // HMR：通知新文件
                            const viewPath = `src/views/${fileName}.vue`;
                            server.watcher.add(viewPath);
                            server.ws.send({ type: 'full-reload' });
                        } catch (err: any) {
                            res.statusCode = 500;
                            res.end(`Error: ${err.message}`);
                        }
                    });
                } else {
                    next();
                }
            });
        },
    };
}
