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
  const [displayMoney, setDisplayMoney] = React.useState(player.money);
  const targetMoney = player.money;

  React.useEffect(() => {
    const diff = targetMoney - displayMoney;
    if (diff === 0) return;
    const steps = 20;
    const increment = diff / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps) {
        setDisplayMoney(targetMoney);
        clearInterval(interval);
      } else {
        setDisplayMoney(prev => Math.round(prev + increment));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [targetMoney]); // eslint-disable-line react-hooks/exhaustive-deps

  // Life quality = average of positive stats
  const lifeQuality = Math.round(
    (player.health + player.happiness + player.smarts + player.looks + player.reputation + (100 - player.stress)) / 6
  );
  const ringColor = lifeQuality > 70
    ? 'rgba(52, 211, 153, 0.7)'
    : lifeQuality > 40
    ? 'rgba(251, 191, 36, 0.7)'
    : 'rgba(248, 113, 113, 0.7)';

  const stage = getLifeStage(player.age);

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Gradient banner */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(96,165,250,0.06) 0%, rgba(167,139,250,0.04) 50%, rgba(248,113,113,0.03) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '24px 20px 20px',
        position: 'relative',
      }}>
        {/* Glassmorphic avatar circle */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, flexShrink: 0,
          border: `2.5px solid ${ringColor}`,
          boxShadow: `0 0 20px ${ringColor.replace('0.7', '0.25')}, var(--shadow-card)`,
          transition: 'border-color 0.6s ease, box-shadow 0.6s ease',
        }}>
          {genderEmoji(player.gender, player.age)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{
            fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-display)',
            letterSpacing: -0.5, marginBottom: 6, lineHeight: 1.1,
          }}>
            {player.name}
          </h1>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 20,
              background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              📍 {cityNames[player.cityType] || player.cityType}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 20,
              background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              Age {player.age} · {lifeStageLabels[stage] || stage}
            </span>
            {player.jobId && (
              <span style={{
                fontSize: 11, fontWeight: 500, padding: '3px 10px', borderRadius: 20,
                background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                💼 {jobNames[player.jobId] || 'Employed'}
              </span>
            )}
          </div>
        </div>

        {/* Money with green glow */}
        <div style={{
          textAlign: 'right', padding: '10px 16px', borderRadius: 14,
          background: 'rgba(52,211,153,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(52,211,153,0.1)',
          boxShadow: displayMoney > 0 ? '0 0 20px rgba(52,211,153,0.08)' : 'none',
        }}>
          <div style={{ fontSize: 10, color: 'var(--accent-green)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Money</div>
          <div style={{
            fontSize: 18, fontWeight: 700,
            color: displayMoney >= 0 ? 'var(--accent-green)' : 'var(--accent-coral)',
            fontFamily: 'var(--font-mono)',
            textShadow: displayMoney > 1000 ? '0 0 12px rgba(52,211,153,0.3)' : 'none',
          }} className="money-counter">
            ${displayMoney.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
