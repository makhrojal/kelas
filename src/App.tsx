/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ArticleView from './components/ArticleView';
import QuizEngine from './components/QuizEngine';
import ProtectedRoute from './components/ProtectedRoute';
import { StorageService } from './services/storage';
import { Program, Kelas, Subkelas, Postingan, PaketSoal, Soal, HasilPeserta, Opsi } from './types';
import { BookOpen, HelpCircle, ChevronRight, Trophy, Clock, Plus, Trash2, Edit, Save, X, FileText, CheckCircle, AlertCircle, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import { useAuth } from './hooks/useAuth';

// --- Home Page ---
const Home = () => {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    setPrograms(StorageService.getPrograms());
  }, []);

  return (
    <div className="space-y-[80px] pb-20 pt-8 max-w-6xl mx-auto">
      {/* --- HERO SECTION --- */}
      <section 
        className="relative overflow-hidden text-center mx-auto"
        style={{ 
          backgroundColor: 'var(--apple-bg)', 
          borderRadius: '22px', 
          padding: '52px 40px 44px',
          animation: 'fadeUp 0.6s ease forwards'
        }}
      >
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(88,204,2,0.07)', pointerEvents: 'none', filter: 'blur(40px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(28,176,246,0.06)', pointerEvents: 'none', filter: 'blur(40px)' }}></div>
        
        <div 
          className="mx-auto mb-6 relative z-10 font-semibold"
          style={{ 
            display: 'inline-flex', backgroundColor: 'var(--apple-white)', borderRadius: '100px', 
            padding: '5px 14px', fontSize: '12px', border: '1px solid rgba(88,204,2,0.3)', 
            color: 'var(--duo-green-dark)' 
          }}
        >
          🎮 Platform Belajar Adaptif
        </div>
        
        <h1 
          className="relative z-10 font-extrabold tracking-tight"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.035em', lineHeight: 1.06, color: 'var(--apple-dark)', marginBottom: '24px' }}
        >
          Belajar. Main.<br/>
          <span style={{ color: 'var(--duo-green)' }}>Naik Level.</span>
        </h1>
        
        <p 
          className="relative z-10 mx-auto"
          style={{ fontSize: '15px', color: 'var(--apple-gray)', lineHeight: 1.65, maxWidth: '500px', marginBottom: '12px' }}
        >
          Satu platform untuk semua tujuan — masuk PTN, lolos CPNS, tembus Kedinasan, atau siap karier ASN.
        </p>

        <p 
          className="relative z-10 mx-auto"
          style={{ fontSize: '13px', color: 'var(--apple-light-gray)', marginBottom: '32px' }}
        >
          Materi & kuis interaktif. Langsung akses. Tidak perlu daftar.
        </p>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6">
          <Link 
            to="/" 
            className="w-full sm:w-auto inline-flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all"
            style={{ 
              backgroundColor: 'var(--duo-green)', color: 'var(--apple-white)', borderRadius: '14px', 
              padding: '15px 36px', fontSize: '16px', fontWeight: 700 
            }}
          >
            Akses Materi Gratis →
          </Link>
          <button 
            className="w-full sm:w-auto inline-flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            style={{ 
              backgroundColor: 'var(--apple-white)', color: 'var(--apple-dark)', border: '1px solid #d1d1d6', 
              borderRadius: '14px', padding: '15px 24px', fontSize: '15px', fontWeight: 600 
            }}
          >
            Masukkan Kode Kuis
          </button>
        </div>

        <p 
          className="relative z-10 mx-auto"
          style={{ fontSize: '12px', color: 'var(--apple-light-gray)' }}
        >
          Tidak perlu daftar akun. Langsung baca & mulai kuis.
        </p>
      </section>

      {/* --- STATS BAR --- */}
      <div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-[10px]"
        style={{ animation: 'fadeUp 0.4s ease forwards', animationDelay: '0.1s', opacity: 0 }}
      >
        <div style={{ backgroundColor: 'white', border: '0.5px solid var(--apple-border)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--apple-dark)' }}>13</div>
          <div style={{ fontSize: '11px', color: 'var(--apple-light-gray)' }}>Program Tersedia</div>
        </div>
        <div style={{ backgroundColor: 'white', border: '0.5px solid var(--apple-border)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--duo-green)' }}>40+</div>
          <div style={{ fontSize: '11px', color: 'var(--apple-light-gray)' }}>Subkelas</div>
        </div>
        <div style={{ backgroundColor: 'white', border: '0.5px solid var(--apple-border)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--duo-blue)' }}>IRT</div>
          <div style={{ fontSize: '11px', color: 'var(--apple-light-gray)' }}>Scoring Canggih</div>
        </div>
        <div style={{ backgroundColor: 'white', border: '0.5px solid var(--apple-border)', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--duo-orange)' }}>0Rp</div>
          <div style={{ fontSize: '11px', color: 'var(--apple-light-gray)' }}>Biaya Akses</div>
        </div>
      </div>

      {/* --- PROGRAM SECTION HEADER --- */}
      <div className="text-center" style={{ animation: 'fadeUp 0.4s ease forwards', animationDelay: '0.15s', opacity: 0 }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--apple-gray)', marginBottom: '8px' }}>Semua Program</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--apple-dark)', marginBottom: '12px' }}>
          Satu platform. Semua jalur seleksi.
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--apple-gray)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.65 }}>
          PTN · TKA · PKN STAN · Kedinasan · AKPOL · AKMIL · UNHAN · CPNS · TOEFL · Psikotes · Wawancara · Kebugaran · ASN
        </p>
      </div>

      {/* --- FEATURED CARD: PTN & TKA --- */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #f0fff4, #e8f5ff)', borderRadius: '18px', padding: '22px', 
          border: '1px solid rgba(88,204,2,0.2)', animation: 'fadeUp 0.4s ease forwards', animationDelay: '0.2s', opacity: 0
        }}
      >
        <div style={{ background: 'var(--duo-green)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', display: 'inline-block', marginBottom: '16px' }}>PALING POPULER</div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          {/* UTBK PTN */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '18px', border: '0.5px solid var(--apple-border)', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: '#e8f5e0', borderRadius: '11px' }}>🎓</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--apple-dark)' }}>UTBK PTN</div>
                <div style={{ fontSize: '11px', color: 'var(--apple-light-gray)' }}>SNBT 2027</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--apple-gray)', marginBottom: '6px' }}>TPS — Tes Potensi Skolastik</div>
                <div className="flex flex-wrap gap-1.5">
                  <span style={{ fontSize: '11px', background: '#e8f5e0', color: '#3a9900', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>🧠 Penalaran Umum</span>
                  <span style={{ fontSize: '11px', background: '#e8f5e0', color: '#3a9900', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>📊 Peng. Kuantitatif</span>
                  <span style={{ fontSize: '11px', background: '#e8f5e0', color: '#3a9900', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>📖 PPU</span>
                  <span style={{ fontSize: '11px', background: '#e8f5e0', color: '#3a9900', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>💡 KMBM</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--apple-gray)', marginBottom: '6px' }}>Literasi & Penalaran</div>
                <div className="flex flex-wrap gap-1.5">
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>📝 Lit. Bahasa Indonesia</span>
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>🌐 Lit. Bahasa Inggris</span>
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>🔢 Pen. Matematika</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <div style={{ background: '#f5f5f7', borderRadius: '100px', height: '5px', marginBottom: '8px', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: 'var(--duo-green)', borderRadius: '100px' }}></div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--apple-gray)', fontWeight: 500 }}>
                45% materi tersedia · <span style={{ color: 'var(--duo-green)', fontWeight: 600, cursor: 'pointer' }}>Akses sekarang</span>
              </div>
            </div>
          </div>

          {/* TKA */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '18px', border: '0.5px solid var(--apple-border)', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', background: 'var(--duo-blue-soft)', borderRadius: '11px' }}>📚</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--apple-dark)' }}>TKA</div>
                <div style={{ fontSize: '11px', color: 'var(--apple-light-gray)' }}>Tes Kemampuan Akademik</div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--apple-gray)', marginBottom: '6px' }}>Saintek</div>
                <div className="flex flex-wrap gap-1.5">
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>➕ Matematika</span>
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>🔬 Fisika</span>
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>⚗️ Kimia</span>
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>🧬 Biologi</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--apple-gray)', marginBottom: '6px' }}>Soshum</div>
                <div className="flex flex-wrap gap-1.5">
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>📜 Sejarah</span>
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>🌏 Geografi</span>
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>💰 Ekonomi</span>
                  <span style={{ fontSize: '11px', background: '#f5f5f7', color: '#6e6e73', padding: '3px 8px', borderRadius: '6px', fontWeight: 500 }}>🤝 Sosiologi</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <div style={{ background: '#f5f5f7', borderRadius: '100px', height: '5px', marginBottom: '8px', overflow: 'hidden' }}>
                <div style={{ width: '15%', height: '100%', background: 'var(--duo-blue)', borderRadius: '100px' }}></div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--apple-gray)', fontWeight: 500 }}>
                15% materi tersedia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURED CARD: KEDINASAN --- */}
      <div 
        style={{ 
          background: '#fdf6ff', borderRadius: '18px', padding: '22px', 
          border: '1px solid rgba(134,65,244,0.15)', animation: 'fadeUp 0.4s ease forwards', animationDelay: '0.25s', opacity: 0
        }}
      >
        <div style={{ background: 'var(--duo-purple)', color: 'white', fontSize: '10px', fontWeight: 700, padding: '3px 9px', borderRadius: '100px', display: 'inline-block', marginBottom: '16px' }}>KEDINASAN</div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-[8px]">
          {[
            { icon: '👮', name: 'AKPOL', sub: 'SKD · SKB · MCU' },
            { icon: '⚔️', name: 'AKMIL', sub: 'SKD · SKB · MCU' },
            { icon: '📐', name: 'PKN STAN', sub: 'TPA · TBI' },
            { icon: '🏫', name: 'UNHAN', sub: 'TPA · MCU' },
            { icon: '🏛️', name: 'CPNS', sub: 'TWK · TIU · TKP' }
          ].map((item, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '14px', textAlign: 'center', border: '0.5px solid var(--apple-border)' }}>
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--apple-dark)' }}>{item.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--apple-light-gray)' }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PROGRAM GRID (6 smaller cards, 3 columns) --- */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[10px]"
        style={{ animation: 'fadeUp 0.4s ease forwards', animationDelay: '0.3s', opacity: 0 }}
      >
        {[
          { icon: '🌐', title: 'TOEFL', chips: 'Listening · Structure · Reading', prog: 20, color: 'var(--duo-blue)' },
          { icon: '🧩', title: 'Psikotes', chips: 'Logika · Kepribadian · Wartegg · Pauli', prog: 40, color: '#ce82ff' },
          { icon: '🎤', title: 'Wawancara', chips: 'Personal Intro · Behavioral · Body Language', prog: 60, color: 'var(--duo-orange)' },
          { icon: '🏥', title: 'Medical Check-Up', chips: 'Fisik · Lab · Jantung · Mata & Indra', prog: 10, color: 'var(--duo-red)' },
          { icon: '🏃', title: 'Kebugaran', chips: 'Cooper · Shuttle Run · Push Up · Sit Up', prog: 50, color: 'var(--duo-green)' }
        ].map((item, idx) => (
          <div key={idx} className="cursor-pointer transition-all hover:-translate-y-[2px]" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '18px', border: '0.5px solid var(--apple-border)', boxShadow: '0 4px 12px rgba(0,0,0,0)' }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0)'}>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ fontSize: '24px' }}>{item.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--apple-dark)' }}>{item.title}</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--apple-gray)', marginBottom: '16px', minHeight: '36px' }}>{item.chips}</div>
            <div style={{ background: '#f5f5f7', borderRadius: '100px', height: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${item.prog}%`, height: '100%', background: item.color, borderRadius: '100px' }}></div>
            </div>
          </div>
        ))}

        {/* Karier ASN Specific Card */}
        <div className="cursor-pointer transition-all hover:-translate-y-[2px]" style={{ backgroundColor: 'var(--duo-purple-soft)', borderRadius: '16px', padding: '18px', border: '1px solid rgba(134,65,244,0.15)', boxShadow: '0 4px 12px rgba(0,0,0,0)' }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0)'}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ fontSize: '24px' }}>📊</div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--apple-dark)' }}>Karier ASN</div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--apple-gray)', marginBottom: '16px', minHeight: '36px' }}>SAKIP · SPIP · MR · UKI</div>
          <div style={{ background: '#f5f5f7', borderRadius: '100px', height: '4px', overflow: 'hidden' }}>
            <div style={{ width: `30%`, height: '100%', background: 'var(--duo-purple)', borderRadius: '100px' }}></div>
          </div>
        </div>
      </div>

      {/* --- EXISTING CARDS (KEPT ALIVE) --- */}
      {programs.length > 0 && (
        <div className="mt-12" style={{ animation: 'fadeUp 0.4s ease forwards', animationDelay: '0.35s', opacity: 0 }}>
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--apple-gray)', marginBottom: '16px', textAlign: 'center' }}>Program Lainnya</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[10px]">
            {programs.map((p, idx) => (
              <Link 
                to={`/program/${p.id}`}
                key={p.id}
                className="cursor-pointer transition-all hover:-translate-y-[2px]" 
                style={{ backgroundColor: 'white', borderRadius: '16px', padding: '22px', border: '0.5px solid var(--apple-border)', display: 'block', boxShadow: '0 4px 12px rgba(0,0,0,0)' }} 
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'} 
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0)'}
              >
                <h3 style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--apple-gray)', marginBottom: '8px' }}>{p.nama}</h3>
                <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--apple-dark)', marginBottom: '16px' }}>
                  {p.deskripsi}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: 600, color: 'var(--duo-green)' }}>
                  Akses Program <ChevronRight size={14} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* --- KODE KUIS SECTION --- */}
      <div 
        style={{ 
          backgroundColor: 'white', border: '0.5px solid var(--apple-border)', borderRadius: '20px', 
          padding: '30px', textAlign: 'center', margin: '0 auto', maxWidth: '800px',
          animation: 'fadeUp 0.4s ease forwards', animationDelay: '0.4s', opacity: 0
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--duo-green)', marginBottom: '8px' }}>Sudah punya kode?</div>
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--apple-dark)', marginBottom: '12px' }}>Langsung mulai kuis.</h3>
        <p style={{ fontSize: '15px', color: 'var(--apple-gray)', marginBottom: '24px' }}>
          Masukkan kode dari instruktur — contoh: <code style={{ fontFamily: 'monospace', background: '#f5f5f7', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>SAKIP-2026</code>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-[380px] mx-auto">
          <input 
            type="text" 
            placeholder="Kode kuis…" 
            style={{ 
              flex: 1, padding: '12px 16px', border: '1px solid #d1d1d6', borderRadius: '12px', 
              fontSize: '15px', fontFamily: 'monospace', textTransform: 'uppercase', outline: 'none' 
            }} 
          />
          <button 
            className="hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            style={{ 
              backgroundColor: 'var(--apple-dark)', color: 'white', border: 'none', borderRadius: '12px', 
              padding: '12px 20px', fontSize: '14px', fontWeight: 700 
            }}
          >
            Masuk →
          </button>
        </div>
      </div>

      {/* --- FINAL CTA SECTION --- */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--apple-dark)', borderRadius: '20px', padding: '50px 40px', 
          textAlign: 'center', animation: 'fadeUp 0.4s ease forwards', animationDelay: '0.45s', opacity: 0 
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(88,204,2,0.1)', pointerEvents: 'none', filter: 'blur(30px)' }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(28,176,246,0.08)', pointerEvents: 'none', filter: 'blur(30px)' }}></div>
        
        <div className="relative z-10">
          <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--duo-green)', marginBottom: '12px' }}>Mulai sekarang.</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 32px)', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Semua jalur seleksi. Satu platform. Gratis.</h2>
          <p style={{ fontSize: '15px', color: 'var(--apple-light-gray)', marginBottom: '32px' }}>Materi langsung bisa diakses. Tidak perlu daftar akun dulu.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-[400px] mx-auto mb-6">
            <Link 
              to="/" 
              className="w-full sm:flex-1 inline-flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all"
              style={{ backgroundColor: 'var(--duo-green)', color: 'white', borderRadius: '14px', padding: '15px 24px', fontSize: '15px', fontWeight: 700 }}
            >
              Akses Materi Sekarang →
            </Link>
            <button 
              className="w-full sm:flex-1 inline-flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', padding: '15px 24px', fontSize: '15px', fontWeight: 600 }}
            >
              Daftar Akun
            </button>
          </div>
          
          <p style={{ fontSize: '12px', color: '#6e6e73' }}>Daftar akun untuk simpan progress & lihat riwayat skor.</p>
        </div>
      </div>
    </div>
  );
};

// --- Program Detail View ---
const ProgramDetail = () => {
  const { programId } = useParams();
  const [program, setProgram] = useState<Program | undefined>();
  const [kelas, setKelas] = useState<Kelas[]>([]);

  useEffect(() => {
    if (programId) {
      const allPrograms = StorageService.getPrograms();
      setProgram(allPrograms.find(p => p.id === programId));
      setKelas(StorageService.getKelasByProgram(programId));
    }
  }, [programId]);

  if (!program) return <div className="py-20 text-center opacity-40">Program tidak ditemukan</div>;

  return (
    <div className="space-y-20">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight mb-4">{program.nama}</h1>
        <p className="text-lg text-[var(--ink2)] opacity-60 leading-relaxed">{program.deskripsi}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kelas.map((k, idx) => (
          <motion.div
            key={k.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link 
              to={`/kelas/${k.id}`}
              className="group block p-8 rounded-3xl border border-[var(--border)] hover:border-[var(--ink)]/20 transition-all"
            >
              <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors">{k.nama}</h3>
              <p className="text-sm text-[var(--ink2)] opacity-60 line-clamp-2">{k.deskripsi}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Kelas View ---
const KelasView = () => {
  const { kelasId } = useParams();
  const [kelas, setKelas] = useState<Kelas | undefined>();
  const [subkelas, setSubkelas] = useState<Subkelas[]>([]);
  const [postingan, setPostingan] = useState<Postingan[]>([]);

  useEffect(() => {
    if (kelasId) {
      const allKelas = StorageService.getKelas();
      setKelas(allKelas.find(k => k.id === kelasId));
      setSubkelas(StorageService.getSubkelasByKelas(kelasId));
      setPostingan(StorageService.getPostinganByKelas(kelasId));
    }
  }, [kelasId]);

  if (!kelas) return <div className="py-20 text-center opacity-40">Kelas tidak ditemukan</div>;

  const rootLessons = postingan.filter(p => !p.subkelasId);

  return (
    <div className="space-y-24">
      <header className="space-y-6">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">
          <Link to="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link to={`/program/${kelas.programId}`} className="hover:text-[var(--ink)] transition-colors">Program</Link>
        </div>
        <h1 className="text-5xl font-bold tracking-tight">{kelas.nama}</h1>
        <p className="text-xl text-[var(--ink2)] opacity-60 max-w-2xl leading-relaxed">{kelas.deskripsi}</p>
      </header>

      {subkelas.map(sub => {
        const subLessons = postingan.filter(p => p.subkelasId === sub.id);
        if (subLessons.length === 0) return null;
        return (
          <section key={sub.id} className="space-y-10">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">{sub.nama}</h2>
              <p className="text-[13px] text-[var(--ink3)] font-medium">{sub.deskripsi}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {subLessons.map((post) => (
                <LessonCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        );
      })}

      {rootLessons.length > 0 && (
        <section className="space-y-10">
          <h2 className="text-2xl font-bold tracking-tight">Materi Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rootLessons.map((post) => (
              <LessonCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const LessonCard: React.FC<{ post: Postingan }> = ({ post }) => {
  return (
    <Link 
      to={`/artikel/${post.id}`}
      className="group block bg-[var(--bg2)] rounded-[32px] overflow-hidden hover:bg-[var(--bg3)] transition-all duration-500"
    >
      {post.thumbnail && (
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={post.thumbnail} 
            alt={post.judul} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            referrerPolicy="no-referrer" 
          />
        </div>
      )}
      <div className="p-8 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] px-2 py-1 rounded-full bg-[var(--accent)]/10">
            {post.tipe}
          </span>
          {post.hasKuis && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 px-2 py-1 rounded-full bg-green-600/10 flex items-center gap-1">
              <HelpCircle size={10} /> Kuis
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors">{post.judul}</h3>
        <p className="text-sm text-[var(--ink2)] opacity-60 line-clamp-2 leading-relaxed">
          {post.body.replace(/[#*`]/g, '').substring(0, 120)}...
        </p>
      </div>
    </Link>
  );
}

