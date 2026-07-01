# PROGRES HARI INI DAN LANGKAH BERIKUTNYA

Tanggal terakhir diperbarui: 2026-07-01  
Workspace: `D:\Unified-System-V2`

Dokumen ini adalah pegangan progres kerja aktif untuk workspace ini. Gunakan bersama `01_KALIMAT_PEMBUKA_REBUILD_V2.md` agar konteks pembuka dan konteks progres tetap konsisten.
Jika perlu versi yang lebih singkat, gunakan juga `03_ATURAN_KERJA_SINGKAT.md`.

Mulai titik ini, dokumen ini diposisikan sebagai:

- sumber progres aktif yang wajib dibaca sebelum mengembangkan fitur baru,
- catatan keputusan strategis terbaru untuk arah `V2`,
- panduan prioritas kerja harian developer,
- dokumen yang wajib ikut diperbarui setiap kali ada progres coding, perubahan arsitektur, atau perubahan prioritas.

---

## Ringkasan Eksekutif

Proyek `Unified-System V2` saat ini telah melewati dua fase penting:

1. fase pembentukan pondasi backend modular dan web admin baru,
2. fase pemulihan deployment production sampai login berhasil normal di VPS.

Secara visual, `web-admin` V2 sudah berhasil mengadopsi banyak tampilan legacy `V1`, khususnya pada area `Super Admin`, `GAS`, `EduLock`, `Lentera`, dan `Status Layanan Sekolah`.

Namun keputusan strategis terbaru tim adalah:

- **V2 tidak boleh langsung dikejar ke APK sebelum rumah utamanya siap.**
- **Fokus utama sekarang adalah menyempurnakan sisi web V2 terlebih dahulu.**
- **Web V2 harus menjadi rumah utama, source of truth, dan control plane sebelum fase hybrid/APK dimulai.**

Artinya:

- web `V2` harus disempurnakan dulu agar struktur data, role, capability, tenant, dan alur bisnis benar-benar matang,
- backend `V2` harus distabilkan sebagai platform bersama,
- setelah itu barulah client hybrid untuk `siswa`, `guru`, dan `kepala sekolah` dibangun di atas rumah yang sudah siap.

