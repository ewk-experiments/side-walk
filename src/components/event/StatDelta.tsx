import React from 'react';

interface Props {
  effects: Record<string, number>;
}

const statLabels: Record<string, string> = {
  health: 'Health',
  happiness: 'Happiness',
  smarts: 'Smarts',
  looks: 'Looks',
  stress: 'Stress',
  money: 'Money',
  reputation: 'Reputation',
  relationshipDelta: 'Relationship',
};

export const StatDelta: React.FC<Props> = ({ effects }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
    {Object.entries(effects).filter(([, v]) => v !== 0).map(([key, val]) => {
      const positive = val > 0;
      const isMoney = key === 'money';
      const isStress = key === 'stress';
      const isGood = isStress ? !positive : positive;
      const display = isMoney
        ? `${positive ? '+' : ''}$${val.toLocaleString()}`
        : `${positive ? '+' : ''}${val}`;
      return (
        <span
          key={key}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            background: isGood ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)',
            color: isGood ? '#34D399' : '#F87171',
          }}
        >
          {display} {statLabels[key] || key}
        </span>
      );
    })}
  </div>
);
