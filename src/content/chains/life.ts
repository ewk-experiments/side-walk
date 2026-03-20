import type { GameEvent } from '../../types/event';

export interface ChainEvent extends GameEvent {
  chainId: string;
  chainStep: number;
  chainTotal: number;
}

// Chain 1: Gifted Student Pressure (3 steps)
const giftedStudent: ChainEvent[] = [
  {
    id: 'life-gifted-1',
    chainId: 'gifted-student',
    chainStep: 1,
    chainTotal: 3,
    stage: 'childhood',
    category: 'school',
    weight: 0.5,
    requirements: { minAge: 8, maxAge: 12 },
    text: `Your teacher pulls your parents aside. "Your child is gifted. We'd like to move them to the advanced program." Suddenly everyone expects great things from you. The pressure is subtle but constant.`,
    choices: [
      {
        id: 'gifted-embrace',
        label: 'Embrace it — being smart is your thing',
        effects: { smarts: 15, stress: 10, happiness: 5 },
        nextChainId: 'life-gifted-2',
        resultText: `You breeze through advanced classes. "You're so smart!" becomes the thing adults say to you instead of hello.`
      },
      {
        id: 'gifted-resist',
        label: 'You just want to be normal',
        effects: { smarts: 5, happiness: 5, stress: -5 },
        nextChainId: 'life-gifted-2',
        resultText: 'You deliberately miss questions on tests to stay with your friends. Your parents are confused.'
      }
    ]
  },
  {
    id: 'life-gifted-2',
    chainId: 'gifted-student',
    chainStep: 2,
    chainTotal: 3,
    stage: 'teen',
    category: 'school',
    weight: 0.7,
    text: `High school. For the first time, things are actually hard. You've never had to study before and you don't know how. A B+ on a test sends you into a spiral. "I'm not smart anymore."`,
    choices: [
      {
        id: 'gifted-learn',
        label: 'Learn to study — treat it like a new skill',
        effects: { smarts: 10, stress: 10, happiness: 5 },
        nextChainId: 'life-gifted-3',
        resultText: `It's humbling. You were never taught to work hard at academics. But you figure it out, slowly.`
      },
      {
        id: 'gifted-avoid',
        label: 'Avoid anything you might fail at',
        effects: { smarts: -5, stress: 15, happiness: -10 },
        nextChainId: 'life-gifted-3',
        resultText: `You drop AP classes. Stop raising your hand. If you don't try, you can't fail. Right?`
      }
    ]
  },
  {
    id: 'life-gifted-3',
    chainId: 'gifted-student',
    chainStep: 3,
    chainTotal: 3,
    stage: 'teen',
    category: 'school',
    weight: 0.7,
    text: 'College applications. Your parents are laser-focused on Ivy League. Your guidance counselor asks a simple question nobody has asked before: "What do YOU want?"',
    choices: [
      {
        id: 'gifted-own-path',
        label: 'Apply to schools that excite you, not your parents',
        effects: { happiness: 15, stress: -10, smarts: 5 },
        addConditions: ['self-directed'],
        resultText: 'The fight with your parents is ugly. But the acceptance letter from a school you actually love makes it worth it.'
      },
      {
        id: 'gifted-please',
        label: `Apply where they want. It's not worth the fight.`,
        effects: { happiness: -10, stress: 15, smarts: 5 },
        resultText: `You get in. Everyone is proud. You feel nothing. The campus tour feels like visiting someone else's dream.`
      }
    ]
  }
];

