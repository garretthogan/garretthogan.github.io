import { gptUrl } from './gpt-content.js';

const cardSchema = `{
  id: "quick_strike",
  name: "Quick Strike",
  type: "attack",
  cost: 1,
  rarity: "common",
  tags: ["attack", "quick", "tempo"],
  text: "Deal 6 damage. If this is your first card this turn, draw 1.",
  effect: {
    kind: "damage",
    amount: 6
  },
  bonus: {
    condition: {
      kind: "isFirstCardThisTurn"
    },
    effect: {
      kind: "draw",
      amount: 1
    }
  },
  designRole: "Tempo starter",
  archetype: "tempo"
}`;

const enemySchema = `{
  id: "mirror_knight",
  name: "Mirror Knight",
  maxHp: 42,
  intentPattern: [
    {
      kind: "attack",
      amount: 6,
      text: "Attacks for 6."
    },
    {
      kind: "gainBlock",
      amount: 8,
      text: "Gains 8 block."
    },
    {
      kind: "attack",
      amount: 12,
      text: "Heavy attack for 12."
    }
  ],
  pressurePattern: "Punishes slow decks with repeated heavy attacks.",
  rewardPoolTags: ["tempo", "block", "scaling"]
}`;

const runStateSchema = `const runState = {
  status: "combat",
  encounterIndex: 0,
  player: {
    hp: 50,
    maxHp: 50,
    block: 0,
    energy: 3,
    statuses: []
  },
  enemy: {
    id: "mirror_knight",
    hp: 42,
    maxHp: 42,
    block: 0,
    intentIndex: 0,
    statuses: []
  },
  deck: [],
  drawPile: [],
  hand: [],
  discardPile: [],
  exhaustPile: [],
  playedThisTurn: [],
  rewardsOffered: [],
  combatLog: []
};`;

