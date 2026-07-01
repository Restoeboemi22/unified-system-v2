import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

type SyncJobStatus = "QUEUED" | "RUNNING" | "DONE" | "FAILED";
type SyncJobType = "master_data" | "attendance" | "users";

type SyncJobRow = {
  id: string;
  type: SyncJobType;
  status: SyncJobStatus;
  schoolId: string;
  note?: string;
  createdAt: number | null;
};

export default function GasSyncJobsPage() {
  const sessionId = useSessionStore((state) => state.session?.sessionId);
  const queryClient = useQueryClient();
  const [busyId, setBusyId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [jobType, setJobType] = useState<SyncJobType>("master_data");
  const [targetSchoolId, setTargetSchoolId] = useState("");
  const [note, setNote] = useState("");
  const [filterSchoolId, setFilterSchoolId] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["gas-sync-jobs"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getGasSyncJobs(sessionId);
    },
    enabled: !!sessionId
  });
  
  const jobs: SyncJobRow[] = data?.jobs || [];

  const filteredJobs = useMemo(() => {
    if (!filterSchoolId.trim()) return jobs;
    return jobs.filter((j) => j.schoolId.toLowerCase().includes(filterSchoolId.toLowerCase()));
  }, [filterSchoolId, jobs]);

  const createMutation = useMutation({
    mutationFn: async (newJob: any) => {
      if (!sessionId) throw new Error("Session not found");
      return api.createGasSyncJob(sessionId, newJob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gas-sync-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["gas-audit-logs"] });
      setNote("");
    },
    onError: (e) => setErrorMsg(String(e))
  });

  const createJob = () => {
    setErrorMsg("");
    const sid = targetSchoolId.toLowerCase().trim();
    createMutation.mutate({
      type: jobType,
      schoolId: sid || "all",
      note: note.trim() || undefined
    });
  };

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!sessionId) throw new Error("Session not found");
      return api.updateGasSyncJobStatus(sessionId, id, status);
    },
    onMutate: (vars) => setBusyId(vars.id),
    onSettled: () => setBusyId(""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gas-sync-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["gas-audit-logs"] });
    },
    onError: (e) => setErrorMsg(String(e))
  });

  const setJobStatus = (id: string, status: SyncJobStatus) => {
    statusMutation.mutate({ id, status });
  };

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Sync Jobs</h1>
              <p className="mt-1 text-sm text-slate-300">
                Panel ini membuat dan memonitor antrian job sinkronisasi. Eksekusi aktual tetap membutuhkan worker/backend terpisah.
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

        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl space-y-4">
          <div>
            <div className="text-sm font-semibold text-slate-100">Trigger Job Queue</div>
            <div className="mt-1 text-sm text-slate-300">Sumber data: <span className="font-semibold text-slate-200">gas/sync_jobs</span></div>
            <div className="mt-1 text-xs text-amber-200">Status di halaman ini adalah status antrian/monitoring, bukan bukti worker sudah berjalan otomatis.</div>
          </div>

          {errorMsg && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{errorMsg}</div>}

          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-400">JOB TYPE</div>
              <select value={jobType} onChange={(e) => setJobType(e.target.value as SyncJobType)} className="mt-2 w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100">
                <option value="master_data">master_data</option>
                <option value="attendance">attendance</option>
                <option value="users">users</option>
              </select>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-400">SCHOOL ID (OPSIONAL)</div>
              <input value={targetSchoolId} onChange={(e) => setTargetSchoolId(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500" placeholder="contoh: smpn_3_pacet" />
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs font-semibold tracking-widest text-slate-400">CATATAN</div>
              <input value={note} onChange={(e) => setNote(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500" placeholder="opsional" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button type="button" onClick={createJob} disabled={createMutation.isPending} className="inline-flex items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 hover:bg-blue-500/20 disabled:opacity-50">
              {createMutation.isPending ? "Memproses..." : "Buat Antrian Job"}
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-slate-100">Daftar Antrian Job</div>
            <input value={filterSchoolId} onChange={(e) => setFilterSchoolId(e.target.value)} className="w-full sm:w-80 rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500" placeholder="Filter schoolId..." />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs font-semibold tracking-widest text-slate-400">
                  <th className="px-3 py-2">CREATED</th>
                  <th className="px-3 py-2">TYPE</th>
                  <th className="px-3 py-2">SCHOOL</th>
                  <th className="px-3 py-2">STATUS</th>
                  <th className="px-3 py-2">NOTE</th>
                  <th className="px-3 py-2 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={6} className="px-3 py-6 text-sm text-slate-300">Loading jobs...</td></tr>
                ) : filteredJobs.length === 0 ? (
                  <tr><td colSpan={6} className="px-3 py-6 text-sm text-slate-300">Belum ada job.</td></tr>
                ) : (
                  filteredJobs.map((j) => {
                    const disabled = busyId === j.id;
                    return (
                      <tr key={j.id} className="bg-slate-950/20 border border-slate-700/40">
                        <td className="px-3 py-3 text-sm text-slate-100">{j.createdAt ? new Date(j.createdAt).toLocaleString("id-ID") : "-"}</td>
                        <td className="px-3 py-3 text-sm font-semibold text-slate-100">{j.type}</td>
                        <td className="px-3 py-3 text-sm text-slate-100">{j.schoolId || "-"}</td>
                        <td className="px-3 py-3 text-sm text-slate-100">
                          <span className={`inline-flex rounded-xl border px-3 py-1 text-xs font-semibold ${
                            j.status === "DONE" ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                            : j.status === "FAILED" ? "border-red-400/30 bg-red-500/10 text-red-100"
                            : j.status === "RUNNING" ? "border-amber-400/30 bg-amber-500/10 text-amber-100"
                            : "border-slate-600/50 bg-slate-800/30 text-slate-100"
                          }`}>{j.status}</span>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-100">{j.note || "-"}</td>
                        <td className="px-3 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button type="button" disabled={disabled} onClick={() => setJobStatus(j.id, "RUNNING")} className={`rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-100 hover:bg-amber-500/15 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>RUNNING</button>
                            <button type="button" disabled={disabled} onClick={() => setJobStatus(j.id, "DONE")} className={`rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/15 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>DONE</button>
                            <button type="button" disabled={disabled} onClick={() => setJobStatus(j.id, "FAILED")} className={`rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100 hover:bg-red-500/15 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}>FAILED</button>
                          </div>
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
