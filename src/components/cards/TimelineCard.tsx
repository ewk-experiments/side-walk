import React from 'react';
import type { TimelineEntry } from '../../types/game';

const categoryIcons: Record<string, string> = {
  family: '👨‍👩‍👧', school: '🎓', romance: '💕', work: '💼',
  money: '💰', health: '🏥', social: '🎉', housing: '🏠', absurd: '🎪',
};

export const TimelineCard: React.FC<{ entry: TimelineEntry }> = ({ entry }) => (
  <div style={{
    display: 'flex', gap: 14, padding: '14px 20px',
    animation: 'slideUp 0.3s ease forwards',
  }}>
    <div style={{
      width: 38, height: 38, borderRadius: 12, flexShrink: 0,
      background: 'var(--bg-elevated)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16,
      border: entry.isMilestone ? '1px solid rgba(251,191,36,0.3)' : 'none',
    }}>
      {entry.isMilestone ? '⭐' : (categoryIcons[entry.category || ''] || '📅')}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 3, fontFamily: 'var(--font-mono)' }}>
        Age {entry.age} · {entry.year}
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: entry.isMilestone ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
        {entry.text}
      </p>
    </div>
  </div>
);
