export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export const STORAGE_KEYS = {
  bookings: 'qowa_bookings',
  membership: 'qowa_membership',
  routines: 'qowa_routines',
  sessions: 'qowa_sessions',
  measurements: 'qowa_measurements',
  theme: 'qowa_theme',
} as const;
