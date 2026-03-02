import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** SPA fallback: /portfolio and /portfolio/ serve index.html so client-side router can handle. */
function spaFallback() {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url === '/portfolio' || url === '/portfolio/') req.url = '/';
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url === '/portfolio' || url === '/portfolio/') req.url = '/';
        next();
      });
    },
  };
}

export default {
  plugins: [spaFallback()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
};
