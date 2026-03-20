import React from 'react';
import type { TimelineEntry } from '../../types/game';

const categoryIcons: Record<string, string> = {
  family: '👨‍👩‍👧', school: '🎓', romance: '💕', work: '💼',
  money: '💰', health: '🏥', social: '🎉', housing: '🏠', absurd: '🎪',
};

export const TimelineCard: React.FC<{ entry: TimelineEntry }> = ({ entry }) => {
  const [animated, setAnimated] = React.useState(false);

  React.useEffect(() => {
    requestAnimationFrame(() => setAnimated(true));
  }, []);

  return (
    <div
      className={animated ? 'timeline-entry-animate' : ''}
      style={{
        display: 'flex', gap: 14, padding: '0 20px',
        opacity: animated ? undefined : 0,
        position: 'relative',
      }}
    >
      {/* Timeline vertical line + dot */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: 38, flexShrink: 0,
        position: 'relative',
      }}>
        {/* Connecting line (top) */}
        <div style={{
          width: 1.5,
          height: 14,
          background: 'linear-gradient(180deg, rgba(96,165,250,0.15), rgba(167,139,250,0.2))',
          flexShrink: 0,
        }} />

        {/* Dot / Star */}
        <div style={{
          width: entry.isMilestone ? 38 : 10,
          height: entry.isMilestone ? 38 : 10,
          borderRadius: entry.isMilestone ? 12 : '50%',
          flexShrink: 0,
          background: entry.isMilestone
            ? 'rgba(255, 255, 255, 0.03)'
            : 'linear-gradient(135deg, rgba(96,165,250,0.6), rgba(167,139,250,0.6))',
          backdropFilter: entry.isMilestone ? 'blur(12px)' : undefined,
          WebkitBackdropFilter: entry.isMilestone ? 'blur(12px)' : undefined,
          border: entry.isMilestone ? '1px solid rgba(251,191,36,0.3)' : '2px solid rgba(10,10,11,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: entry.isMilestone ? 16 : 0,
          boxShadow: entry.isMilestone ? '0 0 12px rgba(251,191,36,0.15)' : '0 0 6px rgba(96,165,250,0.2)',
        }}>
          {entry.isMilestone ? '⭐' : null}
        </div>

        {/* Connecting line (bottom) */}
        <div style={{
          width: 1.5,
          flex: 1,
          minHeight: 14,
          background: 'linear-gradient(180deg, rgba(167,139,250,0.2), rgba(96,165,250,0.08))',
        }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '12px 0 16px',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 14,
          padding: 16,
        }}>
          <div style={{
            fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4,
            fontFamily: 'var(--font-mono)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span>Age {entry.age}</span>
            <span style={{ color: 'var(--text-muted)', opacity: 0.4 }}>·</span>
            <span>{entry.year}</span>
            {entry.category && !entry.isMilestone && (
              <>
                <span style={{ color: 'var(--text-muted)', opacity: 0.4 }}>·</span>
                <span>{categoryIcons[entry.category] || '📅'}</span>
              </>
            )}
          </div>
          <p style={{
            fontSize: 14, lineHeight: 1.5,
            color: entry.isMilestone ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: entry.isMilestone ? 500 : 400,
          }}>
            {entry.text}
          </p>
        </div>
      </div>
    </div>
  );
};
