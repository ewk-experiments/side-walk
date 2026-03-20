import type { GameEvent } from '../../types/event';

export interface ChainEvent extends GameEvent {
  chainId: string;
  chainStep: number;
  chainTotal: number;
}

// Chain 1: Dead-End Job (3 steps)
const deadEndJob: ChainEvent[] = [
  {
    id: 'career-deadend-1',
    chainId: 'dead-end-job',
    chainStep: 1,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'work',
    weight: 0.6,
    requirements: { minAge: 18, maxAge: 28 },
    text: 'You got a job at a big box retail store. The uniform is ugly, the manager is worse, and every shift feels like it\'s 47 hours long. But hey — it\'s a paycheck.',
    choices: [
      {
        id: 'deadend-grind',
        label: 'Put your head down and grind',
        effects: { money: 5, happiness: -10, stress: 15 },
        nextChainId: 'career-deadend-2',
        resultText: 'Months blur together. You can zone-fold a shirt in 3 seconds flat. Is this a skill?'
      },
      {
        id: 'deadend-slack',
        label: 'Do the bare minimum and clock out mentally',
        effects: { money: 3, happiness: -5, stress: 5 },
        nextChainId: 'career-deadend-2',
        resultText: 'You become a master of looking busy. The back stockroom becomes your sanctuary.'
      }
    ]
  },
  {
    id: 'career-deadend-2',
    chainId: 'dead-end-job',
    chainStep: 2,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'work',
    weight: 0.7,
    text: 'Two years in. The manager offers you a "promotion" to shift lead. $0.75 more per hour, twice the responsibility, and a lanyard that says LEAD.',
    choices: [
      {
        id: 'deadend-accept',
        label: 'Take the promotion',
        effects: { money: 3, stress: 15, reputation: 5 },
        nextChainId: 'career-deadend-3',
        resultText: 'You now get to deal with angry customers AND angry coworkers. The lanyard is not worth it.'
      },
      {
        id: 'deadend-decline',
        label: 'Decline and start looking for something else',
        effects: { stress: -5, smarts: 5 },
        nextChainId: 'career-deadend-3',
        resultText: 'You start updating your resume at night. There has to be more than this.'
      }
    ]
  },
  {
    id: 'career-deadend-3',
    chainId: 'dead-end-job',
    chainStep: 3,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'work',
    weight: 0.7,
    text: 'A friend from high school posts about their new tech job. Meanwhile, you\'re restocking shelves at 6 AM. The comparison stings. Something has to change.',
    choices: [
      {
        id: 'deadend-educate',
        label: 'Enroll in community college night classes',
        effects: { smarts: 15, money: -10, stress: 10, happiness: 10 },
        addConditions: ['pursuing-education'],
        resultText: 'The first class is terrifying. But the professor says something that clicks, and you remember what it felt like to learn.'
      },
      {
        id: 'deadend-hustle',
        label: 'Start a side hustle — anything to escape retail',
        effects: { money: 5, stress: 15, smarts: 5 },
        addConditions: ['side-hustle'],
        resultText: 'You start reselling stuff online. It\'s not glamorous, but it\'s yours.'
      },
      {
        id: 'deadend-accept-fate',
        label: 'This is fine. Not everyone needs a dream job.',
        effects: { happiness: -5, stress: -10 },
        resultText: 'You make peace with it. The job pays rent. Some days that\'s enough.'
      }
    ]
  }
];

