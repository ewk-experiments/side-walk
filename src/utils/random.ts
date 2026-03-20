export function createPRNG(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

let _rng = createPRNG(Date.now());

export function setSeed(seed: number): void {
  _rng = createPRNG(seed);
}

export function random(): number {
  return _rng();
}

export function randomInt(min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number): number {
  return random() * (max - min) + min;
}

export function randomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(random() * arr.length)];
}

export function weightedRandom<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

// console.log('Random test:', randomInt(1, 10), randomFloat(0, 1), randomFromArray(['a','b','c']), weightedRandom(['rare','common'], [1, 99]));
