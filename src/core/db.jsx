import { createContext, useContext } from 'react';

const DBContext = createContext(null);

const STORES = ['plants', 'diaryLogs', 'bibleNotes', 'achievements'];

async function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('EasyGrowingDB', 3);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('plants')) {
        const ps = db.createObjectStore('plants', { keyPath: 'id' });
        ps.createIndex('userId', 'userId');
      }
      if (!db.objectStoreNames.contains('diaryLogs')) {
        const dl = db.createObjectStore('diaryLogs', { keyPath: 'id' });
        dl.createIndex('plantId', 'plantId');
        dl.createIndex('userId', 'userId');
      }
      if (!db.objectStoreNames.contains('bibleNotes')) {
        const bn = db.createObjectStore('bibleNotes', { keyPath: 'id' });
        bn.createIndex('userId', 'userId');
      }
      if (!db.objectStoreNames.contains('achievements')) {
        const ach = db.createObjectStore('achievements', { keyPath: 'id' });
        ach.createIndex('userId', 'userId');
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function tx(store, mode = 'readonly') {
  const db = await openDB();
  return db.transaction(store, mode).objectStore(store);
}

const db = {
  add: async (store, data) => {
    const s = await tx(store, 'readwrite');
    return new Promise((res, rej) => { const r = s.add(data); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  },
  put: async (store, data) => {
    const s = await tx(store, 'readwrite');
    return new Promise((res, rej) => { const r = s.put(data); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  },
  get: async (store, id) => {
    const s = await tx(store);
    return new Promise((res, rej) => { const r = s.get(id); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  },
  getAll: async (store) => {
    const s = await tx(store);
    return new Promise((res, rej) => { const r = s.getAll(); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  },
  delete: async (store, id) => {
    const s = await tx(store, 'readwrite');
    return new Promise((res, rej) => { const r = s.delete(id); r.onsuccess = () => res(); r.onerror = () => rej(r.error); });
  },
  getByIndex: async (store, idx, val) => {
    const s = await tx(store);
    return new Promise((res, rej) => { const r = s.index(idx).getAll(val); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  },
};

export function DBProvider({ children }) {
  return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
}

export const useDB = () => useContext(DBContext);