// Chain 2: Startup Dream (5 steps)
const startupDream: ChainEvent[] = [
  {
    id: 'career-startup-1',
    chainId: 'startup-dream',
    chainStep: 1,
    chainTotal: 5,
    stage: 'youngAdult',
    category: 'work',
    weight: 0.4,
    requirements: { minAge: 20, maxAge: 35 },
    text: 'You have an idea. It keeps you up at night. You fill notebooks with sketches, business models, projections. Your roommate is getting tired of hearing about it.',
    choices: [
      {
        id: 'startup-go',
        label: 'Quit your job and go all in',
        effects: { happiness: 15, money: -15, stress: 25 },
        nextChainId: 'career-startup-2',
        resultText: 'Your savings account screams as you drain it. But the first day working on YOUR thing? Electric.'
      },
      {
        id: 'startup-side',
        label: 'Work on it nights and weekends',
        effects: { happiness: 5, stress: 15 },
        nextChainId: 'career-startup-2',
        resultText: 'Sleep becomes optional. Coffee becomes a food group. But the prototype is coming together.'
      }
    ]
  },
  {
    id: 'career-startup-2',
    chainId: 'startup-dream',
    chainStep: 2,
    chainTotal: 5,
    stage: 'youngAdult',
    category: 'work',
    weight: 0.7,
    text: 'You launch. Crickets. Then one user. Then ten. A tech blog writes a tiny mention. Your mom shares it on Facebook. It\'s not viral, but it\'s real.',
    choices: [
      {
        id: 'startup-push',
        label: 'Double down — this is working',
        effects: { stress: 20, happiness: 10, money: -10 },
        nextChainId: 'career-startup-3',
        resultText: 'You burn through savings faster than expected. But the user count keeps ticking up.'
      },
      {
        id: 'startup-funding',
        label: 'Start pitching investors',
        effects: { stress: 15, reputation: 10 },
        nextChainId: 'career-startup-3',
        resultText: '47 rejections. Then one "yes." A small angel check that buys you six more months.'
      }
    ]
  },
  {
    id: 'career-startup-3',
    chainId: 'startup-dream',
    chainStep: 3,
    chainTotal: 5,
    stage: 'youngAdult',
    category: 'work',
    weight: 0.7,
    text: 'Growing pains. You need to hire but can barely pay yourself. A big company reaches out — they want to acquire your product for a decent sum. Not life-changing money, but real money.',
    choices: [
      {
        id: 'startup-sell',
        label: 'Take the acquisition offer',
        effects: { money: 40, happiness: 10, stress: -25 },
        resultText: 'You sign the papers. Relief and grief in equal measure. Your baby is someone else\'s now. But your bank account has never looked this good.'
      },
      {
        id: 'startup-keep',
        label: 'Reject it — you\'re not done yet',
        effects: { stress: 20, reputation: 10 },
        nextChainId: 'career-startup-4',
        resultText: '"Are you insane?" your parents ask. Maybe. But you didn\'t start this to sell it at chapter two.'
      }
    ]
  },
  {
    id: 'career-startup-4',
    chainId: 'startup-dream',
    chainStep: 4,
    chainTotal: 5,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'Two years later. You have a small team, real revenue, and bags under your eyes that could carry groceries. A major competitor launches a copycat product with 100x your marketing budget.',
    choices: [
      {
        id: 'startup-pivot',
        label: 'Pivot to something they can\'t copy',
        effects: { smarts: 10, stress: 15, money: -10 },
        nextChainId: 'career-startup-5',
        resultText: 'You rethink everything in a caffeine-fueled weekend. The pivot is risky, but it feels right.'
      },
      {
        id: 'startup-outwork',
        label: 'Outwork them — move faster, ship more',
        effects: { stress: 25, health: -10, reputation: 5 },
        nextChainId: 'career-startup-5',
        resultText: 'Your team rallies. You ship features at a pace that surprises even you. But the burnout is real.'
      }
    ]
  },
  {
    id: 'career-startup-5',
    chainId: 'startup-dream',
    chainStep: 5,
    chainTotal: 5,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'Five years from that first napkin sketch. You\'re profitable. Not a unicorn, not on magazine covers. But you built something real that people use every day. An email comes in: "Your product changed my workflow. Thank you."',
    choices: [
      {
        id: 'startup-scale',
        label: 'Keep building. The best is ahead.',
        effects: { happiness: 20, money: 15, reputation: 15, stress: 5 },
        addConditions: ['founder'],
        resultText: 'You hire your 20th employee. The office has a coffee machine that actually works. You made it.'
      },
      {
        id: 'startup-exit',
        label: 'It\'s time to move on to the next thing',
        effects: { happiness: 10, money: 30, stress: -20 },
        addConditions: ['serial-entrepreneur'],
        resultText: 'You find a buyer who loves the product as much as you do. The wire hits your account. Now what?'
      }
    ]
  }
];

