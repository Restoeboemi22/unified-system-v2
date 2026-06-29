import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Database, LayoutDashboard, Lock, LogOut, Rocket, Wallet } from "lucide-react";
import { useSessionStore } from "@/store/session-store";
import { useAuthGuard } from "@/hooks/useAuthGuard";

type SuperIntegrationSummary = {
  loading: boolean;
  tenantsTotal: number;
  tenantsActive: number;
  adminSchools: number;
  principalsTotal: number;
  activeSessions: number;
  violationsTotal: number;
  attendanceToday: number;
  attendanceSchools: number;
  attendanceLastAt: number | null;
  prayerToday: number;
  prayerSchools: number;
  prayerLastAt: number | null;
  discipline7d: number;
  disciplineSchools: number;
  disciplineLastAt: number | null;
  literacyReportsMonth: number;
  literacyReportsPending: number;
  literacyTasksActive: number;
  lenteraConfigured: number;
  lenteraLastAt: number | null;
  missingAdmin: string[];
  missingPrincipal: string[];
  missingAttendance: string[];
  missingPrayer: string[];
  missingLentera: string[];
  recentEvents: Array<{ id: string; at: number; message: string; schoolId: string }>;
};

const mockSummary: SuperIntegrationSummary = {
  loading: false,
  tenantsTotal: 42,
  tenantsActive: 41,
  adminSchools: 41,
  principalsTotal: 1,
  activeSessions: 0,
  violationsTotal: 7,
  attendanceToday: 0,
  attendanceSchools: 1,
  attendanceLastAt: 1718841148000,
  prayerToday: 0,
  prayerSchools: 0,
  prayerLastAt: null,
  discipline7d: 0,
  disciplineSchools: 0,
  disciplineLastAt: 1707621963000,
  literacyReportsMonth: 0,
  literacyReportsPending: 0,
  literacyTasksActive: 1,
  lenteraConfigured: 0,
  lenteraLastAt: null,
  missingAdmin: [],
  missingPrincipal: ["SMPN 1 DAWARBLANDONG", "SMPN 1 DLANGGU", "SMPN 1 GEDEG", "SMPN 1 GONDANG"],
  missingAttendance: [],
  missingPrayer: [],
  missingLentera: [],
  recentEvents: [
    { id: "1", at: 1719055786000, message: "Reset device kepala sekolah: wahyu_smpn3pacet", schoolId: "global" }
  ],
};

