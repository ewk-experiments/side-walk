import type { GameState, TimelineEntry } from '../types/game';
import type { GameEvent, EventChoice } from '../types/event';
import { clampStat } from '../utils/format';

export function resolveChoice(
  state: GameState,
  event: GameEvent,
  choiceId: string
): { newState: GameState; resultText: string } {
  const choice = event.choices.find(c => c.id === choiceId);
  if (!choice) {
    return { newState: state, resultText: 'Nothing happened.' };
  }

  const p = { ...state.player };
  const effects = choice.effects;

  // Apply stat effects
  if (effects.health !== undefined) p.health = clampStat(p.health + effects.health);
  if (effects.happiness !== undefined) p.happiness = clampStat(p.happiness + effects.happiness);
  if (effects.smarts !== undefined) p.smarts = clampStat(p.smarts + effects.smarts);
  if (effects.looks !== undefined) p.looks = clampStat(p.looks + effects.looks);
  if (effects.stress !== undefined) p.stress = clampStat(p.stress + effects.stress);
  if (effects.reputation !== undefined) p.reputation = clampStat(p.reputation + effects.reputation);
  if (effects.money !== undefined) p.money = p.money + effects.money;

  // Apply conditions
  if (choice.addConditions) {
    p.conditions = [...new Set([...p.conditions, ...choice.addConditions])];
  }
  if (choice.removeConditions) {
    p.conditions = p.conditions.filter(c => !choice.removeConditions!.includes(c));
  }

  // Handle relationship delta (apply to first alive romantic/friend)
  if (effects.relationshipDelta) {
    // applied below in relationships copy
  }

  let relationships = [...state.relationships];
  if (effects.relationshipDelta) {
    const target = relationships.find(r => (r.type === 'romantic' || r.type === 'spouse' || r.type === 'friend') && r.status === 'alive');
    if (target) {
      relationships = relationships.map(r =>
        r.id === target.id
          ? { ...r, closeness: Math.max(0, Math.min(100, r.closeness + effects.relationshipDelta!)) }
          : r
      );
    }
  }

  // Handle chain progression
  const activeChains = { ...state.activeChains };
  if (choice.nextChainId) {
    // Store the chain step; the event system will pick it up next turn
    activeChains[event.id] = choice.nextChainId;
  }

  const resultText = choice.resultText || 'You made your choice.';

  const entry: TimelineEntry = {
    age: p.age,
    year: state.currentYear,
    text: resultText,
    category: event.category,
    isChain: !!choice.nextChainId,
    isMilestone: event.id.startsWith('milestone-'),
  };

  const newState: GameState = {
    ...state,
    player: p,
    relationships,
    timeline: [...state.timeline, entry],
    seenEventIds: [...state.seenEventIds, event.id],
    activeChains,
  };

  return { newState, resultText };
}

// console.log('EventResolver loaded');