// Chain 3: Office Promotion (3 steps)
const officePromotion: ChainEvent[] = [
  {
    id: 'career-promo-1',
    chainId: 'office-promotion',
    chainStep: 1,
    chainTotal: 3,
    stage: 'adult',
    category: 'work',
    weight: 0.6,
    requirements: { minAge: 26, maxAge: 45 },
    text: 'Your boss pulls you aside. "There\'s a senior position opening up. I think you should apply." It would mean more money, more visibility... and managing people.',
    choices: [
      {
        id: 'promo-apply',
        label: 'Apply for the promotion',
        effects: { stress: 10, reputation: 5 },
        nextChainId: 'career-promo-2',
        resultText: 'You polish your resume, practice your pitch, and submit. Now you wait.'
      },
      {
        id: 'promo-pass',
        label: 'Pass — you like your current role',
        effects: { happiness: 5, stress: -5 },
        resultText: 'Your boss looks surprised but nods. "Okay. The offer stands if you change your mind."'
      }
    ]
  },
  {
    id: 'career-promo-2',
    chainId: 'office-promotion',
    chainStep: 2,
    chainTotal: 3,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'You got it. First week as a manager. Your former peers now report to you. One of them — someone who also applied — is visibly resentful. The team meeting is tense.',
    choices: [
      {
        id: 'promo-address',
        label: 'Take them aside for an honest conversation',
        effects: { stress: 10, reputation: 10, smarts: 5 },
        nextChainId: 'career-promo-3',
        resultText: '"I get it. I\'d feel the same way." They thaw slightly. It\'s a start.'
      },
      {
        id: 'promo-ignore',
        label: 'Ignore it — they\'ll get over it',
        effects: { stress: 5, reputation: -5 },
        nextChainId: 'career-promo-3',
        resultText: 'They don\'t get over it. The passive aggression in Slack is an art form.'
      }
    ]
  },
  {
    id: 'career-promo-3',
    chainId: 'office-promotion',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'A year in management. You realize: you miss actually doing the work. Meetings consume your calendar. Your team is doing great, but you feel like a paper-pusher.',
    choices: [
      {
        id: 'promo-embrace',
        label: 'Embrace the leadership role — this IS the work now',
        effects: { happiness: 5, reputation: 10, smarts: 5, stress: 5 },
        addConditions: ['management-track'],
        resultText: 'You read three leadership books, start doing 1:1s properly, and find meaning in watching your team succeed.'
      },
      {
        id: 'promo-stepdown',
        label: 'Ask to move to a senior IC role instead',
        effects: { happiness: 10, reputation: -5, stress: -15 },
        addConditions: ['senior-ic'],
        resultText: 'Your boss is confused but supportive. You take a lateral move and immediately feel lighter.'
      }
    ]
  }
];

// Chain 4: Layoff Spiral (4 steps)
const layoffSpiral: ChainEvent[] = [
  {
    id: 'career-layoff-1',
    chainId: 'layoff-spiral',
    chainStep: 1,
    chainTotal: 4,
    stage: 'adult',
    category: 'work',
    weight: 0.4,
    requirements: { minAge: 28, maxAge: 55 },
    text: 'Friday afternoon. An all-hands meeting appears on the calendar with no description. Your stomach drops. "We\'re restructuring," the CEO says. Your entire team is being eliminated.',
    choices: [
      {
        id: 'layoff-grace',
        label: 'Take it with grace. These things happen.',
        effects: { happiness: -15, stress: 15, reputation: 5 },
        nextChainId: 'career-layoff-2',
        resultText: 'You pack your desk in a cardboard box. The security escort to the door is humiliating.'
      },
      {
        id: 'layoff-rage',
        label: 'Let them know exactly how you feel',
        effects: { happiness: -10, stress: 20, reputation: -10 },
        nextChainId: 'career-layoff-2',
        resultText: 'The reply-all email felt great for 30 seconds. The regret lasts much longer.'
      }
    ]
  },
  {
    id: 'career-layoff-2',
    chainId: 'layoff-spiral',
    chainStep: 2,
    chainTotal: 4,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'Week three of unemployment. You apply to 40 jobs. Three auto-rejections. Two ghostings. One interview where they ask you to do 8 hours of free work as a "take-home test."',
    choices: [
      {
        id: 'layoff-do-test',
        label: 'Do the test — you need this',
        effects: { stress: 15, smarts: 5, happiness: -10 },
        nextChainId: 'career-layoff-3',
        resultText: 'You spend the weekend on it. They never respond.'
      },
      {
        id: 'layoff-decline-test',
        label: 'Decline and keep applying elsewhere',
        effects: { stress: 5, happiness: -5 },
        nextChainId: 'career-layoff-3',
        resultText: 'Self-respect is expensive when rent is due. But you feel okay about the decision.'
      }
    ]
  },
  {
    id: 'career-layoff-3',
    chainId: 'layoff-spiral',
    chainStep: 3,
    chainTotal: 4,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'Month three. Savings dwindling. You start skipping social events to save money. A friend offers to connect you with someone at their company, but it\'s in a completely different field.',
    choices: [
      {
        id: 'layoff-take-referral',
        label: 'Take the referral — beggars can\'t be choosers',
        effects: { money: 5, stress: -10, happiness: 5 },
        nextChainId: 'career-layoff-4',
        resultText: 'The interview goes surprisingly well. Turns out your skills transfer more than you thought.'
      },
      {
        id: 'layoff-hold-out',
        label: 'Hold out for something in your field',
        effects: { money: -10, stress: 15 },
        nextChainId: 'career-layoff-4',
        resultText: 'Two more months of ramen and anxiety. Your field is still frozen.'
      }
    ]
  },
  {
    id: 'career-layoff-4',
    chainId: 'layoff-spiral',
    chainStep: 4,
    chainTotal: 4,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'An offer finally comes. It\'s less money than before, the title is a step down, and the commute is brutal. But it\'s real.',
    choices: [
      {
        id: 'layoff-accept',
        label: 'Accept it. You can build from here.',
        effects: { money: 10, happiness: 10, stress: -20 },
        addConditions: ['employed'],
        removeConditions: ['unemployed'],
        resultText: 'The first paycheck feels like oxygen. You\'re not drowning anymore.'
      },
      {
        id: 'layoff-negotiate',
        label: 'Try to negotiate better terms',
        effects: { stress: 10, smarts: 5 },
        addConditions: ['employed'],
        removeConditions: ['unemployed'],
        resultText: 'They bump the salary 8% and offer remote Fridays. It pays to ask.'
      }
    ]
  }
];

