# SOP DEPLOY FINAL

Dokumen ini adalah SOP deploy satu halaman untuk operasional harian `Unified-System V2` di VPS production.

Gunakan dokumen ini sebagai pegangan utama saat:
- deploy perubahan rutin
- update frontend saja
- update backend saja
- verifikasi setelah deploy
- rollback cepat jika ada masalah

Dokumen pendamping:
- `04_PANDUAN_DEPLOYMENT.md` untuk penjelasan teknis lengkap
- `03_ATURAN_KERJA_SINGKAT.md` untuk aturan kerja ringkas

## Arsitektur Aktif

- Frontend utama berjalan di VPS: `http://76.13.176.231`
- Firebase Hosting `https://v2-portalkita-smpn3.web.app` hanya sebagai redirect legacy
- Backend berjalan sebagai Docker services di VPS
- Secret Firebase Admin production disimpan sebagai file:
  - `/root/unified-system-v2/secrets/firebase-service-account.json`
- Env production utama disimpan di:
  - `/root/unified-system-v2/.env`

## Aturan Wajib

- Gunakan SSH dari terminal lokal Windows, jangan terminal browser Hostinger
- Lakukan `git pull` hanya dari branch yang memang dipakai production
- Jangan jalankan `docker compose down -v`
- Jangan edit secret Firebase sembarangan tanpa backup
- Setelah deploy, wajib cek health dan login admin

## Preflight Sebelum Deploy

Jalankan di VPS:

```bash
cd /root/unified-system-v2
git status
docker compose ps
test -f .env && echo ".env OK"
test -f secrets/firebase-service-account.json && echo "firebase secret OK"
```

Kalau salah satu file penting tidak ada:
- hentikan deploy
- perbaiki dulu file `.env` atau file secret

## Deploy Rutin Semua Service

Jalankan di VPS:

```bash
cd /root/unified-system-v2
git pull
docker compose up -d --build
```

Gunakan ini jika:
- ada perubahan backend dan frontend campuran
- ada perubahan kontrak API
- ada perubahan Docker/env yang memengaruhi banyak service

## Deploy Frontend Saja

Jalankan di VPS:

```bash
cd /root/unified-system-v2
git pull
docker compose up -d --build web-admin
```

Gunakan ini jika:
- hanya ada perubahan di `apps/web-admin`
- tidak ada perubahan backend

Opsional jika ingin menjaga URL lama Firebase:

```bash
firebase deploy --only hosting --project v2-portalkita-smpn3
```

## Deploy Backend Login / Tenant Saja

Jalankan di VPS:

```bash
cd /root/unified-system-v2
git pull
docker compose up -d --build tenant-school-service session-service web-admin
```

Gunakan ini jika:
- ada perubahan login
- ada perubahan Firebase Admin
- ada perubahan reverse proxy login
- ada perubahan env/secret production

## Deploy Perubahan GAS Persisten

Gunakan ini jika ada perubahan pada:
- `services/tenant-school-service`
- schema Prisma tenant-school
- halaman GAS di `apps/web-admin`

Jalankan di VPS:

```bash
cd /root/unified-system-v2
git pull
docker compose up -d --build tenant-school-service web-admin
```

Catatan:
- service `tenant-school-service` akan menjalankan `prisma migrate deploy` atau fallback `prisma db push` saat container start
- perubahan tabel GAS seperti `sync jobs`, `broadcasts`, `support tickets`, `audit events`, dan `global config` akan ikut tersinkron otomatis
- jika seed awal perlu dijalankan ulang secara manual:

```bash
cd /root/unified-system-v2
docker compose exec tenant-school-service sh -lc "npx prisma db seed"
```

## Deploy Batch Database Induk + Status Layanan + Policy Super Admin

Gunakan ini untuk batch perubahan yang mencakup:
- sinkronisasi `Database Induk` ke `Status Layanan Sekolah`
- perbaikan capability `super_admin` di `policy-service`
- pembaruan registry sekolah / login admin sekolah di `tenant-school-service`
- perubahan halaman super admin di `apps/web-admin`

Service yang perlu dibangun ulang:
- `policy-service`
- `tenant-school-service`
- `session-service`
- `web-admin`

Jalankan di VPS:

```bash
cd /root/unified-system-v2
git pull
docker compose up -d --build policy-service tenant-school-service session-service web-admin
```

Catatan penting:
- batch ini tidak membutuhkan perubahan env production baru jika `.env` dan secret Firebase production Anda sudah benar
- `tenant-school-service` akan tetap menjalankan sinkronisasi schema Prisma saat container start
- rebuild `policy-service` wajib dilakukan karena capability `super_admin` berubah di layer policy runtime, bukan hanya di UI

Verifikasi minimal setelah deploy:

