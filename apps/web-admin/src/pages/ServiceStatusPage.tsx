import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

type SchoolServiceRow = {
  schoolId: string;
  schoolName: string;
  district: string;
  npsn: string;
  paymentStatus: "PAID" | "UNPAID";
  lastPaymentAt: number | null;
  serviceActive: boolean;
  notes: string;
  updatedAt: number | null;
};

function normalize(value: unknown): string {
  return String(value || "").trim();
}

function normalizeSchoolId(value: unknown): string {
  return normalize(value).toLowerCase();
}

function formatTs(ts?: number | null): string {
  if (!ts || typeof ts !== "number") return "-";
  return new Date(ts).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Dummy methods since this is a POC without Firebase
const update = async () => {};
const user = { email: "super@local" };

export default function GasSuperAdminServiceStatusPage() {
  const sessionId = useSessionStore((state) => state.session?.sessionId);
  const queryClient = useQueryClient();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const { data: schoolsData, isLoading: loading } = useQuery({
    queryKey: ["schools-status"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getSchools(sessionId);
    },
    enabled: !!sessionId
  });

  const rows = useMemo(() => {
    if (!schoolsData?.schools) return [];
    return schoolsData.schools.map((s) => ({
      schoolId: s.schoolId,
      schoolName: s.name,
      district: "-",
      npsn: "-",
      paymentStatus: s.status === "active" ? "PAID" : "UNPAID",
      lastPaymentAt: null,
      serviceActive: s.status === "active",
      notes: s.status === "active" ? "Lunas" : "Menunggu konfirmasi",
      updatedAt: null,
    })) as SchoolServiceRow[];
  }, [schoolsData]);

  const [busyKey, setBusyKey] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PAID" | "UNPAID" | "ACTIVE" | "INACTIVE">("ALL");
  const [error, setError] = useState("");
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  // Removed dummy data useEffect

  useEffect(() => {
    setNoteDrafts((prev) => {
      const next: Record<string, string> = {};
      for (const row of rows) {
        next[row.schoolId] = prev[row.schoolId] ?? row.notes;
      }
      return next;
    });
  }, [rows]);

  useEffect(() => {
    const view = normalize(searchParams.get("view")).toLowerCase();
    if (view === "paid") {
      setFilter("PAID");
      return;
    }
    if (view === "unpaid") {
      setFilter("UNPAID");
      return;
    }
    if (view === "active") {
      setFilter("ACTIVE");
      return;
    }
    if (view === "inactive") {
      setFilter("INACTIVE");
      return;
    }
    setFilter("ALL");
  }, [searchParams]);

  const stats = useMemo(() => {
    const total = rows.length;
    const paid = rows.filter((row) => row.paymentStatus === "PAID").length;
    const unpaid = Math.max(0, total - paid);
    const active = rows.filter((row) => row.serviceActive).length;
    return {
      total,
      paid,
      unpaid,
      active,
      inactive: Math.max(0, total - active),
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = normalize(query).toLowerCase();

    return rows.filter((row) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "PAID" && row.paymentStatus === "PAID") ||
        (filter === "UNPAID" && row.paymentStatus === "UNPAID") ||
        (filter === "ACTIVE" && row.serviceActive) ||
        (filter === "INACTIVE" && !row.serviceActive);

      if (!matchesFilter) return false;
      if (!q) return true;

      const haystack = [
        row.schoolId,
        row.schoolName,
        row.district,
        row.npsn,
        row.notes,
        row.paymentStatus === "PAID" ? "sudah membayar" : "belum membayar",
        row.serviceActive ? "aktif" : "nonaktif",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [filter, query, rows]);

  const updatePaymentStatus = (schoolId: string, nextStatus: "PAID" | "UNPAID") => {
    // There is no explicit payment status API in the backend yet. We will just toggle the service status as a mock action, or alert.
    alert("API status pembayaran belum tersedia di backend V2. Gunakan toggle layanan.");
  };

  const mutationNote = useMutation({
    mutationFn: async ({ schoolId, note }: { schoolId: string; note: string }) => {
      if (!sessionId) throw new Error("Session not found");
      return api.patchServiceStatus(sessionId, schoolId, {
        serviceStatus: "active",
        reasonText: note
      });
    },
    onMutate: ({ schoolId }) => setBusyKey(`note_${schoolId}`),
    onSettled: () => setBusyKey(""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["schools-status"] })
  });

  const saveNotes = (schoolId: string) => {
    const draft = noteDrafts[schoolId];
    mutationNote.mutate({ schoolId, note: draft });
  };

  const mutationStatus = useMutation({
    mutationFn: async ({ schoolId, nextActive }: { schoolId: string; nextActive: boolean }) => {
      if (!sessionId) throw new Error("Session not found");
      return api.patchServiceStatus(sessionId, schoolId, {
        serviceStatus: nextActive ? "active" : "disabled"
      });
    },
    onMutate: ({ schoolId }) => setBusyKey(`status_${schoolId}`),
    onSettled: () => setBusyKey(""),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["schools-status"] })
  });

  const toggleServiceStatus = (schoolId: string, schoolName: string, nextActive: boolean) => {
    if (!nextActive) {
      const confirmed = window.confirm(
        `Nonaktifkan layanan untuk ${schoolName || schoolId}?\n\nSekolah akan ditandai nonaktif sampai Anda mengaktifkannya kembali.`
      );
      if (!confirmed) return;
    }
    mutationStatus.mutate({ schoolId, nextActive });
  };

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Status Layanan Sekolah</h1>
              <p className="mt-1 text-sm text-slate-300">
                Monitoring sederhana untuk melihat status pembayaran sekolah dan kontrol aktif/nonaktif layanan.
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

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-xl backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">TOTAL</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{stats.total}</div>
            <div className="mt-1 text-sm text-slate-300">Semua sekolah</div>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-xl backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">SUDAH MEMBAYAR</div>
            <div className="mt-1 text-2xl font-bold text-emerald-300">{stats.paid}</div>
            <div className="mt-1 text-sm text-slate-300">Tercatat membayar</div>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-xl backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">BELUM MEMBAYAR</div>
            <div className="mt-1 text-2xl font-bold text-amber-300">{stats.unpaid}</div>
            <div className="mt-1 text-sm text-slate-300">Perlu tindak lanjut</div>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-xl backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">LAYANAN AKTIF</div>
            <div className="mt-1 text-2xl font-bold text-cyan-300">{stats.active}</div>
            <div className="mt-1 text-sm text-slate-300">Bisa digunakan</div>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-xl backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">LAYANAN NONAKTIF</div>
            <div className="mt-1 text-2xl font-bold text-rose-300">{stats.inactive}</div>
            <div className="mt-1 text-sm text-slate-300">Sedang ditutup</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-100">Monitoring Status Pembayaran & Layanan</div>
              <div className="mt-1 text-sm text-slate-300">
                Sumber data: <span className="font-semibold text-slate-200">schools</span> dengan status layanan tersimpan di dalam data sekolah
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100"
              >
                <option value="ALL">Semua</option>
                <option value="PAID">Sudah Membayar</option>
                <option value="UNPAID">Belum Membayar</option>
                <option value="ACTIVE">Layanan Aktif</option>
                <option value="INACTIVE">Layanan Nonaktif</option>
              </select>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari schoolId / nama sekolah / catatan..."
                className="w-full sm:w-80 rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="min-w-[1120px] w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs font-semibold tracking-widest text-slate-400">
                  <th className="px-3 py-2">SEKOLAH</th>
                  <th className="px-3 py-2">NPSN / KECAMATAN</th>
                  <th className="px-3 py-2">PEMBAYARAN</th>
                  <th className="px-3 py-2">KONFIRMASI TERAKHIR</th>
                  <th className="px-3 py-2">CATATAN</th>
                  <th className="px-3 py-2">LAYANAN</th>
                  <th className="px-3 py-2 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-6 text-sm text-slate-300">
                      Memuat...
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-3 py-6 text-sm text-slate-300">
                      Data tidak ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => {
                    const paymentBusy = busyKey === `\${row.schoolId}:payment`;
                    const serviceBusy = busyKey === `\${row.schoolId}:service`;
                    const notesBusy = busyKey === `\${row.schoolId}:notes`;
                    const noteValue = noteDrafts[row.schoolId] ?? row.notes;
                    const noteChanged = normalize(noteValue) !== row.notes;

                    return (
                      <tr key={row.schoolId} className="border border-slate-700/40 bg-slate-950/20">
                        <td className="px-3 py-3 text-sm text-slate-100">
                          <div className="font-semibold text-slate-100">{row.schoolName || "-"}</div>
                          <div className="mt-1 text-xs text-slate-400">{row.schoolId}</div>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-100">
                          <div>{row.npsn || "-"}</div>
                          <div className="mt-1 text-xs text-slate-400">{row.district || "-"}</div>
                        </td>
                        <td className="px-3 py-3 text-sm">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold \${
                              row.paymentStatus === "PAID"
                                ? "bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/25"
                                : "bg-amber-500/15 text-amber-100 ring-1 ring-amber-400/25"
                            }`}
                          >
                            {row.paymentStatus === "PAID" ? "Sudah Membayar" : "Belum Membayar"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-100">{formatTs(row.lastPaymentAt)}</td>
                        <td className="px-3 py-3 text-sm text-slate-300">
                          <div className="space-y-2">
                            <input
                              value={noteValue}
                              onChange={(e) =>
                                setNoteDrafts((prev) => ({
                                  ...prev,
                                  [row.schoolId]: e.target.value,
                                }))
                              }
                              placeholder="Catatan singkat..."
                              className="w-full rounded-xl border border-slate-700/50 bg-slate-950/30 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500"
                            />
                            <button
                              type="button"
                              disabled={notesBusy || !noteChanged}
                              onClick={() => saveNotes(row.schoolId)}
                              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition \${
                                noteChanged
                                  ? "border-slate-500/40 bg-slate-800/80 text-slate-100 hover:bg-slate-700/80"
                                  : "border-slate-800/60 bg-slate-900/40 text-slate-500"
                              } \${notesBusy ? "cursor-not-allowed opacity-60" : ""}`}
                            >
                              Simpan Catatan
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-sm">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold \${
                              row.serviceActive
                                ? "bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-400/25"
                                : "bg-rose-500/15 text-rose-100 ring-1 ring-rose-400/25"
                            }`}
                          >
                            {row.serviceActive ? "Aktif" : "Nonaktif"}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <button
                              type="button"
                              disabled={paymentBusy}
                              onClick={() =>
                                updatePaymentStatus(row.schoolId, row.paymentStatus === "PAID" ? "UNPAID" : "PAID")
                              }
                              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition \${
                                row.paymentStatus === "PAID"
                                  ? "border-amber-400/30 bg-amber-500/15 text-amber-100 hover:bg-amber-500/20"
                                  : "border-emerald-400/30 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/20"
                              } \${paymentBusy ? "cursor-not-allowed opacity-60" : ""}`}
                            >
                              {row.paymentStatus === "PAID" ? "Tandai Belum Membayar" : "Tandai Sudah Membayar"}
                            </button>
  
                            <button
                              type="button"
                              disabled={serviceBusy}
                              onClick={() => toggleServiceStatus(row.schoolId, row.schoolName, !row.serviceActive)}
                              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition \${
                                row.serviceActive
                                  ? "border-red-500/40 bg-red-600/20 text-red-100 hover:bg-red-600/30"
                                  : "border-emerald-500/40 bg-emerald-600/20 text-emerald-100 hover:bg-emerald-600/30"
                              } \${serviceBusy ? "cursor-not-allowed opacity-60" : ""}`}
                            >
                              {row.serviceActive ? "Nonaktifkan" : "Aktifkan"}
                            </button>
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
