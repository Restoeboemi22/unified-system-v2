import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

type SchoolRow = {
  schoolId: string;
  name: string;
  registryStatus: "active" | "inactive";
  profileSummary: string;
  isActive: boolean;
  createdAt?: number | null;
  updatedAt?: number | null;
};

function normalize(value: unknown): string {
  return String(value || "").trim();
}

function formatTs(ts?: number | null): string {
  if (!ts || typeof ts !== "number") return "-";
  return new Date(ts).toLocaleString("id-ID");
}

export default function GasSuperAdminTenantsPage() {
  const [q, setQ] = useState("");
  const sessionId = useSessionStore((state) => state.session?.sessionId);
  const queryClient = useQueryClient();

  const { data, isLoading: loading, error: queryError } = useQuery({
    queryKey: ["schools"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getSchools(sessionId);
    },
    enabled: !!sessionId
  });

  const rows = useMemo(() => {
    if (!data?.schools) return [];
    return data.schools.map((s) => ({
      schoolId: s.schoolId,
      name: s.name,
      registryStatus: s.status,
      profileSummary: "Profil tambahan sekolah seperti NPSN, kecamatan, dan email admin belum tersedia di kontrak API V2.",
      isActive: s.status === "active",
      createdAt: null,
      updatedAt: null
    }));
  }, [data]);

  const [busyId, setBusyId] = useState<string>("");
  const error = queryError ? String(queryError) : "";

  const stats = useMemo(() => {
    const total = rows.length;
    const active = rows.filter((r) => r.isActive).length;
    return { total, active, inactive: Math.max(0, total - active) };
  }, [rows]);

  const filtered = useMemo(() => {
    const query = normalize(q).toLowerCase();
    if (!query) return rows;
    return rows.filter((r) => {
      const hay = [r.schoolId, r.name, r.registryStatus, r.profileSummary]
        .map((x) => normalize(x).toLowerCase())
        .join(" ");
      return hay.includes(query);
    });
  }, [q, rows]);

  const mutation = useMutation({
    mutationFn: async ({ sid, next }: { sid: string; next: boolean }) => {
      if (!sessionId) throw new Error("Session not found");
      await api.updateSchoolSettings(sessionId, sid, { status: next ? "active" : "inactive" });
      return { sid, next };
    },
    onMutate: ({ sid }) => setBusyId(sid),
    onSettled: () => setBusyId(""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["schools"] })
  });

  const toggleActive = (sid: string, next: boolean) => {
    mutation.mutate({ sid, next });
  };

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Sekolah & Tenant</h1>
              <p className="mt-1 text-sm text-slate-300">
                Kontrol enable/disable GAS per sekolah dan status integrasi lintas tenant.
              </p>
            </div>
            <Link
              to="/dashboard/super"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700/50 bg-slate-900/40 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/60"
            >
              Kembali
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">TENANTS</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{stats.total}</div>
            <div className="mt-1 text-sm text-slate-300">Total sekolah</div>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">AKTIF</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{stats.active}</div>
            <div className="mt-1 text-sm text-slate-300">Sekolah aktif</div>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">NONAKTIF</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{stats.inactive}</div>
            <div className="mt-1 text-sm text-slate-300">Sekolah nonaktif</div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-100">Tenant Registry</div>
              <div className="mt-1 text-sm text-slate-300">
                Sumber data: <span className="font-semibold text-slate-200">schools</span>
              </div>
              <div className="mt-1 text-xs text-amber-200">
                Halaman ini hanya menampilkan field tenant yang benar-benar tersedia dari backend V2. Metadata sekolah tambahan belum dipalsukan lagi.
              </div>
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari schoolId / nama / status registry..."
              className="w-full sm:w-80 rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            />
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="min-w-[920px] w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs font-semibold tracking-widest text-slate-400">
                  <th className="px-3 py-2">SCHOOL ID</th>
                  <th className="px-3 py-2">NAMA</th>
                  <th className="px-3 py-2">REGISTRY</th>
                  <th className="px-3 py-2">PROFIL DATA</th>
                  <th className="px-3 py-2">UPDATED</th>
                  <th className="px-3 py-2 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="px-3 py-6 text-sm text-slate-300">Memuat...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={6} className="px-3 py-6 text-sm text-slate-300">Data tidak ditemukan.</td></tr>
                ) : (
                  filtered.map((r) => {
                    const disabled = busyId === r.schoolId;
                    return (
                      <tr key={r.schoolId} className="bg-slate-950/20 border border-slate-700/40">
                        <td className="px-3 py-3 text-sm font-semibold text-slate-100">{r.schoolId}</td>
                        <td className="px-3 py-3 text-sm text-slate-100">
                          {r.name || "-"}
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-100">
                          <span className={`inline-flex rounded-xl border px-3 py-1 text-xs font-semibold ${
                            r.registryStatus === "active"
                              ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                              : "border-red-400/30 bg-red-500/10 text-red-100"
                          }`}>
                            {r.registryStatus}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-300">{r.profileSummary}</td>
                        <td className="px-3 py-3 text-sm text-slate-100">{formatTs(r.updatedAt || r.createdAt)}</td>
                        <td className="px-3 py-3 text-right">
                          <button
                            type="button"
                            disabled={disabled}
                            onClick={() => toggleActive(r.schoolId, !r.isActive)}
                            className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition border ${
                              r.isActive
                                ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/20"
                                : "border-red-400/30 bg-red-500/15 text-red-100 hover:bg-red-500/20"
                            } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                          >
                            {r.isActive ? "Aktif" : "Nonaktif"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GasLegacyLayout>
  );
}
