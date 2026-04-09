/**
 * storage.ts — GitHub-backed StorageService
 * Migrasi dari localStorage ke GitHub Contents API.
 *
 * Setup:
 *   - Set env var VITE_GITHUB_TOKEN (Personal Access Token, scope: repo)
 *   - Set env var VITE_GITHUB_OWNER (e.g. 'makhrojal')
 *   - Set env var VITE_GITHUB_REPO  (e.g. 'kelas')
 *   - Set env var VITE_GITHUB_BRANCH (default: 'main')
 *
 * Data disimpan sebagai JSON files di path:
 *   data/db/{key}.json   (contoh: data/db/program_data.json)
 *
 * Catatan: operasi write memerlukan token yang punya izin push.
 *          Untuk read-only (public repo), token tidak diperlukan.
 */

import { Program, Kelas, Subkelas, Postingan, PaketSoal, Soal, HasilPeserta } from '../types';
import { mockPrograms, mockKelas, mockSubkelas, mockPostingan, allPaketSoal, allSoalList } from './mockData';

const GITHUB_TOKEN  = import.meta.env.VITE_GITHUB_TOKEN  as string;
const GITHUB_OWNER  = import.meta.env.VITE_GITHUB_OWNER  as string;
const GITHUB_REPO   = import.meta.env.VITE_GITHUB_REPO   as string;
const GITHUB_BRANCH = (import.meta.env.VITE_GITHUB_BRANCH as string) || 'main';
const DB_PREFIX     = 'data/db';
const CURRENT_VERSION = '1.1';

// ─── GitHub helpers ────────────────────────────────────────────────────────────

const headers = () => ({
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
});

const filePath = (key: string) => `${DB_PREFIX}/${key}.json`;

async function ghGet<T>(key: string): Promise<T | null> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath(key)}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: headers() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET error ${res.status}: ${await res.text()}`);
  const { content } = await res.json();
  return JSON.parse(atob(content.replace(/\n/g, ''))) as T;
}

async function ghGetSha(key: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath(key)}?ref=${GITHUB_BRANCH}`;
  const res = await fetch(url, { headers: headers() });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  const { sha } = await res.json();
  return sha as string;
}

async function ghPut<T>(key: string, data: T, message: string): Promise<void> {
  const path = filePath(key);
  const sha  = await ghGetSha(key);
  const body: Record<string, unknown> = {
    message,
    content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2)))),
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    { method: 'PUT', headers: headers(), body: JSON.stringify(body) }
  );
  if (!res.ok) throw new Error(`GitHub PUT error ${res.status}: ${await res.text()}`);
}

// ─── In-memory cache untuk performa ────────────────────────────────────────────
const cache: Record<string, unknown> = {};

async function getAll<T>(key: string): Promise<T[]> {
  if (cache[key]) return cache[key] as T[];
  const data = await ghGet<T[]>(key);
  const result = data ?? [];
  cache[key] = result;
  return result;
}

async function setAll<T>(key: string, data: T[], message: string): Promise<void> {
  cache[key] = data;
  await ghPut(key, data, message);
}

// ─── KEYS ──────────────────────────────────────────────────────────────────────
const KEYS = {
  PROGRAM:        'program_data',
  KELAS:          'kelas_data',
  SUBKELAS:       'subkelas_data',
  POSTINGAN:      'postingan_data',
  PAKET_SOAL:     'paket_soal_data',
  SOAL:           'soal_data',
  HASIL:          'hasil_data',
  META:           'meta',
};

