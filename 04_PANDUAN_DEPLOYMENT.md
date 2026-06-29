# 🚀 Panduan Deployment Unified-System V2

Dokumen ini adalah panduan teknis lengkap dan terkini untuk melakukan *deployment* sistem V2 ke VPS Hostinger menggunakan Docker, beserta deployment frontend ke Firebase Hosting.

> **Status Terakhir:** ✅ BERHASIL DEPLOY — 29 Juni 2026, 10:39 WIB

---

## 🏗️ Arsitektur Deployment (Aktif)

| Komponen | Teknologi | Alamat Produksi |
|---|---|---|
| **Frontend Web Admin** | React + Vite → Firebase Hosting | https://v2-portalkita-smpn3.web.app |
| **Session Service** | NestJS + Docker | http://76.13.176.231:4001 |
| **Policy Service** | NestJS + Docker | http://76.13.176.231:4002 |
| **Tenant School Service** | NestJS + Docker | http://76.13.176.231:4003 |
| **Academic Directory Service** | NestJS + Docker | http://76.13.176.231:4004 |
| **Attendance Service** | NestJS + Docker | http://76.13.176.231:4005 |
| **Database** | SQLite per-service | Docker Volume di VPS |

### Info Server VPS
| Item | Detail |
|---|---|
| **Provider** | Hostinger |
| **Paket** | KVM 1 |
| **OS** | Ubuntu 24.04 LTS |
| **IP Address** | `76.13.176.231` |
| **SSH Command** | `ssh root@76.13.176.231` |

### Info Firebase Hosting
| Item | Detail |
|---|---|
| **Project ID** | `v2-portalkita-smpn3` |
| **URL Live** | https://v2-portalkita-smpn3.web.app |
| **Project Console** | https://console.firebase.google.com/project/v2-portalkita-smpn3/overview |

---

## ⚙️ BAGIAN 1: DEPLOY PERTAMA KALI (SUDAH SELESAI)

> ✅ Bagian ini sudah berhasil dieksekusi pada 29 Juni 2026.
> Simpan sebagai referensi jika suatu saat perlu setup server baru dari awal.

