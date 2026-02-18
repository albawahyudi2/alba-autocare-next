# 🚀 Deploy Alba AutoCare ke Vercel

## Langkah 1: Push ke GitHub

### 1.1 Buat Repository Baru di GitHub
1. Buka https://github.com/new
2. Repository name: `alba-autocare` (atau nama lain)
3. Description: "Sistem Manajemen Perawatan Kendaraan"
4. **Private** atau **Public** (pilih sesuai kebutuhan)
5. **JANGAN** centang "Add a README file"
6. Klik **Create repository**

### 1.2 Push Code ke GitHub
Setelah repository dibuat, jalankan command berikut di terminal:

```powershell
cd C:\xampp\alba\alba-autocare-nextjs

# Tambahkan remote repository (ganti YOUR_USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/YOUR_USERNAME/alba-autocare.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Contoh:**
Jika username GitHub Anda adalah `johndoe`, maka:
```powershell
git remote add origin https://github.com/johndoe/alba-autocare.git
```

---

## Langkah 2: Deploy ke Vercel

### 2.1 Login ke Vercel
1. Buka https://vercel.com/login
2. Login dengan akun GitHub Anda
3. Authorize Vercel untuk akses GitHub

### 2.2 Import Project
1. Klik **"Add New..."** → **"Project"**
2. Pilih repository **alba-autocare** yang baru dibuat
3. Klik **"Import"**

### 2.3 Configure Project
**Framework Preset:** Next.js (otomatis terdeteksi)

**Build and Output Settings:**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Klik "Deploy"** (jangan tambah environment variables dulu)

---

## Langkah 3: Setup Environment Variables

Setelah deployment selesai:

1. Di Vercel dashboard, buka project Anda
2. Klik **"Settings"** → **"Environment Variables"**
3. Tambahkan variable berikut:

### Environment Variables yang Diperlukan:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://niwlzhfznxyhrirbfodo.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pd2x6aGZ6bnh5aHJpcmJmb2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMDE0NzEsImV4cCI6MjA4Njg3NzQ3MX0.T99ufrgCNI_4Aq9-3pEhoBpWC3rSgoPRX8RcUG8G5RA` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://your-preview.vercel.app` | Preview |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Development |

**Cara menambahkan:**
1. Masukkan **Name** (misalnya: `NEXT_PUBLIC_SUPABASE_URL`)
2. Masukkan **Value** (copy dari tabel di atas)
3. Pilih **Environment** (pilih semua: Production, Preview, Development)
4. Klik **"Save"**
5. Ulangi untuk variable lainnya

---

## Langkah 4: Redeploy

Setelah semua environment variables ditambahkan:

1. Klik **"Deployments"** di menu atas
2. Klik **titik tiga (⋯)** pada deployment terbaru
3. Klik **"Redeploy"**
4. Klik **"Redeploy"** lagi untuk konfirmasi

Tunggu beberapa menit sampai deployment selesai.

---

## Langkah 5: Update Supabase URL di Vercel

Setelah deployment selesai, Vercel akan memberikan URL production Anda, misalnya:
- `https://alba-autocare.vercel.app`

**Update environment variable:**
1. Buka **Settings** → **Environment Variables**
2. Edit `NEXT_PUBLIC_SITE_URL` untuk **Production**
3. Ganti dengan URL Vercel Anda yang sebenarnya
4. Klik **"Save"**
5. Redeploy lagi

---

## Langkah 6: Update Supabase Authentication Settings

1. Buka Supabase Dashboard: https://supabase.com/dashboard/project/niwlzhfznxyhrirbfodo
2. Klik **"Authentication"** → **"URL Configuration"**
3. Tambahkan URL Vercel Anda ke **Site URL**:
   - Misalnya: `https://alba-autocare.vercel.app`
4. Tambahkan ke **Redirect URLs**:
   - `https://alba-autocare.vercel.app/auth/callback`
   - `https://alba-autocare.vercel.app`

---

## ✅ Testing

Setelah semua langkah selesai:

1. Buka URL Vercel Anda: `https://alba-autocare.vercel.app`
2. Test:
   - ✓ Halaman welcome muncul dengan benar
   - ✓ Klik "Buka Dashboard" berfungsi
   - ✓ Semua page CRUD bisa diakses
   - ✓ Test create, edit, delete data

---

## 🐛 Troubleshooting

### Error: "connect ECONNREFUSED"
- **Penyebab:** Environment variables belum di-set
- **Solusi:** Pastikan semua env vars sudah ditambahkan dan redeploy

### Error: "Database connection failed"
- **Penyebab:** Supabase URL atau Key salah
- **Solusi:** Double check NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY

### Page stuck loading atau 500 error
- **Penyebab:** Build error atau runtime error
- **Solusi:** 
  1. Check build logs di Vercel
  2. Pastikan database schema sudah dijalankan di Supabase
  3. Test di local dulu sebelum deploy

### Database queries return empty
- **Penyebab:** Database belum ada data atau RLS policies
- **Solusi:**
  1. Jalankan `database/drop_all_tables.sql`
  2. Jalankan `database/simple_schema.sql`
  3. Jalankan `database/002_seed_data.sql`

---

## 📝 Custom Domain (Opsional)

Jika ingin menggunakan domain custom:

1. Di Vercel, buka **Settings** → **Domains**
2. Klik **"Add Domain"**
3. Masukkan domain Anda (misalnya: `alba-autocare.com`)
4. Ikuti instruksi untuk update DNS records
5. Tunggu DNS propagation (biasanya 24-48 jam)

---

## 🎉 Selesai!

Aplikasi Alba AutoCare Anda sekarang sudah live di Vercel!

**URL Production:** `https://your-project.vercel.app`

Setiap kali Anda push perubahan ke GitHub, Vercel akan otomatis deploy versi terbaru.