// Chain 5: Midlife Reinvention (3 steps)
const midlifeReinvention: ChainEvent[] = [
  {
    id: 'career-reinvent-1',
    chainId: 'midlife-reinvention',
    chainStep: 1,
    chainTotal: 3,
    stage: 'adult',
    category: 'work',
    weight: 0.4,
    requirements: { minAge: 38, maxAge: 55 },
    text: 'You\'re at your desk, twenty years into a career that used to excite you. You open a spreadsheet and think: "I cannot do this for twenty more years." The thought won\'t go away.',
    choices: [
      {
        id: 'reinvent-explore',
        label: 'Start quietly exploring other paths',
        effects: { happiness: 10, stress: 5, smarts: 5 },
        nextChainId: 'career-reinvent-2',
        resultText: 'You take online courses at night. You go to meetups for an industry you\'ve always been curious about. A spark ignites.'
      },
      {
        id: 'reinvent-suppress',
        label: 'Push the feeling down. You have responsibilities.',
        effects: { happiness: -10, stress: 10 },
        resultText: 'The feeling doesn\'t go away. It just gets quieter. And heavier.'
      }
    ]
  },
  {
    id: 'career-reinvent-2',
    chainId: 'midlife-reinvention',
    chainStep: 2,
    chainTotal: 3,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'You tell people about your plan to switch careers. The reactions are mixed. "At your age?" says one friend. "That\'s brave," says another. Your family is worried about the financial hit.',
    choices: [
      {
        id: 'reinvent-leap',
        label: 'Make the leap — enroll in a program and put in your notice',
        effects: { happiness: 15, money: -20, stress: 20, smarts: 10 },
        nextChainId: 'career-reinvent-3',
        resultText: 'Walking out of that building for the last time feels terrifying and exhilarating.'
      },
      {
        id: 'reinvent-slow',
        label: 'Transition slowly — keep the day job while you build',
        effects: { happiness: 5, stress: 15, smarts: 5 },
        nextChainId: 'career-reinvent-3',
        resultText: 'You\'re running on fumes, working two lives simultaneously. But the runway feels safer.'
      }
    ]
  },
  {
    id: 'career-reinvent-3',
    chainId: 'midlife-reinvention',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    text: 'First day in your new career. You\'re the oldest person in the room by fifteen years. The imposter syndrome is crushing. But when you start talking about the work, something in your chest loosens.',
    choices: [
      {
        id: 'reinvent-thrive',
        label: 'Lean into being a beginner again — it\'s humbling and beautiful',
        effects: { happiness: 20, smarts: 10, stress: -10 },
        addConditions: ['career-reinvented'],
        resultText: 'Your decades of experience give you perspective the younger folks don\'t have. You\'re not behind — you\'re different. And that\'s valuable.'
      },
      {
        id: 'reinvent-doubt',
        label: 'Wonder if you made a terrible mistake',
        effects: { happiness: -5, stress: 15 },
        addConditions: ['career-reinvented'],
        resultText: 'The doubt lingers for months. But one day, a colleague asks for your advice, and you realize: you belong here.'
      }
    ]
  }
];

export const careerChains: ChainEvent[] = [
  ...deadEndJob,
  ...startupDream,
  ...officePromotion,
  ...layoffSpiral,
  ...midlifeReinvention,
];
