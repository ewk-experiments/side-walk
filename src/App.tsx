import React from 'react';
import './index.css';
import { useGameStore } from './state/useGameStore';
import { ProfileHeader } from './components/profile/ProfileHeader';
import { StatBars } from './components/charts/StatBars';
import { ConditionChips } from './components/common/ConditionChips';
import { TimelineCard } from './components/cards/TimelineCard';
import { EventModal } from './components/event/EventModal';
import { formatMoney, getLifeStage } from './utils/format';
import { jobs } from './content/jobs';
import { getAvailableJobs, getHousingOptions } from './engine/progression';
import { hasSave } from './utils/save';

const tabs = [
  { id: 'home' as const, label: 'Home', icon: '🏠' },
  { id: 'relationships' as const, label: 'Relations', icon: '💜' },
  { id: 'career' as const, label: 'Career', icon: '💼' },
];

const educationLabels: Record<string, string> = {
  none: 'No Education', elementary: 'Elementary', highSchool: 'High School Diploma',
  college: "Bachelor's Degree", graduate: 'Graduate Degree',
};

const housingLabels: Record<string, string> = {
  familyHome: 'Family Home', sharedApartment: 'Shared Apartment', apartment: 'Apartment',
  house: 'House', mansion: 'Mansion', homeless: 'Homeless',
};

