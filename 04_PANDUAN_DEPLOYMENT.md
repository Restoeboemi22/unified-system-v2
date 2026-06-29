# Panduan Deployment Unified-System V2

Dokumen ini berisi panduan teknis langkah demi langkah untuk melakukan *deployment* (peluncuran) sistem V2 ke *cloud* untuk pengujian secara paralel dengan V1 (A/B Testing).

## Arsitektur Deployment

Sistem V2 kita terdiri dari:
1. **1 Frontend** (Web Admin) yang dibangun dengan React (Vite).
2. **5 Microservices Backend** yang dibangun dengan Node.js (NestJS).
3. **1 Database Relasional** (PostgreSQL).

Untuk merilis ini dengan mulus (dan dengan biaya serendah mungkin), kami menyarankan menggunakan kombinasi layanan berikut:
- **Supabase** atau **Neon.tech** (Untuk Database PostgreSQL gratis)
- **Railway.app** (Untuk 5 Microservices Backend, sangat ramah *monorepo* dan Node.js)
- **Firebase Hosting** (Untuk Frontend Web Admin, sangat stabil dan Anda sudah terbiasa dengan ini)

---

## Langkah 1: Persiapan Database (Supabase)
1. Buat akun di [Supabase.com](https://supabase.com).
2. Buat _project_ baru.
3. Masuk ke **Project Settings -> Database** dan cari bagian **Connection string (URI)**.
4. Salin URI tersebut, yang berformat `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`.
5. Ubah `[PASSWORD]` dengan kata sandi proyek Anda.
6. Simpan URI ini untuk digunakan di Langkah 2.

> **Opsional**: Setelah database berhasil terhubung ke *backend*, Anda dapat menjalankan perintah `npx prisma db push` dari lokal komputer Anda (sambil menyetel `DATABASE_URL` ke URI Supabase) untuk secara otomatis membuat seluruh tabel *database* di Supabase.

---

## Langkah 2: Deploy Backend Microservices (Railway)
Railway adalah *platform cloud* termudah untuk mendeploy aplikasi *monorepo*.

1. Buat akun di [Railway.app](https://railway.app).
2. Buat proyek baru dan pilih **"Deploy from GitHub repo"**.
3. Hubungkan repositori GitHub tempat kode V2 ini disimpan.
4. Karena kita punya 5 *microservices*, kita perlu men-*deploy* repositori ini **5 KALI** ke dalam proyek Railway yang sama, masing-masing dengan pengaturan yang berbeda.
5. Saat men-*deploy* setiap _service_, masuk ke bagian **Settings**:
   - **Root Directory**: Kosongkan (Biarkan di `/`).
   - **Build Command**: Kosongkan (Railway akan mendeteksi `Dockerfile` yang telah kita buat).
   - **Start Command**: Kosongkan (Akan diatur oleh Docker).
6. Di bagian **Variables**, Anda wajib mengatur _Environment Variables_ berikut untuk masing-masing *service*:
   - `SERVICE_PATH`: Lokasi folder *service*, misalnya: `services/session-service` atau `services/tenant-school-service`. Ini memberitahu Docker mana yang harus di-*build*.
   - `DATABASE_URL`: URI Supabase yang Anda dapatkan di Langkah 1.
   - Variabel Firebase Admin (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) hanya dibutuhkan untuk `session-service` dan `tenant-school-service`.
7. Setelah kelima layanan berhasil *deploy*, Railway akan memberikan URL publik untuk masing-masing layanan (misal: `session-service-production.up.railway.app`). Salin kelima URL ini!

---

## Langkah 3: Konfigurasi Komunikasi Antar-Layanan
Setelah kelima layanan mendapat URL, Anda harus kembali mengedit **Variables** di Railway untuk semua layanan dan memasukkan URL rekan-rekan mereka:
- `SESSION_SERVICE_BASE_URL`
- `POLICY_SERVICE_BASE_URL`
- `TENANT_SCHOOL_SERVICE_BASE_URL`
- `ACADEMIC_DIRECTORY_SERVICE_BASE_URL`
- `ATTENDANCE_SERVICE_BASE_URL`

(*Lihat file `.env.production.example` sebagai referensi*).

---

## Langkah 4: Deploy Frontend Web Admin (Firebase Hosting)
Karena Anda memilih untuk menggunakan Firebase Hosting (seperti V1), saya sudah menyiapkan `firebase.json` di dalam _repository_ ini yang dikonfigurasi khusus untuk SPA React/Vite.

### Opsi A (Menimpa URL V1 Lama)
Jika Anda ingin langsung menggunakan URL lama (menggantikan V1):
1. Buka terminal komputer Anda.
2. Jalankan perintah `firebase use smpn3pacet-app` (Ganti dengan Project ID Firebase lama Anda).

### Opsi B (Membuat URL Baru untuk A/B Testing - Disarankan)
1. Buka [Firebase Console](https://console.firebase.google.com).
2. Buat _Project_ baru (misalnya `v2-portal-smpn3`).
3. Di terminal lokal Anda, jalankan `firebase login` lalu `firebase use v2-portal-smpn3` (sesuaikan dengan ID proyek baru).

### Proses Build & Deploy
Sebelum mendeploy ke Firebase, Frontend harus tahu di mana lokasi 5 Backend API Anda.

1. Buat _file_ `.env.production` di dalam folder `apps/web-admin/` (jangan di *root*).
2. Isi file tersebut dengan URL kelima *service backend* yang Anda dapatkan di Langkah 3, seperti ini:
   ```env
   VITE_SESSION_SERVICE_URL=https://session-service-production.up.railway.app
   VITE_POLICY_SERVICE_URL=https://policy-service-production.up.railway.app
   VITE_TENANT_SCHOOL_SERVICE_URL=https://tenant-school-service-production.up.railway.app
   VITE_ACADEMIC_DIRECTORY_SERVICE_URL=https://academic-directory-service-production.up.railway.app
   VITE_ATTENDANCE_SERVICE_URL=https://attendance-service-production.up.railway.app
   ```
3. Lakukan proses _build_:
   Di terminal (root folder V2), jalankan:
   ```bash
   pnpm --filter web-admin run build
   ```
4. Setelah _build_ selesai (sukses membuat folder `apps/web-admin/dist`), jalankan perintah:
   ```bash
   firebase deploy --only hosting
   ```

Selamat! Firebase akan memberikan Anda URL *live* (misalnya `v2-portal-smpn3.web.app`). URL inilah yang dapat Anda uji coba di lapangan sebagai V2, berjalan secara paralel atau menggantikan V1 Anda!
