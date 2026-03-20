import type { GameEvent } from '../../types/event';

export interface ChainEvent extends GameEvent {
  chainId: string;
  chainStep: number;
  chainTotal: number;
}

// Chain 1: Teen Romance (3 steps)
const teenRomance: ChainEvent[] = [
  {
    id: 'romance-teen-1',
    chainId: 'teen-romance',
    chainStep: 1,
    chainTotal: 3,
    stage: 'teen',
    category: 'romance',
    weight: 0.7,
    requirements: { minAge: 14, maxAge: 17 },
    text: 'Someone in your class keeps glancing at you during lunch. Your friend nudges you — "They totally like you." Your stomach does a backflip.',
    choices: [
      {
        id: 'teen-rom-approach',
        label: 'Slide into their DMs after school',
        effects: { happiness: 10, stress: 5 },
        nextChainId: 'romance-teen-2',
        resultText: 'You spend the whole night texting. Your heart is racing.'
      },
      {
        id: 'teen-rom-ignore',
        label: 'Play it cool and pretend not to notice',
        effects: { happiness: -5, stress: -5 },
        resultText: 'You chicken out. The moment passes.'
      }
    ]
  },
  {
    id: 'romance-teen-2',
    chainId: 'teen-romance',
    chainStep: 2,
    chainTotal: 3,
    stage: 'teen',
    category: 'romance',
    weight: 0.8,
    text: 'You\'ve been dating for a few months now. Everything feels electric. They ask you to the school dance, but your best friend is jealous and hasn\'t been invited by anyone.',
    choices: [
      {
        id: 'teen-rom-dance-yes',
        label: 'Go to the dance together, your friend will understand',
        effects: { happiness: 15, relationshipDelta: 10 },
        nextChainId: 'romance-teen-3',
        resultText: 'Best night of your life. Slow dance under cheap streamers. Perfect.'
      },
      {
        id: 'teen-rom-dance-group',
        label: 'Suggest everyone goes as a group',
        effects: { happiness: 8, relationshipDelta: -5 },
        nextChainId: 'romance-teen-3',
        resultText: 'Diplomacy wins. Everyone has an okay time, but your date seems a little disappointed.'
      }
    ]
  },
  {
    id: 'romance-teen-3',
    chainId: 'teen-romance',
    chainStep: 3,
    chainTotal: 3,
    stage: 'teen',
    category: 'romance',
    weight: 0.8,
    text: 'Summer\'s ending. They\'re moving to a different city because of their parent\'s job. You have one last weekend together.',
    choices: [
      {
        id: 'teen-rom-promise',
        label: 'Promise to do long distance',
        effects: { happiness: -10, stress: 15 },
        addConditions: ['long-distance-relationship'],
        resultText: 'You both cry at the bus station. The texts start strong but slowly fade over the next few months.'
      },
      {
        id: 'teen-rom-letgo',
        label: 'Accept it and say a proper goodbye',
        effects: { happiness: -5, smarts: 5 },
        resultText: 'You hug for what feels like forever. It hurts, but you feel strangely grown up.'
      }
    ]
  }
];

