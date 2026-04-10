import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  // Tunggu sampai auth state selesai di-resolve dari Supabase
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--ink3)] text-sm font-medium">Memeriksa akses...</p>
        </div>
      </div>
    );
  }

  // Belum login → redirect ke /login, simpan path asal untuk redirect balik
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Sudah login tapi bukan admin → redirect ke home
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
