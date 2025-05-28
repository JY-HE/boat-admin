import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

/**
 * GitHub Pages 404 fallback plugin
 */
export default function githubPagesFallbackPlugin(): Plugin {
    return {
        name: 'github-pages-404-fallback',
        closeBundle() {
            const outDir = path.resolve(process.cwd(), 'dist');
            const indexHtml = path.join(outDir, 'index.html');
            const notFoundHtml = path.join(outDir, '404.html');
            if (fs.existsSync(indexHtml)) {
                fs.copyFileSync(indexHtml, notFoundHtml);
            }
        },
    };
}