### Langkah 1: Beli & Setup VPS di Hostinger
1. Beli paket VPS di [Hostinger.com](https://hostinger.com) (minimal KVM 1).
2. Pilih OS: **Ubuntu 24.04 LTS**.
3. Centang fitur tambahan: **Pendeteksi Malware** dan **Docker Manager**.
4. Buat *Root password* yang kuat dan simpan di tempat aman.
5. Setelah server aktif, catat **IP Address**-nya.

### Langkah 2: Masuk ke Server via SSH

```bash
ssh root@76.13.176.231
```
Ketik *password* Root saat diminta *(layar tidak menampilkan karakter — itu normal)*.

> ⚠️ **PENTING:** Gunakan **CMD/Terminal Windows** untuk SSH. Jangan gunakan
> Terminal bawaan browser Hostinger karena sering merusak teks *copy-paste*.

### Langkah 3: Unduh Kode dari GitHub

> Repositori harus berstatus **Public** sementara. Kembalikan ke **Private** setelah selesai.

```bash
apt-get install git -y
git clone https://github.com/Restoeboemi22/unified-system-v2.git
cd unified-system-v2
```

### Langkah 4: Nyalakan Semua Service

```bash
docker compose up -d --build
```

Proses ini memakan waktu **3–5 menit**. Jika berhasil, akan muncul:
```
✔ Container session-service              Started
✔ Container policy-service               Started
✔ Container tenant-school-service        Started
✔ Container academic-directory-service   Started
✔ Container attendance-service           Started
```

---

## 🔄 BAGIAN 2: UPDATE KODE (Prosedur Rutin)

Setiap kali ada perubahan kode yang sudah di-*push* ke GitHub:

```bash
# 1. Masuk ke server
ssh root@76.13.176.231

# 2. Masuk ke folder proyek
cd unified-system-v2

# 3. Buka repo ke Public sementara di GitHub, lalu:
git pull

# 4. Kembalikan repo ke Private di GitHub

# 5. Rakit ulang dan restart semua service
docker compose up -d --build
```

---

## 🌐 BAGIAN 3: DEPLOY FRONTEND (Prosedur Rutin)

Setiap kali ada perubahan pada kode frontend (`apps/web-admin/`):

### Langkah 1: Build Frontend
Jalankan di terminal **laptop** Anda (bukan di server VPS):
```bash
pnpm --filter web-admin run build
```

### Langkah 2: Deploy ke Firebase
```bash
firebase deploy --only hosting --project v2-portalkita-smpn3
```

Setelah selesai, perubahan akan langsung terlihat di **https://v2-portalkita-smpn3.web.app**.

### File Konfigurasi Lingkungan
| File | Digunakan Untuk | Isi |
|---|---|---|
| `apps/web-admin/.env` | Development lokal | URL `localhost:400x` |
| `apps/web-admin/.env.production` | Build produksi | URL `76.13.176.231:400x` |

> Vite otomatis menggunakan `.env.production` saat menjalankan `vite build`.

---

## 🛠️ BAGIAN 4: PERINTAH OPERASIONAL SEHARI-HARI

Setelah SSH masuk ke server (`ssh root@76.13.176.231`) dan `cd unified-system-v2`:

```bash
# Cek status semua service (Running/Stopped/Error)
docker compose ps

# Lihat log real-time sebuah service
docker compose logs -f session-service
docker compose logs -f policy-service
docker compose logs -f tenant-school-service
docker compose logs -f academic-directory-service
docker compose logs -f attendance-service

# Restart sebuah service tanpa rebuild
docker compose restart session-service

# Matikan semua service (data TIDAK hilang)
docker compose down

# Nyalakan ulang semua service (tanpa rebuild)
docker compose up -d
```

---

## 📁 BAGIAN 5: STRUKTUR FILE PENTING

```
Unified-System-V2/
├── Dockerfile                    ← Template build Docker untuk semua service
├── docker-compose.yml            ← Orkestrator 5 service di VPS
├── apps/
│   └── web-admin/
│       ├── .env                  ← Konfigurasi development lokal
│       └── .env.production       ← Konfigurasi produksi (VPS)
└── firebase.json                 ← Konfigurasi Firebase Hosting
```

### Catatan Dockerfile Penting
`Dockerfile` di *root* menggunakan pola **multi-stage build**:
1. **Builder Stage**: Instal semua dependensi → Build packages → Build service → Generate Prisma Client
2. **Runner Stage**: Hanya berisi *output* produksi yang ringan

Variabel `ARG SERVICE_PATH` di `docker-compose.yml` menentukan *service* mana yang dibangun (misal: `services/session-service`).

---

## 🔒 BAGIAN 6: KEAMANAN & TIPS PENTING

| ✅ Yang Harus Dilakukan | ❌ Yang Harus Dihindari |
|---|---|
| Simpan Root Password di tempat aman | Jangan bagikan Root Password ke siapa pun |
| Kembalikan GitHub ke **Private** setelah `git pull` | Jangan biarkan repo Public lebih dari 5 menit |
| Gunakan CMD/Terminal Windows untuk SSH | Jangan gunakan Terminal bawaan browser Hostinger |
| Cek log jika ada service yang Error | **JANGAN** jalankan `docker compose down -v` (data hilang!) |

### ⚠️ Peringatan Volume Data
- `docker compose down` → **AMAN**, data database tetap ada
- `docker compose down -v` → **BERBAHAYA**, semua data database **terhapus permanen**

---

## 🔧 BAGIAN 7: TROUBLESHOOTING

### Build gagal: `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL`
**Penyebab:** `tsconfig.base.json` tidak tersalin ke Docker image, atau urutan build salah.
**Solusi:** Pastikan `Dockerfile` sudah versi terbaru dengan perintah:
```bash
git pull  # di dalam server (pastikan repo Public dulu)
docker compose up -d --build
```

### Build gagal: `npx prisma generate` error
**Penyebab:** Prisma CLI tidak tersedia di *production stage*.
**Solusi:** Sudah diperbaiki di `Dockerfile` terbaru — Prisma di-*generate* di *builder stage*.

### Service tidak mau start / terus Restart
```bash
docker compose logs nama-service
```

### Tidak bisa akses dari browser
1. Cek apakah service berjalan: `docker compose ps`
2. Buka port di **Firewall Hostinger**: Dashboard → Security → Firewall → Buka port 4001–4005

### `git pull` meminta username/password
**Penyebab:** Repositori GitHub masih **Private**.
**Solusi:** Ubah ke **Public** sementara di GitHub (Settings → Danger Zone → Change visibility), lalu ulangi `git pull`.

---

## 📋 LOG RIWAYAT DEPLOYMENT

| Tanggal | Versi | Catatan |
|---|---|---|
| 29 Juni 2026 | V2.0 - Initial | Deploy pertama berhasil. Backend 5 service aktif di VPS Hostinger. Frontend live di Firebase. |

---

*Dokumen ini dibuat dan diperbarui berdasarkan proses deployment aktual sistem Unified-System V2.*
*Terakhir diperbarui: 29 Juni 2026, 10:41 WIB*