// Chain 2: Toxic Relationship (4 steps)
const toxicRelationship: ChainEvent[] = [
  {
    id: 'romance-toxic-1',
    chainId: 'toxic-relationship',
    chainStep: 1,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'romance',
    weight: 0.5,
    requirements: { minAge: 19, maxAge: 28 },
    text: 'You meet someone magnetic at a party. They\'re charming, intense, and completely focused on you. "I\'ve never met anyone like you," they say within the first hour.',
    choices: [
      {
        id: 'toxic-fall',
        label: 'Fall hard and fast',
        effects: { happiness: 20, stress: 5 },
        nextChainId: 'romance-toxic-2',
        resultText: 'The first few weeks are a whirlwind. They text constantly. It feels amazing to be wanted this much.'
      },
      {
        id: 'toxic-cautious',
        label: 'Keep your guard up — something feels off',
        effects: { happiness: 5, smarts: 5 },
        resultText: 'You exchange numbers but keep your distance. Smart move.'
      }
    ]
  },
  {
    id: 'romance-toxic-2',
    chainId: 'toxic-relationship',
    chainStep: 2,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'romance',
    weight: 0.8,
    text: 'Six months in. They get upset when you hang out with friends without them. "I just love you so much, I can\'t stand being apart." Your friends are starting to worry.',
    choices: [
      {
        id: 'toxic-stay',
        label: 'They just care a lot. It\'s fine.',
        effects: { happiness: -10, stress: 20, relationshipDelta: -15 },
        nextChainId: 'romance-toxic-3',
        resultText: 'You stop seeing your friends as much. It\'s easier that way.'
      },
      {
        id: 'toxic-confront',
        label: 'Set a boundary — you need your own life too',
        effects: { happiness: -5, stress: 15 },
        nextChainId: 'romance-toxic-3',
        resultText: 'They explode, then cry, then apologize with flowers. The cycle begins.'
      }
    ]
  },
  {
    id: 'romance-toxic-3',
    chainId: 'toxic-relationship',
    chainStep: 3,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'romance',
    weight: 0.8,
    text: 'A year in. You barely recognize yourself. They control the finances, check your phone, and you walk on eggshells every day. A friend reaches out: "We miss you. Are you okay?"',
    choices: [
      {
        id: 'toxic-leave',
        label: 'Break down and admit you need help',
        effects: { happiness: -15, stress: -10 },
        nextChainId: 'romance-toxic-4',
        resultText: 'Your friend comes to pick you up that night. You leave with one bag and a shattered sense of self.'
      },
      {
        id: 'toxic-denial',
        label: '"I\'m fine, really. We\'re working on things."',
        effects: { happiness: -20, stress: 25, health: -10 },
        resultText: 'The isolation deepens. You lose another year before you finally leave.'
      }
    ]
  },
  {
    id: 'romance-toxic-4',
    chainId: 'toxic-relationship',
    chainStep: 4,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'romance',
    weight: 0.8,
    text: 'Months after leaving. You\'re staying with a friend. Some days you feel free. Other days you almost call them. Your phone buzzes — it\'s them: "I\'ve changed. Please come back."',
    choices: [
      {
        id: 'toxic-block',
        label: 'Block their number. Don\'t look back.',
        effects: { happiness: 10, stress: -20, smarts: 10 },
        addConditions: ['survived-toxic-relationship'],
        resultText: 'Your hands shake as you hit block. But for the first time in a long time, you can breathe.'
      },
      {
        id: 'toxic-respond',
        label: 'Maybe they really have changed...',
        effects: { happiness: -15, stress: 20 },
        resultText: 'They haven\'t changed. But this time, you leave after two weeks instead of two years. Progress.'
      }
    ]
  }
];

