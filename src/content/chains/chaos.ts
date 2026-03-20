import type { GameEvent } from '../../types/event';

export interface ChainEvent extends GameEvent {
  chainId: string;
  chainStep: number;
  chainTotal: number;
}

// Chain 1: School Bullying (3 steps)
const schoolBullying: ChainEvent[] = [
  {
    id: 'chaos-bully-1',
    chainId: 'school-bullying',
    chainStep: 1,
    chainTotal: 3,
    stage: 'childhood',
    category: 'social',
    weight: 0.5,
    requirements: { minAge: 8, maxAge: 13 },
    text: 'A bigger kid shoves you in the hallway and your lunch spills everywhere. Everyone laughs. "Nice one, butterfingers." It keeps happening. Every day, a new humiliation.',
    choices: [
      {
        id: 'bully-tell',
        label: 'Tell a teacher',
        effects: { happiness: -5, stress: 10 },
        nextChainId: 'chaos-bully-2',
        resultText: 'The teacher talks to them. It stops for a week. Then it gets worse because you "snitched."'
      },
      {
        id: 'bully-endure',
        label: 'Keep your head down and endure it',
        effects: { happiness: -15, stress: 20, health: -5 },
        nextChainId: 'chaos-bully-2',
        resultText: 'You learn to be invisible. You eat lunch in the bathroom. The anxiety builds.'
      },
      {
        id: 'bully-fight',
        label: 'Stand up to them, even if you\'re scared',
        effects: { happiness: 5, stress: 15, reputation: 10 },
        nextChainId: 'chaos-bully-2',
        resultText: 'Your voice shakes. They look surprised. It doesn\'t fix everything, but something shifts.'
      }
    ]
  },
  {
    id: 'chaos-bully-2',
    chainId: 'school-bullying',
    chainStep: 2,
    chainTotal: 3,
    stage: 'childhood',
    category: 'social',
    weight: 0.7,
    text: 'The bullying has been going on for months. Your grades are slipping. You dread school. One night your parent notices you haven\'t touched dinner. "What\'s going on with you?"',
    choices: [
      {
        id: 'bully-open-up',
        label: 'Tell them everything',
        effects: { happiness: 10, stress: -15, relationshipDelta: 15 },
        nextChainId: 'chaos-bully-3',
        resultText: 'Your parent holds you. They\'re angry — not at you. The next day, they\'re at the school demanding a meeting.'
      },
      {
        id: 'bully-hide',
        label: '"Nothing. I\'m fine."',
        effects: { happiness: -10, stress: 10 },
        nextChainId: 'chaos-bully-3',
        resultText: 'They don\'t believe you, but they don\'t push. The silence between you grows.'
      }
    ]
  },
  {
    id: 'chaos-bully-3',
    chainId: 'school-bullying',
    chainStep: 3,
    chainTotal: 3,
    stage: 'teen',
    category: 'social',
    weight: 0.7,
    text: 'New school year. The bully moved away. You spot a new kid sitting alone at lunch, looking exactly how you used to feel. Your stomach clenches with recognition.',
    choices: [
      {
        id: 'bully-help',
        label: 'Go sit with them',
        effects: { happiness: 15, reputation: 5, smarts: 5 },
        addConditions: ['empathetic'],
        resultText: 'They look up, startled. "Can I sit here?" You become the friend you needed back then. It heals something.'
      },
      {
        id: 'bully-avoid',
        label: 'Look away — you don\'t want to get involved',
        effects: { happiness: -5, stress: 5 },
        resultText: 'You eat your lunch and try not to think about it. But you do think about it. For years.'
      }
    ]
  }
];

