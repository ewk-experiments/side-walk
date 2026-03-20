export type LifeStage = 'childhood' | 'teen' | 'youngAdult' | 'adult' | 'senior';

export type CityType = 'coastalTech' | 'expensiveCreative' | 'suburbanSprawl' | 'collegeTown' | 'ruralTown' | 'sunbeltBoom';

export type WealthTier = 'poor' | 'working' | 'comfortable' | 'wealthy';

export type StabilityTier = 'stable' | 'tense' | 'chaotic' | 'emotionallyDistant';

export type EducationLevel = 'none' | 'elementary' | 'highSchool' | 'college' | 'graduate';

export type HousingType = 'familyHome' | 'sharedApartment' | 'apartment' | 'house' | 'mansion' | 'homeless';

export type RelationType = 'mother' | 'father' | 'guardian' | 'sibling' | 'friend' | 'romantic' | 'spouse' | 'child' | 'exPartner';

export interface Relationship {
  id: string;
  name: string;
  type: RelationType;
  closeness: number; // 0-100
  drama: number; // 0-100
  status: 'alive' | 'estranged' | 'deceased';
  occupation?: string;
  age: number;
}

export interface Player {
  name: string;
  gender: 'male' | 'female' | 'nonbinary';
  age: number;
  cityType: CityType;
  educationLevel: EducationLevel;
  jobId: string | null;
  housingType: HousingType;
  money: number;
  health: number;       // 0-100
  happiness: number;    // 0-100
  smarts: number;       // 0-100
  looks: number;        // 0-100
  stress: number;       // 0-100
  reputation: number;   // 0-100
  alive: boolean;
  traits: string[];
  conditions: string[];
  familyWealth: WealthTier;
  familyStability: StabilityTier;
  personalityLeaning: string;
  talentBias: string;
}

export interface TimelineEntry {
  age: number;
  year: number;
  text: string;
  category?: string;
  isChain?: boolean;
  isMilestone?: boolean;
}

export interface GameState {
  player: Player;
  relationships: Relationship[];
  timeline: TimelineEntry[];
  currentYear: number;
  startYear: number;
  gameOver: boolean;
  deathCause?: string;
  activeChains: Record<string, string>; // chainId -> current stepId
  seenEventIds: string[];
  achievements: string[];
}
