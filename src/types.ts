/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Program {
  id: string;
  nama: string;
  slug: string;
  deskripsi: string;
  urutan: number;
  createdAt: string;
}

export interface Kelas {
  id: string;
  programId: string;
  nama: string;
  slug: string;
  deskripsi: string;
  urutan: number;
  createdAt: string;
}

export interface Subkelas {
  id: string;
  kelasId: string;
  nama: string;
  slug: string;
  deskripsi: string;
  urutan: number;
  createdAt: string;
}

export type PostType = 'artikel' | 'kuis' | 'keduanya';

export interface Postingan {
  id: string;
  kelasId: string;
  subkelasId?: string;
  tipe: PostType;
  judul: string;
  body: string;
  thumbnail?: string;
  tags: string[];
  hasKuis: boolean;
  kuisId?: string;
  publishedAt?: string;
  createdAt: string;
}

export type ScoringMode = 'binary' | 'penalti' | 'skala' | 'irt';

export interface PaketSoal {
  id: string;
  postId: string;
  kode: string;
  judul: string;
  durasi_menit: number;
  mode_scoring: ScoringMode;
  totalSoal: number;
}

export interface Opsi {
  id: string;
  teks: string;
  skor: number;
}

export interface IRTParams {
  a: number; // diskriminasi
  b: number; // kesulitan
  c: number; // guessing
}

export interface Soal {
  id: string;
  paketId: string;
  urutan: number;
  konten_html: string;
  tipe_konten: string;
  opsi: Opsi[];
  kunci_jawaban: string;
  pembahasan: string;
  params_irt?: IRTParams;
}

export interface HasilPeserta {
  id: string;
  paketId: string;
  kode: string;
  nama_peserta: string;
  jawaban_map: Record<string, string>; // { soalId: opsiId }
  skor_raw: number;
  skor_irt?: number;
  durasi_selesai: number;
  submittedAt: string;
}
