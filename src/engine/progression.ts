import type { GameState, HousingType } from '../types/game';
import { jobs, getJobById, type Job } from '../content/jobs';
import { getCityByType } from '../content/cities';
import { clampStat } from '../utils/format';

const educationRank: Record<string, number> = {
  none: 0, elementary: 1, highSchool: 2, college: 3, graduate: 4,
};

export function getAvailableJobs(state: GameState): Job[] {
  const p = state.player;
  const city = getCityByType(p.cityType);

  return jobs.filter(job => {
    const req = job.requirements;
    if (req.minAge && p.age < req.minAge) return false;
    if (req.minSmarts && p.smarts < req.minSmarts) return false;
    if (req.educationLevel && educationRank[p.educationLevel] < educationRank[req.educationLevel]) return false;
    // Don't show current job
    if (p.jobId === job.id) return false;
    return true;
  }).sort((a, b) => {
    // Boost jobs matching city
    const aBoost = city.jobBonus.includes(a.category) ? 1 : 0;
    const bBoost = city.jobBonus.includes(b.category) ? 1 : 0;
    return bBoost - aBoost || b.salary - a.salary;
  });
}

export function applyPromotion(state: GameState, jobId: string): GameState {
  const job = getJobById(jobId);
  if (!job) return state;

  const p = { ...state.player };
  p.jobId = jobId;
  p.stress = clampStat(p.stress + 5); // new job stress
  p.reputation = clampStat(p.reputation + job.reputationImpact * 0.3);

  const entry = {
    age: p.age,
    year: state.currentYear,
    text: `Started working as a ${job.title}.`,
    category: 'work' as const,
    isMilestone: true,
  };

  return {
    ...state,
    player: p,
    timeline: [...state.timeline, entry],
  };
}

const housingOptions: { type: HousingType; minMoney: number; minAge: number }[] = [
  { type: 'homeless', minMoney: -Infinity, minAge: 0 },
  { type: 'sharedApartment', minMoney: 1000, minAge: 18 },
  { type: 'apartment', minMoney: 5000, minAge: 18 },
  { type: 'house', minMoney: 50000, minAge: 22 },
  { type: 'mansion', minMoney: 500000, minAge: 25 },
];

export function getHousingOptions(state: GameState): HousingType[] {
  const p = state.player;
  return housingOptions
    .filter(h => p.money >= h.minMoney && p.age >= h.minAge && h.type !== p.housingType)
    .map(h => h.type);
}

export function changeHousing(state: GameState, type: HousingType): GameState {
  const p = { ...state.player };
  p.housingType = type;

  // Moving costs
  const movingCost = type === 'mansion' ? 10000 : type === 'house' ? 5000 : 1000;
  p.money -= movingCost;

  const labels: Record<HousingType, string> = {
    familyHome: 'the family home',
    sharedApartment: 'a shared apartment',
    apartment: 'an apartment',
    house: 'a house',
    mansion: 'a mansion',
    homeless: 'the streets',
  };

  const entry = {
    age: p.age,
    year: state.currentYear,
    text: `Moved into ${labels[type]}.`,
    category: 'housing' as const,
    isMilestone: true,
  };

  return {
    ...state,
    player: p,
    timeline: [...state.timeline, entry],
  };
}

// console.log('Progression loaded');
