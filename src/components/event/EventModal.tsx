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
  family: '#D97706',
  school: '#3B82F6',
  romance: '#EC4899',
  work: '#10B981',
  money: '#EAB308',
  health: '#EF4444',
  social: '#8B5CF6',
  housing: '#14B8A6',
  absurd: '#F59E0B',
};

export const EventModal: React.FC = () => {
  const { currentEvent, showEventModal, showResult, selectChoice, dismissResult } = useGameStore();

  // Lock background scroll when modal is open
  React.useEffect(() => {
    if (showEventModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => { document.body.classList.remove('modal-open'); };
  }, [showEventModal]);

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
      <div className={`event-cat-${currentEvent.category}`} style={{
        background: 'linear-gradient(180deg, #1A1A1F 0%, #111113 100%)',
        borderRadius: 20, maxWidth: 420, width: '100%',
        overflow: 'hidden',
        boxShadow: `0 24px 64px rgba(0,0,0,0.6)`,
        animation: 'slideUpModal 0.35s ease',
        border: `1px solid ${color}22`,
      }}>
        {/* Gradient top bar */}
        <div style={{
          height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}88, ${color})`,
        }} />

        <div style={{ padding: '28px 24px 32px' }}>
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
            textAlign: 'center', marginBottom: 0,
          }}>
            {currentEvent.text}
          </p>

          {!showResult ? (
            <>
              {/* Divider */}
              <div style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                margin: '24px 0',
              }} />

              {/* Choices */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {currentEvent.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => selectChoice(currentEvent.id, choice.id)}
                    className="choice-btn"
                    style={{
                      padding: '0', borderRadius: 14,
                      background: 'var(--bg-hover)', fontSize: 15, fontWeight: 500,
                      color: 'var(--text-primary)', textAlign: 'left',
                      border: '1px solid transparent',
                      overflow: 'hidden',
                      display: 'flex', alignItems: 'stretch',
                      minHeight: 52,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${color}15`;
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--bg-hover)';
                      e.currentTarget.style.borderColor = 'transparent';
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
                    {/* Gradient left border */}
                    <div style={{
                      width: 3, flexShrink: 0,
                      background: `linear-gradient(180deg, ${color}, ${color}66)`,
                    }} />
                    <span style={{ padding: '14px 20px', display: 'flex', alignItems: 'center' }}>
                      {choice.label}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            /* Result */
            <div style={{ textAlign: 'center' }}>
              {/* Divider */}
              <div style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                margin: '24px 0',
              }} />

              {/* Result card with inset style */}
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 14,
                padding: '20px',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.03)',
                marginBottom: 8,
              }}>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: '#E8E4DF', marginBottom: 12 }}>
                  {showResult.text}
                </p>
                <StatDelta effects={showResult.effects} />
              </div>
              <button
                onClick={dismissResult}
                style={{
                  marginTop: 20, padding: '14px 48px', borderRadius: 14,
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
    </div>
  );
};