Fokus besar yang sudah ditutup sampai titik ini:
- Backend utama sudah berjalan di atas Prisma + SQLite dengan arsitektur microservices.
- Kontrak API lintas service sudah melebar mengikuti blueprint.
- Login production sudah berhasil normal di VPS.
- Firebase Admin production di VPS sudah aktif melalui file service account JSON.
- SOP deploy final sudah dibuat untuk mencegah improvisasi operasional.
- Blueprint arsitektur hybrid V2 sudah dibuat sebagai arah jangka menengah.
- Seluruh UI legacy utama dari V1 sudah berhasil dimigrasikan ke V2 pada area web admin.
- Dashboard Super Admin, GAS, EduLock, dan Status Layanan Sekolah sudah sangat dekat dengan tampilan V1.
- Batch pertama penyempurnaan web V2 sudah dimulai dengan merapikan `ServiceStatusPage.tsx` agar membaca status layanan nyata dari backend `tenant-school-service`.
- Batch kedua penyempurnaan web V2 sudah merapikan `DashboardPage.tsx` agar ringkasan super admin tidak lagi memakai angka mock lintas modul.
- Batch final backlog web V2 yang feasible untuk sesi ini sudah menutup area GAS utama: dashboard, broadcast, support, audit, tenant registry, global config draft, dan dashboard siswa.
- Domain GAS di `tenant-school-service` sekarang sudah dipersistenkan ke Prisma untuk `sync jobs`, `broadcasts`, `support tickets`, `audit events`, dan `global config`.
- Fix seed production (`node prisma/seed.js`) sudah dipush agar bisa berjalan di container production tanpa `ts-node`.
- Fix Prisma query engine untuk Alpine (`linux-musl-openssl-3.0.x`) sudah dipush via `binaryTargets` di Prisma schema.
- Rebuild container di VPS untuk service terkait sudah berhasil, health check `200 OK`, dan seed `tenant-school-service` di VPS sudah sukses.
- Login admin sekolah V2 sekarang sudah mengikuti pola operasional V1: username default `NPSN`, password awal `admin123`, dan wajib ganti password saat login pertama.
- Session backend sekarang mengirim flag `requiresPasswordChange`, sehingga akses admin sekolah akan diarahkan ke halaman ganti password sampai password baru disimpan.
- Database sekolah backend sekarang menyimpan `NPSN`, email admin, status buka/tutup login, dan metadata login admin sekolah sebagai pondasi porting APK yang konsisten.
- `Database Induk` V2 sekarang menghitung statistik `Tenant Live` dari login admin sekolah yang benar-benar terjadi, bukan lagi dari jumlah tenant aktif semata.
- Tabel tenant super admin sekarang mengikuti pola V1: menampilkan nama sekolah, `schoolId`, `NPSN`, badge `Tenant Dibuka/Tutup`, badge `Login Dibuka/Belum Siap`, dan badge `Live/Belum Live`.
- Halaman `Database Induk` sekarang sepenuhnya data-driven dari backend; jika master 42 sekolah sudah ada di database tenant V2, jumlah dan nama sekolah akan tampil otomatis tanpa hardcode dummy.
- Seed `tenant-school-service` sekarang sudah ditingkatkan dari 1 `Demo School` menjadi registry master `42` sekolah Mojokerto sesuai daftar operasional yang Anda tetapkan, lengkap dengan `schoolId`, `NPSN`, password awal admin `admin123`, dan status wajib ganti password saat login pertama.
- Baseline master sekolah V2 sekarang mengikuti daftar final yang Anda berikan langsung, sehingga `schoolId` tenant di seed juga sudah diselaraskan ke pola operasional V1 seperti `smpn_1_bangsal`, `smpn_3_pacet`, dan seterusnya.
- Integrasi `Database Induk` ke menu `Status Layanan Sekolah` sekarang sudah diperketat: update data sekolah akan ikut meng-upsert `serviceStatus` di backend, dan invalidasi query frontend sekarang diselaraskan agar perubahan tenant langsung terbaca di halaman status layanan.
- Policy layer lokal sekarang sudah diselaraskan agar role `super_admin` memiliki capability manajemen sekolah dan boleh melintasi `schoolId`, sehingga alur `Database Induk` super admin bisa diuji end-to-end di dev tanpa tertahan `missing_capability` atau `tenant_scope_violation`.
- SOP deploy final sekarang sudah ditambah batch khusus `Database Induk + Status Layanan + Policy Super Admin`, termasuk daftar service yang wajib rebuild di VPS dan daftar artefak lokal yang jangan ikut terbawa saat push/deploy.
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
- **Status Layanan Sekolah** (`/dashboard/super/service-status`) — monitoring status layanan nyata backend V2 + catatan operasional ✅

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

### 7. Stabilitas Produksi dan Deployment (Baru)
Fase incident login production sudah berhasil ditutup:

- jalur produksi aktif sekarang berada di VPS,
- `Firebase Hosting` dipakai sebagai redirect legacy,
- `session-service`, `tenant-school-service`, dan service lain sudah berhasil dijalankan stabil di Docker,
- konektivitas antar-service Docker sudah diperbaiki menggunakan nama service,
- konfigurasi Firebase Admin production di VPS sudah diarahkan ke file JSON secret,
- login production berhasil menembus dashboard.

### 8. Keputusan Strategis Produk (Baru)
Keputusan strategis yang sekarang harus dianggap aktif:

- `V2` akan dipertahankan sebagai platform utama.
- sebelum membangun APK, `web V2` harus disempurnakan lebih dulu.
- `web-admin` menjadi rumah utama untuk `super admin` dan `admin sekolah`.
- APK `V2` nanti tidak dibangun dengan membungkus `web-admin`, melainkan dengan client hybrid/mobile yang khusus untuk `siswa`, `guru`, dan `kepala sekolah`.
- semua pengembangan berikutnya harus dibaca dalam kerangka `web-first before APK`.

### 9. Penyempurnaan Web V2 — Batch 1 (Baru)
Eksekusi backlog web V2 sudah dimulai dari halaman yang paling berisiko menyesatkan data operasional:

