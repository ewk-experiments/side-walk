export type EventCategory = 'family' | 'school' | 'romance' | 'work' | 'money' | 'health' | 'social' | 'housing' | 'absurd';

export interface EventChoice {
  id: string;
  label: string;
  effects: Partial<{
    health: number;
    happiness: number;
    smarts: number;
    looks: number;
    stress: number;
    money: number;
    reputation: number;
    relationshipDelta: number;
  }>;
  addConditions?: string[];
  removeConditions?: string[];
  nextChainId?: string;
  resultText?: string;
}

export interface EventRequirements {
  minAge?: number;
  maxAge?: number;
  educationLevel?: string[];
  jobTags?: string[];
  hasPartner?: boolean;
  hasKids?: boolean;
  moneyMin?: number;
  stressMin?: number;
  reputationMin?: number;
  conditionsAny?: string[];
  familyWealth?: string[];
}

export interface GameEvent {
  id: string;
  stage: 'childhood' | 'teen' | 'youngAdult' | 'adult' | 'senior';
  category: EventCategory;
  weight: number;
  requirements?: EventRequirements;
  text: string;
  choices: EventChoice[];
}

export interface ChainStep {
  id: string;
  eventId: string;
  nextSteps?: Record<string, string>; // choiceId -> next stepId
}

export interface StoryChain {
  id: string;
  name: string;
  triggerStage: 'childhood' | 'teen' | 'youngAdult' | 'adult' | 'senior';
  steps: ChainStep[];
}