// Chain 2: Scholarship Opportunity (3 steps)
const scholarship: ChainEvent[] = [
  {
    id: 'life-scholarship-1',
    chainId: 'scholarship-opportunity',
    chainStep: 1,
    chainTotal: 3,
    stage: 'teen',
    category: 'school',
    weight: 0.4,
    requirements: { minAge: 16, maxAge: 18 },
    text: `Your counselor stops you in the hall. "There's a full-ride scholarship. It's competitive, and the application is brutal. But I think you have a shot." The deadline is in three weeks.`,
    choices: [
      {
        id: 'scholarship-go',
        label: 'Go for it — all in, three weeks of hell',
        effects: { stress: 20, smarts: 5 },
        nextChainId: 'life-scholarship-2',
        resultText: 'You write essays until your fingers cramp. You beg teachers for recommendation letters. You barely sleep.'
      },
      {
        id: 'scholarship-skip',
        label: 'Too much pressure. Pass.',
        effects: { stress: -5 },
        resultText: 'You watch someone else win it and wonder what if. The thought fades, mostly.'
      }
    ]
  },
  {
    id: 'life-scholarship-2',
    chainId: 'scholarship-opportunity',
    chainStep: 2,
    chainTotal: 3,
    stage: 'teen',
    category: 'school',
    weight: 0.7,
    text: 'You made it to the final round. An in-person interview with the scholarship committee. Three adults in suits across a mahogany table. Your mouth is bone dry.',
    choices: [
      {
        id: 'scholarship-authentic',
        label: 'Be genuine — tell your real story',
        effects: { happiness: 5, stress: 10 },
        nextChainId: 'life-scholarship-3',
        resultText: 'Your voice cracks when you talk about your family. One of the committee members nods slowly. Was that a good nod?'
      },
      {
        id: 'scholarship-polished',
        label: 'Give the polished, rehearsed version',
        effects: { stress: 5, reputation: 5 },
        nextChainId: 'life-scholarship-3',
        resultText: 'Smooth delivery. You hit every talking point. But something felt hollow about it.'
      }
    ]
  },
  {
    id: 'life-scholarship-3',
    chainId: 'scholarship-opportunity',
    chainStep: 3,
    chainTotal: 3,
    stage: 'teen',
    category: 'school',
    weight: 0.7,
    text: 'The letter arrives. Your hands are shaking so badly you can barely open it.',
    choices: [
      {
        id: 'scholarship-win',
        label: 'You got it. Full ride.',
        effects: { happiness: 30, money: 30, stress: -20, reputation: 15 },
        addConditions: ['scholarship-winner'],
        resultText: `Your parent cries. Your counselor cries. You're going to college and it won't cost a dime. Everything just changed.`
      },
      {
        id: 'scholarship-lose',
        label: 'Waitlisted. Not this time.',
        effects: { happiness: -15, stress: 10 },
        resultText: `The rejection stings for weeks. But the process taught you how to fight for something. That muscle doesn't go away.`
      }
    ]
  }
];

// Chain 3: Bad Roommate (3 steps)
const badRoommate: ChainEvent[] = [
  {
    id: 'life-roommate-1',
    chainId: 'bad-roommate',
    chainStep: 1,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'housing',
    weight: 0.6,
    requirements: { minAge: 18, maxAge: 25 },
    text: 'Your new roommate seemed cool during the apartment tour. Two weeks in: they never do dishes, blast music at midnight, and their "girlfriend who visits sometimes" has been here for 11 consecutive days.',
    choices: [
      {
        id: 'roommate-confront',
        label: 'Have a roommate meeting — set ground rules',
        effects: { stress: 10, happiness: -5 },
        nextChainId: 'life-roommate-2',
        resultText: `"Yeah totally, I'll be better about that," they say while eating your leftover pizza.`
      },
      {
        id: 'roommate-passive',
        label: 'Leave passive-aggressive sticky notes everywhere',
        effects: { stress: 15, happiness: -10 },
        nextChainId: 'life-roommate-2',
        resultText: 'The kitchen becomes a war zone of neon Post-its. Neither of you makes eye contact anymore.'
      }
    ]
  },
  {
    id: 'life-roommate-2',
    chainId: 'bad-roommate',
    chainStep: 2,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'housing',
    weight: 0.7,
    text: `Month three. They used your expensive shampoo, shrank your sweater in the dryer, and now they're a month behind on their half of the utilities. You come home to find they've adopted a cat. Your lease says no pets.`,
    choices: [
      {
        id: 'roommate-ultimatum',
        label: 'Give them an ultimatum — shape up or move out',
        effects: { stress: 15, reputation: 5 },
        nextChainId: 'life-roommate-3',
        resultText: 'They get defensive. The apartment becomes a cold war. But the cat is very cute.'
      },
      {
        id: 'roommate-escape',
        label: 'Start looking for a way out yourself',
        effects: { stress: 10, money: -5 },
        nextChainId: 'life-roommate-3',
        resultText: 'You spend every evening on apartment listings, doing the math on breaking the lease.'
      }
    ]
  },
  {
    id: 'life-roommate-3',
    chainId: 'bad-roommate',
    chainStep: 3,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'housing',
    weight: 0.7,
    text: `The lease is up. You're packing your things. Your roommate wanders in looking genuinely confused. "You're leaving? I thought we were cool."`,
    choices: [
      {
        id: 'roommate-honest',
        label: '"We were not cool. At all."',
        effects: { happiness: 10, stress: -15 },
        addConditions: ['learned-boundaries'],
        resultText: `You say what you should have said months ago. It feels liberating. You vow to interview future roommates like you're hiring for a job.`
      },
      {
        id: 'roommate-polite',
        label: '"Yeah it was great. Good luck with everything."',
        effects: { happiness: -5, stress: -10 },
        resultText: `You avoid conflict to the end. But as you close the door for the last time, you exhale a year's worth of tension.`
      }
    ]
  }
];

