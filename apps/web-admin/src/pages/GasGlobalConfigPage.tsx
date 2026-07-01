import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

const DEFAULT_CONFIG = {
  school_year: "2025/2026",
  attendance_start_hour: 6,
  attendance_end_hour: 9,
  late_threshold_minutes: 15,
  features: {
    presensi_sholat: true,
    virtual_pet: false,
    halo_spentgapa: true,
  },
};

export default function GasGlobalConfigPage() {
  const sessionId = useSessionStore((state) => state.session?.sessionId);
  const queryClient = useQueryClient();
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(DEFAULT_CONFIG, null, 2));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const dirtyRef = useRef(false);

  const pathLabel = "gas/global_config";

  const { data, isLoading } = useQuery({
    queryKey: ["gas-global-config"],
    queryFn: async () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getGasGlobalConfig(sessionId);
    },
    enabled: !!sessionId,
  });

  useEffect(() => {
    if (dirtyRef.current) return;
    const config = data?.config ?? DEFAULT_CONFIG;
    setJsonText(JSON.stringify(config, null, 2));
  }, [data?.config]);

  const saveMutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      if (!sessionId) throw new Error("Session not found");
      return api.saveGasGlobalConfig(sessionId, payload);
    },
    onSuccess: () => {
      dirtyRef.current = false;
      setStatus("Konfigurasi global berhasil disimpan ke backend V2.");
      setError("");
      queryClient.invalidateQueries({ queryKey: ["gas-global-config"] });
      setTimeout(() => setStatus(""), 2000);
    },
    onError: (mutationError) => {
      setError(mutationError instanceof Error ? mutationError.message : "Gagal menyimpan konfigurasi.");
    },
  });

  const save = async () => {
    setBusy(true);
    setError("");
    setStatus("");
    try {
      let parsed: any;
      try {
        parsed = JSON.parse(jsonText || "{}");
      } catch (e: any) {
        throw new Error(`JSON tidak valid: ${String(e?.message || e)}`);
      }
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Konfigurasi harus berupa object JSON (bukan array / nilai tunggal).");
      }
      await saveMutation.mutateAsync(parsed as Record<string, unknown>);
    } catch (e: any) {
      setError(String(e?.message || e || "Gagal menyimpan konfigurasi."));
    } finally {
      setBusy(false);
    }
  };

  const resetToDefault = () => {
    setError("");
    setStatus("");
    dirtyRef.current = true;
    setJsonText(JSON.stringify(DEFAULT_CONFIG, null, 2));
  };

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Konfigurasi Global</h1>
              <p className="mt-1 text-sm text-slate-300">
                Editor konfigurasi operasional GAS lintas tenant yang tersimpan di backend `tenant-school-service`.
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
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-100">Global Config</div>
              <div className="mt-1 text-sm text-slate-300">
                Target kontrak: <span className="font-semibold text-slate-200">{pathLabel}</span>
              </div>
              <div className="mt-1 text-xs text-amber-200">
                Konfigurasi yang valid akan disimpan ke backend V2 dan ikut muncul kembali saat halaman ini dibuka ulang.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={resetToDefault}
                className={`inline-flex items-center justify-center rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-950/40 transition ${
                  busy ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                Reset Draft
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={save}
                className={`inline-flex items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100 hover:bg-blue-500/20 transition ${
                  busy ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {busy ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">{error}</div>
          ) : null}
          {status ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">{status}</div>
          ) : null}

          {isLoading ? (
            <div className="rounded-2xl border border-slate-700/40 bg-slate-950/20 p-4 text-sm text-slate-300">
              Memuat konfigurasi global...
            </div>
          ) : null}

          <textarea
            value={jsonText}
            onChange={(e) => {
              dirtyRef.current = true;
              setJsonText(e.target.value);
            }}
            spellCheck={false}
            className="min-h-[420px] w-full rounded-2xl border border-slate-700/50 bg-slate-950/30 p-4 font-mono text-xs text-slate-100 placeholder:text-slate-500"
            placeholder="{}"
          />
        </div>
      </div>
    </GasLegacyLayout>
  );
}
