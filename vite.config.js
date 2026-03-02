import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Serve portfolio/index.html when path is /portfolio or /portfolio/ (dev + preview). */
function portfolioFallback() {
  return {
    name: 'portfolio-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url === '/portfolio' || url === '/portfolio/') {
          const portfolioHtml = path.join(__dirname, 'portfolio', 'index.html');
          if (fs.existsSync(portfolioHtml)) {
            req.url = '/portfolio/index.html';
          }
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url === '/portfolio' || url === '/portfolio/') {
          const portfolioHtml = path.join(__dirname, 'dist', 'portfolio', 'index.html');
          if (fs.existsSync(portfolioHtml)) {
            req.url = '/portfolio/index.html';
          }
        }
        next();
      });
    },
  };
}

export default {
  plugins: [portfolioFallback()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        portfolio: path.resolve(__dirname, 'portfolio/index.html'),
      },
    },
  },
};