```bash
cd /root/unified-system-v2
docker compose ps
docker compose logs policy-service --tail=30
docker compose logs tenant-school-service --tail=30
docker compose logs session-service --tail=30
wget -S -O- http://127.0.0.1:4001/health || true
wget -S -O- http://127.0.0.1:4002/health || true
wget -S -O- http://127.0.0.1:4003/health || true
```

Verifikasi browser:

1. login sebagai `super_admin`
2. buka `Database Induk`
3. buka `Status Layanan Sekolah`
4. pastikan halaman tidak lagi tertahan error `Capability tidak mencukupi`
5. pastikan perubahan status tenant di `Database Induk` tercermin di `Status Layanan Sekolah` setelah refresh

## Artefak Lokal Yang Jangan Ikut Deploy

Saat menyiapkan commit atau push ke VPS, jangan ikutkan artefak lokal berikut:
- folder `.dbg/`
- folder `.firebase/`
- folder `.ssh-deploy/`
- file database lokal di `services/*/.data/*.db`
- file `*.tsbuildinfo`
- binary Prisma lokal hasil generate seperti `libquery_engine-*.so.node` jika hanya terbentuk dari build lokal

Deploy VPS harus membawa source code yang relevan, bukan state database atau artefak hasil build lokal.

## Recreate Tanpa Rebuild

Gunakan jika:
- image sudah benar
- hanya `.env` atau mount secret yang berubah

```bash
cd /root/unified-system-v2
docker compose up -d tenant-school-service session-service web-admin
```

## Verifikasi Wajib Setelah Deploy

Jalankan di VPS:

```bash
cd /root/unified-system-v2
docker compose ps
docker compose logs tenant-school-service --tail=30
docker compose logs session-service --tail=30
wget -S -O- http://127.0.0.1/api/session/health || true
```

Lalu verifikasi dari browser:

1. Buka `http://76.13.176.231/login`
2. Login dengan akun admin
3. Pastikan masuk ke dashboard
4. Pastikan menu utama tampil normal
5. Buka halaman GAS:
   - `/dashboard/super`
   - `/dashboard/super/global-config`
   - `/dashboard/super/broadcast`
   - `/dashboard/super/support`
   - `/dashboard/super/audit`
6. Pastikan create/update/delete di modul GAS berjalan dan data tetap ada setelah refresh

Deploy dianggap selesai hanya jika:
- container penting status `Up`
- `/api/session/health` memberi `200 OK`
- login admin berhasil
- modul GAS utama dapat dibuka tanpa error

## Rollback Cepat

Jika deploy baru bermasalah:

1. Cari commit stabil terakhir
2. Di VPS jalankan:

```bash
cd /root/unified-system-v2
git log --oneline -n 10
git checkout <commit-stabil>
docker compose up -d --build
```

3. Verifikasi lagi dengan health check dan login

Catatan:
- jangan rollback dengan menghapus volume
- jangan rollback dengan `docker compose down -v`

## SOP Saat Ada Error Login

Jalankan urutan ini:

```bash
cd /root/unified-system-v2
docker compose logs tenant-school-service --tail=80
docker compose logs session-service --tail=80
wget -S -O- http://127.0.0.1/api/session/health || true
```

Jika ada error Firebase Admin:
- cek `.env`
- cek file `secrets/firebase-service-account.json`
- pastikan env berikut ada:

```env
NODE_ENV=production
FIREBASE_PROJECT_ID=v2-portalkita-smpn3
FIREBASE_SERVICE_ACCOUNT_PATH=/app/secrets/firebase-service-account.json
GOOGLE_APPLICATION_CREDENTIALS=/app/secrets/firebase-service-account.json
```

Lalu recreate:

```bash
docker compose up -d tenant-school-service session-service web-admin
```

## SOP Saat Build Docker Gagal

Kalau build gagal karena jaringan sementara saat `pnpm install`:

1. jangan panik
2. cek apakah service lama masih `Up`
3. ulangi build service yang relevan saja

Contoh:

```bash
docker compose up -d --build tenant-school-service session-service web-admin
```

Kalau masalah hanya perubahan env/secret:

```bash
docker compose up -d tenant-school-service session-service web-admin
```

## Checklist Operator

Sebelum selesai, centang mental checklist ini:

- `git pull` sukses
- `.env` ada dan benar
- `secrets/firebase-service-account.json` ada
- container inti `Up`
- health endpoint `200 OK`
- login admin sukses
- dashboard tampil normal

## Kalimat Pegangan

Jika ragu saat deploy, pakai aturan singkat ini:

```text
Jangan anggap deploy selesai hanya karena container hidup; deploy baru dianggap selesai jika health check hijau dan login admin berhasil.
```
