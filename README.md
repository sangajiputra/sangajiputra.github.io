# CV Dinamis — Next.js + Neon + Vercel

Semua gratis. Tidak perlu kartu kredit.

---

## TECH STACK

| Layer    | Service               | Free Tier               |
|----------|-----------------------|-------------------------|
| Frontend | Vercel                | Unlimited static deploy |
| Backend  | Vercel Serverless     | 100GB bandwidth/bulan   |
| Database | Neon (PostgreSQL)     | 500MB storage           |

---

## SETUP: 3 LANGKAH

### 1. Setup Database di Neon

1. Daftar di **https://neon.tech** (gratis, bisa login pakai GitHub)
2. Buat project baru → pilih region terdekat (Singapore)
3. Di dashboard, klik **"Connection string"** → copy string yang formatnya:
   ```
   postgresql://user:password@ep-xxx-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Buat file `.env.local` di root project (copy dari `.env.local.example`):
   ```bash
   cp .env.local.example .env.local
   ```
5. Isi `.env.local` dengan connection string tadi + password admin kamu:
   ```
   DATABASE_URL="postgresql://..."
   ADMIN_PASSWORD="password_kamu_yang_kuat"
   AUTH_SECRET="random_string_panjang_minimal_32_karakter"
   ```
6. Jalankan script setup database:
   ```bash
   npm install
   node src/lib/db-init.mjs
   ```
   Output yang benar:
   ```
   🔄 Creating tables...
   ✅ Tables created
   🌱 Seeding default data...
   ✅ Default data seeded
   🎉 Database ready!
   ```

### 2. Push ke GitHub

```bash
git init
git add .
git commit -m "init: cv dinamis"
git branch -M main

# Buat repo baru di github.com, lalu:
git remote add origin https://github.com/username/nama-repo.git
git push -u origin main
```

> **Penting:** File `.env.local` sudah ada di `.gitignore` — tidak akan ikut ke GitHub. Aman.

### 3. Deploy ke Vercel

1. Buka **https://vercel.com** → Login dengan GitHub
2. Klik **"Add New Project"** → Import repo yang baru dibuat
3. Sebelum deploy, tambahkan **Environment Variables** di Vercel:
   - Klik **"Environment Variables"**
   - Tambahkan 3 variable persis seperti di `.env.local`:
     ```
     DATABASE_URL    = postgresql://...
     ADMIN_PASSWORD  = password_kamu
     AUTH_SECRET     = random_string_kamu
     ```
4. Klik **"Deploy"**
5. Tunggu ~1 menit → selesai 🎉

---

## AKSES

| URL | Keterangan |
|-----|------------|
| `https://nama-project.vercel.app` | CV publik |
| `https://nama-project.vercel.app/admin` | Admin panel |

---

## WORKFLOW SEHARI-HARI

### Update konten (tanpa coding)
Buka `/admin` → login → edit → simpan → **langsung tampil di CV**.
Tidak perlu build ulang, tidak perlu deploy ulang.

### Update tampilan / kode
```bash
# Edit kode di lokal
npm run dev          # preview di localhost:3000

# Kalau sudah OK, push ke GitHub:
git add .
git commit -m "update: ..."
git push
```
Vercel otomatis detect push ke `main` dan deploy ulang dalam ~1 menit.

---

## DEVELOPMENT LOKAL

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` untuk CV dan `http://localhost:3000/admin` untuk admin panel.

---

## STRUKTUR PROJECT

```
src/
├── app/
│   ├── page.tsx              ← CV (Server Component, fetch DB langsung)
│   ├── layout.tsx
│   ├── globals.css
│   ├── admin/
│   │   ├── page.tsx          ← Admin panel (Client Component)
│   │   └── admin.module.css
│   └── api/
│       ├── data/route.ts     ← GET semua data sekaligus
│       ├── auth/route.ts     ← Login / logout / check session
│       ├── profile/route.ts
│       ├── skills/route.ts
│       ├── experience/route.ts
│       └── projects/route.ts
├── components/
│   ├── CVClient.tsx          ← UI CV (dengan scroll reveal)
│   └── CVClient.module.css
├── lib/
│   ├── db.ts                 ← Neon client + semua query
│   ├── db-init.mjs           ← Script setup database (jalankan sekali)
│   └── auth.ts               ← Helper autentikasi
└── types/
    └── index.ts              ← TypeScript types
```

---

## FAQ

**Q: Apakah Neon benar-benar gratis?**
A: Ya. Free tier Neon memberikan 500MB storage dan compute yang lebih dari cukup untuk CV.

**Q: Apakah Vercel benar-benar gratis?**
A: Ya untuk personal project. Hobby plan gratis selamanya untuk deployment personal.

**Q: Kalau saya edit di admin panel, apakah perlu deploy ulang?**
A: Tidak. Konten tersimpan di database Neon dan langsung dibaca setiap kali CV dibuka.

**Q: Bagaimana mengamankan halaman /admin?**
A: Sudah diamankan dengan cookie-based auth. Hanya yang tahu `ADMIN_PASSWORD` bisa masuk. Untuk keamanan extra, bisa tambahkan Vercel Password Protection (berbayar) atau middleware redirect.

**Q: Bisa custom domain?**
A: Bisa. Di Vercel → Settings → Domains → tambahkan domain kamu. Gratis.
