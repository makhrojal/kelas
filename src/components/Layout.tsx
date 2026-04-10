import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../hooks/useAuth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <header className="sticky top-0 z-50 bg-[var(--bg)]/70 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-between h-14 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-bold text-lg tracking-tight transition-opacity group-hover:opacity-70">kelas.github.io</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-[13px] font-medium transition-all hover:opacity-100",
                    location.pathname === item.path ? "text-[var(--ink)] opacity-100" : "text-[var(--ink2)] opacity-60"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-red-500 hover:opacity-70 transition-opacity"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className={cn(
                    "text-[13px] font-medium transition-all hover:opacity-100",
                    location.pathname === '/login' ? "text-[var(--ink)] opacity-100" : "text-[var(--ink2)] opacity-60"
                  )}
                >
                  Login
                </Link>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-[var(--ink2)] opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]"
            >
              <div className="px-6 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "block text-lg font-medium transition-colors",
                      location.pathname === item.path 
                        ? "text-[var(--accent)]" 
                        : "text-[var(--ink)] opacity-60"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="flex items-center gap-2 text-lg font-medium text-red-500 opacity-80"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-[var(--accent)]"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-16">
        {children}
      </main>

      <footer className="py-20 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <Link to="/" className="font-bold text-base mb-4 block">kelas.github.io</Link>
              <p className="text-[13px] leading-relaxed text-[var(--ink3)]">
                Platform edukasi minimalis untuk berbagi ilmu dan menguji kemampuan secara interaktif.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] mb-4">Program</h3>
                <ul className="space-y-2 text-[13px] text-[var(--ink2)]">
                  <li>Karier ASN</li>
                  <li>PTN-UTBK</li>
                  <li>SKD & SKB</li>
                  <li>TOEFL & Psikotes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--ink3)] mb-4">Kontak</h3>
                <p className="text-[13px] text-[var(--ink2)]">admin@kelas.github.io</p>
              </div>
            </div>
          </div>
          <div className="mt-20 text-[11px] text-[var(--ink3)] opacity-60">
            &copy; {new Date().getFullYear()} kelas.github.io. Didesain dengan prinsip kesederhanaan.
          </div>
        </div>
      </footer>
    </div>
  );
}