// Chain 2: Rebellious Phase (3 steps)
const rebelliousPhase: ChainEvent[] = [
  {
    id: 'chaos-rebel-1',
    chainId: 'rebellious-phase',
    chainStep: 1,
    chainTotal: 3,
    stage: 'teen',
    category: 'social',
    weight: 0.6,
    requirements: { minAge: 14, maxAge: 18 },
    text: 'You\'re sick of rules. Sick of "because I said so." A group of older kids invite you to a house party while their parents are out of town. Your curfew is 10 PM.',
    choices: [
      {
        id: 'rebel-go',
        label: 'Sneak out and go to the party',
        effects: { happiness: 15, stress: 10, reputation: 10 },
        nextChainId: 'chaos-rebel-2',
        resultText: 'Best night of your teenage life. Terrible music, someone spills a drink on you, and you feel alive for the first time in months.'
      },
      {
        id: 'rebel-stay',
        label: 'Stay home. It\'s not worth the risk.',
        effects: { happiness: -5, stress: -5 },
        resultText: 'Monday at school, everyone\'s talking about the party. You pretend you didn\'t want to go.'
      }
    ]
  },
  {
    id: 'chaos-rebel-2',
    chainId: 'rebellious-phase',
    chainStep: 2,
    chainTotal: 3,
    stage: 'teen',
    category: 'social',
    weight: 0.7,
    text: 'The rebellion escalates. You dye your hair, skip class, argue with every authority figure. Your parents find a vape pen in your room. The house turns into a war zone.',
    choices: [
      {
        id: 'rebel-double-down',
        label: 'Double down — their rules are stupid anyway',
        effects: { happiness: 5, stress: 20, reputation: 5, smarts: -5 },
        nextChainId: 'chaos-rebel-3',
        resultText: 'You get suspended for three days. Your parents look more exhausted than angry.'
      },
      {
        id: 'rebel-talk',
        label: 'Have an honest conversation with your parents',
        effects: { happiness: 5, stress: -10, relationshipDelta: 10 },
        nextChainId: 'chaos-rebel-3',
        resultText: '"I just feel like I have no control over my own life." They listen. Really listen. Things slowly improve.'
      }
    ]
  },
  {
    id: 'chaos-rebel-3',
    chainId: 'rebellious-phase',
    chainStep: 3,
    chainTotal: 3,
    stage: 'teen',
    category: 'social',
    weight: 0.7,
    text: 'Senior year. The rebellion is burning out. You look in the mirror and barely recognize the angry kid from two years ago. College applications are due next month.',
    choices: [
      {
        id: 'rebel-channel',
        label: 'Channel that energy into something creative',
        effects: { happiness: 15, smarts: 10, stress: -10 },
        addConditions: ['creative-outlet'],
        resultText: 'You start making music / art / writing. Turns out all that rage was just creativity with nowhere to go.'
      },
      {
        id: 'rebel-conform',
        label: 'Clean up, straighten out, play the game',
        effects: { happiness: 5, smarts: 5, stress: -5, reputation: 10 },
        resultText: 'You get a haircut, pull your grades up, and write a killer essay about growth. The rebel phase becomes the best chapter in your college application.'
      }
    ]
  }
];

// Chain 3: Influencer Moment (3 steps)
const influencerMoment: ChainEvent[] = [
  {
    id: 'chaos-influencer-1',
    chainId: 'influencer-moment',
    chainStep: 1,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'social',
    weight: 0.3,
    requirements: { minAge: 17, maxAge: 30 },
    text: 'You post a video that was supposed to be a joke. 48 hours later: 2 million views. Your phone won\'t stop buzzing. A brand DMs you about a sponsorship deal.',
    choices: [
      {
        id: 'influencer-ride',
        label: 'Ride the wave — post more, engage the audience',
        effects: { happiness: 20, money: 15, reputation: 25, stress: 10 },
        nextChainId: 'chaos-influencer-2',
        resultText: 'You gain 100K followers in a week. Strangers recognize you at the grocery store. This is surreal.'
      },
      {
        id: 'influencer-ignore',
        label: 'This is weird. Go back to normal life.',
        effects: { happiness: 5, stress: -5 },
        resultText: 'The moment fades. Years later you tell people "I went viral once" and nobody believes you.'
      }
    ]
  },
  {
    id: 'chaos-influencer-2',
    chainId: 'influencer-moment',
    chainStep: 2,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'social',
    weight: 0.7,
    text: 'Six months of content creation. Brand deals are rolling in. But every comment section is a minefield. Someone starts a hate thread about you. The anxiety is constant — one wrong post and it all evaporates.',
    choices: [
      {
        id: 'influencer-authentic',
        label: 'Stay authentic — post what feels real, not what performs',
        effects: { happiness: 5, reputation: 5, stress: 10, money: -5 },
        nextChainId: 'chaos-influencer-3',
        resultText: 'Your numbers dip, but the community that stays is genuine. Quality over quantity.'
      },
      {
        id: 'influencer-optimize',
        label: 'Optimize everything for the algorithm',
        effects: { money: 20, stress: 25, happiness: -10 },
        nextChainId: 'chaos-influencer-3',
        resultText: 'The numbers go up. Your soul feels like it goes down. You can\'t remember the last time you posted something you actually cared about.'
      }
    ]
  },
  {
    id: 'chaos-influencer-3',
    chainId: 'influencer-moment',
    chainStep: 3,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'social',
    weight: 0.7,
    text: 'A year in. The platform changes its algorithm and your reach drops 80% overnight. Brands stop calling. You\'re sitting in a ring light wondering what just happened.',
    choices: [
      {
        id: 'influencer-pivot',
        label: 'Use the skills you learned to build something lasting',
        effects: { happiness: 10, smarts: 15, money: 5 },
        addConditions: ['content-creator'],
        resultText: 'Marketing, video production, audience building — turns out those skills are valuable everywhere. You land a creative director role.'
      },
      {
        id: 'influencer-chase',
        label: 'Chase the next viral moment',
        effects: { happiness: -10, stress: 20, reputation: -10 },
        resultText: 'You spend months trying to recapture lightning in a bottle. It doesn\'t come. The desperation shows.'
      }
    ]
  }
];