// Chain 4: Creative Side Hustle (3 steps)
const creativeSideHustle: ChainEvent[] = [
  {
    id: 'life-hustle-1',
    chainId: 'creative-side-hustle',
    chainStep: 1,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'money',
    weight: 0.5,
    requirements: { minAge: 20, maxAge: 35 },
    text: 'You start selling things you make — art, crafts, digital templates, baked goods, whatever your thing is. You set up a little online shop on a whim. First sale: your mom. Second sale: a complete stranger. That second one hits different.',
    choices: [
      {
        id: 'hustle-invest',
        label: 'Invest time and money into growing it',
        effects: { money: -5, happiness: 15, stress: 10 },
        nextChainId: 'life-hustle-2',
        resultText: `You spend weekends creating inventory. Your apartment looks like a workshop. It's chaotic and wonderful.`
      },
      {
        id: 'hustle-casual',
        label: 'Keep it casual — just a fun hobby',
        effects: { happiness: 10, money: 3 },
        nextChainId: 'life-hustle-2',
        resultText: `A sale here and there. Enough for dinner out once a month. It stays fun because there's no pressure.`
      }
    ]
  },
  {
    id: 'life-hustle-2',
    chainId: 'creative-side-hustle',
    chainStep: 2,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'money',
    weight: 0.7,
    text: `A popular account shares your work. Orders flood in. You're thrilled for about 6 hours until you realize you now have 200 orders to fulfill while working a full-time job.`,
    choices: [
      {
        id: 'hustle-grind',
        label: 'Pull all-nighters to fulfill every order',
        effects: { money: 15, stress: 25, health: -10, happiness: 5 },
        nextChainId: 'life-hustle-3',
        resultText: 'You ship everything. Your reviews are glowing. Your body is screaming. Worth it?'
      },
      {
        id: 'hustle-limit',
        label: 'Set a cap and apologize for the rest',
        effects: { money: 8, stress: 5, happiness: 5, reputation: -5 },
        nextChainId: 'life-hustle-3',
        resultText: 'Some people are annoyed. But you deliver quality on what you take, and you can still feel your hands.'
      }
    ]
  },
  {
    id: 'life-hustle-3',
    chainId: 'creative-side-hustle',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'money',
    weight: 0.7,
    text: `The side hustle is now making almost as much as your day job. You're at a crossroads: keep the safety net, or bet on yourself?`,
    choices: [
      {
        id: 'hustle-fulltime',
        label: 'Go full-time on your own thing',
        effects: { happiness: 25, money: 5, stress: 15 },
        addConditions: ['self-employed'],
        resultText: 'No alarm clock. No boss. No safety net. The first Monday feels like flying.'
      },
      {
        id: 'hustle-both',
        label: 'Keep both — the security is too valuable',
        effects: { happiness: 5, money: 10, stress: 10 },
        addConditions: ['side-hustle'],
        resultText: `You're exhausted but financially comfortable. Two incomes, one person. The American dream, apparently.`
      }
    ]
  }
];

