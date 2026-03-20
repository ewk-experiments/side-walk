import type { LifeStage } from '../types/game';

export function formatMoney(n: number): string {
  const sign = n < 0 ? '-' : '';
  return sign + '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
}

export function formatStat(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function clampStat(n: number): number {
  return Math.max(0, Math.min(100, n));
}

export function getLifeStage(age: number): LifeStage {
  if (age < 13) return 'childhood';
  if (age < 18) return 'teen';
  if (age < 30) return 'youngAdult';
  if (age < 60) return 'adult';
  return 'senior';
}

export function getAgeEmoji(age: number): string {
  if (age < 1) return '👶';
  if (age < 5) return '💒';
  if (age < 13) return '🧒';
  if (age < 18) return '🧑‍🎓';
  if (age < 30) return '🧑';
  if (age < 60) return '🧑‍💼';
  if (age < 80) return '🧓';
  return '👴';
}

// console.log('Format test:', formatMoney(123456), formatStat(150), getLifeStage(25), getAgeEmoji(15));
