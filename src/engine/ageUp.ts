import type { GameState, TimelineEntry, Relationship } from '../types/game';
import { clampStat } from '../utils/format';
import { getJobById } from '../content/jobs';
import { getCityByType } from '../content/cities';
import { firstNames, lastNames } from '../content/names';

const housingCosts: Record<string, number> = {
  familyHome: 0,
  homeless: 0,
  sharedApartment: 8000,
  apartment: 18000,
  house: 30000,
  mansion: 80000,
};

const educationProgression: Record<number, string | undefined> = {
  5: 'elementary',
  14: 'highSchool',
};

const familyTypes = new Set(['mother', 'father', 'sibling', 'child', 'guardian']);

const ageMilestones: Record<number, string> = {
  5: 'Started kindergarten.',
  13: 'Became a teenager.',
  16: 'Got a learner\'s permit.',
  18: 'Turned 18. Officially an adult.',
  21: 'Turned 21.',
  30: 'The big 3-0.',
  40: 'Entered the forties.',
  50: 'Half a century.',
  65: 'Retirement age.',
};

export function ageUp(state: GameState): GameState {
  const p = { ...state.player };
  p.age += 1;
  const year = state.currentYear + 1;
  let newTimeline = [...state.timeline];

  // Education auto-progression
  const eduLevel = educationProgression[p.age];
  if (eduLevel && (p.educationLevel === 'none' || p.educationLevel === 'elementary')) {
    p.educationLevel = eduLevel as typeof p.educationLevel;
  }

  // Job income (applied as yearly salary after housing costs)
  if (p.jobId) {
    const job = getJobById(p.jobId);
    if (job) {
      p.money += job.salary; // yearly salary
      p.stress = clampStat(p.stress + job.stressImpact * 0.1);
    }
  }

  // Housing cost
  const housingCost = housingCosts[p.housingType] ?? 0;
  const city = getCityByType(p.cityType);
  p.money -= housingCost * city.costOfLiving;

  // Savings interest (2% on positive balance)
  if (p.money > 0) {
    p.money += Math.floor(p.money * 0.02);
  }

  // Passive stat drift based on conditions
  if (p.conditions.includes('depressed')) {
    p.happiness = clampStat(p.happiness - 3);
    p.health = clampStat(p.health - 1);
  }
  if (p.conditions.includes('addicted') || p.conditions.includes('Addiction')) {
    p.health = clampStat(p.health - 5);
    p.happiness = clampStat(p.happiness - 5);
    p.stress = clampStat(p.stress + 10);
    p.money -= 2000;
  }
  if (p.conditions.includes('fit')) {
    p.health = clampStat(p.health + 2);
    p.looks = clampStat(p.looks + 1);
  }
  if (p.conditions.includes('studying')) {
    p.smarts = clampStat(p.smarts + 3);
    p.stress = clampStat(p.stress + 2);
  }
  if (p.conditions.includes('Caffeine Dependent')) {
    p.health = clampStat(p.health - 2);
    p.smarts = clampStat(p.smarts + 3);
  }
  if (p.conditions.includes('Fitness Buff')) {
    p.health = clampStat(p.health + 3);
    p.looks = clampStat(p.looks + 2);
    p.stress = clampStat(p.stress - 2);
  }
  if (p.conditions.includes('In Therapy')) {
    p.stress = clampStat(p.stress - 5);
    p.happiness = clampStat(p.happiness + 3);
  }
  if (p.conditions.includes('Student Loans')) {
    if (p.age < 40) {
      p.money -= 2000;
    } else {
      p.conditions = p.conditions.filter(c => c !== 'Student Loans');
    }
  }
  if (p.conditions.includes('Social Media Famous')) {
    p.reputation = clampStat(p.reputation + 10);
    p.stress = clampStat(p.stress + 5);
  }
  if (p.conditions.includes('Heartbroken')) {
    p.happiness = clampStat(p.happiness - 10);
    // Track heartbroken duration via a hidden counter condition
    const hbYears = p.conditions.filter(c => c === '_heartbroken_year').length;
    if (hbYears >= 1) {
      p.conditions = p.conditions.filter(c => c !== 'Heartbroken' && c !== '_heartbroken_year');
    } else {
      p.conditions = [...p.conditions, '_heartbroken_year'];
    }
  }
  if (p.conditions.includes('Pregnant')) {
    p.health = clampStat(p.health - 5);
    p.stress = clampStat(p.stress + 10);
    p.happiness = clampStat(p.happiness + 5);
    // Auto-transition to New Parent after 1 year
    p.conditions = p.conditions.filter(c => c !== 'Pregnant');
    p.conditions.push('New Parent');
  }
  if (p.conditions.includes('New Parent')) {
    p.stress = clampStat(p.stress + 15);
    p.happiness = clampStat(p.happiness + 5);
    p.money -= 5000;
    // Remove after 2 years
    const npYears = p.conditions.filter(c => c === '_newparent_year').length;
    if (npYears >= 1) {
      p.conditions = p.conditions.filter(c => c !== 'New Parent' && c !== '_newparent_year');
    } else {
      p.conditions = [...p.conditions, '_newparent_year'];
    }
  }

  // Stress natural decay — base -2, plus bonuses
  let stressReduction = 2;
  if (p.happiness > 60) stressReduction += 1;
  if (!p.jobId) stressReduction += 3; // retired/unemployed
  p.stress = clampStat(p.stress - stressReduction);

  // Age-based drift
  if (p.age > 50) {
    p.health = clampStat(p.health - 1);
  }
  if (p.age > 70) {
    p.health = clampStat(p.health - 2);
    p.looks = clampStat(p.looks - 1);
  }

  // Relationship drift — gentle decay with type-based rates
  const relationships = state.relationships.map(r => {
    if (r.status !== 'alive') return r;
    const updated = { ...r, age: r.age + 1 };

    // Determine decay rate by relationship type
    let decay: number;
    if (r.type === 'spouse') {
      decay = 0.1; // spouse barely decays
    } else if (familyTypes.has(r.type)) {
      decay = 0.5; // family decays slowly
    } else {
      decay = 0.5; // friends, etc. — gentle decay
    }

    updated.closeness = Math.max(0, updated.closeness - decay);

    // Small random closeness boost (simulate natural interactions, ~30% chance)
    if (Math.random() < 0.3) {
      const boost = r.type === 'spouse' ? 3 : familyTypes.has(r.type) ? 2 : 1;
      updated.closeness = Math.min(100, updated.closeness + boost);
    }

    // Drama tends to settle over time
    if (updated.drama > 10) updated.drama = Math.max(0, updated.drama - 2);
    return updated;
  });

  // Automatic age milestones
  const milestoneText = ageMilestones[p.age];
  if (milestoneText) {
    const entry: TimelineEntry = {
      age: p.age,
      year,
      text: milestoneText,
      isMilestone: true,
    };
    newTimeline = [...newTimeline, entry];
  }

  // Education: auto-set highSchool at 18 if still lower
  if (p.age === 18 && (p.educationLevel === 'none' || p.educationLevel === 'elementary')) {
    p.educationLevel = 'highSchool';
  }

  // Parent aging and death
  const updatedRelationships = relationships.map(r => {
    if (r.status !== 'alive') return r;
    if (r.type !== 'mother' && r.type !== 'father' && r.type !== 'guardian') return r;
    if (r.age >= 75 && Math.random() < 0.05) {
      newTimeline = [...newTimeline, {
        age: p.age,
        year,
        text: `${r.name} passed away at age ${r.age}.`,
        isMilestone: true,
      }];
      p.happiness = clampStat(p.happiness - 15);
      return { ...r, status: 'deceased' as const };
    }
    return r;
  });

  // New relationships: 15% chance of new friend at 16+
  if (p.age >= 16 && p.age <= 35 && Math.random() < 0.15) {
    const genderPool: ('male' | 'female' | 'nonbinary')[] = ['male', 'female', 'nonbinary'];
    const g = genderPool[Math.floor(Math.random() * genderPool.length)];
    const fName = firstNames[g][Math.floor(Math.random() * firstNames[g].length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const newFriend: Relationship = {
      id: `friend-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: `${fName} ${lName}`,
      type: 'friend',
      closeness: 40 + Math.floor(Math.random() * 21),
      drama: 0,
      status: 'alive',
      age: p.age + Math.floor(Math.random() * 5) - 2,
      metAtAge: p.age,
    };
    updatedRelationships.push(newFriend);
    newTimeline = [...newTimeline, {
      age: p.age,
      year,
      text: `Met ${newFriend.name}. Hit it off right away.`,
    }];
  }

  // Romantic interest: 10% chance at 20+ if no current partner
  if (p.age >= 20) {
    const hasPartner = updatedRelationships.some(r =>
      (r.type === 'romantic' || r.type === 'spouse') && r.status === 'alive'
    );
    if (!hasPartner && Math.random() < 0.10) {
      const g: 'male' | 'female' | 'nonbinary' = p.gender === 'male' ? 'female' : p.gender === 'female' ? 'male' : (['male', 'female', 'nonbinary'] as const)[Math.floor(Math.random() * 3)];
      const fName = firstNames[g][Math.floor(Math.random() * firstNames[g].length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const romantic: Relationship = {
        id: `romantic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name: `${fName} ${lName}`,
        type: 'romantic',
        closeness: 40 + Math.floor(Math.random() * 20),
        drama: Math.floor(Math.random() * 15),
        status: 'alive',
        age: p.age + Math.floor(Math.random() * 7) - 3,
        metAtAge: p.age,
      };
      updatedRelationships.push(romantic);
      newTimeline = [...newTimeline, {
        age: p.age,
        year,
        text: `Started seeing ${romantic.name}. Butterflies.`,
        isMilestone: true,
      }];
      p.happiness = clampStat(p.happiness + 5);
    }
  }

  // Housing upgrade hints
  if (p.age >= 18 && p.housingType === 'familyHome') {
    newTimeline = [...newTimeline, {
      age: p.age,
      year,
      text: 'Maybe it\'s time to move out of the family home...',
    }];
  }
  if (p.age >= 25 && p.money > 20000 && p.housingType === 'sharedApartment') {
    newTimeline = [...newTimeline, {
      age: p.age,
      year,
      text: 'You could probably afford your own apartment by now.',
    }];
  }
  if (p.age >= 35 && p.money > 100000 && (p.housingType === 'apartment' || p.housingType === 'sharedApartment')) {
    newTimeline = [...newTimeline, {
      age: p.age,
      year,
      text: 'You could probably afford a house at this point...',
    }];
  }

  // Auto-remove friends who drifted away (closeness < 5)
  const finalRelationships = updatedRelationships.filter(r => {
    if (r.type === 'friend' && r.status === 'alive' && r.closeness < 5) {
      newTimeline = [...newTimeline, {
        age: p.age,
        year,
        text: `Lost touch with ${r.name}.`,
      }];
      return false;
    }
    return true;
  });

  // Achievement tracking
  const achievements = [...(state.achievements || [])];
  const addAchievement = (a: string) => { if (!achievements.includes(a)) achievements.push(a); };

  if (p.smarts >= 90) addAchievement('🧠 Bookworm');
  if (p.reputation >= 80) addAchievement('⭐ Famous');
  if (p.money >= 100000) addAchievement('💰 Self-Made');
  if (p.health < 10 && p.alive) addAchievement('🩹 Survivor (health dropped below 10)');
  if (p.familyWealth === 'wealthy' && p.age <= 1) addAchievement('🥄 Silver Spoon');

  const romanticCount = finalRelationships.filter(r => r.type === 'romantic' || r.type === 'exPartner').length;
  if (romanticCount >= 3) addAchievement('💔 Heartbreaker');

  const friendCount = finalRelationships.filter(r => r.type === 'friend' && r.status === 'alive').length;
  if (friendCount >= 5) addAchievement('🤝 People Person');

  // Track consecutive low/high stress years via state metadata
  // Simple check: if stress is above 70, count it
  if (p.stress > 70) {
    const prevHighStress = (state as any)._highStressYears || 0;
    (state as any)._highStressYears = prevHighStress + 1;
    if (prevHighStress + 1 >= 10) addAchievement('😰 Workaholic');
  } else {
    (state as any)._highStressYears = 0;
  }

  if (p.stress < 20) {
    const prevLowStress = (state as any)._lowStressYears || 0;
    (state as any)._lowStressYears = prevLowStress + 1;
    if (prevLowStress + 1 >= 5) addAchievement('🧘 Zen Master');
  } else {
    (state as any)._lowStressYears = 0;
  }

  if (p.familyWealth === 'poor' && p.money >= 50000) addAchievement('📈 Rags to Riches');

  // Track happiness history
  const happinessHistory = [...(state.happinessHistory || []), p.happiness].slice(-80);

  // Track peak net worth
  const peakNetWorth = Math.max(state.peakNetWorth || 0, p.money);

  // Career progression: check job tenure for special events
  let jobStartAge = state.jobStartAge ?? null;
  // If job changed, reset tenure tracking
  if (p.jobId !== state.player.jobId) {
    jobStartAge = p.jobId ? p.age : null;
  }
  const jobTenure = (jobStartAge !== null && p.jobId) ? (p.age - jobStartAge) : 0;

  // Career progression events at 5+ year tenure
  if (jobTenure > 0 && jobTenure % 5 === 0 && p.jobId) {
    const job = getJobById(p.jobId);
    if (job) {
      const roll = Math.random();
      if (roll < 0.5) {
        // Promotion offer
        const raise = Math.round(job.salary * 0.2);
        p.money += raise;
        p.stress = clampStat(p.stress + 8);
        p.reputation = clampStat(p.reputation + 5);
        newTimeline = [...newTimeline, {
          age: p.age,
          year,
          text: `After ${jobTenure} years as a ${job.title}, you got promoted! Salary bumped by $${raise.toLocaleString()}/yr.`,
          category: 'work',
          isMilestone: true,
        }];
      } else if (roll < 0.8) {
        // Burnout
        p.stress = clampStat(p.stress + 20);
        p.happiness = clampStat(p.happiness - 10);
        p.health = clampStat(p.health - 5);
        newTimeline = [...newTimeline, {
          age: p.age,
          year,
          text: `${jobTenure} years of the same grind as a ${job.title}. Burnout is hitting hard.`,
          category: 'work',
          isMilestone: true,
        }];
      } else {
        // Headhunted
        const newSalary = Math.round(job.salary * 1.35);
        p.reputation = clampStat(p.reputation + 10);
        newTimeline = [...newTimeline, {
          age: p.age,
          year,
          text: `A recruiter reached out — another company wants you. The offer is ${newSalary.toLocaleString()}/yr. Tempting.`,
          category: 'work',
          isMilestone: true,
        }];
      }
    }
  }

  return {
    ...state,
    player: p,
    relationships: finalRelationships,
    timeline: newTimeline,
    currentYear: year,
    achievements,
    happinessHistory,
    peakNetWorth,
    jobStartAge,
  };
}

// console.log('AgeUp loaded');
