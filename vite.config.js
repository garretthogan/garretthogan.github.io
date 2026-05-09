import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
};
