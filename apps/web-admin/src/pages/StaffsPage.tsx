import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AppShell } from "@/components/layout/AppShell";
import { Panel } from "@/components/ui/Panel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { api } from "@/lib/api";

type StaffForm = {
  employeeNumber: string;
  fullName: string;
  positionTitle: string;
};

export default function StaffsPage() {
  const session = useAuthGuard();
  const { register, handleSubmit, reset } = useForm<StaffForm>();

  const staffsQuery = useQuery({
    queryKey: ["staffs", session?.sessionId, session?.activeSchoolId],
    queryFn: () => api.getStaffs(session!.sessionId, session!.activeSchoolId ?? undefined),
    enabled: Boolean(session?.sessionId)
  });

  const createMutation = useMutation({
    mutationFn: (values: StaffForm) =>
      api.createStaff(session!.sessionId, {
        schoolId: session!.activeSchoolId!,
        employeeNumber: values.employeeNumber,
        fullName: values.fullName,
        positionTitle: values.positionTitle
      }),
    onSuccess: () => {
      reset();
      staffsQuery.refetch();
    }
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <Panel>
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-500">Academic Directory</p>
          <h2 className="mt-3 font-display text-4xl text-slate-950">Daftar staf tenant aktif</h2>
        </Panel>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel className="overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Data staf</p>
                <p className="text-sm text-slate-500">Tenant: {session?.activeSchoolId ?? "-"}</p>
              </div>
              <p className="text-sm text-slate-500">{staffsQuery.data?.staffs.length ?? 0} entri</p>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="pb-3 font-medium">Nomor Pegawai</th>
                    <th className="pb-3 font-medium">Nama</th>
                    <th className="pb-3 font-medium">Jabatan</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffsQuery.data?.staffs.map((staff) => (
                    <tr key={staff.staffId} className="border-b border-slate-100 last:border-none">
                      <td className="py-4 text-slate-800">{staff.employeeNumber}</td>
                      <td className="py-4 font-medium text-slate-950">{staff.fullName}</td>
                      <td className="py-4 text-slate-800">{staff.positionTitle}</td>
                      <td className="py-4">
                        <StatusBadge value={staff.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!staffsQuery.data?.staffs.length ? (
                <p className="py-8 text-sm text-slate-500">Belum ada staf yang tercatat pada tenant ini.</p>
              ) : null}
            </div>
          </Panel>

          <Panel>
            <p className="text-sm font-semibold text-slate-900">Tambah staf</p>
            <form
              onSubmit={handleSubmit((values) => createMutation.mutate(values))}
              className="mt-5 space-y-4"
            >
              <input
                {...register("employeeNumber", { required: true })}
                placeholder="Nomor pegawai"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <input
                {...register("fullName", { required: true })}
                placeholder="Nama lengkap staf"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <input
                {...register("positionTitle", { required: true })}
                placeholder="Jabatan"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={createMutation.isPending || !session?.activeSchoolId}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {createMutation.isPending ? "Menyimpan..." : "Tambah staf"}
              </button>
            </form>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