// Chain 5: Accidental Parenthood (4 steps)
const accidentalParenthood: ChainEvent[] = [
  {
    id: 'life-parent-1',
    chainId: 'accidental-parenthood',
    chainStep: 1,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'family',
    weight: 0.3,
    requirements: { minAge: 20, maxAge: 35 },
    text: `Two lines on the test. You stare at it for what feels like an hour. This was not the plan. You're barely keeping your own life together.`,
    choices: [
      {
        id: 'parent-keep',
        label: `You're going to figure this out`,
        effects: { stress: 25, happiness: 5, money: -10 },
        nextChainId: 'life-parent-2',
        resultText: 'Terror. Excitement. More terror. You start reading parenting books at 3 AM.'
      },
      {
        id: 'parent-not-ready',
        label: `You're not ready for this`,
        effects: { stress: 15, happiness: -10 },
        resultText: `It's the hardest decision you've ever made. You don't talk about it for years. When you finally do, it's in a therapist's office.`
      }
    ]
  },
  {
    id: 'life-parent-2',
    chainId: 'accidental-parenthood',
    chainStep: 2,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'family',
    weight: 0.7,
    text: 'The baby arrives. You have never been this tired, this scared, or this in love with anything in your life. They fit in the crook of your arm like they were designed to be there.',
    choices: [
      {
        id: 'parent-allout',
        label: 'Pour everything into being a great parent',
        effects: { happiness: 15, stress: 15, money: -10 },
        nextChainId: 'life-parent-3',
        addConditions: ['parent'],
        resultText: 'Your social life evaporates. Your identity shifts. But that first smile? You understand now.'
      },
      {
        id: 'parent-balance',
        label: 'Try to maintain your own identity too',
        effects: { happiness: 10, stress: 20 },
        nextChainId: 'life-parent-3',
        addConditions: ['parent'],
        resultText: `The guilt of leaving them for even an hour is crushing. But your therapist says you can't pour from an empty cup.`
      }
    ]
  },
  {
    id: 'life-parent-3',
    chainId: 'accidental-parenthood',
    chainStep: 3,
    chainTotal: 4,
    stage: 'adult',
    category: 'family',
    weight: 0.7,
    text: `Your kid's first day of school. You watch them walk through the door in their too-big backpack, looking back at you one last time. You wave and smile. You cry in the car.`,
    choices: [
      {
        id: 'parent-hover',
        label: 'Check on them every chance you get',
        effects: { stress: 10, happiness: 5, relationshipDelta: 5 },
        nextChainId: 'life-parent-4',
        resultText: `The teacher politely asks you to stop calling during lunch. "They're doing great, I promise."`
      },
      {
        id: 'parent-trust',
        label: `Trust that they'll be okay`,
        effects: { happiness: 10, stress: -5 },
        nextChainId: 'life-parent-4',
        resultText: 'They come home with a drawing of your family. You are a purple blob with stick legs. It goes on the fridge forever.'
      }
    ]
  },
  {
    id: 'life-parent-4',
    chainId: 'accidental-parenthood',
    chainStep: 4,
    chainTotal: 4,
    stage: 'adult',
    category: 'family',
    weight: 0.7,
    text: `Years later. Your kid is a teenager now — moody, brilliant, infuriating, and so much like you it's scary. They ask, "Was I planned?" You look at them for a long moment.`,
    choices: [
      {
        id: 'parent-truth',
        label: `"No. But you're the best surprise of my life."`,
        effects: { happiness: 20, relationshipDelta: 15 },
        resultText: `They roll their eyes but you catch the smile. "That's so cheesy." They hug you anyway.`
      },
      {
        id: 'parent-deflect',
        label: '"Of course you were planned!" (lie lovingly)',
        effects: { happiness: 10, relationshipDelta: 5 },
        resultText: `They seem satisfied. You think about telling them the truth someday. When they're older. When the time is right.`
      }
    ]
  }
];

