# ATURAN KERJA SINGKAT

Dokumen ini adalah ringkasan cepat aturan kerja untuk workspace `D:\Unified-System-V2`.

## Fungsi Dokumen

Gunakan dokumen ini jika hanya perlu membaca inti aturan kerja dalam waktu singkat sebelum mulai melanjutkan pengembangan.

Dokumen pendamping:
- `01_KALIMAT_PEMBUKA_REBUILD_V2.md` untuk konteks pembuka
- `02_PROGRES_HARI_INI_DAN_LANGKAH_BERIKUTNYA.md` untuk progres aktif dan langkah berikutnya

## Aturan Inti

- Workspace utama adalah `D:\Unified-System-V2`
- Referensi sistem lama ada di `E:\Aplikasi Android\Portal Sekolah`
- Sistem lama hanya untuk referensi, tidak boleh disalin mentah ke repo V2
- Blueprint V2 tetap menjadi acuan utama
- Pengembangan harus bertahap, tidak melompat sembarangan
- Selalu lanjut dari progres terakhir yang sudah terdokumentasi
- Utamakan pondasi yang stabil sebelum memperluas permukaan fitur
- Jaga pemisahan domain antar service, jangan mencampur source of truth
- Mutasi sensitif harus tetap mengikuti enforcement capability
- Scope tenant harus selalu dijaga pada controller atau application service

## Posisi Proyek Saat Ini

- Fondasi backend utama sudah terbentuk
- Persistence utama sudah memakai Prisma + SQLite
- Domain akademik minimum POC sudah mencakup `Student`, `Teacher`, `Staff`, `Classroom`, `AcademicPeriod`, dan `Principal`
- Tenant management minimum POC sudah diperluas
- `web-admin` minimum POC sudah tersedia
- Build utama, typecheck frontend, dan test frontend sudah hijau
- Masih perlu stabilisasi verifikasi lokal agar startup beberapa service lebih rapi

## Urutan Baca Yang Disarankan

1. Baca blueprint utama atau perintah mulai rebuild V2
2. Baca `01_KALIMAT_PEMBUKA_REBUILD_V2.md`
3. Baca `02_PROGRES_HARI_INI_DAN_LANGKAH_BERIKUTNYA.md`
4. Gunakan dokumen ini sebagai ringkasan cepat saat mulai bekerja

## Prioritas Kerja Saat Ini

- Stabilkan startup lokal service dan frontend
- Lakukan verifikasi lokal end-to-end dengan urutan yang rapi
- Lanjutkan tahap blueprint berikutnya hanya setelah progres saat ini benar-benar stabil

## Kalimat Ringkas Pegangan

Jika perlu satu kalimat pegangan cepat, gunakan ini:

```text
Lanjutkan Unified-System V2 di `D:\Unified-System-V2` secara bertahap sesuai blueprint, progres terakhir, dan aturan tenant/capability yang sudah menjadi fondasi sistem.
```
