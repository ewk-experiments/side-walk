// Synthesized UI sounds via Web Audio API — no external files
const MASTER_VOLUME = 0.15;

let ctx: AudioContext | null = null;
let _soundEnabled: boolean = localStorage.getItem('sidewalk-sound') !== 'off';

function getCtx(): AudioContext {
  if (!ctx || ctx.state === 'closed') ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function isSoundEnabled(): boolean { return _soundEnabled; }

export function toggleSound(): boolean {
  _soundEnabled = !_soundEnabled;
  localStorage.setItem('sidewalk-sound', _soundEnabled ? 'on' : 'off');
  return _soundEnabled;
}

function osc(ac: AudioContext, type: OscillatorType, freq: number, start: number, dur: number, vol: number) {
  const o = ac.createOscillator();
  const g = ac.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(vol * MASTER_VOLUME, start + 0.005);
  g.gain.exponentialRampToValueAtTime(0.001, start + dur);
  o.connect(g).connect(ac.destination);
  o.start(start);
  o.stop(start + dur);
}

// Gentle ascending chime (2 quick notes)
export function playAgeUp() {
  if (!_soundEnabled) return;
  const ac = getCtx();
  const t = ac.currentTime;
  osc(ac, 'sine', 523.25, t, 0.15, 0.6);       // C5
  osc(ac, 'sine', 659.25, t + 0.1, 0.2, 0.5);   // E5
}

// Soft click — very short noise burst
export function playChoice() {
  if (!_soundEnabled) return;
  const ac = getCtx();
  const t = ac.currentTime;
  const buf = ac.createBuffer(1, ac.sampleRate * 0.02, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const g = ac.createGain();
  g.gain.setValueAtTime(MASTER_VOLUME * 0.5, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
  src.connect(g).connect(ac.destination);
  src.start(t);
}

// Happy sparkle — major chord arpeggio
export function playPositive() {
  if (!_soundEnabled) return;
  const ac = getCtx();
  const t = ac.currentTime;
  [523.25, 659.25, 783.99].forEach((f, i) => {
    osc(ac, 'sine', f, t + i * 0.07, 0.18, 0.45);
  });
}

// Low thud — bass with quick decay
export function playNegative() {
  if (!_soundEnabled) return;
  const ac = getCtx();
  const t = ac.currentTime;
  osc(ac, 'sine', 80, t, 0.2, 0.8);
  osc(ac, 'triangle', 60, t, 0.15, 0.5);
}

// Celebratory ascending 4-note arpeggio with shimmer
export function playMilestone() {
  if (!_soundEnabled) return;
  const ac = getCtx();
  const t = ac.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    osc(ac, 'sine', f, t + i * 0.09, 0.25, 0.4);
    osc(ac, 'triangle', f * 2, t + i * 0.09 + 0.02, 0.15, 0.15); // shimmer
  });
}

// Somber sustained minor chord, slow fade
export function playDeath() {
  if (!_soundEnabled) return;
  const ac = getCtx();
  const t = ac.currentTime;
  [261.63, 311.13, 392.0].forEach((f) => { // C4, Eb4, G4
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = 'sine';
    o.frequency.value = f;
    g.gain.setValueAtTime(MASTER_VOLUME * 0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
    o.connect(g).connect(ac.destination);
    o.start(t);
    o.stop(t + 2.0);
  });
}

// Hopeful rising major scale run
export function playNewLife() {
  if (!_soundEnabled) return;
  const ac = getCtx();
  const t = ac.currentTime;
  [523.25, 587.33, 659.25, 783.99, 880, 1046.5].forEach((f, i) => {
    osc(ac, 'sine', f, t + i * 0.08, 0.2, 0.4);
  });
}

// Tiny ping — single high note, very quiet
export function playMicroEvent() {
  if (!_soundEnabled) return;
  const ac = getCtx();
  const t = ac.currentTime;
  osc(ac, 'sine', 1318.5, t, 0.1, 0.25); // E6
}
