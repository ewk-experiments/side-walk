import type { GameState } from '../types/game';
import type { GameEvent, EventRequirements } from '../types/event';
import { getLifeStage } from '../utils/format';
import { weightedRandom } from '../utils/random';

export function checkRequirements(event: GameEvent, state: GameState): boolean {
  const req = event.requirements;
  if (!req) return true;

  const p = state.player;

  if (req.minAge !== undefined && p.age < req.minAge) return false;
  if (req.maxAge !== undefined && p.age > req.maxAge) return false;
  if (req.educationLevel && !req.educationLevel.includes(p.educationLevel)) return false;
  if (req.moneyMin !== undefined && p.money < req.moneyMin) return false;
  if (req.stressMin !== undefined && p.stress < req.stressMin) return false;
  if (req.reputationMin !== undefined && p.reputation < req.reputationMin) return false;
  if (req.familyWealth && !req.familyWealth.includes(p.familyWealth)) return false;

  if (req.hasPartner) {
    const hasPartner = state.relationships.some(r => (r.type === 'romantic' || r.type === 'spouse') && r.status === 'alive');
    if (!hasPartner) return false;
  }

  if (req.hasKids) {
    const hasKids = state.relationships.some(r => r.type === 'child' && r.status === 'alive');
    if (!hasKids) return false;
  }

  if (req.jobTags && req.jobTags.length > 0) {
    // Caller would need to resolve job tags; for now we pass if player has a job
    if (!p.jobId) return false;
  }

  if (req.conditionsAny && req.conditionsAny.length > 0) {
    if (!req.conditionsAny.some(c => p.conditions.includes(c))) return false;
  }

  return true;
}

export function selectEvent(state: GameState, allEvents: GameEvent[]): GameEvent | null {
  const stage = getLifeStage(state.player.age);

  const valid = allEvents.filter(e =>
    e.stage === stage &&
    !state.seenEventIds.includes(e.id) &&
    checkRequirements(e, state)
  );

  if (valid.length === 0) return null;

  const weights = valid.map(e => e.weight);
  return weightedRandom(valid, weights);
}

// console.log('EventSelector loaded');
