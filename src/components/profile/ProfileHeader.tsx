import React from 'react';
import { useGameStore } from '../../state/useGameStore';
import { getLifeStage } from '../../utils/format';

const genderEmoji = (gender: string, age: number) => {
  if (age < 13) return gender === 'female' ? '👧' : '👦';
  if (age < 25) return gender === 'female' ? '👩' : gender === 'male' ? '👨' : '🧑';
  if (age < 60) return gender === 'female' ? '👩‍💼' : gender === 'male' ? '👨‍💼' : '🧑‍💼';
  return gender === 'female' ? '👵' : gender === 'male' ? '👴' : '🧓';
};

const cityNames: Record<string, string> = {
  coastalTech: 'San Francisco',
  expensiveCreative: 'New York',
  suburbanSprawl: 'Phoenix',
  collegeTown: 'Austin',
  ruralTown: 'Cedar Falls',
  sunbeltBoom: 'Miami',
};

const jobNames: Record<string, string> = {
  barista_01: 'Barista',
};

const lifeStageLabels: Record<string, string> = {
  childhood: 'Childhood',
  teen: 'Teen',
  youngAdult: 'Young Adult',
  adult: 'Adult',
  senior: 'Senior',
};

export const ProfileHeader: React.FC = () => {
  const { player } = useGameStore();
  const happiness = player.happiness;
  // Map happiness 0-100 to glow intensity
  const glowAlpha = Math.round((happiness / 100) * 0.6 * 100) / 100;
  const glowColor = happiness > 60 ? `rgba(251,191,36,${glowAlpha})` : happiness > 30 ? `rgba(96,165,250,${glowAlpha})` : `rgba(248,113,113,${glowAlpha})`;
  const stage = getLifeStage(player.age);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16, padding: '20px 20px 16px',
    }}>
      <div style={{
        width: 68, height: 68, borderRadius: 20,
        background: 'linear-gradient(135deg, #1A1A1F, #222228)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, boxShadow: `var(--shadow-card), 0 0 20px ${glowColor}`,
        border: `2px solid ${glowColor}`,
        transition: 'box-shadow 0.6s ease, border-color 0.6s ease',
      }}>
        {genderEmoji(player.gender, player.age)}
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{
          fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)',
          letterSpacing: -0.3, marginBottom: 2,
        }}>
          {player.name}
        </h1>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span>Age {player.age}</span>
          <span>📍 {cityNames[player.cityType] || player.cityType}</span>
          {player.jobId && <span>💼 {jobNames[player.jobId] || 'Employed'}</span>}
        </div>
        <div style={{
          fontSize: 11, color: 'var(--text-muted)', fontWeight: 600,
          letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 3,
        }}>
          {lifeStageLabels[stage] || stage}
        </div>
      </div>
      <div style={{
        textAlign: 'right', padding: '8px 14px', borderRadius: 12,
        background: 'linear-gradient(135deg, rgba(52,211,153,0.1), rgba(52,211,153,0.05))',
      }}>
        <div style={{ fontSize: 11, color: 'var(--accent-green)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>Money</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
          ${player.money.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