// --- Article Page ---
const ArticlePage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Postingan | undefined>();

  useEffect(() => {
    if (postId) {
      const allPosts = StorageService.getPostingan();
      setPost(allPosts.find(p => p.id === postId));
    }
  }, [postId]);

  if (!post) return <div className="py-20 text-center opacity-40">Artikel tidak ditemukan</div>;
  return <ArticleView article={post} />;
};

// --- Quiz Page ---
const QuizPage = () => {
  const { kuisId } = useParams();
  const [paket, setPaket] = useState<PaketSoal | undefined>();
  const [soalList, setSoalList] = useState<Soal[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<{ score: number, duration: number } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (kuisId) {
      const p = StorageService.getPaketSoalById(kuisId);
      if (p) {
        setPaket(p);
        setSoalList(StorageService.getSoalByPaket(p.id));
      }
    }
  }, [kuisId]);

  const handleComplete = (answers: Record<string, string>, duration: number) => {
    let correct = 0;
    soalList.forEach(soal => {
      if (answers[soal.id] === soal.kunci_jawaban) correct++;
    });
    const score = (correct / soalList.length) * 100;
    
    const hasil: HasilPeserta = {
      id: Math.random().toString(36).substr(2, 9),
      paketId: paket!.id,
      kode: paket!.kode,
      nama_peserta: 'Peserta Anonim',
      jawaban_map: answers,
      skor_raw: score,
      durasi_selesai: duration,
      submittedAt: new Date().toISOString()
    };
    
    StorageService.saveHasil(hasil);
    setResult({ score, duration });
    setIsFinished(true);
  };

  if (!paket || soalList.length === 0) return <div className="py-20 text-center opacity-40">Kuis tidak ditemukan atau belum ada soal.</div>;

  if (isFinished && result) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-12">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={40} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Ujian Selesai</h1>
          <p className="text-lg text-[var(--ink2)] opacity-60">Hasil evaluasi Anda telah tercatat.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[var(--bg2)] p-8 rounded-3xl border border-[var(--border)]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] mb-2">Skor</div>
            <div className="text-5xl font-bold tracking-tight text-[var(--accent)]">{result.score.toFixed(0)}</div>
          </div>
          <div className="bg-[var(--bg2)] p-8 rounded-3xl border border-[var(--border)]">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] mb-2">Waktu</div>
            <div className="text-2xl font-bold tracking-tight">{Math.floor(result.duration / 60)}m {result.duration % 60}s</div>
          </div>
        </div>

        <div className="pt-8 flex flex-col gap-4">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 rounded-full bg-[var(--accent)] text-white font-bold hover:opacity-90 transition-opacity"
          >
            Selesai
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 rounded-full border border-[var(--border)] font-bold hover:bg-[var(--bg2)] transition-colors"
          >
            Ulangi Kuis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <QuizEngine 
        paket={paket} 
        soalList={soalList} 
        onComplete={handleComplete} 
      />
    </div>
  );
};

