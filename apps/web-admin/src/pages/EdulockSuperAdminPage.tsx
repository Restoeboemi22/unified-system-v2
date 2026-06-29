"use client";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";







type Section =
  | "dashboard"
  | "monitoring"
  | "tenants"
  | "admins"
  | "policy_center"
  | "zone_templates"
  | "device_fleet"
  | "command_center"
  | "izin_exception"
  | "audit"
  | "integrations"
  | "support"
  | "settings";

function formatTs(ts: number | null | undefined): string {
  if (!ts) return "-";
  try {
    return new Date(ts).toLocaleString("id-ID");
  } catch {
    return "-";
  }
}

function normalize(value: unknown): string {
  return String(value || "").trim();
}

type SchoolRow = {
  schoolId: string;
  name: string;
  district: string;
  npsn: string;
  authEmail: string;
  adminEmail: string;
  backupEmail: string;
  isActive: boolean;
  adminAccessActive: boolean;
  updatedAt?: number | null;
  createdAt?: number | null;
};

type RuntimeAdminRow = {
  uid: string;
  email: string;
  role: "super_admin" | "admin";
  isActive: boolean;
  schoolId: string;
  schoolName: string;
  lastLoginAt?: number | null;
  mustChangePassword: boolean;
};

type SchoolAdminAccessRow = {
  schoolId: string;
  schoolName: string;
  npsn: string;
  loginIdentifier: string;
  resetEmail: string;
  schoolActive: boolean;
  accessActive: boolean;
  runtimeUid: string;
  runtimeEmail: string;
  runtimeLastLoginAt?: number | null;
  runtimeMustChangePassword: boolean;
};

function getSchoolAdminResetEmail(school: Pick<SchoolRow, "authEmail" | "adminEmail">): string {
  const authEmail = normalize(school.authEmail).toLowerCase();
  const adminEmail = normalize(school.adminEmail).toLowerCase();
  if (authEmail.includes("@") && !authEmail.endsWith("@edulock.local")) return authEmail;
  if (adminEmail.includes("@") && !adminEmail.endsWith("@edulock.local")) return adminEmail;
  return "";
}

function getSchoolAdminLoginIdentifier(school: Pick<SchoolRow, "npsn" | "authEmail" | "adminEmail">): string {
  const authEmail = normalize(school.authEmail).toLowerCase();
  const adminEmail = normalize(school.adminEmail).toLowerCase();
  const npsn = normalize(school.npsn);
  if (authEmail) return authEmail;
  if (adminEmail) return adminEmail;
  if (npsn) return `${npsn}@edulock.local`;
  return "";
}

function schoolHasAdminLoginConfig(school: Pick<SchoolRow, "npsn" | "authEmail" | "adminEmail">): boolean {
  return Boolean(getSchoolAdminLoginIdentifier(school));
}

function hasOperationalRuntime(row?: Pick<SchoolAdminAccessRow, "runtimeUid" | "runtimeLastLoginAt"> | null): boolean {
  if (!row) return false;
  if (normalize(row.runtimeUid)) return true;
  return Number(row.runtimeLastLoginAt || 0) > 0;
}


const onValue = (...args: any[]) => { args[1]({ val: () => ({}), exists: () => false }); return () => {}; };
const ref = (...args: any[]) => args[1];
const remove = async (...args: any[]) => {};
const set = async (...args: any[]) => {};
const update = async (...args: any[]) => {};
const sendPasswordResetEmail = async (...args: any[]) => {};
const QRCode = (props: any) => null;
const edulockDb = {};
const edulockAuth = {};

function useEduLockAuth() {
  return { role: 'super_admin', profile: { email: 'super@edulock.local' }, isLoading: false };
}

