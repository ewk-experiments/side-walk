export const vibrate = (pattern: number | number[]) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};

export const hapticAgeUp = () => vibrate(10);
export const hapticChoice = () => vibrate(5);
export const hapticDeath = () => vibrate([50, 50, 100]);
