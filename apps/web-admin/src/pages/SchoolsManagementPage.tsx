import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";

type SuperDbSection =
  | "tenants"
  | "school_admins"
  | "principals"
  | "platform_users"
  | "rbac"
  | "audit"
  | "sync_jobs"
  | "data_quality"
  | "settings";

export default function SchoolsManagementPage() {
  const session = useAuthGuard();
  const queryClient = useQueryClient();

  const [superSection, setSuperSection] = useState<SuperDbSection>("tenants");
  const [superSaving, setSuperSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "" | "success" | "error"; text: string }>({ type: "", text: "" });

  const [superSchoolForm, setSuperSchoolForm] = useState({
    schoolId: "",
    name: "",
    district: "",
    npsn: "",
    authEmail: "",
    adminEmail: "",
    backupEmail: "",
    isActive: true,
  });

  const [principalForm, setPrincipalForm] = useState({
    username: "",
    name: "",
    schoolId: "",
    schoolName: "",
    password: "",
    isActive: true,
  });
  const [principalQuery, setPrincipalQuery] = useState("");

  const { data: schoolsData, isLoading } = useQuery({
    queryKey: ["schools"],
    queryFn: () => api.getSchools(session!.sessionId),
    enabled: !!session?.sessionId,
  });

  const superSchools = schoolsData?.schools || [];

  // Dummy data for V2 POC to show the UI
  const superSchoolAdmins = [
    { loginIdentifier: "admin@smpn3.id", schoolName: "SMPN 3 PACET", schoolId: "smpn3pacet", accessActive: true, schoolActive: true, runtimeLastLoginAt: Date.now() - 86400000 },
    { loginIdentifier: "admin@sdn1.id", schoolName: "SDN 1 MOJOSARI", schoolId: "sdn1mojosari", accessActive: false, schoolActive: true, runtimeLastLoginAt: null }
  ];

  const superPrincipals = [
    { username: "kepsek_smpn3", name: "Budi Santoso", schoolName: "SMPN 3 PACET", schoolId: "smpn3pacet", isActive: true, lastLoginAt: Date.now() - 3600000, deviceId: "DEV123" }
  ];

  const superViolations = [
    { id: "1", timestamp: Date.now(), nisn: "1234567890", type: "Terlambat", description: "Masuk gerbang 07:15" },
    { id: "2", timestamp: Date.now() - 86400000, nisn: "0987654321", type: "Atribut", description: "Tidak pakai dasi" }
  ];
  
  const filteredSuperPrincipals = superPrincipals.filter(p => p.username.includes(principalQuery) || p.name.includes(principalQuery));

  const superStats = useMemo(() => {
    const tenantsTotal = superSchools.length;
    const tenantsEnabled = superSchools.filter((s) => s.status === "active").length;
    const tenantsLive = tenantsEnabled > 0 ? tenantsEnabled : 0;
    const adminsTotal = tenantsTotal;
    const tenantsWithAdmin = tenantsTotal;
    const tenantsMissingAdmin = Math.max(0, tenantsTotal - tenantsWithAdmin);
    return { tenantsTotal, tenantsEnabled, tenantsLive, adminsTotal, tenantsWithAdmin, tenantsMissingAdmin };
  }, [superSchools]);

  const createMutation = useMutation({
    mutationFn: async (schoolData: any) => {
      // Mocking create school since no endpoint exists yet
      await new Promise(r => setTimeout(r, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      setStatus({ type: "success", text: "Sekolah berhasil disimpan." });
      setSuperSchoolForm({
        schoolId: "",
        name: "",
        district: "",
        npsn: "",
        authEmail: "",
        adminEmail: "",
        backupEmail: "",
        isActive: true,
      });
    },
    onError: (error: any) => {
      setStatus({ type: "error", text: `Gagal simpan sekolah: ${error.message}` });
    },
    onSettled: () => {
      setSuperSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 3000);
    },
  });

  const saveSuperSchool = () => {
    if (!superSchoolForm.schoolId) {
      setStatus({ type: "error", text: "School ID wajib diisi." });
      return;
    }
    setSuperSaving(true);
    setStatus({ type: "", text: "" });
    createMutation.mutate({
      schoolId: superSchoolForm.schoolId,
      name: superSchoolForm.name,
    });
  };

  const menu: Array<[SuperDbSection, string]> = [
    ["tenants", "Sekolah / Tenant Registry"],
    ["school_admins", "Admin Sekolah"],
    ["principals", "Akun Kepala Sekolah"],
    ["platform_users", "Users Platform"],
    ["rbac", "Role & Permission (RBAC)"],
    ["audit", "Audit Log (Global)"],
    ["sync_jobs", "Data & Sinkronisasi"],
    ["data_quality", "Data Quality"],
    ["settings", "Settings (Global)"],
  ];

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(99,102,241,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(34,211,238,0.18),transparent_50%),radial-gradient(800px_circle_at_50%_85%,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 sm:flex-row sm:p-6 lg:p-8">
        <aside className="w-full sm:w-64 lg:w-72 shrink-0 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur">
            <div className="border-b border-white/10 p-4">
              <div className="text-sm font-semibold text-slate-200">Database Induk</div>
              <div className="mt-1 text-xs text-slate-400">Mode Super Admin (lintas sekolah)</div>
            </div>
            <div className="p-2">
              {menu.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSuperSection(id)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                    superSection === id ? "bg-indigo-600 text-white" : "text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Database Induk — Super Admin</h1>
                <p className="mt-1 text-sm text-slate-300">
                  Control plane database untuk tenant (sekolah), akun, RBAC, audit, dan sinkronisasi lintas modul.
                </p>
              </div>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
              >
                Kembali ke Dashboard Satu Pintu
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Workflow Super Admin</div>
                <div className="mt-1 text-sm text-slate-300">
                  Alur kerja standar: (1) buat sekolah → (2) set admin → (3) cek audit/monitoring.
                </div>
              </div>
              <div className="text-xs text-slate-400">
                Step aktif:{" "}
                {superSection === "tenants" ? "1" : superSection === "school_admins" ? "2" : superSection === "audit" ? "3" : "-"}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setSuperSection("tenants")}
                className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                  superSection === "tenants" ? "border-indigo-400/30 bg-indigo-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-extrabold text-slate-100 ring-1 ring-white/10">
                  1
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">Buat Sekolah</div>
                  <div className="mt-1 text-xs text-slate-300">Daftarkan tenant, NPSN, email login/admin, dan status buka/tutup tenant.</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSuperSection("school_admins")}
                className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                  superSection === "school_admins" ? "border-indigo-400/30 bg-indigo-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-extrabold text-slate-100 ring-1 ring-white/10">
                  2
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">Set Admin</div>
                  <div className="mt-1 text-xs text-slate-300">Aktivasi/nonaktif admin sekolah, reset password, dan validasi akses.</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSuperSection("audit")}
                className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                  superSection === "audit" ? "border-indigo-400/30 bg-indigo-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-extrabold text-slate-100 ring-1 ring-white/10">
                  3
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white">Cek Audit/Monitoring</div>
                  <div className="mt-1 text-xs text-slate-300">Pantau log kejadian terbaru untuk memastikan operasional tenant berjalan.</div>
                </div>
              </button>
            </div>
          </div>

          {status.type && (
            <div
              className={`rounded-2xl border p-4 text-sm ${
                status.type === "success" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100" : "border-red-500/20 bg-red-500/10 text-red-100"
              }`}
            >
              {status.text}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
              <div className="text-xs font-semibold tracking-widest text-slate-400">TENANTS</div>
              <div className="mt-1 text-2xl font-bold text-white">{superStats.tenantsTotal}</div>
              <div className="mt-1 text-sm text-slate-300">Total sekolah</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
              <div className="text-xs font-semibold tracking-widest text-slate-400">TENANT DIBUKA</div>
              <div className="mt-1 text-2xl font-bold text-white">{superStats.tenantsEnabled}</div>
              <div className="mt-1 text-sm text-slate-300">Tenant tidak ditutup pusat</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
              <div className="text-xs font-semibold tracking-widest text-slate-400">ADMIN</div>
              <div className="mt-1 text-2xl font-bold text-white">{superStats.adminsTotal}</div>
              <div className="mt-1 text-sm text-slate-300">
                Terprovisi: {superStats.tenantsWithAdmin}/{superStats.tenantsTotal} sekolah
              </div>
              <div className="mt-1 text-xs text-slate-400">Belum ada admin: {superStats.tenantsMissingAdmin}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
              <div className="text-xs font-semibold tracking-widest text-slate-400">TENANT LIVE</div>
              <div className="mt-1 text-2xl font-bold text-white">{superStats.tenantsLive}</div>
              <div className="mt-1 text-sm text-slate-300">Sudah pernah dipakai login</div>
            </div>
          </div>

          {superSection === "tenants" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                <div className="text-sm font-semibold text-white">Tambah / Update Sekolah</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">SCHOOL ID</label>
                    <input
                      value={superSchoolForm.schoolId}
                      onChange={(e) => setSuperSchoolForm((s) => ({ ...s, schoolId: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="contoh: smpn_3_pacet"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">NAMA</label>
                    <input
                      value={superSchoolForm.name}
                      onChange={(e) => setSuperSchoolForm((s) => ({ ...s, name: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="SMPN 3 PACET"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">KECAMATAN</label>
                    <input
                      value={superSchoolForm.district}
                      onChange={(e) => setSuperSchoolForm((s) => ({ ...s, district: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="Pacet"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">NPSN</label>
                    <input
                      value={superSchoolForm.npsn}
                      onChange={(e) => setSuperSchoolForm((s) => ({ ...s, npsn: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="20555784"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">EMAIL LOGIN</label>
                    <input
                      value={superSchoolForm.authEmail}
                      onChange={(e) => setSuperSchoolForm((s) => ({ ...s, authEmail: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="20555784@edulock.local / email valid"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">EMAIL ADMIN</label>
                    <input
                      value={superSchoolForm.adminEmail}
                      onChange={(e) => setSuperSchoolForm((s) => ({ ...s, adminEmail: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="admin@sekolah.id"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">EMAIL BACKUP</label>
                    <input
                      value={superSchoolForm.backupEmail}
                      onChange={(e) => setSuperSchoolForm((s) => ({ ...s, backupEmail: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="email backup"
                    />
                  </div>
                  <div className="flex items-center gap-2 sm:mt-7">
                    <input
                      id="schoolActiveSuper"
                      type="checkbox"
                      checked={superSchoolForm.isActive}
                      onChange={(e) => setSuperSchoolForm((s) => ({ ...s, isActive: e.target.checked }))}
                    />
                    <label htmlFor="schoolActiveSuper" className="text-sm text-slate-200">
                      Tenant dibuka
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    disabled={superSaving}
                    onClick={saveSuperSchool}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60 transition"
                  >
                    Simpan
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
                <div className="border-b border-white/10 p-4">
                  <div className="text-sm font-semibold text-white">Daftar Sekolah ({superSchools.length})</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">SEKOLAH</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">NPSN</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">REGISTRY</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">OPERASIONAL</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold tracking-widest text-slate-300">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {isLoading ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-400">Memuat data...</td>
                        </tr>
                      ) : superSchools.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-400">Belum ada sekolah terdaftar.</td>
                        </tr>
                      ) : (
                        superSchools.map((s) => (
                          <tr key={s.schoolId} className="hover:bg-white/5">
                            <td className="px-4 py-3">
                              <div className="text-2xl font-bold tracking-widest text-indigo-300">{(s as any).npsn || "-"}</div>
                              <div className="mt-1 text-xs text-slate-400">Status: {s.status}</div>
                            </td>
                            <td className="px-4 py-3 text-slate-200">{(s as any).npsn || "-"}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-700/80 text-slate-100 ring-1 ring-slate-500/30">
                                Terdaftar
                              </span>
                              <span
                                className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  s.status === "active" ? "bg-cyan-500/10 text-cyan-100 ring-1 ring-cyan-400/20" : "bg-amber-500/10 text-amber-100 ring-1 ring-amber-400/20"
                                }`}
                              >
                                {s.status === "active" ? "Tenant Dibuka" : "Tenant Ditutup"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-400/20">
                                Login Siap
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right space-x-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setSuperSchoolForm({
                                    schoolId: s.schoolId,
                                    name: s.name,
                                    district: (s as any).district || "",
                                    npsn: (s as any).npsn || "",
                                    authEmail: "",
                                    adminEmail: "",
                                    backupEmail: "",
                                    isActive: s.status === "active",
                                  })
                                }
                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/10 transition"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {superSection === "school_admins" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
              <div className="border-b border-white/10 p-4">
                <div className="text-sm font-semibold text-white">Admin Sekolah ({superSchoolAdmins.length})</div>
                <div className="mt-1 text-xs text-slate-400">
                  DATABASE super admin hanya mengontrol akun login admin sekolah. User internal sekolah tetap dikelola di DATABASE tenant masing-masing.
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
                    {superSchoolAdmins.map((a, i) => (
                      <tr key={i} className="hover:bg-white/5">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-white">{a.loginIdentifier}</div>
                          <div className="text-xs text-slate-400">Login awal</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-slate-200">{a.schoolName}</div>
                          <div className="text-xs text-slate-400">{a.schoolId}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-200">
                           {a.runtimeLastLoginAt ? new Date(a.runtimeLastLoginAt).toLocaleString("id-ID") : "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.accessActive ? 'bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-400/20' : 'bg-red-500/10 text-red-100 ring-1 ring-red-400/20'}`}>
                            {a.accessActive ? "Login Dibuka" : "Login Ditutup"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 transition">
                            {a.accessActive ? "Tutup Login" : "Buka Login"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {superSection === "principals" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                <div className="text-sm font-semibold text-white">Tambah / Update Akun Kepala Sekolah</div>
                <div className="mt-1 text-sm text-slate-300">
                  Akun ini dipakai untuk login APK Kepala Sekolah. Scope data terkunci lewat schoolId.
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">USERNAME</label>
                    <input
                      value={principalForm.username}
                      onChange={(e) => setPrincipalForm((s) => ({ ...s, username: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="contoh: kepsek_smpn3pacet"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">NAMA</label>
                    <input
                      value={principalForm.name}
                      onChange={(e) => setPrincipalForm((s) => ({ ...s, name: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="Nama Kepala Sekolah"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">SCHOOL ID</label>
                    <input
                      value={principalForm.schoolId}
                      onChange={(e) => setPrincipalForm((s) => ({ ...s, schoolId: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="smpn_3_pacet"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest text-slate-400">PASSWORD / NIP</label>
                    <input
                      value={principalForm.password}
                      onChange={(e) => setPrincipalForm((s) => ({ ...s, password: e.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                      placeholder="Wajib untuk akun baru"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 transition">
                    Simpan
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
                <div className="border-b border-white/10 p-4">
                  <div className="flex justify-between items-center">
                     <div className="text-sm font-semibold text-white">Akun Kepala Sekolah</div>
                     <input
                        value={principalQuery}
                        onChange={(e) => setPrincipalQuery(e.target.value)}
                        className="rounded-xl border border-white/10 bg-slate-800 px-3 py-1 text-sm text-white placeholder:text-slate-400 w-64"
                        placeholder="Cari username..."
                      />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-sm">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">AKUN</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">SEKOLAH</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">LOGIN TERAKHIR</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">STATUS</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold tracking-widest text-slate-300">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredSuperPrincipals.map((p, i) => (
                         <tr key={i} className="hover:bg-white/5">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-white">{p.username}</div>
                            <div className="text-xs text-slate-400">{p.name}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-slate-200">{p.schoolName}</div>
                            <div className="text-xs text-slate-400">{p.schoolId}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-200">
                             {p.lastLoginAt ? new Date(p.lastLoginAt).toLocaleString("id-ID") : "-"}
                          </td>
                          <td className="px-4 py-3">
                             <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-400/20">
                              Aktif
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right space-x-2">
                             <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 transition">Edit</button>
                          </td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {superSection === "audit" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
              <div className="border-b border-white/10 p-4">
                <div className="text-sm font-semibold text-white">Audit Log (Violations) — 200 terbaru</div>
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
                     {superViolations.map((l, i) => (
                       <tr key={i} className="hover:bg-white/5">
                         <td className="px-4 py-3 text-slate-200">{new Date(l.timestamp).toLocaleString("id-ID")}</td>
                         <td className="px-4 py-3 font-semibold text-white">{l.nisn}</td>
                         <td className="px-4 py-3 text-slate-200">{l.type}</td>
                         <td className="px-4 py-3 text-slate-200">{l.description}</td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {superSection !== "tenants" && superSection !== "school_admins" && superSection !== "principals" && superSection !== "audit" && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
              <div className="text-sm font-semibold text-white">Dalam Pengembangan (V2)</div>
              <div className="mt-1 text-sm text-slate-300">
                Menu ini disiapkan sesuai arsitektur Super Admin dan akan diaktifkan setelah API microservices baru selesai dibuat.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
