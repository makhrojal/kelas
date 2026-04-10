import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  isLoading: boolean;
  profileReady: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // profileReady = true hanya setelah fetchProfile selesai (atau user = null)
  const [profileReady, setProfileReady] = useState(false);

  /**
   * Fetch profile dari tabel `profiles`.
   * Jika belum ada (user baru via Google OAuth), buat row otomatis dengan role='user'.
   * Return setelah selesai agar caller bisa await sebelum setIsLoading(false).
   */
  const fetchProfile = async (authUser: User): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (error) {
        console.error('fetchProfile error:', error.message);
        setProfile(null);
        return;
      }

      if (data) {
        setProfile(data as Profile);
        return;
      }

      // Profil belum ada → buat row baru dengan role default 'user'
      const newProfile: Profile = {
        id: authUser.id,
        email: authUser.email ?? '',
        full_name: authUser.user_metadata?.full_name ?? null,
        role: 'user',
      };
      const { error: insertError } = await supabase
        .from('profiles')
        .insert(newProfile);

      if (insertError) {
        console.error('fetchProfile insert error:', insertError.message);
        setProfile(null);
      } else {
        setProfile(newProfile);
      }
    } catch (err) {
      console.error('fetchProfile unexpected error:', err);
      setProfile(null);
    }
  };

  useEffect(() => {
    // onAuthStateChange sebagai single source of truth.
    // INITIAL_SESSION event fires langsung dengan session saat ini (atau null).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Tunggu fetchProfile selesai SEBELUM clear isLoading
          // agar ProtectedRoute tidak membaca isAdmin=false secara prematur
          await fetchProfile(session.user);
        } else {
          setProfile(null);
        }

        // Kedua flag diset di sini — setelah semua async selesai
        setProfileReady(true);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    setProfile(null);
    setProfileReady(false);
    await supabase.auth.signOut();
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      isAdmin,
      isLoading,
      profileReady,
      signInWithEmail,
      signInWithGoogle,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
