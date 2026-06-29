import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  value: "active" | "inactive" | "limited" | "disabled" | "suspended" | "planned" | "closed";
};

const statusMap: Record<StatusBadgeProps["value"], string> = {
  active: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  inactive: "bg-slate-200 text-slate-700 ring-slate-300",
  limited: "bg-amber-100 text-amber-800 ring-amber-200",
  disabled: "bg-rose-100 text-rose-800 ring-rose-200",
  suspended: "bg-rose-100 text-rose-800 ring-rose-200",
  planned: "bg-indigo-100 text-indigo-800 ring-indigo-200",
  closed: "bg-zinc-200 text-zinc-700 ring-zinc-300"
};

export function StatusBadge({ value }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ring-1 ring-inset",
        statusMap[value]
      )}
    >
      {value}
    </span>
  );
}
