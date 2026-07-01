import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

type BroadcastTarget = { mode: "ALL" } | { mode: "SCHOOL"; schoolId: string };
type BroadcastRow = {
  id: string;
  title: string;
  message: string;
  target: BroadcastTarget;
  createdAt: number | null;
  createdBy?: string;
};

export default function GasBroadcastPage() {
  const sessionId = useSessionStore((state) => state.session?.sessionId);
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("");
  const [busyId, setBusyId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetMode, setTargetMode] = useState<"ALL" | "SCHOOL">("ALL");
  const [targetSchoolId, setTargetSchoolId] = useState("");

  const previewTarget = useMemo(() => {
    if (targetMode === "ALL") return "ALL tenants";
    const sid = targetSchoolId.trim();
    return sid ? `SCHOOL: ${sid}` : "SCHOOL: -";
  }, [targetMode, targetSchoolId]);

  const { data, isLoading } = useQuery({
    queryKey: ["gas-broadcasts"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getGasBroadcasts(sessionId);
    },
    enabled: !!sessionId
  });

  const { data: schoolsData } = useQuery({
    queryKey: ["gas-broadcast-schools"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getSchools(sessionId);
    },
    enabled: !!sessionId
  });

  const rows: BroadcastRow[] = useMemo(() => {
    const rawItems = data?.broadcasts ?? [];
    return rawItems.map((item: any) => ({
      id: item.id,
      title: item.title,
      message: item.message,
      target:
        item.target?.mode === "SCHOOL" && item.target?.schoolId
          ? { mode: "SCHOOL", schoolId: String(item.target.schoolId) }
          : { mode: "ALL" },
      createdAt: typeof item.createdAt === "number" ? item.createdAt : null,
      createdBy: item.createdBy,
    }));
  }, [data?.broadcasts]);

  const createMutation = useMutation({
    mutationFn: async (newBc: any) => {
      if (!sessionId) throw new Error("Session not found");
      return api.createGasBroadcast(sessionId, newBc);
    },
    onSuccess: () => {
      setErrorMsg("");
      queryClient.invalidateQueries({ queryKey: ["gas-broadcasts"] });
      queryClient.invalidateQueries({ queryKey: ["gas-audit-logs"] });
      setTitle(""); setMessage(""); setTargetSchoolId(""); setTargetMode("ALL");
    },
    onError: (e) => setErrorMsg(e instanceof Error ? e.message : String(e))
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!sessionId) throw new Error("Session not found");
      return api.deleteGasBroadcast(sessionId, id);
    },
    onMutate: (id) => setBusyId(id),
    onSettled: () => setBusyId(""),
    onSuccess: () => {
      setErrorMsg("");
      queryClient.invalidateQueries({ queryKey: ["gas-broadcasts"] });
      queryClient.invalidateQueries({ queryKey: ["gas-audit-logs"] });
    },
    onError: (e) => setErrorMsg(e instanceof Error ? e.message : String(e))
  });

  const createBroadcast = () => {
    setErrorMsg("");
    if (!title.trim() || !message.trim()) { setErrorMsg("Judul dan pesan wajib diisi."); return; }
    if (targetMode === "SCHOOL" && !targetSchoolId.trim()) { setErrorMsg("schoolId wajib diisi untuk target SCHOOL."); return; }

    const target: BroadcastTarget = targetMode === "SCHOOL"
      ? { mode: "SCHOOL", schoolId: targetSchoolId.toLowerCase().trim() }
      : { mode: "ALL" };

    createMutation.mutate({
      title: title.trim(),
      message: message.trim(),
      target
    });
  };

  const deleteBroadcast = (id: string) => {
    setErrorMsg("");
    deleteMutation.mutate(id);
  };

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Broadcast Global</h1>
              <p className="mt-1 text-sm text-slate-300">
                Panel ini menulis antrian broadcast lintas sekolah. Delivery aktual tetap bergantung pada worker/channel notifikasi yang terpisah.
              </p>
            </div>
            <Link to="/dashboard/super" className="inline-flex items-center justify-center rounded-xl border border-slate-700/50 bg-slate-900/40 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-900/60">Kembali</Link>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-100">Buat Antrian Broadcast</div>
              <div className="mt-1 text-sm text-slate-300">Sumber data: <span className="font-semibold text-slate-200">gas/broadcasts</span></div>
              <div className="mt-1 text-xs text-slate-400">Target: {previewTarget}</div>
              <div className="mt-1 text-xs text-amber-200">Record yang dibuat di sini sekarang tersimpan di backend GAS V2 dan ikut tercatat ke audit feed, tetapi delivery notifikasi ke tenant tetap bergantung pada worker/channel terpisah.</div>
            </div>
          </div>

          {errorMsg && <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{errorMsg}</div>}

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-400">JUDUL</div>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500" placeholder="Contoh: Maintenance" />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-400">TARGET</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <select value={targetMode} onChange={(e) => setTargetMode(e.target.value as "ALL" | "SCHOOL")} className="w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100">
                  <option value="ALL">ALL</option>
                  <option value="SCHOOL">SCHOOL</option>
                </select>
                <select
                  value={targetSchoolId}
                  onChange={(e) => setTargetSchoolId(e.target.value)}
                  disabled={targetMode !== "SCHOOL"}
                  className={`w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 ${targetMode !== "SCHOOL" ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <option value="">Pilih schoolId</option>
                  {(schoolsData?.schools ?? []).map((school) => (
                    <option key={school.schoolId} value={school.schoolId}>
                      {school.schoolId} - {school.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-widest text-slate-400">PESAN</div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 min-h-[120px] w-full rounded-2xl border border-slate-700/50 bg-slate-950/30 p-4 text-sm text-slate-100 placeholder:text-slate-500" placeholder="Tulis pengumuman..." />
          </div>
          <div className="flex items-center justify-end">
            <button type="button" onClick={createBroadcast} disabled={createMutation.isPending} className="inline-flex items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 hover:bg-blue-500/20 disabled:opacity-50">{createMutation.isPending ? "Menyimpan..." : "Buat Antrian"}</button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl space-y-4">
          <div className="text-sm font-semibold text-slate-100">Riwayat Antrian Broadcast</div>
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-sm text-slate-300">Loading broadcasts...</div>
            ) : rows.length === 0 ? (
              <div className="text-sm text-slate-300">Belum ada broadcast.</div>
            ) : (
              rows.map((b) => (
                <div key={b.id} className="rounded-2xl border border-slate-700/40 bg-slate-950/20 px-4 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-100">{b.title || "-"}</div>
                      <div className="mt-1 text-sm text-slate-300 whitespace-pre-wrap">{b.message || "-"}</div>
                      <div className="mt-2 text-xs text-slate-400">
                        Target: {b.target.mode === "ALL" ? "ALL" : `SCHOOL: ${b.target.schoolId || "-"}`} ·{" "}
                        {b.createdAt ? new Date(b.createdAt).toLocaleString("id-ID") : "-"} · {b.createdBy || "-"}
                      </div>
                    </div>
                    <button type="button" disabled={busyId === b.id} onClick={() => deleteBroadcast(b.id)}
                      className={`rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100 hover:bg-red-500/15 ${busyId === b.id ? "opacity-60 cursor-not-allowed" : ""}`}>
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </GasLegacyLayout>
  );
}