- `ServiceStatusPage.tsx` tidak lagi menampilkan status pembayaran palsu berbasis `school.status`.
- halaman sekarang mengambil data nyata dari endpoint `/v1/schools/:schoolId/service-status`.
- filter, kartu statistik, dan badge status sudah diubah agar mengikuti status backend yang benar: `active`, `limited`, `disabled`, atau `perlu review`.
- simpan catatan operasional sekarang mempertahankan `serviceStatus` aktif milik sekolah, bukan memaksa semua catatan menjadi `active`.
- aksi ubah status layanan sekarang menjaga `reasonText`/catatan agar tidak hilang saat status diganti.

### 10. Penyempurnaan Web V2 — Batch 2 (Baru)
Penyempurnaan kemudian dilanjutkan ke halaman `DashboardPage.tsx` sebagai pintu masuk utama web:

- dashboard super admin tidak lagi memakai `mockSummary` untuk menampilkan angka lintas modul.
- ringkasan utama sekarang diturunkan dari data nyata `schools` dan `service-status` yang memang tersedia di backend V2.
- daftar tindak lanjut sekarang menampilkan tenant yang belum punya `service status`, tenant `limited`, dan tenant `disabled`.
- modul yang belum punya endpoint agregat resmi, seperti EduLock global, presensi lintas tenant, sholat, dan Lentera global, sekarang ditampilkan secara jujur sebagai backlog backend, bukan dengan angka semu.
- dashboard admin sekolah juga dirapikan agar menampilkan konteks sesi aktif dan catatan kesiapan modul, bukan event statis palsu.

### 11. Penyempurnaan Web V2 — Batch Final GAS (Baru)
Penutupan backlog web yang masih paling feasible di sesi ini difokuskan ke modul GAS dan sumber data semunya:

- `gas-mock.controller.ts` tidak lagi bergantung pada array in-memory; endpoint GAS sekarang berjalan melalui `GasApplicationService` + `PrismaGasStore`.
- `GasDashboardPage.tsx` tidak lagi memakai angka hardcoded; statistik tenant, sync queue, support open, broadcast, dan audit diambil dari endpoint backend GAS yang aktif.
- `GasBroadcastPage.tsx` sekarang memakai kontrak target broadcast yang konsisten (`ALL` atau `SCHOOL`), mendukung create + delete, dan tidak lagi mengandalkan field `targetAudience` yang ambigu.
- `GasSupportPage.tsx` sekarang mendukung create + update status + delete request, serta langsung tersinkron ke audit feed GAS.
- `GasAuditPage.tsx` sekarang membaca feed audit GAS yang tersimpan di database `tenant-school-service`, bukan label palsu `platform_events`.
- `GasGlobalConfigPage.tsx` sekarang tersimpan ke backend V2 melalui endpoint `gas/global-config`, bukan draft browser lokal.
- `GasTenantsPage.tsx` dan `GasStudentsDashboardPage.tsx` dibersihkan dari placeholder yang menyesatkan; field yang belum didukung backend sekarang ditampilkan secara jujur sebagai belum tersedia.

### 12. Penyempurnaan Backend GAS — Persistensi Prisma (Baru)
Blok penutup yang sebelumnya masih tersisa di backend akhirnya sudah ditutup:

- Prisma schema `tenant-school-service` sekarang memiliki model `GasSyncJob`, `GasBroadcast`, `GasSupportTicket`, `GasAuditEvent`, dan `GasGlobalConfig`.
- backend GAS sekarang memakai `PrismaGasStore` untuk persistence, bukan penyimpanan memori sementara.
- `GasApplicationService` baru menangani orkestrasi domain GAS, termasuk validasi tenant dasar, pembuatan audit event, dan penyimpanan global config.
- seed database `tenant-school-service` sudah diperluas agar tabel GAS baru memiliki baseline data awal.
- `prisma generate`, `prisma db push`, build backend, build frontend, dan seed tenant-school-service sudah berhasil dijalankan.

### 13. Finalisasi Deploy VPS — Seed & Prisma Engine (Baru)
Finalisasi tahap produksi VPS untuk perubahan GAS persisten sudah ditutup:

- seed di container production sudah berjalan menggunakan `node prisma/seed.js`.
- Prisma client engine untuk Alpine sudah kompatibel melalui `binaryTargets` di Prisma schema.
- health check `http://127.0.0.1/api/session/health` di VPS sudah `200 OK`.
- log `tenant-school-service` menunjukkan database sinkron dan service `listening`.

### 14. Finalisasi Login Admin Sekolah Gaya V1 di V2 (Baru)
Penyesuaian penting untuk menyamakan pengalaman operasional V2 dengan V1 sudah selesai:

