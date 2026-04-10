import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, isAdmin, isLoading, profileReady } = useAuth();
  const location = useLocation();

  // Gate 1: Tunggu KEDUA kondisi:
  // - isLoading = false  → Supabase session sudah di-resolve
  // - profileReady = true → fetchProfile sudah selesai (bukan race condition)
  // Selama salah satu masih pending, tampilkan spinner — jangan pernah render
  // konten maupun redirect sebelum kedua kondisi ini terpenuhi.
  if (isLoading || !profileReady) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--ink3)] text-sm font-medium">Memeriksa akses...</p>
        </div>
      </div>
    );
  }

  // Gate 2: Belum login → redirect ke /login
  // Simpan path asal di state agar setelah login bisa redirect balik
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Gate 3: Sudah login tapi bukan admin → redirect ke home
  // Ini juga mencegah user biasa mengakses /admin meski punya sesi valid
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Semua gate lolos → render konten
  return <>{children}</>;
};

export default ProtectedRoute;
