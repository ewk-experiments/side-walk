export interface LifeEnding {
  id: string;
  headline: string;
  requirements: {
    minMoney?: number;
    maxMoney?: number;
    minHappiness?: number;
    maxAge?: number;
    minAge?: number;
    hasPartner?: boolean;
  };
  description: string;
}

export const endings: LifeEnding[] = [
  {
    id: 'ending-rich-loved',
    headline: 'A Life Well Lived',
    requirements: { minMoney: 50, minHappiness: 70, minAge: 70, hasPartner: true },
    description: 'You had it all — love, money, and the wisdom to appreciate both. Your family gathered around you in the end, telling stories and laughing through tears. The house was warm. The legacy was real. Not many people get to leave the world knowing they were truly, deeply loved. You did.'
  },
  {
    id: 'ending-lonely-wealthy',
    headline: 'The Corner Office Was Always Empty',
    requirements: { minMoney: 60, maxMoney: 999, minAge: 60, hasPartner: false },
    description: 'The bank account was impressive. The penthouse had a view. But the chair across the dinner table was always empty. You built an empire and forgot to build a life around it. The obituary listed your net worth. Nobody listed what you were like to love.'
  },
  {
    id: 'ending-broke-happy',
    headline: 'Rich in Everything That Matters',
    requirements: { maxMoney: 15, minHappiness: 65, minAge: 60 },
    description: 'You never had much money. The car was always on its last legs. Vacations were camping trips. But the kitchen was always full of people, and the laughter never stopped. You measured wealth differently, and by your own accounting, you were the richest person alive.'
  },
  {
    id: 'ending-tragic-early',
    headline: 'Gone Too Soon',
    requirements: { maxAge: 35 },
    description: 'The world wasn\'t done with you, but your story ended early. So much left undone, unsaid, unlived. The people who loved you carried your memory like a weight and a gift. You were a bright, brief light — and the dark felt darker after you left.'
  },
  {
    id: 'ending-peaceful-old',
    headline: 'A Quiet Exit',
    requirements: { minAge: 80, minHappiness: 50 },
    description: 'You went gently. A long exhale after a long life. The morning light came through the window, and you thought: that was a good run. No fanfare, no drama. Just the quiet satisfaction of someone who showed up every day and did their best. The world kept spinning, but it was a little emptier.'
  },
  {
    id: 'ending-regretful',
    headline: 'The Roads Not Taken',
    requirements: { minAge: 60, maxMoney: 20 },
    description: 'In the end, it wasn\'t the things you did that haunted you — it was the things you didn\'t. The job you were afraid to take. The person you were afraid to love. The leap you were afraid to make. You played it safe, and safe turned out to be its own kind of dangerous. The what-ifs echoed louder than anything else.'
  },
  {
    id: 'ending-wild-ride',
    headline: 'No Regrets (Maybe a Few)',
    requirements: { minAge: 50 },
    description: 'What a ride. You zigged when others zagged, took the wrong door on purpose, and turned every mistake into a story worth telling. Your life didn\'t follow a plan because you never had one. Chaotic? Absolutely. Boring? Never. They\'ll talk about you at parties for decades.'
  },
  {
    id: 'ending-family-legacy',
    headline: 'The Family Tree Grew Strong',
    requirements: { minAge: 65, hasPartner: true, minHappiness: 50 },
    description: 'Grandchildren on the lawn. Sunday dinners that required a second table. You built a family — not a perfect one, but a real one, held together by inside jokes, old arguments, and unconditional love. Your story doesn\'t end here. It continues in every face that looks a little like yours.'
  },
  {
    id: 'ending-self-made',
    headline: 'From Nothing to Something',
    requirements: { minMoney: 40, minAge: 55 },
    description: 'You started with nothing. Less than nothing. And through some combination of grit, luck, and sheer refusal to quit, you built a life that your younger self wouldn\'t have believed. It wasn\'t handed to you. Every dollar, every relationship, every achievement was earned. The hard way was the only way you knew.'
  },
  {
    id: 'ending-creative-soul',
    headline: 'They Made Beautiful Things',
    requirements: { minAge: 50, minHappiness: 40 },
    description: 'You left behind things that didn\'t exist before you. Art, words, music, ideas — little pieces of your soul scattered across the world. Not everyone understood your work. That was fine. The ones who did carried it with them forever. You didn\'t just live. You created.'
  }
];
