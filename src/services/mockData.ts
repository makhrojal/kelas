import { Program, Kelas, Subkelas, Postingan, PaketSoal, Soal } from '@/src/types';

export const mockPrograms: Program[] = [
  {
    id: 'karier-asn',
    nama: 'PROGRAM KARIER ASN',
    slug: 'karier-asn',
    deskripsi: 'Persiapan seleksi dan pengembangan karier ASN (SAKIP, SPIP, MR, UKI).',
    urutan: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ptn-utbk',
    nama: 'PROGRAM PTN-UTBK',
    slug: 'ptn-utbk',
    deskripsi: 'Persiapan intensif menghadapi UTBK SNBT (TPS & Literasi).',
    urutan: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: 'skd',
    nama: 'PROGRAM SKD',
    slug: 'skd',
    deskripsi: 'Seleksi Kompetensi Dasar (TWK, TIU, TKP) untuk CPNS/Kedinasan.',
    urutan: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: 'skb-stan',
    nama: 'PROGRAM SKB PKN STAN',
    slug: 'skb-stan',
    deskripsi: 'Seleksi Kompetensi Bidang khusus PKN STAN (TPA & TBI).',
    urutan: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: 'toefl',
    nama: 'PROGRAM TOEFL',
    slug: 'toefl',
    deskripsi: 'Persiapan sertifikasi TOEFL (Listening, Structure, Reading).',
    urutan: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 'psikotes',
    nama: 'PROGRAM PSIKOTES',
    slug: 'psikotes',
    deskripsi: 'Latihan berbagai macam tes psikologi dan kepribadian.',
    urutan: 6,
    createdAt: new Date().toISOString()
  },
  {
    id: 'wawancara',
    nama: 'PROGRAM WAWANCARA',
    slug: 'wawancara',
    deskripsi: 'Teknik dan simulasi wawancara kerja atau beasiswa.',
    urutan: 7,
    createdAt: new Date().toISOString()
  },
  {
    id: 'kesehatan',
    nama: 'PROGRAM KESEHATAN (MCU)',
    slug: 'kesehatan',
    deskripsi: 'Panduan dan persiapan Medical Check-Up.',
    urutan: 8,
    createdAt: new Date().toISOString()
  },
  {
    id: 'kebugaran',
    nama: 'PROGRAM KEBUGARAN',
    slug: 'kebugaran',
    deskripsi: 'Latihan fisik (Kesamaptaan) untuk seleksi instansi.',
    urutan: 9,
    createdAt: new Date().toISOString()
  }
];

