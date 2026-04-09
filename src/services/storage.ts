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
  getPrograms: (): Program[] => {
    StorageService.init();
    return [..._programs];
  },
  saveProgram: (data: Program) => {
    StorageService.init();
    const index = _programs.findIndex(p => p.id === data.id);
    if (index > -1) _programs[index] = data;
    else _programs.push(data);
  },
  deleteProgram: (id: string) => {
    StorageService.init();
    _programs = _programs.filter(p => p.id !== id);
  },

  // Kelas
  getKelas: (): Kelas[] => {
    StorageService.init();
    return [..._kelas];
  },
  getKelasByProgram: (programId: string): Kelas[] => {
    StorageService.init();
    return _kelas.filter(k => k.programId === programId);
  },
  saveKelas: (data: Kelas) => {
    StorageService.init();
    const index = _kelas.findIndex(k => k.id === data.id);
    if (index > -1) _kelas[index] = data;
    else _kelas.push(data);
  },

  // Subkelas
  getSubkelas: (): Subkelas[] => {
    StorageService.init();
    return [..._subkelas];
  },
  getSubkelasByKelas: (kelasId: string): Subkelas[] => {
    StorageService.init();
    return _subkelas.filter(s => s.kelasId === kelasId);
  },
  saveSubkelas: (data: Subkelas) => {
    StorageService.init();
    const index = _subkelas.findIndex(s => s.id === data.id);
    if (index > -1) _subkelas[index] = data;
    else _subkelas.push(data);
  },

  // Postingan
  getPostingan: (): Postingan[] => {
    StorageService.init();
    return [..._postingan];
  },
  getPostinganByKelas: (kelasId: string): Postingan[] => {
    StorageService.init();
    return _postingan.filter(p => p.kelasId === kelasId);
  },
  getPostinganBySubkelas: (subkelasId: string): Postingan[] => {
    StorageService.init();
    return _postingan.filter(p => p.subkelasId === subkelasId);
  },
  savePostingan: (data: Postingan) => {
    StorageService.init();
    const index = _postingan.findIndex(p => p.id === data.id);
    if (index > -1) _postingan[index] = data;
    else _postingan.push(data);
  },

  // Paket Soal
  getPaketSoal: (): PaketSoal[] => {
    StorageService.init();
    return [..._paketSoal];
  },
  getPaketSoalById: (id: string): PaketSoal | undefined => {
    StorageService.init();
    return _paketSoal.find(p => p.id === id);
  },
  savePaketSoal: (data: PaketSoal) => {
    StorageService.init();
    const index = _paketSoal.findIndex(p => p.id === data.id);
    if (index > -1) _paketSoal[index] = data;
    else _paketSoal.push(data);
  },

  // Soal
  getSoal: (): Soal[] => {
    StorageService.init();
    return [..._soal];
  },
  getSoalByPaket: (paketId: string): Soal[] => {
    StorageService.init();
    return _soal.filter(s => s.paketId === paketId);
  },
  saveSoal: (data: Soal) => {
    StorageService.init();
    const index = _soal.findIndex(s => s.id === data.id);
    if (index > -1) _soal[index] = data;
    else _soal.push(data);
  },
  saveSoalList: (paketId: string, list: Soal[]) => {
    StorageService.init();
    _soal = _soal.filter(s => s.paketId !== paketId);
    _soal = [..._soal, ...list];
  },

  // Hasil
  getHasil: (): HasilPeserta[] => {
    StorageService.init();
    return [..._hasil];
  },
  saveHasil: (data: HasilPeserta) => {
    StorageService.init();
    _hasil.push(data);
  },
};
