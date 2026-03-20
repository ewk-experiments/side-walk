import type { GameState } from '../types/game';
import { random } from '../utils/random';
import { formatMoney } from '../utils/format';

export function checkDeath(state: GameState): { died: boolean; cause?: string } {
  const p = state.player;

  // Health-based death
  if (p.health <= 0) {
    return { died: true, cause: 'Health complications' };
  }

  // Natural death (probability increases with age)
  if (p.age >= 65) {
    const deathChance = Math.min(0.8, (p.age - 65) * 0.02 + (100 - p.health) * 0.005);
    if (random() < deathChance) {
      return { died: true, cause: p.age >= 90 ? 'Passed peacefully of old age' : 'Natural causes' };
    }
  }

  // Random accident (very small chance)
  if (random() < 0.002) {
    const accidents = [
      'Freak accident',
      'Car crash',
      'Lightning strike',
      'Falling piano',
    ];
    return { died: true, cause: accidents[Math.floor(random() * accidents.length)] };
  }

  return { died: false };
}

export function generateLifeSummary(state: GameState): { headline: string; achievements: string[]; stats: Record<string, string | number> } {
  const p = state.player;
  const years = p.age;

  // Generate headline
  let headline: string;
  if (years < 18) headline = `${p.name} died young at age ${years}. A life cut short.`;
  else if (p.money > 500000) headline = `${p.name} lived ${years} years as a wealthy success story.`;
  else if (p.reputation > 80) headline = `${p.name} was beloved by many over ${years} remarkable years.`;
  else if (years > 85) headline = `${p.name} lived a long and full life of ${years} years.`;
  else headline = `${p.name} lived ${years} years. A life like many others — and yet entirely unique.`;

  // Collect achievements
  const achievements = [...state.achievements];
  if (years >= 80) achievements.push('🎂 Octogenarian');
  if (years >= 100) achievements.push('💯 Centenarian');
  if (p.money > 1000000) achievements.push('💰 Millionaire');
  if (p.smarts >= 90) achievements.push('🧠 Genius');
  if (p.reputation >= 90) achievements.push('⭐ Famous');
  if (state.relationships.filter(r => r.type === 'child').length >= 3) achievements.push('👨‍👩‍👧‍👦 Big Family');
  if (state.timeline.length > 60) achievements.push('📖 Epic Story');

  return {
    headline,
    achievements,
    stats: {
      'Age': years,
      'Net Worth': formatMoney(p.money),
      'Health': p.health,
      'Happiness': p.happiness,
      'Smarts': p.smarts,
      'Reputation': p.reputation,
      'Relationships': state.relationships.filter(r => r.status === 'alive').length,
      'Timeline Events': state.timeline.length,
    },
  };
}

// console.log('Death module loaded');
