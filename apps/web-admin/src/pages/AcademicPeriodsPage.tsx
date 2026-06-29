import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AppShell } from "@/components/layout/AppShell";
import { Panel } from "@/components/ui/Panel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { api } from "@/lib/api";

type AcademicPeriodForm = {
  yearLabel: string;
  semesterLabel: string;
  startDate: string;
  endDate: string;
};

export default function AcademicPeriodsPage() {
  const session = useAuthGuard();
  const { register, handleSubmit, reset } = useForm<AcademicPeriodForm>();

  const academicPeriodsQuery = useQuery({
    queryKey: ["academic-periods", session?.sessionId, session?.activeSchoolId],
    queryFn: () => api.getAcademicPeriods(session!.sessionId, session!.activeSchoolId ?? undefined),
    enabled: Boolean(session?.sessionId)
  });

  const createMutation = useMutation({
    mutationFn: (values: AcademicPeriodForm) =>
      api.createAcademicPeriod(session!.sessionId, {
        schoolId: session!.activeSchoolId!,
        yearLabel: values.yearLabel,
        semesterLabel: values.semesterLabel,
        startDate: values.startDate,
        endDate: values.endDate
      }),
    onSuccess: () => {
      reset();
      academicPeriodsQuery.refetch();
    }
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <Panel>
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-500">Academic Directory</p>
          <h2 className="mt-3 font-display text-4xl text-slate-950">Daftar periode akademik tenant aktif</h2>
        </Panel>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Data periode akademik</p>
                <p className="text-sm text-slate-500">Tenant: {session?.activeSchoolId ?? "-"}</p>
              </div>
              <p className="text-sm text-slate-500">{academicPeriodsQuery.data?.academicPeriods.length ?? 0} entri</p>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 font-medium">Tahun Ajaran</th>
                    <th className="pb-3 font-medium">Semester</th>
                    <th className="pb-3 font-medium">Mulai</th>
                    <th className="pb-3 font-medium">Berakhir</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {academicPeriodsQuery.data?.academicPeriods.map((period) => (
                    <tr key={period.academicPeriodId} className="border-b border-slate-100 last:border-none">
                      <td className="py-4 font-medium text-slate-950">{period.yearLabel}</td>
                      <td className="py-4 text-slate-800">{period.semesterLabel}</td>
                      <td className="py-4 text-slate-600">
                        {new Date(period.startDate).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-4 text-slate-600">
                        {new Date(period.endDate).toLocaleDateString("id-ID")}
                      </td>
                      <td className="py-4">
                        <StatusBadge value={period.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!academicPeriodsQuery.data?.academicPeriods.length ? (
                <p className="py-8 text-sm text-slate-500">Belum ada periode akademik yang tercatat pada tenant ini.</p>
              ) : null}
            </div>
          </Panel>

          <Panel>
            <p className="text-sm font-semibold text-slate-900">Tambah periode akademik</p>
            <form
              onSubmit={handleSubmit((values) => createMutation.mutate(values))}
              className="mt-5 space-y-4"
            >
              <input
                {...register("yearLabel", { required: true })}
                placeholder="Tahun Ajaran (misal: 2024/2025)"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <input
                {...register("semesterLabel", { required: true })}
                placeholder="Semester (misal: Ganjil)"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <input
                type="date"
                {...register("startDate", { required: true })}
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <input
                type="date"
                {...register("endDate", { required: true })}
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={createMutation.isPending || !session?.activeSchoolId}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {createMutation.isPending ? "Menyimpan..." : "Tambah periode"}
              </button>
            </form>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