- login admin sekolah sekarang menerima pola `NPSN / admin123` melalui backend session bootstrap khusus admin sekolah.
- password default awal `admin123` dipersistenkan sebagai baseline hash di data sekolah, bukan lagi sekadar asumsi UI.
- status `wajib ganti password` sekarang dipropagasikan oleh session backend dan dipakai frontend untuk mengunci akses admin sekolah sampai password diganti.
- halaman `Database Induk` (`/super-admin/database`) sudah dirapikan agar menampilkan login admin berbasis `NPSN` dan status `buka/tutup login` dari data backend, bukan lagi email dummy/hardcoded.
- endpoint perubahan password admin sekolah sudah tersedia di backend dan sudah tersambung ke `EdulockAdminPage`.

### 15. Penyempurnaan Database Induk Super Admin — Status Live dan Registry V1 (Baru)
Penyelarasan tampilan dan logika `Database Induk` agar lebih identik dengan V1 sudah dilanjutkan:

- kartu statistik `Tenant Live` sekarang dihitung dari `adminLastLoginAt`, sehingga benar-benar merepresentasikan tenant yang sudah pernah dipakai login.
- tabel `Daftar Sekolah` sekarang menampilkan nama sekolah dan `schoolId` sebagai identitas utama, bukan lagi angka `NPSN` besar yang menyesatkan.
- kolom operasional tenant sekarang menampilkan kombinasi badge `Login Dibuka/Belum Siap` dan `Live/Belum Live`, mengikuti pola V1.
- aksi `Buka/Tutup Tenant` di halaman super admin sekarang sudah aktif dan menyimpan status tenant ke backend V2.
- implementasi tetap sengaja data-driven dari backend; daftar master 42 sekolah tidak di-hardcode di repo karena sumber V1 yang ditemukan berasal dari node Firebase `schools`, bukan file statis di source code.

### 16. Registry Master Sekolah Mojokerto — Seed Final Dari Master List User (Baru)
Langkah lanjutan untuk menutup gap master sekolah default sudah dieksekusi:

- `services/tenant-school-service/prisma/seed.ts` dan `seed.js` sekarang melakukan upsert ke `42` sekolah Mojokerto sesuai master list final yang Anda kirim langsung.
- setiap sekolah hasil seed langsung mendapat `NPSN`, `adminAccessActive = true`, password hash default `admin123`, dan flag `adminMustChangePassword = true`.
- `schoolId` seed sekarang tidak lagi generik (`school_001`, dst.), tetapi sudah mengikuti pola tenant operasional V1 seperti `smpn_1_bangsal`, `smpn_2_puri`, `smpn_3_pacet`, dan `smpn_3_jatirejo`.
- baseline tenant context demo dipindahkan ke entri `SMPN 3 PACET`, sehingga contoh login admin sekolah yang selama ini dibahas tetap selaras dengan data master final.
- seed juga otomatis membuat `serviceStatus` aktif untuk seluruh registry sekolah agar halaman `Database Induk`, `Status Layanan`, dan dashboard super admin langsung memiliki baseline operasional yang konsisten.
- seed menambahkan pembersihan terbatas untuk registry generik lama `school_001` s.d. `school_039`, agar transisi ke `schoolId` final tidak bentrok dengan seed percobaan sebelumnya.

### 17. Integrasi Realtime Database Induk -> Status Layanan Sekolah (Baru)
Perapihan lanjutan agar perubahan master sekolah langsung tercermin di menu `Status Layanan Sekolah` sudah dieksekusi:

