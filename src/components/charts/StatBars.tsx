import React from 'react';
import { useGameStore } from '../../state/useGameStore';
import { formatMoney } from '../../utils/format';

const stats = [
  { key: 'health', label: 'Health', color: '#F87171', icon: '❤️' },
  { key: 'happiness', label: 'Happiness', color: '#FBBF24', icon: '😊' },
  { key: 'smarts', label: 'Smarts', color: '#60A5FA', icon: '🧠' },
  { key: 'looks', label: 'Looks', color: '#A78BFA', icon: '✨' },
  { key: 'stress', label: 'Stress', color: '#F97316', icon: '😰' },
  { key: 'reputation', label: 'Reputation', color: '#34D399', icon: '⭐' },
] as const;

export const StatBars: React.FC = () => {
  const { player } = useGameStore();

  return (
    <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {stats.map(({ key, label, color, icon }) => {
        const val = player[key as keyof typeof player] as number;
        const isLow = val < 25;
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, width: 22, textAlign: 'center' }}>{icon}</span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 76, fontWeight: 500 }}>{label}</span>
            <div style={{
              flex: 1, height: 8, borderRadius: 4,
              background: 'var(--bg-elevated)', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', borderRadius: 4,
                width: `${val}%`,
                background: isLow
                  ? `linear-gradient(90deg, #F87171, #F87171AA)`
                  : `linear-gradient(90deg, ${color}, ${color}AA)`,
                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: isLow ? 'lowStatPulse 2s ease-in-out infinite' : undefined,
              }} />
            </div>
            <span style={{
              fontSize: 12, fontWeight: 600, color: isLow ? '#F87171' : color,
              width: 28, textAlign: 'right', fontFamily: 'var(--font-mono)',
            }}>
              {val}
            </span>
          </div>
        );
      })}
      {/* Money as formatted currency */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 14, width: 22, textAlign: 'center' }}>💰</span>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', width: 76, fontWeight: 500 }}>Money</span>
        <span style={{
          flex: 1, fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)',
          color: player.money >= 0 ? 'var(--accent-green)' : 'var(--accent-coral)',
        }}>
          {formatMoney(player.money)}
        </span>
      </div>
    </div>
  );
};
