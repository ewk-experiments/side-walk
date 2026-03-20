export interface Job {
  id: string;
  title: string;
  category: 'service' | 'office' | 'creative' | 'tech' | 'gig' | 'medical' | 'education' | 'trade' | 'executive';
  salary: number;
  requirements: { minSmarts?: number; minAge?: number; educationLevel?: string };
  stressImpact: number;
  reputationImpact: number;
  tags: string[];
}

export const jobs: Job[] = [
  // Service
  { id: 'barista', title: 'Barista', category: 'service', salary: 24000, requirements: { minAge: 16 }, stressImpact: 10, reputationImpact: 2, tags: ['entry', 'social'] },
  { id: 'cashier', title: 'Cashier', category: 'service', salary: 22000, requirements: { minAge: 16 }, stressImpact: 8, reputationImpact: 1, tags: ['entry'] },
  { id: 'server', title: 'Restaurant Server', category: 'service', salary: 28000, requirements: { minAge: 16 }, stressImpact: 15, reputationImpact: 2, tags: ['entry', 'social', 'tips'] },
  { id: 'hotel_front', title: 'Hotel Front Desk', category: 'service', salary: 30000, requirements: { minAge: 18 }, stressImpact: 12, reputationImpact: 3, tags: ['social'] },

  // Gig
  { id: 'rideshare', title: 'Rideshare Driver', category: 'gig', salary: 30000, requirements: { minAge: 21 }, stressImpact: 15, reputationImpact: 1, tags: ['flexible', 'driving'] },
  { id: 'freelance_writer', title: 'Freelance Writer', category: 'gig', salary: 32000, requirements: { minSmarts: 40 }, stressImpact: 20, reputationImpact: 5, tags: ['creative', 'flexible'] },
  { id: 'delivery', title: 'Delivery Driver', category: 'gig', salary: 26000, requirements: { minAge: 18 }, stressImpact: 12, reputationImpact: 1, tags: ['flexible', 'driving'] },

  // Trade
  { id: 'electrician', title: 'Electrician', category: 'trade', salary: 55000, requirements: { minAge: 18, minSmarts: 30 }, stressImpact: 18, reputationImpact: 8, tags: ['skilled', 'physical'] },
  { id: 'plumber', title: 'Plumber', category: 'trade', salary: 52000, requirements: { minAge: 18, minSmarts: 25 }, stressImpact: 16, reputationImpact: 7, tags: ['skilled', 'physical'] },
  { id: 'mechanic', title: 'Auto Mechanic', category: 'trade', salary: 45000, requirements: { minAge: 18 }, stressImpact: 14, reputationImpact: 5, tags: ['skilled', 'physical'] },
  { id: 'welder', title: 'Welder', category: 'trade', salary: 48000, requirements: { minAge: 18, minSmarts: 20 }, stressImpact: 20, reputationImpact: 6, tags: ['skilled', 'physical'] },

  // Office
  { id: 'admin_asst', title: 'Admin Assistant', category: 'office', salary: 36000, requirements: { minAge: 18, educationLevel: 'highSchool' }, stressImpact: 15, reputationImpact: 4, tags: ['entry', 'office'] },
  { id: 'accountant', title: 'Accountant', category: 'office', salary: 62000, requirements: { minSmarts: 55, educationLevel: 'college' }, stressImpact: 25, reputationImpact: 10, tags: ['finance', 'office'] },
  { id: 'hr_manager', title: 'HR Manager', category: 'office', salary: 72000, requirements: { minSmarts: 45, educationLevel: 'college' }, stressImpact: 22, reputationImpact: 12, tags: ['management', 'social'] },
  { id: 'marketing', title: 'Marketing Coordinator', category: 'office', salary: 48000, requirements: { minSmarts: 40, educationLevel: 'college' }, stressImpact: 18, reputationImpact: 8, tags: ['creative', 'office'] },
  { id: 'paralegal', title: 'Paralegal', category: 'office', salary: 50000, requirements: { minSmarts: 50, educationLevel: 'college' }, stressImpact: 22, reputationImpact: 9, tags: ['legal', 'office'] },

  // Creative
  { id: 'graphic_designer', title: 'Graphic Designer', category: 'creative', salary: 50000, requirements: { minSmarts: 35, educationLevel: 'highSchool' }, stressImpact: 15, reputationImpact: 8, tags: ['art', 'digital'] },
  { id: 'musician', title: 'Musician', category: 'creative', salary: 28000, requirements: { minAge: 16 }, stressImpact: 20, reputationImpact: 12, tags: ['art', 'performance'] },
  { id: 'photographer', title: 'Photographer', category: 'creative', salary: 38000, requirements: { minAge: 18 }, stressImpact: 12, reputationImpact: 10, tags: ['art', 'flexible'] },
  { id: 'game_artist', title: 'Game Artist', category: 'creative', salary: 65000, requirements: { minSmarts: 45, educationLevel: 'college' }, stressImpact: 22, reputationImpact: 10, tags: ['art', 'digital', 'tech'] },

  // Tech
  { id: 'jr_dev', title: 'Junior Developer', category: 'tech', salary: 70000, requirements: { minSmarts: 50, educationLevel: 'college' }, stressImpact: 22, reputationImpact: 10, tags: ['coding', 'digital'] },
  { id: 'sr_dev', title: 'Senior Developer', category: 'tech', salary: 120000, requirements: { minSmarts: 65, minAge: 25, educationLevel: 'college' }, stressImpact: 28, reputationImpact: 15, tags: ['coding', 'digital'] },
  { id: 'data_scientist', title: 'Data Scientist', category: 'tech', salary: 110000, requirements: { minSmarts: 70, educationLevel: 'graduate' }, stressImpact: 25, reputationImpact: 15, tags: ['analytics', 'digital'] },
  { id: 'it_support', title: 'IT Support', category: 'tech', salary: 42000, requirements: { minSmarts: 35, educationLevel: 'highSchool' }, stressImpact: 18, reputationImpact: 5, tags: ['entry', 'digital'] },

  // Medical
  { id: 'nurse', title: 'Nurse', category: 'medical', salary: 75000, requirements: { minSmarts: 55, educationLevel: 'college' }, stressImpact: 30, reputationImpact: 18, tags: ['healthcare', 'physical'] },
  { id: 'emt', title: 'EMT', category: 'medical', salary: 38000, requirements: { minSmarts: 35, educationLevel: 'highSchool' }, stressImpact: 35, reputationImpact: 15, tags: ['healthcare', 'physical', 'emergency'] },
  { id: 'doctor', title: 'Doctor', category: 'medical', salary: 200000, requirements: { minSmarts: 80, minAge: 28, educationLevel: 'graduate' }, stressImpact: 40, reputationImpact: 25, tags: ['healthcare', 'prestige'] },
  { id: 'therapist', title: 'Therapist', category: 'medical', salary: 65000, requirements: { minSmarts: 60, educationLevel: 'graduate' }, stressImpact: 22, reputationImpact: 15, tags: ['healthcare', 'social'] },

  // Education
  { id: 'tutor', title: 'Tutor', category: 'education', salary: 30000, requirements: { minSmarts: 45 }, stressImpact: 10, reputationImpact: 6, tags: ['flexible', 'social'] },
  { id: 'teacher', title: 'Teacher', category: 'education', salary: 48000, requirements: { minSmarts: 50, educationLevel: 'college' }, stressImpact: 25, reputationImpact: 14, tags: ['social', 'stable'] },
  { id: 'professor', title: 'Professor', category: 'education', salary: 90000, requirements: { minSmarts: 75, educationLevel: 'graduate' }, stressImpact: 20, reputationImpact: 20, tags: ['prestige', 'research'] },

  // Executive
  { id: 'startup_founder', title: 'Startup Founder', category: 'executive', salary: 40000, requirements: { minSmarts: 55, minAge: 22 }, stressImpact: 45, reputationImpact: 18, tags: ['risk', 'leadership'] },
  { id: 'cto', title: 'CTO', category: 'executive', salary: 180000, requirements: { minSmarts: 75, minAge: 30, educationLevel: 'college' }, stressImpact: 38, reputationImpact: 22, tags: ['leadership', 'tech'] },
  { id: 'ceo', title: 'CEO', category: 'executive', salary: 250000, requirements: { minSmarts: 70, minAge: 35, educationLevel: 'college' }, stressImpact: 45, reputationImpact: 30, tags: ['leadership', 'prestige'] },
];

export function getJobById(id: string): Job | undefined {
  return jobs.find(j => j.id === id);
}

// console.log('Jobs loaded:', jobs.length, 'jobs across', new Set(jobs.map(j => j.category)).size, 'categories');