- backend `updateSchoolSettings()` sekarang otomatis membuat atau menyinkronkan record `serviceStatus` setelah data sekolah diubah dari `Database Induk`.
- jika tenant ditutup dari `Database Induk`, status layanan otomatis ikut menjadi `disabled` dengan alasan `tenant_closed`.
- jika tenant dibuka kembali, status layanan akan dipulihkan otomatis tanpa perlu seed/manual sync terpisah.
- `ServiceStatusPage.tsx` sekarang memakai query key sekolah yang sama dengan `Database Induk`, sehingga invalidasi cache lintas halaman menjadi konsisten.
- daftar pada `Status Layanan Sekolah` sekarang menampilkan ringkasan profil nyata (`NPSN`, kecamatan, dan status tenant`) dari data sekolah, bukan placeholder generik.

### 18. Verifikasi Dev Lokal Alur Edit Sekolah -> Status Layanan (Baru)
Stack dev lokal sudah dijalankan dan diuji langsung:

- endpoint health lokal terverifikasi aktif untuk `session-service`, `policy-service`, `tenant-school-service`, `academic-directory-service`, dan `web-admin`.
- ditemukan bug lokal bahwa `super_admin` belum memiliki capability policy runtime dan masih terkena tenant scope lintas sekolah; bug ini sudah diperbaiki pada package capability catalog dan policy service.
- setelah perbaikan policy dan restart service lokal, uji end-to-end berhasil untuk skenario edit sekolah di `Database Induk` lalu baca ulang `service-status`.
- hasil uji nyata:
  - edit profil sekolah tidak merusak `serviceStatus` aktif,
  - menutup tenant dari `Database Induk` mengubah `serviceStatus` menjadi `disabled` dengan `reasonCode = tenant_closed`,
  - membuka kembali tenant mengembalikan `serviceStatus` ke `active` dengan `reasonCode = tenant_opened`.
- data sekolah yang dipakai untuk uji sudah direstore kembali ke kondisi semula setelah verifikasi selesai.

### 19. Paket Deploy VPS Untuk Batch Ini (Baru)
Persiapan deploy VPS untuk batch perubahan terbaru sudah dirapikan:

- `05_SOP_DEPLOY_FINAL.md` sekarang memiliki section khusus untuk deploy gabungan `policy-service`, `tenant-school-service`, `session-service`, dan `web-admin`.
- section deploy baru menegaskan bahwa rebuild `policy-service` wajib dilakukan karena fix capability `super_admin` hidup di runtime policy, bukan sekadar di frontend.
- SOP juga sekarang mencantumkan artefak lokal yang harus dikecualikan dari commit/push, terutama database lokal `.data`, folder debug/deploy sementara, `*.tsbuildinfo`, dan binary Prisma hasil generate lokal.

---

## Keputusan Strategis Terbaru

### 1. Posisi Web V2
`web-admin` bukan sekadar POC visual. Mulai sekarang ia diperlakukan sebagai:

- rumah utama `V2`,
- control plane utama,
- tempat finalisasi role, tenant, capability, dan source of truth,
- titik acuan sebelum mobile/hybrid dibangun.

### 2. Strategi Sebelum APK
Urutan kerja yang disetujui:

1. sempurnakan dulu `web V2`,
2. stabilkan backend dan kontrak API,
3. pastikan role serta `schoolId` konsisten,
4. finalkan modul inti di web,
5. baru masuk ke fase client hybrid / APK.

### 3. Konsekuensi Operasional
Artinya developer **tidak boleh**:

- buru-buru membuat APK dari `web-admin`,
- menambah client mobile sebelum rumah web dan backend siap,
- menandai `V2` sudah setara `V1` hanya karena tampilan web sudah mirip.

Developer **harus**:

- membaca dokumen ini sebelum mengerjakan prioritas baru,
- memperbarui dokumen ini setiap kali ada progres penting,
- menjaga agar arah kerja tetap `web-first`, bukan `APK-first`.

---

## Struktur File Penting (Terbaru)

### Halaman-halaman yang sudah ada di `apps/web-admin/src/pages/`:

| File | Rute | Keterangan |
|---|---|---|
| `LoginPage.tsx` | `/login` | Halaman login |
| `DashboardPage.tsx` | `/admin` | Dashboard induk Super Admin dengan overview tenant/status layanan nyata |
| `SchoolsManagementPage.tsx` | `/super-admin/database` | Database Induk Sekolah (identik V1) |
| `GasDashboardPage.tsx` | `/dashboard/super` | Dashboard GAS Overview dengan statistik endpoint nyata |
| `GasTenantsPage.tsx` | `/dashboard/super/tenants` | Sekolah & Tenant dengan field tenant nyata |
| `GasGlobalConfigPage.tsx` | `/dashboard/super/global-config` | Konfigurasi global persisten backend |
| `GasSyncJobsPage.tsx` | `/dashboard/super/sync-jobs` | Sync Jobs |
| `GasBroadcastPage.tsx` | `/dashboard/super/broadcast` | Broadcast Global dengan create/delete |
| `GasSupportPage.tsx` | `/dashboard/super/support` | Support Tools dengan create/update/delete |
| `GasAuditPage.tsx` | `/dashboard/super/audit` | Audit & Compliance dari feed audit GAS persisten |
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

> **PENTING 1:** Jangan perlakukan kemiripan UI dengan V1 sebagai tanda bahwa produk V2 sudah selesai. Yang sedang dibangun sekarang adalah rumah utama V2 dari sisi web.
>
> **PENTING 2:** Setiap progres coding penting wajib diikuti update pada dokumen ini. Jika fitur, prioritas, arsitektur, atau status deployment berubah tetapi file ini tidak ikut diperbarui, maka progres dianggap belum terdokumentasi dengan benar.
>
> **PENTING 3:** Arah kerja aktif sekarang adalah **sempurnakan web V2 terlebih dahulu sebelum fase APK/hybrid**.

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

### Prioritas 0: Persiapan Porting APK (Selektif dari V1)
Setelah pondasi web dan backend stabil, fase berikutnya adalah porting selektif APK yang relevan dari V1, dengan prinsip adaptasi ke kontrak V2 (tenant-aware, role-aware, aman).

Langkah eksekusi yang disarankan:
1. Audit folder `E:\Aplikasi Android\Portal Sekolah\apps` dan petakan modul APK aktif (siswa, guru, kepala).
2. Klasifikasi komponen:
   - reusable langsung
   - reusable dengan adaptasi (disesuaikan ke API V2)
   - referensi saja
   - jangan dibawa
3. Tentukan MVP APK pertama agar jalur end-to-end cepat tervalidasi.
4. Gerbang kesiapan tetap mengacu ke `07_CHECKLIST_PENYEMPURNAAN_WEB_V2_SEBELUM_APK.md`.

### Prioritas Inti Sekarang: Sempurnakan Rumah Web V2
Fokus besar yang harus dijaga sebelum masuk fase APK:

1. sempurnakan `web-admin` sebagai rumah utama `V2`,
2. finalkan kontrak role, capability, membership, dan `schoolId`,
3. sambungkan seluruh halaman penting ke data nyata,
4. pastikan web menjadi pusat rule, konfigurasi, dan source of truth,
5. jadikan backend siap untuk melayani web dan mobile di tahap berikutnya.

### Prioritas 1: Finalkan Web Sebagai Control Plane
Area yang harus disempurnakan:

1. `Dashboard Satu Pintu` sebagai entry point resmi
2. `DATABASE` sebagai source of truth data master
3. `GAS` sebagai shell operasional admin sekolah dan super admin
4. `EduLock` sebagai modul tenant-aware yang stabil
5. `Lentera` sebagai shell admin sekolah yang konsisten
6. `Status Layanan Sekolah`, capability, dan service status sebagai bagian dari kontrol tenant

### Prioritas 2: Sambungkan Data Nyata ke UI Legacy
Saat ini beberapa halaman masih sangat bergantung pada data dummy atau permukaan mock. Langkah berikutnya adalah mengganti dummy data dengan fetch dari API nyata:

1. `GasTenantsPage.tsx` — selesai: registry tenant sekarang hanya menampilkan field yang benar-benar ada di backend
2. `ServiceStatusPage.tsx` — selesai: sudah tersambung ke API tenant status nyata dan tidak lagi memalsukan data pembayaran
3. `DashboardPage.tsx` — selesai: overview super admin sekarang jujur terhadap data backend yang tersedia
4. `GasDashboardPage.tsx` — selesai: statistik overview GAS sekarang memakai endpoint aktif
5. `GasBroadcastPage.tsx` — selesai: create/delete dan kontrak target sudah konsisten
6. `GasSupportPage.tsx` — selesai: create/update/delete request support sudah hidup
7. `GasAuditPage.tsx` — selesai: audit feed GAS sudah konsisten dengan aksi modul
8. `GasGlobalConfigPage.tsx` — selesai: konfigurasi global tersimpan ke backend melalui endpoint `gas/global-config`

### Prioritas 3: Finalkan Kontrak Session, Role, dan Tenant
Sebelum APK dibangun, area ini harus dianggap prioritas tinggi:

1. `session-service` harus stabil untuk login production
2. `tenant-school-service` harus stabil untuk membership, tenant context, dan bootstrap sekolah
3. role utama harus ditegaskan:
   - `super_admin`
   - `admin sekolah`
   - `teacher`
   - `student`
   - `principal`
4. capability tambahan harus jelas, termasuk potensi mode `OSIS`
5. `schoolId` harus konsisten di semua modul

### Prioritas 4: Bentuk Web yang Siap Menjadi Rumah APK
Yang dimaksud bukan membuat APK sekarang, melainkan menyiapkan rumahnya:

1. modul web harus jelas role pemiliknya
2. semua alur bisnis inti harus punya route dan source of truth yang jelas
3. API jangan hanya cocok untuk web admin, tetapi juga harus siap melayani client mobile di fase berikutnya
4. semua modul prioritas V1 harus dipetakan ke status implementasi V2

### Prioritas 5: Dokumentasi dan Disiplin Update
Dokumen yang harus selalu sinkron:

1. `02_PROGRES_HARI_INI_DAN_LANGKAH_BERIKUTNYA.md` -> progres aktif harian
2. `04_PANDUAN_DEPLOYMENT.md` -> prosedur teknis deployment
3. `05_SOP_DEPLOY_FINAL.md` -> SOP deploy ringkas
4. `06_BLUEPRINT_ARSITEKTUR_HYBRID_V2.md` -> arah hybrid/mobile jangka menengah

### Yang Sudah Ditutup
- Authentication nyata untuk login production -> selesai
- Stabilitas deploy produksi dasar -> selesai
- SOP deploy final -> selesai
- Blueprint arsitektur hybrid V2 -> selesai
- Automated test dan observability dasar -> selesai

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
| Stabilitas login production di VPS | ✅ Selesai |
| Aktivasi Firebase Admin production di VPS | ✅ Selesai |
| SOP deploy final | ✅ Selesai |
| Blueprint arsitektur hybrid V2 | ✅ Selesai |
| **Migrasi UI Legacy — Dashboard Utama** | ✅ **Selesai** |
| **Migrasi UI Legacy — Database Induk** | ✅ **Selesai** |
| **Migrasi UI Legacy — GAS Super Admin (semua sub-menu)** | ✅ **Selesai** |
| **Migrasi UI Legacy — EduLock Super Admin** | ✅ **Selesai** |
| **Migrasi UI Legacy — Status Layanan Sekolah** | ✅ **Selesai** |
| **Migrasi UI Legacy — EduLock Admin Sekolah** | ✅ **Selesai** |
| **Migrasi UI Legacy — GAS Admin Sekolah** | ✅ **Selesai** |
| **Migrasi UI Legacy — Lentera Digital** | ✅ **Selesai** |
| Web V2 sebagai rumah utama sebelum APK | ✅ Siap masuk fase porting APK relevan (selektif) |
| Penyempurnaan role, capability, tenant, dan session | ⏳ Prioritas aktif |
| Sambungkan data nyata ke UI GAS | ✅ Selesai untuk backlog yang feasible di sesi ini |
| Sambungkan data EduLock Admin Sekolah & Lentera | ✅ Selesai |
| Authentication nyata | ✅ Selesai |
| Final verifikasi lokal stabil penuh | ✅ Selesai (semua services lolos build & typecheck) |
| Finalisasi deploy VPS (seed + Prisma engine Alpine) | ✅ Selesai (health check + seed sukses) |

---

## Aturan Update Dokumen Ini

Mulai sekarang, setiap progres penting wajib memperbarui dokumen ini, minimal pada salah satu bagian berikut:

1. `Ringkasan Eksekutif` jika arah besar proyek berubah
2. `Yang Sudah Selesai` jika ada milestone ditutup
3. `Yang Perlu Dilanjutkan` jika prioritas bergeser
4. `Status Penutupan Progres Saat Ini` jika status item berubah

Developer tidak boleh:

- menutup sesi kerja besar tanpa memperbarui file ini,
- memindahkan prioritas kerja hanya di percakapan tanpa mencatatnya di sini,
- menganggap dokumen ini opsional.

Kalimat pegangan:

`Jika kode berubah dan arah kerja ikut berubah, maka 02_PROGRES_HARI_INI_DAN_LANGKAH_BERIKUTNYA.md juga harus ikut berubah.`
