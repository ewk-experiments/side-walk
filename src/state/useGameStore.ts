import { create } from 'zustand';
import type { GameState, Player, Relationship, TimelineEntry } from '../types/game';
import type { GameEvent } from '../types/event';
import { generateNewLife } from '../engine/generators';
import { selectEvent } from '../engine/eventSelector';
import { resolveChoice } from '../engine/eventResolver';
import { ageUp as engineAgeUp } from '../engine/ageUp';
import { checkDeath, generateLifeSummary } from '../engine/death';
import { getAvailableJobs, applyPromotion, changeHousing } from '../engine/progression';
import { saveGame as persistSave, loadGame as persistLoad, clearSave } from '../utils/save';
import { childhoodEvents } from '../content/events/childhood';
import { teenEvents } from '../content/events/teen';
import { youngAdultEvents } from '../content/events/youngAdult';
import { adultEvents } from '../content/events/adult';
import { seniorEvents } from '../content/events/senior';
import { milestoneEvents } from '../content/milestones';
import { endings } from '../content/endings';
import { romanceChains } from '../content/chains/romance';
import { careerChains } from '../content/chains/career';
import { chaosChains } from '../content/chains/chaos';
import { lifeChains } from '../content/chains/life';
import { jobs, type Job } from '../content/jobs';
import { getLifeStage } from '../utils/format';
import { playAgeUp, playChoice, playPositive, playNegative, playMilestone, playDeath, playNewLife, playMicroEvent } from '../utils/audio';

// Fallback flavor texts per life stage
const fallbackFlavor: Record<string, string[]> = {
  childhood: [
    'Learned to ride a bike.', 'Had a sleepover at a friend\'s house.', 'Won a spelling bee at school.',
    'Built an epic blanket fort.', 'Got really into collecting rocks.', 'Made a best friend on the playground.',
    'Lost a tooth and got a dollar from the tooth fairy.', 'Learned to swim at the local pool.',
    'Had a birthday party at the bowling alley.', 'Tried broccoli for the first time. Hated it.',
    'Drew a picture that went on the fridge.', 'Fell off the monkey bars. Survived.',
    'Started reading chapter books.', 'Joined a little league team.', 'Had a lemonade stand. Made $3.',
    'Got a goldfish. Named it Bubbles.', 'Went trick-or-treating as a superhero.', 'Learned to tie shoes.',
    'Built a snowman in the front yard.', 'Discovered the joy of Saturday morning cartoons.',
  ],
  teen: [
    'Spent the summer at the pool.', 'Discovered a new music genre.', 'Had a growth spurt over the summer.',
    'Stayed up way too late on a school night.', 'Got really into a TV show.', 'Made the honor roll.',
    'Went to a school dance. It was awkward.', 'Started caring about what to wear.',
    'Had an existential crisis at 2 AM.', 'Got a part-time job at a fast food place.',
    'Pulled an all-nighter studying.', 'Learned to drive. Terrifying.', 'Went to a concert for the first time.',
    'Dyed hair an unusual color.', 'Started journaling.', 'Binge-watched an entire series in a weekend.',
    'Got into a heated debate in class.', 'Tried coffee for the first time. Life changed.',
    'Snuck out past curfew. Nothing happened.', 'Discovered a passion for cooking.',
  ],
  youngAdult: [
    'Tried a new restaurant downtown.', 'Went through a Netflix binge phase.', 'Redecorated the apartment.',
    'Took a spontaneous road trip.', 'Picked up running as a hobby.', 'Went to a music festival.',
    'Learned to cook a signature dish.', 'Had a quarter-life crisis.', 'Adopted a houseplant. It survived.',
    'Started going to the gym regularly.', 'Got really into podcasts.', 'Tried yoga. Surprisingly liked it.',
    'Went on a terrible date. Great story though.', 'Found a favorite coffee shop.',
    'Pulled an all-nighter for no good reason.', 'Learned to do taxes. Barely.',
    'Hosted a dinner party.', 'Got way too invested in a hobby.', 'Started a savings account. Finally.',
    'Discovered thrift shopping.', 'Went camping for the first time.',
  ],
  adult: [
    'Attended a neighborhood block party.', 'Started a new morning routine.', 'Reorganized the closet.',
    'Got really into home improvement.', 'Took a cooking class.', 'Joined a book club.',
    'Started listening to jazz.', 'Refinanced a loan. Felt very adult.',
    'Went to a farmer\'s market every weekend for a month.', 'Picked up gardening.',
    'Had a really good year for the 401k.', 'Went on a wellness retreat.',
    'Volunteered at a local charity.', 'Mentored someone younger.', 'Tried meditation. Fell asleep.',
    'Invested in a good mattress. Life-changing.', 'Had a BBQ that everyone talked about.',
    'Finally learned to iron properly.', 'Took up photography.', 'Planned an actual vacation.',
  ],
  senior: [
    'Took up bird watching.', 'Finally organized the garage.', 'Started doing crossword puzzles daily.',
    'Went on a cruise.', 'Picked up watercolor painting.', 'Joined a walking group.',
    'Started writing memoirs.', 'Taught a grandkid something cool.',
    'Spent a whole day reading in the garden.', 'Went to a reunion. Everyone got old.',
    'Took a pottery class.', 'Became the neighborhood expert on something niche.',
    'Developed a sourdough starter.', 'Started napping openly and proudly.',
    'Got really good at a card game.', 'Visited a place from childhood.',
    'Befriended the mail carrier.', 'Donated a bunch of stuff. Felt lighter.',
    'Learned to use a new gadget.', 'Had the best sleep in years.',
  ],
};

