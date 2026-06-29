# 🚀 Panduan Deployment Unified-System V2

Dokumen ini adalah panduan teknis lengkap dan terkini untuk melakukan *deployment* sistem V2 ke VPS Hostinger menggunakan Docker.

---

## 🏗️ Arsitektur Deployment

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Backend (5 Services)** | NestJS + Docker | Di-*deploy* di VPS Hostinger |
| **Database** | SQLite (per-service) | Tersimpan di dalam Docker Volume |
| **Frontend** | React (Vite) | Di-*deploy* di Firebase Hosting |

### Port Masing-masing Service
| Service | Port |
|---|---|
| `session-service` | `4001` |
| `policy-service` | `4002` |
| `tenant-school-service` | `4003` |
| `academic-directory-service` | `4004` |
| `attendance-service` | `4005` |

**IP Server VPS:** `76.13.176.231`

---

## ⚙️ BAGIAN 1: DEPLOY PERTAMA KALI

### Langkah 1: Beli & Setup VPS di Hostinger
1. Beli paket VPS di [Hostinger.com](https://hostinger.com) (minimal KVM 1).
2. Pilih OS: **Ubuntu 24.04 LTS**.
3. Centang fitur tambahan: **Pendeteksi Malware** dan **Docker Manager**.
4. Buat *Root password* yang kuat dan simpan di tempat aman.
5. Setelah server aktif, catat **IP Address**-nya.

---

### Langkah 2: Masuk ke Server (SSH)

Buka **CMD / Terminal** di laptop Anda, lalu jalankan:
```bash
ssh root@76.13.176.231
```
Ketik *password* Root Anda saat diminta *(layar tidak akan menampilkan karakter, itu normal)*.

---

### Langkah 3: Unduh Kode dari GitHub

> ⚠️ **PENTING:** Repositori GitHub harus berstatus **Public** sementara selama proses ini. Ubah kembali menjadi **Private** setelah selesai.

Jalankan perintah berikut **satu per satu** di dalam server:

```bash
apt-get install git -y
```
```bash
git clone https://github.com/Restoeboemi22/unified-system-v2.git
```
```bash
cd unified-system-v2
```

---

### Langkah 4: Nyalakan Semua Service (Build & Deploy)

Ini adalah perintah terpenting. Proses ini memakan waktu **3–5 menit** karena Docker mengunduh dan mengompilasi semua dependensi.

```bash
docker compose up -d --build
```

Jika sukses, Anda akan melihat output seperti:
```
✔ Container session-service              Started
✔ Container policy-service               Started
✔ Container tenant-school-service        Started
✔ Container academic-directory-service   Started
✔ Container attendance-service           Started
```

---

## 🔄 BAGIAN 2: UPDATE KODE (Setelah Ada Perubahan)

Setiap kali ada perubahan kode yang sudah di-*push* ke GitHub, lakukan langkah berikut di server:

```bash
# 1. Masuk ke server (jika belum)
ssh root@76.13.176.231

# 2. Masuk ke folder proyek
cd unified-system-v2

# 3. Ambil perubahan terbaru dari GitHub
#    (pastikan repositori Public sementara)
git pull

# 4. Rakit ulang dan restart semua service
docker compose up -d --build
```

---

## 🛠️ BAGIAN 3: PERINTAH OPERASIONAL SEHARI-HARI

Setelah masuk ke server via SSH dan berada di dalam folder `unified-system-v2/`:

```bash
# Cek status semua service (Running/Stopped)
docker compose ps

# Lihat log/catatan error sebuah service secara langsung
docker compose logs -f session-service
docker compose logs -f policy-service

# Restart sebuah service tanpa rebuild
docker compose restart session-service

# Matikan semua service
docker compose down

# Nyalakan ulang semua service (tanpa rebuild)
docker compose up -d
```

---

## 🌐 BAGIAN 4: DEPLOY FRONTEND (Firebase Hosting)

### Langkah 1: Buat File Konfigurasi Produksi
Buat file `.env.production` di dalam folder `apps/web-admin/`:
```env
VITE_SESSION_SERVICE_URL=http://76.13.176.231:4001
VITE_POLICY_SERVICE_URL=http://76.13.176.231:4002
VITE_TENANT_SCHOOL_SERVICE_URL=http://76.13.176.231:4003
VITE_ACADEMIC_DIRECTORY_SERVICE_URL=http://76.13.176.231:4004
VITE_ATTENDANCE_SERVICE_URL=http://76.13.176.231:4005
```

### Langkah 2: Build Frontend
Jalankan di terminal laptop Anda (bukan di server VPS):
```bash
pnpm --filter web-admin run build
```

### Langkah 3: Deploy ke Firebase
```bash
firebase deploy --only hosting
```

---

## 🔒 BAGIAN 5: KEAMANAN & TIPS PENTING

| ✅ Yang Harus Dilakukan | ❌ Yang Harus Dihindari |
|---|---|
| Simpan Root Password di tempat aman | Jangan bagikan Root Password |
| Kembalikan GitHub ke Private setelah `git pull` | Jangan biarkan repo Public lebih dari 5 menit |
| Cek log jika ada service yang Error | Jangan jalankan `docker compose down -v` (data hilang!) |
| Backup data secara berkala via Hostinger Dashboard | |

### ⚠️ Peringatan Volume Data
Perintah `docker compose down` aman digunakan — data database **TIDAK** akan terhapus.
Namun **JANGAN** jalankan `docker compose down -v` karena `-v` akan **menghapus semua data database** secara permanen.

---

## 🔧 BAGIAN 6: TROUBLESHOOTING (Pemecahan Masalah)

### Service tidak mau start / terus Restart
```bash
# Lihat pesan error spesifiknya
docker compose logs nama-service
```

### Error saat `docker compose up --build`
1. Pastikan Anda berada di dalam folder `unified-system-v2/`.
2. Pastikan `docker-compose.yml` ada (`ls -la`).
3. Pastikan kode terbaru sudah di-`git pull`.

### Tidak bisa akses dari browser
1. Cek apakah service berjalan: `docker compose ps`
2. Pastikan *Firewall* di Hostinger Dashboard membuka port 4001–4005.

---

*Dokumen ini dibuat secara otomatis berdasarkan proses deployment aktual sistem Unified-System V2. Terakhir diperbarui: 29 Juni 2026.*
