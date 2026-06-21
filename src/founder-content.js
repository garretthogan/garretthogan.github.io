export const founderShared = {
  email: 'ragtagthrone@gmail.com',
  github: {
    label: 'GitHub',
    url: 'https://github.com/garretthogan',
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/garretthogandev/',
  },
  footerLinks: [
    { label: 'Home', href: '/' },
    { label: 'Garrett / Resume', href: '/portfolio/' },
    { label: 'For Founders', href: '/founders/' },
    { label: 'Fractional Product Engineer', href: '/fractional-product-engineer/' },
    { label: 'Startup MVP Engineer', href: '/startup-mvp-engineer/' },
    {
      label: 'Roguelike Deckbuilder Designer GPT',
      href: '/gpts/roguelike-deckbuilder-designer/',
    },
  ],
  internalLinks: {
    founders: { href: '/founders/', label: 'For founders' },
    fractional: { href: '/fractional-product-engineer/', label: 'Fractional product engineer' },
    mvp: { href: '/startup-mvp-engineer/', label: 'Startup MVP engineer' },
  },
};

export const foundersPage = {
  hero: {
    eyebrow: 'Ragtag Throne',
    headline: 'Product engineering help for founders moving from idea to MVP.',
    subhead:
      'I help founders turn early product ideas into usable software: prototypes, MVPs, internal tools, workflow systems, visual interfaces, and AI-assisted product experiments.',
    support:
      'I’m strongest when the idea is still messy. I can help clarify the user problem, shape the first version, design the core interaction, build the product, and cut scope until there is something real enough to test.',
    primaryCta: {
      label: 'Start a conversation',
      href: 'mailto:ragtagthrone@gmail.com?subject=Founder%20project%20conversation',
    },
    secondaryCta: {
      label: 'View startup MVP services',
      href: '/startup-mvp-engineer/',
    },
  },
  proofStrip: [
    '10+ years software engineering experience',
    'Senior / Lead Software Engineer at Nike',
    'Internal tools, dashboards, and workflow systems',
    'Front-end, WebGL, product engineering, and prototyping',
    'Founder-friendly MVP scoping',
  ],
  goodFit: {
    heading: 'Good fit',
    items: [
      'You have a product idea but need help shaping the MVP.',
      'You need a technical partner who can think through product tradeoffs.',
      'You are building a visual, creative, workflow-heavy, or AI-assisted tool.',
      'You need a prototype that feels real enough to show users or investors.',
      'You want someone who can build and explain the product, not just take tickets.',
    ],
  },
  notGoodFit: {
    heading: 'Not a good fit',
    items: [
      'You already have a detailed spec and only need low-cost implementation.',
      'You want to build a large platform before testing the core workflow.',
      'You need a large multi-disciplinary team immediately.',
      'You are not ready to make hard scope decisions.',
    ],
  },
  services: {
    heading: 'What I can help with',
    cards: [
      {
        title: 'MVP Strategy',
        body: 'Clarify the first usable version, reduce scope, identify the core workflow, and define what needs to be true before building more.',
      },
      {
        title: 'Product Prototyping',
        body: 'Build a prototype that feels real enough to test with users, investors, or internal stakeholders.',
      },
      {
        title: 'Front-End Product Engineering',
        body: 'Design and build the core interface, interaction model, and product architecture for the first version.',
      },
      {
        title: 'Visual and Interactive Software',
        body: 'Build browser-based creative tools, WebGL interfaces, spatial planning tools, visual editors, and real-time product experiences.',
      },
      {
        title: 'AI-Assisted Workflow Tools',
        body: 'Prototype tools that use AI to speed up creative, operational, or decision-heavy workflows without turning the product into a gimmick.',
      },
      {
        title: 'Internal Tools and Dashboards',
        body: 'Build focused software for teams that need better visibility, coordination, monitoring, or workflow support.',
      },
    ],
  },
  howIWork: {
    heading: 'How I work',
    intro:
      'The goal is not to build the biggest possible version. The goal is to find the smallest useful version that proves the product should exist.',
    steps: [
      'Understand the real workflow',
      'Find the user decision the product needs to improve',
      'Shape the smallest useful version',
      'Build a prototype or MVP',
      'Test it with real users or stakeholders',
      'Tighten the product based on what actually matters',
    ],
  },
  cta: {
    heading: 'Have a messy product idea?',
    copy: 'Send me the rough version. I can help you figure out what is worth building first.',
    label: 'Start a conversation',
    href: 'mailto:ragtagthrone@gmail.com?subject=Founder%20project%20conversation',
  },
  relatedPages: ['fractional', 'mvp'],
};

