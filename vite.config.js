import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        founders: path.resolve(__dirname, 'founders/index.html'),
        fractional: path.resolve(__dirname, 'fractional-product-engineer/index.html'),
        mvp: path.resolve(__dirname, 'startup-mvp-engineer/index.html'),
      },
    },
  },
};