const fullCursorPrompt = `You are working in an existing Vite + React project.

Build a browser-based roguelike deckbuilder MVP.

The goal is to create a small playable prototype that proves the core card loop:
draw cards, spend energy, play cards, read enemy intent, resolve enemy action, win encounters, choose card rewards, and progress through a short run.

Technical constraints:
- Use Vite and React.
- Use plain JavaScript.
- Do not use TypeScript.
- Do not add unnecessary dependencies.
- Use local JSON or JS data files for cards, enemies, rewards, and encounters.
- Use Zustand or a simple reducer for run state.
- Use localStorage only if persistence is needed.
- Keep the rules engine pure and separate from UI components.
- Keep styling simple and consistent with the existing project.

Do not build:
- No accounts.
- No backend.
- No multiplayer.
- No procedural map.
- No shop.
- No meta progression.
- No large animation system.
- No complex deck editor.
- No TypeScript.

MVP run structure:
- Start run.
- Fight 3 normal encounters.
- Fight 1 boss.
- After each normal encounter, choose 1 of 3 card rewards.
- After the boss, show victory or defeat.

Turn structure:
1. At the start of each player turn, gain 3 energy.
2. Draw until the player has 5 cards in hand.
3. Show enemy intent before the player acts.
4. Player may play cards while they have enough energy.
5. Played cards go to discard unless marked exhaust.
6. Player clicks End Turn.
7. Enemy intent resolves.
8. Remaining block clears at the start of the next player turn.
9. Remaining hand is discarded.
10. Enemy intent advances.
11. Start the next turn.

Initial card pool:
Create 24 player cards:
- 8 attack cards
- 6 defense cards
- 5 draw or resource cards
- 5 archetype payoff cards

Use 3 archetypes:
- Tempo
- Block
- Scaling

Each card should include:
- id
- name
- type
- cost
- rarity
- tags
- rules text
- effect data
- design role
- archetype

Initial enemies:
- 3 normal enemies
- 1 elite enemy
- 1 boss

Each enemy should include:
- id
- name
- maxHp
- intentPattern
- pressurePattern
- rewardPoolTags

Required folders:
src/data/cards.js
src/data/enemies.js
src/data/encounters.js
src/game/createRun.js
src/game/drawCards.js
src/game/playCard.js
src/game/resolveTurn.js
src/game/resolveEnemyIntent.js
src/game/applyReward.js
src/game/shuffle.js
src/game/cardEffects.js
src/state/runStore.js
src/components/Card.jsx
src/components/Hand.jsx
src/components/EnemyPanel.jsx
src/components/PlayerPanel.jsx
src/components/IntentBadge.jsx
src/components/RewardChoice.jsx
src/components/DeckViewer.jsx
src/components/CombatLog.jsx
src/pages/StartRunPage.jsx
src/pages/EncounterPage.jsx
src/pages/RewardPage.jsx
src/pages/RunResultPage.jsx

UI requirements:
Start Run screen:
- Show game title.
- Show short explanation.
- Start Run button.

Combat screen:
- Show player HP, block, energy.
- Show draw pile and discard pile counts.
- Show enemy HP, block, and intent.
- Show player hand.
- Cards should be clickable if affordable.
- Disabled cards should look disabled.
- Show End Turn button.
- Show combat log.

Reward screen:
- Show 3 card reward choices.
- Show Skip Reward option.
- Show current deck preview.
- Continue button advances to next encounter.

Deck Viewer:
- Show all cards in current deck.
- Show card counts, costs, tags, and rarities.

Run Result screen:
- Show victory or defeat.
- Show encounters completed.
- Show final deck.
- Restart button.

Rules engine requirements:
- Card effects should be resolved through a small effect resolver.
- Support damage, block, draw, gainEnergy, applyStatus, and exhaust.
- Do not hardcode individual card IDs unless absolutely necessary.
- Keep game logic out of UI components.
- Use helper functions for moving cards between hand, draw pile, discard pile, and exhaust pile.
- Make state transitions explicit.

Acceptance criteria:
- The app runs without errors.
- The player can start a run.
- The player draws cards.
- The player can play cards by spending energy.
- Damage, block, draw, and status effects resolve.
- Enemy intent is visible.
- Enemy actions resolve after End Turn.
- The player can win and lose encounters.
- Rewards appear after a win.
- Selecting a reward adds the card to the deck.
- The run advances through encounters.
- A boss appears at the end.
- Victory or defeat screen appears.
- No TypeScript is added.
- Existing project routes and styling are not broken.

Build this in phases. After each phase, keep the app runnable.`;

const footballCursorPrompt = `You are working in an existing Vite + React project.

Build a browser-based football card battler MVP.

The goal is to create a red-zone card game prototype where each possession starts near the end zone. The player has four downs to score by choosing a Play Call card, stacking Athlete and Scheme cards, spending Momentum, and resolving against defensive pressure.

The MVP should prove whether combining football cards under pressure is fun.

Technical constraints:
- Use Vite and React.
- Use plain JavaScript.
- Do not use TypeScript.
- Do not add unnecessary dependencies.
- Use local JS or JSON files for card, defense, and encounter data.
- Keep the rules engine separate from UI.
- Use localStorage only for simple MVP persistence.

Do not build:
- No full season simulation.
- No recruiting.
- No draft classes.
- No facility trees.
- No staff management.
- No online PvP.
- No accounts.
- No backend.
- No TypeScript.

Core loop:
1. Start game.
2. Begin possession at the defense's 20-yard line.
3. Draw 5 cards.
4. Player has 3 play points.
5. Player must choose one Play Call card.
6. Player may stack Athlete, Scheme, or Momentum cards.
7. Resolve against defensive pressure.
8. Result can be yards gained, touchdown, turnover, field goal choice, or failed down.
9. Advance down.
10. Possession ends after touchdown, turnover, field goal, or failed fourth down.
11. After each game, choose 1 of 3 card rewards.
12. Complete 3 games and 1 championship boss.

Card types:
- Play Call
- Athlete
- Scheme
- Momentum
- Injury

Initial archetypes:
- Air Raid
- Ground Game
- Defensive Pressure

Initial card pool:
- 8 Play Call cards
- 12 Athlete cards
- 8 Scheme cards
- 6 Momentum cards
- 4 Injury cards

Each card should include:
- id
- name
- type
- cost
- rarity
- tags
- rules text
- effect data
- design role
- archetype

Required UI:
- Start Game screen
- Red Zone possession screen
- Reward screen
- Deck viewer
- Game result screen

Possession screen should show:
- Current down
- Distance to goal
- Score or drive result
- Play points
- Hand
- Selected Play Call
- Stacked modifiers
- Defensive pressure
- Resolve Play button
- Drive log

Resolution should account for:
- Base play value
- Card modifiers
- Matching tags
- Defensive counters
- Turnover risk
- Clutch or Momentum effects

Acceptance criteria:
- Player can start a game.
- Player can draw a hand.
- Player can select a Play Call.
- Player can stack modifier cards.
- Player can resolve a down.
- Downs advance correctly.
- Touchdowns, turnovers, field goals, and failed drives can occur.
- Rewards appear after each game.
- Selected rewards enter the deck.
- Championship boss appears at the end.
- Victory or defeat result appears.
- No TypeScript is added.`;

