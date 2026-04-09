import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flag, Timer, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Soal, PaketSoal } from '@/src/types';

interface QuizEngineProps {
  paket: PaketSoal;
  soalList: Soal[];
  onComplete: (answers: Record<string, string>, duration: number) => void;
}

export default function QuizEngine({ paket, soalList, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(paket.durasi_menit * 60);
  const [isConfirming, setIsConfirming] = useState(false);
  const [startTime] = useState(Date.now());

  const currentSoal = soalList[currentIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (opsiId: string) => {
    setAnswers((prev) => ({ ...prev, [currentSoal.id]: opsiId }));
  };

  const toggleFlag = () => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(currentSoal.id)) next.delete(currentSoal.id);
      else next.add(currentSoal.id);
      return next;
    });
  };

  const handleSubmit = () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    onComplete(answers, duration);
  };

  const answeredCount = Object.keys(answers).length;
  const isLastSoal = currentIndex === soalList.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-1">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">{paket.judul}</h2>
          <p className="text-2xl font-bold tracking-tight">Soal {currentIndex + 1} <span className="opacity-20">/</span> {soalList.length}</p>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 text-[var(--ink)] font-mono font-bold text-xl">
            <Timer size={20} className="opacity-40" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <div className="w-32 h-1 bg-[var(--bg3)] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--accent)]" 
              initial={{ width: 0 }}
              animate={{ width: `${(answeredCount / soalList.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main Quiz Area */}
        <div className="lg:col-span-8 space-y-12">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-[300px]"
          >
            <div 
              className="markdown-body mb-12 text-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentSoal.konten_html }}
            />

            <div className="space-y-4">
              {currentSoal.opsi.map((opsi, idx) => (
                <button
                  key={opsi.id}
                  onClick={() => handleAnswer(opsi.id)}
                  className={cn(
                    "w-full text-left p-6 rounded-2xl border transition-all flex items-center gap-6 group",
                    answers[currentSoal.id] === opsi.id
                      ? "border-[var(--accent)] bg-[var(--accent)]/5"
                      : "border-[var(--border)] hover:border-[var(--ink)]/20 hover:bg-[var(--bg2)]"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm shrink-0 transition-colors",
                    answers[currentSoal.id] === opsi.id
                      ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                      : "border-[var(--border)] group-hover:border-[var(--ink)]/20"
                  )}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="flex-1 text-lg font-medium">{opsi.teks}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-8">
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="p-3 rounded-full border border-[var(--border)] disabled:opacity-20 hover:bg-[var(--bg2)] transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setCurrentIndex(prev => Math.min(soalList.length - 1, prev + 1))}
                disabled={isLastSoal}
                className="p-3 rounded-full border border-[var(--border)] disabled:opacity-20 hover:bg-[var(--bg2)] transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={toggleFlag}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full border transition-all font-bold text-sm uppercase tracking-widest",
                  flags.has(currentSoal.id)
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-[var(--border)] text-[var(--ink3)] hover:border-[var(--ink)]/20"
                )}
              >
                <Flag size={16} fill={flags.has(currentSoal.id) ? "currentColor" : "none"} />
                <span>Ragu</span>
              </button>

              {isLastSoal && (
                <button
                  onClick={() => setIsConfirming(true)}
                  className="px-8 py-3 rounded-full bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Selesai
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Navigation Grid */}
        <div className="lg:col-span-4 space-y-12">
          <div className="space-y-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)]">Navigasi</h3>
            <div className="grid grid-cols-5 gap-3">
              {soalList.map((soal, idx) => (
                <button
                  key={soal.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "aspect-square rounded-xl border text-[13px] font-bold flex items-center justify-center transition-all",
                    currentIndex === idx && "ring-2 ring-[var(--accent)] ring-offset-4",
                    flags.has(soal.id)
                      ? "bg-orange-500 text-white border-orange-500"
                      : answers[soal.id]
                        ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                        : "bg-transparent border-[var(--border)] text-[var(--ink2)] hover:border-[var(--ink)]/20"
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--bg2)] space-y-4">
            <div className="flex items-center gap-2 text-[var(--ink)]">
              <AlertCircle size={16} className="opacity-40" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Informasi</span>
            </div>
            <p className="text-[13px] text-[var(--ink2)] leading-relaxed opacity-70">
              Pastikan semua soal terjawab. Soal yang ditandai ragu tetap akan dinilai jika sudah dipilih jawabannya.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {isConfirming && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--bg)] rounded-[32px] p-10 max-w-sm w-full shadow-2xl border border-[var(--border)] text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Selesaikan Ujian?</h2>
                <p className="text-base text-[var(--ink2)] opacity-60 leading-relaxed">
                  Anda telah menjawab {answeredCount} dari {soalList.length} soal.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmit}
                  className="w-full py-4 rounded-full bg-[var(--accent)] text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Ya, Selesaikan
                </button>
                <button
                  onClick={() => setIsConfirming(false)}
                  className="w-full py-4 rounded-full border border-[var(--border)] font-bold hover:bg-[var(--bg2)] transition-colors"
                >
                  Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