// Chain 3: Stable Marriage (4 steps)
const stableMarriage: ChainEvent[] = [
  {
    id: 'romance-stable-1',
    chainId: 'stable-marriage',
    chainStep: 1,
    chainTotal: 4,
    stage: 'youngAdult',
    category: 'romance',
    weight: 0.6,
    requirements: { minAge: 24, maxAge: 35 },
    text: 'You\'ve been with your partner for two years. It\'s not fireworks every day, but it\'s warm. Steady. They suggest moving in together.',
    choices: [
      {
        id: 'stable-movein',
        label: 'Move in together',
        effects: { happiness: 10, money: 5, stress: 5 },
        nextChainId: 'romance-stable-2',
        resultText: 'The first month is an adjustment. They leave dishes in the sink. You hog the blankets. But waking up next to them feels right.'
      },
      {
        id: 'stable-wait',
        label: 'Not yet — you like your own space',
        effects: { happiness: -5, relationshipDelta: -10 },
        resultText: 'They understand, but you can tell they\'re a little hurt.'
      }
    ]
  },
  {
    id: 'romance-stable-2',
    chainId: 'stable-marriage',
    chainStep: 2,
    chainTotal: 4,
    stage: 'adult',
    category: 'romance',
    weight: 0.7,
    text: 'A quiet Tuesday night. You\'re doing dishes, they\'re on the couch reading. It hits you — this is it. This is the person. You find a ring online later that night.',
    choices: [
      {
        id: 'stable-propose',
        label: 'Plan a proposal',
        effects: { happiness: 25, money: -8, stress: 10 },
        nextChainId: 'romance-stable-3',
        resultText: 'They say yes before you even finish the question. You\'re both crying and laughing.'
      },
      {
        id: 'stable-wait-more',
        label: 'Close the tab. Not ready yet.',
        effects: { stress: -5 },
        resultText: 'The moment passes. Maybe next year.'
      }
    ]
  },
  {
    id: 'romance-stable-3',
    chainId: 'stable-marriage',
    chainStep: 3,
    chainTotal: 4,
    stage: 'adult',
    category: 'romance',
    weight: 0.7,
    text: 'Wedding planning is chaos. Their family wants a big event. Your family wants something intimate. The budget is already triple what you planned.',
    choices: [
      {
        id: 'stable-big-wedding',
        label: 'Go big — you only do this once',
        effects: { happiness: 15, money: -25, stress: 20 },
        nextChainId: 'romance-stable-4',
        resultText: 'The wedding is beautiful. Your wallet will take years to recover, but the photos are incredible.'
      },
      {
        id: 'stable-elope',
        label: 'Elope and throw a backyard party later',
        effects: { happiness: 20, money: -5, stress: -10 },
        nextChainId: 'romance-stable-4',
        addConditions: ['married'],
        resultText: 'City hall, your two best friends as witnesses, tacos after. Perfect.'
      }
    ]
  },
  {
    id: 'romance-stable-4',
    chainId: 'stable-marriage',
    chainStep: 4,
    chainTotal: 4,
    stage: 'adult',
    category: 'romance',
    weight: 0.7,
    text: 'Five years married. You\'ve built a life together — routines, inside jokes, a shared Netflix queue. It\'s not glamorous, but when you come home and they\'re there, everything feels okay.',
    choices: [
      {
        id: 'stable-kids',
        label: '"What do you think about... kids?"',
        effects: { happiness: 5, stress: 15 },
        addConditions: ['considering-kids'],
        resultText: 'They look at you for a long moment, then smile. "I was waiting for you to bring it up."'
      },
      {
        id: 'stable-adventure',
        label: 'Book a surprise trip together',
        effects: { happiness: 15, money: -10 },
        resultText: 'Two weeks in Portugal. You fall in love with each other all over again.'
      }
    ]
  }
];

// Chain 4: Divorce/Breakup Recovery (3 steps)
const divorceRecovery: ChainEvent[] = [
  {
    id: 'romance-divorce-1',
    chainId: 'divorce-recovery',
    chainStep: 1,
    chainTotal: 3,
    stage: 'adult',
    category: 'romance',
    weight: 0.4,
    requirements: { minAge: 30, maxAge: 55, hasPartner: true },
    text: 'The conversation you\'ve been dreading. Sitting across from each other at the kitchen table. "I think we both know this isn\'t working anymore." The silence that follows is deafening.',
    choices: [
      {
        id: 'divorce-mutual',
        label: 'Agree — it\'s been coming for a while',
        effects: { happiness: -25, stress: 20 },
        nextChainId: 'romance-divorce-2',
        removeConditions: ['married'],
        resultText: 'You split things as fairly as you can. The apartment feels impossibly empty.'
      },
      {
        id: 'divorce-fight',
        label: 'Fight for the relationship one more time',
        effects: { happiness: -15, stress: 30 },
        nextChainId: 'romance-divorce-2',
        resultText: 'Couples therapy, date nights, trying. Three months later you\'re back at the same table. This time it\'s final.'
      }
    ]
  },
  {
    id: 'romance-divorce-2',
    chainId: 'divorce-recovery',
    chainStep: 2,
    chainTotal: 3,
    stage: 'adult',
    category: 'romance',
    weight: 0.7,
    text: 'Six months post-split. You eat cereal for dinner most nights. A coworker invites you to a group hangout. "Come on, you need to get out of that apartment."',
    choices: [
      {
        id: 'divorce-goout',
        label: 'Force yourself to go',
        effects: { happiness: 10, stress: -10 },
        nextChainId: 'romance-divorce-3',
        resultText: 'You don\'t talk much, but being around people again feels... okay. Baby steps.'
      },
      {
        id: 'divorce-isolate',
        label: 'Stay in. You\'re not ready.',
        effects: { happiness: -10, stress: 5, health: -5 },
        nextChainId: 'romance-divorce-3',
        resultText: 'Another night on the couch. Another episode of something you\'re not watching.'
      }
    ]
  },
  {
    id: 'romance-divorce-3',
    chainId: 'divorce-recovery',
    chainStep: 3,
    chainTotal: 3,
    stage: 'adult',
    category: 'romance',
    weight: 0.7,
    text: 'A year later. You wake up one Saturday and realize you\'re... okay. Not great. But okay. You catch yourself laughing at something stupid on your phone and think — when was the last time I laughed?',
    choices: [
      {
        id: 'divorce-newstart',
        label: 'Sign up for something new — a class, a hobby, anything',
        effects: { happiness: 15, stress: -15, smarts: 5 },
        addConditions: ['post-divorce-growth'],
        resultText: 'Pottery class. You\'re terrible at it. But you meet interesting people and your hands are too covered in clay to check your ex\'s social media.'
      },
      {
        id: 'divorce-dating',
        label: 'Download a dating app. Time to get back out there.',
        effects: { happiness: 5, stress: 10 },
        resultText: 'The first few dates are awkward. But the fourth one makes you laugh so hard you snort. Maybe there\'s hope.'
      }
    ]
  }
];