// ─── StorageService ────────────────────────────────────────────────────────────
export const StorageService = {

  /**
   * Init: cek versi, jika baru atau versi beda → seed data ke GitHub.
   * Jalankan sekali saat app boot.
   */
  init: async (): Promise<void> => {
    const meta = await ghGet<{ version: string; initialized: boolean }>(KEYS.META);

    if (!meta || meta.version !== CURRENT_VERSION) {
      // Seed data hierarki
      await ghPut(KEYS.PROGRAM,  mockPrograms,  'seed: program_data');
      await ghPut(KEYS.KELAS,    mockKelas,     'seed: kelas_data');
      await ghPut(KEYS.SUBKELAS, mockSubkelas,  'seed: subkelas_data');

      if (!meta?.initialized) {
        await ghPut(KEYS.POSTINGAN,  mockPostingan, 'seed: postingan_data');
        await ghPut(KEYS.PAKET_SOAL, allPaketSoal,  'seed: paket_soal_data');
        await ghPut(KEYS.SOAL,       allSoalList,   'seed: soal_data');
        await ghPut(KEYS.HASIL,      [],            'seed: hasil_data');
      }

      await ghPut(KEYS.META, { version: CURRENT_VERSION, initialized: true }, 'meta: update version');
    }

    // Warm cache
    await Promise.all([
      getAll(KEYS.PROGRAM),
      getAll(KEYS.KELAS),
      getAll(KEYS.SUBKELAS),
      getAll(KEYS.POSTINGAN),
      getAll(KEYS.PAKET_SOAL),
      getAll(KEYS.SOAL),
      getAll(KEYS.HASIL),
    ]);
  },

  // ── Program ────────────────────────────────────────────────────────────────
  getPrograms: async (): Promise<Program[]> =>
    getAll<Program>(KEYS.PROGRAM),

  saveProgram: async (data: Program): Promise<void> => {
    const all = await getAll<Program>(KEYS.PROGRAM);
    const idx = all.findIndex(p => p.id === data.id);
    if (idx > -1) all[idx] = data; else all.push(data);
    await setAll(KEYS.PROGRAM, all, `upsert program: ${data.id}`);
  },

  deleteProgram: async (id: string): Promise<void> => {
    const all = (await getAll<Program>(KEYS.PROGRAM)).filter(p => p.id !== id);
    await setAll(KEYS.PROGRAM, all, `delete program: ${id}`);
  },

  // ── Kelas ─────────────────────────────────────────────────────────────────
  getKelas: async (): Promise<Kelas[]> =>
    getAll<Kelas>(KEYS.KELAS),

  getKelasByProgram: async (programId: string): Promise<Kelas[]> =>
    (await getAll<Kelas>(KEYS.KELAS)).filter(k => k.programId === programId),

  saveKelas: async (data: Kelas): Promise<void> => {
    const all = await getAll<Kelas>(KEYS.KELAS);
    const idx = all.findIndex(k => k.id === data.id);
    if (idx > -1) all[idx] = data; else all.push(data);
    await setAll(KEYS.KELAS, all, `upsert kelas: ${data.id}`);
  },

  // ── Subkelas ──────────────────────────────────────────────────────────────
  getSubkelas: async (): Promise<Subkelas[]> =>
    getAll<Subkelas>(KEYS.SUBKELAS),

  getSubkelasByKelas: async (kelasId: string): Promise<Subkelas[]> =>
    (await getAll<Subkelas>(KEYS.SUBKELAS)).filter(s => s.kelasId === kelasId),

  saveSubkelas: async (data: Subkelas): Promise<void> => {
    const all = await getAll<Subkelas>(KEYS.SUBKELAS);
    const idx = all.findIndex(s => s.id === data.id);
    if (idx > -1) all[idx] = data; else all.push(data);
    await setAll(KEYS.SUBKELAS, all, `upsert subkelas: ${data.id}`);
  },

  // ── Postingan ─────────────────────────────────────────────────────────────
  getPostingan: async (): Promise<Postingan[]> =>
    getAll<Postingan>(KEYS.POSTINGAN),

  getPostinganByKelas: async (kelasId: string): Promise<Postingan[]> =>
    (await getAll<Postingan>(KEYS.POSTINGAN)).filter(p => p.kelasId === kelasId),

  getPostinganBySubkelas: async (subkelasId: string): Promise<Postingan[]> =>
    (await getAll<Postingan>(KEYS.POSTINGAN)).filter(p => p.subkelasId === subkelasId),

  savePostingan: async (data: Postingan): Promise<void> => {
    const all = await getAll<Postingan>(KEYS.POSTINGAN);
    const idx = all.findIndex(p => p.id === data.id);
    if (idx > -1) all[idx] = data; else all.push(data);
    await setAll(KEYS.POSTINGAN, all, `upsert postingan: ${data.id}`);
  },

  // ── Paket Soal ────────────────────────────────────────────────────────────
  getPaketSoal: async (): Promise<PaketSoal[]> =>
    getAll<PaketSoal>(KEYS.PAKET_SOAL),

  getPaketSoalById: async (id: string): Promise<PaketSoal | undefined> =>
    (await getAll<PaketSoal>(KEYS.PAKET_SOAL)).find(p => p.id === id),

  savePaketSoal: async (data: PaketSoal): Promise<void> => {
    const all = await getAll<PaketSoal>(KEYS.PAKET_SOAL);
    const idx = all.findIndex(p => p.id === data.id);
    if (idx > -1) all[idx] = data; else all.push(data);
    await setAll(KEYS.PAKET_SOAL, all, `upsert paket soal: ${data.id}`);
  },

  // ── Soal ──────────────────────────────────────────────────────────────────
  getSoal: async (): Promise<Soal[]> =>
    getAll<Soal>(KEYS.SOAL),

  getSoalByPaket: async (paketId: string): Promise<Soal[]> =>
    (await getAll<Soal>(KEYS.SOAL)).filter(s => s.paketId === paketId),

  saveSoal: async (data: Soal): Promise<void> => {
    const all = await getAll<Soal>(KEYS.SOAL);
    const idx = all.findIndex(s => s.id === data.id);
    if (idx > -1) all[idx] = data; else all.push(data);
    await setAll(KEYS.SOAL, all, `upsert soal: ${data.id}`);
  },

  saveSoalList: async (paketId: string, list: Soal[]): Promise<void> => {
    const allOther = (await getAll<Soal>(KEYS.SOAL)).filter(s => s.paketId !== paketId);
    await setAll(KEYS.SOAL, [...allOther, ...list], `bulk save soal for paket: ${paketId}`);
  },

  // ── Hasil ─────────────────────────────────────────────────────────────────
  getHasil: async (): Promise<HasilPeserta[]> =>
    getAll<HasilPeserta>(KEYS.HASIL),

  saveHasil: async (data: HasilPeserta): Promise<void> => {
    const all = await getAll<HasilPeserta>(KEYS.HASIL);
    all.push(data);
    await setAll(KEYS.HASIL, all, `add hasil: ${data.id ?? 'new'}`);
  },
};
