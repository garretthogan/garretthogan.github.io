export const gptUrl =
  'https://chatgpt.com/g/g-6a318bb6442081919aff28060c66ffc9-roguelike-deckbuilder-designer';

export const roguelikeDeckbuilderDesignerPage = {
  hero: {
    eyebrow: 'Ragtag Throne · GPT',
    headline: 'Roguelike Deckbuilder Designer GPT',
    subhead:
      'A practical game design assistant for turning rough card game ideas into playable roguelike deckbuilder systems, MVP specs, card frameworks, encounters, bosses, and playtest plans.',
    primaryCta: {
      label: 'Open the GPT',
      href: gptUrl,
    },
    secondaryCta: {
      label: 'Read the MVP Playbook',
      href: '/playbooks/roguelike-deckbuilder-mvp/',
    },
  },

  designAreas: [
    {
      title: 'Core game loops',
      body: 'Define the run loop, encounter cadence, and the decisions that keep each run feeling distinct without bloating scope.',
    },
    {
      title: 'Turn structures',
      body: 'Shape draw, intent, action, modifier, resource spend, resolution, and cleanup into a loop that stays readable turn to turn.',
    },
    {
      title: 'Card taxonomies',
      body: 'Separate core actions, modifiers, hero cards, resources, defense, status effects, and curses so every card has a clear job.',
    },
    {
      title: 'Resource systems',
      body: 'Design energy, momentum, charges, or custom pools with costs that create tradeoffs instead of obvious best plays.',
    },
    {
      title: 'Encounter design',
      body: 'Build enemy intents, pressure curves, and encounter pacing that test your card system without requiring bespoke cards every fight.',
    },
    {
      title: 'Boss patterns',
      body: 'Create multi-phase bosses with telegraphed threats, counterplay windows, and rewards that feel like run milestones.',
    },
    {
      title: 'Reward models',
      body: 'Structure card picks, relics, shops, and route rewards so players can build toward archetypes without dead-card clutter.',
    },
    {
      title: 'Meta progression',
      body: 'Decide what unlocks between runs, what stays in-run only, and how much persistence your MVP actually needs to validate the loop.',
    },
    {
      title: 'MVP scope',
      body: 'Cut the design down to a small card pool, few enemy types, one run structure, and one reward model you can playtest quickly.',
    },
    {
      title: 'Cursor-ready implementation specs',
      body: 'Turn the design into schemas, rules engine structure, UI screens, state shape, and phased build steps ready for implementation.',
    },
  ],

  messyIdeas:
    'Most card game ideas get too big too fast. This GPT is built to help you cut through the noise, find the core loop, reduce dead-card risk, and shape your mechanics into a smaller playable prototype before you spend months building the wrong system.',

  examplePrompts: [
    'Help me turn my roguelike deckbuilder idea into an MVP.',
    'Design a card system with broad combo hooks and low dead-card risk.',
    'Create 50 cards with archetypes, costs, tags, effects, and balance notes.',
    'Audit my card mechanics for runaway scaling and boring turns.',
    'Design enemies, bosses, rewards, and encounter pacing for my run structure.',
    'Turn this game idea into a Cursor-ready implementation spec.',
  ],

  designModes: [
    {
      title: 'Idea Architect',
      body: 'Turns a rough concept into core fantasy, core loop, turn structure, resource model, card taxonomy, encounter model, reward model, and MVP scope.',
    },
    {
      title: 'Card Designer',
      body: 'Creates cards with name, type, cost, tags, rarity, effect, archetype role, combo hooks, and balance notes.',
    },
    {
      title: 'Balance Auditor',
      body: 'Finds dead cards, dominant strategies, runaway scaling, unclear timing windows, low-agency turns, and unnecessary complexity.',
    },
    {
      title: 'MVP Architect',
      body: 'Turns the design into data schemas, rules engine structure, UI screens, state shape, persistence model, and phased implementation work.',
    },
    {
      title: 'Playtest Coach',
      body: 'Creates paper prototype rules, test scripts, feedback questions, metrics to track, and recommendations for what to cut next.',
    },
  ],

  credibility: {
    copy:
      'Ragtag Throne is where I prototype games, spatial tools, civic data products, and browser-based creative systems. This GPT grew out of the same workflow I use for projects like Deck Dynasty: reduce a messy idea into a focused MVP, define the rules clearly, test the loop quickly, and only expand once the core decisions feel good.',
    bullets: [
      'Deck Dynasty is a football roguelike card battler about building a program, surviving games, and chasing championships.',
      'The design process surfaced the exact problems this GPT is meant to help with: too many card types, dead-card risk, bloated progression, unclear MVP scope, and the need for a smaller red-zone demo to validate the core loop.',
    ],
  },

  relatedPlaybooks: [
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
    {
      label: 'Cursor Spec for Card Game MVPs',
      href: '/playbooks/cursor-spec-for-card-games/',
    },
  ],

  finalCta: {
    heading: 'Build the smallest playable version first.',
    copy: 'Use the GPT to turn your deckbuilder idea into a focused prototype, then use the playbooks to move from design into implementation.',
    label: 'Open Roguelike Deckbuilder Designer GPT',
    href: gptUrl,
  },
};
