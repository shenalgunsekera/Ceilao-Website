// Anonymous device ID stamped on customer signups — IndexedDB-first so it
// survives cache clears. This is a SOFT anti-duplicate signal only: staff use
// it to spot one browser creating many accounts. It is not access control
// (incognito or clearing site data defeats it, by design).

const LS_KEY  = 'ceilao_cust_dev_id';
const DB_NAME = 'ceilao_customer_device_db';
const STORE   = 'device';
const ID_KEY  = 'id';

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      (e.target as IDBOpenDBRequest).result.createObjectStore(STORE);
    };
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
    req.onerror = () => reject(new Error('IndexedDB unavailable'));
  });
}

function dbGet(db: IDBDatabase): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(ID_KEY);
      req.onsuccess = () => resolve((req.result as string) || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function dbPut(db: IDBDatabase, id: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const req = db.transaction(STORE, 'readwrite').objectStore(STORE).put(id, ID_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

/** Returns a stable per-browser device ID (creates one on first call). */
export async function getOrCreateDeviceId(): Promise<string> {
  const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(LS_KEY) : null;
  if (cached && cached.length > 8) return cached;

  try {
    const db = await openDB();
    const stored = await dbGet(db);
    if (stored && stored.length > 8) {
      try { localStorage.setItem(LS_KEY, stored); } catch { /* ignore */ }
      return stored;
    }
    const id = generateUUID();
    await dbPut(db, id);
    try { localStorage.setItem(LS_KEY, id); } catch { /* ignore */ }
    return id;
  } catch {
    const fallback = (typeof localStorage !== 'undefined' && localStorage.getItem(LS_KEY)) || generateUUID();
    try { localStorage.setItem(LS_KEY, fallback); } catch { /* ignore */ }
    return fallback;
  }
}
