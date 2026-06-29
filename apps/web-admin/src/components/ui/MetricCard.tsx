import { PropsWithChildren } from "react";

type MetricCardProps = PropsWithChildren<{
  label: string;
  value: string;
}>;

export function MetricCard({ label, value, children }: MetricCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200/70 bg-slate-50/80 p-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-2 font-display text-2xl text-slate-950">{value}</p>
      {children ? <div className="mt-3 text-sm text-slate-600">{children}</div> : null}
    </div>
  );
}
