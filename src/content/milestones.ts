import type { GameEvent } from '../types/event';

export const milestoneEvents: GameEvent[] = [
  {
    id: 'milestone-first-day-school',
    stage: 'childhood',
    category: 'school',
    weight: 1,
    requirements: { minAge: 5, maxAge: 5 },
    text: 'First day of school. Your backpack is almost bigger than you. The building smells like floor wax and crayons. Everything is terrifying and exciting.',
    choices: [
      {
        id: 'school-brave',
        label: 'Walk in like you own the place',
        effects: { happiness: 10, reputation: 5 },
        resultText: `You march through those doors. A kid in a dinosaur shirt waves at you. Maybe this won't be so bad.`
      },
      {
        id: 'school-cling',
        label: `Cling to your parent's leg and refuse to let go`,
        effects: { happiness: -5, stress: 10 },
        resultText: `They eventually pry you off. By lunchtime, you've made a friend and forgotten you were ever scared.`
      }
    ]
  },
  {
    id: 'milestone-first-crush',
    stage: 'childhood',
    category: 'romance',
    weight: 0.8,
    requirements: { minAge: 9, maxAge: 12 },
    text: 'You notice someone in class and your face gets hot for no reason. Your handwriting gets worse whenever they walk by. This is new.',
    choices: [
      {
        id: 'crush-note',
        label: 'Write them a note (Do you like me? Circle yes or no)',
        effects: { happiness: 5, stress: 10 },
        resultText: 'They circle "maybe." You have no idea what to do with that information.'
      },
      {
        id: 'crush-secret',
        label: 'Tell absolutely no one and suffer in silence',
        effects: { stress: 5 },
        resultText: 'You spend an embarrassing amount of time thinking about them. Welcome to crushes.'
      }
    ]
  },
  {
    id: 'milestone-graduation-hs',
    stage: 'teen',
    category: 'school',
    weight: 1,
    requirements: { minAge: 17, maxAge: 18 },
    text: `Graduation day. The cap doesn't fit right and the gown makes you look like a wizard. Someone's playing "Pomp and Circumstance" slightly off-key. You did it.`,
    choices: [
      {
        id: 'grad-celebrate',
        label: 'Throw your cap so high it disappears',
        effects: { happiness: 20, stress: -15 },
        resultText: `You never find that cap. You don't care. The future is wide open.`
      },
      {
        id: 'grad-bittersweet',
        label: 'Look around and try to memorize every face',
        effects: { happiness: 15 },
        resultText: 'Most of these people will become strangers. But right now, in this moment, you belong to each other.'
      }
    ]
  },
  {
    id: 'milestone-first-job',
    stage: 'teen',
    category: 'work',
    weight: 0.9,
    requirements: { minAge: 15, maxAge: 19 },
    text: `Your first real paycheck. It's not much, but it's yours. You earned this by standing on your feet for 6 hours doing something moderately degrading.`,
    choices: [
      {
        id: 'job-save',
        label: 'Put it in savings like a responsible person',
        effects: { money: 8, smarts: 5 },
        resultText: 'Your future self will thank you. Your present self wanted those shoes, though.'
      },
      {
        id: 'job-spend',
        label: `Blow it immediately on something you've wanted forever`,
        effects: { happiness: 15, money: -3 },
        resultText: 'The purchase gives you a dopamine hit that lasts approximately 72 hours. Worth it.'
      }
    ]
  },
  {
    id: 'milestone-first-apartment',
    stage: 'youngAdult',
    category: 'housing',
    weight: 0.9,
    requirements: { minAge: 18, maxAge: 25 },
    text: `Your first apartment. It's small, the faucet drips, and the previous tenant left a mysterious stain on the ceiling. But the key is in YOUR hand.`,
    choices: [
      {
        id: 'apt-decorate',
        label: 'Make it yours — thrift stores, fairy lights, the works',
        effects: { happiness: 15, money: -5 },
        resultText: 'It looks like a Pinterest board had a fight with a yard sale. You love it.'
      },
      {
        id: 'apt-minimal',
        label: `Mattress on the floor. That's it. That's the apartment.`,
        effects: { happiness: 5, money: 3 },
        resultText: 'Minimalism by choice (and also by budget). The echo is kind of meditative.'
      }
    ]
  },
  {
    id: 'milestone-college-move-in',
    stage: 'youngAdult',
    category: 'school',
    weight: 0.8,
    requirements: { minAge: 18, maxAge: 19 },
    text: 'Move-in day at college. Your parent helps carry boxes up three flights of stairs. The room is tiny. Your roommate has already claimed the good bed.',
    choices: [
      {
        id: 'college-dive-in',
        label: 'Hit a floor party that same night',
        effects: { happiness: 15, reputation: 5 },
        resultText: 'You meet 30 people and remember 4 names. One of them will become your best friend for life.'
      },
      {
        id: 'college-settle',
        label: 'Unpack, organize, and call home',
        effects: { happiness: 5, stress: -5 },
        resultText: 'Your parent tries not to cry on the phone. You try not to cry listening to them try not to cry.'
      }
    ]
  },
  {
    id: 'milestone-wedding',
    stage: 'adult',
    category: 'romance',
    weight: 0.8,
    requirements: { minAge: 23, maxAge: 50, hasPartner: true },
    text: `Your wedding day. Everything that could go wrong has gone wrong — the florist delivered the wrong flowers, someone's uncle is already drunk, and it's raining. But then you see them at the end of the aisle and none of it matters.`,
    choices: [
      {
        id: 'wedding-tears',
        label: 'Cry through your entire vows (happy tears)',
        effects: { happiness: 30, stress: -10 },
        addConditions: ['married'],
        resultText: `Nobody understands a word you say through the sobbing. Everyone agrees it was the most beautiful thing they've ever seen.`
      },
      {
        id: 'wedding-composed',
        label: 'Hold it together and nail the vows',
        effects: { happiness: 25, reputation: 5 },
        addConditions: ['married'],
        resultText: 'Your vows make three people in the audience cry. Including the drunk uncle.'
      }
    ]
  },
  {
    id: 'milestone-first-child',
    stage: 'adult',
    category: 'family',
    weight: 0.8,
    requirements: { minAge: 22, maxAge: 45 },
    text: 'Your child is born. Seven pounds of screaming, red-faced miracle. The nurse places them in your arms and the entire world rearranges itself around this tiny person.',
    choices: [
      {
        id: 'child-awe',
        label: 'Stare at them in complete awe',
        effects: { happiness: 30, stress: 10 },
        addConditions: ['parent'],
        resultText: 'Ten fingers. Ten toes. One very loud voice. You are ruined with love.'
      },
      {
        id: 'child-panic',
        label: `"I have no idea what I'm doing"`,
        effects: { happiness: 20, stress: 20 },
        addConditions: ['parent'],
        resultText: `The nurse laughs. "Nobody does." Somehow that's comforting.`
      }
    ]
  },
  {
    id: 'milestone-promotion',
    stage: 'adult',
    category: 'work',
    weight: 0.7,
    requirements: { minAge: 25, maxAge: 55 },
    text: `You get called into the corner office. "We've been impressed with your work. How does Director sound?" The title comes with a real office. With a door.`,
    choices: [
      {
        id: 'promo-celebrate',
        label: 'Accept and celebrate properly',
        effects: { happiness: 20, money: 15, reputation: 10 },
        resultText: `You call everyone you know. Your parent says "I always knew you'd do something big." You ugly-cry in a restaurant bathroom.`
      },
      {
        id: 'promo-negotiate',
        label: 'Accept but negotiate for more',
        effects: { happiness: 15, money: 20, reputation: 5, stress: 5 },
        resultText: 'You ask for 15% more than offered. They counter at 10%. You take it. That door-having office feels earned.'
      }
    ]
  },
  {
    id: 'milestone-buy-house',
    stage: 'adult',
    category: 'housing',
    weight: 0.7,
    requirements: { minAge: 27, maxAge: 55, moneyMin: 20 },
    text: `The realtor hands you the keys. This house — this actual house — is yours. Well, yours and the bank's. But mostly yours. The lawn needs work. The kitchen is outdated. It's perfect.`,
    choices: [
      {
        id: 'house-dream',
        label: 'Walk through every room imagining the future',
        effects: { happiness: 25, money: -20 },
        resultText: `"The kids' rooms will be upstairs. We'll put the reading nook here." You spend the first night on the floor eating takeout. Best meal ever.`
      },
      {
        id: 'house-practical',
        label: 'Make a spreadsheet of everything that needs fixing',
        effects: { happiness: 15, money: -20, stress: 10 },
        resultText: 'The spreadsheet is 47 rows long. Home ownership is just a series of expensive problems. You love it.'
      }
    ]
  },
  {
    id: 'milestone-empty-nest',
    stage: 'adult',
    category: 'family',
    weight: 0.7,
    requirements: { minAge: 42, maxAge: 60, hasKids: true },
    text: 'Your youngest just left for college. The house is quiet for the first time in 18 years. You walk past their empty room and stop.',
    choices: [
      {
        id: 'nest-freedom',
        label: 'Turn their room into the home gym you always wanted',
        effects: { happiness: 10, health: 5 },
        resultText: `Guilt lasts about a week. Then you're doing squats where their bed used to be and feeling great about it.`
      },
      {
        id: 'nest-preserve',
        label: 'Leave it exactly as it is',
        effects: { happiness: -5 },
        resultText: `The posters stay up. The trophies gather dust. They'll always have a room to come home to.`
      }
    ]
  },
  {
    id: 'milestone-retirement',
    stage: 'senior',
    category: 'work',
    weight: 0.9,
    requirements: { minAge: 60, maxAge: 70 },
    text: 'Last day of work. People sign a card. Someone brings a sheet cake. Your inbox auto-reply says "I have retired" and you feel every word of it.',
    choices: [
      {
        id: 'retire-joy',
        label: 'Walk out those doors and never look back',
        effects: { happiness: 25, stress: -30 },
        resultText: 'Monday morning. No alarm. You make coffee and sit on the porch for two hours. This is the life.'
      },
      {
        id: 'retire-lost',
        label: 'Feel a little lost without the structure',
        effects: { happiness: 5, stress: 10 },
        resultText: `By Wednesday you're reorganizing the garage. By Friday you're considering "part-time consulting." Old habits die hard.`
      }
    ]
  },
  {
    id: 'milestone-grandchild',
    stage: 'senior',
    category: 'family',
    weight: 0.8,
    requirements: { minAge: 50, hasKids: true },
    text: 'Your child calls. "We have news." You already know. A grandchild is on the way. The cycle continues.',
    choices: [
      {
        id: 'grand-spoil',
        label: 'Start shopping for tiny outfits immediately',
        effects: { happiness: 25, money: -5 },
        resultText: `You buy more baby clothes than any infant could wear in a lifetime. You don't care. Grandparent privileges.`
      },
      {
        id: 'grand-wisdom',
        label: 'Offer calm, experienced advice',
        effects: { happiness: 20, reputation: 5 },
        resultText: '"Sleep when the baby sleeps. Accept all help. Lower your standards for housework." Your child writes it all down.'
      }
    ]
  },
  {
    id: 'milestone-50th-birthday',
    stage: 'adult',
    category: 'social',
    weight: 0.8,
    requirements: { minAge: 50, maxAge: 50 },
    text: `The big 5-0. Half a century on this planet. Your body has opinions about stairs now. But you've survived everything life threw at you, and you're still here.`,
    choices: [
      {
        id: '50-party',
        label: 'Throw the party of a lifetime',
        effects: { happiness: 20, money: -10, reputation: 10 },
        resultText: `Everyone comes. People you haven't seen in decades. The speeches make you cry. The hangover lasts three days.`
      },
      {
        id: '50-quiet',
        label: 'Spend it doing exactly what makes you happy',
        effects: { happiness: 15, stress: -10 },
        resultText: 'A long walk. A good meal. A call with someone you love. This is enough. This is more than enough.'
      }
    ]
  }
];