// Chain 4: Burnout Arc (3 steps)
const burnoutArc: ChainEvent[] = [
  {
    id: 'chaos-burnout-1',
    chainId: 'burnout-arc',
    chainStep: 1,
    chainTotal: 3,
    stage: 'adult',
    category: 'health',
    weight: 0.5,
    requirements: { minAge: 25, maxAge: 50, stressMin: 60 },
    text: 'You can\'t remember the last time you had a weekend. Your eye has been twitching for two weeks. You zone out in meetings and realize you\'ve been staring at the same email for 20 minutes.',
    choices: [
      {
        id: 'burnout-push',
        label: 'Push through — there\'s too much to do',
        effects: { health: -15, stress: 20, happiness: -15 },
        nextChainId: 'chaos-burnout-2',
        resultText: 'You start getting chest pains. You Google "am I having a heart attack at 34" at 2 AM.'
      },
      {
        id: 'burnout-acknowledge',
        label: 'Admit something is wrong',
        effects: { stress: -5, happiness: -5 },
        nextChainId: 'chaos-burnout-2',
        resultText: 'You tell your partner / friend "I think I\'m burning out." Saying it out loud makes it real.'
      }
    ]
  },
  {
    id: 'chaos-burnout-2',
    chainId: 'burnout-arc',
    chainStep: 2,
    chainTotal: 3,
    stage: 'adult',
    category: 'health',
    weight: 0.7,
    text: 'Your body makes the decision for you. You wake up one morning and physically cannot get out of bed. Not won\'t. Can\'t. Your limbs feel like concrete. The ceiling is very interesting.',
    choices: [
      {
        id: 'burnout-doctor',
        label: 'Call in sick and see a doctor',
        effects: { health: 5, stress: -10, money: -5 },
        nextChainId: 'chaos-burnout-3',
        resultText: '"Severe burnout," the doctor says. "Your cortisol levels are through the roof. You need to stop." They hand you a note for two weeks off.'
      },
      {
        id: 'burnout-force',
        label: 'Drag yourself to work anyway',
        effects: { health: -20, stress: 15, happiness: -20 },
        nextChainId: 'chaos-burnout-3',
        resultText: 'You cry in the bathroom at lunch. A coworker finds you. "Go home. Please."'
      }
    ]
  },
  {
    id: 'chaos-burnout-3',
    chainId: 'burnout-arc',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'health',
    weight: 0.7,
    text: 'Recovery. Slow, frustrating recovery. The first week off, you sleep 14 hours a day. The second week, you take a walk and notice trees exist. The third week, you start thinking about what kind of life you actually want.',
    choices: [
      {
        id: 'burnout-rebuild',
        label: 'Go back with firm boundaries — no more 80-hour weeks',
        effects: { happiness: 15, stress: -25, health: 15 },
        addConditions: ['burnout-survivor'],
        resultText: 'You set working hours and mean it. Your output drops, but your output quality soars. Turns out rested-you is better at everything.'
      },
      {
        id: 'burnout-quit',
        label: 'Quit and take a real break before deciding what\'s next',
        effects: { happiness: 20, money: -15, stress: -30 },
        addConditions: ['sabbatical'],
        resultText: 'Three months of nothing. Then slowly, the ideas come back. The excitement comes back. You come back.'
      }
    ]
  }
];