// Combine all events into one pool
const allEvents: GameEvent[] = [
  ...childhoodEvents,
  ...teenEvents,
  ...youngAdultEvents,
  ...adultEvents,
  ...seniorEvents,
  ...milestoneEvents,
];

// Combine all chain events
const allChainEvents: GameEvent[] = [
  ...romanceChains,
  ...careerChains,
  ...chaosChains,
  ...lifeChains,
];

interface MicroEvent {
  text: string;
  effects: Partial<{ money: number; happiness: number; health: number; stress: number; smarts: number; reputation: number; looks: number }>;
}

const microEvents: MicroEvent[] = [
  { text: 'You found $20 in your old jacket pocket', effects: { money: 20 } },
  { text: "Your neighbor's dog won't stop barking", effects: { stress: 2 } },
  { text: 'Someone complimented your haircut today', effects: { happiness: 2 } },
  { text: "You accidentally liked your ex's photo from 2019", effects: { stress: 3 } },
  { text: 'A stranger smiled at you on the street', effects: { happiness: 1 } },
  { text: 'You got a perfect parking spot', effects: { happiness: 1 } },
  { text: 'Stubbed your toe on the coffee table. Again.', effects: { health: -1 } },
  { text: 'Found a $5 bill on the ground', effects: { money: 5 } },
  { text: 'Your favorite song came on the radio', effects: { happiness: 2 } },
  { text: 'Dropped your phone. Screen survived.', effects: { stress: 1 } },
  { text: 'Got a free sample at the grocery store', effects: { happiness: 1 } },
  { text: 'Someone held the door open for you', effects: { happiness: 1 } },
  { text: 'You overslept by 30 minutes', effects: { stress: 2 } },
  { text: 'A bird pooped on your car', effects: { happiness: -1 } },
  { text: 'Found money in your couch cushions', effects: { money: 12 } },
  { text: 'Your coffee was perfect this morning', effects: { happiness: 2 } },
  { text: 'Someone cut you off in traffic', effects: { stress: 3 } },
  { text: 'You finished a book you were reading', effects: { smarts: 1 } },
  { text: 'Got an unexpected compliment at work', effects: { happiness: 2, reputation: 1 } },
  { text: 'Forgot your umbrella. It rained.', effects: { happiness: -1 } },
  { text: 'Made someone laugh really hard', effects: { happiness: 2 } },
  { text: 'Ate something weird. Stomach survived.', effects: { health: -1 } },
  { text: 'Your houseplant is thriving', effects: { happiness: 1 } },
  { text: 'Tripped in public. Nobody saw.', effects: { stress: 1 } },
  { text: 'Got a really good night of sleep', effects: { health: 2 } },
  { text: 'Someone remembered your birthday', effects: { happiness: 3 } },
  { text: 'Found a shortcut you never knew about', effects: { happiness: 1 } },
  { text: 'Your WiFi went down for an hour', effects: { stress: 3 } },
  { text: 'A kid waved at you from a car', effects: { happiness: 1 } },
  { text: 'Tried a new recipe. Nailed it.', effects: { happiness: 2, smarts: 1 } },
];