// Chain 6: Health Scare (3 steps)
const healthScare: ChainEvent[] = [
  {
    id: 'life-health-scare-1',
    chainId: 'health-scare',
    chainStep: 1,
    chainTotal: 3,
    stage: 'adult',
    category: 'health',
    weight: 0.4,
    requirements: { minAge: 35, maxAge: 65 },
    text: `A routine checkup turns not-so-routine. The doctor pauses mid-sentence, squints at the screen, and says, "I'd like to run some more tests." Those seven words rearrange your entire week.`,
    choices: [
      {
        id: 'health-scare-face',
        label: 'Schedule every test immediately',
        effects: { stress: 20, money: -5, happiness: -10 },
        nextChainId: 'life-health-scare-2',
        resultText: 'You spend a week in waiting rooms. Every Google search makes it worse. You promise yourself you\'ll stop Googling. You don\'t.',
      },
      {
        id: 'health-scare-deny',
        label: 'Put it off — you feel fine',
        effects: { stress: 10, happiness: -5 },
        nextChainId: 'life-health-scare-2',
        resultText: 'You ignore it for two months. The anxiety doesn\'t go away. It just moves into the background, humming.',
      },
    ],
  },
  {
    id: 'life-health-scare-2',
    chainId: 'health-scare',
    chainStep: 2,
    chainTotal: 3,
    stage: 'adult',
    category: 'health',
    weight: 0.7,
    text: `The results come back. It's not the worst-case scenario, but it's not nothing either. Treatment is recommended — pills, lifestyle changes, regular monitoring. "Manageable," the doctor says. You hate that word.`,
    choices: [
      {
        id: 'health-scare-commit',
        label: 'Overhaul your life — diet, exercise, everything',
        effects: { health: 10, happiness: 5, stress: 10, money: -3 },
        addConditions: ['fit'],
        nextChainId: 'life-health-scare-3',
        resultText: 'You become the person who brings salads to BBQs. Your friends are concerned. But the numbers improve.',
      },
      {
        id: 'health-scare-minimum',
        label: 'Take the pills, do the minimum',
        effects: { health: 3, stress: -5 },
        nextChainId: 'life-health-scare-3',
        resultText: 'You take the medication. Mostly remember it. Life goes on, but with a new pill organizer on the nightstand.',
      },
    ],
  },
  {
    id: 'life-health-scare-3',
    chainId: 'health-scare',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'health',
    weight: 0.7,
    text: `A year later. Follow-up appointment. The doctor looks at the chart, then at you. A small nod.`,
    choices: [
      {
        id: 'health-scare-clear',
        label: '"Looking good. Really good, actually."',
        effects: { health: 15, happiness: 20, stress: -15 },
        resultText: 'Relief hits you in the parking lot. You sit in your car and cry. Then you call someone you love.',
      },
      {
        id: 'health-scare-chronic',
        label: '"We\'ll need to keep monitoring this."',
        effects: { health: 5, happiness: -5, stress: 5 },
        addConditions: ['chronic condition'],
        resultText: 'It\'s not going away. But you\'re here. You learn to live with the uncertainty. Most days, you forget about it.',
      },
    ],
  },
];

