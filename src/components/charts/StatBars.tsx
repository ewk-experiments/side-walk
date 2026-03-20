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
  const prevRef = React.useRef<Record<string, number>>({});
  const [flashMap, setFlashMap] = React.useState<Record<string, 'green' | 'red' | null>>({});

  React.useEffect(() => {
    const prev = prevRef.current;
    const newFlash: Record<string, 'green' | 'red' | null> = {};
    let changed = false;
    for (const s of stats) {
      const val = player[s.key as keyof typeof player] as number;
      const oldVal = prev[s.key];
      if (oldVal !== undefined && val !== oldVal) {
        const isStress = s.key === 'stress';
        const isGood = isStress ? val < oldVal : val > oldVal;
        newFlash[s.key] = isGood ? 'green' : 'red';
        changed = true;
      }
      prev[s.key] = val;
    }
    if (changed) {
      setFlashMap(newFlash);
      const t = setTimeout(() => setFlashMap({}), 900);
      return () => clearTimeout(t);
    }
  }, [player.health, player.happiness, player.smarts, player.looks, player.stress, player.reputation]);

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        {stats.map(({ key, label, color, icon }) => {
          const val = player[key as keyof typeof player] as number;
          const isLow = val < 20;
          const isHigh = val > 75;
          const flash = flashMap[key];
          return (
            <div
              key={key}
              className={flash === 'green' ? 'stat-flash-green' : flash === 'red' ? 'stat-flash-red' : undefined}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${isLow ? 'rgba(248, 113, 113, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                borderRadius: 14,
                padding: '14px 16px',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                boxShadow: isHigh ? `0 0 16px ${color}15` : 'none',
                animation: isLow ? 'criticalPulse 2s ease-in-out infinite' : undefined,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                </div>
                <span style={{
                  fontSize: 14, fontWeight: 700,
                  color: isLow ? '#F87171' : color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {val}
                </span>
              </div>
              <div style={{
                height: 4, borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.06)', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 2,
                  width: `${val}%`,
                  background: isLow
                    ? 'linear-gradient(90deg, #F87171, #F87171AA)'
                    : `linear-gradient(90deg, ${color}, ${color}88)`,
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: isLow ? 'lowStatPulse 2s ease-in-out infinite' : undefined,
                }} />
              </div>
            </div>
          );
        })}
      </div>
      {/* Money row */}
      <div style={{
        marginTop: 10,
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: 14,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 14 }}>💰</span>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>Money</span>
        <span style={{
          flex: 1, fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)',
          color: player.money >= 0 ? 'var(--accent-green)' : 'var(--accent-coral)',
          textAlign: 'right',
        }}>
          {formatMoney(player.money)}
        </span>
      </div>
    </div>
  );
};
