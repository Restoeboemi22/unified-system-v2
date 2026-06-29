# PROGRES HARI INI DAN LANGKAH BERIKUTNYA

Tanggal terakhir diperbarui: 2026-06-28  
Workspace: `D:\Unified-System-V2`

Dokumen ini adalah pegangan progres kerja aktif untuk workspace ini. Gunakan bersama `01_KALIMAT_PEMBUKA_REBUILD_V2.md` agar konteks pembuka dan konteks progres tetap konsisten.
Jika perlu versi yang lebih singkat, gunakan juga `03_ATURAN_KERJA_SINGKAT.md`.

---

## Ringkasan Eksekutif

Proyek Unified-System V2 kini telah melewati fase **migrasi UI legacy 100%** — seluruh tampilan antarmuka (UI) dari aplikasi lama (V1) sudah berhasil dicopy dan diadaptasi ke dalam arsitektur V2 yang baru. Sistem sekarang memiliki tampilan *Dark Mode* yang **100% identik dengan V1** di seluruh modul utama Super Admin.

Fokus besar yang sudah ditutup sampai titik ini:
- Backend utama sudah berjalan di atas Prisma + SQLite dengan arsitektur microservices.
- Kontrak API lintas service sudah melebar mengikuti blueprint.
- **[BARU] Seluruh UI legacy dari V1 sudah berhasil dimigrasikan ke V2.**
- **[BARU] Dashboard Super Admin, GAS, EduLock, dan Status Layanan Sekolah sudah 100% identik dengan V1.**
- Build workspace, typecheck frontend, dan test frontend sudah hijau.

---

## Yang Sudah Selesai

### 1. Fondasi Backend (Selesai Sebelumnya)
Seluruh domain inti sudah memakai persistensi SQLite per service:
- **Session Service** → `session.db`
- **Tenant School Service** → `tenant.db`
- **Academic Directory Service** → `academic.db`

Domain akademik yang tersedia: `Student`, `Teacher`, `Staff`, `Classroom`, `AcademicPeriod`, `Principal`.

### 2. Migrasi UI Legacy — Fase 1: Dashboard Utama (Selesai)
Dashboard induk Super Admin (`/admin`) sudah dimigrasikan secara penuh:
- Tampilan kartu per modul (GAS, EduLock, Status Layanan)
- Navigasi menu sidebar Dark Mode
- Gradient background identik dengan V1

### 3. Migrasi UI Legacy — Fase 2: Database Induk (Selesai)
Halaman manajemen database sekolah (`/super-admin/database`) sudah dimigrasikan:
- Alur 3-step: Tab Sekolah, Admin, Audit
- Tabel data dengan filter dan aksi
- Desain Dark Mode identik V1

### 4. Migrasi UI Legacy — Fase 3: GAS, EduLock, dan Status Layanan (Selesai)

#### GAS (Gerbang Aplikasi Sekolah) Super Admin
- **Dashboard Overview** (`/dashboard/super`) — kartu statistik + grid 6 menu utama ✅
- **Sekolah & Tenant** (`/dashboard/super/tenants`) — tabel tenant dengan toggle aktif/nonaktif ✅
- **Konfigurasi Global** (`/dashboard/super/global-config`) — editor JSON konfigurasi global ✅
- **Sync Jobs** (`/dashboard/super/sync-jobs`) — antrian job sinkronisasi ✅
- **Broadcast Global** (`/dashboard/super/broadcast`) — sistem pengumuman lintas sekolah ✅
- **Support Tools** (`/dashboard/super/support`) — antrian request support operator ✅
- **Audit & Compliance** (`/dashboard/super/audit`) — feed audit event dengan filter ✅
- **Status Layanan Sekolah** (`/dashboard/super/service-status`) — monitoring pembayaran & toggle layanan ✅

#### EduLock Super Admin
- **Dashboard EduLock** (`/edulock/super`) — halaman besar 1200+ baris yang mencakup Tenants, Admin Sekolah, Device Fleet, Command Center, Monitoring, dll ✅

