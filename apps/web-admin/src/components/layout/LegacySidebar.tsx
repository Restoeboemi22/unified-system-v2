import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import {
  LayoutDashboard, Users, UserCheck,
  BookOpen, Award, Settings, Bell, AlertTriangle,
  Clock, ChevronRight, ChevronDown, School, Wallet
} from "lucide-react";
import { useSessionStore } from "@/store/session-store";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export function LegacySidebar({ className = "", onClose }: SidebarProps) {
  const session = useSessionStore((state) => state.session);
  const location = useLocation();
  const pathname = location.pathname;

  const user = session ? { 
    name: session.userId || "Admin", 
    role: session.activeRole || "super_admin", 
    schoolName: session.activeSchoolId 
  } : null;

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const isGaspaAdmin = user?.role === "admin" || user?.role === "super_admin";
  const isGaspaSuperMode = user?.role === "super_admin" && Boolean(pathname?.startsWith("/dashboard/super"));
  const isServiceStatusModule = user?.role === "super_admin" && pathname === "/dashboard/super/service-status";
  const isPresensiGroupActive = Boolean(
    pathname === "/dashboard/attendance" ||
      pathname?.startsWith("/dashboard/attendance/") ||
      pathname === "/dashboard/presensi-sholat" ||
      pathname?.startsWith("/dashboard/presensi-sholat/")
  );
  const isPresensiGroupExpanded = useMemo(() => isPresensiGroupActive, [isPresensiGroupActive]);

  if (!user) return null;

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (pathname === href) return true;
    if (href !== "/" && pathname.startsWith(`${href}/`)) return true;
    return false;
  };

  const linkClass = (href: string, variant: "normal" | "section" = "normal") => {
    const base =
      variant === "section"
        ? "flex items-center gap-3 px-4 py-3 mb-1 text-sm font-medium transition-all duration-200 rounded-xl"
        : "flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 rounded-xl";

    return `${base} ${
      isActive(href) 
        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30" 
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;
  };

  const exactLinkClass = (href: string, variant: "normal" | "section" = "normal") => {
    const base =
      variant === "section"
        ? "flex items-center gap-3 px-4 py-3 mb-1 text-sm font-medium transition-all duration-200 rounded-xl"
        : "flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 rounded-xl";

    const isCurrent = pathname === href;
    return `${base} ${
      isCurrent
        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;
  };

  const serviceStatusSectionClass = () => {
    const base = "flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 rounded-xl ml-4";
    return `${base} ${
      isServiceStatusModule
        ? "bg-white/10 text-white"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;
  };

  return (
    <div className={`flex h-full w-72 flex-col bg-slate-900 text-white print:hidden border-r border-white/10 ${className}`}>
      <div className="flex h-36 items-center justify-center px-6 pt-8 pb-4 border-b border-white/10">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-lg bg-slate-800">
            {isServiceStatusModule ? (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-500/15 text-emerald-100 shadow-lg shadow-emerald-900/20">
                <Wallet className="h-10 w-10" />
              </div>
            ) : (
              <img src="/Icon_GAS.png" alt="GAS" className="w-full h-full rounded-xl object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />
            )}
          </div>
          <div className="text-center">
            <span className="font-bold text-lg text-white">
              {isServiceStatusModule ? "Status Layanan Sekolah" : "Gerbang Aplikasi Sekolah"}
            </span>
            {isServiceStatusModule && (
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-emerald-200/80">
                Super Admin
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-white/5">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Logged in as:</p>
        <p className="font-semibold truncate text-white">{user.name}</p>
        <p className="text-xs text-blue-400 uppercase font-semibold mt-1">{user.role}</p>
        {user.schoolName && (
          <p className="text-xs text-slate-400 mt-1 truncate">{user.schoolName}</p>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        
        {/* ADMIN MENU (Full Access) */}
        {isGaspaAdmin && (
          <>
            {user.role === "super_admin" && isGaspaSuperMode && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Super Admin
                </div>

                {!isServiceStatusModule && (
                  <Link to="/dashboard/super" className={exactLinkClass("/dashboard/super", "section")} onClick={handleLinkClick}>
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard Overview</span>
                  </Link>
                )}

                {isServiceStatusModule ? (
                  <>
                    <Link
                      to="/dashboard/super/service-status"
                      className={serviceStatusSectionClass()}
                      onClick={handleLinkClick}
                    >
                      <School className="w-4 h-4" />
                      <span>Status Layanan Sekolah</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard/super/tenants" className={`${linkClass("/dashboard/super/tenants")} ml-4`} onClick={handleLinkClick}>
                      <School className="w-4 h-4" />
                      <span>Sekolah & Tenant</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                    </Link>
                    <Link
                      to="/dashboard/super/global-config"
                      className={`${linkClass("/dashboard/super/global-config")} ml-4`}
                      onClick={handleLinkClick}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Konfigurasi Global</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                    </Link>
                    <Link to="/dashboard/super/sync-jobs" className={`${linkClass("/dashboard/super/sync-jobs")} ml-4`} onClick={handleLinkClick}>
                      <Clock className="w-4 h-4" />
                      <span>Sync Jobs</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                    </Link>
                    <Link to="/dashboard/super/broadcast" className={`${linkClass("/dashboard/super/broadcast")} ml-4`} onClick={handleLinkClick}>
                      <Bell className="w-4 h-4" />
                      <span>Broadcast Global</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                    </Link>
                    <Link to="/dashboard/super/audit" className={`${linkClass("/dashboard/super/audit")} ml-4`} onClick={handleLinkClick}>
                      <BookOpen className="w-4 h-4" />
                      <span>Audit & Compliance</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                    </Link>
                    <Link to="/dashboard/super/support" className={`${linkClass("/dashboard/super/support")} ml-4`} onClick={handleLinkClick}>
                      <UserCheck className="w-4 h-4" />
                      <span>Support Tools</span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                    </Link>
                  </>
                )}
              </>
            )}

            {user.role === "super_admin" && !isGaspaSuperMode && (
              <>
                <Link to="/dashboard/super" className={linkClass("/dashboard/super", "section")} onClick={handleLinkClick}>
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard Overview</span>
                </Link>
                <div className="h-px bg-white/10 my-3 mx-2"></div>
              </>
            )}

            {isGaspaSuperMode ? null : (
              <>
                <Link to="/dashboard/students" className={linkClass("/dashboard/students", "section")} onClick={handleLinkClick}>
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Beranda GAS</span>
                </Link>
                <div className="h-px bg-white/10 my-3 mx-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Master Data</div>
                <Link to="/dashboard/students" className={linkClass("/dashboard/students")} onClick={handleLinkClick}>
                  <Users className="w-4 h-4" />
                  <span>Manajemen Siswa</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                <div className="mb-1">
                  <Link
                    to="/dashboard/attendance"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 rounded-xl ${
                      isPresensiGroupActive
                        ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/10 text-white border border-blue-500/30"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Manajemen Presensi</span>
                    {isPresensiGroupExpanded ? (
                      <ChevronDown className="w-4 h-4 ml-auto opacity-60" />
                    ) : (
                      <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                    )}
                  </Link>

                  {isPresensiGroupExpanded && (
                    <div className="mt-1 ml-6 space-y-1 border-l border-white/10 pl-3">
                      <Link
                        to="/dashboard/attendance"
                        className={linkClass("/dashboard/attendance")}
                        onClick={handleLinkClick}
                      >
                        <Clock className="w-4 h-4" />
                        <span>Presensi Sekolah</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                      </Link>

                      <Link
                        to="/dashboard/presensi-sholat"
                        className={linkClass("/dashboard/presensi-sholat")}
                        onClick={handleLinkClick}
                      >
                        <Clock className="w-4 h-4" />
                        <span>Presensi Sholat</span>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="/dashboard/settings" className={linkClass("/dashboard/settings")} onClick={handleLinkClick}>
                  <Settings className="w-4 h-4" />
                  <span>Pengaturan Sistem</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                <div className="h-px bg-white/10 my-3 mx-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Monitoring & Laporan</div>
                
                <Link to="/dashboard/attendance-report" className={linkClass("/dashboard/attendance-report")} onClick={handleLinkClick}>
                  <Clock className="w-4 h-4" />
                  <span>Rekap Kehadiran</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                <Link to="/dashboard/discipline" className={linkClass("/dashboard/discipline")} onClick={handleLinkClick}>
                  <Award className="w-4 h-4" />
                  <span>Rekap Kedisiplinan</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                <Link to="/dashboard/library" className={linkClass("/dashboard/library")} onClick={handleLinkClick}>
                  <BookOpen className="w-4 h-4" />
                  <span>Monitoring E-Library</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                <Link to="/dashboard/prayer-monitoring" className={linkClass("/dashboard/prayer-monitoring")} onClick={handleLinkClick}>
                  <Clock className="w-4 h-4" />
                  <span>Rekap Sholat</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                <Link to="/dashboard/virtual-pet" className={linkClass("/dashboard/virtual-pet")} onClick={handleLinkClick}>
                  <Users className="w-4 h-4" />
                  <span>Virtual Pet Monitor</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                <Link to="/dashboard/seven-habits" className={linkClass("/dashboard/seven-habits")} onClick={handleLinkClick}>
                  <Award className="w-4 h-4" />
                  <span>7 KAIH</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                
                <div className="h-px bg-white/10 my-3 mx-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">LAYANAN ADUAN</div>
                
                <Link to="/dashboard/halo-spentgapa" className={linkClass("/dashboard/halo-spentgapa")} onClick={handleLinkClick}>
                  <AlertTriangle className="w-4 h-4" />
                  <span>Laporan Masuk</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
                
                <div className="h-px bg-white/10 my-3 mx-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Notifikasi</div>
                <Link to="/dashboard/notifications" className={linkClass("/dashboard/notifications")} onClick={handleLinkClick}>
                  <Bell className="w-4 h-4" />
                  <span>Broadcast Notifikasi</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </div>
  );
}

function ShieldCheckIcon(props: any) {
  return <ShieldCheck {...props} />;
}
import { ShieldCheck } from "lucide-react";
