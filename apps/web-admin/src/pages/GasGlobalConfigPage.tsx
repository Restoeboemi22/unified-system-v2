import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";

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
  const [jsonText, setJsonText] = useState<string>(JSON.stringify(DEFAULT_CONFIG, null, 2));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const dirtyRef = useRef(false);

  const pathLabel = "gas/global_config";

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
      await new Promise((res) => setTimeout(res, 500));
      dirtyRef.current = false;
      setStatus("Tersimpan.");
      setTimeout(() => setStatus(""), 2000);
    } catch (e: any) {
      setError(String(e?.message || e || "Gagal menyimpan konfigurasi."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl bg-slate-900/60 p-6 shadow-xl border border-slate-700/50 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Konfigurasi Global</h1>
              <p className="mt-1 text-sm text-slate-300">
                Konfigurasi default operasional GAS lintas tenant (siap untuk versioning/rollout).
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
              <div className="text-sm font-semibold text-slate-100">Realtime Global Config</div>
              <div className="mt-1 text-sm text-slate-300">
                Sumber data: <span className="font-semibold text-slate-200">{pathLabel}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