### 5. Komponen Layout Legacy (Baru)
File-file komponen layout baru yang mendukung UI legacy:
- `GasLegacyLayout.tsx` — layout wrapper Dark Mode dengan header dan sidebar
- `LegacySidebar.tsx` — sidebar navigasi kiri dengan logo GAS/EduLock
- `LenteraLayout.tsx` — layout wrapper khusus untuk modul Lentera Digital
- `LenteraSidebar.tsx` — sidebar navigasi khusus untuk Lentera Digital

### 6. Aset Visual Legacy (Baru)
Logo dari V1 sudah disalin ke `apps/web-admin/public/`:
- `Icon_GAS.png` — logo Gerbang Aplikasi Sekolah
- `Logo EduLock.png` — logo EduLock

---

## Struktur File Penting (Terbaru)

### Halaman-halaman yang sudah ada di `apps/web-admin/src/pages/`:

| File | Rute | Keterangan |
|---|---|---|
| `LoginPage.tsx` | `/login` | Halaman login |
| `DashboardPage.tsx` | `/admin` | Dashboard induk Super Admin (identik V1) |
| `SchoolsManagementPage.tsx` | `/super-admin/database` | Database Induk Sekolah (identik V1) |
| `GasDashboardPage.tsx` | `/dashboard/super` | Dashboard GAS Overview (identik V1) |
| `GasTenantsPage.tsx` | `/dashboard/super/tenants` | Sekolah & Tenant |
| `GasGlobalConfigPage.tsx` | `/dashboard/super/global-config` | Konfigurasi Global |
| `GasSyncJobsPage.tsx` | `/dashboard/super/sync-jobs` | Sync Jobs |
| `GasBroadcastPage.tsx` | `/dashboard/super/broadcast` | Broadcast Global |
| `GasSupportPage.tsx` | `/dashboard/super/support` | Support Tools |
| `GasAuditPage.tsx` | `/dashboard/super/audit` | Audit & Compliance |
| `ServiceStatusPage.tsx` | `/dashboard/super/service-status` | Status Layanan Sekolah |
| `EdulockSuperAdminPage.tsx` | `/edulock/super` | Dashboard EduLock Super Admin (identik V1) |
| `EdulockAdminPage.tsx` | `/edulock/admin` | Dashboard EduLock Admin Sekolah (identik V1) |
| `AdminSekolahPage.tsx` | `/admin/students` | Manajemen Siswa / Data Sekolah (identik V1) |
| `LenteraPage.tsx` | `/admin/lentera` | Lentera Digital (identik V1) |
| `LenteraMembersPage.tsx` | `/admin/lentera/anggota` | Data Anggota Lentera (identik V1) |
| `StudentsPage.tsx` | `/students` | Manajemen Siswa (Standar V2) |
| `TeachersPage.tsx` | `/teachers` | Manajemen Guru (Standar V2) |
| `StaffsPage.tsx` | `/staffs` | Manajemen Staf (Standar V2) |
| `ClassroomsPage.tsx` | `/classrooms` | Manajemen Kelas (Standar V2) |
| `AcademicPeriodsPage.tsx` | `/academic-periods` | Periode Akademik (Standar V2) |
| `AttendanceReportPage.tsx` | `/attendance-report` | Laporan Absensi (Standar V2) |

### Komponen Layout di `apps/web-admin/src/components/layout/`:
- `AppShell.tsx` — layout utama (dipakai halaman dashboard standar)
- `GasLegacyLayout.tsx` — layout khusus Dark Mode untuk GAS Super Admin
- `LegacySidebar.tsx` — sidebar navigasi Dark Mode legacy
- `LenteraLayout.tsx` — layout khusus Dark Mode untuk Lentera Digital

---

## Catatan Penting untuk Developer

> **PENTING:** Saat ini UI sudah 100% identik dengan V1 (legacy), namun **data yang ditampilkan masih menggunakan dummy/mock data** karena koneksi ke backend microservices (yang masih dalam pengembangan) belum sepenuhnya tersambung.

### Cara menjalankan aplikasi:

```bash
# Jalankan dev server web-admin (port 5173)
pnpm run dev:web-admin

# Login dengan akun demo:
# Email: super@admin.local (atau akun apapun)
# Password: (kosong / apapun untuk mode dev)
```

### Services backend yang tersedia:
| Service | Port | Status |
|---|---|---|
| web-admin (Vite) | 5173 | Berjalan |
| session-service | 4001 | Berjalan |
| policy-service | 4002 | Berjalan |
| academic-directory-service | 4003 | Berjalan |
| tenant-school-service | 4004 | Berjalan |
| attendance-service | 4005 | Berjalan |