function App() {
  const store = useGameStore();
  const { screen, setScreen, gameOver } = store;
  const [toast, setToast] = React.useState<string | null>(null);

  const handleSave = () => {
    store.saveGame();
    setToast('Game saved!');
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div style={{
      maxWidth: 480, margin: '0 auto', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column', position: 'relative',
      background: 'var(--bg-deep)',
    }}>
      {screen === 'title' && <TitleScreen />}

      {screen !== 'title' && (
        <>
          <header style={{
            padding: '12px 20px 0', textAlign: 'center',
            background: 'linear-gradient(180deg, var(--bg-card) 0%, var(--bg-deep) 100%)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span
              onClick={() => {
                if (store.gameOver || !store.player.alive) {
                  setScreen('title');
                } else if (window.confirm('Return to title screen? Your unsaved progress will be lost.')) {
                  setScreen('title');
                }
              }}
              style={{
              fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
            }}>
              Side Walk
            </span>
            <button
              onClick={() => { handleSave(); }}
              style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 8,
                background: 'var(--bg-elevated)', color: 'var(--text-muted)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              💾 Save
            </button>
          </header>

          <main key={screen} className="fade-in" style={{ flex: 1, overflowY: 'auto', paddingBottom: 140 }}>
            {screen === 'home' && <HomeScreen />}
            {screen === 'relationships' && <RelationshipsScreen />}
            {screen === 'career' && <CareerScreen />}
            {screen === 'summary' && <SummaryScreen />}
          </main>

          {screen === 'home' && !gameOver && (
            <div style={{
              position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
              zIndex: 50,
            }}>
              <button
                onClick={store.ageUp}
                style={{
                  padding: '16px 48px', borderRadius: 50,
                  background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
                  color: '#0A0A0B', fontSize: 16, fontWeight: 800,
                  letterSpacing: 0.5, boxShadow: '0 4px 24px rgba(96,165,250,0.35)',
                  fontFamily: 'var(--font-display)', cursor: 'pointer',
                  border: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 32px rgba(96,165,250,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(96,165,250,0.35)'; }}
              >
                ⏩ Age Up to {store.player.age + 1}
              </button>
            </div>
          )}

          {screen !== 'summary' && (
            <nav style={{
              position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
              width: '100%', maxWidth: 480,
              background: 'linear-gradient(180deg, transparent, var(--bg-card) 20%)',
              padding: '12px 0 max(12px, env(safe-area-inset-bottom))',
              display: 'flex', justifyContent: 'space-around',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              zIndex: 40,
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setScreen(tab.id)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '6px 20px', borderRadius: 12,
                    background: screen === tab.id ? 'rgba(96,165,250,0.1)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{tab.icon}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
                    color: screen === tab.id ? 'var(--accent-blue)' : 'var(--text-muted)',
                  }}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </nav>
          )}

          <EventModal />

          {toast && (
            <div style={{
              position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)',
              padding: '10px 24px', borderRadius: 12,
              background: 'rgba(52,211,153,0.9)', color: '#0A0A0B',
              fontSize: 14, fontWeight: 700, zIndex: 200,
              animation: 'fadeIn 0.2s ease, fadeOut 0.3s ease 1.7s forwards',
              boxShadow: '0 4px 16px rgba(52,211,153,0.3)',
            }}>
              {toast}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── Title Screen ── */
function TitleScreen() {
  const { newGame, loadGame } = useGameStore();
  const hasSaved = hasSave();

  return (
    <div className="fade-in" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100dvh', padding: 40, textAlign: 'center',
      background: 'linear-gradient(135deg, #0A0A0B 0%, #1a1025 25%, #0d1a2e 50%, #1a0a1e 75%, #0A0A0B 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 12s ease infinite',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16, animation: 'float 3s ease-in-out infinite' }}>🌆</div>
      <h1 style={{
        fontSize: 48, fontWeight: 900, fontFamily: 'var(--font-display)',
        background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple), var(--accent-coral))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 8, letterSpacing: -1,
      }}>
        Side Walk
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 48, maxWidth: 280, opacity: 0, animation: 'fadeIn 1s ease 0.6s forwards' }}>
        Every step is a choice. Every year is a story.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
        <button
          onClick={newGame}
          style={{
            padding: '16px 32px', borderRadius: 50,
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
            color: '#0A0A0B', fontSize: 16, fontWeight: 800,
            boxShadow: '0 4px 24px rgba(96,165,250,0.35)',
            fontFamily: 'var(--font-display)', border: 'none', cursor: 'pointer',
            width: '100%',
          }}
        >
          New Life
        </button>
        {hasSaved && (
          <button
            onClick={() => loadGame()}
            style={{
              padding: '14px 32px', borderRadius: 50,
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)', fontSize: 15, fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'var(--font-display)', cursor: 'pointer',
              width: '100%',
            }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Home Screen ── */
function HomeScreen() {
  const { timeline } = useGameStore();
  const reversed = [...timeline].reverse();
  const timelineEndRef = React.useRef<HTMLDivElement>(null);
  const prevLen = React.useRef(timeline.length);

  React.useEffect(() => {
    if (timeline.length > prevLen.current && timelineEndRef.current) {
      timelineEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    prevLen.current = timeline.length;
  }, [timeline.length]);

  return (
    <div className="fade-in">
      <ProfileHeader />
      <StatBars />
      <ConditionChips />
      <div style={{
        padding: '0 20px', marginBottom: 8,
        fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
        color: 'var(--text-muted)',
      }}>
        Timeline
      </div>
      <div>
        <div ref={timelineEndRef} />
        {reversed.map((entry, i) => (
          <TimelineCard key={`${entry.age}-${i}`} entry={entry} />
        ))}
      </div>
    </div>
  );
}

/* ── Relationships Screen ── */
function RelationshipsScreen() {
  const { relationships, interactRelationship } = useGameStore();

  const typeColors: Record<string, string> = {
    mother: '#A78BFA', father: '#60A5FA', sibling: '#34D399',
    friend: '#FBBF24', romantic: '#F87171', spouse: '#F87171',
    child: '#A78BFA', guardian: '#60A5FA', exPartner: '#6B7280',
  };

  const actions = [
    { label: '📞 Call', action: 'call' },
    { label: '💬 Compliment', action: 'compliment' },
    { label: '😤 Argue', action: 'argue' },
    { label: '🎮 Hang Out', action: 'hangout' },
  ];

  return (
    <div className="fade-in" style={{ padding: 20 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, fontFamily: 'var(--font-display)' }}>
        Relationships
      </h2>
      {relationships.length === 0 && (
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>No relationships yet.</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {relationships.map((r) => {
          const isDeceased = r.status === 'deceased';
          return (
          <div key={r.id} style={{
            background: 'var(--bg-card)', borderRadius: 16, padding: 16,
            border: '1px solid rgba(255,255,255,0.04)',
            boxShadow: 'var(--shadow-card)',
            opacity: isDeceased ? 0.55 : 1,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>
                  {isDeceased ? `In memory of ${r.name}` : r.name}
                </div>
                <div style={{ fontSize: 12, color: typeColors[r.type] || '#6B7280', fontWeight: 500, textTransform: 'capitalize' }}>
                  {r.type} · Age {r.age}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {isDeceased && <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: 'rgba(107,114,128,0.2)', color: '#9CA3AF', fontWeight: 600 }}>Deceased</span>}
                {r.drama > 30 && !isDeceased && <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 10, background: 'rgba(248,113,113,0.12)', color: '#F87171' }}>🔥 Drama</span>}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: isDeceased ? 0 : 12 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 60 }}>Closeness</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 3,
                  width: `${Math.round(r.closeness)}%`,
                  background: `linear-gradient(90deg, ${typeColors[r.type] || '#60A5FA'}, ${typeColors[r.type] || '#60A5FA'}88)`,
                  transition: 'width 0.6s ease',
                }} />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', width: 24, textAlign: 'right' }}>{Math.round(r.closeness)}</span>
            </div>
            {!isDeceased && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {actions.map((a) => (
                <button
                  key={a.action}
                  onClick={() => interactRelationship(r.id, a.action)}
                  style={{
                    padding: '6px 12px', borderRadius: 10, fontSize: 12, fontWeight: 500,
                    background: 'var(--bg-elevated)', color: 'var(--text-secondary)',
                    border: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer',
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Career Screen ── */
function CareerScreen() {
  const { player, applyJob, changeHousing: changeHousingAction, study, sideHustle, quitJob } = useGameStore();
  const currentJob = jobs.find(j => j.id === player.jobId);
  const monthlyIncome = currentJob ? Math.round(currentJob.salary / 12) : 0;

  const housingCosts: Record<string, number> = {
    familyHome: 0, sharedApartment: 650, apartment: 1400, house: 2200, mansion: 5000, homeless: 0,
  };
  const rent = housingCosts[player.housingType] || 0;
  const living = 600;
  const net = monthlyIncome - rent - living;

  // Get available jobs for applying
  const state = useGameStore.getState();
  const availJobs = getAvailableJobs({
    player: state.player,
    relationships: state.relationships,
    timeline: state.timeline,
    currentYear: state.currentYear,
    startYear: state.startYear,
    gameOver: state.gameOver,
    activeChains: state.activeChains,
    seenEventIds: state.seenEventIds,
    achievements: state.achievements,
  }).filter(j => j.id !== player.jobId).slice(0, 4);

  // Age-appropriate education label
  const getEducationLabel = () => {
    if (player.age <= 4) return 'Pre-school';
    if (player.age <= 12) return 'Elementary School';
    if (player.age <= 17) return 'High School';
    return educationLabels[player.educationLevel] || 'None';
  };

  const isChild = player.age < 16;

  return (
    <div className="fade-in" style={{ padding: 20 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, fontFamily: 'var(--font-display)' }}>
        Career & Finances
      </h2>

      {/* Job card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card), var(--bg-elevated))',
        borderRadius: 16, padding: 20, marginBottom: 16,
        border: '1px solid rgba(96,165,250,0.1)', boxShadow: 'var(--shadow-card)',
      }}>
        {isChild ? (
          <>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              Employment
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)' }}>🧒 Too young to work</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
              {currentJob ? 'Current Job' : 'Unemployed'}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{currentJob?.title || 'Looking for work...'}</div>
            {currentJob && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                {formatMoney(currentJob.salary)}/yr · {currentJob.category}
              </div>
            )}
          </>
        )}
      </div>

      {/* Education & Housing */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 16, border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Education</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>🎓 {getEducationLabel()}</div>
        </div>
        <div style={{ background: 'var(--bg-card)', borderRadius: 14, padding: 16, border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Housing</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>🏠 {housingLabels[player.housingType] || player.housingType}</div>
        </div>
      </div>

      {/* Monthly Breakdown - hide for children at home */}
      {!isChild && <div style={{
        background: 'var(--bg-card)', borderRadius: 14, padding: 16, marginBottom: 16,
        border: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>Monthly Breakdown</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>💵 Income</span>
          <span style={{ color: 'var(--accent-green)', fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: 14 }}>+{formatMoney(monthlyIncome)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>🏠 Rent</span>
          <span style={{ color: 'var(--accent-coral)', fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: 14 }}>-{formatMoney(rent)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>🍕 Living</span>
          <span style={{ color: 'var(--accent-coral)', fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: 14 }}>-{formatMoney(living)}</span>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Net</span>
          <span style={{ color: net >= 0 ? 'var(--accent-green)' : 'var(--accent-coral)', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: 14 }}>
            {net >= 0 ? '+' : ''}{formatMoney(net)}
          </span>
        </div>
      </div>}

      {/* Available Jobs */}
      {!isChild && availJobs.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Available Jobs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {availJobs.map(j => (
              <button
                key={j.id}
                onClick={() => applyJob(j.id)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 16px', borderRadius: 12,
                  background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{j.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{j.category}</div>
                </div>
                <span style={{ fontSize: 13, color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {formatMoney(j.salary)}/yr
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Career Actions */}
      {!isChild && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Actions</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button onClick={study} style={{
              padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
              background: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(96,165,250,0.05))',
              color: 'var(--accent-blue)', border: '1px solid rgba(96,165,250,0.2)', cursor: 'pointer',
            }}>📚 Study</button>
            <button onClick={sideHustle} style={{
              padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
              background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))',
              color: 'var(--accent-green)', border: '1px solid rgba(52,211,153,0.2)', cursor: 'pointer',
            }}>💰 Side Hustle</button>
            {currentJob && (
              <button onClick={quitJob} style={{
                padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
                background: 'linear-gradient(135deg, rgba(248,113,113,0.15), rgba(248,113,113,0.05))',
                color: 'var(--accent-coral)', border: '1px solid rgba(248,113,113,0.2)', cursor: 'pointer',
              }}>🚪 Quit Job</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Summary Screen ── */
function SummaryScreen() {
  const { player, timeline, relationships, restartGame, lifeSummary, deathCause } = useGameStore();
  const milestones = timeline.filter(t => t.isMilestone);
  const lifeRating = Math.round(
    (player.health + player.happiness + player.smarts + player.looks + player.reputation + (100 - player.stress)) / 6
  );

  return (
    <div className="fade-in" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🕊️</div>
      <h1 style={{
        fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-display)',
        background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 8,
      }}>
        {lifeSummary?.headline || 'A Life Lived'}
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 4 }}>
        {player.name}
      </p>
      <div style={{
        fontSize: 42, fontWeight: 900, fontFamily: 'var(--font-display)',
        background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-coral))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 4,
      }}>
        {player.age} years
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
        {deathCause}
      </p>

      {/* Life Rating */}
      <div style={{
        background: 'var(--bg-card)', borderRadius: 16, padding: 24, marginBottom: 24,
        border: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Life Rating</div>
        <div style={{
          fontSize: 56, fontWeight: 900, fontFamily: 'var(--font-display)',
          background: lifeRating >= 70
            ? 'linear-gradient(135deg, #34D399, #60A5FA)'
            : lifeRating >= 40
            ? 'linear-gradient(135deg, #FBBF24, #F97316)'
            : 'linear-gradient(135deg, #F87171, #FB923C)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {lifeRating}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>out of 100</div>
      </div>

      {/* Gradient divider */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--accent-purple), transparent)', margin: '0 40px 24px', borderRadius: 1 }} />

      {/* Achievements */}
      {lifeSummary?.achievements && lifeSummary.achievements.length > 0 && (
        <div style={{
          background: 'var(--bg-card)', borderRadius: 16, padding: 20, marginBottom: 24,
          textAlign: 'left', border: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Achievements</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {lifeSummary.achievements.map((a, i) => (
              <span key={i} style={{
                fontSize: 12, padding: '4px 10px', borderRadius: 10,
                background: 'linear-gradient(90deg, rgba(167,139,250,0.15), rgba(96,165,250,0.15), rgba(167,139,250,0.15))',
                backgroundSize: '200% 100%',
                animation: 'achievementShimmer 3s ease-in-out infinite',
                color: '#A78BFA',
                border: '1px solid rgba(167,139,250,0.15)',
              }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Gradient divider */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--accent-blue), transparent)', margin: '0 40px 24px', borderRadius: 1 }} />

      {/* Final Stats */}
      <div style={{
        background: 'var(--bg-card)', borderRadius: 16, padding: 20, marginBottom: 24,
        textAlign: 'left', border: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Final Stats</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Health', val: player.health, color: '#F87171' },
            { label: 'Happiness', val: player.happiness, color: '#FBBF24' },
            { label: 'Smarts', val: player.smarts, color: '#60A5FA' },
            { label: 'Reputation', val: player.reputation, color: '#34D399' },
            { label: 'Stress', val: player.stress, color: '#FB923C' },
            { label: 'Looks', val: player.looks, color: '#F472B6' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{s.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.val}</span>
            </div>
          ))}
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Net Worth</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: player.money >= 0 ? '#34D399' : '#F87171', fontFamily: 'var(--font-mono)' }}>{formatMoney(player.money)}</span>
          </div>
        </div>
      </div>

      {/* Key Moments */}
      {milestones.length > 0 && (
        <div style={{
          background: 'var(--bg-card)', borderRadius: 16, padding: 20, marginBottom: 24,
          textAlign: 'left', border: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Key Moments</div>
          {milestones.map((m, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ fontSize: 12, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>Age {m.age}</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 10 }}>{m.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Relationships */}
      {relationships.length > 0 && (
        <div style={{
          background: 'var(--bg-card)', borderRadius: 16, padding: 20, marginBottom: 32,
          textAlign: 'left', border: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Relationships</div>
          {relationships.map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{r.name} ({r.type})</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{Math.round(r.closeness)}/100</span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={restartGame}
        style={{
          padding: '16px 48px', borderRadius: 50,
          background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
          color: '#0A0A0B', fontSize: 16, fontWeight: 800,
          boxShadow: '0 4px 24px rgba(96,165,250,0.35)',
          fontFamily: 'var(--font-display)', border: 'none', cursor: 'pointer',
        }}
      >
        🔄 Start New Life
      </button>
    </div>
  );
}

export default App;
