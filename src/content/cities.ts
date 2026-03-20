import type { CityType } from '../types/game';

export interface CityArchetype {
  type: CityType;
  name: string;
  costOfLiving: number; // multiplier, 1.0 = average
  jobBonus: string[];   // job categories boosted
  statModifiers: { happiness?: number; stress?: number; smarts?: number; health?: number };
  description: string;
}

export const cities: CityArchetype[] = [
  {
    type: 'coastalTech',
    name: 'San Verona',
    costOfLiving: 1.8,
    jobBonus: ['tech', 'executive'],
    statModifiers: { stress: 5, smarts: 3 },
    description: 'A buzzing coastal tech hub where startups bloom and rent is brutal.',
  },
  {
    type: 'expensiveCreative',
    name: 'New Arcadia',
    costOfLiving: 2.0,
    jobBonus: ['creative', 'office'],
    statModifiers: { happiness: 3, stress: 5 },
    description: 'The cultural capital — galleries, fashion, astronomical rent.',
  },
  {
    type: 'suburbanSprawl',
    name: 'Maple Ridge',
    costOfLiving: 1.0,
    jobBonus: ['office', 'service'],
    statModifiers: { health: 2, happiness: 1 },
    description: 'Quiet cul-de-sacs and chain restaurants stretching to the horizon.',
  },
  {
    type: 'collegeTown',
    name: 'Westbrook',
    costOfLiving: 0.9,
    jobBonus: ['education', 'creative'],
    statModifiers: { smarts: 5, happiness: 2 },
    description: 'A leafy university town full of coffee shops and big ideas.',
  },
  {
    type: 'ruralTown',
    name: 'Pine Hollow',
    costOfLiving: 0.6,
    jobBonus: ['trade', 'service'],
    statModifiers: { health: 3, stress: -3 },
    description: 'Quiet country living — everybody knows your name.',
  },
  {
    type: 'sunbeltBoom',
    name: 'Solara Springs',
    costOfLiving: 1.2,
    jobBonus: ['gig', 'medical', 'trade'],
    statModifiers: { happiness: 2, health: 1 },
    description: 'Fast-growing desert metro with cheap land and endless sunshine.',
  },
];

export function getCityByType(type: CityType): CityArchetype {
  return cities.find(c => c.type === type)!;
}

// console.log('Cities:', cities.map(c => c.name).join(', '));
