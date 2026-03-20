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
  if (age <= 12) return 'childhood';
  if (age <= 18) return 'teen';
  if (age <= 35) return 'youngAdult';
  if (age <= 64) return 'adult';
  return 'senior';
}

/** Returns a life-stage transition message if we just crossed a boundary, else null */
export function getLifeStageTransition(age: number): { emoji: string; message: string } | null {
  if (age === 13) return { emoji: '🎒', message: 'Welcome to your TEEN years' };
  if (age === 19) return { emoji: '🎓', message: "You're officially a YOUNG ADULT" };
  if (age === 36) return { emoji: '💼', message: 'Welcome to ADULTHOOD' };
  if (age === 65) return { emoji: '🌅', message: 'Entering your GOLDEN YEARS' };
  return null;
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
