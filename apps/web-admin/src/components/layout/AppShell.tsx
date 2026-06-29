import { PropsWithChildren } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BookUser, Building2, CalendarDays, KeyRound, LogOut, ShieldCheck, Users, GraduationCap, School } from "lucide-react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/store/session-store";
import { StatusBadge } from "@/components/ui/StatusBadge";

const baseItems = [
  { to: "/dashboard", label: "Session", icon: ShieldCheck },
  { to: "/capabilities", label: "Capability", icon: KeyRound },
  { to: "/service-status", label: "Status Layanan", icon: Building2 },
  { to: "/academic-periods", label: "Tahun Ajaran", icon: CalendarDays },
  { to: "/classrooms", label: "Kelas", icon: School },
  { to: "/teachers", label: "Guru", icon: GraduationCap },
  { to: "/staffs", label: "Staf", icon: Users },
  { to: "/students", label: "Siswa", icon: BookUser },
  { to: "/attendance-report", label: "Presensi", icon: CalendarDays }
];

export function AppShell({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const session = useSessionStore((state) => state.session);
  const clearAuth = useSessionStore((state) => state.clearAuth);

  const handleLogout = async () => {
    if (session?.sessionId) {
      await api.logout(session.sessionId).catch(() => undefined);
    }
    clearAuth();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.16),_transparent_24%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-6 py-6">
        <aside className="hidden w-[280px] shrink-0 flex-col rounded-[32px] border border-slate-200/70 bg-slate-950 px-6 py-7 text-slate-100 shadow-[0_30px_90px_rgba(15,23,42,0.22)] lg:flex">
          <div>
            <p className="text-[11px] uppercase tracking-[0.36em] text-cyan-300">Unified System V2</p>
            <h1 className="mt-3 font-display text-3xl leading-tight text-white">Web Admin POC</h1>
            <p className="mt-3 text-sm text-slate-300">
              Surface internal untuk menguji session, kebijakan, tenant, dan academic master.
            </p>
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Tenant aktif</p>
            <p className="mt-2 text-lg font-semibold">{session?.activeSchoolId ?? "Belum dipilih"}</p>
            {session?.serviceStatus ? <div className="mt-3"><StatusBadge value={session.serviceStatus} /></div> : null}
            <p className="mt-4 text-sm text-slate-400">Role aktif: {session?.activeRole ?? "-"}</p>
          </div>

          <div className="mt-8 flex flex-1 flex-col gap-2">
            {/* Super Admin Navigation */}
            {session?.activeRole === 'super_admin' && (
              <div className="mb-4">
                <p className="px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Super Admin</p>
                <NavLink
                  to="/schools"
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-cyan-400 text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.28)]"
                        : "text-slate-300 hover:bg-white/8 hover:text-white"
                    )
                  }
                >
                  <Building2 className="h-4 w-4" />
                  Manajemen Sekolah
                </NavLink>
              </div>
            )}

            <p className="px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Operasional Tenant</p>
            {baseItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-cyan-400 text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.28)]"
                        : "text-slate-300 hover:bg-white/8 hover:text-white"
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </aside>

        <main className="flex-1 rounded-[32px] border border-white/70 bg-white/60 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
