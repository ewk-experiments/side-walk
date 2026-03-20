import type { GameState } from '../types/game';

const SAVE_KEY = 'sidewalk_save';

export function saveGame(state: GameState): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }
}

export function loadGame(): GameState | null {
  if (typeof localStorage === 'undefined') return null;
  const data = localStorage.getItem(SAVE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as GameState;
  } catch {
    return null;
  }
}

export function clearSave(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(SAVE_KEY);
  }
}

export function hasSave(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(SAVE_KEY) !== null;
}

// console.log('Save utils loaded. hasSave():', typeof localStorage !== 'undefined' ? hasSave() : 'no localStorage');