// Chain 5: Therapy Arc (4 steps)
const therapyArc: ChainEvent[] = [
  {
    id: 'chaos-therapy-1',
    chainId: 'therapy-arc',
    chainStep: 1,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'health',
    weight: 0.4,
    requirements: { minAge: 20, maxAge: 50 },
    text: 'Something\'s been off for a while. You\'re not sleeping well. You snap at people you love. A friend mentions therapy like it\'s the most normal thing in the world. "Everyone should have a therapist," they say.',
    choices: [
      {
        id: 'therapy-try',
        label: 'Book an appointment',
        effects: { stress: 5, money: -3 },
        nextChainId: 'chaos-therapy-2',
        resultText: 'The waiting room has terrible art and better magazines. Your palms are sweating.'
      },
      {
        id: 'therapy-nah',
        label: '"I\'m fine, I don\'t need therapy"',
        effects: { stress: 5 },
        resultText: 'You continue white-knuckling it through life. The coping mechanisms get more creative and less healthy.'
      }
    ]
  },
  {
    id: 'chaos-therapy-2',
    chainId: 'therapy-arc',
    chainStep: 2,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'health',
    weight: 0.7,
    text: 'Third session. Your therapist says something that hits you like a truck. "It sounds like you learned early on that your feelings weren\'t safe to express." You stare at them. Nobody has ever said that before.',
    choices: [
      {
        id: 'therapy-lean-in',
        label: 'Lean into it — this is why you\'re here',
        effects: { happiness: 5, stress: 10, smarts: 5 },
        nextChainId: 'chaos-therapy-3',
        resultText: 'The next few sessions are brutal. You cry more than you thought possible. But each session, the weight gets a little lighter.'
      },
      {
        id: 'therapy-deflect',
        label: 'Change the subject — that\'s too close',
        effects: { stress: 10 },
        nextChainId: 'chaos-therapy-3',
        resultText: 'You spend two more sessions talking about surface stuff. Your therapist is patient. They\'ll wait.'
      }
    ]
  },
  {
    id: 'chaos-therapy-3',
    chainId: 'therapy-arc',
    chainStep: 3,
    chainTotal: 4,
    stage: 'adult',
    category: 'health',
    weight: 0.7,
    text: 'Six months of therapy. You catch yourself doing something new — pausing before reacting. Noticing a feeling instead of stuffing it down. Your partner says "You seem different lately." They mean it as a compliment.',
    choices: [
      {
        id: 'therapy-continue',
        label: 'Keep going — you\'re just getting started',
        effects: { happiness: 10, stress: -10, smarts: 5, money: -5 },
        nextChainId: 'chaos-therapy-4',
        resultText: 'Therapy becomes the most important hour of your week. You start recommending it to everyone.'
      },
      {
        id: 'therapy-pause',
        label: 'Take a break — you\'ve got enough tools for now',
        effects: { happiness: 5, stress: -5, money: 3 },
        nextChainId: 'chaos-therapy-4',
        resultText: 'You step away for a while. The skills stick. You know you can go back if you need to.'
      }
    ]
  },
  {
    id: 'chaos-therapy-4',
    chainId: 'therapy-arc',
    chainStep: 4,
    chainTotal: 4,
    stage: 'adult',
    category: 'health',
    weight: 0.7,
    text: 'A situation that would have destroyed you three years ago happens. You feel the old patterns trying to activate — the shutdown, the rage, the spiral. But this time, you catch it. You take a breath. You choose differently.',
    choices: [
      {
        id: 'therapy-growth',
        label: 'Handle it with the tools you\'ve built',
        effects: { happiness: 20, stress: -15, smarts: 10 },
        addConditions: ['emotionally-healthy'],
        resultText: 'It\'s not perfect. But you navigate it without blowing up your life. That\'s the real victory.'
      },
      {
        id: 'therapy-slip',
        label: 'Slip back into old patterns, then catch yourself',
        effects: { happiness: 10, stress: -5 },
        addConditions: ['self-aware'],
        resultText: 'You fall, but you fall softer. And you get back up faster. Progress isn\'t linear, and that\'s okay.'
      }
    ]
  }
];

export const chaosChains: ChainEvent[] = [
  ...schoolBullying,
  ...rebelliousPhase,
  ...influencerMoment,
  ...burnoutArc,
  ...therapyArc,
];