export const fractionalPage = {
  hero: {
    eyebrow: 'Ragtag Throne',
    headline: 'A fractional product engineer for founders who need more than implementation.',
    subhead:
      'I help early-stage founders clarify product direction, scope the first useful version, build the core experience, and make better technical tradeoffs before a full engineering team exists.',
    primaryCta: {
      label: 'Talk through a project',
      href: 'mailto:ragtagthrone@gmail.com?subject=Fractional%20product%20engineering',
    },
    secondaryCta: {
      label: 'See founder services',
      href: '/founders/',
    },
  },
  whatIs: {
    heading: 'What a fractional product engineer does',
    copy: 'A fractional product engineer sits between product, design, and engineering. The role is not just to write code. It is to help decide what should be built, what should be cut, what needs to be tested, and how to turn the first version into something usable.',
    bullets: [
      'Clarifies messy product ideas',
      'Turns workflows into product requirements',
      'Builds prototypes and MVPs',
      'Designs the core interaction model',
      'Chooses a practical technical approach',
      'Helps founders avoid overbuilding',
      'Creates enough product infrastructure to learn quickly',
    ],
  },
  whenMakesSense: {
    heading: 'When this makes sense',
    cards: [
      {
        title: 'Before hiring a full engineering team',
        body: 'You need senior technical judgment now, but you are not ready to hire a full-time engineering team.',
      },
      {
        title: 'Before raising or pitching',
        body: 'You need a prototype or MVP that makes the product easier to understand, demo, and test.',
      },
      {
        title: 'Before committing to a large build',
        body: 'You need help figuring out what the first useful version should actually include.',
      },
      {
        title: 'When the product is interaction-heavy',
        body: 'You are building a visual tool, creative workflow, dashboard, internal system, or AI-assisted workflow where the interface is the product.',
      },
    ],
  },
  whyWorkWithMe: {
    heading: 'Why work with me',
    copy: 'I bring senior engineering experience, product judgment, and hands-on execution. I have spent 10+ years building internal tools, workflow systems, dashboards, creative software, and product-facing systems for teams that needed software to make real work easier.',
    bullets: [
      'Senior / lead engineering experience',
      'Strong front-end and product engineering background',
      'Comfortable with ambiguous workflows',
      'Experienced with internal tools and decision-support software',
      'Interested in visual, creative, AI-assisted, and workflow-heavy products',
      'Able to move from product thinking to implementation without handoff friction',
    ],
  },
  engagement: {
    heading: 'Ways to work together',
    cards: [
      {
        title: 'Technical Discovery',
        body: 'Clarify the user problem, first workflow, MVP scope, risks, and technical path.',
      },
      {
        title: 'MVP Sprint',
        body: 'Build the first usable version of the product with tight scope and fast feedback.',
      },
      {
        title: 'Product Engineering Partner',
        body: 'Ongoing senior product engineering support for founders who need consistent technical execution and product judgment.',
      },
    ],
  },
  cta: {
    heading: 'Need a product engineer before you need a whole team?',
    copy: 'Send me the rough idea, the current prototype, or the problem you are trying to solve. I can help identify the smallest useful next step.',
    label: 'Talk through a project',
    href: 'mailto:ragtagthrone@gmail.com?subject=Fractional%20product%20engineering',
  },
  relatedPages: ['founders', 'mvp'],
};

export const mvpPage = {
  hero: {
    eyebrow: 'Ragtag Throne',
    headline: 'Build the smallest useful version of your startup idea.',
    subhead:
      'I help founders scope, prototype, and build MVPs that are focused enough to ship and real enough to test.',
    support:
      'The goal is not to build the full platform. The goal is to prove the core workflow, learn what users actually need, and create a product foundation that can survive the next version.',
    primaryCta: {
      label: 'Scope an MVP',
      href: 'mailto:ragtagthrone@gmail.com?subject=Startup%20MVP%20scope',
    },
    secondaryCta: {
      label: 'Work with a fractional product engineer',
      href: '/fractional-product-engineer/',
    },
  },
  philosophy: {
    heading: 'The MVP should answer one hard question',
    copy: 'A good MVP is not a smaller version of the final product. It is a focused test of the riskiest part of the idea: the workflow, the interaction, the user decision, the data model, the technical approach, or the moment where someone decides the product is worth using.',
  },
  mvpTypes: {
    heading: 'MVPs I can help build',
    cards: [
      {
        title: 'Workflow Tools',
        body: 'Software for messy operational processes, internal coordination, approvals, tracking, planning, or decision support.',
      },
      {
        title: 'Visual and Spatial Tools',
        body: 'Browser-based interfaces for planning, layout, simulation, creative work, visual editing, or spatial decision-making.',
      },
      {
        title: 'AI-Assisted Products',
        body: 'Focused AI workflows that help users edit, generate, summarize, classify, plan, or make decisions faster.',
      },
      {
        title: 'Dashboards and Internal Systems',
        body: 'Tools that give teams a clearer view of status, exceptions, performance, inventory, content, or operational state.',
      },
      {
        title: 'Creative Software',
        body: 'Interfaces for media, design, storytelling, game systems, product configuration, and browser-based creation.',
      },
    ],
  },
  process: {
    heading: 'How the MVP process works',
    steps: [
      'Clarify the user and the real problem',
      'Map the workflow the product needs to support',
      'Define the smallest useful version',
      'Identify what should not be built yet',
      'Prototype the core interaction',
      'Build the MVP',
      'Test, learn, and decide what comes next',
    ],
  },
  faq: {
    heading: 'Founder FAQ',
    items: [
      {
        question: 'How much should an MVP include?',
        answer:
          'Only enough to test the core workflow. If a feature does not help prove the main product risk, it probably belongs in a later version.',
      },
      {
        question: 'Do I need a full product spec first?',
        answer:
          'No. I can help shape the spec from the idea, workflow, rough notes, sketches, or prototype you already have.',
      },
      {
        question: 'Can you help if I am non-technical?',
        answer:
          'Yes. A good MVP process should make the technical decisions understandable enough for the founder to make product and business tradeoffs.',
      },
      {
        question: 'What kinds of products are the best fit?',
        answer:
          'Visual tools, internal tools, workflow systems, dashboards, creative software, AI-assisted workflows, and products where the core interface matters a lot.',
      },
      {
        question: 'Are you an agency?',
        answer:
          'Ragtag Throne is a solo-led creative technology agency. The fit is closer to a senior technical product partner than a large full-service agency team.',
      },
    ],
  },
  cta: {
    heading: 'Have an MVP idea that needs shape?',
    copy: 'Send the rough version. I can help you figure out what to build first, what to cut, and how to get to something testable.',
    label: 'Scope an MVP',
    href: 'mailto:ragtagthrone@gmail.com?subject=Startup%20MVP%20scope',
  },
  relatedPages: ['founders', 'fractional'],
};