export const cursorSpecForCardGamesPlaybook = {
  hero: {
    eyebrow: 'Ragtag Throne · Playbook',
    headline: 'Cursor Spec for Card Game MVPs',
    subhead:
      'A good Cursor prompt does not just describe the game you want. It defines the smallest playable version, the data model, the rules engine, the UI states, the file structure, and the acceptance criteria clearly enough that an AI coding agent can build in phases without inventing half the product.',
    support:
      'This playbook shows how to write a practical Cursor spec for a card game MVP. The goal is not to build the whole dream game. The goal is to build a small browser-playable prototype that proves whether the core card loop is fun.',
    primaryCta: {
      label: 'Open Roguelike Deckbuilder Designer GPT',
      href: gptUrl,
    },
    secondaryCta: {
      label: 'Read the MVP Playbook',
      href: '/playbooks/roguelike-deckbuilder-mvp/',
    },
  },

  promise:
    'A good Cursor spec defines the smallest playable version, the data model, the rules engine, the UI states, the file structure, and the acceptance criteria clearly enough that an AI coding agent can build in phases without inventing half the product.',

  sections: [
    {
      number: 1,
      title: 'Start with the smallest playable version',
      paragraphs: ['Do not ask Cursor to build the full game first.'],
      blocks: [
        {
          type: 'labeled',
          label: 'Bad prompt',
          lines: [
            'Build a roguelike deckbuilder with 200 cards, procedural encounters, bosses, player classes, unlocks, shops, relics, animations, online accounts, and multiplayer.',
          ],
        },
        {
          type: 'labeled',
          label: 'Better prompt',
          lines: [
            'Build a browser-based card game MVP where the player draws 5 cards, spends 3 energy, plays cards against one enemy, resolves enemy intent, chooses 1 of 3 rewards, and repeats through 3 encounters and 1 boss.',
          ],
        },
        {
          type: 'labeled',
          label: 'The MVP should test one core question',
          lines: ['Is the turn loop fun enough to play again?'],
        },
      ],
      rule: null,
      closingParagraphs: ['Everything else is secondary.'],
    },
    {
      number: 2,
      title: 'Define the game in one paragraph',
      paragraphs: ['Start the Cursor spec with a short product description.'],
      blocks: [
        {
          type: 'labeled',
          label: 'Example',
          lines: [
            'Build a browser-based roguelike deckbuilder MVP. The player starts a run, fights through a short sequence of card battles, improves their deck after each encounter, and tries to defeat a boss. The MVP should focus on a clean card loop, readable enemy intent, simple rewards, and fast playtesting. Do not build accounts, multiplayer, procedural map generation, or complex meta progression yet.',
          ],
        },
        {
          type: 'labeled',
          label: 'For a sports card battler',
          lines: [
            'Build a browser-based football card battler MVP. Each possession starts in the red zone. The player has four downs to score by choosing a play call, stacking athlete and scheme cards, and resolving against defensive pressure. After each drive, the player chooses a reward that changes their deck. The MVP should prove whether combining football cards under pressure is fun.',
          ],
        },
      ],
      rule: null,
      closingParagraphs: [
        'A good first paragraph tells Cursor what to build and what not to build.',
      ],
    },
    {
      number: 3,
      title: 'Be explicit about the stack',
      paragraphs: [
        'Cursor will often overcomplicate the stack unless you constrain it.',
        'Example stack section:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Technical constraints:',
            '- Use Vite.',
            '- Use React.',
            '- Use plain JavaScript.',
            '- Do not use TypeScript.',
            '- Do not add unnecessary dependencies.',
            '- Use local JSON files for cards, enemies, rewards, and encounters.',
            '- Use Zustand or a simple reducer for game state.',
            '- Use localStorage for MVP persistence.',
            '- Keep the rules engine pure and testable.',
            '- Keep styling simple and consistent with the existing design system.',
          ],
        },
        {
          type: 'labeled',
          label: 'For a first card game MVP, avoid',
          lines: [
            'Backend',
            'Authentication',
            'Realtime multiplayer',
            'CMS',
            'Complex animation libraries',
            'Database persistence',
            'Procedural content pipelines',
          ],
        },
      ],
      rule: null,
      closingParagraphs: ['Use those later only when the core loop works.'],
    },
    {
      number: 4,
      title: 'Separate data, rules, state, and UI',
      paragraphs: [
        'This is the most important architecture instruction.',
        'A card game becomes hard to maintain when card logic is scattered across UI components.',
      ],
      blocks: [
        {
          type: 'labeled',
          label: 'Bad structure',
          lines: [
            'Card.jsx contains damage math.',
            'Enemy.jsx mutates player state.',
            'RewardScreen.jsx decides card effects.',
            'GamePage.jsx contains all turn rules.',
          ],
        },
        {
          type: 'labeled',
          label: 'Better structure',
          lines: [
            'data defines content.',
            'game engine resolves rules.',
            'state store holds current run state.',
            'UI renders state and dispatches actions.',
          ],
        },
        {
          type: 'labeled',
          label: 'Suggested folders',
          lines: [
            'src/',
            '  data/',
            '    cards.js',
            '    enemies.js',
            '    rewards.js',
            '    encounters.js',
            '',
            '  game/',
            '    createRun.js',
            '    drawCards.js',
            '    playCard.js',
            '    resolveTurn.js',
            '    resolveEnemyIntent.js',
            '    applyReward.js',
            '    shuffle.js',
            '    cardEffects.js',
            '',
            '  state/',
            '    runStore.js',
            '',
            '  components/',
            '    Card.jsx',
            '    Hand.jsx',
            '    EnemyPanel.jsx',
            '    PlayerPanel.jsx',
            '    IntentBadge.jsx',
            '    RewardChoice.jsx',
            '    DeckViewer.jsx',
            '    CombatLog.jsx',
            '',
            '  pages/',
            '    StartRunPage.jsx',
            '    EncounterPage.jsx',
            '    RewardPage.jsx',
            '    RunResultPage.jsx',
          ],
        },
      ],
      rule: 'No gameplay math should live inside presentation components.',
      ruleLabel: 'Rule',
    },
    {
      number: 5,
      title: 'Use data-driven cards',
      paragraphs: ['Tell Cursor to define cards as data, not one-off components.'],
      blocks: [
        { type: 'json', label: 'Example card schema', code: cardSchema },
        {
          type: 'labeled',
          label: 'Start with a small set of effect kinds',
          lines: [
            'damage',
            'block',
            'draw',
            'gainEnergy',
            'applyStatus',
            'modifyNextCard',
            'addTemporaryCard',
            'heal',
          ],
        },
        {
          type: 'labeled',
          label: 'Better instruction',
          lines: [
            'Implement a small effect resolver that supports the initial card pool. Keep effect handling explicit, readable, and easy to extend. Do not hardcode individual card IDs unless absolutely necessary.',
          ],
        },
      ],
    },
    {
      number: 6,
      title: 'Define enemy intent clearly',
      paragraphs: [
        'Enemy intent is one of the best ways to make a card game readable.',
      ],
      blocks: [
        { type: 'json', label: 'Example enemy schema', code: enemySchema },
        {
          type: 'labeled',
          label: 'Cursor instruction',
          lines: [
            'Show the enemy’s next intent before the player acts. The player should always understand the immediate threat.',
          ],
        },
      ],
      rule: null,
      closingParagraphs: [
        'Avoid hidden enemy behavior in the MVP unless the game is specifically about hidden information.',
      ],
    },
    {
      number: 7,
      title: 'Define the run structure',
      paragraphs: ['Keep the first run short.'],
      blocks: [
        {
          type: 'labeled',
          label: 'Example',
          lines: [
            'MVP run structure:',
            '- Start run.',
            '- Fight 3 normal encounters.',
            '- Fight 1 elite encounter.',
            '- Fight 1 boss.',
            '- After each non-boss encounter, choose 1 of 3 card rewards.',
            '- After the boss, show win/loss result.',
          ],
        },
        {
          type: 'labeled',
          label: 'Even smaller',
          lines: [
            'MVP run structure:',
            '- Fight 2 normal encounters.',
            '- Fight 1 boss.',
            '- Choose a card reward after each win.',
          ],
        },
        {
          type: 'labeled',
          label: 'For a red-zone football card battler',
          lines: [
            'MVP run structure:',
            '- Game 1: basic defense.',
            '- Game 2: pressure defense.',
            '- Game 3: rivalry defense.',
            '- Championship boss: adaptive defense.',
            '- After each game, choose 1 of 3 deck rewards.',
          ],
        },
      ],
      rule: null,
      closingParagraphs: ['Do not build a map until the basic loop is fun.'],
    },
    {
      number: 8,
      title: 'Define the turn structure',
      paragraphs: ['Cursor needs exact gameplay flow.'],
      blocks: [
        {
          type: 'labeled',
          label: 'Example combat turn',
          lines: [
            'Turn structure:',
            '1. At turn start, player gains 3 energy.',
            '2. Draw until hand has 5 cards.',
            '3. Enemy intent is visible.',
            '4. Player may play cards while they have enough energy.',
            '5. Played cards go to discard unless they exhaust.',
            '6. Player clicks End Turn.',
            '7. Enemy intent resolves.',
            '8. Block resets at the start of the next player turn.',
            '9. Discard remaining hand.',
            '10. Advance enemy intent index.',
            '11. Start next turn.',
          ],
        },
        {
          type: 'labeled',
          label: 'For football',
          lines: [
            'Down structure:',
            '1. Player draws 5 cards.',
            '2. Player has 3 play points.',
            '3. Player must choose one Play Call card.',
            '4. Player may stack Athlete, Scheme, or Momentum cards.',
            '5. Defense reveals or resolves pressure.',
            '6. Compare total power, tags, counters, and risk.',
            '7. Resolve yards, touchdown, field goal choice, turnover, or failed down.',
            '8. Discard hand and advance down.',
            '9. Possession ends after touchdown, turnover, field goal, or fourth-down failure.',
          ],
        },
      ],
      rule: null,
      closingParagraphs: ['If you do not define this, Cursor will make assumptions.'],
    },
    {
      number: 9,
      title: 'Define state shape',
      paragraphs: ['Give Cursor a simple state model.'],
      blocks: [
        { type: 'json', label: 'Example', code: runStateSchema },
        {
          type: 'labeled',
          label: 'Useful state enums',
          lines: ['start', 'combat', 'reward', 'deckView', 'victory', 'defeat'],
        },
        {
          type: 'labeled',
          label: 'Cursor instruction',
          lines: [
            'Keep state transitions explicit. Avoid deeply nested mutation where possible. Add helper functions for moving cards between deck, hand, discard, draw pile, and exhaust pile.',
          ],
        },
      ],
    },
    {
      number: 10,
      title: 'Define the first content set',
      paragraphs: ['Do not ask Cursor to invent endless content.', 'Give it a target.'],
      blocks: [
        {
          type: 'labeled',
          label: 'Example',
          lines: [
            'Initial content:',
            '- 24 player cards.',
            '- 5 enemies.',
            '- 1 boss.',
            '- 12 rewards.',
            '- 3 archetypes: tempo, block, scaling.',
          ],
        },
        {
          type: 'labeled',
          label: 'Better',
          lines: [
            'Create a small initial card pool:',
            '- 8 attack cards',
            '- 6 defense cards',
            '- 5 draw/resource cards',
            '- 5 archetype payoff cards',
          ],
        },
        {
          type: 'labeled',
          label: 'For each card, require',
          lines: [
            'id',
            'name',
            'type',
            'cost',
            'rarity',
            'tags',
            'rules text',
            'effect data',
            'design role',
            'archetype',
          ],
        },
      ],
      rule: null,
      closingParagraphs: ['This keeps the content structured.'],
    },
    {
      number: 11,
      title: 'Define UI requirements',
      paragraphs: ['Cursor needs to know what screens to build.', 'MVP screens:'],
      blocks: [
        {
          type: 'lines',
          lines: ['Start Run', 'Combat', 'Reward', 'Deck Viewer', 'Run Result'],
        },
        {
          type: 'labeled',
          label: 'Combat screen should show',
          lines: [
            'Player HP',
            'Player block',
            'Energy',
            'Draw pile count',
            'Discard pile count',
            'Enemy HP',
            'Enemy block',
            'Enemy intent',
            'Hand',
            'End Turn button',
            'Combat log',
          ],
        },
        {
          type: 'labeled',
          label: 'Reward screen should show',
          lines: [
            'Three card choices',
            'Skip reward option',
            'Current deck preview',
            'Continue button',
          ],
        },
        {
          type: 'labeled',
          label: 'Deck viewer should show',
          lines: ['All cards in deck', 'Card counts', 'Tags', 'Costs', 'Rarities'],
        },
        {
          type: 'labeled',
          label: 'Run result screen should show',
          lines: [
            'Win or loss',
            'Encounters completed',
            'Final deck',
            'Restart button',
          ],
        },
      ],
      rule: null,
      closingParagraphs: ['Keep the UI functional before making it flashy.'],
    },
    {
      number: 12,
      title: 'Define what not to build',
      paragraphs: ['This prevents scope creep.', 'Add a section like:'],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Do not build in this phase:',
            '- No login or accounts.',
            '- No backend.',
            '- No multiplayer.',
            '- No procedural map.',
            '- No large animation system.',
            '- No deck editor outside rewards.',
            '- No shop.',
            '- No meta progression.',
            '- No daily runs.',
            '- No save cloud.',
            '- No TypeScript.',
          ],
        },
      ],
      rule: null,
      closingParagraphs: [
        'This section is more important than it looks.',
        'Cursor will otherwise “helpfully” add things you did not ask for.',
      ],
    },
    {
      number: 13,
      title: 'Build in phases',
      paragraphs: ['A good Cursor spec should be phased.'],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Phase 1: Static shell and routing',
            '- Add Start Run, Combat, Reward, Deck Viewer, and Result screens.',
            '- Add placeholder data.',
            '- Confirm navigation works.',
            '',
            'Phase 2: Card data and deck zones',
            '- Add card data.',
            '- Implement shuffle, draw, discard, exhaust.',
            '- Render hand from state.',
            '',
            'Phase 3: Card play and effect resolver',
            '- Implement energy costs.',
            '- Implement damage, block, draw, and status effects.',
            '- Move played cards to discard or exhaust.',
            '',
            'Phase 4: Enemy intent and turn resolution',
            '- Show enemy intent.',
            '- Resolve enemy actions.',
            '- Advance turns.',
            '- Handle win/loss.',
            '',
            'Phase 5: Rewards and run progression',
            '- Offer 3 card rewards after wins.',
            '- Add selected card to deck.',
            '- Advance encounter.',
            '- Trigger boss and result screen.',
            '',
            'Phase 6: Polish and playtest instrumentation',
            '- Add combat log.',
            '- Add simple localStorage persistence.',
            '- Add restart flow.',
            '- Add debug controls for playtesting.',
          ],
        },
      ],
      rule: null,
      closingParagraphs: ['Each phase should leave the app runnable.'],
    },
    {
      number: 14,
      title: 'Add acceptance criteria',
      paragraphs: [
        'Acceptance criteria tell Cursor when the work is done.',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Acceptance criteria:',
            '- The app runs locally without errors.',
            '- The player can start a run.',
            '- The player can draw a hand.',
            '- The player can play cards by spending energy.',
            '- Damage, block, draw, and statuses resolve correctly.',
            '- Enemy intent is visible before the player ends the turn.',
            '- The enemy acts after End Turn.',
            '- The player can win or lose an encounter.',
            '- The player receives 3 card rewards after a win.',
            '- The selected reward is added to the deck.',
            '- The run advances to the next encounter.',
            '- The boss fight appears at the end.',
            '- The result screen displays win or loss.',
            '- Existing routes and styling are not broken.',
            '- No TypeScript is added.',
          ],
        },
      ],
      rule: null,
      closingParagraphs: [
        'Without acceptance criteria, the agent may produce a lot of code without delivering a playable loop.',
      ],
    },
    {
      number: 15,
      title: 'Add playtest criteria',
      paragraphs: [
        'A game MVP is not done when it compiles.',
        'It is done when it can answer a design question.',
      ],
      blocks: [
        {
          type: 'labeled',
          label: 'Add this',
          lines: [
            'Playtest goals:',
            '- Can a new player understand what the enemy will do next?',
            '- Can the player understand what each card does?',
            '- Does each turn create at least one meaningful decision?',
            '- Are any cards always correct to play?',
            '- Are any cards never useful?',
            '- Does the reward choice change how the next fight feels?',
            '- Can the player finish a run in under 10 minutes?',
          ],
        },
        {
          type: 'labeled',
          label: 'Optional metrics',
          lines: [
            'Track manually for now:',
            '- Cards played per turn.',
            '- Cards ignored in hand.',
            '- Most picked rewards.',
            '- Least picked rewards.',
            '- Average turns per encounter.',
            '- Win/loss rate.',
            '- Confusing card text.',
          ],
        },
      ],
      rule: null,
      closingParagraphs: ['You can add analytics later.'],
    },
    {
      number: 16,
      title: 'Example full Cursor prompt',
      paragraphs: ['Use this as a complete starting prompt.'],
      blocks: [
        { type: 'code', label: 'Full Cursor prompt', code: fullCursorPrompt },
      ],
    },
    {
      number: 17,
      title: 'Example prompt for a football card battler MVP',
      paragraphs: ['Use this version for a Deck Dynasty-style prototype.'],
      blocks: [
        { type: 'code', label: 'Football card battler prompt', code: footballCursorPrompt },
      ],
    },
    {
      number: 18,
      title: 'Final principle',
      paragraphs: [
        'A Cursor spec for a card game MVP should not ask for magic.',
        'It should describe:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'The loop',
            'The rules',
            'The data',
            'The screens',
            'The state',
            'The phases',
            'The acceptance criteria',
            'What not to build',
          ],
        },
      ],
      closingParagraphs: [
        'The more clearly you define those pieces, the less Cursor has to guess.',
        'And the less Cursor guesses, the more likely you get something playable instead of a pile of disconnected components.',
        'A good card game MVP prompt should produce a prototype you can test in one sitting.',
        'Not a platform. Not a framework. Not the whole dream game. A playable loop.',
      ],
    },
  ],

  relatedLinks: [
    {
      label: 'Roguelike Deckbuilder Designer GPT',
      href: gptUrl,
    },
    {
      label: 'Roguelike Deckbuilder MVP Playbook',
      href: '/playbooks/roguelike-deckbuilder-mvp/',
    },
    {
      label: 'Card System Design for Indie Games',
      href: '/playbooks/card-system-design/',
    },
    {
      label: 'Deckbuilder Balance Checklist',
      href: '/playbooks/deckbuilder-balance-checklist/',
    },
  ],

  closingCta: {
    heading: 'Write the spec, then build the loop.',
    copy: 'Use the GPT to shape your card game design, then paste a phased Cursor spec like this to turn it into a playable prototype.',
    label: 'Open Roguelike Deckbuilder Designer GPT',
    href: gptUrl,
  },
};
