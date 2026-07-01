import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

type AuditRow = { id: string; action: string; entity: string; entityId: string; performedBy: string; details: string; createdAt: number | null; };

export default function GasAuditPage() {
  const sessionId = useSessionStore((state) => state.session?.sessionId);
  const [q, setQ] = useState("");
  const [onlyGas, setOnlyGas] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["gas-audit-logs"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getGasAuditLogs(sessionId);
    },
    enabled: !!sessionId
  });
  
  const rawLogs: AuditRow[] = data?.logs || [];

  const filtered = useMemo(() => {
    const queryText = q.toLowerCase().trim();
    const base = onlyGas ? rawLogs.filter((r) => r.action.toLowerCase().startsWith("gas.")) : rawLogs;
    if (!queryText) return base;
    return base.filter((r) => [r.action, r.entity, r.entityId, r.performedBy, r.details].join(" ").toLowerCase().includes(queryText));
  }, [onlyGas, q, rawLogs]);

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Audit & Compliance</h1>
              <p className="mt-1 text-sm text-slate-300">Jejak aksi penting dan perubahan konfigurasi modul GAS lintas tenant.</p>
            </div>
            <Link to="/dashboard/super" className="inline-flex items-center justify-center rounded-xl border border-slate-700/50 bg-slate-900/40 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/60">Kembali</Link>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-100">Audit Feed (Realtime)</div>
              <div className="mt-1 text-sm text-slate-300">Sumber data: <span className="font-semibold text-slate-200">gas/audit-logs</span> (feed operasional persisten dari backend GAS)</div>
            </div>
            <div className="text-xs text-slate-400">Terekam dari create/update/delete support, broadcast, sync jobs, dan global config</div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full sm:w-96 rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Cari type / message / schoolId / actor..."
            />
            <button
              type="button"
              onClick={() => setOnlyGas((v) => !v)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                onlyGas
                  ? "border-blue-500/40 bg-blue-500/15 text-blue-100 hover:bg-blue-500/20"
                  : "border-slate-700/50 bg-slate-950/20 text-slate-100 hover:bg-slate-950/30"
              }`}
            >
              {onlyGas ? "Filter: gas.*" : "Filter: semua"}
            </button>
            <div className="text-xs text-slate-400">Tampil: <span className="font-semibold text-slate-200">{filtered.length}</span></div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-50">
            Feed ini sekarang disimpan di database `tenant-school-service`, tetapi cakupannya masih khusus aksi modul GAS dan belum menjadi event bus lintas service produksi.
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs font-semibold tracking-widest text-slate-400">
                  <th className="px-3 py-2">WAKTU</th>
                  <th className="px-3 py-2">TYPE</th>
                  <th className="px-3 py-2">SCHOOL</th>
                  <th className="px-3 py-2">AKTOR</th>
                  <th className="px-3 py-2">PESAN</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="px-3 py-6 text-sm text-slate-300">Loading audit logs...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className="px-3 py-6 text-sm text-slate-300">Belum ada audit event.</td></tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="bg-slate-950/20 border border-slate-700/40">
                      <td className="px-3 py-3 text-sm text-slate-100">{r.createdAt ? new Date(r.createdAt).toLocaleString("id-ID") : "-"}</td>
                      <td className="px-3 py-3 text-sm font-semibold text-slate-100">{r.action || "-"}</td>
                      <td className="px-3 py-3 text-sm text-slate-100">{r.entityId || "-"}</td>
                      <td className="px-3 py-3 text-sm text-slate-100">{r.performedBy || "-"}</td>
                      <td className="px-3 py-3 text-sm text-slate-100">{r.details || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </GasLegacyLayout>
  );
}