function formatRelativeTime(ts: number | null): string {
  if (!ts) return "Belum ada";
  return new Date(ts).toLocaleString("id-ID");
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const session = useAuthGuard();
  const clearAuth = useSessionStore((state) => state.clearAuth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const role = session?.activeRole;
  const schoolName = session?.activeSchoolId || "Admin Sekolah";

  const portalLinks = useMemo(() => {
    return {
      overviewHref: "#overview",
      databaseHref: role === "super_admin" ? "/super-admin/database" : "/admin/students?sub=students",
      gasHref: role === "super_admin" ? "/dashboard/super" : "/dashboard/students",
      edulockHref: role === "super_admin" ? "/edulock/super" : "/edulock/admin",
      serviceStatusHref: "/dashboard/super/service-status",
      lenteraHref: "/admin/lentera",
    };
  }, [role]);

  if (!mounted || !session) return null;

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(99,102,241,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(34,211,238,0.18),transparent_50%),radial-gradient(800px_circle_at_50%_85%,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
      </div>

      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-80 lg:flex-shrink-0">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <img
                    src="/PortalKita.png"
                    alt="PortalKita"
                    className="h-[38px] w-[38px] object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">Dashboard Satu Pintu</div>
                  <div className="truncate text-xs text-slate-400">
                    {role === "super_admin" ? "Super Admin" : schoolName}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <Link
                  to={portalLinks.overviewHref}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                >
                  <LayoutDashboard className="h-4 w-4 text-indigo-200" />
                  Dashboard Overview
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </Link>

                <div className="mt-3 px-2 text-xs font-semibold tracking-widest text-slate-400">MENU</div>

                <Link
                  to={portalLinks.databaseHref}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                >
                  <Database className="h-4 w-4 text-fuchsia-200" />
                  DATABASE
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  to={portalLinks.gasHref}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                >
                  <Rocket className="h-4 w-4 text-indigo-200" />
                  GAS
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  to={portalLinks.edulockHref}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                >
                  <Lock className="h-4 w-4 text-cyan-200" />
                  EduLock
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </Link>

                {role === "super_admin" && (
                  <Link
                    to={portalLinks.serviceStatusHref}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                  >
                    <Wallet className="h-4 w-4 text-emerald-200" />
                    Status Layanan Sekolah
                    <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                  </Link>
                )}

                {role !== "super_admin" && (
                  <Link
                    to={portalLinks.lenteraHref}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                  >
                    <BookOpen className="h-4 w-4 text-pink-200" />
                    Lentera Digital
                    <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                  </Link>
                )}
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                  onClick={() => {
                    clearAuth();
                    navigate("/login");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-slate-400">PORTAL</div>
                  <h1 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">Dashboard Satu Pintu</h1>
                  <p className="mt-1 text-sm text-slate-300">
                    {role === "super_admin"
                      ? "Pusat monitoring dan kontrol lintas tenant."
                      : "Pintu masuk ke DATABASE, GAS, EduLock, dan Lentera."}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100">
                  {role === "super_admin"
                    ? "SUPER ADMIN"
                    : `ADMIN SEKOLAH: ${String(schoolName).toUpperCase()}`}
                </div>
              </div>
            </div>

            {role === "super_admin" && (
              <section id="overview" className="scroll-mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-slate-400">DASHBOARD OVERVIEW</div>
                    <div className="mt-2 text-sm font-semibold text-white">Ringkasan Integrasi Antar Modul</div>
                    <div className="mt-1 text-sm text-slate-300">
                      Monitoring realtime lintas tenant untuk tenant registry, EduLock, presensi, sholat, kedisiplinan, dan Lentera.
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">
                    {mockSummary.loading ? "Memuat data modul..." : `${mockSummary.tenantsActive} tenant aktif dipantau`}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">TENANT & AKSES</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>{mockSummary.tenantsTotal} sekolah, {mockSummary.tenantsActive} aktif</div>
                      <div>{mockSummary.adminSchools} sekolah punya akun admin yang dibuka dari registry tenant</div>
                      <div>{mockSummary.principalsTotal} sekolah sudah punya akun kepala sekolah</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">EDULOCK</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>{mockSummary.activeSessions} sesi perangkat aktif</div>
                      <div>{mockSummary.violationsTotal} violation log tercatat</div>
                      <div>{mockSummary.recentEvents.length} event platform terbaru siap ditinjau</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">PRESENSI SISWA</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>{mockSummary.attendanceToday} log hari ini</div>
                      <div>{mockSummary.attendanceSchools} sekolah mengirim data</div>
                      <div>Update terakhir: {formatRelativeTime(mockSummary.attendanceLastAt)}</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">PRESENSI SHOLAT</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>{mockSummary.prayerToday} log hari ini</div>
                      <div>{mockSummary.prayerSchools} sekolah mengirim data</div>
                      <div>Update terakhir: {formatRelativeTime(mockSummary.prayerLastAt)}</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">KEDISIPLINAN</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>{mockSummary.discipline7d} record dalam 7 hari</div>
                      <div>{mockSummary.disciplineSchools} sekolah tercakup</div>
                      <div>Update terakhir: {formatRelativeTime(mockSummary.disciplineLastAt)}</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">LENTERA</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>{mockSummary.literacyReportsMonth} laporan literasi bulan ini</div>
                      <div>{mockSummary.literacyReportsPending} laporan masih pending, {mockSummary.literacyTasksActive} task aktif</div>
                      <div>{mockSummary.lenteraConfigured} sekolah sudah punya settings Lentera</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">Titik Integrasi Yang Perlu Ditindak</div>
                    <div className="mt-3 space-y-3 text-sm text-slate-200">
                      <div>
                        <span className="font-semibold text-slate-100">Belum ada admin:</span>{" "}
                        {mockSummary.missingAdmin.length > 0
                          ? mockSummary.missingAdmin.join(", ")
                          : "semua tenant aktif sudah punya konfigurasi akun admin"}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100">Belum ada akun kepsek:</span>{" "}
                        {mockSummary.missingPrincipal.length > 0 ? mockSummary.missingPrincipal.join(", ") : "semua tenant aktif sudah punya akun kepala sekolah"}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100">Belum ada presensi hari ini:</span>{" "}
                        {mockSummary.missingAttendance.length > 0 ? mockSummary.missingAttendance.join(", ") : "semua tenant aktif sudah mengirim presensi"}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100">Belum ada data sholat hari ini:</span>{" "}
                        {mockSummary.missingPrayer.length > 0 ? mockSummary.missingPrayer.join(", ") : "semua tenant aktif sudah mengirim data sholat"}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100">Belum ada settings Lentera:</span>{" "}
                        {mockSummary.missingLentera.length > 0 ? mockSummary.missingLentera.join(", ") : "semua tenant aktif sudah punya settings Lentera"}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">Aktivitas Platform Terbaru</div>
                    <div className="mt-3 space-y-2">
                      {mockSummary.recentEvents.length > 0 ? (
                        mockSummary.recentEvents.map((event) => (
                          <div key={`${event.id}-${event.at}`} className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2">
                            <div className="text-xs text-slate-400">{new Date(event.at).toLocaleString("id-ID")}</div>
                            <div className="mt-1 text-sm text-slate-100">{event.message}</div>
                            <div className="mt-1 text-xs text-slate-500">{event.schoolId || "global"}</div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-8 text-center text-sm text-slate-400">
                          Belum ada event platform terbaru.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {role !== "super_admin" && (
              <section id="overview" className="scroll-mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-slate-400">DASHBOARD OVERVIEW</div>
                    <div className="mt-2 text-sm font-semibold text-white">Aktivitas Sistem (Realtime)</div>
                    <div className="mt-1 text-sm text-slate-300">Update dari Super Admin untuk sekolah Anda.</div>
                  </div>
                  <div className="text-xs text-slate-400">1 event</div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                    <div className="text-xs text-slate-400">{new Date().toLocaleString("id-ID")}</div>
                    <div className="mt-1">Pembaruan sistem Unified V2 selesai diterapkan.</div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