// Chain 7: Starting a Business (4 steps)
const startingBusiness: ChainEvent[] = [
  {
    id: 'life-business-1',
    chainId: 'starting-business',
    chainStep: 1,
    chainTotal: 4,
    stage: 'adult',
    category: 'money',
    weight: 0.4,
    requirements: { minAge: 25, maxAge: 50, moneyMin: 5000 },
    text: `3 AM. You can't sleep. Not from anxiety — from excitement. You've been sketching this idea for months. A business. YOUR business. The spreadsheet says it could work. Your gut says it will.`,
    choices: [
      {
        id: 'business-go',
        label: 'Quit your job and go all in',
        effects: { happiness: 15, stress: 20, money: -10 },
        nextChainId: 'life-business-2',
        resultText: 'You file the LLC paperwork with shaking hands. Your family thinks you\'re crazy. Maybe you are.',
      },
      {
        id: 'business-safe',
        label: 'Start it on the side first',
        effects: { happiness: 10, stress: 15 },
        nextChainId: 'life-business-2',
        resultText: 'Nights and weekends. Every spare hour goes into this. It\'s exhausting but the dream stays alive.',
      },
    ],
  },
  {
    id: 'life-business-2',
    chainId: 'starting-business',
    chainStep: 2,
    chainTotal: 4,
    stage: 'adult',
    category: 'money',
    weight: 0.7,
    text: `Launch day. You put it out into the world. The first day: 3 sales. You thought there'd be more. The second week: silence. The imposter syndrome hits like a truck.`,
    choices: [
      {
        id: 'business-pivot',
        label: 'Listen to feedback and pivot hard',
        effects: { smarts: 5, stress: 10, happiness: -5 },
        nextChainId: 'life-business-3',
        resultText: 'You rebuild half of it. It hurts to kill your darlings, but the new version is better. People notice.',
      },
      {
        id: 'business-persist',
        label: 'Stay the course — it needs time',
        effects: { stress: 15, happiness: -10 },
        nextChainId: 'life-business-3',
        resultText: 'You keep showing up. Every day. Some weeks the revenue barely covers coffee. But you keep showing up.',
      },
    ],
  },
  {
    id: 'life-business-3',
    chainId: 'starting-business',
    chainStep: 3,
    chainTotal: 4,
    stage: 'adult',
    category: 'money',
    weight: 0.7,
    text: `Month 8. You're running out of savings. A competitor launches something similar with 10x the funding. Your partner asks when the business will "start working." The walls are closing in.`,
    choices: [
      {
        id: 'business-double-down',
        label: 'Take a loan and double down',
        effects: { money: -15, stress: 25, happiness: -5 },
        nextChainId: 'life-business-4',
        resultText: 'All chips on the table. If this doesn\'t work, you\'re in real trouble.',
      },
      {
        id: 'business-lean',
        label: 'Cut everything to the bone and survive',
        effects: { money: -3, stress: 15 },
        nextChainId: 'life-business-4',
        resultText: 'Ramen budget. Cancel every subscription. But the runway extends. Barely.',
      },
    ],
  },
  {
    id: 'life-business-4',
    chainId: 'starting-business',
    chainStep: 4,
    chainTotal: 4,
    stage: 'adult',
    category: 'money',
    weight: 0.7,
    text: `One year in. You look at the numbers. Really look at them.`,
    choices: [
      {
        id: 'business-success',
        label: 'It\'s working. Actually working.',
        effects: { money: 30, happiness: 25, stress: -10, reputation: 15 },
        addConditions: ['self-employed'],
        resultText: 'Profitability. The word tastes like champagne. You built something real. From nothing. From a 3 AM idea.',
      },
      {
        id: 'business-fail',
        label: 'It\'s not. Time to close up shop.',
        effects: { money: -10, happiness: -15, stress: -10, smarts: 10 },
        resultText: 'Shutting it down is the hardest thing you\'ve done. But the lessons? Nobody can take those from you. You\'ll be back.',
      },
    ],
  },
];

