import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AppShell } from "@/components/layout/AppShell";
import { Panel } from "@/components/ui/Panel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { api } from "@/lib/api";

type ClassroomForm = {
  academicPeriodId: string;
  gradeLevel: string;
  classroomName: string;
};

export default function ClassroomsPage() {
  const session = useAuthGuard();
  const { register, handleSubmit, reset } = useForm<ClassroomForm>();

  const classroomsQuery = useQuery({
    queryKey: ["classrooms", session?.sessionId, session?.activeSchoolId],
    queryFn: () => api.getClassrooms(session!.sessionId, session!.activeSchoolId ?? undefined),
    enabled: Boolean(session?.sessionId)
  });

  const academicPeriodsQuery = useQuery({
    queryKey: ["academic-periods", session?.sessionId, session?.activeSchoolId],
    queryFn: () => api.getAcademicPeriods(session!.sessionId, session!.activeSchoolId ?? undefined),
    enabled: Boolean(session?.sessionId)
  });

  const createMutation = useMutation({
    mutationFn: (values: ClassroomForm) =>
      api.createClassroom(session!.sessionId, {
        schoolId: session!.activeSchoolId!,
        academicPeriodId: values.academicPeriodId,
        gradeLevel: values.gradeLevel,
        classroomName: values.classroomName
      }),
    onSuccess: () => {
      reset();
      classroomsQuery.refetch();
    }
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <Panel>
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-500">Academic Directory</p>
          <h2 className="mt-3 font-display text-4xl text-slate-950">Daftar kelas tenant aktif</h2>
        </Panel>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Data kelas</p>
                <p className="text-sm text-slate-500">Tenant: {session?.activeSchoolId ?? "-"}</p>
              </div>
              <p className="text-sm text-slate-500">{classroomsQuery.data?.classrooms.length ?? 0} entri</p>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 font-medium">Tingkat</th>
                    <th className="pb-3 font-medium">Nama Kelas</th>
                    <th className="pb-3 font-medium">Periode</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classroomsQuery.data?.classrooms.map((classroom) => {
                    const period = academicPeriodsQuery.data?.academicPeriods.find(
                      (p) => p.academicPeriodId === classroom.academicPeriodId
                    );
                    return (
                      <tr key={classroom.classroomId} className="border-b border-slate-100 last:border-none">
                        <td className="py-4 text-slate-800">{classroom.gradeLevel}</td>
                        <td className="py-4 font-medium text-slate-950">{classroom.classroomName}</td>
                        <td className="py-4 text-slate-800">
                          {period ? `${period.yearLabel} - ${period.semesterLabel}` : classroom.academicPeriodId}
                        </td>
                        <td className="py-4">
                          <StatusBadge value={classroom.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!classroomsQuery.data?.classrooms.length ? (
                <p className="py-8 text-sm text-slate-500">Belum ada kelas yang tercatat pada tenant ini.</p>
              ) : null}
            </div>
          </Panel>

          <Panel>
            <p className="text-sm font-semibold text-slate-900">Tambah kelas</p>
            <form
              onSubmit={handleSubmit((values) => createMutation.mutate(values))}
              className="mt-5 space-y-4"
            >
              <select
                {...register("academicPeriodId", { required: true })}
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              >
                <option value="">-- Pilih Periode Akademik --</option>
                {academicPeriodsQuery.data?.academicPeriods.map((period) => (
                  <option key={period.academicPeriodId} value={period.academicPeriodId}>
                    {period.yearLabel} ({period.semesterLabel})
                  </option>
                ))}
              </select>
              <input
                {...register("gradeLevel", { required: true })}
                placeholder="Tingkat (misal: 10, 11, 12)"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <input
                {...register("classroomName", { required: true })}
                placeholder="Nama Kelas (misal: MIPA 1)"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={createMutation.isPending || !session?.activeSchoolId}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {createMutation.isPending ? "Menyimpan..." : "Tambah kelas"}
              </button>
            </form>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
