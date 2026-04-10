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
  const [profileReady, setProfileReady] = useState(false);

  const fetchProfile = async (authUser: User): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (error) {
        console.error('fetchProfile error:', error.message);
        return null;
      }

      if (data) return data as Profile;

      // Profil belum ada → auto-create dengan role='user'
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
        return null;
      }
      return newProfile;
    } catch (err) {
      console.error('fetchProfile unexpected error:', err);
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Step 1: getSession() saat mount — ini synchronous-safe dan bisa di-await
    const initAuth = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();

      if (!isMounted) return;

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        const p = await fetchProfile(currentSession.user);
        if (isMounted) setProfile(p);
      }

      if (isMounted) {
        setProfileReady(true);
        setIsLoading(false);
      }
    };

    initAuth();

    // Step 2: onAuthStateChange untuk handle login/logout SETELAH init
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!isMounted) return;

        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          setProfileReady(false); // reset dulu agar ProtectedRoute spinner
          const p = await fetchProfile(newSession.user);
          if (isMounted) {
            setProfile(p);
            setProfileReady(true);
          }
        } else {
          setProfile(null);
          setProfileReady(true);
        }

        if (isMounted) setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
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
    setIsLoading(true);
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
