import { Program, Kelas, Subkelas, Postingan, PaketSoal, Soal, HasilPeserta } from '../types';
import { mockPrograms, mockKelas, mockSubkelas, mockPostingan, allPaketSoal, allSoalList } from './mockData';

// In-memory store — works in all environments including GitHub Pages sandboxed iframes
let _programs: Program[] = [];
let _kelas: Kelas[] = [];
let _subkelas: Subkelas[] = [];
let _postingan: Postingan[] = [];
let _paketSoal: PaketSoal[] = [];
let _soal: Soal[] = [];
let _hasil: HasilPeserta[] = [];
let _initialized = false;

export const StorageService = {
  init: () => {
    if (_initialized) return;
    _programs = JSON.parse(JSON.stringify(mockPrograms));
    _kelas = JSON.parse(JSON.stringify(mockKelas));
    _subkelas = JSON.parse(JSON.stringify(mockSubkelas));
    _postingan = JSON.parse(JSON.stringify(mockPostingan));
    _paketSoal = JSON.parse(JSON.stringify(allPaketSoal));
    _soal = JSON.parse(JSON.stringify(allSoalList));
    _hasil = [];
    _initialized = true;
  },

  // Program
  getPrograms: (): Program[] => [..._programs],
  saveProgram: (data: Program) => {
    const index = _programs.findIndex(p => p.id === data.id);
    if (index > -1) _programs[index] = data;
    else _programs.push(data);
  },
  deleteProgram: (id: string) => {
    _programs = _programs.filter(p => p.id !== id);
  },

  // Kelas
  getKelas: (): Kelas[] => [..._kelas],
  getKelasByProgram: (programId: string): Kelas[] =>
    _kelas.filter(k => k.programId === programId),
  saveKelas: (data: Kelas) => {
    const index = _kelas.findIndex(k => k.id === data.id);
    if (index > -1) _kelas[index] = data;
    else _kelas.push(data);
  },

  // Subkelas
  getSubkelas: (): Subkelas[] => [..._subkelas],
  getSubkelasByKelas: (kelasId: string): Subkelas[] =>
    _subkelas.filter(s => s.kelasId === kelasId),
  saveSubkelas: (data: Subkelas) => {
    const index = _subkelas.findIndex(s => s.id === data.id);
    if (index > -1) _subkelas[index] = data;
    else _subkelas.push(data);
  },

  // Postingan
  getPostingan: (): Postingan[] => [..._postingan],
  getPostinganByKelas: (kelasId: string): Postingan[] =>
    _postingan.filter(p => p.kelasId === kelasId),
  getPostinganBySubkelas: (subkelasId: string): Postingan[] =>
    _postingan.filter(p => p.subkelasId === subkelasId),
  savePostingan: (data: Postingan) => {
    const index = _postingan.findIndex(p => p.id === data.id);
    if (index > -1) _postingan[index] = data;
    else _postingan.push(data);
  },

  // Paket Soal
  getPaketSoal: (): PaketSoal[] => [..._paketSoal],
  getPaketSoalById: (id: string): PaketSoal | undefined =>
    _paketSoal.find(p => p.id === id),
  savePaketSoal: (data: PaketSoal) => {
    const index = _paketSoal.findIndex(p => p.id === data.id);
    if (index > -1) _paketSoal[index] = data;
    else _paketSoal.push(data);
  },

  // Soal
  getSoal: (): Soal[] => [..._soal],
  getSoalByPaket: (paketId: string): Soal[] =>
    _soal.filter(s => s.paketId === paketId),
  saveSoal: (data: Soal) => {
    const index = _soal.findIndex(s => s.id === data.id);
    if (index > -1) _soal[index] = data;
    else _soal.push(data);
  },
  saveSoalList: (paketId: string, list: Soal[]) => {
    _soal = _soal.filter(s => s.paketId !== paketId);
    _soal = [..._soal, ...list];
  },

  // Hasil
  getHasil: (): HasilPeserta[] => [..._hasil],
  saveHasil: (data: HasilPeserta) => {
    _hasil.push(data);
  },
};