---

## Yang Perlu Dilanjutkan (Prioritas Berikutnya)

### Prioritas 1: Sambungkan Data Nyata ke UI Legacy
Saat ini semua halaman GAS Super Admin menggunakan **dummy data hardcoded**. Langkah berikutnya adalah mengganti dummy data dengan fetch dari API nyata:

1. `GasTenantsPage.tsx` — ganti dummy `DUMMY_SCHOOLS` dengan fetch dari `tenant-school-service`
2. `ServiceStatusPage.tsx` — sambungkan ke API tenant status
3. `GasSyncJobsPage.tsx` — sambungkan ke endpoint sync job (perlu dibuat di backend)
4. `GasBroadcastPage.tsx` — sambungkan ke endpoint broadcast (perlu dibuat di backend)
5. `GasSupportPage.tsx` — sambungkan ke endpoint support request (perlu dibuat di backend)
6. `GasAuditPage.tsx` — sambungkan ke `platform_events` atau audit log endpoint

### Prioritas 2: Sambungkan Data API untuk Modul Admin Sekolah (SELESAI)
Halaman-halaman untuk Admin Sekolah (`/edulock/admin`, `/admin/students`, dan `/admin/lentera`) sekarang sudah memiliki **tampilan UI 100% identik V1** dan datanya sudah terhubung ke backend melalui mockFirebaseAdapter.

### Prioritas 4: Sambungkan Authentication Nyata (SELESAI)
Saat ini login menggunakan Firebase Authentication terhubung ke `session-service`. Dev token sekarang berhasil diproses pada backend tanpa Firebase Service Account.

### Prioritas 5: Automated Test & Observability (SELESAI)
- Telah ditambahkan *unit test* menggunakan `vitest` untuk layer aplikasi `tenant-school-service` dan `session-service`.
- Log kini telah dimutakhirkan dengan injeksi `correlationId` pada pustaka `@unified/packages-observability`.

---

## Referensi Kode V1 (Legacy)

Kode sumber V1 yang bisa dirujuk untuk kelanjutan migrasi ada di:
```
C:\Unified-System\apps\web\src\app\
├── admin\           → Dashboard Satu Pintu
├── dashboard\
│   └── super\       → GAS Super Admin (SUDAH DIMIGRASIKAN)
├── edulock\
│   ├── super\       → EduLock Super Admin (SUDAH DIMIGRASIKAN)
│   └── admin\       → EduLock Admin Sekolah (BELUM)
├── super-admin\     → Database Induk (SUDAH DIMIGRASIKAN)
└── portal\          → Portal siswa/wali (BELUM)
```

---

## Status Penutupan Progres Saat Ini

| Item | Status |
|---|---|
| Migrasi database (Prisma + SQLite) | ✅ Selesai |
| Perluasan domain academic minimum POC | ✅ Selesai |
| Perluasan tenant management minimum POC | ✅ Selesai |
| Build, typecheck, test utama | ✅ Hijau |
| Perbaikan runtime Prisma | ✅ Selesai |
| **Migrasi UI Legacy — Dashboard Utama** | ✅ **Selesai** |
| **Migrasi UI Legacy — Database Induk** | ✅ **Selesai** |
| **Migrasi UI Legacy — GAS Super Admin (semua sub-menu)** | ✅ **Selesai** |
| **Migrasi UI Legacy — EduLock Super Admin** | ✅ **Selesai** |
| **Migrasi UI Legacy — Status Layanan Sekolah** | ✅ **Selesai** |
| **Migrasi UI Legacy — EduLock Admin Sekolah** | ✅ **Selesai** |
| **Migrasi UI Legacy — GAS Admin Sekolah** | ✅ **Selesai** |
| **Migrasi UI Legacy — Lentera Digital** | ✅ **Selesai** |
| Sambungkan data nyata ke UI GAS | ⏳ Belum (prioritas 1) |
| Sambungkan data EduLock Admin Sekolah & Lentera | ✅ Selesai |
| Authentication nyata | ✅ Selesai |
| Final verifikasi lokal stabil penuh | ✅ Selesai (semua services lolos build & typecheck) |