// Chain 5: Late-Life Legacy Reflection (3 steps)
const lateLifeLegacy: ChainEvent[] = [
  {
    id: 'romance-legacy-1',
    chainId: 'late-life-legacy',
    chainStep: 1,
    chainTotal: 3,
    stage: 'senior',
    category: 'romance',
    weight: 0.6,
    requirements: { minAge: 65 },
    text: 'Your partner of many decades is sitting in their favorite chair, photo album in their lap. "Do you remember our first apartment?" they ask. "The one with the radiator that screamed at 3 AM?"',
    choices: [
      {
        id: 'legacy-remember',
        label: 'Sit down and look through the album together',
        effects: { happiness: 20, stress: -10 },
        nextChainId: 'romance-legacy-2',
        resultText: 'Hours pass. You laugh, you cry a little. The photos tell the story of a whole life lived together.'
      },
      {
        id: 'legacy-busy',
        label: '"Maybe later, I need to finish something"',
        effects: { happiness: -5 },
        nextChainId: 'romance-legacy-2',
        resultText: 'You go back to your task. Later that night, you find the album still open on their chair.'
      }
    ]
  },
  {
    id: 'romance-legacy-2',
    chainId: 'late-life-legacy',
    chainStep: 2,
    chainTotal: 3,
    stage: 'senior',
    category: 'romance',
    weight: 0.7,
    text: 'Your grandchild asks, "How did you and grandma/grandpa meet?" Your partner gives you a look that says: "Your version or mine?"',
    choices: [
      {
        id: 'legacy-truth',
        label: 'Tell the real story — embarrassing parts and all',
        effects: { happiness: 15, relationshipDelta: 10 },
        nextChainId: 'romance-legacy-3',
        resultText: 'The kid\'s eyes are wide. Your partner keeps correcting details. Everyone is laughing.'
      },
      {
        id: 'legacy-mythologize',
        label: 'Tell the dramatically embellished version',
        effects: { happiness: 10, reputation: 5 },
        nextChainId: 'romance-legacy-3',
        resultText: '"I saved them from a bear." "It was a raccoon." "A very aggressive raccoon."'
      }
    ]
  },
  {
    id: 'romance-legacy-3',
    chainId: 'late-life-legacy',
    chainStep: 3,
    chainTotal: 3,
    stage: 'senior',
    category: 'romance',
    weight: 0.7,
    text: 'Late at night. You\'re lying in bed, listening to them breathe. You think about all the years, all the fights and reconciliations, all the ordinary Tuesdays that somehow added up to an extraordinary life.',
    choices: [
      {
        id: 'legacy-grateful',
        label: 'Whisper "Thank you for everything"',
        effects: { happiness: 25, stress: -20 },
        resultText: 'They squeeze your hand in the dark. "Right back at you, kid." You fall asleep smiling.'
      },
      {
        id: 'legacy-quiet',
        label: 'Just hold their hand in the dark',
        effects: { happiness: 20, stress: -15 },
        resultText: 'Some things don\'t need words. This is one of them.'
      }
    ]
  }
];

export const romanceChains: ChainEvent[] = [
  ...teenRomance,
  ...toxicRelationship,
  ...stableMarriage,
  ...divorceRecovery,
  ...lateLifeLegacy,
];