export const mockKelas: Kelas[] = [
  // Karier ASN
  { id: 'sakip', programId: 'karier-asn', nama: 'SAKIP', slug: 'sakip', deskripsi: 'Sistem Akuntabilitas Kinerja Instansi Pemerintah', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'spip', programId: 'karier-asn', nama: 'SPIP', slug: 'spip', deskripsi: 'Sistem Pengendalian Intern Pemerintah', urutan: 2, createdAt: new Date().toISOString() },
  { id: 'mr', programId: 'karier-asn', nama: 'Manajemen Risiko', slug: 'mr', deskripsi: 'Manajemen Risiko di Instansi Pemerintah', urutan: 3, createdAt: new Date().toISOString() },
  { id: 'uki', programId: 'karier-asn', nama: 'UKI', slug: 'uki', deskripsi: 'Unit Kepatuhan Internal', urutan: 4, createdAt: new Date().toISOString() },
  
  // PTN-UTBK
  { id: 'tps', programId: 'ptn-utbk', nama: 'TPS (Tes Potensi Skolastik)', slug: 'tps', deskripsi: 'Tes untuk mengukur kemampuan kognitif.', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'literasi', programId: 'ptn-utbk', nama: 'Literasi', slug: 'literasi', deskripsi: 'Tes Literasi dan Penalaran Matematika.', urutan: 2, createdAt: new Date().toISOString() },

  // SKD
  { id: 'twk', programId: 'skd', nama: 'TWK (Tes Wawasan Kebangsaan)', slug: 'twk', deskripsi: 'Materi Nasionalisme, Integritas, Bela Negara, dll.', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'tiu', programId: 'skd', nama: 'TIU (Tes Intelegensi Umum)', slug: 'tiu', deskripsi: 'Kemampuan verbal, numerik, dan figural.', urutan: 2, createdAt: new Date().toISOString() },
  { id: 'tkp', programId: 'skd', nama: 'TKP (Tes Karakteristik Pribadi)', slug: 'tkp', deskripsi: 'Pelayanan publik, jejaring kerja, sosial budaya, dll.', urutan: 3, createdAt: new Date().toISOString() },

  // SKB STAN
  { id: 'tpa', programId: 'skb-stan', nama: 'TPA (Tes Potensi Akademik)', slug: 'tpa', deskripsi: 'Tes potensi akademik lanjutan.', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'tbi', programId: 'skb-stan', nama: 'TBI (Tes Bahasa Inggris)', slug: 'tbi', deskripsi: 'Grammar, vocabulary, and reading comprehension.', urutan: 2, createdAt: new Date().toISOString() },

  // TOEFL
  { id: 'listening', programId: 'toefl', nama: 'Listening', slug: 'listening', deskripsi: 'Short conversations, long conversations, and talks.', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'structure', programId: 'toefl', nama: 'Structure & Written Expression', slug: 'structure', deskripsi: 'Grammar and sentence structure.', urutan: 2, createdAt: new Date().toISOString() },
  { id: 'reading', programId: 'toefl', nama: 'Reading', slug: 'reading', deskripsi: 'Reading comprehension and vocabulary.', urutan: 3, createdAt: new Date().toISOString() },

  // PSIKOTES
  { id: 'logika', programId: 'psikotes', nama: 'Tes Logika', slug: 'logika', deskripsi: 'Logika aritmatika, penalaran, dan deret.', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'kepribadian', programId: 'psikotes', nama: 'Tes Kepribadian', slug: 'kepribadian', deskripsi: 'EPPS, PAPI Kostick, dll.', urutan: 2, createdAt: new Date().toISOString() },
  { id: 'gambar', programId: 'psikotes', nama: 'Tes Gambar', slug: 'gambar', deskripsi: 'Wartegg, Baum, DAP (Draw A Person).', urutan: 3, createdAt: new Date().toISOString() },
  { id: 'ketelitian', programId: 'psikotes', nama: 'Tes Ketelitian', slug: 'ketelitian', deskripsi: 'Pauli/Kraepelin (Tes Koran).', urutan: 4, createdAt: new Date().toISOString() },

  // WAWANCARA
  { id: 'intro', programId: 'wawancara', nama: 'Personal Introduction', slug: 'intro', deskripsi: 'Cara memperkenalkan diri dengan efektif.', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'goals', programId: 'wawancara', nama: 'Motivation & Goals', deskripsi: 'Menjelaskan motivasi dan tujuan masa depan.', urutan: 2, createdAt: new Date().toISOString(), slug: 'goals' },
  { id: 'behavioral', programId: 'wawancara', nama: 'Behavioral Questions', deskripsi: 'Menjawab pertanyaan berbasis perilaku (STAR method).', urutan: 3, createdAt: new Date().toISOString(), slug: 'behavioral' },
  { id: 'critical', programId: 'wawancara', nama: 'Critical & Analytical Questions', deskripsi: 'Menghadapi pertanyaan jebakan dan analisis.', urutan: 4, createdAt: new Date().toISOString(), slug: 'critical' },
  { id: 'communication', programId: 'wawancara', nama: 'Communication & Body Language', deskripsi: 'Bahasa tubuh dan intonasi suara.', urutan: 5, createdAt: new Date().toISOString(), slug: 'communication' },

  // KESEHATAN
  { id: 'fisik', programId: 'kesehatan', nama: 'Pemeriksaan Fisik Dasar', slug: 'fisik', deskripsi: 'Tinggi badan, berat badan, tensi, dll.', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'lab', programId: 'kesehatan', nama: 'Pemeriksaan Laboratorium', slug: 'lab', deskripsi: 'Darah, urin, dan rontgen.', urutan: 2, createdAt: new Date().toISOString() },
  { id: 'organ', programId: 'kesehatan', nama: 'Pemeriksaan Organ', slug: 'organ', deskripsi: 'Jantung (EKG), Paru (Spirometri), dll.', urutan: 3, createdAt: new Date().toISOString() },
  { id: 'indra', programId: 'kesehatan', nama: 'Pemeriksaan Mata & Indra', slug: 'indra', deskripsi: 'Tes buta warna, visus, THT.', urutan: 4, createdAt: new Date().toISOString() },

  // KEBUGARAN
  { id: 'lari', programId: 'kebugaran', nama: 'Lari 12 Menit (Cooper Test)', slug: 'lari', deskripsi: 'Tips dan trik meningkatkan stamina lari.', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'shuttle', programId: 'kebugaran', nama: 'Shuttle Run', slug: 'shuttle', deskripsi: 'Latihan kelincahan lari angka 8.', urutan: 2, createdAt: new Date().toISOString() },
  { id: 'pushup', programId: 'kebugaran', nama: 'Push Up', slug: 'pushup', deskripsi: 'Teknik push up yang benar dan efisien.', urutan: 3, createdAt: new Date().toISOString() },
  { id: 'situp', programId: 'kebugaran', nama: 'Sit Up', slug: 'situp', deskripsi: 'Teknik sit up untuk hasil maksimal.', urutan: 4, createdAt: new Date().toISOString() },
  { id: 'pullup', programId: 'kebugaran', nama: 'Pull Up / Chin Up', slug: 'pullup', deskripsi: 'Latihan kekuatan otot lengan.', urutan: 5, createdAt: new Date().toISOString() }
];

