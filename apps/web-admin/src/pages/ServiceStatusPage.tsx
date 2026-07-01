import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSessionStore } from "@/store/session-store";

type SchoolServiceRow = {
  schoolId: string;
  schoolName: string;
  district: string;
  npsn: string;
  schoolRegistryStatus: "active" | "inactive";
  serviceStatus: "active" | "limited" | "disabled" | "unknown";
  reasonCode: string;
  notes: string;
  updatedAt: string | null;
  profileSummary: string;
  statusError: string;
};

type ServiceFilter = "ALL" | "ACTIVE" | "LIMITED" | "DISABLED" | "UNKNOWN";

function normalize(value: unknown): string {
  return String(value || "").trim();
}

function formatDate(value?: string | null): string {
  if (!value) return "-";
  const ts = new Date(value);
  if (Number.isNaN(ts.getTime())) return "-";
  return ts.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusLabel(status: SchoolServiceRow["serviceStatus"]): string {
  switch (status) {
    case "active":
      return "Aktif";
    case "limited":
      return "Terbatas";
    case "disabled":
      return "Nonaktif";
    default:
      return "Perlu Review";
  }
}

function getStatusBadgeClass(status: SchoolServiceRow["serviceStatus"]): string {
  switch (status) {
    case "active":
      return "bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-400/25";
    case "limited":
      return "bg-amber-500/15 text-amber-100 ring-1 ring-amber-400/25";
    case "disabled":
      return "bg-rose-500/15 text-rose-100 ring-1 ring-rose-400/25";
    default:
      return "bg-slate-500/15 text-slate-100 ring-1 ring-slate-400/25";
  }
}

function getDefaultReasonCode(status: Exclude<SchoolServiceRow["serviceStatus"], "unknown">): string {
  switch (status) {
    case "active":
      return "manual_activate";
    case "limited":
      return "manual_limit";
    case "disabled":
      return "manual_disable";
  }
}

export default function GasSuperAdminServiceStatusPage() {
  const sessionId = useSessionStore((state) => state.session?.sessionId);
  const queryClient = useQueryClient();
  const location = useLocation();

  const { data: schoolsData, isLoading: schoolsLoading } = useQuery({
    queryKey: ["schools"],
    queryFn: () => {
      if (!sessionId) throw new Error("Session not found");
      return api.getSchools(sessionId);
    },
    enabled: !!sessionId
  });

  const serviceStatusQueries = useQueries({
    queries: (schoolsData?.schools ?? []).map((school) => ({
      queryKey: ["school-service-status", school.schoolId],
      queryFn: () => {
        if (!sessionId) throw new Error("Session not found");
        return api.getServiceStatus(sessionId, school.schoolId);
      },
      enabled: !!sessionId
    }))
  });

  const rows = useMemo(() => {
    if (!schoolsData?.schools) return [];

    return schoolsData.schools.map((school, index) => {
      const serviceStatusQuery = serviceStatusQueries[index];
      const statusPayload = serviceStatusQuery?.data?.serviceStatus;
      const statusError =
        serviceStatusQuery?.error instanceof Error ? serviceStatusQuery.error.message : "";

      return {
        schoolId: school.schoolId,
        schoolName: school.name,
        district: normalize(school.district),
        npsn: normalize(school.npsn),
        schoolRegistryStatus: school.status,
        serviceStatus: statusPayload?.serviceStatus ?? "unknown",
        reasonCode: statusPayload?.reasonCode ?? "",
        notes:
          statusPayload?.reasonText ??
          (statusPayload ? "" : "Service status belum tersedia di backend untuk sekolah ini."),
        updatedAt: statusPayload?.updatedAt ?? null,
        profileSummary: [
          normalize(school.npsn) ? `NPSN ${normalize(school.npsn)}` : "",
          normalize(school.district) ? `Kec. ${normalize(school.district)}` : "",
          school.status === "active" ? "Tenant Dibuka" : "Tenant Ditutup",
        ]
          .filter(Boolean)
          .join(" • "),
        statusError,
      } satisfies SchoolServiceRow;
    });
  }, [schoolsData, serviceStatusQueries]);

  const loading =
    schoolsLoading ||
    (rows.length > 0 &&
      serviceStatusQueries.some((query) => query.isLoading || query.isFetching));

  const [busyKey, setBusyKey] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ServiceFilter>("ALL");
  const [error, setError] = useState("");
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

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
    const searchParams = new URLSearchParams(location.search);
    const view = normalize(searchParams.get("view")).toLowerCase();
    if (view === "active") {
      setFilter("ACTIVE");
      return;
    }
    if (view === "limited") {
      setFilter("LIMITED");
      return;
    }
    if (view === "inactive" || view === "disabled") {
      setFilter("DISABLED");
      return;
    }
    setFilter("ALL");
  }, [location.search]);

  const stats = useMemo(() => {
    const total = rows.length;
    const active = rows.filter((row) => row.serviceStatus === "active").length;
    const limited = rows.filter((row) => row.serviceStatus === "limited").length;
    const disabled = rows.filter((row) => row.serviceStatus === "disabled").length;
    return {
      total,
      active,
      limited,
      disabled,
      unknown: Math.max(0, total - active - limited - disabled),
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = normalize(query).toLowerCase();

    return rows.filter((row) => {
      const matchesFilter =
        filter === "ALL" ||
        (filter === "ACTIVE" && row.serviceStatus === "active") ||
        (filter === "LIMITED" && row.serviceStatus === "limited") ||
        (filter === "DISABLED" && row.serviceStatus === "disabled") ||
        (filter === "UNKNOWN" && row.serviceStatus === "unknown");

      if (!matchesFilter) return false;
      if (!q) return true;

      const haystack = [
        row.schoolId,
        row.schoolName,
        row.profileSummary,
        row.notes,
        row.reasonCode,
        getStatusLabel(row.serviceStatus),
        row.statusError,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [filter, query, rows]);

  const mutationNote = useMutation({
    mutationFn: async ({
      schoolId,
      note,
      serviceStatus,
      reasonCode,
    }: {
      schoolId: string;
      note: string;
      serviceStatus: Exclude<SchoolServiceRow["serviceStatus"], "unknown">;
      reasonCode?: string;
    }) => {
      if (!sessionId) throw new Error("Session not found");
      return api.patchServiceStatus(sessionId, schoolId, {
        serviceStatus,
        reasonCode: reasonCode || getDefaultReasonCode(serviceStatus),
        reasonText: normalize(note) || undefined,
      });
    },
    onMutate: ({ schoolId }) => setBusyKey(`note_${schoolId}`),
    onSettled: () => setBusyKey(""),
    onSuccess: (_, variables) => {
      setError("");
      queryClient.invalidateQueries({ queryKey: ["school-service-status", variables.schoolId] });
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: (mutationError) => {
      setError(mutationError instanceof Error ? mutationError.message : "Gagal menyimpan catatan.");
    }
  });

  const saveNotes = (schoolId: string) => {
    const row = rows.find((item) => item.schoolId === schoolId);
    if (!row) return;
    if (row.serviceStatus === "unknown") {
      setError(`Service status untuk ${row.schoolName} belum tersedia, jadi catatan belum bisa disimpan.`);
      return;
    }
    const draft = noteDrafts[schoolId];
    setError("");
    mutationNote.mutate({
      schoolId,
      note: draft,
      serviceStatus: row.serviceStatus,
      reasonCode: row.reasonCode,
    });
  };

  const mutationStatus = useMutation({
    mutationFn: async ({
      schoolId,
      nextStatus,
      reasonText,
      reasonCode,
    }: {
      schoolId: string;
      nextStatus: Exclude<SchoolServiceRow["serviceStatus"], "unknown">;
      reasonText?: string;
      reasonCode?: string;
    }) => {
      if (!sessionId) throw new Error("Session not found");
      return api.patchServiceStatus(sessionId, schoolId, {
        serviceStatus: nextStatus,
        reasonCode: reasonCode || getDefaultReasonCode(nextStatus),
        reasonText: normalize(reasonText) || undefined,
      });
    },
    onMutate: ({ schoolId }) => setBusyKey(`status_${schoolId}`),
    onSettled: () => setBusyKey(""),
    onSuccess: (_, variables) => {
      setError("");
      queryClient.invalidateQueries({ queryKey: ["school-service-status", variables.schoolId] });
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: (mutationError) => {
      setError(
        mutationError instanceof Error ? mutationError.message : "Gagal mengubah status layanan."
      );
    }
  });

  const cycleServiceStatus = (row: SchoolServiceRow) => {
    if (row.serviceStatus === "unknown") {
      setError(`Service status untuk ${row.schoolName} belum tersedia, jadi status belum bisa diubah.`);
      return;
    }

    const nextStatus =
      row.serviceStatus === "active"
        ? "limited"
        : row.serviceStatus === "limited"
          ? "disabled"
          : "active";

    if (nextStatus === "disabled") {
      const confirmed = window.confirm(
        `Nonaktifkan layanan untuk ${row.schoolName || row.schoolId}?\n\nSekolah akan ditandai nonaktif sampai Anda mengaktifkannya kembali.`
      );
      if (!confirmed) return;
    }

    setError("");
    mutationStatus.mutate({
      schoolId: row.schoolId,
      nextStatus,
      reasonText: noteDrafts[row.schoolId] ?? row.notes,
      reasonCode: row.reasonCode,
    });
  };

  return (
    <GasLegacyLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Status Layanan Sekolah</h1>
              <p className="mt-1 text-sm text-slate-300">
                Monitoring status layanan operasional sekolah berdasarkan endpoint backend V2 yang sudah aktif.
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
            <div className="text-xs font-semibold tracking-widest text-slate-400">LAYANAN AKTIF</div>
            <div className="mt-1 text-2xl font-bold text-cyan-300">{stats.active}</div>
            <div className="mt-1 text-sm text-slate-300">Bisa dipakai penuh</div>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-xl backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">LAYANAN TERBATAS</div>
            <div className="mt-1 text-2xl font-bold text-amber-300">{stats.limited}</div>
            <div className="mt-1 text-sm text-slate-300">Perlu tindak lanjut</div>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-xl backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">LAYANAN NONAKTIF</div>
            <div className="mt-1 text-2xl font-bold text-rose-300">{stats.disabled}</div>
            <div className="mt-1 text-sm text-slate-300">Sedang ditutup</div>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-5 shadow-xl backdrop-blur-2xl">
            <div className="text-xs font-semibold tracking-widest text-slate-400">PERLU REVIEW</div>
            <div className="mt-1 text-2xl font-bold text-slate-100">{stats.unknown}</div>
            <div className="mt-1 text-sm text-slate-300">Belum sinkron penuh</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-100">Monitoring Status Layanan Nyata</div>
              <div className="mt-1 text-sm text-slate-300">
                Sumber data:
                {" "}
                <span className="font-semibold text-slate-200">/v1/schools</span>
                {" "}
                dan
                {" "}
                <span className="font-semibold text-slate-200">/v1/schools/:schoolId/service-status</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100"
              >
                <option value="ALL">Semua</option>
                <option value="ACTIVE">Layanan Aktif</option>
                <option value="LIMITED">Layanan Terbatas</option>
                <option value="DISABLED">Layanan Nonaktif</option>
                <option value="UNKNOWN">Perlu Review</option>
              </select>

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari schoolId / nama sekolah / catatan / error..."
                className="w-full sm:w-80 rounded-xl border border-slate-700/50 bg-slate-950/30 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-50">
            Status pembayaran belum memiliki API backend V2. Halaman ini sengaja difokuskan ke status layanan sekolah yang sudah nyata agar dashboard web tidak lagi menampilkan informasi palsu.
          </div>

          {error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="min-w-[1080px] w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs font-semibold tracking-widest text-slate-400">
                  <th className="px-3 py-2">SEKOLAH</th>
                  <th className="px-3 py-2">PROFIL DATA</th>
                  <th className="px-3 py-2">STATUS LAYANAN</th>
                  <th className="px-3 py-2">UPDATE TERAKHIR</th>
                  <th className="px-3 py-2">CATATAN</th>
                  <th className="px-3 py-2 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-sm text-slate-300">
                      Memuat...
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-sm text-slate-300">
                      Data tidak ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row) => {
                    const serviceBusy = busyKey === `status_${row.schoolId}`;
                    const notesBusy = busyKey === `note_${row.schoolId}`;
                    const noteValue = noteDrafts[row.schoolId] ?? row.notes;
                    const noteChanged = normalize(noteValue) !== normalize(row.notes);

                    return (
                      <tr key={row.schoolId} className="border border-slate-700/40 bg-slate-950/20">
                        <td className="px-3 py-3 text-sm text-slate-100">
                          <div className="font-semibold text-slate-100">{row.schoolName || "-"}</div>
                          <div className="mt-1 text-xs text-slate-400">{row.schoolId}</div>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-100">
                          <div>{row.profileSummary}</div>
                          {row.statusError ? (
                            <div className="mt-1 text-xs text-amber-200">{row.statusError}</div>
                          ) : null}
                        </td>
                        <td className="px-3 py-3 text-sm">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                              row.serviceStatus
                            )}`}
                          >
                            {getStatusLabel(row.serviceStatus)}
                          </span>
                          {row.reasonCode ? (
                            <div className="mt-2 text-xs text-slate-400">{row.reasonCode}</div>
                          ) : null}
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-100">{formatDate(row.updatedAt)}</td>
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
                              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                                noteChanged
                                  ? "border-slate-500/40 bg-slate-800/80 text-slate-100 hover:bg-slate-700/80"
                                  : "border-slate-800/60 bg-slate-900/40 text-slate-500"
                              } ${notesBusy ? "cursor-not-allowed opacity-60" : ""}`}
                            >
                              Simpan Catatan
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <button
                              type="button"
                              disabled={serviceBusy || row.serviceStatus === "unknown"}
                              onClick={() => cycleServiceStatus(row)}
                              className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                                row.serviceStatus === "disabled"
                                  ? "border-emerald-500/40 bg-emerald-600/20 text-emerald-100 hover:bg-emerald-600/30"
                                  : row.serviceStatus === "limited"
                                    ? "border-rose-500/40 bg-rose-600/20 text-rose-100 hover:bg-rose-600/30"
                                    : "border-amber-500/40 bg-amber-600/20 text-amber-100 hover:bg-amber-600/30"
                              } ${serviceBusy || row.serviceStatus === "unknown" ? "cursor-not-allowed opacity-60" : ""}`}
                            >
                              {row.serviceStatus === "active"
                                ? "Set ke Terbatas"
                                : row.serviceStatus === "limited"
                                  ? "Set ke Nonaktif"
                                  : row.serviceStatus === "disabled"
                                    ? "Aktifkan"
                                    : "Butuh Service Status"}
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
