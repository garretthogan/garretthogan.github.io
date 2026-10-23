export const portfolioContent = {
  profile: {
    eyebrow: 'Senior Frontend + Product Engineer',
    headline: 'Garrett Hogan',
    credential: 'Havoc · Aug 2026–Present',
    intro:
      'I build interface-heavy software for complex workflows—from launch operations dashboards and spatial editors to WebGL tools and civic data products. After more than a decade at Nike, I bring senior engineering judgment, product thinking, and hands-on frontend execution to ambiguous problems.',
  },

  primaryLinks: [
    { label: 'Work', href: '#work' },
    {
      label: 'Resume',
      href: '/Garrett-Hogan-Resume.pdf',
      download: 'Garrett-Hogan-Resume.pdf',
    },
    {
      label: 'Email',
      href: 'mailto:ragtagthrone@gmail.com?subject=Senior%20engineering%20role',
    },
    { label: 'GitHub', href: 'https://github.com/garretthogan' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/garretthogandev/' },
  ],

  selectedWork: [
    {
      number: '01',
      title: 'Wardboard / Ward 311',
      description:
        'Explore Chicago 311 requests by ward through filters, summaries, and readable neighborhood patterns.',
      href: 'https://wardboard.vercel.app/',
    },
    {
      number: '02',
      title: 'Flipspace',
      description:
        'Plan commercial spaces in the browser and evaluate layout fit before lease or buildout decisions.',
      href: 'https://flipspace.app',
    },
    {
      number: '03',
      title: 'Deck Dynasty',
      description:
        'A playable football roguelike card battler with turn-based strategy, opponent behavior, onboarding, and progression.',
      href: 'https://deck-dynasty.vercel.app/',
    },
  ],

  experience: {
    heading: 'Experience',
    roles: [
      {
        role: 'Senior Frontend Engineer · Havoc',
        timeframe: 'Aug 2026–Present',
        summary:
          'At Havoc, I work on the frontend of a command-and-control system for managing autonomous vehicles.',
        stack: 'React · TypeScript · Node.js · Mapbox · MapLibre',
      },
      {
        role: 'Senior Software Engineer · Nike',
        timeframe: '2015–2026',
        summary:
          'At Nike, I led frontend work across product-launch operations, commerce visibility, creative workflows, WebGL product visualization, and AI-assisted design prototyping.',
        stack: 'JavaScript · React · Vue · Angular · Three.js · WebGL',
      },
    ],
  },

  footer: {
    availability: 'Currently Senior Frontend Engineer at Havoc.',
    studioLabel: 'Ragtag Throne',
  },
};