// Chain 8: Moving Abroad (3 steps)
const movingAbroad: ChainEvent[] = [
  {
    id: 'life-abroad-1',
    chainId: 'moving-abroad',
    chainStep: 1,
    chainTotal: 3,
    stage: 'youngAdult',
    category: 'social',
    weight: 0.35,
    requirements: { minAge: 22, maxAge: 40 },
    text: `An opportunity lands in your inbox. A job offer — or maybe just a wild idea from a friend. Either way, it's in another country. Another continent. Everything in your life would change.`,
    choices: [
      {
        id: 'abroad-go',
        label: 'Take the leap. Book the one-way ticket.',
        effects: { happiness: 10, stress: 20, money: -8 },
        nextChainId: 'life-abroad-2',
        resultText: 'You sell half your stuff. The airport goodbye is brutal. The plane takes off and suddenly you\'re someone new.',
      },
      {
        id: 'abroad-stay',
        label: 'Too much to leave behind right now',
        effects: { happiness: -5, stress: -5 },
        resultText: 'You close the tab. Life goes on. Sometimes you wonder what would have happened.',
      },
    ],
  },
  {
    id: 'life-abroad-2',
    chainId: 'moving-abroad',
    chainStep: 2,
    chainTotal: 3,
    stage: 'adult',
    category: 'social',
    weight: 0.7,
    text: `Month 3 abroad. The honeymoon phase is over. You can't read the labels at the grocery store. You miss your friends at 3 AM. The loneliness is a physical thing, sitting on your chest.`,
    choices: [
      {
        id: 'abroad-embrace',
        label: 'Push through — join local groups, learn the language',
        effects: { smarts: 10, happiness: 5, stress: 10, reputation: 5 },
        nextChainId: 'life-abroad-3',
        resultText: 'You butcher the language beautifully. Locals love it. You find your people — a weird mix of expats and kind strangers.',
      },
      {
        id: 'abroad-bubble',
        label: 'Stick to the expat bubble — comfort first',
        effects: { happiness: 5, stress: -5 },
        nextChainId: 'life-abroad-3',
        resultText: 'You find other foreigners fast. The comfort is real, but sometimes it feels like you\'re living abroad without actually living there.',
      },
    ],
  },
  {
    id: 'life-abroad-3',
    chainId: 'moving-abroad',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'social',
    weight: 0.7,
    text: `A year in. The place feels like home now — or close to it. Then your mom calls. Something in her voice. "We miss you." Your old life is pulling.`,
    choices: [
      {
        id: 'abroad-settle',
        label: 'Stay. This is your life now.',
        effects: { happiness: 15, smarts: 5, reputation: 10 },
        addConditions: ['expat'],
        resultText: 'You renew the lease. Learn to make the local dish. Your accent starts changing. Home is where you build it.',
      },
      {
        id: 'abroad-return',
        label: 'Go home. You proved you could do it.',
        effects: { happiness: 10, stress: -10, smarts: 5 },
        resultText: 'The airport return hits different. Everything looks smaller. You\'re not the same person who left. That part is permanent.',
      },
    ],
  },
];

// Chain 9: Writing a Book (3 steps)
const writingBook: ChainEvent[] = [
  {
    id: 'life-book-1',
    chainId: 'writing-book',
    chainStep: 1,
    chainTotal: 3,
    stage: 'adult',
    category: 'social',
    weight: 0.35,
    requirements: { minAge: 28, maxAge: 65 },
    text: `The idea has been rattling around in your head for years. A book. YOUR book. Maybe a novel, maybe a memoir, maybe something that doesn't have a genre yet. You open a blank document.`,
    choices: [
      {
        id: 'book-start',
        label: 'Start writing. Every day. No excuses.',
        effects: { happiness: 10, stress: 10, smarts: 5 },
        nextChainId: 'life-book-2',
        resultText: 'Chapter one pours out of you. It\'s messy and alive. You haven\'t felt this way about anything in a long time.',
      },
      {
        id: 'book-outline',
        label: 'Plan it out first — research, outline, structure',
        effects: { smarts: 5, stress: 5 },
        nextChainId: 'life-book-2',
        resultText: 'The outline grows to 40 pages. It\'s a beautiful outline. You haven\'t written a single sentence of the actual book yet.',
      },
    ],
  },
  {
    id: 'life-book-2',
    chainId: 'writing-book',
    chainStep: 2,
    chainTotal: 3,
    stage: 'adult',
    category: 'social',
    weight: 0.7,
    text: `Month 6. You're deep in the middle. The "messy middle" they warned you about. Some days the words flow. Most days they don't. You've rewritten chapter 4 eleven times.`,
    choices: [
      {
        id: 'book-push',
        label: 'Push through — finish the ugly first draft',
        effects: { stress: 15, happiness: 5, smarts: 5 },
        nextChainId: 'life-book-3',
        resultText: 'You write "THE END" at 2 AM on a Tuesday. It\'s terrible. It\'s done. You cry a little.',
      },
      {
        id: 'book-perfect',
        label: 'Keep polishing — it has to be perfect',
        effects: { stress: 20, happiness: -5, smarts: 3 },
        nextChainId: 'life-book-3',
        resultText: 'A year later, you\'re still on chapter 12 of 20. Every sentence is beautiful. At this rate, you\'ll finish in 2035.',
      },
    ],
  },
  {
    id: 'life-book-3',
    chainId: 'writing-book',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'social',
    weight: 0.7,
    text: `The manuscript is done. You send it out. Query letters to agents, or straight to publishers. Then you wait. And wait. And check your email 47 times a day.`,
    choices: [
      {
        id: 'book-published',
        label: 'An agent writes back. "I loved it."',
        effects: { happiness: 25, money: 15, reputation: 20, stress: -10 },
        resultText: 'Published. Your name on a spine. You walk into a bookstore and there it is. You stand there for twenty minutes pretending to browse.',
      },
      {
        id: 'book-rejected',
        label: '47 rejections. The silence is deafening.',
        effects: { happiness: -10, stress: 5, smarts: 5 },
        resultText: 'You self-publish. Sales are modest. But strangers read your words. A teenager emails: "Your book changed how I see things." That one email makes it all worth it.',
      },
    ],
  },
];

