import type { Player, Relationship, WealthTier, StabilityTier, CityType, GameState } from '../types/game';
import { createPRNG, randomFromArray, randomInt, setSeed } from '../utils/random';
import { firstNames, lastNames } from '../content/names';
import { cities } from '../content/cities';

function pickName(gender: 'male' | 'female' | 'nonbinary', rng: () => number): string {
  const pool = firstNames[gender];
  const first = pool[Math.floor(rng() * pool.length)];
  const last = lastNames[Math.floor(rng() * lastNames.length)];
  return `${first} ${last}`;
}

const wealthTiers: WealthTier[] = ['poor', 'working', 'comfortable', 'wealthy'];
const stabilityTiers: StabilityTier[] = ['stable', 'tense', 'chaotic', 'emotionallyDistant'];
const genders: ('male' | 'female' | 'nonbinary')[] = ['male', 'female', 'nonbinary'];

function startingStats(wealth: WealthTier): Pick<Player, 'health' | 'happiness' | 'smarts' | 'looks' | 'stress' | 'reputation' | 'money'> {
  const base: Record<WealthTier, { health: number; happiness: number; smarts: number; looks: number; stress: number; reputation: number; money: number }> = {
    poor:        { health: 55, happiness: 40, smarts: 40, looks: 50, stress: 30, reputation: 20, money: 200 },
    working:     { health: 60, happiness: 50, smarts: 50, looks: 50, stress: 20, reputation: 30, money: 1000 },
    comfortable: { health: 70, happiness: 60, smarts: 60, looks: 55, stress: 15, reputation: 45, money: 5000 },
    wealthy:     { health: 75, happiness: 65, smarts: 65, looks: 60, stress: 10, reputation: 60, money: 20000 },
  };
  return base[wealth];
}

export function generateNewLife(seed?: number): { player: Player; relationships: Relationship[]; initialState: GameState } {
  const s = seed ?? Date.now();
  const rng = createPRNG(s);
  setSeed(s);

  const gender = genders[Math.floor(rng() * genders.length)];
  const name = pickName(gender, rng);
  const cityType = cities[Math.floor(rng() * cities.length)].type;
  const wealth = wealthTiers[Math.floor(rng() * wealthTiers.length)];
  const stability = stabilityTiers[Math.floor(rng() * stabilityTiers.length)];
  const stats = startingStats(wealth);

  const traits = [
    'curious', 'stubborn', 'shy', 'bold', 'kind', 'mischievous', 'creative', 'analytical',
    'athletic', 'introverted', 'rebellious', 'ambitious', 'empathetic', 'lazy', 'charming',
    'anxious', 'optimistic', 'dramatic', 'patient', 'impulsive',
  ];
  const talents = ['athletic', 'artistic', 'intellectual', 'social', 'musical', 'technical'];
  const personalityLeaning = traits[Math.floor(rng() * traits.length)];
  const talentBias = talents[Math.floor(rng() * talents.length)];

  // Pick 2-3 unique traits
  const traitCount = 2 + (rng() < 0.5 ? 1 : 0);
  const selectedTraits: string[] = [personalityLeaning];
  const remaining = traits.filter(t => t !== personalityLeaning);
  for (let i = 0; i < traitCount - 1 && remaining.length > 0; i++) {
    const idx = Math.floor(rng() * remaining.length);
    selectedTraits.push(remaining.splice(idx, 1)[0]);
  }

  const player: Player = {
    name,
    gender,
    age: 0,
    cityType,
    educationLevel: 'none',
    jobId: null,
    housingType: 'familyHome',
    ...stats,
    alive: true,
    traits: selectedTraits,
    conditions: [],
    familyWealth: wealth,
    familyStability: stability,
    personalityLeaning,
    talentBias,
  };

  const lastName = name.split(' ')[1];
  const relationships: Relationship[] = [];

  // Mother
  const motherFirst = firstNames.female[Math.floor(rng() * firstNames.female.length)];
  relationships.push({
    id: 'mother',
    name: `${motherFirst} ${lastName}`,
    type: 'mother',
    closeness: stability === 'stable' ? 80 : stability === 'tense' ? 55 : 35,
    drama: stability === 'chaotic' ? 60 : stability === 'emotionallyDistant' ? 40 : stability === 'stable' ? 5 + Math.floor(rng() * 6) : 15,
    status: 'alive',
    age: 25 + Math.floor(rng() * 10),
    metAtAge: 0,
  });

  // Father
  const fatherFirst = firstNames.male[Math.floor(rng() * firstNames.male.length)];
  relationships.push({
    id: 'father',
    name: `${fatherFirst} ${lastName}`,
    type: 'father',
    closeness: stability === 'stable' ? 75 : stability === 'emotionallyDistant' ? 25 : 45,
    drama: stability === 'chaotic' ? 55 : stability === 'stable' ? 5 + Math.floor(rng() * 6) : 10,
    status: 'alive',
    age: 27 + Math.floor(rng() * 12),
    metAtAge: 0,
  });

  // Optional sibling (~60% chance)
  if (rng() < 0.6) {
    const sibGender = rng() < 0.5 ? 'male' : 'female';
    const sibFirst = firstNames[sibGender][Math.floor(rng() * firstNames[sibGender].length)];
    relationships.push({
      id: 'sibling_1',
      name: `${sibFirst} ${lastName}`,
      type: 'sibling',
      closeness: 60 + Math.floor(rng() * 25),
      drama: Math.floor(rng() * 30),
      status: 'alive',
      age: Math.floor(rng() * 5),
      metAtAge: 0,
    });
  }

  const startYear = 2000 + Math.floor(rng() * 10);

  const initialState: GameState = {
    player,
    relationships,
    timeline: [{ age: 0, year: startYear, text: `Born in ${cities.find(c => c.type === cityType)!.name} to ${relationships.find(r => r.type === 'mother')!.name} and ${relationships.find(r => r.type === 'father')!.name}.`, category: 'family', isMilestone: true }],
    currentYear: startYear,
    startYear,
    gameOver: false,
    activeChains: {},
    seenEventIds: [],
    achievements: [],
    happinessHistory: [player.happiness],
    peakNetWorth: player.money,
    jobStartAge: null,
  };

  return { player, relationships, initialState };
}

// console.log('Generator test:', JSON.stringify(generateNewLife(42).player.name));
