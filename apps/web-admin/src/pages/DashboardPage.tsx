import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Database,
  LayoutDashboard,
  Lock,
  LogOut,
  Rocket,
  Wallet,
} from "lucide-react";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";
import { useAuthGuard } from "@/hooks/useAuthGuard";

type SuperAdminOverview = {
  loading: boolean;
  schoolsTotal: number;
  schoolsActive: number;
  schoolsInactive: number;
  serviceActive: number;
  serviceLimited: number;
  serviceDisabled: number;
  serviceUnknown: number;
  capabilitiesTotal: number;
  currentMemberships: number;
  missingServiceStatus: string[];
  limitedSchools: string[];
  disabledSchools: string[];
  recentEvents: Array<{ id: string; at: string; message: string; schoolId: string }>;
};

type SchoolServiceState = "active" | "limited" | "disabled" | "unknown";

function formatRelativeTime(value?: string | null): string {
  if (!value) return "Belum ada";
  const ts = new Date(value);
  if (Number.isNaN(ts.getTime())) return "Belum ada";
  return ts.toLocaleString("id-ID");
}

function summarizeList(items: string[], emptyLabel: string): string {
  if (items.length === 0) return emptyLabel;
  if (items.length <= 3) return items.join(", ");
  return `${items.slice(0, 3).join(", ")} +${items.length - 3} lainnya`;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const session = useAuthGuard();
  const clearAuth = useSessionStore((state) => state.clearAuth);
  const memberships = useSessionStore((state) => state.memberships);
  const capabilities = useSessionStore((state) => state.capabilities);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const role = session?.activeRole;
  const schoolName = session?.activeSchoolId || "Admin Sekolah";
  const isSuperAdmin = role === "super_admin";

  const portalLinks = useMemo(() => {
    return {
      overviewHref: "#overview",
      databaseHref: isSuperAdmin ? "/super-admin/database" : "/admin/students?sub=students",
      gasHref: isSuperAdmin ? "/dashboard/super" : "/dashboard/students",
      edulockHref: isSuperAdmin ? "/edulock/super" : "/edulock/admin",
      serviceStatusHref: "/dashboard/super/service-status",
      lenteraHref: "/admin/lentera",
    };
  }, [isSuperAdmin]);

  const { data: schoolsData, isLoading: schoolsLoading } = useQuery({
    queryKey: ["dashboard-overview-schools"],
    queryFn: () => {
      if (!session?.sessionId) throw new Error("Session not found");
      return api.getSchools(session.sessionId);
    },
    enabled: mounted && !!session?.sessionId && isSuperAdmin,
  });

  const serviceStatusQueries = useQueries({
    queries: isSuperAdmin
      ? (schoolsData?.schools ?? []).map((school) => ({
          queryKey: ["dashboard-overview-service-status", school.schoolId],
          queryFn: () => {
            if (!session?.sessionId) throw new Error("Session not found");
            return api.getServiceStatus(session.sessionId, school.schoolId);
          },
          enabled: mounted && !!session?.sessionId,
        }))
      : [],
  });

  const superAdminOverview = useMemo<SuperAdminOverview>(() => {
    const schools = schoolsData?.schools ?? [];
    const rows = schools.map((school, index) => {
      const serviceStatus = serviceStatusQueries[index]?.data?.serviceStatus;
      const state = (serviceStatus?.serviceStatus ?? "unknown") as SchoolServiceState;
      return {
        schoolId: school.schoolId,
        schoolName: school.name,
        schoolStatus: school.status,
        serviceStatus: state,
        reasonText: serviceStatus?.reasonText ?? "",
        updatedAt: serviceStatus?.updatedAt ?? null,
      };
    });

    const recentEvents = rows
      .filter((row) => row.updatedAt)
      .sort((a, b) => new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime())
      .slice(0, 5)
      .map((row) => ({
        id: `${row.schoolId}-${row.updatedAt}`,
        at: row.updatedAt ?? "",
        message:
          row.reasonText ||
          `Status layanan ${row.schoolName} berada pada mode ${row.serviceStatus}.`,
        schoolId: row.schoolId,
      }));

    return {
      loading:
        schoolsLoading ||
        (rows.length > 0 &&
          serviceStatusQueries.some((query) => query.isLoading || query.isFetching)),
      schoolsTotal: rows.length,
      schoolsActive: rows.filter((row) => row.schoolStatus === "active").length,
      schoolsInactive: rows.filter((row) => row.schoolStatus !== "active").length,
      serviceActive: rows.filter((row) => row.serviceStatus === "active").length,
      serviceLimited: rows.filter((row) => row.serviceStatus === "limited").length,
      serviceDisabled: rows.filter((row) => row.serviceStatus === "disabled").length,
      serviceUnknown: rows.filter((row) => row.serviceStatus === "unknown").length,
      capabilitiesTotal: capabilities.length,
      currentMemberships: memberships.length,
      missingServiceStatus: rows
        .filter((row) => row.serviceStatus === "unknown")
        .map((row) => row.schoolName),
      limitedSchools: rows
        .filter((row) => row.serviceStatus === "limited")
        .map((row) => row.schoolName),
      disabledSchools: rows
        .filter((row) => row.serviceStatus === "disabled")
        .map((row) => row.schoolName),
      recentEvents,
    };
  }, [capabilities.length, memberships.length, schoolsData?.schools, schoolsLoading, serviceStatusQueries]);

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
                    {isSuperAdmin ? "Super Admin" : schoolName}
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

                {isSuperAdmin && (
                  <Link
                    to={portalLinks.serviceStatusHref}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
                  >
                    <Wallet className="h-4 w-4 text-emerald-200" />
                    Status Layanan Sekolah
                    <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                  </Link>
                )}

                {!isSuperAdmin && (
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
                    {isSuperAdmin
                      ? "Pusat monitoring dan kontrol lintas tenant."
                      : "Pintu masuk ke DATABASE, GAS, EduLock, dan Lentera."}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100">
                  {isSuperAdmin
                    ? "SUPER ADMIN"
                    : `ADMIN SEKOLAH: ${String(schoolName).toUpperCase()}`}
                </div>
              </div>
            </div>

            {isSuperAdmin && (
              <section id="overview" className="scroll-mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-slate-400">DASHBOARD OVERVIEW</div>
                    <div className="mt-2 text-sm font-semibold text-white">Ringkasan Tenant & Status Layanan Nyata</div>
                    <div className="mt-1 text-sm text-slate-300">
                      Ringkasan ini hanya menampilkan data yang benar-benar tersedia di backend V2 saat ini. Modul tanpa endpoint agregat tetap ditandai sebagai backlog, bukan diisi angka dummy.
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">
                    {superAdminOverview.loading
                      ? "Memuat data tenant..."
                      : `${superAdminOverview.schoolsActive} tenant aktif dipantau`}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">TENANT & AKSES</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>{superAdminOverview.schoolsTotal} sekolah, {superAdminOverview.schoolsActive} aktif</div>
                      <div>{superAdminOverview.schoolsInactive} tenant ditandai nonaktif dari registry sekolah</div>
                      <div>{superAdminOverview.currentMemberships} membership aktif pada sesi ini, {superAdminOverview.capabilitiesTotal} capability termuat</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">STATUS LAYANAN</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>{superAdminOverview.serviceActive} sekolah berstatus layanan aktif</div>
                      <div>{superAdminOverview.serviceLimited} sekolah sedang terbatas, {superAdminOverview.serviceDisabled} nonaktif</div>
                      <div>{superAdminOverview.serviceUnknown} sekolah belum memiliki data service status lengkap</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">AKADEMIK GLOBAL</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>Agregasi global siswa, guru, staf, dan kepsek belum tersedia pada API super admin.</div>
                      <div>Data akademik saat ini masih tenant-scoped per sekolah aktif.</div>
                      <div>Next step: siapkan endpoint summary lintas tenant untuk control plane.</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">PRESENSI & SHOLAT</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>Presensi harian sudah ada per tanggal, tetapi belum ada summary lintas tenant.</div>
                      <div>Data presensi sholat belum memiliki endpoint agregat resmi di V2.</div>
                      <div>Dashboard ini sengaja tidak menebak angka dari sumber yang belum tersedia.</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">EDULOCK & DISIPLIN</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>Widget EduLock legacy sudah tersedia, tetapi summary perangkat global masih mock backlog.</div>
                      <div>Belum ada endpoint violation/device-session summary untuk dashboard satu pintu.</div>
                      <div>Perlu kontrak agregat sebelum angka ditampilkan di halaman ini.</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">LENTERA</div>
                    <div className="mt-3 space-y-1 text-sm text-slate-200">
                      <div>Modul Lentera sudah ada pada sisi UI admin sekolah.</div>
                      <div>Konfigurasi dan report global Lentera belum memiliki endpoint monitoring super admin.</div>
                      <div>Area ini tetap ditandai backlog sampai kontrak backend tersedia.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">Titik Integrasi Yang Perlu Ditindak</div>
                    <div className="mt-3 space-y-3 text-sm text-slate-200">
                      <div>
                        <span className="font-semibold text-slate-100">Belum ada service status:</span>{" "}
                        {summarizeList(
                          superAdminOverview.missingServiceStatus,
                          "semua tenant sudah memiliki service status"
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100">Layanan terbatas:</span>{" "}
                        {summarizeList(
                          superAdminOverview.limitedSchools,
                          "tidak ada tenant yang sedang terbatas"
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100">Layanan nonaktif:</span>{" "}
                        {summarizeList(
                          superAdminOverview.disabledSchools,
                          "tidak ada tenant yang sedang nonaktif"
                        )}
                      </div>
                      <div className="rounded-lg border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-amber-50">
                        Akun admin sekolah, akun kepala sekolah, presensi global, dan setting Lentera lintas tenant belum bisa disimpulkan jujur dari API V2 saat ini.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold text-white">Aktivitas Platform Terbaru</div>
                    <div className="mt-3 space-y-2">
                      {superAdminOverview.recentEvents.length > 0 ? (
                        superAdminOverview.recentEvents.map((event) => (
                          <div key={event.id} className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2">
                            <div className="text-xs text-slate-400">{formatRelativeTime(event.at)}</div>
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

            {!isSuperAdmin && (
              <section id="overview" className="scroll-mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-slate-400">DASHBOARD OVERVIEW</div>
                    <div className="mt-2 text-sm font-semibold text-white">Konteks Sesi Aktif</div>
                    <div className="mt-1 text-sm text-slate-300">
                      Ringkasan ini menampilkan konteks sekolah aktif, role, dan kesiapan modul yang bisa Anda kelola sekarang.
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">{capabilities.length} capability aktif</div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-100">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">SESI AKTIF</div>
                    <div className="mt-3 space-y-1">
                      <div>Role aktif: {session.activeRole || "-"}</div>
                      <div>Sekolah aktif: {session.activeSchoolId || "-"}</div>
                      <div>Status layanan sesi: {session.serviceStatus || "-"}</div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-100">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">STATUS MODUL</div>
                    <div className="mt-3 space-y-2">
                      <div>DATABASE, GAS, EduLock, dan Lentera sudah bisa diakses dari dashboard ini.</div>
                      <div className="rounded-lg border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-amber-50">
                        Untuk ringkasan realtime lintas modul per sekolah, backend summary masih perlu diperluas.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-100 lg:col-span-2">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-300" />
                      <div>
                        <div className="font-semibold text-white">Catatan Kejujuran Data</div>
                        <div className="mt-1 text-slate-300">
                          Dashboard admin sekolah tidak lagi menampilkan event statis. Ringkasan agregat per modul akan ditambahkan setelah endpoint summary tenant-level tersedia di backend V2.
                        </div>
                      </div>
                    </div>
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
