import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Chrome } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const { error } = await signInWithEmail(email, password);
    setIsLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate('/');
    }
  };

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) setError(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--bg)] border border-[var(--border)] rounded-[32px] p-10 max-w-md w-full shadow-xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {mode === 'login' ? 'Masuk' : 'Daftar'}
          </h1>
          <p className="text-[var(--ink3)] text-sm">
            {mode === 'login' ? 'Lanjutkan belajar dari mana kamu berhenti.' : 'Buat akun untuk mulai belajar.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink3)]" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium text-sm"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink3)]" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] focus:border-[var(--accent)] outline-none transition-all font-medium text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-full bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Memproses...' : (mode === 'login' ? 'Masuk' : 'Daftar')}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border)]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-[var(--bg)] text-[var(--ink3)] font-medium">atau</span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full py-4 rounded-full border border-[var(--border)] font-bold text-sm uppercase tracking-widest hover:bg-[var(--bg2)] transition-colors flex items-center justify-center gap-3"
        >
          <Chrome size={16} />
          Masuk dengan Google
        </button>

        <p className="text-center text-sm text-[var(--ink3)] mt-8">
          {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-[var(--accent)] font-bold hover:opacity-70 transition-opacity"
          >
            {mode === 'login' ? 'Daftar' : 'Masuk'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