// Chain 10: Adopting a Child (3 steps)
const adoptingChild: ChainEvent[] = [
  {
    id: 'life-adopt-1',
    chainId: 'adopting-child',
    chainStep: 1,
    chainTotal: 3,
    stage: 'adult',
    category: 'family',
    weight: 0.3,
    requirements: { minAge: 28, maxAge: 50, moneyMin: 10000 },
    text: `You've been thinking about it for a while. Adoption. The idea started small — a passing thought — and grew into something you can't ignore. There are so many kids who need a home.`,
    choices: [
      {
        id: 'adopt-start',
        label: 'Start the process. You\'re ready.',
        effects: { happiness: 10, stress: 15, money: -8 },
        nextChainId: 'life-adopt-2',
        resultText: 'Paperwork. Background checks. Home visits. Interviews. They want to make sure you\'re worthy. It feels like applying for the most important job in the world.',
      },
      {
        id: 'adopt-wait',
        label: 'Not yet. But someday.',
        effects: { happiness: -3 },
        resultText: 'You bookmark the agency website. Maybe next year. Maybe when things are more stable. The tab stays open for months.',
      },
    ],
  },
  {
    id: 'life-adopt-2',
    chainId: 'adopting-child',
    chainStep: 2,
    chainTotal: 3,
    stage: 'adult',
    category: 'family',
    weight: 0.7,
    text: `The waiting list. Months of silence. You paint the spare room and then worry you painted it too early. What if it doesn't happen? The social worker calls. "We have a match."`,
    choices: [
      {
        id: 'adopt-meet',
        label: 'Meet the child. Everything changes in one afternoon.',
        effects: { happiness: 20, stress: 15, money: -5 },
        nextChainId: 'life-adopt-3',
        resultText: 'They\'re shy. Smaller than the photo. They hold your finger and something in your chest rearranges itself permanently.',
      },
      {
        id: 'adopt-hesitate',
        label: 'Hesitate. What if you\'re not enough?',
        effects: { stress: 20, happiness: -5 },
        nextChainId: 'life-adopt-3',
        resultText: 'The doubt is paralyzing. Then you meet them anyway. And the doubt dissolves. Not completely. But enough.',
      },
    ],
  },
  {
    id: 'life-adopt-3',
    chainId: 'adopting-child',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'family',
    weight: 0.7,
    text: `The finalization day. A courtroom. A judge. Your child — YOUR child — sitting on your lap in an outfit you picked out three days ago. The judge signs the paper and bangs the gavel.`,
    choices: [
      {
        id: 'adopt-celebrate',
        label: 'You have a family. It\'s official.',
        effects: { happiness: 30, stress: -10, money: -5 },
        addConditions: ['parent'],
        resultText: 'Everyone in the courtroom claps. Your kid looks confused and then giggles. You will remember this sound for the rest of your life.',
      },
      {
        id: 'adopt-quiet',
        label: 'Take a quiet moment. Just the two of you.',
        effects: { happiness: 25, stress: -15 },
        addConditions: ['parent'],
        resultText: 'In the car, you look in the rearview mirror. They\'re asleep in their car seat. You drive home at exactly the speed limit. Your family is in this car.',
      },
    ],
  },
];

export const lifeChains: ChainEvent[] = [
  ...giftedStudent,
  ...scholarship,
  ...badRoommate,
  ...creativeSideHustle,
  ...accidentalParenthood,
  ...healthScare,
  ...startingBusiness,
  ...movingAbroad,
  ...writingBook,
  ...adoptingChild,
];
