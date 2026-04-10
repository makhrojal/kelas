-- ========================================
-- SUPABASE SETUP SQL untuk Aplikasi Kelas
-- Run di Supabase SQL Editor
-- ========================================

-- 1. Buat tabel profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Buat tabel user_progress untuk tracking
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- 4. Policies untuk tabel profiles

-- Policy: User bisa lihat/edit profile sendiri
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Admin bisa lihat semua profiles
CREATE POLICY "Admin can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admin bisa update semua profiles
CREATE POLICY "Admin can update all profiles"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. Policies untuk tabel user_progress

-- Policy: User bisa lihat/edit progress sendiri
CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Admin bisa lihat semua progress
CREATE POLICY "Admin can view all progress"
  ON public.user_progress FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. Function untuk auto-create profile saat user sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'user' -- Default role adalah user
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Trigger untuk auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 8. [MANUAL] Buat admin pertama kali (ganti EMAIL_ADMIN_KAMU)
-- Step 1: Sign up via aplikasi dengan email kamu
-- Step 2: Run query ini (ganti email):

-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE email = 'EMAIL_ADMIN_KAMU@example.com';

-- ========================================
-- SETUP GOOGLE OAUTH (Manual di Dashboard)
-- ========================================
-- 1. Buka Supabase Dashboard > Authentication > Providers
-- 2. Enable Google OAuth
-- 3. Buat OAuth 2.0 Client ID di Google Cloud Console:
--    - https://console.cloud.google.com/apis/credentials
--    - Authorized redirect URIs:
--      https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
-- 4. Copy Client ID & Client Secret ke Supabase Dashboard
-- 5. Save

-- ========================================
-- SELESAI! Aplikasi siap digunakan.
-- ========================================
