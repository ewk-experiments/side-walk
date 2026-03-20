import React from 'react';
import type { EventCategory } from '../../types/event';
import { useGameStore } from '../../state/useGameStore';
import { StatDelta } from './StatDelta';

const categoryIcons: Record<EventCategory, string> = {
  family: '👨‍👩‍👧',
  school: '🎓',
  romance: '💕',
  work: '💼',
  money: '💰',
  health: '🏥',
  social: '🎉',
  housing: '🏠',
  absurd: '🎪',
};

const categoryColors: Record<EventCategory, string> = {
  family: '#A78BFA',
  school: '#60A5FA',
  romance: '#F87171',
  work: '#FBBF24',
  money: '#34D399',
  health: '#F87171',
  social: '#A78BFA',
  housing: '#60A5FA',
  absurd: '#FBBF24',
};

export const EventModal: React.FC = () => {
  const { currentEvent, showEventModal, showResult, selectChoice, dismissResult } = useGameStore();

  if (!showEventModal || !currentEvent) return null;

  const color = categoryColors[currentEvent.category];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      animation: 'backdropFadeIn 0.35s ease forwards',
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #1A1A1F 0%, #111113 100%)',
        borderRadius: 20, maxWidth: 420, width: '100%',
        padding: '32px 24px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        animation: 'slideUpModal 0.35s ease',
        border: `1px solid ${color}22`,
      }}>
        {/* Category badge */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: `${color}18`, padding: '6px 16px', borderRadius: 20,
            fontSize: 13, fontWeight: 600, color, textTransform: 'uppercase', letterSpacing: 1,
          }}>
            <span style={{ fontSize: 18 }}>{categoryIcons[currentEvent.category]}</span>
            {currentEvent.category}
          </div>
        </div>

        {/* Event text */}
        <p style={{
          fontSize: 17, lineHeight: 1.6, color: '#E8E4DF',
          textAlign: 'center', marginBottom: 28,
        }}>
          {currentEvent.text}
        </p>

        {!showResult ? (
          /* Choices */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentEvent.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => selectChoice(currentEvent.id, choice.id)}
                className="choice-btn"
                style={{
                  padding: '14px 20px', borderRadius: 14,
                  background: 'var(--bg-hover)', fontSize: 15, fontWeight: 500,
                  color: 'var(--text-primary)', textAlign: 'left',
                  border: '1px solid transparent',
                  borderLeft: `3px solid ${color}`,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${color}15`;
                  e.currentTarget.style.borderColor = `${color}40`;
                  e.currentTarget.style.borderLeftColor = color;
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.borderLeftColor = color;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.97)';
                  e.currentTarget.style.background = `${color}25`;
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.background = `${color}15`;
                }}
              >
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          /* Result */
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: '#E8E4DF', marginBottom: 16 }}>
              {showResult.text}
            </p>
            <StatDelta effects={showResult.effects} />
            <button
              onClick={dismissResult}
              style={{
                marginTop: 24, padding: '14px 48px', borderRadius: 14,
                background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                color: '#0A0A0B', fontSize: 15, fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
