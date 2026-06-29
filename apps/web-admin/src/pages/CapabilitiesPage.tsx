import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { Panel } from "@/components/ui/Panel";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { api } from "@/lib/api";

export default function CapabilitiesPage() {
  const session = useAuthGuard();

  const capabilitiesQuery = useQuery({
    queryKey: ["capabilities", session?.sessionId],
    queryFn: () => api.getCapabilities(session!.sessionId),
    enabled: Boolean(session?.sessionId)
  });

  const meQuery = useQuery({
    queryKey: ["policy-me", session?.sessionId],
    queryFn: () => api.getPolicyMe(session!.sessionId),
    enabled: Boolean(session?.sessionId)
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <Panel>
          <p className="text-[11px] uppercase tracking-[0.36em] text-slate-500">Capability Matrix</p>
          <h2 className="mt-3 font-display text-4xl text-slate-950">Capability aktif per session</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Halaman ini membantu memverifikasi apa yang diizinkan oleh policy-service untuk role dan tenant aktif.
          </p>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Panel>
            <p className="text-sm font-semibold text-slate-900">Konteks evaluasi policy</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-slate-500">Tenant aktif</dt>
                <dd className="mt-1 font-medium text-slate-950">{meQuery.data?.activeSchoolId ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Role aktif</dt>
                <dd className="mt-1 font-medium text-slate-950">{meQuery.data?.activeRole ?? "-"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Denied reasons</dt>
                <dd className="mt-1 text-slate-700">
                  {meQuery.data?.deniedReasons.length
                    ? meQuery.data.deniedReasons.join(", ")
                    : "Tidak ada alasan penolakan saat ini"}
                </dd>
              </div>
            </dl>
          </Panel>

          <Panel>
            <p className="text-sm font-semibold text-slate-900">Daftar capability</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {capabilitiesQuery.data?.capabilities.map((capability) => (
                <span
                  key={capability}
                  className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-900"
                >
                  {capability}
                </span>
              ))}
              {!capabilitiesQuery.data?.capabilities.length ? (
                <p className="text-sm text-slate-500">Belum ada capability aktif untuk session ini.</p>
              ) : null}
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