export default function EduLockSuperAdminPage() {
  const navigate = useNavigate();
  const { role, profile, isLoading } = useEduLockAuth();

  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [runtimeAdmins, setRuntimeAdmins] = useState<RuntimeAdminRow[]>([]);
  const [schools, setSchools] = useState<SchoolRow[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [presenceByNisn, setPresenceByNisn] = useState<Record<string, any>>({});

  const [adminApiConfigUrl, setAdminApiConfigUrl] = useState("");
  const [adminApiInput, setAdminApiInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "" | "success" | "error"; text: string }>({ type: "", text: "" });

  const [monitoringSchoolId, setMonitoringSchoolId] = useState("");
  const [uninstallSchoolId, setUninstallSchoolId] = useState("");
  const [uninstallDurationMinutes, setUninstallDurationMinutes] = useState<number>(10);
  const [uninstallAccess, setUninstallAccess] = useState<{ schoolId: string; code: string; expiresAt: number; createdAt?: number; createdBy?: string } | null>(
    null
  );
  const [schoolForm, setSchoolForm] = useState({
    schoolId: "",
    name: "",
    district: "",
    npsn: "",
    authEmail: "",
    adminEmail: "",
    backupEmail: "",
    isActive: true,
  });

  useEffect(() => {
    if (role && role !== "super_admin") navigate("/edulock/admin");
  }, [role, navigate]);

  useEffect(() => {
    if (role !== "super_admin") return;

    const unsubAdmins = onValue(ref(edulockDb, "admin_profiles"), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setRuntimeAdmins([]);
        return;
      }
      const list: RuntimeAdminRow[] = Object.entries(data).map(([key, v]: any) => ({
        uid: String(v?.uid || key),
        email: String(v?.email || ""),
        role: String(v?.role || "admin") === "super_admin" ? "super_admin" : "admin",
        isActive: v?.isActive !== false,
        schoolId: v?.schoolId ? String(v.schoolId) : "",
        schoolName: v?.schoolName ? String(v.schoolName) : "",
        lastLoginAt: typeof v?.lastLoginAt === "number" ? v.lastLoginAt : null,
        mustChangePassword: v?.mustChangePassword === true,
      }));
      list.sort((a: any, b: any) => (Number(b.lastLoginAt || 0) || 0) - (Number(a.lastLoginAt || 0) || 0));
      setRuntimeAdmins(list);
    });

    const unsubSchools = onValue(ref(edulockDb, "schools"), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setSchools([]);
        return;
      }
      const list: SchoolRow[] = Object.entries(data).map(([key, v]: any) => ({
        schoolId: String(v?.schoolId || key),
        name: v?.name ? String(v.name) : "",
        district: v?.district ? String(v.district) : "",
        npsn: v?.npsn ? String(v.npsn) : "",
        authEmail: v?.authEmail ? String(v.authEmail) : "",
        adminEmail: v?.adminEmail ? String(v.adminEmail) : "",
        backupEmail: v?.backupEmail ? String(v.backupEmail) : "",
        isActive: v?.isActive !== false,
        adminAccessActive: v?.adminAccessActive !== false,
        updatedAt: typeof v?.updatedAt === "number" ? v.updatedAt : null,
        createdAt: typeof v?.createdAt === "number" ? v.createdAt : null,
      }));
      list.sort((a: any, b: any) => String(a.name || a.schoolId).localeCompare(String(b.name || b.schoolId)));
      setSchools(list);
    });

    const unsubLogs = onValue(ref(edulockDb, "violations"), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setLogs([]);
        return;
      }
      const list = Object.entries(data).map(([key, v]: any) => ({
        id: String(key),
        nisn: v?.nisn ? String(v.nisn) : "",
        type: v?.type ? String(v.type) : "",
        description: v?.description ? String(v.description) : "",
        timestamp: typeof v?.timestamp === "number" ? v.timestamp : null,
      }));
      list.sort((a: any, b: any) => (Number(b.timestamp || 0) || 0) - (Number(a.timestamp || 0) || 0));
      setLogs(list.slice(0, 200));
    });

    const unsubSessions = onValue(ref(edulockDb, "active_sessions"), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setSessions([]);
        return;
      }
      const list = Object.entries(data).map(([key, v]: any) => ({
        nisn: String(key),
        ...(v || {}),
      }));
      list.sort(
        (a: any, b: any) =>
          (Number(b?.updatedAt || b?.lastUpdated || b?.lastSeen || 0) || 0) - (Number(a?.updatedAt || a?.lastUpdated || a?.lastSeen || 0) || 0)
      );
      setSessions(list);
    });

    const unsubConfig = onValue(ref(edulockDb, "system_config/adminApiBaseUrl"), (snapshot) => {
      const value = snapshot.exists() ? String(snapshot.val() || "") : "";
      const url = value.trim();
      setAdminApiConfigUrl(url);
      setAdminApiInput((prev) => (String(prev || "").trim() ? prev : url));
    });

    return () => {
      unsubAdmins();
      unsubSchools();
      unsubLogs();
      unsubSessions();
      unsubConfig();
    };
  }, [role]);

  useEffect(() => {
    if (role !== "super_admin") return;

    const sid = normalize(monitoringSchoolId).toLowerCase();
    if (!sid) {
      setPresenceByNisn({});
      return;
    }
    const unsub = onValue(ref(edulockDb, `presence/${sid}`), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setPresenceByNisn({});
        return;
      }
      const map: Record<string, any> = {};
      for (const [nisn, v] of Object.entries(data)) map[String(nisn)] = v || {};
      setPresenceByNisn(map);
    });
    return () => unsub();
  }, [monitoringSchoolId, role]);

  useEffect(() => {
    if (role !== "super_admin") return;

    const sid = normalize(uninstallSchoolId).toLowerCase();
    if (!sid) {
      setUninstallAccess(null);
      return;
    }
    const unsub = onValue(ref(edulockDb, `schools/${sid}/uninstallAccess`), (snapshot) => {
      if (!snapshot.exists()) {
        setUninstallAccess(null);
        return;
      }
      const v = snapshot.val() || {};
      const code = v?.code ? String(v.code) : "";
      const expiresAt = typeof v?.expiresAt === "number" ? v.expiresAt : Number(v?.expiresAt || 0);
      const createdAt = typeof v?.createdAt === "number" ? v.createdAt : Number(v?.createdAt || 0) || undefined;
      const createdBy = v?.createdBy ? String(v.createdBy) : undefined;
      if (!code || !expiresAt) {
        setUninstallAccess(null);
        return;
      }
      setUninstallAccess({ schoolId: sid, code, expiresAt, createdAt, createdBy });
    });
    return () => unsub();
  }, [role, uninstallSchoolId]);

  const navItems: [Section, string][] = useMemo(
    () => [
      ["dashboard", "Dashboard"],
      ["monitoring", "Realtime Monitoring"],
      ["tenants", "Tenants"],
      ["admins", "Admin Sekolah"],
      ["policy_center", "Policy Center"],
      ["zone_templates", "Zone Templates"],
      ["device_fleet", "Device Fleet"],
      ["command_center", "Command Center"],
      ["izin_exception", "Izin/Exception"],
      ["audit", "Audit"],
      ["integrations", "Integrations"],
      ["support", "Support"],
      ["settings", "Settings"],
    ],
    []
  );

  const latestRuntimeAdminBySchoolId = useMemo(() => {
    const map = new Map<string, RuntimeAdminRow>();
    for (const admin of runtimeAdmins) {
      if (admin.role !== "admin") continue;
      const sid = normalize(admin.schoolId).toLowerCase();
      if (!sid) continue;
      const existing = map.get(sid);
      const currentTs = Number(admin.lastLoginAt || 0) || 0;
      const previousTs = Number(existing?.lastLoginAt || 0) || 0;
      if (!existing || currentTs >= previousTs) {
        map.set(sid, admin);
      }
    }
    return map;
  }, [runtimeAdmins]);

  const latestRuntimeAdminByEmail = useMemo(() => {
    const map = new Map<string, RuntimeAdminRow>();
    for (const admin of runtimeAdmins) {
      if (admin.role !== "admin") continue;
      const email = normalize(admin.email).toLowerCase();
      if (!email) continue;
      const existing = map.get(email);
      const currentTs = Number(admin.lastLoginAt || 0) || 0;
      const previousTs = Number(existing?.lastLoginAt || 0) || 0;
      if (!existing || currentTs >= previousTs) {
        map.set(email, admin);
      }
    }
    return map;
  }, [runtimeAdmins]);

  const latestRuntimeAdminByNpsn = useMemo(() => {
    const map = new Map<string, RuntimeAdminRow>();
    for (const admin of runtimeAdmins) {
      if (admin.role !== "admin") continue;
      const npsnValue = normalize((admin as any).npsn).toLowerCase();
      if (!npsnValue) continue;
      const existing = map.get(npsnValue);
      const currentTs = Number(admin.lastLoginAt || 0) || 0;
      const previousTs = Number(existing?.lastLoginAt || 0) || 0;
      if (!existing || currentTs >= previousTs) {
        map.set(npsnValue, admin);
      }
    }
    return map;
  }, [runtimeAdmins]);

  const schoolAdminRows = useMemo<SchoolAdminAccessRow[]>(() => {
    return schools.map((school) => {
      const loginIdentifier = getSchoolAdminLoginIdentifier(school);
      const runtime =
        latestRuntimeAdminBySchoolId.get(normalize(school.schoolId).toLowerCase()) ||
        latestRuntimeAdminByEmail.get(normalize(loginIdentifier).toLowerCase()) ||
        latestRuntimeAdminByNpsn.get(normalize(school.npsn).toLowerCase());
      return {
        schoolId: school.schoolId,
        schoolName: school.name,
        npsn: school.npsn,
        loginIdentifier,
        resetEmail: getSchoolAdminResetEmail(school),
        schoolActive: school.isActive,
        accessActive: school.adminAccessActive !== false,
        runtimeUid: String(runtime?.uid || ""),
        runtimeEmail: String(runtime?.email || ""),
        runtimeLastLoginAt: runtime?.lastLoginAt ?? null,
        runtimeMustChangePassword: runtime?.mustChangePassword === true,
      };
    });
  }, [latestRuntimeAdminByEmail, latestRuntimeAdminByNpsn, latestRuntimeAdminBySchoolId, schools]);

  const stats = useMemo(() => {
    const tenantsTotal = schools.length;
    const tenantsEnabled = schools.filter((school) => school.isActive).length;
    const tenantsLive = schoolAdminRows.filter((row) => hasOperationalRuntime(row)).length;
    const adminReady = schoolAdminRows.filter((row) => schoolHasAdminLoginConfig({ npsn: row.npsn, authEmail: row.loginIdentifier, adminEmail: "" })).length;
    const adminOpen = schoolAdminRows.filter((row) => row.schoolActive && row.accessActive).length;
    return { tenantsTotal, tenantsEnabled, tenantsLive, adminReady, adminOpen };
  }, [schoolAdminRows, schools]);

  const filteredSessions = useMemo(() => {
    const sid = normalize(monitoringSchoolId).toLowerCase();
    if (!sid) return sessions;
    return sessions.filter((s: any) => normalize(s.schoolId).toLowerCase() === sid);
  }, [monitoringSchoolId, sessions]);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatus({ type, text });
    setTimeout(() => setStatus({ type: "", text: "" }), 2500);
  };

  const toggleSchoolAdminAccess = async (row: SchoolAdminAccessRow, nextActive: boolean) => {
    const schoolId = normalize(row.schoolId);
    if (!schoolId) return;
    const now = Date.now();
    setSaving(true);
    try {
      const updatesObj: Record<string, any> = {
        [`schools/${schoolId}/adminAccessActive`]: nextActive,
        [`schools/${schoolId}/updatedAt`]: now,
      };
      for (const admin of runtimeAdmins) {
        if (admin.role !== "admin") continue;
        if (normalize(admin.schoolId).toLowerCase() !== schoolId.toLowerCase()) continue;
        updatesObj[`admin_profiles/${admin.uid}/isActive`] = nextActive;
        updatesObj[`admin_profiles/${admin.uid}/updatedAt`] = now;
      }
      await update(ref(edulockDb), updatesObj);
      showStatus("success", "Akses login admin sekolah diperbarui.");
    } catch (e: any) {
      showStatus("error", `Gagal update akses admin sekolah: ${String(e?.message || e)}`);
    } finally {
      setSaving(false);
    }
  };

  const resetSchoolAdminPasswordEmail = async (row: SchoolAdminAccessRow) => {
    const email = normalize(row.resetEmail).toLowerCase();
    if (!email) {
      showStatus("error", "Isi Email Login atau Email Admin valid pada tenant registry untuk reset via email.");
      return;
    }
    setSaving(true);
    try {
      await sendPasswordResetEmail(edulockAuth, email);
      showStatus("success", `Email reset terkirim ke ${email}.`);
    } catch (err: any) {
      showStatus("error", `Gagal kirim reset: ${String(err?.message || err)}`);
    } finally {
      setSaving(false);
    }
  };

  const saveAdminApiUrl = async () => {
    const url = normalize(adminApiInput);
    setSaving(true);
    try {
      await set(ref(edulockDb, "system_config/adminApiBaseUrl"), url);
      showStatus("success", "Admin API Base URL tersimpan.");
    } catch (e: any) {
      showStatus("error", `Gagal menyimpan: ${String(e?.message || e)}`);
    } finally {
      setSaving(false);
    }
  };

  const saveSchool = async () => {
    const schoolId = normalize(schoolForm.schoolId).toLowerCase();
    if (!schoolId) {
      showStatus("error", "School ID wajib diisi.");
      return;
    }

    setSaving(true);
    try {
      const now = Date.now();
      const payload: any = {
        schoolId,
        name: normalize(schoolForm.name),
        district: normalize(schoolForm.district),
        npsn: normalize(schoolForm.npsn),
        authEmail: normalize(schoolForm.authEmail).toLowerCase(),
        adminEmail: normalize(schoolForm.adminEmail).toLowerCase(),
        backupEmail: normalize(schoolForm.backupEmail).toLowerCase(),
        isActive: schoolForm.isActive !== false,
        adminAccessActive: true,
        updatedAt: now,
        createdAt: now,
      };

      const existing = schools.find((s) => String(s.schoolId || "").toLowerCase() === schoolId);
      if (existing?.createdAt) payload.createdAt = existing.createdAt;
      if (existing?.adminAccessActive === false) payload.adminAccessActive = false;

      const updatesObj: Record<string, any> = {};
      updatesObj[`schools/${schoolId}`] = payload;
      if (payload.npsn) updatesObj[`npsn_index/${payload.npsn}`] = schoolId;
      await update(ref(edulockDb), updatesObj);

      showStatus("success", "Sekolah tersimpan.");
      setSchoolForm({
        schoolId: "",
        name: "",
        district: "",
        npsn: "",
        authEmail: "",
        adminEmail: "",
        backupEmail: profile?.email || "",
        isActive: true,
      });
    } catch (e: any) {
      showStatus("error", `Gagal simpan sekolah: ${String(e?.message || e)}`);
    } finally {
      setSaving(false);
    }
  };

  const toggleSchoolActive = async (schoolId: string, nextActive: boolean) => {
    setSaving(true);
    try {
      await update(ref(edulockDb, `schools/${schoolId}`), { isActive: nextActive, updatedAt: Date.now() });
      showStatus("success", "Status sekolah diperbarui.");
    } catch (e: any) {
      showStatus("error", `Gagal update sekolah: ${String(e?.message || e)}`);
    } finally {
      setSaving(false);
    }
  };

  const generateNumericCode = (length: number) => {
    const digits = "0123456789";
    let out = "";
    for (let i = 0; i < length; i++) out += digits[Math.floor(Math.random() * digits.length)];
    return out;
  };

  const handleGenerateUninstallCode = async () => {
    const sid = normalize(uninstallSchoolId).toLowerCase();
    if (!sid) {
      showStatus("error", "Pilih sekolah terlebih dahulu.");
      return;
    }
    const minutes = Number(uninstallDurationMinutes);
    if (!Number.isFinite(minutes) || minutes <= 0) {
      showStatus("error", "Durasi harus > 0 menit.");
      return;
    }

    const code = generateNumericCode(6);
    const nowTs = Date.now();
    const expiresAt = nowTs + Math.round(minutes * 60 * 1000);
    const createdBy = normalize(profile?.email).toLowerCase() || "super_admin";

    setSaving(true);
    try {
      await set(ref(edulockDb, `schools/${sid}/uninstallAccess`), {
        code,
        expiresAt,
        createdAt: nowTs,
        updatedAt: nowTs,
        createdBy,
      });
      showStatus("success", `Kode uninstall dibuat untuk ${sid}.`);
    } catch (e: any) {
      showStatus("error", `Gagal membuat kode: ${String(e?.message || e)}`);
    } finally {
      setSaving(false);
    }
  };

  const handleRevokeUninstallCode = async () => {
    const sid = normalize(uninstallSchoolId).toLowerCase();
    if (!sid) {
      showStatus("error", "Pilih sekolah terlebih dahulu.");
      return;
    }
    if (!window.confirm("Hapus kode uninstall aktif untuk sekolah ini?")) return;

    setSaving(true);
    try {
      await remove(ref(edulockDb, `schools/${sid}/uninstallAccess`));
      showStatus("success", "Kode uninstall dihapus.");
    } catch (e: any) {
      showStatus("error", `Gagal menghapus kode: ${String(e?.message || e)}`);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !role) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-4 text-sm text-slate-200">
          Memverifikasi akses EduLock Super Admin...
        </div>
      </div>
    );
  }

  if (role !== "super_admin") {
    return null;
  }

  const page = (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_10%,rgba(99,102,241,0.26),transparent_55%),radial-gradient(900px_circle_at_85%_15%,rgba(34,211,238,0.16),transparent_50%),radial-gradient(800px_circle_at_50%_90%,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-80">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
              <div className="border-b border-white/10 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center">
                    <img
                      src="/Logo EduLock.png"
                      alt="EduLock"
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                      
                     />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">EDULOCK</div>
                    <div className="mt-1 text-lg font-bold text-slate-100">Super Admin</div>
                    <div className="mt-1 text-xs text-slate-400">Login: {profile?.email || "-"}</div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div className="px-3 py-2 text-xs font-semibold tracking-widest text-slate-400">MENU</div>
                {navItems.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveSection(id)}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                      activeSection === id ? "bg-indigo-600 text-white" : "text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-100">Super Admin EduLock</h1>
                  <p className="mt-1 text-sm text-slate-300">
                    Control plane lintas sekolah untuk EduLock (tenants, policy, monitoring, command center, audit, dan support).
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <Link
                    to="/admin"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
                  >
                    Kembali ke Dashboard Satu Pintu
                  </Link>
                </div>
              </div>
            </div>

            {status.type && (
              <div
                className={`rounded-2xl border p-4 text-sm ${
                  status.type === "success"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
                    : "border-red-500/20 bg-red-500/10 text-red-100"
                }`}
              >
                {status.text}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
                <div className="text-xs font-semibold tracking-widest text-slate-400">TOTAL TENANT</div>
                <div className="mt-1 text-2xl font-bold text-white">{stats.tenantsTotal}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
                <div className="text-xs font-semibold tracking-widest text-slate-400">TENANT DIBUKA</div>
                <div className="mt-1 text-2xl font-bold text-white">{stats.tenantsEnabled}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
                <div className="text-xs font-semibold tracking-widest text-slate-400">TENANT LIVE</div>
                <div className="mt-1 text-2xl font-bold text-white">{stats.tenantsLive}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
                <div className="text-xs font-semibold tracking-widest text-slate-400">LOGIN DIBUKA</div>
                <div className="mt-1 text-2xl font-bold text-white">{stats.adminOpen}</div>
              </div>
            </div>

            {activeSection === "dashboard" && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
                <div className="text-sm font-semibold text-slate-100">Dashboard</div>
                <div className="mt-1 text-sm text-slate-300">
                  Ringkasan: tenants, admin aktif, session aktif, serta audit terbaru. Menu lain disiapkan bertahap sesuai arsitektur.
                </div>
              </div>
            )}

            {activeSection === "admins" && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="text-sm font-semibold text-slate-100">Admin Sekolah ({schoolAdminRows.length})</div>
                  <div className="mt-1 text-xs text-slate-400">
                    Super admin mengontrol login admin sekolah dari tenant registry. `admin_profiles` hanya dipakai sebagai runtime profile saat admin sudah login.
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">LOGIN ADMIN</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">SEKOLAH</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">LOGIN TERAKHIR</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">STATUS</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold tracking-widest text-slate-300">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {schoolAdminRows.map((a) => (
                        <tr key={a.schoolId} className="hover:bg-white/5">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-white">{a.loginIdentifier || "-"}</div>
                            <div className="text-xs text-slate-400">
                              {a.resetEmail ? `Reset via ${a.resetEmail}` : a.npsn ? `Login awal: NPSN ${a.npsn}` : "Lengkapi NPSN atau email login"}
                            </div>
                            {a.runtimeEmail && a.runtimeEmail !== a.loginIdentifier && (
                              <div className="text-xs text-slate-500">Runtime: {a.runtimeEmail}</div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-slate-200">{a.schoolName || "-"}</div>
                            <div className="text-xs text-slate-400">{a.schoolId || ""}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-200">{formatTs(a.runtimeLastLoginAt)}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                a.schoolActive && a.accessActive
                                  ? "bg-emerald-500/10 text-emerald-100 ring-1 ring-inset ring-emerald-400/20"
                                  : "bg-red-500/10 text-red-100 ring-1 ring-inset ring-red-400/20"
                              }`}
                            >
                              {a.schoolActive && a.accessActive ? "Login Dibuka" : "Login Ditutup"}
                            </span>
                            {!a.schoolActive && (
                              <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-700/80 text-slate-100 ring-1 ring-inset ring-slate-500/30">
                                Tenant Ditutup
                              </span>
                            )}
                            {hasOperationalRuntime(a) ? (
                              <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-cyan-500/10 text-cyan-100 ring-1 ring-inset ring-cyan-400/20">
                                Live
                              </span>
                            ) : (
                              <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-700/80 text-slate-100 ring-1 ring-inset ring-slate-500/30">
                                Belum Live
                              </span>
                            )}
                            {a.runtimeMustChangePassword && (
                              <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-500/10 text-yellow-100 ring-1 ring-inset ring-yellow-400/20">
                                Wajib ganti
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right space-x-2">
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => toggleSchoolAdminAccess(a, !a.accessActive)}
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                            >
                              {a.accessActive ? "Tutup Login" : "Buka Login"}
                            </button>
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => resetSchoolAdminPasswordEmail(a)}
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                            >
                              Reset via Email
                            </button>
                          </td>
                        </tr>
                      ))}
                      {schoolAdminRows.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                            Belum ada data admin sekolah.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "tenants" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                  <div className="text-sm font-semibold text-slate-100">Tambah / Update Sekolah</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">SCHOOL ID</label>
                      <input
                        value={schoolForm.schoolId}
                        onChange={(e) => setSchoolForm((s) => ({ ...s, schoolId: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                        placeholder="contoh: smpn_3_pacet"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">NAMA</label>
                      <input
                        value={schoolForm.name}
                        onChange={(e) => setSchoolForm((s) => ({ ...s, name: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                        placeholder="SMPN 3 PACET"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">KECAMATAN</label>
                      <input
                        value={schoolForm.district}
                        onChange={(e) => setSchoolForm((s) => ({ ...s, district: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                        placeholder="Pacet"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">NPSN</label>
                      <input
                        value={schoolForm.npsn}
                        onChange={(e) => setSchoolForm((s) => ({ ...s, npsn: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                        placeholder="20555784"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">EMAIL LOGIN</label>
                      <input
                        value={schoolForm.authEmail}
                        onChange={(e) => setSchoolForm((s) => ({ ...s, authEmail: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                        placeholder="20555784@edulock.local / email valid"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">EMAIL ADMIN</label>
                      <input
                        value={schoolForm.adminEmail}
                        onChange={(e) => setSchoolForm((s) => ({ ...s, adminEmail: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                        placeholder="admin@sekolah.id"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">EMAIL BACKUP</label>
                      <input
                        value={schoolForm.backupEmail}
                        onChange={(e) => setSchoolForm((s) => ({ ...s, backupEmail: e.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                        placeholder={profile?.email || "email backup"}
                      />
                    </div>
                    <div className="flex items-center gap-2 sm:mt-7">
                      <input
                        id="schoolActive"
                        type="checkbox"
                        checked={schoolForm.isActive}
                        onChange={(e) => setSchoolForm((s) => ({ ...s, isActive: e.target.checked }))}
                      />
                      <label htmlFor="schoolActive" className="text-sm text-slate-200">
                        Tenant dibuka
                      </label>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={saveSchool}
                      className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                    >
                      Simpan Sekolah
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="text-sm font-semibold text-slate-100">Daftar Sekolah ({schools.length})</div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-sm">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">SEKOLAH</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">NPSN</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">EMAIL</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">STATUS</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold tracking-widest text-slate-300">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {schools.map((s) => (
                          <tr key={s.schoolId} className="hover:bg-white/5">
                            <td className="px-4 py-3">
                              <div className="font-semibold text-white">{s.name || "-"}</div>
                              <div className="text-xs text-slate-400">
                                {s.schoolId} {s.district ? `• ${s.district}` : ""}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-200">{s.npsn || "-"}</td>
                            <td className="px-4 py-3">
                              <div className="text-slate-200">{s.adminEmail || "-"}</div>
                              <div className="text-xs text-slate-400">{s.authEmail || ""}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-700/80 text-slate-100 ring-1 ring-inset ring-slate-500/30">
                                Terdaftar
                              </span>
                              <span
                                className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  s.isActive
                                    ? "bg-cyan-500/10 text-cyan-100 ring-1 ring-inset ring-cyan-400/20"
                                    : "bg-amber-500/10 text-amber-100 ring-1 ring-inset ring-amber-400/20"
                                }`}
                              >
                                {s.isActive ? "Tenant Dibuka" : "Tenant Ditutup"}
                              </span>
                              <span
                                className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  s.adminAccessActive !== false
                                    ? "bg-cyan-500/10 text-cyan-100 ring-1 ring-inset ring-cyan-400/20"
                                    : "bg-amber-500/10 text-amber-100 ring-1 ring-inset ring-amber-400/20"
                                }`}
                              >
                                {s.adminAccessActive !== false ? "Login Dibuka" : "Login Ditutup"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right space-x-2">
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() =>
                                  setSchoolForm({
                                    schoolId: s.schoolId || "",
                                    name: s.name || "",
                                    district: s.district || "",
                                    npsn: s.npsn || "",
                                    authEmail: s.authEmail || "",
                                    adminEmail: s.adminEmail || "",
                                    backupEmail: s.backupEmail || "",
                                    isActive: s.isActive !== false,
                                  })
                                }
                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                disabled={saving}
                                onClick={() => toggleSchoolActive(String(s.schoolId), !s.isActive)}
                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                              >
                                {s.isActive ? "Tutup Tenant" : "Buka Tenant"}
                              </button>
                            </td>
                          </tr>
                        ))}
                        {schools.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                              Belum ada data sekolah.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "monitoring" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                  <div className="text-sm font-semibold text-slate-100">Filter Monitoring</div>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">SCHOOL ID</label>
                      <select
                        value={monitoringSchoolId}
                        onChange={(e) => setMonitoringSchoolId(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white"
                      >
                        <option value="">Semua Sekolah</option>
                        {schools.map((s: any) => (
                          <option key={s.schoolId} value={s.schoolId}>
                            {s.name || s.schoolId}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-sm text-slate-300">
                      Session aktif: <span className="font-semibold text-white">{filteredSessions.length}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <div className="text-sm font-semibold text-slate-100">Active Sessions</div>
                    <div className="text-xs text-slate-400">Data dari node active_sessions dan presence/{`{schoolId}`}.</div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-sm">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">NISN</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">SEKOLAH</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">STATUS</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">TERAKHIR UPDATE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filteredSessions.map((s: any) => {
                          const ts = Number(s.updatedAt || s.lastUpdated || s.lastSeen || 0) || null;
                          const schoolId = normalize(s.schoolId);
                          const presence = schoolId ? presenceByNisn[String(s.nisn)] : null;
                          const inside = typeof presence?.isInsideZone === "boolean" ? presence.isInsideZone : s.isInsideZone;
                          const inet = typeof presence?.isInternetActive === "boolean" ? presence.isInternetActive : s.isInternetActive;
                          return (
                            <tr key={String(s.nisn)} className="hover:bg-white/5">
                              <td className="px-4 py-3 font-semibold text-white">{String(s.nisn || "-")}</td>
                              <td className="px-4 py-3">
                                <div className="text-slate-200">{normalize(s.schoolName) || "-"}</div>
                                <div className="text-xs text-slate-400">{schoolId || "-"}</div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-slate-200">
                                  {inside === true ? "Di Zona" : inside === false ? "Di Luar" : "-"} •{" "}
                                  {inet === true ? "Internet ON" : inet === false ? "Internet OFF" : "-"}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-slate-200">{formatTs(ts)}</td>
                            </tr>
                          );
                        })}
                        {filteredSessions.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                              Tidak ada session aktif.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "audit" && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10">
                  <div className="text-sm font-semibold text-slate-100">Audit Log (Violations) - 200 terbaru</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">WAKTU</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">NISN</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">TIPE</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">DESKRIPSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {logs.map((l: any) => (
                        <tr key={l.id} className="hover:bg-white/5">
                          <td className="px-4 py-3 text-slate-200">{formatTs(l.timestamp)}</td>
                          <td className="px-4 py-3 font-semibold text-white">{l.nisn || "-"}</td>
                          <td className="px-4 py-3 text-slate-200">{l.type || "-"}</td>
                          <td className="px-4 py-3 text-slate-200">{l.description || "-"}</td>
                        </tr>
                      ))}
                      {logs.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                            Belum ada audit log.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                <div className="text-sm font-semibold text-slate-100">System Settings</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">ADMIN API BASE URL</label>
                    <input
                      value={adminApiInput}
                      onChange={(e) => setAdminApiInput(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="https://...."
                    />
                    <div className="mt-2 text-xs text-slate-400">Tersimpan: {adminApiConfigUrl || "-"}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={saveAdminApiUrl}
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            )}

            {activeSection === "command_center" && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                  <div className="text-sm font-semibold text-slate-100">Kode Uninstall (Sekolah)</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Buat kode uninstall sementara untuk sekolah tertentu. Kode ini akan ditampilkan di dashboard Admin Sekolah pada menu Pengaturan Sistem.
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">SEKOLAH</label>
                      <select
                        value={uninstallSchoolId}
                        onChange={(e) => setUninstallSchoolId(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white"
                      >
                        <option value="">Pilih sekolah</option>
                        {schools.map((s: any) => (
                          <option key={s.schoolId} value={s.schoolId}>
                            {s.name || s.schoolId}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest text-slate-400">DURASI (MENIT)</label>
                      <input
                        type="number"
                        min={1}
                        value={String(uninstallDurationMinutes)}
                        onChange={(e) => setUninstallDurationMinutes(Number(e.target.value || 0))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleGenerateUninstallCode}
                      className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                    >
                      Buat Kode
                    </button>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleRevokeUninstallCode}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                    >
                      Hapus Kode
                    </button>
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold tracking-widest text-slate-400">KODE AKTIF</div>
                    {uninstallAccess && uninstallAccess.expiresAt > Date.now() ? (
                      <div className="mt-2 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                        <div>
                          <div className="text-2xl font-bold tracking-widest text-white">{uninstallAccess.code}</div>
                          <div className="mt-1 text-xs text-slate-300">Berlaku sampai {formatTs(uninstallAccess.expiresAt)}</div>
                          {uninstallAccess.createdBy ? (
                            <div className="mt-1 text-xs text-slate-400">Dibuat oleh: {uninstallAccess.createdBy}</div>
                          ) : null}
                          <div className="mt-3 flex gap-2">
                            <button
                              type="button"
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(uninstallAccess.code);
                                  showStatus("success", "Kode disalin.");
                                } catch {
                                  showStatus("error", "Gagal menyalin kode.");
                                }
                              }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div className="inline-flex items-center justify-center rounded-2xl bg-white p-3">
                          <QRCode value={uninstallAccess.code} size={132} />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-slate-400 italic">Belum ada kode aktif atau sudah kedaluwarsa.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection !== "dashboard" &&
              activeSection !== "admins" &&
              activeSection !== "tenants" &&
              activeSection !== "monitoring" &&
              activeSection !== "audit" &&
              activeSection !== "command_center" &&
              activeSection !== "settings" && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
                  <div className="text-sm font-semibold text-slate-100">Dalam Pengembangan</div>
                  <div className="mt-1 text-sm text-slate-300">Menu ini disiapkan sesuai arsitektur Super Admin.</div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );

  return page;
} 
