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
        gptRoguelikeDeckbuilder: path.resolve(
          __dirname,
          'gpts/roguelike-deckbuilder-designer/index.html'
        ),
        playbookRoguelikeDeckbuilderMvp: path.resolve(
          __dirname,
          'playbooks/roguelike-deckbuilder-mvp/index.html'
        ),
        checklistDeckbuilderBalance: path.resolve(
          __dirname,
          'playbooks/deckbuilder-balance-checklist/index.html'
        ),
        playbookCardSystemDesign: path.resolve(
          __dirname,
          'playbooks/card-system-design/index.html'
        ),
        playbookCursorSpecForCardGames: path.resolve(
          __dirname,
          'playbooks/cursor-spec-for-card-games/index.html'
        ),
      },
    },
  },
};
