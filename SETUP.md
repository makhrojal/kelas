# Panduan Setup Aplikasi Kelas dengan Supabase Auth

## Overview
Repository ini sudah dilengkapi dengan:
- **Supabase Auth**: Login email/password + Google OAuth
- **Role-based access**: Admin & User
- **Progress Tracking**: Otomatis simpan progress user
- **File baru yang ditambahkan:**
  - `src/lib/supabase.ts` - Supabase client
  - `src/hooks/useAuth.tsx` - Auth context & hooks
  - `src/hooks/useProgress.tsx` - Progress tracking
  - `src/components/LoginPage.tsx` - Halaman login
  - `supabase-setup.sql` - Database setup script

---

## Step 1: Setup Supabase Project

### 1.1. Buat Project Supabase
1. Buka https://supabase.com/dashboard
2. Klik **New Project**
3. Isi:
   - Name: `kelas-app` (bebas)
   - Database Password: *buat password kuat, simpan*
   - Region: Southeast Asia (Singapore)
4. Tunggu ~2 menit sampai project selesai dibuat

### 1.2. Jalankan SQL Setup
1. Di dashboard Supabase, buka **SQL Editor** (sidebar kiri)
2. Klik **New Query**
3. Copy-paste seluruh isi file `supabase-setup.sql` dari repo ini
4. Klik **Run** (atau Ctrl+Enter)
5. Tunggu sampai muncul "Success. No rows returned"

### 1.3. Setup Google OAuth (Opsional)
1. Buka https://console.cloud.google.com/apis/credentials
2. Klik **Create Credentials** > **OAuth 2.0 Client ID**
3. Application type: **Web application**
4. Name: `Kelas App`
5. **Authorized redirect URIs**, tambahkan:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
   (Ganti `YOUR_PROJECT_REF` dengan ref dari Supabase Dashboard > Settings > API)
6. Copy **Client ID** dan **Client Secret**
7. Di Supabase Dashboard:
   - Buka **Authentication** > **Providers**
   - Enable **Google**
   - Paste Client ID & Client Secret
   - Klik **Save**

---

## Step 2: Setup Project Lokal

### 2.1. Clone & Install Dependencies
```bash
git clone https://github.com/makhrojal/kelas.git
cd kelas
npm install
npm install @supabase/supabase-js
```

### 2.2. Setup Environment Variables
1. Copy file `.env.example` jadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Buka `.env.local`, tambahkan:
   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   ```
3. Dapatkan nilai `YOUR_PROJECT_REF` dan `YOUR_ANON_KEY` dari:
   - Supabase Dashboard > **Settings** > **API**
   - Copy **Project URL** → `VITE_SUPABASE_URL`
   - Copy **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 2.3. Update `src/main.tsx`
Bungkus `<App />` dengan `<AuthProvider>`:

```tsx
import { AuthProvider } from './hooks/useAuth';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

### 2.4. Update `src/App.tsx`
Tambahkan import dan route `/login`:

```tsx
import LoginPage from './components/LoginPage';
import { useAuth } from './hooks/useAuth';

// Di dalam component App, tambahkan route:
<Routes>
  <Route path="/login" element={<LoginPage />} />
  {/* ...route lainnya... */}
</Routes>
```

### 2.5. Proteksi Route Admin (Opsional)
Buat wrapper `ProtectedRoute` di `App.tsx`:

```tsx
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) navigate('/');
  }, [isAdmin, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  return isAdmin ? <>{children}</> : null;
};

// Gunakan di route admin:
<Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
```

---

## Step 3: Deploy ke Vercel

### 3.1. Connect Repo ke Vercel
1. Buka https://vercel.com/new
2. Import repository `makhrojal/kelas`
3. Klik **Deploy**

### 3.2. Set Environment Variables di Vercel
1. Di Vercel Dashboard > Settings > **Environment Variables**
2. Tambahkan:
   - `VITE_SUPABASE_URL` = *URL dari Supabase*
   - `VITE_SUPABASE_ANON_KEY` = *Anon key dari Supabase*
3. Klik **Save**
4. Redeploy (Deployments > ... > Redeploy)

---

## Step 4: Buat Admin Pertama

### 4.1. Sign Up via Aplikasi
1. Buka aplikasi kamu (localhost atau Vercel URL)
2. Klik "Daftar" / navigasi ke `/login`
3. Daftar dengan email kamu (atau login via Google)

### 4.2. Set Role Admin
1. Buka Supabase Dashboard > **SQL Editor**
2. Run query ini (ganti email):
   ```sql
   UPDATE public.profiles
   SET role = 'admin'
   WHERE email = 'email_kamu@example.com';
   ```
3. Refresh aplikasi, sekarang kamu admin!

---

## Cara Pakai Fitur Baru

### Login/Logout
```tsx
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div>
      {user && <p>Welcome, {user.email}</p>}
      {isAdmin && <p>You are an admin!</p>}
      <button onClick={signOut}>Logout</button>
    </div>
  );
};
```

### Track Progress
```tsx
import { useProgress } from '../hooks/useProgress';

const LessonPage = ({ postId }) => {
  const { isCompleted, markComplete } = useProgress();

  return (
    <div>
      {isCompleted(postId) ? '✅ Selesai' : '⏳ Belum selesai'}
      <button onClick={() => markComplete(postId, 100)}>
        Tandai Selesai
      </button>
    </div>
  );
};
```

---

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan `.env.local` sudah ada dan isinya benar
- Restart dev server: `npm run dev`

### Login gagal terus
- Cek Supabase Dashboard > **Authentication** > **Users**, apakah user sudah terdaftar?
- Cek email confirmation (kalau email confirmation diaktifkan)

### Google OAuth tidak muncul
- Cek Google Cloud Console: pastikan redirect URI sudah benar
- Cek Supabase Dashboard: pastikan Google provider sudah **enabled**

### Progress tidak tersimpan
- Pastikan user sudah login (`useAuth().user` tidak null)
- Cek Supabase Dashboard > **Table Editor** > `user_progress`

---

## FAQ

**Q: Bisakah tetap gratis selamanya?**
A: Ya, selama traffic masih dalam batas free tier Supabase (50K active users/bulan) dan Vercel (100GB bandwidth/bulan).

**Q: Bagaimana cara menambah admin lain?**
A: Run SQL query di Supabase:
```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'admin_baru@example.com';
```

**Q: Bisakah disable email confirmation?**
A: Ya, di Supabase Dashboard > **Authentication** > **Email Auth** > disable "Confirm email".

---

## Next Steps

- [ ] Tambahkan halaman profile user
- [ ] Buat dashboard progress untuk user
- [ ] Integrasikan `useProgress` di semua halaman artikel/kuis
- [ ] Custom email templates di Supabase (untuk branding)
- [ ] Setup analytics (Vercel Analytics, Google Analytics, dll)

---

**Selamat! Aplikasi kamu sekarang punya:**
✅ Login dengan email + Google OAuth
✅ Role admin & user dengan RLS
✅ Progress tracking otomatis
✅ Gratis selamanya (sampai scale besar)
