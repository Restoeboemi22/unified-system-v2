import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type PanelProps = PropsWithChildren<{
  className?: string;
}>;

export function Panel({ children, className }: PanelProps) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-slate-200/70 bg-white/88 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur",
        className
      )}
    >
      {children}
    </section>
  );
}