export const mockSubkelas: Subkelas[] = [
  { id: 'lit-indo', kelasId: 'literasi', nama: 'Literasi Bahasa Indonesia', slug: 'lit-indo', deskripsi: 'Materi Literasi Bahasa Indonesia', urutan: 1, createdAt: new Date().toISOString() },
  { id: 'lit-ing', kelasId: 'literasi', nama: 'Literasi Bahasa Inggris', slug: 'lit-ing', deskripsi: 'Materi Literasi Bahasa Inggris', urutan: 2, createdAt: new Date().toISOString() },
  { id: 'pen-mat', kelasId: 'literasi', nama: 'Penalaran Matematika', slug: 'pen-mat', deskripsi: 'Materi Penalaran Matematika', urutan: 3, createdAt: new Date().toISOString() }
];

const generateMockData = () => {
  const postingan: Postingan[] = [];
  const paketSoal: PaketSoal[] = [];
  const soalList: Soal[] = [];

  // Data for Karier ASN
  const karierClasses = [
    { id: 'sakip', topics: ['Pengantar', 'Perencanaan'] },
    { id: 'spip', topics: ['Dasar Hukum', 'Lingkungan'] },
    { id: 'mr', topics: ['Prinsip', 'Kerangka Kerja'] },
    { id: 'uki', topics: ['Peran & Fungsi', 'Kode Etik'] }
  ];

  karierClasses.forEach((cls) => {
    cls.topics.forEach((topic, index) => {
      const id = `${cls.id}-${index + 1}`;
      const kuisId = `kuis-${id}`;
      
      postingan.push({
        id: `post-${id}`,
        kelasId: cls.id,
        tipe: 'artikel',
        judul: `${topic} ${cls.id.toUpperCase()}`,
        body: `# ${topic} ${cls.id.toUpperCase()}\n\nIni adalah artikel mengenai ${topic}.`,
        thumbnail: `https://picsum.photos/seed/${id}/800/400`,
        tags: [cls.id.toUpperCase(), topic],
        hasKuis: true,
        kuisId: kuisId,
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });

      paketSoal.push({
        id: kuisId,
        postId: `post-${id}`,
        kode: `${cls.id.toUpperCase()}-${(index + 1).toString().padStart(2, '0')}`,
        judul: `Kuis ${topic} ${cls.id.toUpperCase()}`,
        durasi_menit: 10,
        mode_scoring: 'binary',
        totalSoal: 1
      });

      soalList.push({
        id: `soal-${id}-1`,
        paketId: kuisId,
        urutan: 1,
        konten_html: `<p>Apa fokus utama dari ${topic} ${cls.id.toUpperCase()}?</p>`,
        tipe_konten: 'text',
        opsi: [
          { id: 'a', teks: 'Opsi A', skor: 0 },
          { id: 'b', teks: 'Opsi B (Benar)', skor: 1 }
        ],
        kunci_jawaban: 'b',
        pembahasan: 'Pembahasan kuis.'
      });
    });
  });

  // Data for Lulus PTN - TPS
  postingan.push({
    id: 'post-tps-1',
    kelasId: 'tps',
    tipe: 'artikel',
    judul: 'Pengenalan TPS',
    body: '# Pengenalan TPS\n\nTes Potensi Skolastik mengukur kemampuan kognitif.',
    tags: ['TPS', 'PTN'],
    hasKuis: false,
    createdAt: new Date().toISOString()
  });

  // Data for Lulus PTN - Literasi (with Subkelas)
  mockSubkelas.forEach(sub => {
    postingan.push({
      id: `post-${sub.id}`,
      kelasId: 'literasi',
      subkelasId: sub.id,
      tipe: 'artikel',
      judul: `Materi ${sub.nama}`,
      body: `# ${sub.nama}\n\nPelajari materi ${sub.nama} untuk persiapan PTN.`,
      tags: ['Literasi', sub.nama],
      hasKuis: true,
      kuisId: `kuis-${sub.id}`,
      createdAt: new Date().toISOString()
    });

    paketSoal.push({
      id: `kuis-${sub.id}`,
      postId: `post-${sub.id}`,
      kode: sub.id.toUpperCase(),
      judul: `Kuis ${sub.nama}`,
      durasi_menit: 15,
      mode_scoring: 'binary',
      totalSoal: 1
    });

    soalList.push({
      id: `soal-${sub.id}-1`,
      paketId: `kuis-${sub.id}`,
      urutan: 1,
      konten_html: `<p>Pertanyaan untuk ${sub.nama}?</p>`,
      tipe_konten: 'text',
      opsi: [{ id: 'a', teks: 'Jawaban', skor: 1 }],
      kunci_jawaban: 'a',
      pembahasan: 'Penjelasan.'
    });
  });

  return { postingan, paketSoal, soalList };
};

const data = generateMockData();
export const mockPostingan = data.postingan;
export const allPaketSoal = data.paketSoal;
export const allSoalList = data.soalList;
export const mockPaketSoal = data.paketSoal[0];
export const mockSoalList = data.soalList;

