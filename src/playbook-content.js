import { gptUrl } from './gpt-content.js';

const cardSchema = `{
  "id": "quick_slant",
  "name": "Quick Slant",
  "type": "core_action",
  "cost": 1,
  "rarity": "common",
  "tags": ["quick", "pass", "combo_starter"],
  "effect": {
    "kind": "gain_power",
    "amount": 6
  },
  "conditions": [],
  "designRole": "Reliable opener that enables quick-pass synergies.",
  "balanceNotes": "Baseline common card. Should remain useful but not become the best scaling option."
}`;

const enemySchema = `{
  "id": "pressure_defense",
  "name": "Pressure Defense",
  "health": 32,
  "intentPattern": ["attack", "disrupt", "attack_heavy"],
  "pressurePattern": "Punishes hands that play only one card.",
  "counterplay": "Rewards cheap cards, draw, and tempo generation.",
  "rewardPool": ["tempo", "draw", "pressure"]
}`;

export const roguelikeDeckbuilderMvpPlaybook = {
  hero: {
    eyebrow: 'Ragtag Throne · Playbook',
    headline: 'Roguelike Deckbuilder MVP Playbook',
    subhead:
      'A practical framework for reducing a big card game idea into a small, testable prototype with a clear loop, reusable card system, simple encounters, and fast feedback.',
    primaryCta: {
      label: 'Open Roguelike Deckbuilder Designer GPT',
      href: gptUrl,
    },
    secondaryCta: {
      label: 'See the card system checklist',
      href: '/playbooks/deckbuilder-balance-checklist/',
    },
  },

  promise:
    'A focused framework for turning a big roguelike deckbuilder idea into the smallest playable version that can prove whether the core loop is fun.',

  sections: [
    {
      number: 1,
      title: 'Start with the core fantasy',
      paragraphs: [
        'Before designing cards, map screens, shops, bosses, and progression, define what the player is actually pretending to be.',
        'A roguelike deckbuilder MVP needs a fantasy that creates decisions immediately.',
      ],
      blocks: [
        {
          type: 'labeled',
          label: 'Good examples',
          lines: [
            'I am a desperate coach trying to survive a cursed football season.',
            'I am a dungeon outlaw building illegal spell combos.',
            'I am a failing space captain holding my crew together through risky encounters.',
            'I am a monster trainer mutating my team between battles.',
          ],
        },
        {
          type: 'labeled',
          label: 'Weak examples',
          lines: [
            'I am playing cards to reduce enemy health.',
            'I am collecting upgrades.',
            'I am building a deck.',
          ],
        },
      ],
      rule: 'If the fantasy does not create obvious card types, risks, enemies, and rewards, it is not specific enough yet.',
    },
    {
      number: 2,
      title: 'Reduce the game to one repeatable loop',
      paragraphs: [
        'Most deckbuilder ideas get too big because the designer tries to build the full run before proving the turn.',
        'Your MVP loop should be small:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Choose encounter',
            'Draw hand',
            'Play cards',
            'Resolve enemy pressure',
            'Earn reward',
            'Modify deck',
            'Repeat until boss',
          ],
        },
        {
          type: 'labeled',
          label: 'For an even smaller prototype',
          lines: [
            'Draw hand',
            'Play cards',
            'Resolve outcome',
            'Choose one reward',
            'Repeat',
          ],
        },
        {
          type: 'labeled',
          label: 'Do not start with',
          lines: [
            'Full campaign map',
            'Multiple characters',
            'Meta progression',
            'Large card pool',
            'Complex shops',
            'Multiple currencies',
            'Procedural story events',
            'Permanent unlocks',
          ],
        },
      ],
      rule: 'The first prototype should prove the turn loop, not the whole game.',
    },
    {
      number: 3,
      title: 'Define the minimum turn structure',
      paragraphs: [
        'A good turn structure should make the player answer:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'What is the threat?',
            'What can I afford?',
            'What combo am I building?',
            'What am I saving for later?',
            'What happens if I push my luck?',
          ],
        },
        {
          type: 'labeled',
          label: 'A clean baseline turn',
          lines: [
            '1. Draw 5 cards.',
            '2. Gain 3 energy.',
            '3. Show enemy intent.',
            '4. Play any number of cards while resources allow.',
            '5. Resolve attacks, blocks, statuses, and triggered effects.',
            '6. Enemy acts.',
            '7. Discard hand.',
            '8. Start next turn.',
          ],
        },
        {
          type: 'labeled',
          label: 'For a sports/card battler version',
          lines: [
            '1. Draw 5 cards.',
            '2. Choose a core play.',
            '3. Stack player, scheme, staff, or facility modifiers.',
            '4. Opponent reveals defensive pressure.',
            '5. Compare power, tags, counters, and risk.',
            '6. Resolve yards, score, turnover, injury, or momentum.',
            '7. Discard and move to next down.',
          ],
        },
      ],
      rule: 'Use one turn structure until the game is fun. Do not make every encounter use different timing rules.',
    },
    {
      number: 4,
      title: 'Use broad card roles, not narrow one-off cards',
      paragraphs: [
        'This is the big lesson.',
        'Bad MVP cards are too specific:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Gain +3 power only against the Goblin Accountant.',
            'Cancel one trap in forest encounters.',
            'Double your next attack if this is turn 7.',
          ],
        },
        {
          type: 'labeled',
          label: 'Those cards create dead hands. Better cards work through broad tags',
          lines: [
            'Gain +2 power if you played a Quick card this turn.',
            'Draw 1 card when you play a Skill.',
            'Apply 2 Pressure to enemies with Shield.',
            'The next Combo card costs 1 less.',
          ],
        },
        {
          type: 'labeled',
          label: 'Recommended MVP card roles',
          lines: [
            'Core Action',
            'Modifier',
            'Resource',
            'Defense',
            'Draw',
            'Scaling',
            'Risk',
            'Reward',
            'Status',
            'Curse',
          ],
        },
        {
          type: 'labeled',
          label: 'For Deck Dynasty style games',
          lines: [
            'Player Hero',
            'Play Call',
            'Scheme',
            'Tempo',
            'Clutch',
            'Pressure',
            'Facility',
            'Staff',
            'Injury',
            'Momentum',
          ],
        },
      ],
      rule: 'Every card should be playable in at least 60 to 70 percent of normal turns unless it is intentionally rare, cursed, or boss-specific.',
    },
    {
      number: 5,
      title: 'Keep the first card pool small',
      paragraphs: [
        'Do not start with 200 cards.',
        'Start with:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            '20 common cards',
            '10 uncommon cards',
            '5 rare cards',
            '5 enemy/status cards',
            '3 boss/reward cards',
          ],
        },
        {
          type: 'labeled',
          label: 'That is enough to test archetypes without burying yourself in content. A good first pool supports 3 archetypes',
          lines: ['Tempo', 'Scaling', 'Control'],
        },
        {
          type: 'labeled',
          label: 'Or for a football deckbuilder',
          lines: ['Air Raid', 'Ground Game', 'Defensive Pressure'],
        },
        {
          type: 'labeled',
          label: 'Each archetype should have',
          lines: [
            '1 core action',
            '2 enablers',
            '2 payoffs',
            '1 risk card',
            '1 defensive answer',
            '1 rare build-around',
          ],
        },
      ],
      rule: 'A small pool with clear archetypes is better than a large pool full of filler.',
    },
    {
      number: 6,
      title: 'Design enemies as pressure patterns',
      paragraphs: [
        'Do not design enemies as stats first. Design them as pressure.',
        'Weak enemy design:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: ['Goblin', '30 HP', 'Deals 6 damage'],
        },
        {
          type: 'labeled',
          label: 'Better enemy design',
          lines: [
            'Debt Collector',
            'Pressure pattern: Punishes unspent energy.',
            'Intent: Attack for 5. If the player ends turn with unused energy, attack again.',
            'Counterplay: Spend efficiently or use cards that convert leftover energy.',
          ],
        },
        {
          type: 'labeled',
          label: 'Enemy template',
          lines: [
            'Name',
            'Health',
            'Intent pattern',
            'Pressure pattern',
            'Counterplay',
            'Scaling behavior',
            'Reward type',
          ],
        },
        {
          type: 'labeled',
          label: 'Good MVP enemy pressure types',
          lines: [
            'Punishes slow scaling',
            'Punishes overplaying cards',
            'Punishes hoarding resources',
            'Punishes lack of defense',
            'Adds junk cards',
            'Forces discard',
            'Blocks draw',
            'Copies player scaling',
            'Attacks every other turn but hits hard',
          ],
        },
      ],
      rule: 'Each enemy should teach the player why one kind of card matters.',
    },
    {
      number: 7,
      title: 'Make rewards change the next fight',
      paragraphs: [
        'A reward is not just a prize. It should change what the player wants to do next.',
        'Basic reward options:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Add 1 of 3 cards',
            'Upgrade 1 card',
            'Remove 1 card',
            'Heal',
            'Gain relic/passive',
            'Gain money',
            'Take curse for stronger reward',
          ],
        },
        {
          type: 'labeled',
          label: 'For MVP, use only',
          lines: [
            'Choose 1 of 3 cards',
            'Upgrade 1 card',
            'Remove 1 card',
            'Take a risky rare reward',
          ],
        },
        {
          type: 'labeled',
          label: 'For Deck Dynasty',
          lines: [
            'Recruit a player',
            'Add a staff/facility pack',
            'Upgrade a scheme',
            'Remove a weak card',
            'Accept an injury risk for a stronger card',
          ],
        },
      ],
      rule: 'After every reward, the player should feel their deck changed direction slightly.',
    },
    {
      number: 8,
      title: 'Bosses should test the archetypes',
      paragraphs: [
        'The first boss does not need five phases.',
        'It needs to ask:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Did the player build enough tempo?',
            'Did the player build enough defense?',
            'Did the player build a real payoff?',
            'Did the player rely on one fragile trick?',
          ],
        },
        {
          type: 'labeled',
          label: 'Simple boss pattern',
          lines: [
            'Turn 1: Light attack, applies pressure.',
            'Turn 2: Blocks or disrupts player combo.',
            'Turn 3: Heavy attack.',
            'Turn 4: Summons or adds junk.',
            'Repeat with scaling.',
          ],
        },
        {
          type: 'labeled',
          label: 'For a football boss',
          lines: [
            'Drive 1: Conservative defense.',
            'Drive 2: Blitz pressure.',
            'Drive 3: Adjusts to the player’s most-used play family.',
            'Final drive: High-risk clutch check.',
          ],
        },
      ],
      rule: 'The boss should expose whether the player’s build is real.',
    },
    {
      number: 9,
      title: 'Cut meta progression until the turn loop works',
      paragraphs: [
        'Meta progression is seductive because it makes the game feel bigger.',
        'But for MVP, avoid:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Permanent skill trees',
            'Multiple currencies',
            'Character unlock paths',
            'Complex draft systems',
            'Long campaign maps',
            'Facility management layers',
            'Relationship systems',
            'Large procedural event pools',
          ],
        },
        {
          type: 'labeled',
          label: 'Use temporary run progression first',
          lines: [
            'Cards added during the run',
            'Cards upgraded during the run',
            'Cards removed during the run',
            'One passive relic',
            'One boss reward',
          ],
        },
      ],
      rule: 'If the turn loop is not fun without meta progression, meta progression will not save it.',
    },
    {
      number: 10,
      title: 'Use a simple data schema from the start',
      paragraphs: ['Even a small deckbuilder should be data-driven.'],
      blocks: [
        { type: 'json', label: 'Example card schema', code: cardSchema },
        { type: 'json', label: 'Example enemy schema', code: enemySchema },
      ],
      rule: 'Cards, enemies, rewards, and encounters should live in data files, not hardcoded UI components.',
    },
    {
      number: 11,
      title: 'Build the smallest digital version',
      paragraphs: ['For a browser MVP, build only:'],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Start run screen',
            'Encounter screen',
            'Card hand',
            'Enemy intent display',
            'Reward screen',
            'Deck viewer',
            'Run result screen',
          ],
        },
        {
          type: 'labeled',
          label: 'Avoid',
          lines: [
            'Account system',
            'Online multiplayer',
            'Procedural map editor',
            'Full animation system',
            'Save cloud',
            'Large content editor',
            'Cosmetic progression',
          ],
        },
        {
          type: 'labeled',
          label: 'Recommended technical shape',
          lines: [
            'Vite',
            'Plain JavaScript',
            'React',
            'Simple CSS or existing design system',
            'Zustand or reducer state',
            'JSON card/enemy files',
            'Local storage persistence',
            'Pure rules engine',
          ],
        },
        {
          type: 'labeled',
          label: 'Core folders',
          lines: [
            'src/',
            '  data/',
            '    cards.json',
            '    enemies.json',
            '    rewards.json',
            '    encounters.json',
            '  game/',
            '    engine.js',
            '    draw.js',
            '    resolveCard.js',
            '    resolveEnemy.js',
            '    rewards.js',
            '    balance.js',
            '  state/',
            '    runStore.js',
            '  components/',
            '    Card.jsx',
            '    Hand.jsx',
            '    EnemyIntent.jsx',
            '    RewardChoice.jsx',
            '    DeckViewer.jsx',
            '  pages/',
            '    RunPage.jsx',
            '    StartPage.jsx',
            '    ResultPage.jsx',
          ],
        },
      ],
      rule: 'The rules engine should be testable without the UI.',
    },
    {
      number: 12,
      title: 'What to playtest first',
      paragraphs: ['Do not ask testers:'],
      blocks: [
        {
          type: 'lines',
          lines: ['Do you like the game?'],
        },
        {
          type: 'labeled',
          label: 'Ask',
          lines: [
            'Did you understand what the enemy was going to do?',
            'Did you feel like you had a meaningful choice each turn?',
            'Did any cards feel useless?',
            'Did any card feel automatic?',
            'Did you understand why you won or lost?',
            'Did the reward make you want to keep playing?',
            'Did your deck feel different after 3 fights?',
            'What would you cut?',
            'What would you want more of?',
          ],
        },
        {
          type: 'labeled',
          label: 'Track',
          lines: [
            'Average run length',
            'Cards played per turn',
            'Cards ignored in hand',
            'Most picked rewards',
            'Least picked rewards',
            'Win rate',
            'Turns per encounter',
            'Damage taken per encounter',
            'Player confusion points',
          ],
        },
      ],
      rule: 'The goal of the first playtest is not balance. It is clarity and desire to replay.',
    },
    {
      number: 13,
      title: 'The MVP checklist',
      paragraphs: ['A roguelike deckbuilder MVP is ready to test when it has:'],
      blocks: [
        {
          type: 'lines',
          lines: [
            'One clear fantasy',
            'One repeatable turn loop',
            'One resource model',
            'Three card archetypes',
            'Thirty to forty cards',
            'Five normal enemies',
            'One elite enemy',
            'One boss',
            'One reward screen',
            'One way to upgrade or remove cards',
            'One run result screen',
            'Basic local persistence',
            'A feedback form',
          ],
        },
        {
          type: 'labeled',
          label: 'It is not ready if',
          lines: [
            'Players cannot tell what cards do.',
            'Players cannot tell what enemies intend.',
            'Most cards only work in rare situations.',
            'The best move is obvious every turn.',
            'Rewards do not change the deck.',
            'The game needs future systems to become fun.',
            'The designer cannot explain the loop in one paragraph.',
          ],
        },
      ],
    },
    {
      number: 14,
      title: 'Example reduction: cursed football dynasty',
      paragraphs: ['Big idea:'],
      blocks: [
        {
          type: 'lines',
          lines: [
            'A roguelike deckbuilder where the player builds a cursed football dynasty using athlete, staff, facility, and scheme cards to survive games and win championships.',
          ],
        },
        {
          type: 'labeled',
          label: 'MVP version',
          lines: [
            'A red-zone football card battler where every possession starts near the end zone. The player has four downs to score by combining a play call with athlete, scheme, and momentum cards. Defensive opponents reveal pressure patterns. After each drive, the player adds, upgrades, or removes cards. The run ends after three games and one championship boss.',
          ],
        },
        {
          type: 'labeled',
          label: 'Cut for later',
          lines: [
            'Full season simulation',
            'Recruiting',
            'Draft classes',
            'Facility trees',
            'Staff management',
            'Player contracts',
            'Multiple conferences',
            'Long-term dynasty history',
            'Online PvP',
          ],
        },
        {
          type: 'labeled',
          label: 'Keep now',
          lines: [
            'Four-down scoring loop',
            'Card stacking',
            'Opponent defensive intent',
            'Drive outcome',
            'Reward choice',
            'Small championship run',
          ],
        },
        {
          type: 'labeled',
          label: 'Why this works',
          lines: [
            'It tests the core decision: can the player combine cards in satisfying ways under pressure?',
          ],
        },
      ],
    },
    {
      number: 15,
      title: 'Final principle',
      paragraphs: [
        'The MVP is not a small version of the whole game.',
        'It is a test rig for the most important decision loop.',
        'For a roguelike deckbuilder, that loop is usually:',
      ],
      blocks: [
        {
          type: 'lines',
          lines: [
            'Read threat',
            'Build hand combo',
            'Spend limited resources',
            'Accept risk',
            'Resolve outcome',
            'Improve deck',
            'Try again',
          ],
        },
      ],
      rule: null,
      closingParagraphs: [
        'If that loop feels good with 30 cards and 5 enemies, the game has a foundation.',
        'If it does not, more content will only hide the problem.',
      ],
    },
  ],

  closingCta: {
    heading: 'Test the loop first.',
    copy: 'Use the GPT to turn your deckbuilder idea into a focused prototype, then playtest the smallest version that can prove whether the core loop is fun.',
    label: 'Open Roguelike Deckbuilder Designer GPT',
    href: gptUrl,
  },
};
