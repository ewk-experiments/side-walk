import React from 'react';
import { useGameStore } from '../../state/useGameStore';

export const ConditionChips: React.FC = () => {
  const { player } = useGameStore();
  const all = [...player.traits.map(t => ({ label: t, type: 'trait' as const })), ...player.conditions.map(c => ({ label: c, type: 'condition' as const }))];
  if (!all.length) return null;

  return (
    <div style={{ padding: '0 20px 16px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {all.map(({ label, type }) => (
        <span key={label} style={{
          padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
          background: type === 'trait' ? 'rgba(167,139,250,0.12)' : 'rgba(251,191,36,0.12)',
          color: type === 'trait' ? '#A78BFA' : '#FBBF24',
          border: `1px solid ${type === 'trait' ? 'rgba(167,139,250,0.2)' : 'rgba(251,191,36,0.2)'}`,
        }}>
          {type === 'trait' ? '🏷️' : '⚡'} {label}
        </span>
      ))}
    </div>
  );
};
