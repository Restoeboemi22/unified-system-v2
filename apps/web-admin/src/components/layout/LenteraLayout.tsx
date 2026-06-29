import { Suspense } from "react";
import { LenteraSidebar } from "@/components/lentera/LenteraSidebar";
import { Outlet } from "react-router-dom";

export default function LenteraLayout() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans">
      <div className="flex min-h-screen">
        <Suspense fallback={<div className="hidden w-72 shrink-0 lg:block" />}>
          <LenteraSidebar />
        </Suspense>
        <main className="min-w-0 flex-1 p-6 lg:p-6 overflow-y-auto h-screen bg-[#020617]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