// --- Admin Panel ---
// Login ditangani oleh ProtectedRoute + Supabase auth.
// Komponen ini hanya render jika user sudah login DAN isAdmin === true.
const Admin = () => {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'programs' | 'posts' | 'quizzes' | 'results'>('posts');
  
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isEditingProgram, setIsEditingProgram] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Partial<Program>>({});

  const [posts, setPosts] = useState<Postingan[]>([]);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Postingan>>({});

  const [allKelas, setAllKelas] = useState<Kelas[]>([]);
  const [allSubkelas, setAllSubkelas] = useState<Subkelas[]>([]);

  const [quizzes, setQuizzes] = useState<PaketSoal[]>([]);
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Partial<PaketSoal>>({});
  const [editingSoalList, setEditingSoalList] = useState<Soal[]>([]);

  const [results, setResults] = useState<HasilPeserta[]>([]);

  // Load data saat komponen mount (user sudah pasti admin karena ProtectedRoute)
  useEffect(() => {
    setPrograms(StorageService.getPrograms());
    setPosts(StorageService.getPostingan());
    setQuizzes(StorageService.getPaketSoal());
    setResults(StorageService.getHasil());
    setAllKelas(StorageService.getKelas());
    setAllSubkelas(StorageService.getSubkelas());
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const newProgram: Program = {
      id: editingProgram.id || Math.random().toString(36).substr(2, 9),
      nama: editingProgram.nama || 'Untitled Program',
      slug: editingProgram.slug || (editingProgram.nama?.toLowerCase().replace(/\s+/g, '-') || 'untitled'),
      deskripsi: editingProgram.deskripsi || '',
      urutan: Number(editingProgram.urutan) || programs.length + 1,
      createdAt: editingProgram.createdAt || new Date().toISOString()
    };
    StorageService.saveProgram(newProgram);
    setPrograms(StorageService.getPrograms());
    setIsEditingProgram(false);
    setEditingProgram({});
  };

  const deleteProgram = (id: string) => {
    if (window.confirm('Hapus program ini?')) {
      StorageService.deleteProgram(id);
      setPrograms(StorageService.getPrograms());
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Postingan = {
      id: editingPost.id || Math.random().toString(36).substr(2, 9),
      kelasId: editingPost.kelasId || '',
      subkelasId: editingPost.subkelasId,
      tipe: editingPost.tipe || 'artikel',
      judul: editingPost.judul || 'Untitled',
      body: editingPost.body || '',
      thumbnail: editingPost.thumbnail,
      tags: editingPost.tags || [],
      hasKuis: editingPost.hasKuis || false,
      kuisId: editingPost.kuisId,
      publishedAt: new Date().toISOString(),
      createdAt: editingPost.createdAt || new Date().toISOString()
    };
    StorageService.savePostingan(newPost);
    setPosts(StorageService.getPostingan());
    setIsEditingPost(false);
    setEditingPost({});
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const quizId = editingQuiz.id || `kuis-${Math.random().toString(36).substr(2, 9)}`;
    const newQuiz: PaketSoal = {
      id: quizId,
      postId: editingQuiz.postId || '',
      kode: editingQuiz.kode || 'NEW',
      judul: editingQuiz.judul || 'Untitled Quiz',
      durasi_menit: Number(editingQuiz.durasi_menit) || 10,
      mode_scoring: editingQuiz.mode_scoring || 'binary',
      totalSoal: editingSoalList.length
    };
    
    StorageService.savePaketSoal(newQuiz);
    StorageService.saveSoalList(quizId, editingSoalList.map((s, idx) => ({ ...s, paketId: quizId, urutan: idx + 1 })));
    
    setQuizzes(StorageService.getPaketSoal());
    setIsEditingQuiz(false);
    setEditingQuiz({});
    setEditingSoalList([]);
  };

  const addSoal = () => {
    const newSoal: Soal = {
      id: `soal-${Math.random().toString(36).substr(2, 9)}`,
      paketId: editingQuiz.id || '',
      urutan: editingSoalList.length + 1,
      konten_html: '<p>Pertanyaan baru...</p>',
      tipe_konten: 'text',
      opsi: [
        { id: 'a', teks: 'Opsi A', skor: 0 },
        { id: 'b', teks: 'Opsi B', skor: 0 }
      ],
      kunci_jawaban: 'a',
      pembahasan: ''
    };
    setEditingSoalList([...editingSoalList, newSoal]);
  };

  const updateSoal = (idx: number, data: Partial<Soal>) => {
    const newList = [...editingSoalList];
    newList[idx] = { ...newList[idx], ...data };
    setEditingSoalList(newList);
  };

  const updateOpsi = (soalIdx: number, opsiIdx: number, data: Partial<Opsi>) => {
    const newList = [...editingSoalList];
    const newOpsi = [...newList[soalIdx].opsi];
    newOpsi[opsiIdx] = { ...newOpsi[opsiIdx], ...data };
    newList[soalIdx].opsi = newOpsi;
    setEditingSoalList(newList);
  };

  const addOpsi = (soalIdx: number) => {
    const newList = [...editingSoalList];
    const newOpsi = [...newList[soalIdx].opsi];
    const nextId = String.fromCharCode(97 + newOpsi.length);
    newOpsi.push({ id: nextId, teks: `Opsi ${nextId.toUpperCase()}`, skor: 0 });
    newList[soalIdx].opsi = newOpsi;
    setEditingSoalList(newList);
  };

  const removeOpsi = (soalIdx: number, opsiIdx: number) => {
    const newList = [...editingSoalList];
    const newOpsi = newList[soalIdx].opsi.filter((_, i) => i !== opsiIdx);
    newList[soalIdx].opsi = newOpsi;
    setEditingSoalList(newList);
  };

  const deletePost = (id: string) => {
    if (window.confirm('Hapus postingan ini?')) {
      const all = StorageService.getPostingan().filter(p => p.id !== id);
      setPosts(all);
    }
  };

  const deleteQuiz = (id: string) => {
    if (window.confirm('Hapus kuis ini?')) {
      const all = StorageService.getPaketSoal().filter(q => q.id !== id);
      setQuizzes(all);
    }
  };

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium text-[var(--ink3)]">{user?.email}</span>
            <span className="text-[var(--ink3)] opacity-30">·</span>
            <button 
              onClick={handleLogout}
              className="text-[11px] font-bold uppercase tracking-widest text-red-500 hover:opacity-70 transition-opacity flex items-center gap-1.5"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
        <div className="flex p-1.5 bg-[var(--bg2)] rounded-full border border-[var(--border)]">
          {(['programs', 'posts', 'quizzes', 'results'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all",
                activeTab === tab ? "bg-[var(--bg)] text-[var(--ink)] shadow-sm" : "text-[var(--ink3)] hover:text-[var(--ink)]"
              )}
            >
              {tab === 'programs' ? 'Program' : tab === 'posts' ? 'Postingan' : tab === 'quizzes' ? 'Kuis' : 'Hasil'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-[32px] overflow-hidden shadow-sm">
        {activeTab === 'programs' && (
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight">Daftar Program</h2>
              <button 
                onClick={() => { setEditingProgram({ urutan: programs.length + 1 }); setIsEditingProgram(true); }}
                className="flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <Plus size={14} /> Tambah
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Nama</th>
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Slug</th>
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {programs.sort((a, b) => a.urutan - b.urutan).map(p => (
                  <tr key={p.id} className="group hover:bg-[var(--bg2)]/50 transition-colors">
                    <td className="py-5 font-semibold">{p.nama}</td>
                    <td className="py-5 text-[13px] text-[var(--ink3)] font-mono">{p.slug}</td>
                    <td className="py-5 text-right space-x-2">
                      <button onClick={() => { setEditingProgram(p); setIsEditingProgram(true); }} className="p-2 text-[var(--ink3)] hover:text-[var(--accent)] transition-colors"><Edit size={16} /></button>
                      <button onClick={() => deleteProgram(p.id)} className="p-2 text-[var(--ink3)] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight">Daftar Postingan</h2>
              <button 
                onClick={() => { setEditingPost({ tipe: 'artikel', tags: [] }); setIsEditingPost(true); }}
                className="flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <Plus size={14} /> Tambah
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Judul</th>
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Kelas</th>
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {posts.map(post => (
                  <tr key={post.id} className="group hover:bg-[var(--bg2)]/50 transition-colors">
                    <td className="py-5 font-semibold">{post.judul}</td>
                    <td className="py-5 text-[13px] text-[var(--ink3)]">{post.kelasId}</td>
                    <td className="py-5 text-right space-x-2">
                      <button onClick={() => { setEditingPost(post); setIsEditingPost(true); }} className="p-2 text-[var(--ink3)] hover:text-[var(--accent)] transition-colors"><Edit size={16} /></button>
                      <button onClick={() => deletePost(post.id)} className="p-2 text-[var(--ink3)] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-tight">Daftar Kuis</h2>
              <button 
                onClick={() => { setEditingQuiz({ mode_scoring: 'binary', durasi_menit: 10 }); setEditingSoalList([]); setIsEditingQuiz(true); }}
                className="flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <Plus size={14} /> Tambah
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Judul</th>
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Kode</th>
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {quizzes.map(quiz => (
                  <tr key={quiz.id} className="group hover:bg-[var(--bg2)]/50 transition-colors">
                    <td className="py-5 font-semibold">{quiz.judul}</td>
                    <td className="py-5 text-[13px] text-[var(--ink3)] font-mono">{quiz.kode}</td>
                    <td className="py-5 text-right space-x-2">
                      <button onClick={() => { setEditingQuiz(quiz); setEditingSoalList(StorageService.getSoalByPaket(quiz.id)); setIsEditingQuiz(true); }} className="p-2 text-[var(--ink3)] hover:text-[var(--accent)] transition-colors"><Edit size={16} /></button>
                      <button onClick={() => deleteQuiz(quiz.id)} className="p-2 text-[var(--ink3)] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="p-8 space-y-8">
            <h2 className="text-xl font-bold tracking-tight">Hasil Ujian</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Peserta</th>
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Paket</th>
                  <th className="pb-4 text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] text-right">Skor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {results.map(res => (
                  <tr key={res.id}>
                    <td className="py-5 font-semibold">{res.nama_peserta}</td>
                    <td className="py-5 text-[13px] text-[var(--ink3)]">{res.kode}</td>
                    <td className="py-5 text-right font-bold text-[var(--accent)]">{res.skor_raw.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isEditingProgram && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--bg)] rounded-[32px] p-10 max-w-lg w-full shadow-2xl border border-[var(--border)] my-8 space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">{editingProgram.id ? 'Edit Program' : 'Tambah Program'}</h2>
                <button onClick={() => setIsEditingProgram(false)} className="text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"><X size={24} /></button>
              </div>
              <form onSubmit={handleSaveProgram} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Nama Program</label>
                  <input type="text" required value={editingProgram.nama || ''} onChange={e => setEditingProgram({...editingProgram, nama: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Deskripsi</label>
                  <textarea rows={3} value={editingProgram.deskripsi || ''} onChange={e => setEditingProgram({...editingProgram, deskripsi: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Slug</label>
                    <input type="text" value={editingProgram.slug || ''} onChange={e => setEditingProgram({...editingProgram, slug: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-mono text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Urutan</label>
                    <input type="number" value={editingProgram.urutan || ''} onChange={e => setEditingProgram({...editingProgram, urutan: Number(e.target.value)})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium" />
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsEditingProgram(false)} className="flex-1 py-3.5 rounded-full border border-[var(--border)] font-bold text-sm uppercase tracking-widest hover:bg-[var(--bg2)] transition-colors">Batal</button>
                  <button type="submit" className="flex-1 py-3.5 rounded-full bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">Simpan</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {isEditingPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--bg)] rounded-[32px] p-10 max-w-3xl w-full shadow-2xl border border-[var(--border)] my-8 space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">{editingPost.id ? 'Edit Postingan' : 'Tambah Postingan'}</h2>
                <button onClick={() => setIsEditingPost(false)} className="text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"><X size={24} /></button>
              </div>
              <form onSubmit={handleSavePost} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Program</label>
                    <select 
                      value={allKelas.find(k => k.id === editingPost.kelasId)?.programId || ''} 
                      onChange={e => {
                        const firstKelas = allKelas.find(k => k.programId === e.target.value);
                        setEditingPost({...editingPost, kelasId: firstKelas?.id || '', subkelasId: undefined});
                      }}
                      className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium appearance-none"
                    >
                      <option value="">-- Pilih Program --</option>
                      {programs.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Kelas</label>
                    <select 
                      value={editingPost.kelasId} 
                      onChange={e => setEditingPost({...editingPost, kelasId: e.target.value, subkelasId: undefined})}
                      className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium appearance-none"
                    >
                      <option value="">-- Pilih Kelas --</option>
                      {allKelas.filter(k => k.programId === (allKelas.find(curr => curr.id === editingPost.kelasId)?.programId || '')).map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Subkelas</label>
                    <select 
                      value={editingPost.subkelasId || ''} 
                      onChange={e => setEditingPost({...editingPost, subkelasId: e.target.value || undefined})}
                      className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium appearance-none"
                    >
                      <option value="">-- Tanpa Subkelas --</option>
                      {allSubkelas.filter(s => s.kelasId === editingPost.kelasId).map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Tipe</label>
                    <select value={editingPost.tipe} onChange={e => setEditingPost({...editingPost, tipe: e.target.value as any})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium appearance-none">
                      <option value="artikel">Artikel</option>
                      <option value="kuis">Kuis</option>
                      <option value="keduanya">Keduanya</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Judul</label>
                    <input type="text" required value={editingPost.judul || ''} onChange={e => setEditingPost({...editingPost, judul: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Konten (Markdown)</label>
                  <textarea rows={8} required value={editingPost.body || ''} onChange={e => setEditingPost({...editingPost, body: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-mono text-sm" />
                </div>
                <div className="flex items-center gap-3 p-4 bg-[var(--bg2)] rounded-2xl border border-[var(--border)]">
                  <input type="checkbox" id="hasKuis" checked={editingPost.hasKuis || false} onChange={e => setEditingPost({...editingPost, hasKuis: e.target.checked})} className="w-5 h-5 rounded-md border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]" />
                  <label htmlFor="hasKuis" className="text-sm font-bold tracking-tight">Memiliki Kuis Terlampir</label>
                  {editingPost.hasKuis && (
                    <input type="text" value={editingPost.kuisId || ''} onChange={e => setEditingPost({...editingPost, kuisId: e.target.value})} placeholder="ID Paket Kuis" className="ml-auto px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] outline-none text-xs font-medium" />
                  )}
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsEditingPost(false)} className="flex-1 py-3.5 rounded-full border border-[var(--border)] font-bold text-sm uppercase tracking-widest hover:bg-[var(--bg2)] transition-colors">Batal</button>
                  <button type="submit" className="flex-1 py-3.5 rounded-full bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">Simpan</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {isEditingQuiz && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--bg)] rounded-[32px] p-10 max-w-4xl w-full shadow-2xl border border-[var(--border)] my-8 space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">{editingQuiz.id ? 'Edit Paket Kuis' : 'Tambah Paket Kuis'}</h2>
                <button onClick={() => setIsEditingQuiz(false)} className="text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"><X size={24} /></button>
              </div>
              <form onSubmit={handleSaveQuiz} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Judul Kuis</label>
                    <input type="text" required value={editingQuiz.judul || ''} onChange={e => setEditingQuiz({...editingQuiz, judul: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Kode Paket</label>
                    <input type="text" required value={editingQuiz.kode || ''} onChange={e => setEditingQuiz({...editingQuiz, kode: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Durasi (Menit)</label>
                    <input type="number" required value={editingQuiz.durasi_menit || ''} onChange={e => setEditingQuiz({...editingQuiz, durasi_menit: Number(e.target.value)})} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium" />
                  </div>
                </div>

                <div className="p-8 bg-[var(--bg2)] rounded-[32px] border border-[var(--border)] space-y-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Hubungkan ke Artikel</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Pilih Artikel</label>
                      <select 
                        required
                        value={editingQuiz.postId || ''} 
                        onChange={e => setEditingQuiz({...editingQuiz, postId: e.target.value})}
                        className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] focus:border-[var(--accent)] outline-none transition-all font-medium appearance-none"
                      >
                        <option value="">-- Pilih Artikel --</option>
                        {posts.map(p => <option key={p.id} value={p.id}>{p.judul}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold tracking-tight">Daftar Soal ({editingSoalList.length})</h3>
                    <button type="button" onClick={addSoal} className="px-6 py-2 rounded-full bg-[var(--ink)] text-white text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">+ Tambah Soal</button>
                  </div>
                  <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
                    {editingSoalList.map((soal, sIdx) => (
                      <div key={soal.id} className="p-8 bg-[var(--bg2)] rounded-[32px] border border-[var(--border)] space-y-6 relative">
                        <button type="button" onClick={() => setEditingSoalList(editingSoalList.filter((_, i) => i !== sIdx))} className="absolute top-6 right-6 text-[var(--ink3)] hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Pertanyaan #{sIdx + 1}</label>
                          <textarea rows={2} value={soal.konten_html} onChange={e => updateSoal(sIdx, { konten_html: e.target.value })} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] focus:border-[var(--accent)] outline-none transition-all font-medium" />
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Opsi Jawaban</label>
                            <button type="button" onClick={() => addOpsi(sIdx)} className="text-[11px] font-bold text-[var(--accent)] hover:opacity-70 transition-opacity">+ Tambah Opsi</button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {soal.opsi.map((opsi, oIdx) => (
                              <div key={opsi.id} className="flex gap-3 items-center bg-[var(--bg)] p-3 rounded-2xl border border-[var(--border)]">
                                <div className="w-8 h-8 rounded-full bg-[var(--bg2)] text-[var(--ink)] flex items-center justify-center text-[10px] font-bold shrink-0">{String.fromCharCode(65 + oIdx)}</div>
                                <input type="text" value={opsi.teks} onChange={e => updateOpsi(sIdx, oIdx, { teks: e.target.value })} className="flex-1 bg-transparent outline-none text-sm font-medium" placeholder="Teks Opsi" />
                                <input type="number" value={opsi.skor} onChange={e => updateOpsi(sIdx, oIdx, { skor: Number(e.target.value) })} className="w-12 bg-[var(--bg2)] rounded-lg py-1 text-xs text-center outline-none font-bold" placeholder="Skor" />
                                <button type="button" onClick={() => removeOpsi(sIdx, oIdx)} className="text-red-400 hover:text-red-600 transition-colors"><X size={14} /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Kunci Jawaban</label>
                            <select value={soal.kunci_jawaban} onChange={e => updateSoal(sIdx, { kunci_jawaban: e.target.value })} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] focus:border-[var(--accent)] outline-none transition-all font-medium appearance-none">
                              {soal.opsi.map((o, i) => <option key={o.id} value={o.id}>Opsi {String.fromCharCode(65 + i)}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] ml-1">Pembahasan</label>
                            <input type="text" value={soal.pembahasan} onChange={e => updateSoal(sIdx, { pembahasan: e.target.value })} className="w-full px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] focus:border-[var(--accent)] outline-none transition-all font-medium" placeholder="Penjelasan..." />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setIsEditingQuiz(false)} className="flex-1 py-3.5 rounded-full border border-[var(--border)] font-bold text-sm uppercase tracking-widest hover:bg-[var(--bg2)] transition-colors">Batal</button>
                  <button type="submit" className="flex-1 py-3.5 rounded-full bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">Simpan Paket Kuis</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/program/:programId" element={<ProgramDetail />} />
          <Route path="/kelas/:kelasId" element={<KelasView />} />
          <Route path="/artikel/:postId" element={<ArticlePage />} />
          <Route path="/kuis/:kuisId" element={<QuizPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
