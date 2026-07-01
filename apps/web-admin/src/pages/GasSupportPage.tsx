import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

type SupportActionType = "clear_cache" | "rerun_sync" | "reset_access";
type SupportStatus = "OPEN" | "DONE" | "CANCELLED";

type SupportRequestRow = {
  id: string;
  type: SupportActionType;
  schoolId: string;
  reason?: string;
  status: SupportStatus;
  createdAt: number | null;
  createdBy?: string;
};

export default function GasSupportPage() {
  const sessionId = useSessionStore((state) => state.session?.sessionId);
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("");
  const [busyId, setBusyId] = useState("");
  const [type, setType] = useState<SupportActionType>("clear_cache");
  const [schoolId, setSchoolId] = useState("");
  const [reason, setReason] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["gas-support-tickets"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getGasSupportTickets(sessionId);
    },
    enabled: !!sessionId
  });

  const { data: schoolsData } = useQuery({
    queryKey: ["gas-support-schools"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getSchools(sessionId);
    },
    enabled: !!sessionId
  });

  const rows: SupportRequestRow[] = useMemo(() => {
    const rawTickets = data?.tickets ?? [];
    return rawTickets.map((item: any) => ({
      id: item.id,
      type: item.type,
      schoolId: item.schoolId,
      reason: item.reason,
      status: item.status,
      createdAt: typeof item.createdAt === "number" ? item.createdAt : null,
      createdBy: item.createdBy,
    }));
  }, [data?.tickets]);

  const stats = useMemo(() => {
    const open = rows.filter((r) => r.status === "OPEN").length;
    return { total: rows.length, open };
  }, [rows]);

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!sessionId) throw new Error("Session not found");
      return api.updateGasSupportTicketStatus(sessionId, id, status);
    },
    onMutate: (vars) => setBusyId(vars.id),
    onSettled: () => setBusyId(""),
    onSuccess: () => {
      setErrorMsg("");
      queryClient.invalidateQueries({ queryKey: ["gas-support-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["gas-audit-logs"] });
    },
    onError: (e) => setErrorMsg(e instanceof Error ? e.message : String(e))
  });

  const createMutation = useMutation({
    mutationFn: async (payload: {
      type: SupportActionType;
      schoolId: string;
      reason?: string;
    }) => {
      if (!sessionId) throw new Error("Session not found");
      return api.createGasSupportTicket(sessionId, payload);
    },
    onSuccess: () => {
      setErrorMsg("");
      setSchoolId("");
      setReason("");
      setType("clear_cache");
      queryClient.invalidateQueries({ queryKey: ["gas-support-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["gas-audit-logs"] });
    },
    onError: (e) => setErrorMsg(e instanceof Error ? e.message : String(e))
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!sessionId) throw new Error("Session not found");
      return api.deleteGasSupportTicket(sessionId, id);
    },
    onMutate: (id) => setBusyId(id),
    onSettled: () => setBusyId(""),
    onSuccess: () => {
      setErrorMsg("");
      queryClient.invalidateQueries({ queryKey: ["gas-support-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["gas-audit-logs"] });
    },
    onError: (e) => setErrorMsg(e instanceof Error ? e.message : String(e))
  });

  const setStatus = (id: string, status: SupportStatus) => {
    statusMutation.mutate({ id, status });
  };

  const createRequest = () => {
    setErrorMsg("");
    if (!schoolId.trim()) {
      setErrorMsg("schoolId wajib diisi.");
      return;
    }
    createMutation.mutate({
      type,
      schoolId: schoolId.trim().toLowerCase(),
      reason: reason.trim() || undefined
    });
  };

  const deleteRequest = (id: string) => {
    setErrorMsg("");
    deleteMutation.mutate(id);
  };

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Support Tools</h1>
              <p className="mt-1 text-sm text-slate-300">Panel ini membuat antrian request support per tenant. Eksekusi tetap membutuhkan proses operator/backend terpisah.</p>
            </div>
            <Link to="/dashboard/super" className="inline-flex items-center justify-center rounded-xl border border-slate-700/50 bg-slate-900/40 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/60">Kembali</Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">REQUESTS</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{stats.total}</div>
            <div className="mt-1 text-sm text-slate-300">Total</div>
          </div>
          <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">OPEN</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{stats.open}</div>
            <div className="mt-1 text-sm text-slate-300">Belum selesai</div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl space-y-4">
          <div>
            <div className="text-sm font-semibold text-slate-100">Support Request Queue</div>
            <div className="mt-1 text-sm text-slate-300">Sumber data: <span className="font-semibold text-slate-200">gas/support_requests</span></div>
            <div className="mt-1 text-xs text-amber-200">`OPEN`, `DONE`, dan `CANCELLED` adalah status antrian/operator. Semua perubahan di halaman ini sekarang tersimpan ke backend GAS dan ikut masuk ke audit feed persisten.</div>
          </div>

          {errorMsg && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{errorMsg}</div>}

          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-400">TIPE</div>
              <select value={type} onChange={(e) => setType(e.target.value as SupportActionType)} className="mt-2 w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100">
                <option value="clear_cache">clear_cache</option>
                <option value="rerun_sync">rerun_sync</option>
                <option value="reset_access">reset_access</option>
              </select>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-400">SCHOOL ID</div>
              <select
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100"
              >
                <option value="">Pilih schoolId</option>
                {(schoolsData?.schools ?? []).map((school) => (
                  <option key={school.schoolId} value={school.schoolId}>
                    {school.schoolId} - {school.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs font-semibold tracking-widest text-slate-400">ALASAN</div>
              <input value={reason} onChange={(e) => setReason(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500" placeholder="opsional" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={createRequest}
              disabled={createMutation.isPending}
              className="inline-flex items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 hover:bg-blue-500/20 disabled:opacity-50"
            >
              {createMutation.isPending ? "Membuat..." : "Buat Antrian"}
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl space-y-4">
          <div className="text-sm font-semibold text-slate-100">Daftar Antrian Support</div>
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-sm text-slate-300">Loading requests...</div>
            ) : rows.length === 0 ? (
              <div className="text-sm text-slate-300">Belum ada request.</div>
            ) : (
              rows.map((r) => {
                const disabled = busyId === r.id;
                return (
                  <div key={r.id} className="rounded-2xl border border-slate-700/40 bg-slate-950/20 px-4 py-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-sm font-semibold text-slate-100">{r.type}</div>
                          <span className={`inline-flex rounded-xl border px-3 py-1 text-xs font-semibold ${
                            r.status === "DONE" ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                            : r.status === "CANCELLED" ? "border-red-400/30 bg-red-500/10 text-red-100"
                            : "border-slate-600/50 bg-slate-800/30 text-slate-100"
                          }`}>{r.status}</span>
                        </div>
                        <div className="mt-1 text-sm text-slate-300">schoolId: {r.schoolId}</div>
                        {r.reason && <div className="mt-1 text-sm text-slate-300">{r.reason}</div>}
                        <div className="mt-2 text-xs text-slate-400">{r.createdAt ? new Date(r.createdAt).toLocaleString("id-ID") : "-"} · {r.createdBy || "-"}</div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button type="button" disabled={disabled} onClick={() => setStatus(r.id, "DONE")} className={`rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/15 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>DONE</button>
                        <button type="button" disabled={disabled} onClick={() => setStatus(r.id, "CANCELLED")} className={`rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100 hover:bg-red-500/15 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>CANCEL</button>
                        <button type="button" disabled={disabled} onClick={() => deleteRequest(r.id)} className={`rounded-xl border border-slate-700/50 bg-slate-950/20 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-950/30 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>HAPUS</button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </GasLegacyLayout>
  );
}
