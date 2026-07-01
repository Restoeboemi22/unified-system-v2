import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

export default function GasDashboardPage() {
  const sessionId = useSessionStore((state) => state.session?.sessionId);

  const queryResults = useQueries({
    queries: [
      {
        queryKey: ["gas-dashboard-schools"],
        queryFn: () => {
          if (!sessionId) throw new Error("Session not found");
          return api.getSchools(sessionId);
        },
        enabled: !!sessionId,
      },
      {
        queryKey: ["gas-dashboard-sync-jobs"],
        queryFn: () => {
          if (!sessionId) throw new Error("Session not found");
          return api.getGasSyncJobs(sessionId);
        },
        enabled: !!sessionId,
      },
      {
        queryKey: ["gas-dashboard-support-tickets"],
        queryFn: () => {
          if (!sessionId) throw new Error("Session not found");
          return api.getGasSupportTickets(sessionId);
        },
        enabled: !!sessionId,
      },
      {
        queryKey: ["gas-dashboard-broadcasts"],
        queryFn: () => {
          if (!sessionId) throw new Error("Session not found");
          return api.getGasBroadcasts(sessionId);
        },
        enabled: !!sessionId,
      },
      {
        queryKey: ["gas-dashboard-audit-logs"],
        queryFn: () => {
          if (!sessionId) throw new Error("Session not found");
          return api.getGasAuditLogs(sessionId);
        },
        enabled: !!sessionId,
      },
    ]
  });

  const schoolsData = queryResults[0].data;
  const syncJobsData = queryResults[1].data;
  const supportData = queryResults[2].data;
  const broadcastsData = queryResults[3].data;
  const auditData = queryResults[4].data;
  const loading = queryResults.some((query) => query.isLoading || query.isFetching);
  const queryError = queryResults.find((query) => query.error)?.error;

  const schools = schoolsData?.schools ?? [];
  const syncJobs = syncJobsData?.jobs ?? [];
  const supportTickets = supportData?.tickets ?? [];
  const broadcasts = broadcastsData?.broadcasts ?? [];
  const auditLogs = auditData?.logs ?? [];

  const tenantsTotal = schools.length;
  const tenantsActive = schools.filter((school: any) => school.status === "active").length;
  const supportOpen = supportTickets.filter((ticket: any) => ticket.status === "OPEN").length;
  const jobsQueued = syncJobs.filter((job: any) => job.status === "QUEUED").length;

  const summaryItems = useMemo(
    () => [
      `${supportOpen} request support masih OPEN`,
      `${jobsQueued} job sync masih QUEUED`,
      `${broadcasts.length} antrian broadcast tercatat`,
    ],
    [broadcasts.length, jobsQueued, supportOpen]
  );

  const recentAuditItems = useMemo(() => {
    return auditLogs
      .slice()
      .sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      .slice(0, 3);
  }, [auditLogs]);

  const items = useMemo(
    () => [
      {
        href: "/dashboard/super/tenants",
        title: "Sekolah & Tenant",
        desc: "Aktif/nonaktif tenant, status integrasi, metadata, kontrol global per sekolah.",
      },
      {
        href: "/dashboard/super/global-config",
        title: "Konfigurasi Global",
        desc: "Kebijakan default GAS lintas tenant (siap untuk versioning/rollout).",
      },
      {
        href: "/dashboard/super/sync-jobs",
        title: "Sync Jobs",
        desc: "Pantau dan jalankan job sinkronisasi (master data/attendance/users).",
      },
      {
        href: "/dashboard/super/broadcast",
        title: "Broadcast Global",
        desc: "Kirim pengumuman lintas sekolah (segmentasi, metrik delivery).",
      },
      {
        href: "/dashboard/super/support",
        title: "Support Tools",
        desc: "Operasional bantuan: reset akses, rerun sync, tools support (butuh audit).",
      },
      {
        href: "/dashboard/super/audit",
        title: "Audit & Compliance",
        desc: "Jejak aksi penting untuk modul GAS (subset audit prefix gas.*).",
      },
    ],
    []
  );

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
          <h1 className="text-2xl font-bold text-slate-100">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-slate-300">
            Control plane lintas sekolah untuk modul GAS (tenant, konfigurasi global, monitoring, broadcast, audit).
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Ringkasan di halaman ini sekarang diturunkan dari endpoint GAS yang aktif pada backend V2, bukan lagi angka hardcoded.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">TENANTS</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{tenantsTotal}</div>
            <div className="mt-1 text-sm text-slate-300">Total sekolah</div>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">AKTIF</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{tenantsActive}</div>
            <div className="mt-1 text-sm text-slate-300">Sekolah aktif</div>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">SYNC QUEUED</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{jobsQueued}</div>
            <div className="mt-1 text-sm text-slate-300">Menunggu</div>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-5 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">SUPPORT OPEN</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{supportOpen}</div>
            <div className="mt-1 text-sm text-slate-300">Request terbuka</div>
          </div>
        </div>

        {queryError ? (
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
            {queryError instanceof Error ? queryError.message : String(queryError)}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-sm font-semibold text-slate-100">Ringkasan Operasional</div>
            {loading ? (
              <div className="mt-3 text-sm text-slate-300">Memuat ringkasan...</div>
            ) : (
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                {summaryItems.map((item) => (
                  <div key={item}>{item}</div>
                ))}
                <div>{auditLogs.length} event audit tersedia untuk ditinjau</div>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-sm font-semibold text-slate-100">Audit Terbaru</div>
            {loading ? (
              <div className="mt-3 text-sm text-slate-300">Memuat audit...</div>
            ) : recentAuditItems.length === 0 ? (
              <div className="mt-3 text-sm text-slate-300">Belum ada event audit.</div>
            ) : (
              <div className="mt-3 space-y-3">
                {recentAuditItems.map((item: any) => (
                  <div key={item.id} className="rounded-2xl border border-slate-700/40 bg-slate-950/20 px-4 py-3">
                    <div className="text-xs text-slate-400">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString("id-ID") : "-"}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-100">{item.action}</div>
                    <div className="mt-1 text-sm text-slate-300">{item.entityId}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.href}
              to={it.href}
              className="block rounded-3xl bg-slate-900/50 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl hover:border-blue-500/40 transition-colors"
            >
              <div className="text-sm font-semibold text-slate-100">{it.title}</div>
              <div className="mt-1 text-sm text-slate-300">{it.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </GasLegacyLayout>
  );
}