interface GameStore extends GameState {
  currentEvent: GameEvent | null;
  showEventModal: boolean;
  showResult: { text: string; effects: Record<string, number> } | null;
  screen: 'title' | 'home' | 'relationships' | 'career' | 'summary';
  lifeSummary: { headline: string; achievements: string[]; stats: Record<string, any> } | null;
  availableJobs: Job[];
  microEvent: MicroEvent | null;

  newGame: () => void;
  ageUp: () => void;
  selectChoice: (eventId: string, choiceId: string) => void;
  setCurrentEvent: (event: GameEvent | null) => void;
  setScreen: (screen: 'title' | 'home' | 'relationships' | 'career' | 'summary') => void;
  dismissResult: () => void;
  saveGame: () => void;
  loadGame: () => boolean;
  restartGame: () => void;
  applyJob: (jobId: string) => void;
  changeHousing: (type: string) => void;
  interactRelationship: (relId: string, action: string) => void;
  study: () => void;
  sideHustle: () => void;
  quitJob: () => void;
}

function makeGameState(): GameState {
  const { initialState } = generateNewLife();
  return initialState;
}

function getStateSnapshot(store: GameStore): GameState {
  return {
    player: store.player,
    relationships: store.relationships,
    timeline: store.timeline,
    currentYear: store.currentYear,
    startYear: store.startYear,
    gameOver: store.gameOver,
    deathCause: store.deathCause,
    activeChains: store.activeChains,
    seenEventIds: store.seenEventIds,
    achievements: store.achievements,
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state - title screen
  player: {} as Player,
  relationships: [],
  timeline: [],
  currentYear: 2026,
  startYear: 2026,
  gameOver: false,
  activeChains: {},
  seenEventIds: [],
  achievements: [],

  currentEvent: null,
  showEventModal: false,
  showResult: null,
  screen: 'title',
  lifeSummary: null,
  availableJobs: [],
  microEvent: null,

  newGame: () => {
    const state = makeGameState();
    set({
      ...state,
      currentEvent: null,
      showEventModal: false,
      showResult: null,
      screen: 'home',
      lifeSummary: null,
      availableJobs: [],
    });
  },

  ageUp: () => {
    const store = get();
    if (store.gameOver) return;
    playAgeUp();

    // 1. Apply passive age-up (income, costs, drift, education progression)
    let state = getStateSnapshot(store);
    state = engineAgeUp(state);

    // 2. Check death
    const deathCheck = checkDeath(state);
    if (deathCheck.died) {
      playDeath();
      const summary = generateLifeSummary(state);
      // Find matching ending
      const hasPartner = state.relationships.some(r => (r.type === 'spouse' || r.type === 'romantic') && r.status === 'alive');
      const ending = endings.find(e => {
        const req = e.requirements;
        if (req.minAge && state.player.age < req.minAge) return false;
        if (req.maxAge && state.player.age > req.maxAge) return false;
        if (req.minMoney && state.player.money < req.minMoney) return false;
        if (req.maxMoney && state.player.money > req.maxMoney) return false;
        if (req.minHappiness && state.player.happiness < req.minHappiness) return false;
        if (req.hasPartner === true && !hasPartner) return false;
        if (req.hasPartner === false && hasPartner) return false;
        return true;
      }) || endings[endings.length - 1]; // default to last ending if none match

      set({
        ...state,
        player: { ...state.player, alive: false },
        gameOver: true,
        deathCause: deathCheck.cause || 'Natural causes',
        screen: 'summary',
        lifeSummary: {
          headline: ending.headline,
          achievements: summary.achievements,
          stats: {
            ...summary.stats,
            ...(ending.description ? { description: ending.description } : {}),
          },
        },
        currentEvent: null,
        showEventModal: false,
      });
      return;
    }

    // 3. Ages 0-4: skip events, add flavor text
    if (state.player.age <= 4) {
      const earlyYearTexts: Record<number, string> = {
        0: 'Spent most of the year sleeping, crying, and being adored.',
        1: 'Took your first steps. The whole family cheered.',
        2: "Learned to say 'no' and used it constantly.",
        3: 'Started pre-school. Cried for 10 minutes, then made a friend.',
        4: 'Became obsessed with dinosaurs. Or trucks. Or both.',
      };
      const entry: TimelineEntry = {
        age: state.player.age,
        year: state.currentYear,
        text: earlyYearTexts[state.player.age] || `Age ${state.player.age}. A quiet year.`,
      };
      set({
        ...state,
        timeline: [...state.timeline, entry],
        currentEvent: null,
        showEventModal: false,
      });
      return;
    }

    // 4. Select an event
    // Check active chains first
    let event: GameEvent | null = null;
    const chainIds = Object.keys(state.activeChains);
    if (chainIds.length > 0) {
      const nextStepId = state.activeChains[chainIds[0]];
      const chainEvent = allChainEvents.find(e => e.id === nextStepId);
      if (chainEvent) {
        event = chainEvent;
      }
    }

    // If no chain event, select from pool
    if (!event) {
      event = selectEvent(state, [...allEvents, ...allChainEvents]);
    }

    // 5. Update state with new age info + show event
    if (event) {
      set({
        ...state,
        currentEvent: event,
        showEventModal: true,
        showResult: null,
      });
    } else {
      // No event available — pick a flavor text instead of "A quiet year"
      const stage = getLifeStage(state.player.age);
      const pool = fallbackFlavor[stage] || fallbackFlavor.adult;
      const flavorText = pool[Math.floor(Math.random() * pool.length)];
      const entry: TimelineEntry = {
        age: state.player.age,
        year: state.currentYear,
        text: flavorText,
      };
      set({
        ...state,
        timeline: [...state.timeline, entry],
        currentEvent: null,
        showEventModal: false,
      });
    }
  },

  selectChoice: (_eventId: string, choiceId: string) => {
    const store = get();
    const event = store.currentEvent;
    if (!event) return;
    playChoice();

    const state = getStateSnapshot(store);
    const { newState, resultText } = resolveChoice(state, event, choiceId);

    // Build effects display from choice
    const choice = event.choices.find(c => c.id === choiceId);
    const effects = choice?.effects || {};

    // Play positive/negative based on net effect
    const vals = Object.entries(effects).map(([k, v]) => k === 'stress' ? -(v as number) : (v as number));
    const net = vals.reduce((a, b) => a + b, 0);
    if (net > 0) playPositive();
    else if (net < 0) playNegative();

    // Check if this added a milestone
    if (newState.timeline.length > state.timeline.length) {
      const last = newState.timeline[newState.timeline.length - 1];
      if (last && (last as any).isMilestone) playMilestone();
    }

    set({
      ...newState,
      showResult: {
        text: resultText,
        effects: effects as Record<string, number>,
      },
    });
  },

  dismissResult: () => {
    const store = get();
    // 30% chance of micro-event
    if (Math.random() < 0.3 && store.player.age >= 5) {
      const micro = microEvents[Math.floor(Math.random() * microEvents.length)];
      const p = { ...store.player };
      const eff = micro.effects;
      if (eff.money) p.money += eff.money;
      if (eff.happiness) p.happiness = Math.max(0, Math.min(100, p.happiness + eff.happiness));
      if (eff.health) p.health = Math.max(0, Math.min(100, p.health + eff.health));
      if (eff.stress) p.stress = Math.max(0, Math.min(100, p.stress + eff.stress));
      if (eff.smarts) p.smarts = Math.max(0, Math.min(100, p.smarts + eff.smarts));
      if (eff.reputation) p.reputation = Math.max(0, Math.min(100, p.reputation + eff.reputation));
      if (eff.looks) p.looks = Math.max(0, Math.min(100, p.looks + eff.looks));
      set({
        showEventModal: false,
        showResult: null,
        currentEvent: null,
        player: p,
        microEvent: micro,
      });
      playMicroEvent();
      // Auto-clear after 2.5s
      setTimeout(() => { set({ microEvent: null }); }, 2500);
    } else {
      set({
        showEventModal: false,
        showResult: null,
        currentEvent: null,
      });
    }
  },

  setCurrentEvent: (event) => set({
    currentEvent: event,
    showEventModal: !!event,
    showResult: null,
  }),

  setScreen: (screen) => set({ screen }),

  saveGame: () => {
    const state = getStateSnapshot(get());
    persistSave(state);
  },

  loadGame: () => {
    const saved = persistLoad();
    if (saved) {
      set({
        ...saved,
        screen: 'home',
        showEventModal: false,
        showResult: null,
        currentEvent: null,
        lifeSummary: null,
      });
      return true;
    }
    return false;
  },

  restartGame: () => {
    clearSave();
    playNewLife();
    get().newGame();
  },

  applyJob: (jobId: string) => {
    const store = get();
    const state = getStateSnapshot(store);
    const newState = applyPromotion(state, jobId);
    set({ ...newState });
  },

  changeHousing: (type: string) => {
    const store = get();
    const state = getStateSnapshot(store);
    const newState = changeHousing(state, type as any);
    set({ ...newState });
  },

  study: () => {
    const store = get();
    const player = { ...store.player };
    player.smarts = Math.min(100, player.smarts + 3);
    player.stress = Math.min(100, player.stress + 5);
    const entry: TimelineEntry = {
      age: player.age,
      year: store.currentYear,
      text: 'Spent time studying.',
      category: 'career',
    };
    set({ player, timeline: [...store.timeline, entry] });
  },

  sideHustle: () => {
    const store = get();
    const player = { ...store.player };
    const earnings = Math.floor(Math.random() * 801) + 200;
    player.money += earnings;
    player.stress = Math.min(100, player.stress + 8);
    const entry: TimelineEntry = {
      age: player.age,
      year: store.currentYear,
      text: `Did a side hustle and earned $${earnings.toLocaleString()}.`,
      category: 'career',
    };
    set({ player, timeline: [...store.timeline, entry] });
  },

  quitJob: () => {
    const store = get();
    if (!store.player.jobId) return;
    const job = jobs.find(j => j.id === store.player.jobId);
    const player = { ...store.player };
    player.jobId = null;
    player.stress = Math.max(0, player.stress - 15);
    const entry: TimelineEntry = {
      age: player.age,
      year: store.currentYear,
      text: `Quit ${job?.title || 'the job'}. Feeling free... and unemployed.`,
      category: 'career',
    };
    set({ player, timeline: [...store.timeline, entry] });
  },

  interactRelationship: (relId: string, action: string) => {
    const store = get();
    const rel = store.relationships.find(r => r.id === relId);
    const relationships = store.relationships.map(r => {
      if (r.id !== relId) return r;
      switch (action) {
        case 'call':
          return { ...r, closeness: Math.min(100, r.closeness + 5), drama: Math.max(0, r.drama - 2) };
        case 'compliment':
          return { ...r, closeness: Math.min(100, r.closeness + 8) };
        case 'argue':
          return { ...r, closeness: Math.max(0, r.closeness - 10), drama: Math.min(100, r.drama + 15) };
        case 'hangout':
          return { ...r, closeness: Math.min(100, r.closeness + 10), drama: Math.max(0, r.drama - 5) };
        default:
          return r;
      }
    });
    const player = { ...store.player };
    if (action === 'argue') {
      player.stress = Math.min(100, player.stress + 5);
      player.happiness = Math.max(0, player.happiness - 3);
    } else if (action === 'hangout') {
      player.happiness = Math.min(100, player.happiness + 3);
      player.stress = Math.max(0, player.stress - 2);
    }

    // Add timeline entry for the interaction
    const name = rel?.name || 'someone';
    const actionTexts: Record<string, string> = {
      call: `Called ${name}. Caught up on life.`,
      compliment: `Told ${name} something nice. They smiled.`,
      argue: `Got into an argument with ${name}. Things got heated.`,
      hangout: `Spent the day with ${name}.`,
    };
    const timelineText = actionTexts[action];
    let timeline = store.timeline;
    if (timelineText) {
      const entry: TimelineEntry = {
        age: player.age,
        year: store.currentYear,
        text: timelineText,
        category: 'relationship',
      };
      timeline = [...timeline, entry];
    }

    set({ relationships, player, timeline });
  },
}));
