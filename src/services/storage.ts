import { Program, Kelas, Subkelas, Postingan, PaketSoal, Soal, HasilPeserta } from '../types';
import { mockPrograms, mockKelas, mockSubkelas, mockPostingan, allPaketSoal, allSoalList } from './mockData';

const KEYS = {
  PROGRAM: 'program_data',
  KELAS: 'kelas_data',
  SUBKELAS: 'subkelas_data',
  POSTINGAN: 'postingan_data',
  PAKET_SOAL: 'paket_soal_data',
  SOAL: 'soal_data',
  HASIL: 'hasil_data',
  IS_INITIALIZED: 'is_initialized',
  DATA_VERSION: 'data_version'
};

const CURRENT_VERSION = '1.1'; // Increment this to force update mock data

export const StorageService = {
  init: () => {
    const savedVersion = localStorage.getItem(KEYS.DATA_VERSION);
    if (!localStorage.getItem(KEYS.IS_INITIALIZED) || savedVersion !== CURRENT_VERSION) {
      localStorage.setItem(KEYS.PROGRAM, JSON.stringify(mockPrograms));
      localStorage.setItem(KEYS.KELAS, JSON.stringify(mockKelas));
      localStorage.setItem(KEYS.SUBKELAS, JSON.stringify(mockSubkelas));
      
      // Only overwrite postingan/kuis if first time or explicitly needed
      // For now, let's keep existing user posts but update hierarchy
      if (!localStorage.getItem(KEYS.IS_INITIALIZED)) {
        localStorage.setItem(KEYS.POSTINGAN, JSON.stringify(mockPostingan));
        localStorage.setItem(KEYS.PAKET_SOAL, JSON.stringify(allPaketSoal));
        localStorage.setItem(KEYS.SOAL, JSON.stringify(allSoalList));
        localStorage.setItem(KEYS.HASIL, JSON.stringify([]));
      }
      
      localStorage.setItem(KEYS.IS_INITIALIZED, 'true');
      localStorage.setItem(KEYS.DATA_VERSION, CURRENT_VERSION);
    }
  },

  // Program
  getPrograms: (): Program[] => JSON.parse(localStorage.getItem(KEYS.PROGRAM) || '[]'),
  saveProgram: (data: Program) => {
    const all = StorageService.getPrograms();
    const index = all.findIndex(p => p.id === data.id);
    if (index > -1) all[index] = data;
    else all.push(data);
    localStorage.setItem(KEYS.PROGRAM, JSON.stringify(all));
  },
  deleteProgram: (id: string) => {
    const all = StorageService.getPrograms().filter(p => p.id !== id);
    localStorage.setItem(KEYS.PROGRAM, JSON.stringify(all));
  },

  // Kelas
  getKelas: (): Kelas[] => JSON.parse(localStorage.getItem(KEYS.KELAS) || '[]'),
  getKelasByProgram: (programId: string): Kelas[] => 
    StorageService.getKelas().filter(k => k.programId === programId),
  saveKelas: (data: Kelas) => {
    const all = StorageService.getKelas();
    const index = all.findIndex(k => k.id === data.id);
    if (index > -1) all[index] = data;
    else all.push(data);
    localStorage.setItem(KEYS.KELAS, JSON.stringify(all));
  },

  // Subkelas
  getSubkelas: (): Subkelas[] => JSON.parse(localStorage.getItem(KEYS.SUBKELAS) || '[]'),
  getSubkelasByKelas: (kelasId: string): Subkelas[] => 
    StorageService.getSubkelas().filter(s => s.kelasId === kelasId),
  saveSubkelas: (data: Subkelas) => {
    const all = StorageService.getSubkelas();
    const index = all.findIndex(s => s.id === data.id);
    if (index > -1) all[index] = data;
    else all.push(data);
    localStorage.setItem(KEYS.SUBKELAS, JSON.stringify(all));
  },

  // Postingan
  getPostingan: (): Postingan[] => JSON.parse(localStorage.getItem(KEYS.POSTINGAN) || '[]'),
  getPostinganByKelas: (kelasId: string): Postingan[] => 
    StorageService.getPostingan().filter(p => p.kelasId === kelasId),
  getPostinganBySubkelas: (subkelasId: string): Postingan[] => 
    StorageService.getPostingan().filter(p => p.subkelasId === subkelasId),
  savePostingan: (data: Postingan) => {
    const all = StorageService.getPostingan();
    const index = all.findIndex(p => p.id === data.id);
    if (index > -1) all[index] = data;
    else all.push(data);
    localStorage.setItem(KEYS.POSTINGAN, JSON.stringify(all));
  },

  // Paket Soal
  getPaketSoal: (): PaketSoal[] => JSON.parse(localStorage.getItem(KEYS.PAKET_SOAL) || '[]'),
  getPaketSoalById: (id: string): PaketSoal | undefined => 
    StorageService.getPaketSoal().find(p => p.id === id),
  savePaketSoal: (data: PaketSoal) => {
    const all = StorageService.getPaketSoal();
    const index = all.findIndex(p => p.id === data.id);
    if (index > -1) all[index] = data;
    else all.push(data);
    localStorage.setItem(KEYS.PAKET_SOAL, JSON.stringify(all));
  },

  // Soal
  getSoal: (): Soal[] => JSON.parse(localStorage.getItem(KEYS.SOAL) || '[]'),
  getSoalByPaket: (paketId: string): Soal[] => 
    StorageService.getSoal().filter(s => s.paketId === paketId),
  saveSoal: (data: Soal) => {
    const all = StorageService.getSoal();
    const index = all.findIndex(s => s.id === data.id);
    if (index > -1) all[index] = data;
    else all.push(data);
    localStorage.setItem(KEYS.SOAL, JSON.stringify(all));
  },
  saveSoalList: (paketId: string, list: Soal[]) => {
    const allOther = StorageService.getSoal().filter(s => s.paketId !== paketId);
    const updated = [...allOther, ...list];
    localStorage.setItem(KEYS.SOAL, JSON.stringify(updated));
  },

  // Hasil
  getHasil: (): HasilPeserta[] => JSON.parse(localStorage.getItem(KEYS.HASIL) || '[]'),
  saveHasil: (data: HasilPeserta) => {
    const all = StorageService.getHasil();
    all.push(data);
    localStorage.setItem(KEYS.HASIL, JSON.stringify(all));
  }
};
