"use client";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { Suspense, useEffect, useMemo, useState } from "react";






import { useSessionStore } from "@/store/session-store";
import {
  onValue, ref, remove, set, update, push, get, orderByChild, equalTo,
  dbQuery, sendPasswordResetEmail, database, edulockDb, edulockAuth
} from "@/lib/mockFirebaseAdapter";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
const XLSX = { utils: { json_to_sheet: (...args: any[]) => ({} as any), aoa_to_sheet: (...args: any[]) => ({} as any), book_new: (...args: any[]) => ({} as any), book_append_sheet: (...args: any[]) => ({} as any), sheet_to_json: (...args: any[]) => ([] as any) }, writeFile: (...args: any[]) => {}, write: (...args: any[]) => {}, read: (...args: any[]) => ({} as any) } as any;
import {
  ArrowLeft,
  Download,
  FileSpreadsheet,
  Lock,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
} from "lucide-react";

async function sha256Hex(input: string): Promise<string> {
  const text = String(input || "");
  if (typeof window === "undefined" || !window.crypto?.subtle) return "";
  const data = new TextEncoder().encode(text);
  const hash = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type StudentRow = {
  nisn: string;
  name: string;
  gender?: "L" | "P" | "";
  religion?: "ISLAM" | "NON_ISLAM" | "";
  class: string;
  status?: "Aktif" | "Nonaktif" | "";
  device?: string;
  schoolId?: string;
  schoolName?: string;
  npsn?: string;
  createdAt?: number;
  updatedAt?: number;
};

type TeacherRow = {
  nuptk: string;
  name: string;
  class: string;
  status?: "Aktif" | "Nonaktif" | "";
  schoolId?: string;
  schoolName?: string;
  npsn?: string;
  createdAt?: number;
  updatedAt?: number;
};

type StaffRow = {
  nisn: string;
  position?: string;
  status?: "Aktif" | "Nonaktif" | "";
  role?: "osis" | "";
  schoolId?: string;
  schoolName?: string;
  npsn?: string;
  createdAt?: number;
  updatedAt?: number;
};

type TatibRow = {
  username: string;
  name: string;
  password?: string;
  role?: string;
  isActive?: boolean;
  deviceId?: string;
  schoolId?: string;
  schoolName?: string;
  npsn?: string;
  createdAt?: number;
  updatedAt?: number;
};

type ClassRow = {
  className: string;
  grade: 7 | 8 | 9;
  disabled?: boolean;
  schoolId?: string;
  schoolName?: string;
  npsn?: string;
  createdAt?: number;
  updatedAt?: number;
};

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

type SuperPrincipalRow = {
  username: string;
  name: string;
  schoolId: string;
  schoolName: string;
  isActive: boolean;
  deviceId?: string | null;
  device?: string | null;
  credentialHash?: string | null;
  lastLoginAt?: number | null;
  createdAt?: number | null;
  updatedAt?: number | null;
};

type SuperSchoolRow = {
  schoolId: string;
  name: string;
  district: string;
  npsn: string;
  authEmail: string;
  adminEmail: string;
  backupEmail: string;
  isActive: boolean;
  adminAccessActive: boolean;
  createdAt?: number | null;
  updatedAt?: number | null;
};

type SuperAdminProfileRow = {
  uid: string;
  email: string;
  role: "super_admin" | "admin";
  isActive: boolean;
  schoolId: string;
  schoolName: string;
  npsn?: string;
  lastLoginAt?: number | null;
  mustChangePassword?: boolean;
  passwordChangedAt?: number | null;
};

type SuperViolationRow = {
  id: string;
  nisn: string;
  type: string;
  description: string;
  timestamp: number | null;
};

type SuperSchoolAdminRow = {
  schoolId: string;
  schoolName: string;
  npsn: string;
  schoolActive: boolean;
  accessActive: boolean;
  loginIdentifier: string;
  resetEmail: string;
  runtimeUid: string;
  runtimeEmail: string;
  runtimeLastLoginAt?: number | null;
  runtimeMustChangePassword: boolean;
  runtimeIsActive: boolean;
};

function normalize(value: unknown): string {
  return String(value || "").trim();
}

function getSchoolAdminResetEmail(school: Pick<SuperSchoolRow, "authEmail" | "adminEmail">): string {
  const authEmail = normalize(school.authEmail).toLowerCase();
  const adminEmail = normalize(school.adminEmail).toLowerCase();
  if (authEmail.includes("@") && !authEmail.endsWith("@edulock.local")) return authEmail;
  if (adminEmail.includes("@") && !adminEmail.endsWith("@edulock.local")) return adminEmail;
  return "";
}

function getSchoolAdminLoginIdentifier(school: Pick<SuperSchoolRow, "npsn" | "authEmail" | "adminEmail">): string {
  const authEmail = normalize(school.authEmail).toLowerCase();
  const adminEmail = normalize(school.adminEmail).toLowerCase();
  const npsn = normalize(school.npsn);
  if (authEmail) return authEmail;
  if (adminEmail) return adminEmail;
  if (npsn) return `${npsn}@edulock.local`;
  return "";
}

function schoolHasAdminLoginConfig(school: Pick<SuperSchoolRow, "npsn" | "authEmail" | "adminEmail">): boolean {
  return Boolean(getSchoolAdminLoginIdentifier(school));
}

function hasOperationalRuntime(row?: Pick<SuperSchoolAdminRow, "runtimeUid" | "runtimeLastLoginAt"> | null): boolean {
  if (!row) return false;
  if (normalize(row.runtimeUid)) return true;
  return Number(row.runtimeLastLoginAt || 0) > 0;
}

function formatDateTime(ts?: number): string {
  if (!ts) return "-";
  try {
    return new Date(ts).toLocaleString("id-ID");
  } catch {
    return "-";
  }
}

function toGradeFromClass(className: string): 7 | 8 | 9 | 0 {
  const v = normalize(className).toUpperCase();
  if (!v) return 0;
  if (v.startsWith("VIII")) return 8;
  if (v.startsWith("VII")) return 7;
  if (v.startsWith("IX")) return 9;
  return 0;
}

function generateSecurePassword(length = 10): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  if (typeof window === "undefined" || !window.crypto?.getRandomValues) return "";
  const bytes = new Uint32Array(length);
  window.crypto.getRandomValues(bytes);
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += alphabet[bytes[i] % alphabet.length];
  }
  return result;
}

function romanFromGrade(grade: 7 | 8 | 9): "VII" | "VIII" | "IX" {
  if (grade === 7) return "VII";
  if (grade === 8) return "VIII";
  return "IX";
}

function buildClassName(raw: string, grade: 7 | 8 | 9): string {
  const v = normalize(raw).toUpperCase();
  if (!v) return "";
  const m = v.match(/^(VIII|VII|IX)[\s-]?(.*)$/);
  if (m) {
    const roman = m[1] as "VII" | "VIII" | "IX";
    const suffix = normalize(m[2]).replace(/^[\s-]+/, "");
    if (!suffix) return roman;
    return `${roman}-${suffix}`;
  }
  const suffix = v.replace(/^[\s-]+/, "");
  return `${romanFromGrade(grade)}-${suffix}`;
}

function compareClassNames(a: string, b: string): number {
  const parse = (raw: string): { grade: number; suffix: string } => {
    let v = normalize(raw).toUpperCase();
    v = v.replace(/^KELAS\s+/, "");
    v = v.replace(/^KLS\s+/, "");
    const m1 = v.match(/^(VIII|VII|IX)\s*[-._\s]?\s*(.*)$/);
    const m = m1 || v.match(/(VIII|VII|IX)\s*[-._\s]?\s*(.*)$/);
    if (m) {
      const roman = m[1];
      const grade = roman === "VII" ? 7 : roman === "VIII" ? 8 : roman === "IX" ? 9 : 0;
      const suffix = normalize(String(m[2] || "")).replace(/^[\s\-._]+/, "");
      return { grade: grade || 999, suffix };
    }
    const gradeRaw = toGradeFromClass(v);
    return { grade: gradeRaw || 999, suffix: "" };
  };

  const pa = parse(a);
  const pb = parse(b);
  if (pa.grade !== pb.grade) return pa.grade - pb.grade;
  if (!pa.suffix && pb.suffix) return -1;
  if (pa.suffix && !pb.suffix) return 1;
  return pa.suffix.localeCompare(pb.suffix, "id-ID", { numeric: true, sensitivity: "base" });
}

function statusToLegacy(status?: StudentRow["status"]): "active" | "inactive" {
  return status === "Nonaktif" ? "inactive" : "active";
}

function buildLegacyStudentPatch(params: {
  nisn: string;
  name: string;
  className: string;
  gender?: StudentRow["gender"];
  religion?: StudentRow["religion"];
  status?: StudentRow["status"];
  schoolId: string;
  schoolName: string;
  npsn: string;
  syncedAt: number;
}): Record<string, any> {
  const base = `students/${params.nisn}`;
  const updates: Record<string, any> = {};
  updates[`${base}/nisn`] = params.nisn;
  updates[`${base}/name`] = params.name;
  updates[`${base}/class`] = params.className;
  updates[`${base}/gender`] = params.gender || "";
  updates[`${base}/religion`] = params.religion || "ISLAM";
  updates[`${base}/status`] = statusToLegacy(params.status);
  updates[`${base}/schoolId`] = params.schoolId;
  updates[`${base}/schoolName`] = params.schoolName;
  updates[`${base}/npsn`] = params.npsn;
  updates[`${base}/syncedFrom`] = "portalkita";
  updates[`${base}/syncedAt`] = params.syncedAt;
  return updates;
}

function buildEduLockStudentPatch(params: {
  nisn: string;
  name: string;
  className: string;
  gender?: StudentRow["gender"];
  religion?: StudentRow["religion"];
  status?: StudentRow["status"];
  schoolId: string;
  schoolName: string;
  npsn: string;
  syncedAt: number;
}): Record<string, any> {
  const base = `students/${params.nisn}`;
  const updates: Record<string, any> = {};
  updates[`${base}/nisn`] = params.nisn;
  updates[`${base}/name`] = params.name;
  updates[`${base}/class`] = params.className;
  updates[`${base}/gender`] = params.gender || "";
  updates[`${base}/religion`] = params.religion || "ISLAM";
  updates[`${base}/status`] = statusToLegacy(params.status);
  updates[`${base}/schoolId`] = params.schoolId;
  updates[`${base}/schoolName`] = params.schoolName;
  updates[`${base}/npsn`] = params.npsn;
  updates[`${base}/syncedFrom`] = "dashboard_satu_pintu";
  updates[`${base}/syncedAt`] = params.syncedAt;
  if (params.schoolId) {
    updates[`students_by_school/${params.schoolId}/${params.nisn}`] = true;
  }
  return updates;
}

function buildEduLockStudentDeletePatch(params: { nisn: string; schoolId: string }): Record<string, any> {
  const updates: Record<string, any> = {};
  updates[`students/${params.nisn}`] = null;
  if (params.schoolId) {
    updates[`students_by_school/${params.schoolId}/${params.nisn}`] = null;
  }
  return updates;
}

function normalizeEduLockClassKey(value: unknown): string {
  const raw = String(value || "").trim().toUpperCase();
  if (!raw) return "";

  const compact = raw.replace(/\s+/g, "").replace(/-/g, "");
  const compactMatch = compact.match(/(VIII|VII|IX|7|8|9)([A-Z])/);
  if (compactMatch) {
    const gradePart = compactMatch[1];
    const letter = compactMatch[2];
    const grade = gradePart === "VII" ? "7" : gradePart === "VIII" ? "8" : gradePart === "IX" ? "9" : gradePart;
    return `${grade}${letter}`;
  }

  const looseMatch = raw.match(/(VIII|VII|IX|7|8|9)\s*[- ]?\s*([A-Z])\b/);
  if (looseMatch) {
    const gradePart = looseMatch[1];
    const letter = looseMatch[2];
    const grade = gradePart === "VII" ? "7" : gradePart === "VIII" ? "8" : gradePart === "IX" ? "9" : gradePart;
    return `${grade}${letter}`;
  }

  return raw.replace(/[^A-Z0-9]/g, "");
}

export default function MasterStudentsPage() {
  return (
    <Suspense fallback={null}>
      <MasterStudentsContent />
    </Suspense>
  );
}

function MasterStudentsContent() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const searchParams = new URLSearchParams(useLocation().search);
  const { user, isAuthenticated, _hasHydrated } = { user: { role: "admin", isLoading: false, profile: { id: "1", email: "admin@smpn3.com" } } as any, school: { id: "SMPN 3 PACET", name: "SMPN 3 PACET" }, isAuthenticated: true, _hasHydrated: true, profile: { email: "admin@smpn3.com" } } as any;
  const { isLoading: isEduLockAuthLoading } = { role: "admin", isLoading: false, profile: { id: "1", email: "admin@smpn3.com" } } as any;
  const [mounted, setMounted] = useState(false);

  const [superSection, setSuperSection] = useState<SuperDbSection>("tenants");
  const [superSchools, setSuperSchools] = useState<SuperSchoolRow[]>([]);
  const [superAdmins, setSuperAdmins] = useState<SuperAdminProfileRow[]>([]);
  const [superViolations, setSuperViolations] = useState<SuperViolationRow[]>([]);
  const [superPrincipals, setSuperPrincipals] = useState<SuperPrincipalRow[]>([]);
  const [superSaving, setSuperSaving] = useState(false);
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

  const [studentRows, setStudentRows] = useState<StudentRow[]>([]);
  const [teacherRows, setTeacherRows] = useState<TeacherRow[]>([]);
  const [staffRows, setStaffRows] = useState<StaffRow[]>([]);
  const [tatibRows, setTatibRows] = useState<TatibRow[]>([]);
  const [classRows, setClassRows] = useState<ClassRow[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<{ type: "" | "success" | "error"; text: string }>({ type: "", text: "" });
  const [busy, setBusy] = useState(false);
  const [lastSyncAt, setLastSyncAt] = useState<number>(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({ nisn: "", name: "", gender: "L" as "L" | "P", religion: "ISLAM" as "ISLAM" | "NON_ISLAM", class: "" });
  const [editingNisn, setEditingNisn] = useState<string>("");
  const [editForm, setEditForm] = useState({ name: "", gender: "" as "" | "L" | "P", class: "", status: "Aktif" as "Aktif" | "Nonaktif" });

  const [teacherCreateOpen, setTeacherCreateOpen] = useState(false);
  const [teacherCreateForm, setTeacherCreateForm] = useState({ nuptk: "", name: "", class: "" });
  const [teacherEditOpen, setTeacherEditOpen] = useState(false);
  const [teacherEditingNuptk, setTeacherEditingNuptk] = useState<string>("");
  const [teacherEditForm, setTeacherEditForm] = useState({ name: "", class: "", status: "Aktif" as "Aktif" | "Nonaktif" });

  const [staffCreateOpen, setStaffCreateOpen] = useState(false);
  const [staffCreateForm, setStaffCreateForm] = useState({ nisn: "", position: "" });
  const [staffEditOpen, setStaffEditOpen] = useState(false);
  const [staffEditingNisn, setStaffEditingNisn] = useState<string>("");
  const [staffEditForm, setStaffEditForm] = useState({
    position: "",
    status: "Aktif" as "Aktif" | "Nonaktif",
  });

  const [tatibCreateOpen, setTatibCreateOpen] = useState(false);
  const [tatibCreateForm, setTatibCreateForm] = useState({ name: "", username: "", password: "", isActive: true });
  const [tatibEditOpen, setTatibEditOpen] = useState(false);
  const [tatibEditingUsername, setTatibEditingUsername] = useState<string>("");
  const [tatibEditForm, setTatibEditForm] = useState({ name: "", password: "", isActive: true });

  const [classCreateOpen, setClassCreateOpen] = useState(false);
  const [classCreateForm, setClassCreateForm] = useState({ className: "" });
  const [classEditOpen, setClassEditOpen] = useState(false);
  const [classEditingName, setClassEditingName] = useState("");
  const [classEditForm, setClassEditForm] = useState({ className: "" });

  const [selectedGrade, setSelectedGrade] = useState<7 | 8 | 9>(7);

  const [principalForm, setPrincipalForm] = useState({
    username: "",
    name: "",
    schoolId: "",
    schoolName: "",
    password: "",
    isActive: true,
  });
  const [principalEditing, setPrincipalEditing] = useState<string>("");
  const [principalQuery, setPrincipalQuery] = useState("");
  const [principalSaving, setPrincipalSaving] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");

  const session = useSessionStore((state) => state.session);
  const sessionId = session?.sessionId;
  const activeSchoolId = session?.activeSchoolId;

  const { data: studentsData } = useQuery({
    queryKey: ["students", activeSchoolId],
    queryFn: () => {
      if (!sessionId || !activeSchoolId) throw new Error("No active session or school");
      return api.getStudents(sessionId, activeSchoolId);
    },
    enabled: !!sessionId && !!activeSchoolId,
  });

  useEffect(() => {
    if (studentsData?.students) {
      const list: StudentRow[] = studentsData.students.map(s => ({
        nisn: s.studentNumber,
        name: s.fullName,
        gender: "L",
        religion: "ISLAM",
        class: "-",
        status: "Aktif",
        device: "-",
        schoolId: activeSchoolId || "",
        schoolName: "SMPN 3 PACET",
        npsn: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }));
      setStudentRows(list);
    }
  }, [studentsData, activeSchoolId]);

  const emitPlatformEvent = async (payload: {
    type: string;
    message: string;
    schoolId?: string;
    targetUid?: string;
  }) => {
    if (!user || user.role !== "super_admin") return;
    try {
      const now = Date.now();
      const eventRef = push(ref(edulockDb, "platform_events"));
      await set(eventRef, {
        id: eventRef.key,
        at: now,
        type: payload.type,
        message: payload.message,
        schoolId: normalize(payload.schoolId).toLowerCase(),
        targetUid: normalize(payload.targetUid),
        actorUid: normalize(user.id),
        actorEmail: normalize(user.email).toLowerCase(),
      });
    } catch {}
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !_hasHydrated) return;
    if (!isAuthenticated || (user?.role !== "admin" && user?.role !== "super_admin")) {
      navigate("/admin/login?returnTo=/admin/students");
    }
  }, [isAuthenticated, mounted, navigate, user?.role, _hasHydrated]);

  useEffect(() => {
    if (!mounted || !_hasHydrated || isEduLockAuthLoading) return;
    if (!isAuthenticated || user?.role !== "super_admin") return;
    if (pathname !== "/admin/students") return;
    navigate("/super-admin/database");
  }, [isAuthenticated, mounted, pathname, navigate, user?.role, _hasHydrated]);

  useEffect(() => {
    if (!mounted || !_hasHydrated) return;
    if (!isAuthenticated || user?.role !== "super_admin") return;

    const unsubSchools = onValue(ref(edulockDb, "schools"), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setSuperSchools([]);
        return;
      }
      const list: SuperSchoolRow[] = Object.entries(data).map(([key, v]: any) => ({
        schoolId: String(v?.schoolId || key),
        name: v?.name ? String(v.name) : "",
        district: v?.district ? String(v.district) : "",
        npsn: v?.npsn ? String(v.npsn) : "",
        authEmail: v?.authEmail ? String(v.authEmail) : "",
        adminEmail: v?.adminEmail ? String(v.adminEmail) : "",
        backupEmail: v?.backupEmail ? String(v.backupEmail) : "",
        isActive: v?.isActive !== false,
        adminAccessActive: v?.adminAccessActive !== false,
        createdAt: typeof v?.createdAt === "number" ? v.createdAt : null,
        updatedAt: typeof v?.updatedAt === "number" ? v.updatedAt : null,
      }));
      list.sort((a, b) => String(a.name || a.schoolId).localeCompare(String(b.name || b.schoolId)));
      setSuperSchools(list);
    }, (error) => {
      setSuperSchools([]);
    });

    const unsubAdmins = onValue(ref(edulockDb, "admin_profiles"), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setSuperAdmins([]);
        return;
      }
      const list: SuperAdminProfileRow[] = Object.entries(data).map(([key, v]: any) => ({
        uid: String(v?.uid || key),
        email: String(v?.email || ""),
        role: String(v?.role || "admin") === "super_admin" ? "super_admin" : "admin",
        isActive: v?.isActive !== false,
        schoolId: v?.schoolId ? String(v.schoolId) : "",
        schoolName: v?.schoolName ? String(v.schoolName) : "",
        npsn: v?.npsn ? String(v.npsn) : undefined,
        lastLoginAt: typeof v?.lastLoginAt === "number" ? v.lastLoginAt : null,
        mustChangePassword: v?.mustChangePassword === true,
        passwordChangedAt: typeof v?.passwordChangedAt === "number" ? v.passwordChangedAt : null,
      }));
      list.sort((a, b) => (Number(b.lastLoginAt || 0) || 0) - (Number(a.lastLoginAt || 0) || 0));
      setSuperAdmins(list);
    });

    const unsubViolations = onValue(ref(edulockDb, "violations"), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setSuperViolations([]);
        return;
      }
      const list: SuperViolationRow[] = Object.entries(data).map(([key, v]: any) => ({
        id: String(key),
        nisn: v?.nisn ? String(v.nisn) : "",
        type: v?.type ? String(v.type) : "",
        description: v?.description ? String(v.description) : "",
        timestamp: typeof v?.timestamp === "number" ? v.timestamp : null,
      }));
      list.sort((a, b) => (Number(b.timestamp || 0) || 0) - (Number(a.timestamp || 0) || 0));
      setSuperViolations(list.slice(0, 200));
    });

    const unsubPrincipals = onValue(ref(database, "principal_accounts"), (snapshot) => {
      const data = snapshot.val();
      if (!data || typeof data !== "object") {
        setSuperPrincipals([]);
        return;
      }
      const list: SuperPrincipalRow[] = Object.entries(data).map(([key, v]: any) => ({
        username: String(v?.username || key),
        name: String(v?.name || v?.nama || ""),
        schoolId: String(v?.schoolId || ""),
        schoolName: String(v?.schoolName || ""),
        isActive: v?.isActive !== false,
        deviceId: v?.deviceId ? String(v.deviceId) : v?.device ? String(v.device) : null,
        device: v?.device ? String(v.device) : null,
        credentialHash: v?.credentialHash ? String(v.credentialHash) : null,
        lastLoginAt: typeof v?.lastLoginAt === "number" ? v.lastLoginAt : null,
        createdAt: typeof v?.createdAt === "number" ? v.createdAt : null,
        updatedAt: typeof v?.updatedAt === "number" ? v.updatedAt : null,
      }));
      list.sort((a, b) => String(a.schoolName || a.schoolId).localeCompare(String(b.schoolName || b.schoolId)));
      setSuperPrincipals(list);
    });

    return () => {
      unsubSchools();
      unsubAdmins();
      unsubViolations();
      unsubPrincipals();
    };
  }, [isAuthenticated, mounted, user?.role, _hasHydrated, isEduLockAuthLoading]);

  const schoolId = useMemo(() => normalize(user?.schoolId), [user?.schoolId]);
  const schoolName = useMemo(() => normalize(user?.schoolName), [user?.schoolName]);
  const npsn = useMemo(() => normalize(user?.npsn), [user?.npsn]);
  const isSuperAdminScope = user?.role === "super_admin";
  const schoolScopeId = schoolId.toLowerCase();

  const matchesOwnedSchool = (recordSchoolId?: unknown) => {
    if (isSuperAdminScope) return true;
    const recordScope = normalize(recordSchoolId).toLowerCase();
    return Boolean(recordScope) && Boolean(schoolScopeId) && recordScope === schoolScopeId;
  };

  const getOwnedStudentRow = (nisnValue: string) =>
    studentRows.find((row) => normalize(row.nisn) === normalize(nisnValue) && matchesOwnedSchool(row.schoolId));

  const getOwnedTeacherRow = (nuptkValue: string) =>
    teacherRows.find((row) => normalize(row.nuptk) === normalize(nuptkValue) && matchesOwnedSchool(row.schoolId));

  const getOwnedStaffRow = (nisnValue: string) =>
    staffRows.find((row) => normalize(row.nisn) === normalize(nisnValue) && matchesOwnedSchool(row.schoolId));

  const getOwnedTatibRow = (usernameValue: string) =>
    tatibRows.find((row) => normalizeTatibUsername(row.username) === normalizeTatibUsername(usernameValue) && matchesOwnedSchool(row.schoolId));

  const latestRuntimeAdminBySchoolId = useMemo(() => {
    const map = new Map<string, SuperAdminProfileRow>();
    for (const admin of superAdmins) {
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
  }, [superAdmins]);

  const latestRuntimeAdminByEmail = useMemo(() => {
    const map = new Map<string, SuperAdminProfileRow>();
    for (const admin of superAdmins) {
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
  }, [superAdmins]);

  const latestRuntimeAdminByNpsn = useMemo(() => {
    const map = new Map<string, SuperAdminProfileRow>();
    for (const admin of superAdmins) {
      if (admin.role !== "admin") continue;
      const npsnValue = normalize(admin.npsn).toLowerCase();
      if (!npsnValue) continue;
      const existing = map.get(npsnValue);
      const currentTs = Number(admin.lastLoginAt || 0) || 0;
      const previousTs = Number(existing?.lastLoginAt || 0) || 0;
      if (!existing || currentTs >= previousTs) {
        map.set(npsnValue, admin);
      }
    }
    return map;
  }, [superAdmins]);

  const superSchoolAdmins = useMemo<SuperSchoolAdminRow[]>(() => {
    return superSchools.map((school) => {
      const loginIdentifier = getSchoolAdminLoginIdentifier(school);
      const runtime =
        latestRuntimeAdminBySchoolId.get(normalize(school.schoolId).toLowerCase()) ||
        latestRuntimeAdminByEmail.get(normalize(loginIdentifier).toLowerCase()) ||
        latestRuntimeAdminByNpsn.get(normalize(school.npsn).toLowerCase());
      return {
        schoolId: school.schoolId,
        schoolName: school.name,
        npsn: school.npsn,
        schoolActive: school.isActive,
        accessActive: school.adminAccessActive !== false,
        loginIdentifier,
        resetEmail: getSchoolAdminResetEmail(school),
        runtimeUid: String(runtime?.uid || ""),
        runtimeEmail: String(runtime?.email || ""),
        runtimeLastLoginAt: runtime?.lastLoginAt ?? null,
        runtimeMustChangePassword: runtime?.mustChangePassword === true,
        runtimeIsActive: runtime?.isActive !== false,
      };
    });
  }, [latestRuntimeAdminByEmail, latestRuntimeAdminByNpsn, latestRuntimeAdminBySchoolId, superSchools]);

  const schoolAdminRowBySchoolId = useMemo(() => {
    const map = new Map<string, SuperSchoolAdminRow>();
    for (const row of superSchoolAdmins) {
      map.set(normalize(row.schoolId).toLowerCase(), row);
    }
    return map;
  }, [superSchoolAdmins]);

  const superStats = useMemo(() => {
    const tenantsTotal = superSchools.length;
    const tenantsEnabled = superSchools.filter((s) => s.isActive).length;
    const tenantsLive = superSchoolAdmins.filter((row) => hasOperationalRuntime(row)).length;
    const adminsTotal = superSchoolAdmins.length;
    const adminsActive = superSchoolAdmins.filter((row) => row.accessActive && row.schoolActive).length;
    const tenantsWithAdmin = superSchoolAdmins.reduce((acc, row) => acc + (schoolHasAdminLoginConfig({ npsn: row.npsn, authEmail: row.loginIdentifier, adminEmail: "" }) ? 1 : 0), 0);
    const tenantsMissingAdmin = Math.max(0, tenantsTotal - tenantsWithAdmin);
    return { tenantsTotal, tenantsEnabled, tenantsLive, adminsTotal, adminsActive, tenantsWithAdmin, tenantsMissingAdmin };
  }, [superSchoolAdmins, superSchools]);

  const filteredSuperPrincipals = useMemo(() => {
    const q = normalize(principalQuery).toLowerCase();
    if (!q) return superPrincipals;
    return superPrincipals.filter((p) => {
      const hay = `${p.username} ${p.name} ${p.schoolId} ${p.schoolName}`.toLowerCase();
      return hay.includes(q);
    });
  }, [principalQuery, superPrincipals]);

  const saveSuperSchool = async () => {
    const now = Date.now();
    const sid = normalize(superSchoolForm.schoolId);
    if (!sid) {
      setStatus({ type: "error", text: "School ID wajib diisi." });
      return;
    }

    setSuperSaving(true);
    setStatus({ type: "", text: "" });
    try {
      const exists = superSchools.some((s) => normalize(s.schoolId).toLowerCase() === sid.toLowerCase());
      const npsnValue = normalize(superSchoolForm.npsn);
      const prevSchool = superSchools.find((s) => normalize(s.schoolId).toLowerCase() === sid.toLowerCase());
      const updates: Record<string, any> = {};

      updates[`schools/${sid}/schoolId`] = sid;
      updates[`schools/${sid}/name`] = normalize(superSchoolForm.name);
      updates[`schools/${sid}/district`] = normalize(superSchoolForm.district);
      updates[`schools/${sid}/npsn`] = npsnValue;
      updates[`schools/${sid}/authEmail`] = normalize(superSchoolForm.authEmail).toLowerCase();
      updates[`schools/${sid}/adminEmail`] = normalize(superSchoolForm.adminEmail).toLowerCase();
      updates[`schools/${sid}/backupEmail`] = normalize(superSchoolForm.backupEmail).toLowerCase();
      updates[`schools/${sid}/isActive`] = superSchoolForm.isActive;
      updates[`schools/${sid}/adminAccessActive`] = prevSchool?.adminAccessActive !== false;
      if (!exists) updates[`schools/${sid}/createdAt`] = now;
      updates[`schools/${sid}/updatedAt`] = now;
      if (npsnValue) {
        const existingIndexSnap = await get(ref(edulockDb, `npsn_index/${npsnValue}`));
        const existingSid = existingIndexSnap.val();
        if (existingSid && String(existingSid) !== sid) {
          throw new Error(`NPSN ${npsnValue} sudah terhubung ke schoolId ${String(existingSid)}.`);
        }
        updates[`npsn_index/${npsnValue}`] = sid;
      }
      const prevNpsn = normalize(prevSchool?.npsn);
      if (prevNpsn && prevNpsn !== npsnValue) updates[`npsn_index/${prevNpsn}`] = null;

      await update(ref(edulockDb), updates);
      setStatus({ type: "success", text: "Sekolah berhasil disimpan." });
      void emitPlatformEvent({
        type: exists ? "school.updated" : "school.created",
        message: exists ? `Sekolah diperbarui: ${sid}` : `Sekolah ditambahkan: ${sid}`,
        schoolId: sid,
      });
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
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal simpan sekolah: ${String(e?.message || e)}` });
    } finally {
      setSuperSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const toggleSuperSchoolActive = async (sid: string, next: boolean) => {
    const now = Date.now();
    setSuperSaving(true);
    setStatus({ type: "", text: "" });
    try {
      await update(ref(edulockDb, `schools/${sid}`), { isActive: next, updatedAt: now });
      setStatus({ type: "success", text: "Status sekolah diperbarui." });
      void emitPlatformEvent({
        type: "school.status_changed",
        message: `Status sekolah ${sid}: ${next ? "Aktif" : "Nonaktif"}`,
        schoolId: sid,
      });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal update sekolah: ${String(e?.message || e)}` });
    } finally {
      setSuperSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const toggleSuperAdminActive = async (uid: string, next: boolean) => {
    const now = Date.now();
    setSuperSaving(true);
    setStatus({ type: "", text: "" });
    try {
      await update(ref(edulockDb, `admin_profiles/${uid}`), { isActive: next, updatedAt: now });
      setStatus({ type: "success", text: "Status admin diperbarui." });
      void emitPlatformEvent({
        type: "admin.status_changed",
        message: `Status admin ${uid}: ${next ? "Aktif" : "Nonaktif"}`,
        targetUid: uid,
      });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal update admin: ${String(e?.message || e)}` });
    } finally {
      setSuperSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const toggleSchoolAdminAccess = async (schoolRow: SuperSchoolAdminRow, next: boolean) => {
    const now = Date.now();
    const schoolIdValue = normalize(schoolRow.schoolId);
    if (!schoolIdValue) return;
    setSuperSaving(true);
    setStatus({ type: "", text: "" });
    try {
      const updatesObj: Record<string, any> = {
        [`schools/${schoolIdValue}/adminAccessActive`]: next,
        [`schools/${schoolIdValue}/updatedAt`]: now,
      };

      for (const admin of superAdmins) {
        if (admin.role !== "admin") continue;
        if (normalize(admin.schoolId).toLowerCase() !== schoolIdValue.toLowerCase()) continue;
        updatesObj[`admin_profiles/${admin.uid}/isActive`] = next;
        updatesObj[`admin_profiles/${admin.uid}/updatedAt`] = now;
      }

      await update(ref(edulockDb), updatesObj);
      setStatus({ type: "success", text: "Akses admin sekolah diperbarui." });
      void emitPlatformEvent({
        type: "school_admin.access_changed",
        message: `Akses admin sekolah ${schoolIdValue}: ${next ? "Aktif" : "Nonaktif"}`,
        schoolId: schoolIdValue,
      });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal update akses admin sekolah: ${String(e?.message || e)}` });
    } finally {
      setSuperSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const resetSchoolAdminPassword = async (schoolRow: SuperSchoolAdminRow) => {
    const target = normalize(schoolRow.resetEmail).toLowerCase();
    if (!target) {
      setStatus({
        type: "error",
        text: "Reset via email belum tersedia. Isi Email Login atau Email Admin yang valid di tenant registry.",
      });
      return;
    }

    setSuperSaving(true);
    setStatus({ type: "", text: "" });
    try {
      await sendPasswordResetEmail(edulockAuth, target);
      setStatus({ type: "success", text: `Link reset password dikirim ke ${target}.` });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal kirim reset: ${String(e?.message || e)}` });
    } finally {
      setSuperSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const resetSuperAdminPassword = async (email: string) => {
    const target = normalize(email).toLowerCase();
    if (!target.includes("@") || target.endsWith("@edulock.local")) {
      setStatus({
        type: "error",
        text: "Reset via email tidak tersedia untuk akun sistem (@edulock.local).",
      });
      return;
    }

    setSuperSaving(true);
    setStatus({ type: "", text: "" });
    try {
      await sendPasswordResetEmail(edulockAuth, target);
      setStatus({ type: "success", text: `Link reset password dikirim ke ${target}.` });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal kirim reset: ${String(e?.message || e)}` });
    } finally {
      setSuperSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const normalizePrincipalUsername = (value: string) =>
    normalize(value)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

  const upsertPrincipalAccount = async () => {
    const now = Date.now();
    const usernameKey = normalizePrincipalUsername(principalForm.username);
    const schoolIdValue = normalize(principalForm.schoolId).trim();
    if (!usernameKey) {
      setStatus({ type: "error", text: "Username kepala sekolah wajib diisi." });
      return;
    }
    if (!schoolIdValue) {
      setStatus({ type: "error", text: "School ID wajib diisi." });
      return;
    }

    const existing = superPrincipals.find((p) => normalizePrincipalUsername(p.username) === usernameKey);
    const pickedSchool = superSchools.find((s) => normalize(s.schoolId).toLowerCase() === schoolIdValue.toLowerCase());
    const schoolNameValue = normalize(principalForm.schoolName || pickedSchool?.name || "");
    const displayNameValue = normalize(principalForm.name);

    if (!existing && !principalForm.password.trim()) {
      setStatus({ type: "error", text: "Password/NIP wajib diisi untuk akun baru." });
      return;
    }

    setPrincipalSaving(true);
    setStatus({ type: "", text: "" });
    try {
      const password = principalForm.password.trim();
      const credentialHash = password ? await sha256Hex(password) : "";
      if (password && !credentialHash) {
        throw new Error("Browser tidak mendukung hashing. Gunakan browser modern untuk set password.");
      }

      const base = `principal_accounts/${usernameKey}`;
      const updates: Record<string, any> = {};
      updates[`${base}/username`] = usernameKey;
      updates[`${base}/name`] = displayNameValue;
      updates[`${base}/schoolId`] = schoolIdValue;
      updates[`${base}/schoolName`] = schoolNameValue;
      updates[`${base}/isActive`] = principalForm.isActive;
      if (password) updates[`${base}/credentialHash`] = credentialHash;
      if (!existing) updates[`${base}/createdAt`] = now;
      updates[`${base}/updatedAt`] = now;

      await update(ref(database), updates);
      setStatus({ type: "success", text: existing ? "Akun kepala sekolah diperbarui." : "Akun kepala sekolah dibuat." });
      void emitPlatformEvent({
        type: existing ? "principal.updated" : "principal.created",
        message: existing ? `Akun kepala sekolah diperbarui: ${usernameKey}` : `Akun kepala sekolah dibuat: ${usernameKey}`,
        schoolId: schoolIdValue,
      });
      setPrincipalEditing("");
      setPrincipalForm({ username: "", name: "", schoolId: "", schoolName: "", password: "", isActive: true });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal simpan akun kepala sekolah: ${String(e?.message || e)}` });
    } finally {
      setPrincipalSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const startEditPrincipal = (row: SuperPrincipalRow) => {
    setPrincipalEditing(normalizePrincipalUsername(row.username));
    setPrincipalForm({
      username: normalizePrincipalUsername(row.username),
      name: row.name || "",
      schoolId: row.schoolId || "",
      schoolName: row.schoolName || "",
      password: "",
      isActive: row.isActive !== false,
    });
  };

  const togglePrincipalActive = async (username: string, next: boolean) => {
    const now = Date.now();
    const key = normalizePrincipalUsername(username);
    if (!key) return;
    setPrincipalSaving(true);
    setStatus({ type: "", text: "" });
    try {
      await update(ref(database, `principal_accounts/${key}`), { isActive: next, updatedAt: now });
      setStatus({ type: "success", text: "Status kepala sekolah diperbarui." });
      void emitPlatformEvent({
        type: "principal.status_changed",
        message: `Status kepala sekolah ${key}: ${next ? "Aktif" : "Nonaktif"}`,
      });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal update status kepala sekolah: ${String(e?.message || e)}` });
    } finally {
      setPrincipalSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const resetPrincipalDevice = async (username: string) => {
    const now = Date.now();
    const key = normalizePrincipalUsername(username);
    if (!key) return;
    setPrincipalSaving(true);
    setStatus({ type: "", text: "" });
    try {
      await update(ref(database), {
        [`principal_accounts/${key}/deviceId`]: null,
        [`principal_accounts/${key}/device`]: null,
        [`principal_accounts/${key}/lastLoginAt`]: null,
        [`principal_accounts/${key}/updatedAt`]: now,
        [`master_principals/${key}/deviceId`]: null,
        [`master_principals/${key}/device`]: null,
        [`master_principals/${key}/lastLoginAt`]: null,
        [`master_principals/${key}/updatedAt`]: now,
      });
      setStatus({ type: "success", text: "Device kepala sekolah berhasil di-reset." });
      void emitPlatformEvent({
        type: "principal.device_reset",
        message: `Reset device kepala sekolah: ${key}`,
      });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal reset device: ${String(e?.message || e)}` });
    } finally {
      setPrincipalSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const deletePrincipalAccount = async (username: string) => {
    const key = normalizePrincipalUsername(username);
    if (!key) return;
    setPrincipalSaving(true);
    setStatus({ type: "", text: "" });
    try {
      await remove(ref(database, `principal_accounts/${key}`));
      setStatus({ type: "success", text: "Akun kepala sekolah dihapus." });
      void emitPlatformEvent({
        type: "principal.deleted",
        message: `Akun kepala sekolah dihapus: ${key}`,
      });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal hapus akun kepala sekolah: ${String(e?.message || e)}` });
    } finally {
      setPrincipalSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const activeSub = useMemo(() => {
    const raw = String(searchParams?.get("sub") || "students").toLowerCase();
    if (raw === "teachers") return "teachers";
    if (raw === "staff") return "staff";
    if (raw === "tatib") return "tatib";
    if (raw === "classes") return "classes";
    return "students";
  }, [searchParams]);

  useEffect(() => {
    if (!mounted || !_hasHydrated) return;
    if (!searchParams) return;
    const raw = String(searchParams.get("sub") || "").toLowerCase();
    if (raw === "tatib") {
      navigate("/admin/students?sub=staff");
    }
  }, [mounted, _hasHydrated, navigate, searchParams]);

  useEffect(() => {
    setQuery("");
    setStatus({ type: "", text: "" });
    if (activeSub !== "students" && activeSub !== "classes") {
      setClassCreateOpen(false);
      setClassCreateForm({ className: "" });
      setClassEditOpen(false);
      setClassEditingName("");
      setClassEditForm({ className: "" });
    }
  }, [activeSub]);

  useEffect(() => {
    if (!mounted || !_hasHydrated) return;
    if (!isAuthenticated || user?.role !== "admin") return;
    const unsubs: Array<() => void> = [];

    if (activeSub === "students" || activeSub === "staff" || activeSub === "classes") {
      const baseRef = schoolId
        ? dbQuery(ref(database, "master_students"), orderByChild("schoolId"), equalTo(schoolId))
        : ref(database, "master_students");
      const unsub = onValue(baseRef, (snap: any) => {
        // Disabled mock listener to use API data
        /*
        const data = snap.val();
        if (!data || typeof data !== "object") {
          setStudentRows([]);
          setLastSyncAt(Date.now());
          return;
        }
            gender: obj?.gender === "L" || obj?.gender === "P" ? obj.gender : "",
            religion: religionRaw === "NON_ISLAM" ? "NON_ISLAM" : religionRaw ? "ISLAM" : "",
            class: String(obj?.class || ""),
            status: obj?.status === "Nonaktif" ? "Nonaktif" : "Aktif",
            device: obj?.device ? String(obj.device) : "",
            schoolId: obj?.schoolId ? String(obj.schoolId) : undefined,
            schoolName: obj?.schoolName ? String(obj.schoolName) : undefined,
            npsn: obj?.npsn ? String(obj.npsn) : undefined,
            createdAt: typeof obj?.createdAt === "number" ? obj.createdAt : undefined,
            updatedAt: typeof obj?.updatedAt === "number" ? obj.updatedAt : undefined,
          };
        });
        list.sort((a, b) => (Number(b.updatedAt || b.createdAt || 0) || 0) - (Number(a.updatedAt || a.createdAt || 0) || 0));
        // setStudentRows(list);
        setLastSyncAt(Date.now());
        */
      });
      unsubs.push(unsub);
    }

    if (activeSub === "tatib") {
      const baseRef = schoolId
        ? dbQuery(ref(database, "staff"), orderByChild("schoolId"), equalTo(schoolId))
        : ref(database, "staff");
      const unsub = onValue(baseRef, (snap) => {
        const data = snap.val();
        if (!data || typeof data !== "object") {
          setTatibRows([]);
          setLastSyncAt(Date.now());
          return;
        }
        const list: TatibRow[] = Object.entries(data).map(([key, v]: any) => {
          const obj = v || {};
          return {
            username: String(obj?.username || key || ""),
            name: String(obj?.name || ""),
            password: obj?.password ? String(obj.password) : "",
            role: obj?.role ? String(obj.role) : "",
            isActive: typeof obj?.isActive === "boolean" ? obj.isActive : true,
            deviceId: obj?.deviceId ? String(obj.deviceId) : obj?.device ? String(obj.device) : "",
            schoolId: obj?.schoolId ? String(obj.schoolId) : undefined,
            schoolName: obj?.schoolName ? String(obj.schoolName) : undefined,
            npsn: obj?.npsn ? String(obj.npsn) : undefined,
            createdAt: typeof obj?.createdAt === "number" ? obj.createdAt : undefined,
            updatedAt: typeof obj?.updatedAt === "number" ? obj.updatedAt : undefined,
          };
        });
        const sid = normalize(schoolId).toLowerCase();
        const filtered = sid
          ? list.filter((r) => !normalize(r.schoolId).toLowerCase() || normalize(r.schoolId).toLowerCase() === sid)
          : list;
        filtered.sort(
          (a, b) => (Number(b.updatedAt || b.createdAt || 0) || 0) - (Number(a.updatedAt || a.createdAt || 0) || 0),
        );
        setTatibRows(filtered);
        setLastSyncAt(Date.now());
      });
      unsubs.push(unsub);
    }

    if (activeSub === "students" || activeSub === "teachers" || activeSub === "classes") {
      if (!schoolId) {
        setClassRows([]);
        setLastSyncAt(Date.now());
      } else {
        const baseRef = ref(database, `master_classes/${schoolId}`);
        const unsub = onValue(baseRef, (snap) => {
          const data = snap.val();
          if (!data || typeof data !== "object") {
            setClassRows([]);
            setLastSyncAt(Date.now());
            return;
          }
          const list: ClassRow[] = Object.entries(data).map(([key, v]: any) => {
            const obj = v || {};
            const className = normalize(obj?.class || obj?.className || key);
            const gradeRaw = typeof obj?.grade === "number" ? obj.grade : toGradeFromClass(className);
            const grade = gradeRaw === 7 || gradeRaw === 8 || gradeRaw === 9 ? gradeRaw : 7;
            return {
              className,
              grade,
              disabled: Boolean(obj?.disabled),
              schoolId: obj?.schoolId ? String(obj.schoolId) : schoolId,
              schoolName: obj?.schoolName ? String(obj.schoolName) : undefined,
              npsn: obj?.npsn ? String(obj.npsn) : undefined,
              createdAt: typeof obj?.createdAt === "number" ? obj.createdAt : undefined,
              updatedAt: typeof obj?.updatedAt === "number" ? obj.updatedAt : undefined,
            };
          });
          list.sort((a, b) => a.className.localeCompare(b.className));
          setClassRows(list);
          setLastSyncAt(Date.now());
        });
        unsubs.push(unsub);
      }
    }

    if (activeSub === "teachers") {
      const baseRef = schoolId
        ? dbQuery(ref(database, "master_teachers"), orderByChild("schoolId"), equalTo(schoolId))
        : ref(database, "master_teachers");
      const unsub = onValue(baseRef, (snap) => {
        const data = snap.val();
        if (!data || typeof data !== "object") {
          setTeacherRows([]);
          setLastSyncAt(Date.now());
          return;
        }
        const list: TeacherRow[] = Object.entries(data).map(([key, v]: any) => {
          const obj = v || {};
          return {
            nuptk: String(obj?.nuptk || key || ""),
            name: String(obj?.name || ""),
            class: String(obj?.class || obj?.homeroomClass || ""),
            status: obj?.status === "Nonaktif" ? "Nonaktif" : "Aktif",
            schoolId: obj?.schoolId ? String(obj.schoolId) : undefined,
            schoolName: obj?.schoolName ? String(obj.schoolName) : undefined,
            npsn: obj?.npsn ? String(obj.npsn) : undefined,
            createdAt: typeof obj?.createdAt === "number" ? obj.createdAt : undefined,
            updatedAt: typeof obj?.updatedAt === "number" ? obj.updatedAt : undefined,
          };
        });
        list.sort((a, b) => (Number(b.updatedAt || b.createdAt || 0) || 0) - (Number(a.updatedAt || a.createdAt || 0) || 0));
        setTeacherRows(list);
        setLastSyncAt(Date.now());
      });
      unsubs.push(unsub);
    }

    if (activeSub === "staff") {
      const baseRef = schoolId
        ? dbQuery(ref(database, "master_staff"), orderByChild("schoolId"), equalTo(schoolId))
        : ref(database, "master_staff");
      const unsub = onValue(baseRef, (snap) => {
        const data = snap.val();
        if (!data || typeof data !== "object") {
          setStaffRows([]);
          setLastSyncAt(Date.now());
          return;
        }
        const list: StaffRow[] = Object.entries(data).map(([key, v]: any) => {
          const obj = v || {};
          const roleValue = String(obj?.role || "").toLowerCase();
          return {
            nisn: String(obj?.nisn || key || ""),
            position: obj?.position ? String(obj.position) : "",
            role: roleValue === "osis" ? "osis" : "",
            status: obj?.status === "Nonaktif" ? "Nonaktif" : "Aktif",
            schoolId: obj?.schoolId ? String(obj.schoolId) : undefined,
            schoolName: obj?.schoolName ? String(obj.schoolName) : undefined,
            npsn: obj?.npsn ? String(obj.npsn) : undefined,
            createdAt: typeof obj?.createdAt === "number" ? obj.createdAt : undefined,
            updatedAt: typeof obj?.updatedAt === "number" ? obj.updatedAt : undefined,
          };
        });
        list.sort((a, b) => (Number(b.updatedAt || b.createdAt || 0) || 0) - (Number(a.updatedAt || a.createdAt || 0) || 0));
        setStaffRows(list);
        setLastSyncAt(Date.now());
      });
      unsubs.push(unsub);
    }

    if (unsubs.length === 0) setLastSyncAt(Date.now());

    return () => {
      for (const u of unsubs) u();
    };
  }, [activeSub, isAuthenticated, mounted, user?.role, _hasHydrated, schoolId]);

  const gradeTabs = useMemo(() => [7, 8, 9] as const, []);

  useEffect(() => {
    if (!gradeTabs.includes(selectedGrade)) setSelectedGrade(gradeTabs[0]);
  }, [gradeTabs, selectedGrade]);

  const classOptions = useMemo(() => {
    const baseBySchool = schoolId
      ? studentRows.filter((r) => normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase())
      : studentRows;
    const inGrade = baseBySchool.filter((r) => toGradeFromClass(r.class) === selectedGrade);
    const classesFromStudents = inGrade.map((r) => normalize(r.class)).filter(Boolean);
    const disabledSet = new Set(
      classRows
        .filter((r) => r.disabled)
        .map((r) => normalize(r.className).toUpperCase())
        .filter(Boolean),
    );
    const classesFromManual = classRows
      .filter((r) => r.grade === selectedGrade && !r.disabled)
      .map((r) => normalize(r.className))
      .filter(Boolean);

    const uniq = Array.from(new Set([...classesFromManual, ...classesFromStudents]))
      .filter((c) => !disabledSet.has(normalize(c).toUpperCase()))
      .sort(compareClassNames);
    return uniq;
  }, [classRows, studentRows, schoolId, selectedGrade]);

  const allowedStudentClassSet = useMemo(() => {
    return new Set(classOptions.map((c) => normalize(c).toUpperCase()).filter(Boolean));
  }, [classOptions]);

  const teacherClassOptions = useMemo(() => {
    const disabledSet = new Set(
      classRows
        .filter((r) => r.disabled)
        .map((r) => normalize(r.className).toUpperCase())
        .filter(Boolean),
    );
    const baseBySchool = schoolId
      ? studentRows.filter((r) => normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase())
      : studentRows;
    const classesFromStudents = baseBySchool.map((r) => normalize(r.class)).filter(Boolean);
    const manual = classRows.filter((r) => !r.disabled).map((r) => normalize(r.className)).filter(Boolean);
    const uniq = Array.from(new Set([...manual, ...classesFromStudents]))
      .filter((c) => !disabledSet.has(normalize(c).toUpperCase()))
      .sort(compareClassNames);
    return uniq;
  }, [classRows, schoolId, studentRows]);

  const allowedTeacherClassSet = useMemo(() => {
    return new Set(teacherClassOptions.map((c) => normalize(c).toUpperCase()).filter(Boolean));
  }, [teacherClassOptions]);

  const studentCountByClass = useMemo(() => {
    const map = new Map<string, number>();
    const baseBySchool = schoolId
      ? studentRows.filter((r) => normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase())
      : studentRows;
    for (const r of baseBySchool) {
      const key = normalize(r.class).toUpperCase();
      if (!key) continue;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map;
  }, [schoolId, studentRows]);

  const manualClassMap = useMemo(() => {
    const map = new Map<string, ClassRow>();
    for (const r of classRows) {
      map.set(normalize(r.className).toUpperCase(), r);
    }
    return map;
  }, [classRows]);

  useEffect(() => {
    if (!selectedClass) {
      setSelectedClass(classOptions[0] || "");
      return;
    }
    if (classOptions.length > 0 && !classOptions.includes(selectedClass)) {
      setSelectedClass(classOptions[0] || "");
    }
  }, [classOptions, selectedClass]);

  const filtered = useMemo(() => {
    const q = normalize(query).toLowerCase();
    const baseBySchool = schoolId
      ? studentRows.filter((r) => normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase())
      : studentRows;
    const baseByGrade = baseBySchool.filter((r) => toGradeFromClass(r.class) === selectedGrade);
    const baseByClass = selectedClass
      ? baseByGrade.filter((r) => normalize(r.class).toUpperCase() === normalize(selectedClass).toUpperCase())
      : baseByGrade;
    if (!q) return baseByClass;
    return baseByClass.filter((r) => {
      const hay = `${r.nisn} ${r.name} ${r.class}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, studentRows, schoolId, selectedClass, selectedGrade]);

  const filteredTeachers = useMemo(() => {
    const q = normalize(query).toLowerCase();
    const baseBySchool = schoolId
      ? teacherRows.filter((r) => normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase())
      : teacherRows;
    if (!q) return baseBySchool;
    return baseBySchool.filter((r) => {
      const hay = `${r.nuptk} ${r.name} ${r.class}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, teacherRows, schoolId]);

  const filteredStaff = useMemo(() => {
    const q = normalize(query).toLowerCase();
    const baseBySchool = schoolId ? staffRows.filter((r) => normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase()) : staffRows;
    const osisOnly = baseBySchool.filter((r) => (r.role || "osis") === "osis");
    if (!q) return osisOnly;
    return osisOnly.filter((r) => {
      const student = studentRows.find((s) => normalize(s.nisn) === normalize(r.nisn));
      const hay = `${r.nisn} ${student?.name || ""} ${student?.class || ""} ${r.position || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, staffRows, schoolId, studentRows]);

  const filteredTatib = useMemo(() => {
    const q = normalize(query).toLowerCase();
    const baseBySchool = schoolId ? tatibRows.filter((r) => !normalize(r.schoolId) || normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase()) : tatibRows;
    if (!q) return baseBySchool;
    return baseBySchool.filter((r) => {
      const hay = `${r.username} ${r.name}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, tatibRows, schoolId]);

  const staffCandidateStudent = useMemo(() => {
    const nisnValue = normalize(staffCreateForm.nisn);
    if (!nisnValue) return null;
    const found = studentRows.find((s) => normalize(s.nisn) === nisnValue);
    if (!found) return null;
    if (schoolId && normalize(found.schoolId).toLowerCase() !== schoolId.toLowerCase()) return null;
    return found;
  }, [schoolId, staffCreateForm.nisn, studentRows]);

  const handleCreate = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const nisnValue = normalize(createForm.nisn);
      const nameValue = normalize(createForm.name);
      const classValue = normalize(createForm.class);
      if (!nisnValue || !nameValue || !classValue) {
        setStatus({ type: "error", text: "NISN, Nama, dan Kelas wajib diisi." });
        return;
      }
      if (!allowedStudentClassSet.has(normalize(classValue).toUpperCase())) {
        setStatus({ type: "error", text: "Kelas harus dipilih dari daftar Kelas Paralel yang tersedia." });
        return;
      }
      if (!schoolId) {
        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
        return;
      }

      const now = Date.now();
      const updates: Record<string, any> = {};
      updates[`master_students/${nisnValue}`] = {
        nisn: nisnValue,
        name: nameValue,
        gender: createForm.gender,
        religion: createForm.religion,
        class: classValue,
        status: "Aktif",
        device: "",
        schoolId,
        schoolName,
        npsn,
        createdAt: now,
        updatedAt: now,
      };
      Object.assign(
        updates,
        buildLegacyStudentPatch({
          nisn: nisnValue,
          name: nameValue,
          className: classValue,
          gender: createForm.gender,
          religion: createForm.religion,
          status: "Aktif",
          schoolId,
          schoolName,
          npsn,
          syncedAt: now,
        })
      );
      const edulockUpdates = buildEduLockStudentPatch({
        nisn: nisnValue,
        name: nameValue,
        className: classValue,
        gender: createForm.gender,
        religion: createForm.religion,
        status: "Aktif",
        schoolId,
        schoolName,
        npsn,
        syncedAt: now,
      });
      await Promise.all([update(ref(database), updates), update(ref(edulockDb), edulockUpdates)]);

      setCreateForm({ nisn: "", name: "", gender: "L", religion: "ISLAM", class: "" });
      setCreateOpen(false);
      setStatus({ type: "success", text: "Siswa berhasil ditambahkan." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menambahkan siswa: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const startEdit = (r: StudentRow) => {
    setEditingNisn(r.nisn);
    setEditForm({
      name: r.name || "",
      gender: r.gender === "L" || r.gender === "P" ? r.gender : "",
      class: r.class || "",
      status: r.status === "Nonaktif" ? "Nonaktif" : "Aktif",
    });
  };

  const cancelEdit = () => {
    setEditingNisn("");
    setEditForm({ name: "", gender: "", class: "", status: "Aktif" });
  };

  const saveEdit = async (nisnValue: string) => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const nameValue = normalize(editForm.name);
      const classValue = normalize(editForm.class);
      if (!nameValue || !classValue) {
        setStatus({ type: "error", text: "Nama dan Kelas wajib diisi." });
        return;
      }
      if (!allowedStudentClassSet.has(normalize(classValue).toUpperCase())) {
        setStatus({ type: "error", text: "Kelas harus dipilih dari daftar Kelas Paralel yang tersedia." });
        return;
      }
      const now = Date.now();
      const updates: Record<string, any> = {};
      updates[`master_students/${nisnValue}/name`] = nameValue;
      updates[`master_students/${nisnValue}/gender`] = editForm.gender || "";
      updates[`master_students/${nisnValue}/class`] = classValue;
      updates[`master_students/${nisnValue}/status`] = editForm.status;
      updates[`master_students/${nisnValue}/updatedAt`] = now;
      if (schoolId) {
        Object.assign(
          updates,
          buildLegacyStudentPatch({
            nisn: nisnValue,
            name: nameValue,
            className: classValue,
            gender: editForm.gender || "",
            status: editForm.status,
            schoolId,
            schoolName,
            npsn,
            syncedAt: now,
          })
        );
      }
      const edulockUpdates = buildEduLockStudentPatch({
        nisn: nisnValue,
        name: nameValue,
        className: classValue,
        gender: editForm.gender || "",
        status: editForm.status,
        schoolId,
        schoolName,
        npsn,
        syncedAt: now,
      });
      await Promise.all([update(ref(database), updates), update(ref(edulockDb), edulockUpdates)]);
      setStatus({ type: "success", text: "Siswa berhasil diperbarui." });
      cancelEdit();
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menyimpan: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const deleteSelectedGradeStudents = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      if (!schoolId) {
        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
        return;
      }
      if (selectedGrade !== 9) {
        setStatus({ type: "error", text: "Fitur ini khusus untuk menghapus jenjang 9." });
        return;
      }
      const label = "Kelas 9 (IX-*)";
      if (!window.confirm(`Hapus semua data siswa untuk ${label} di sekolah ini?`)) return;
      const updates: Record<string, any> = {};
      let count = 0;
      for (const r of studentRows) {
        if (normalize(r.schoolId).toLowerCase() !== schoolId.toLowerCase()) continue;
        if (toGradeFromClass(r.class) !== selectedGrade) continue;
        updates[`master_students/${r.nisn}`] = null;
        updates[`students/${r.nisn}`] = null;
        count += 1;
      }
      if (count === 0) {
        setStatus({ type: "success", text: "Tidak ada siswa pada jenjang ini." });
        return;
      }
      const edulockUpdates: Record<string, any> = {};
      for (const r of studentRows) {
        if (normalize(r.schoolId).toLowerCase() !== schoolId.toLowerCase()) continue;
        if (toGradeFromClass(r.class) !== selectedGrade) continue;
        Object.assign(edulockUpdates, buildEduLockStudentDeletePatch({ nisn: r.nisn, schoolId }));
      }
      await Promise.all([update(ref(database), updates), update(ref(edulockDb), edulockUpdates)]);
      setStatus({ type: "success", text: `Berhasil menghapus ${count} siswa pada ${label}.` });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menghapus jenjang: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const resetStudentDeviceBinding = async (nisnValue: string) => {
    if (!window.confirm("Reset device binding siswa ini? Siswa bisa login lagi dari perangkat baru.")) return;
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const normalizedNisn = normalize(nisnValue);
      if (!normalizedNisn) {
        setStatus({ type: "error", text: "NISN tidak valid." });
        return;
      }
      const targetStudent = getOwnedStudentRow(normalizedNisn);
      if (!targetStudent) {
        setStatus({ type: "error", text: "Siswa tidak ditemukan pada tenant Anda." });
        return;
      }

      const now = Date.now();
      const updates: Record<string, any> = {};
      updates[`master_students/${normalizedNisn}/deviceId`] = null;
      updates[`master_students/${normalizedNisn}/device`] = "";
      updates[`master_students/${normalizedNisn}/lastLogin`] = null;
      updates[`master_students/${normalizedNisn}/lastLoginAt`] = null;
      updates[`master_students/${normalizedNisn}/updatedAt`] = now;
      updates[`students/${normalizedNisn}/deviceId`] = null;
      updates[`students/${normalizedNisn}/device`] = "";
      updates[`students/${normalizedNisn}/lastLogin`] = null;
      updates[`students/${normalizedNisn}/lastLoginAt`] = null;
      if (targetStudent.device) {
        updates[`device_locks/${targetStudent.device}`] = null;
      }

      await update(ref(database), updates);
      setStatus({ type: "success", text: "Device binding siswa berhasil direset." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal reset device binding: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const deleteRow = async (nisnValue: string) => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const normalizedNisn = normalize(nisnValue);
      const targetStudent = getOwnedStudentRow(normalizedNisn);
      if (!normalizedNisn || !targetStudent) {
        setStatus({ type: "error", text: "Siswa tidak ditemukan pada tenant Anda." });
        return;
      }
      const targetSchoolId = normalize(targetStudent.schoolId || schoolId);
      const [gasUpdates, edulockUpdates] = [
        {
          [`master_students/${normalizedNisn}`]: null,
          [`students/${normalizedNisn}`]: null,
        } as Record<string, any>,
        buildEduLockStudentDeletePatch({ nisn: normalizedNisn, schoolId: targetSchoolId }),
      ];
      await Promise.all([update(ref(database), gasUpdates), update(ref(edulockDb), edulockUpdates)]);
      setStatus({ type: "success", text: "Siswa berhasil dihapus." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menghapus: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const handleTeacherCreate = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const nuptkValue = normalize(teacherCreateForm.nuptk);
      const nameValue = normalize(teacherCreateForm.name);
      const classValue = normalize(teacherCreateForm.class);
      if (!nuptkValue || !nameValue || !classValue) {
        setStatus({ type: "error", text: "NUPTK, Nama, dan Kelas wajib diisi." });
        return;
      }
      if (!allowedTeacherClassSet.has(normalize(classValue).toUpperCase())) {
        setStatus({ type: "error", text: "Kelas harus dipilih dari daftar Kelas Paralel yang tersedia." });
        return;
      }
      if (!schoolId) {
        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
        return;
      }
      const now = Date.now();
      const updates: Record<string, any> = {};
      updates[`master_teachers/${nuptkValue}`] = {
        nuptk: nuptkValue,
        name: nameValue,
        class: classValue,
        status: "Aktif",
        schoolId,
        schoolName,
        npsn,
        createdAt: now,
        updatedAt: now,
      };
      updates[`teachers/${nuptkValue}/nuptk`] = nuptkValue;
      updates[`teachers/${nuptkValue}/name`] = nameValue;
      updates[`teachers/${nuptkValue}/homeroomClass`] = classValue;
      updates[`teachers/${nuptkValue}/class`] = classValue;
      updates[`teachers/${nuptkValue}/status`] = "active";
      updates[`teachers/${nuptkValue}/phone`] = "";
      updates[`teachers/${nuptkValue}/email`] = "";
      updates[`teachers/${nuptkValue}/schoolId`] = schoolId;
      updates[`teachers/${nuptkValue}/schoolName`] = schoolName;
      updates[`teachers/${nuptkValue}/npsn`] = npsn;
      updates[`teachers/${nuptkValue}/createdAt`] = now;
      updates[`teachers/${nuptkValue}/updatedAt`] = now;
      await update(ref(database), updates);
      setTeacherCreateForm({ nuptk: "", name: "", class: "" });
      setTeacherCreateOpen(false);
      setStatus({ type: "success", text: "Guru/Wali Kelas berhasil ditambahkan." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menambahkan: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const startTeacherEdit = (r: TeacherRow) => {
    setTeacherEditingNuptk(r.nuptk);
    setTeacherEditForm({
      name: r.name || "",
      class: r.class || "",
      status: r.status === "Nonaktif" ? "Nonaktif" : "Aktif",
    });
    setTeacherEditOpen(true);
  };

  const cancelTeacherEdit = () => {
    setTeacherEditOpen(false);
    setTeacherEditingNuptk("");
    setTeacherEditForm({ name: "", class: "", status: "Aktif" });
  };

  const saveTeacherEdit = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const nuptkValue = normalize(teacherEditingNuptk);
      const nameValue = normalize(teacherEditForm.name);
      const classValue = normalize(teacherEditForm.class);
      if (!nuptkValue) {
        setStatus({ type: "error", text: "NUPTK tidak valid." });
        return;
      }
      if (!nameValue || !classValue) {
        setStatus({ type: "error", text: "Nama dan Kelas wajib diisi." });
        return;
      }
      if (!getOwnedTeacherRow(nuptkValue)) {
        setStatus({ type: "error", text: "Guru tidak ditemukan pada tenant Anda." });
        return;
      }
      if (!allowedTeacherClassSet.has(normalize(classValue).toUpperCase())) {
        setStatus({ type: "error", text: "Kelas harus dipilih dari daftar Kelas Paralel yang tersedia." });
        return;
      }
      const now = Date.now();
      const updates: Record<string, any> = {};
      updates[`master_teachers/${nuptkValue}/name`] = nameValue;
      updates[`master_teachers/${nuptkValue}/class`] = classValue;
      updates[`master_teachers/${nuptkValue}/status`] = teacherEditForm.status;
      updates[`master_teachers/${nuptkValue}/updatedAt`] = now;

      updates[`teachers/${nuptkValue}/name`] = nameValue;
      updates[`teachers/${nuptkValue}/homeroomClass`] = classValue;
      updates[`teachers/${nuptkValue}/class`] = classValue;
      updates[`teachers/${nuptkValue}/status`] = teacherEditForm.status === "Nonaktif" ? "inactive" : "active";
      updates[`teachers/${nuptkValue}/updatedAt`] = now;
      await update(ref(database), updates);
      setStatus({ type: "success", text: "Data guru berhasil diperbarui." });
      cancelTeacherEdit();
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menyimpan: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const deleteTeacherRow = async (nuptkValue: string) => {
    if (!window.confirm("Hapus data guru ini?")) return;
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const normalizedNuptk = normalize(nuptkValue);
      if (!normalizedNuptk || !getOwnedTeacherRow(normalizedNuptk)) {
        setStatus({ type: "error", text: "Guru tidak ditemukan pada tenant Anda." });
        return;
      }
      const updates: Record<string, any> = {};
      updates[`master_teachers/${normalizedNuptk}`] = null;
      updates[`teachers/${normalizedNuptk}`] = null;
      await update(ref(database), updates);
      setStatus({ type: "success", text: "Guru berhasil dihapus." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menghapus: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const handleStaffCreate = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const nisnValue = normalize(staffCreateForm.nisn);
      const positionValue = normalize(staffCreateForm.position);
      if (!nisnValue) {
        setStatus({ type: "error", text: "NISN wajib diisi." });
        return;
      }
      if (!schoolId) {
        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
        return;
      }
      const student = studentRows.find((s) => normalize(s.nisn) === nisnValue);
      if (!student) {
        setStatus({ type: "error", text: "NISN belum ada di Database Siswa. Tambahkan siswa dulu di menu Siswa." });
        return;
      }
      if (normalize(student.schoolId).toLowerCase() !== schoolId.toLowerCase()) {
        setStatus({ type: "error", text: "Siswa ini bukan milik sekolah Anda." });
        return;
      }
      const now = Date.now();
      await set(ref(database, `master_staff/${nisnValue}`), {
        role: "osis",
        nisn: nisnValue,
        position: positionValue,
        status: "Aktif",
        schoolId,
        schoolName,
        npsn,
        createdAt: now,
        updatedAt: now,
      });
      setStaffCreateForm({ nisn: "", position: "" });
      setStaffCreateOpen(false);
      setStatus({ type: "success", text: "Petugas (OSIS) berhasil ditambahkan." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menambahkan: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const startStaffEdit = (r: StaffRow) => {
    setStaffEditingNisn(r.nisn);
    setStaffEditForm({
      position: r.position || "",
      status: r.status === "Nonaktif" ? "Nonaktif" : "Aktif",
    });
    setStaffEditOpen(true);
  };

  const cancelStaffEdit = () => {
    setStaffEditOpen(false);
    setStaffEditingNisn("");
    setStaffEditForm({ position: "", status: "Aktif" });
  };

  const saveStaffEdit = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const nisnValue = normalize(staffEditingNisn);
      const positionValue = normalize(staffEditForm.position);
      if (!nisnValue) {
        setStatus({ type: "error", text: "NISN tidak valid." });
        return;
      }
      if (!getOwnedStaffRow(nisnValue)) {
        setStatus({ type: "error", text: "Petugas tidak ditemukan pada tenant Anda." });
        return;
      }
      await update(ref(database, `master_staff/${nisnValue}`), {
        role: "osis",
        position: positionValue,
        status: staffEditForm.status,
        updatedAt: Date.now(),
      });
      setStatus({ type: "success", text: "Data petugas (OSIS) berhasil diperbarui." });
      cancelStaffEdit();
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menyimpan: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const deleteStaffRow = async (nisnValue: string) => {
    if (!window.confirm("Hapus petugas (OSIS) ini?")) return;
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const normalizedNisn = normalize(nisnValue);
      if (!normalizedNisn || !getOwnedStaffRow(normalizedNisn)) {
        setStatus({ type: "error", text: "Petugas tidak ditemukan pada tenant Anda." });
        return;
      }
      await remove(ref(database, `master_staff/${normalizedNisn}`));
      setStatus({ type: "success", text: "Petugas (OSIS) berhasil dihapus." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menghapus: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const normalizeTatibUsername = (value: unknown) => {
    return normalize(value).toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
  };

  const handleTatibCreate = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const username = normalizeTatibUsername(tatibCreateForm.username);
      const nameValue = normalize(tatibCreateForm.name);
      const passwordValue = normalize(tatibCreateForm.password);
      const isActive = Boolean(tatibCreateForm.isActive);
      if (!username || !nameValue || !passwordValue) {
        setStatus({ type: "error", text: "Nama, Username, dan Password wajib diisi." });
        return;
      }
      if (!schoolId) {
        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
        return;
      }
      const now = Date.now();
      await set(ref(database, `staff/${username}`), {
        username,
        name: nameValue,
        password: passwordValue,
        role: "staff",
        isActive,
        deviceId: null,
        schoolId,
        schoolName,
        npsn,
        createdAt: now,
        updatedAt: now,
      });
      setTatibCreateForm({ name: "", username: "", password: "", isActive: true });
      setTatibCreateOpen(false);
      setStatus({ type: "success", text: "Petugas OSIS berhasil ditambahkan." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menambahkan petugas: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const startTatibEdit = (r: TatibRow) => {
    setTatibEditingUsername(r.username);
    setTatibEditForm({
      name: r.name || "",
      password: r.password || "",
      isActive: r.isActive !== false,
    });
    setTatibEditOpen(true);
  };

  const cancelTatibEdit = () => {
    setTatibEditOpen(false);
    setTatibEditingUsername("");
    setTatibEditForm({ name: "", password: "", isActive: true });
  };

  const saveTatibEdit = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const username = normalizeTatibUsername(tatibEditingUsername);
      const nameValue = normalize(tatibEditForm.name);
      const passwordValue = normalize(tatibEditForm.password);
      const isActive = Boolean(tatibEditForm.isActive);
      if (!username) {
        setStatus({ type: "error", text: "Username tidak valid." });
        return;
      }
      if (!nameValue || !passwordValue) {
        setStatus({ type: "error", text: "Nama dan Password wajib diisi." });
        return;
      }
      if (!getOwnedTatibRow(username)) {
        setStatus({ type: "error", text: "Petugas Tatib tidak ditemukan pada tenant Anda." });
        return;
      }
      const now = Date.now();
      await update(ref(database, `staff/${username}`), {
        username,
        name: nameValue,
        password: passwordValue,
        role: "staff",
        isActive,
        schoolId,
        schoolName,
        npsn,
        updatedAt: now,
      });
      setStatus({ type: "success", text: "Data petugas Tatib berhasil diperbarui." });
      cancelTatibEdit();
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menyimpan: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const resetTatibDevice = async (usernameValue: string) => {
    if (!window.confirm("Reset device petugas ini? Mereka bisa login dengan perangkat baru.")) return;
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const username = normalizeTatibUsername(usernameValue);
      if (!username) {
        setStatus({ type: "error", text: "Username tidak valid." });
        return;
      }
      if (!getOwnedTatibRow(username)) {
        setStatus({ type: "error", text: "Petugas Tatib tidak ditemukan pada tenant Anda." });
        return;
      }
      await update(ref(database, `staff/${username}`), { deviceId: null, updatedAt: Date.now() });
      setStatus({ type: "success", text: "Device petugas berhasil direset." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal reset device: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const deleteTatibRow = async (usernameValue: string) => {
    if (!window.confirm("Hapus petugas Tatib ini?")) return;
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      const username = normalizeTatibUsername(usernameValue);
      if (!username || !getOwnedTatibRow(username)) {
        setStatus({ type: "error", text: "Petugas Tatib tidak ditemukan pada tenant Anda." });
        return;
      }
      await remove(ref(database, `staff/${username}`));
      setStatus({ type: "success", text: "Petugas OSIS berhasil dihapus." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menghapus: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const handleClassCreate = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      if (!schoolId) {
        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
        return;
      }
      const className = buildClassName(classCreateForm.className, selectedGrade);
      if (!className) {
        setStatus({ type: "error", text: "Nama kelas wajib diisi." });
        return;
      }
      if (!className.includes("-")) {
        setStatus({ type: "error", text: "Format kelas tidak valid. Contoh: VII-D" });
        return;
      }
      const grade = toGradeFromClass(className);
      if (grade !== selectedGrade) {
        setStatus({ type: "error", text: "Nama kelas harus sesuai dengan jenjang yang dipilih." });
        return;
      }
      const key = normalize(className).toUpperCase();
      if (classOptions.some((c) => normalize(c).toUpperCase() === key)) {
        setStatus({ type: "error", text: "Kelas ini sudah ada." });
        return;
      }
      const now = Date.now();
      const gasPromise = set(ref(database, `master_classes/${schoolId}/${className}`), {
        class: className,
        className,
        grade: selectedGrade,
        schoolId,
        schoolName,
        npsn,
        createdAt: now,
        updatedAt: now,
      });

      const classKey = normalizeEduLockClassKey(className);
      const edulockPromise = classKey
        ? set(ref(edulockDb, `schools/${schoolId}/classes/${classKey}`), {
            key: classKey,
            name: className,
            createdAt: now,
            updatedAt: now,
          })
        : Promise.resolve();

      await Promise.all([gasPromise, edulockPromise]);
      setClassCreateForm({ className: "" });
      setClassCreateOpen(false);
      setSelectedClass(className);
      setStatus({ type: "success", text: "Kelas berhasil ditambahkan." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menambahkan kelas: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const openClassEdit = (className: string) => {
    setClassEditingName(className);
    setClassEditForm({ className });
    setClassEditOpen(true);
  };

  const handleClassDelete = async (className: string) => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      if (!schoolId) {
        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
        return;
      }
      const key = normalize(className).toUpperCase();
      const count = studentCountByClass.get(key) || 0;
      if (count > 0) {
        setStatus({ type: "error", text: `Tidak bisa hapus kelas ini karena masih ada ${count} siswa. Pindahkan siswa dulu.` });
        return;
      }
      if (!window.confirm(`Hapus kelas ${className}?`)) return;
      const existing = manualClassMap.get(key);
      const classKey = normalizeEduLockClassKey(className);
      if (existing) {
        const gasPromise = remove(ref(database, `master_classes/${schoolId}/${className}`));
        const edulockPromise = classKey
          ? remove(ref(edulockDb, `schools/${schoolId}/classes/${classKey}`))
          : Promise.resolve();
        await Promise.all([gasPromise, edulockPromise]);
      } else {
        const gradeRaw = toGradeFromClass(className);
        const grade = gradeRaw === 7 || gradeRaw === 8 || gradeRaw === 9 ? gradeRaw : selectedGrade;
        const now = Date.now();
        const gasPromise = set(ref(database, `master_classes/${schoolId}/${className}`), {
          class: className,
          className,
          grade,
          disabled: true,
          schoolId,
          schoolName,
          npsn,
          createdAt: now,
          updatedAt: now,
        });
        const edulockPromise = classKey
          ? remove(ref(edulockDb, `schools/${schoolId}/classes/${classKey}`))
          : Promise.resolve();
        await Promise.all([gasPromise, edulockPromise]);
      }

      if (normalize(selectedClass).toUpperCase() === key) {
        const next = classOptions.find((c) => normalize(c).toUpperCase() !== key) || "";
        setSelectedClass(next);
      }
      setStatus({ type: "success", text: "Kelas berhasil dihapus." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menghapus kelas: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const handleClassEditSave = async () => {
    setStatus({ type: "", text: "" });
    setBusy(true);
    try {
      if (!schoolId) {
        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
        return;
      }
      const oldClassName = normalize(classEditingName);
      if (!oldClassName) {
        setStatus({ type: "error", text: "Kelas tidak valid." });
        return;
      }
      const newClassName = buildClassName(classEditForm.className, selectedGrade);
      if (!newClassName) {
        setStatus({ type: "error", text: "Nama kelas wajib diisi." });
        return;
      }
      if (!newClassName.includes("-")) {
        setStatus({ type: "error", text: "Format kelas tidak valid. Contoh: VII-D" });
        return;
      }
      const grade = toGradeFromClass(newClassName);
      if (grade !== selectedGrade) {
        setStatus({ type: "error", text: "Nama kelas harus sesuai dengan jenjang yang dipilih." });
        return;
      }

      const oldKey = normalize(oldClassName).toUpperCase();
      const newKey = normalize(newClassName).toUpperCase();
      if (oldKey === newKey) {
        setClassEditOpen(false);
        setClassEditingName("");
        setStatus({ type: "success", text: "Tidak ada perubahan." });
        return;
      }
      if (classOptions.some((c) => normalize(c).toUpperCase() === newKey)) {
        setStatus({ type: "error", text: "Nama kelas sudah digunakan." });
        return;
      }

      const now = Date.now();
      const updates: Record<string, any> = {};

      updates[`master_classes/${schoolId}/${newClassName}`] = {
        class: newClassName,
        className: newClassName,
        grade: selectedGrade,
        disabled: false,
        schoolId,
        schoolName,
        npsn,
        createdAt: now,
        updatedAt: now,
      };

      const existingOld = manualClassMap.get(oldKey);
      if (existingOld) {
        updates[`master_classes/${schoolId}/${oldClassName}`] = null;
      } else {
        updates[`master_classes/${schoolId}/${oldClassName}`] = {
          class: oldClassName,
          className: oldClassName,
          grade: selectedGrade,
          disabled: true,
          schoolId,
          schoolName,
          npsn,
          createdAt: now,
          updatedAt: now,
        };
      }

      const baseBySchool = studentRows.filter((r) => !schoolId || normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase());
      for (const s of baseBySchool) {
        if (normalize(s.class).toUpperCase() === oldKey) {
          updates[`master_students/${s.nisn}/class`] = newClassName;
          updates[`master_students/${s.nisn}/updatedAt`] = now;
          updates[`students/${s.nisn}/class`] = newClassName;
          updates[`students/${s.nisn}/syncedFrom`] = "portalkita";
          updates[`students/${s.nisn}/syncedAt`] = now;
        }
      }

      const edulockUpdates: Record<string, any> = {};
      for (const s of baseBySchool) {
        if (normalize(s.class).toUpperCase() === oldKey) {
          Object.assign(
            edulockUpdates,
            buildEduLockStudentPatch({
              nisn: s.nisn,
              name: normalize(s.name),
              className: newClassName,
              gender: s.gender || "",
              status: s.status || "Aktif",
              schoolId,
              schoolName,
              npsn,
              syncedAt: now,
            })
          );
        }
      }
      const oldClassKey = normalizeEduLockClassKey(oldClassName);
      const newClassKey = normalizeEduLockClassKey(newClassName);
      if (oldClassKey) edulockUpdates[`schools/${schoolId}/classes/${oldClassKey}`] = null;
      if (newClassKey) {
        edulockUpdates[`schools/${schoolId}/classes/${newClassKey}`] = {
          key: newClassKey,
          name: newClassName,
          createdAt: now,
          updatedAt: now,
        };
      }

      await Promise.all([update(ref(database), updates), update(ref(edulockDb), edulockUpdates)]);
      setSelectedClass(newClassName);
      setClassEditOpen(false);
      setClassEditingName("");
      setClassEditForm({ className: "" });
      setStatus({ type: "success", text: "Kelas berhasil diperbarui." });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal menyimpan kelas: ${String(e?.message || e)}` });
    } finally {
      setBusy(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
    }
  };

  const downloadStudentImportTemplate = () => {
    const headers = ["NISN", "NAMA LENGKAP", "L/P", "Kelas"];
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    ws["!cols"] = [{ wch: 18 }, { wch: 30 }, { wch: 6 }, { wch: 12 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Siswa");

    const bytes = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeSchool = normalize(schoolName).replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim();
    a.download = safeSchool ? `Template_Import_Siswa_${safeSchool}.xlsx` : "Template_Import_Siswa.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadPrincipalAccounts = () => {
    if (superPrincipals.length === 0) {
      setStatus({ type: "error", text: "Belum ada akun kepala sekolah untuk didownload." });
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
      return;
    }

    const rows = superPrincipals.map((p, index) => ({
      NO: index + 1,
      USERNAME: normalize(p.username),
      NAMA: normalize(p.name),
      SCHOOL_ID: normalize(p.schoolId),
      NAMA_SEKOLAH: normalize(p.schoolName),
      STATUS: p.isActive ? "Aktif" : "Nonaktif",
      DEVICE: p.deviceId ? "Terikat" : "Belum Terikat",
      LOGIN_TERAKHIR: formatDateTime(p.lastLoginAt || undefined),
      DIBUAT: formatDateTime(p.createdAt || undefined),
      DIPERBARUI: formatDateTime(p.updatedAt || undefined),
    }));

    const wsAccounts = XLSX.utils.json_to_sheet(rows);
    wsAccounts["!cols"] = [
      { wch: 8 },
      { wch: 24 },
      { wch: 28 },
      { wch: 20 },
      { wch: 34 },
      { wch: 14 },
      { wch: 18 },
      { wch: 22 },
      { wch: 22 },
      { wch: 22 },
    ];

    const infoRows = [
      ["KETERANGAN", "NILAI"],
      ["Jumlah akun", String(superPrincipals.length)],
      ["Diexport pada", new Date().toLocaleString("id-ID")],
      ["Catatan password", "Password asli tidak ikut diexport karena disimpan sebagai hash SHA-256."],
      ["Tindakan jika perlu bagikan ulang sandi", "Lakukan set/reset password dari panel admin sebelum dibagikan."],
    ];
    const wsInfo = XLSX.utils.aoa_to_sheet(infoRows);
    wsInfo["!cols"] = [{ wch: 34 }, { wch: 90 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsAccounts, "Akun Kepala Sekolah");
    XLSX.utils.book_append_sheet(wb, wsInfo, "Info");

    const bytes = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `Akun_Kepala_Sekolah_${stamp}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setStatus({ type: "success", text: `File akun kepala sekolah berhasil didownload (${superPrincipals.length} akun).` });
    setTimeout(() => setStatus({ type: "", text: "" }), 2500);
  };

  const regeneratePrincipalPasswordsAndDownload = async () => {
    if (superPrincipals.length === 0) {
      setStatus({ type: "error", text: "Belum ada akun kepala sekolah untuk diproses." });
      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
      return;
    }
    if (
      !window.confirm(
        `Generate password baru untuk semua akun kepala sekolah (${superPrincipals.length} akun)? Password lama akan diganti.`
      )
    ) {
      return;
    }

    setPrincipalSaving(true);
    setStatus({ type: "", text: "" });
    try {
      const now = Date.now();
      const updates: Record<string, any> = {};
      const exportedRows: Array<{
        USERNAME: string;
        NAMA: string;
        SEKOLAH: string;
        PASSWORD_BARU: string;
      }> = [];

      for (const principal of superPrincipals) {
        const usernameKey = normalizePrincipalUsername(principal.username);
        if (!usernameKey) continue;
        const plainPassword = generateSecurePassword(10);
        if (!plainPassword) {
          throw new Error("Browser tidak mendukung generator password aman. Gunakan browser modern.");
        }
        const credentialHash = await sha256Hex(plainPassword);
        if (!credentialHash) {
          throw new Error("Browser tidak mendukung hashing. Gunakan browser modern untuk reset password.");
        }

        updates[`principal_accounts/${usernameKey}/credentialHash`] = credentialHash;
        updates[`principal_accounts/${usernameKey}/updatedAt`] = now;
        exportedRows.push({
          USERNAME: normalize(principal.username),
          NAMA: normalize(principal.name),
          SEKOLAH: normalize(principal.schoolName || principal.schoolId),
          PASSWORD_BARU: plainPassword,
        });
      }

      if (exportedRows.length === 0) {
        throw new Error("Tidak ada akun kepala sekolah valid yang bisa diproses.");
      }

      await update(ref(database), updates);
      void emitPlatformEvent({
        type: "principal.bulk_password_reset",
        message: `Generate password massal akun kepala sekolah: ${exportedRows.length} akun`,
      });

      const wsAccounts = XLSX.utils.json_to_sheet(exportedRows);
      wsAccounts["!cols"] = [{ wch: 24 }, { wch: 28 }, { wch: 34 }, { wch: 20 }];

      const wsInfo = XLSX.utils.aoa_to_sheet([
        ["KETERANGAN", "NILAI"],
        ["Jumlah akun", String(exportedRows.length)],
        ["Diexport pada", new Date(now).toLocaleString("id-ID")],
        ["Catatan", "Password pada file ini adalah password baru yang baru saja digenerate oleh sistem."],
      ]);
      wsInfo["!cols"] = [{ wch: 24 }, { wch: 90 }];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, wsAccounts, "Password Baru Kepsek");
      XLSX.utils.book_append_sheet(wb, wsInfo, "Info");

      const bytes = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date(now).toISOString().slice(0, 10);
      a.href = url;
      a.download = `Password_Baru_Kepala_Sekolah_${stamp}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatus({ type: "success", text: `Password baru berhasil digenerate dan didownload (${exportedRows.length} akun).` });
    } catch (e: any) {
      setStatus({ type: "error", text: `Gagal generate password massal: ${String(e?.message || e)}` });
    } finally {
      setPrincipalSaving(false);
      setTimeout(() => setStatus({ type: "", text: "" }), 3000);
    }
  };

  if (!mounted || !_hasHydrated || isEduLockAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(99,102,241,0.28),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(34,211,238,0.18),transparent_50%),radial-gradient(800px_circle_at_50%_85%,rgba(168,85,247,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
        </div>
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-4 text-sm font-semibold text-slate-200 shadow-xl backdrop-blur">
            Memuat...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (user?.role !== "admin" && user?.role !== "super_admin")) return null;

  if (user?.role === "super_admin") {
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

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_10%,rgba(99,102,241,0.26),transparent_55%),radial-gradient(900px_circle_at_85%_15%,rgba(34,211,238,0.16),transparent_50%),radial-gradient(800px_circle_at_50%_90%,rgba(168,85,247,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="w-full shrink-0 lg:w-80">
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
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
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
                    {superSection === "tenants"
                      ? "1"
                      : superSection === "school_admins"
                        ? "2"
                        : superSection === "audit"
                          ? "3"
                          : "-"}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setSuperSection("tenants")}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                      superSection === "tenants"
                        ? "border-indigo-400/30 bg-indigo-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-extrabold text-slate-100 ring-1 ring-white/10">
                      1
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">Buat Sekolah</div>
                      <div className="mt-1 text-xs text-slate-300">
                        Daftarkan tenant, NPSN, email login/admin, dan status buka/tutup tenant.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSuperSection("school_admins")}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                      superSection === "school_admins"
                        ? "border-indigo-400/30 bg-indigo-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-extrabold text-slate-100 ring-1 ring-white/10">
                      2
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">Set Admin</div>
                      <div className="mt-1 text-xs text-slate-300">
                        Aktivasi/nonaktif admin sekolah, reset password, dan validasi akses.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSuperSection("audit")}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                      superSection === "audit"
                        ? "border-indigo-400/30 bg-indigo-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-extrabold text-slate-100 ring-1 ring-white/10">
                      3
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">Cek Audit/Monitoring</div>
                      <div className="mt-1 text-xs text-slate-300">
                        Pantau log kejadian terbaru untuk memastikan operasional tenant berjalan.
                      </div>
                    </div>
                  </button>
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
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
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
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">UPDATED</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold tracking-widest text-slate-300">AKSI</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {superSchools.map((s) => (
                            <tr key={s.schoolId} className="hover:bg-white/5">
                              <td className="px-4 py-3">
                                <div className="font-semibold text-white">{s.name || "-"}</div>
                                <div className="text-xs text-slate-400">{s.schoolId}</div>
                              </td>
                              <td className="px-4 py-3 text-slate-200">{s.npsn || "-"}</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-700/80 text-slate-100 ring-1 ring-slate-500/30">
                                  Terdaftar
                                </span>
                                <span
                                  className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    s.isActive ? "bg-cyan-500/10 text-cyan-100 ring-1 ring-cyan-400/20" : "bg-amber-500/10 text-amber-100 ring-1 ring-amber-400/20"
                                  }`}
                                >
                                  {s.isActive ? "Tenant Dibuka" : "Tenant Ditutup"}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {(() => {
                                  const adminRow = schoolAdminRowBySchoolId.get(normalize(s.schoolId).toLowerCase());
                                  const ready = adminRow ? Boolean(adminRow.loginIdentifier) : false;
                                  const live = hasOperationalRuntime(adminRow);
                                  return (
                                    <>
                                      <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                          ready
                                            ? "bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-400/20"
                                            : "bg-yellow-500/10 text-yellow-100 ring-1 ring-yellow-400/20"
                                        }`}
                                      >
                                        {ready ? "Login Dibuka" : "Login Belum Siap"}
                                      </span>
                                      <span
                                        className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                          live
                                            ? "bg-cyan-500/10 text-cyan-100 ring-1 ring-cyan-400/20"
                                            : "bg-slate-700/80 text-slate-100 ring-1 ring-slate-500/30"
                                        }`}
                                      >
                                        {live ? "Live" : "Belum Live"}
                                      </span>
                                    </>
                                  );
                                })()}
                              </td>
                              <td className="px-4 py-3 text-slate-200">{formatDateTime(s.updatedAt || undefined)}</td>
                              <td className="px-4 py-3 text-right space-x-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSuperSchoolForm({
                                      schoolId: s.schoolId,
                                      name: s.name,
                                      district: s.district,
                                      npsn: s.npsn,
                                      authEmail: s.authEmail,
                                      adminEmail: s.adminEmail,
                                      backupEmail: s.backupEmail,
                                      isActive: s.isActive,
                                    })
                                  }
                                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  disabled={superSaving}
                                  onClick={() => toggleSuperSchoolActive(s.schoolId, !s.isActive)}
                                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                                >
                                  {s.isActive ? "Tutup Tenant" : "Buka Tenant"}
                                </button>
                              </td>
                            </tr>
                          ))}
                          {superSchools.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
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
                        {superSchoolAdmins.map((a) => (
                          <tr key={a.schoolId} className="hover:bg-white/5">
                            <td className="px-4 py-3">
                              <div className="font-semibold text-white">{a.loginIdentifier || "-"}</div>
                              <div className="text-xs text-slate-400">
                                {a.resetEmail
                                  ? `Reset via ${a.resetEmail}`
                                  : a.npsn
                                    ? `Login awal: NPSN ${a.npsn}`
                                    : "Lengkapi NPSN atau email login"}
                              </div>
                              {a.runtimeEmail && a.runtimeEmail !== a.loginIdentifier && (
                                <div className="text-xs text-slate-500">Runtime: {a.runtimeEmail}</div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-slate-200">{a.schoolName || "-"}</div>
                              <div className="text-xs text-slate-400">{a.schoolId || ""}</div>
                            </td>
                            <td className="px-4 py-3 text-slate-200">{formatDateTime(a.runtimeLastLoginAt || undefined)}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                  a.accessActive && a.schoolActive
                                    ? "bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-400/20"
                                    : "bg-red-500/10 text-red-100 ring-1 ring-red-400/20"
                                }`}
                              >
                                {a.accessActive && a.schoolActive ? "Login Dibuka" : "Login Ditutup"}
                              </span>
                              {!a.schoolActive && (
                                <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-700/80 text-slate-100 ring-1 ring-slate-500/30">
                                  Tenant Ditutup
                                </span>
                              )}
                              {hasOperationalRuntime(a) ? (
                                <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-cyan-500/10 text-cyan-100 ring-1 ring-cyan-400/20">
                                  Live
                                </span>
                              ) : (
                                <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-700/80 text-slate-100 ring-1 ring-slate-500/30">
                                  Belum Live
                                </span>
                              )}
                              {a.runtimeMustChangePassword && (
                                <span className="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-500/10 text-yellow-100 ring-1 ring-yellow-400/20">
                                  Wajib ganti
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right space-x-2">
                              <button
                                type="button"
                                disabled={superSaving}
                                onClick={() => toggleSchoolAdminAccess(a, !a.accessActive)}
                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                              >
                                {a.accessActive ? "Tutup Login" : "Buka Login"}
                              </button>
                              <button
                                type="button"
                                disabled={superSaving}
                                onClick={() => resetSchoolAdminPassword(a)}
                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                              >
                                Reset via Email
                              </button>
                            </td>
                          </tr>
                        ))}
                        {superSchoolAdmins.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                              Belum ada data admin.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {superSection === "principals" && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">Tambah / Update Akun Kepala Sekolah</div>
                        <div className="mt-1 text-sm text-slate-300">
                          Akun ini dipakai untuk login APK Kepala Sekolah. Scope data terkunci lewat schoolId.
                        </div>
                      </div>
                      {principalEditing && (
                        <button
                          type="button"
                          onClick={() => {
                            setPrincipalEditing("");
                            setPrincipalForm({ username: "", name: "", schoolId: "", schoolName: "", password: "", isActive: true });
                          }}
                          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
                        >
                          Batal Edit
                        </button>
                      )}
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold tracking-widest text-slate-400">USERNAME</label>
                        <input
                          value={principalForm.username}
                          disabled={!!principalEditing}
                          onChange={(e) => setPrincipalForm((s) => ({ ...s, username: e.target.value }))}
                          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400 disabled:opacity-60"
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
                        <select
                          value={principalForm.schoolId}
                          onChange={(e) => {
                            const next = e.target.value;
                            const school = superSchools.find((s) => s.schoolId === next);
                            setPrincipalForm((s) => ({ ...s, schoolId: next, schoolName: s.schoolName || school?.name || "" }));
                          }}
                          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white"
                        >
                          <option value="">Pilih sekolah</option>
                          {superSchools.map((s) => (
                            <option key={s.schoolId} value={s.schoolId}>
                              {s.name || s.schoolId}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-widest text-slate-400">SCHOOL NAME</label>
                        <input
                          value={principalForm.schoolName}
                          onChange={(e) => setPrincipalForm((s) => ({ ...s, schoolName: e.target.value }))}
                          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                          placeholder="Nama sekolah (otomatis dari registry)"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-widest text-slate-400">PASSWORD / NIP</label>
                        <input
                          value={principalForm.password}
                          onChange={(e) => setPrincipalForm((s) => ({ ...s, password: e.target.value }))}
                          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-400"
                          placeholder={principalEditing ? "Kosongkan jika tidak diubah" : "Wajib untuk akun baru"}
                        />
                        <div className="mt-1 text-xs text-slate-400">Disimpan sebagai hash (SHA-256), bukan plaintext.</div>
                      </div>
                      <div className="flex items-center gap-2 sm:mt-7">
                        <input
                          id="principalActive"
                          type="checkbox"
                          checked={principalForm.isActive}
                          onChange={(e) => setPrincipalForm((s) => ({ ...s, isActive: e.target.checked }))}
                        />
                        <label htmlFor="principalActive" className="text-sm text-slate-200">
                          Akun aktif
                        </label>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={principalSaving}
                        onClick={upsertPrincipalAccount}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
                      >
                        Simpan
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl backdrop-blur overflow-hidden">
                    <div className="border-b border-white/10 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm font-semibold text-white">Akun Kepala Sekolah ({filteredSuperPrincipals.length})</div>
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
                          <button
                            type="button"
                            onClick={regeneratePrincipalPasswordsAndDownload}
                            disabled={principalSaving || superPrincipals.length === 0}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm ring-1 ring-white/10 hover:bg-amber-400 disabled:opacity-60"
                          >
                            <Lock className="h-4 w-4" />
                            Generate Password Baru + Download
                          </button>
                          <button
                            type="button"
                            onClick={downloadPrincipalAccounts}
                            disabled={principalSaving || superPrincipals.length === 0}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm backdrop-blur hover:bg-white/10 disabled:opacity-60"
                          >
                            <Download className="h-4 w-4" />
                            Download Semua Akun
                          </button>
                          <div className="relative w-full sm:w-96">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                              value={principalQuery}
                              onChange={(e) => setPrincipalQuery(e.target.value)}
                              className="w-full rounded-xl border border-white/10 bg-slate-800 pl-10 pr-3 py-2 text-sm text-white placeholder:text-slate-400"
                              placeholder="Cari username / nama / sekolah"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-slate-400">
                        Tombol kuning akan mengganti password lama semua akun dan mengunduh file Excel password baru. Tombol download biasa hanya mengunduh data akun tanpa password.
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-white/10 text-sm">
                        <thead className="bg-white/5">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">AKUN</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">SEKOLAH</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">LOGIN TERAKHIR</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">DEVICE</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest text-slate-300">STATUS</th>
                            <th className="px-4 py-3 text-right text-xs font-semibold tracking-widest text-slate-300">AKSI</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {filteredSuperPrincipals.map((p) => (
                            <tr key={p.username} className="hover:bg-white/5">
                              <td className="px-4 py-3">
                                <div className="font-semibold text-white">{p.username}</div>
                                <div className="text-xs text-slate-400">{p.name || "-"}</div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-slate-200">{p.schoolName || "-"}</div>
                                <div className="text-xs text-slate-400">{p.schoolId || ""}</div>
                              </td>
                              <td className="px-4 py-3 text-slate-200">{formatDateTime(p.lastLoginAt || undefined)}</td>
                              <td className="px-4 py-3 text-slate-200">{p.deviceId ? "Terikat" : "-"}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    p.isActive ? "bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-400/20" : "bg-red-500/10 text-red-100 ring-1 ring-red-400/20"
                                  }`}
                                >
                                  {p.isActive ? "Aktif" : "Nonaktif"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right space-x-2">
                                <button
                                  type="button"
                                  onClick={() => startEditPrincipal(p)}
                                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  disabled={principalSaving || !p.deviceId}
                                  onClick={() => resetPrincipalDevice(p.username)}
                                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                                >
                                  Reset Device
                                </button>
                                <button
                                  type="button"
                                  disabled={principalSaving}
                                  onClick={() => togglePrincipalActive(p.username, !p.isActive)}
                                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
                                >
                                  {p.isActive ? "Nonaktifkan" : "Aktifkan"}
                                </button>
                                <button
                                  type="button"
                                  disabled={principalSaving}
                                  onClick={() => deletePrincipalAccount(p.username)}
                                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-red-200 hover:bg-white/10 disabled:opacity-60"
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          ))}
                          {filteredSuperPrincipals.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                                Belum ada akun kepala sekolah.
                              </td>
                            </tr>
                          )}
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
                        {superViolations.map((l) => (
                          <tr key={l.id} className="hover:bg-white/5">
                            <td className="px-4 py-3 text-slate-200">{formatDateTime(l.timestamp || undefined)}</td>
                            <td className="px-4 py-3 font-semibold text-white">{l.nisn || "-"}</td>
                            <td className="px-4 py-3 text-slate-200">{l.type || "-"}</td>
                            <td className="px-4 py-3 text-slate-200">{l.description || "-"}</td>
                          </tr>
                        ))}
                        {superViolations.length === 0 && (
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

              {superSection !== "tenants" && superSection !== "school_admins" && superSection !== "principals" && superSection !== "audit" && (
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur">
                  <div className="text-sm font-semibold text-white">Dalam Pengembangan</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Menu ini disiapkan sesuai arsitektur Super Admin dan akan diaktifkan setelah node data dan alur realtime ditetapkan.
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }

  const headerTitle =
    activeSub === "teachers"
      ? "Manajemen Wali Kelas"
      : activeSub === "staff"
        ? "Manajemen Petugas OSIS"
        : activeSub === "classes"
          ? "Manajemen Kelas"
          : "Manajemen Siswa";
  const headerSubtitle =
    activeSub === "teachers"
      ? "Kelola data guru dan wali kelas"
      : activeSub === "staff"
        ? "Siswa yang didaftarkan sebagai Petugas OSIS akan mendapat menu tambahan di EduLock"
        : activeSub === "classes"
          ? `Kelola kelas paralel ${schoolName ? `${schoolName}` : ""} (Terhubung ke Database)`
          : `Kelola data siswa ${schoolName ? `${schoolName}` : ""} (Terhubung ke Database)`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_10%,rgba(99,102,241,0.26),transparent_55%),radial-gradient(900px_circle_at_85%_15%,rgba(34,211,238,0.16),transparent_50%),radial-gradient(800px_circle_at_50%_90%,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
      </div>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">{headerTitle}</h1>
            <p className="mt-1 text-slate-300">{headerSubtitle}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              Terakhir disinkronisasi: <span className="text-slate-200">{formatDateTime(lastSyncAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {activeSub === "students" && (
              <>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setLastSyncAt(Date.now());
                    setStatus({ type: "success", text: "Data dimuat ulang." });
                    setTimeout(() => setStatus({ type: "", text: "" }), 1500);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
                >
                  <RefreshCw className="h-4 w-4" />
                  Muat Ulang Data
                </button>

                <button
                  type="button"
                  disabled={busy}
                  onClick={async () => {
                    if (!schoolId) {
                      setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
                      return;
                    }
                    if (!window.confirm("Hapus semua data siswa untuk sekolah ini?")) return;
                    setBusy(true);
                    setStatus({ type: "", text: "" });
                    try {
                      const updates: Record<string, any> = {};
                      for (const r of studentRows) {
                        if (normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase()) {
                          updates[`master_students/${r.nisn}`] = null;
                          updates[`students/${r.nisn}`] = null;
                        }
                      }
                      const edulockUpdates: Record<string, any> = {};
                      for (const r of studentRows) {
                        if (normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase()) {
                          Object.assign(edulockUpdates, buildEduLockStudentDeletePatch({ nisn: r.nisn, schoolId }));
                        }
                      }
                      await Promise.all([update(ref(database), updates), update(ref(edulockDb), edulockUpdates)]);
                      setStatus({ type: "success", text: "Semua data siswa berhasil dihapus." });
                    } catch (e: any) {
                      setStatus({ type: "error", text: `Gagal menghapus semua: ${String(e?.message || e)}` });
                    } finally {
                      setBusy(false);
                      setTimeout(() => setStatus({ type: "", text: "" }), 2500);
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-red-600 disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus Semua
                </button>

                {selectedGrade === 9 && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={deleteSelectedGradeStudents}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 shadow-sm ring-1 ring-red-400/20 hover:bg-red-500/15 disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus Jenjang 9
                  </button>
                )}

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-emerald-600">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      e.currentTarget.value = "";
                      if (!file) return;
                      if (!schoolId) {
                        setStatus({ type: "error", text: "Profil admin belum memiliki schoolId. Hubungi admin pusat." });
                        return;
                      }
                      setBusy(true);
                      setStatus({ type: "", text: "" });
                      try {
                        const buf = await file.arrayBuffer();
                        const workbook = XLSX.read(buf, { type: "array" });
                        const sheet = workbook.Sheets[workbook.SheetNames[0]];
                        const rowsX: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
                        const now = Date.now();
                        const updates: Record<string, any> = {};
                        const edulockUpdates: Record<string, any> = {};
                        let count = 0;
                        let skipped = 0;
                        for (const r of rowsX) {
                          const nisnValue = normalize(r.NISN || r.nisn || r.Nisn);
                          const nameValue = normalize(r["NAMA LENGKAP"] || r.Nama || r.NAMA || r.name || r.Nama_Lengkap);
                          const classValue = normalize(r.Kelas || r.KELAS || r.class);
                          const genderValue = String(r["L/P"] || r.LP || r.Gender || r.gender || "").trim().toUpperCase();
                          const gender = genderValue === "P" ? "P" : genderValue === "L" ? "L" : "";
                          if (!nisnValue || !nameValue || !classValue) {
                            skipped += 1;
                            continue;
                          }
                          if (!allowedStudentClassSet.has(normalize(classValue).toUpperCase())) {
                            skipped += 1;
                            continue;
                          }
                          updates[`master_students/${nisnValue}`] = {
                            nisn: nisnValue,
                            name: nameValue,
                            class: classValue,
                            gender,
                            status: "Aktif",
                            device: "",
                            schoolId,
                            schoolName,
                            npsn,
                            createdAt: now,
                            updatedAt: now,
                          };
                          Object.assign(
                            updates,
                            buildLegacyStudentPatch({
                              nisn: nisnValue,
                              name: nameValue,
                              className: classValue,
                              gender,
                              status: "Aktif",
                              schoolId,
                              schoolName,
                              npsn,
                              syncedAt: now,
                            })
                          );
                          Object.assign(
                            edulockUpdates,
                            buildEduLockStudentPatch({
                              nisn: nisnValue,
                              name: nameValue,
                              className: classValue,
                              gender,
                              status: "Aktif",
                              schoolId,
                              schoolName,
                              npsn,
                              syncedAt: now,
                            })
                          );
                          count += 1;
                        }
                        await Promise.all([update(ref(database), updates), update(ref(edulockDb), edulockUpdates)]);
                        if (skipped > 0) {
                          setStatus({ type: "success", text: `Berhasil import ${count} data siswa. (${skipped} baris dilewati)` });
                        } else {
                          setStatus({ type: "success", text: `Berhasil import ${count} data siswa.` });
                        }
                      } catch (err: any) {
                        setStatus({ type: "error", text: `Gagal import: ${String(err?.message || err)}` });
                      } finally {
                        setBusy(false);
                        setTimeout(() => setStatus({ type: "", text: "" }), 2500);
                      }
                    }}
                  />
                  <FileSpreadsheet className="h-4 w-4" />
                  Import Excel
                </label>

                <button
                  type="button"
                  disabled={busy}
                  onClick={downloadStudentImportTemplate}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm backdrop-blur hover:bg-white/10 disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </button>

                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setCreateForm((s) => ({ ...s, class: selectedClass || s.class }));
                    setCreateOpen(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-sky-600 disabled:opacity-60"
                >
                  <Plus className="h-4 w-4" />
                  Tambah Siswa
                </button>
              </>
            )}

            {activeSub === "teachers" && (
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setTeacherCreateForm((s) => ({ ...s, class: teacherClassOptions[0] || s.class || "" }));
                  setTeacherCreateOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-sky-600 disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                Tambah Guru
              </button>
            )}

            {activeSub === "staff" && (
              <button
                type="button"
                disabled={busy}
                onClick={() => setStaffCreateOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-sky-600 disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
                Tambah Petugas OSIS
              </button>
            )}

            {activeSub === "classes" && (
              null
            )}

            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm backdrop-blur hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
          <aside className="h-fit rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl backdrop-blur">
            <div className="text-xs font-semibold tracking-widest text-slate-400">MENU DATABASE</div>
            <div className="mt-3 space-y-2">
              <Link
                to="/admin/students?sub=students"
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  activeSub === "students"
                    ? "border-indigo-400/30 bg-indigo-500/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <span>Siswa</span>
                <span className="text-xs text-slate-400">1</span>
              </Link>
              <Link
                to="/admin/students?sub=teachers"
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  activeSub === "teachers"
                    ? "border-indigo-400/30 bg-indigo-500/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <span>Guru/Wali Kelas</span>
                <span className="text-xs text-slate-400">2</span>
              </Link>
              <Link
                to="/admin/students?sub=staff"
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  activeSub === "staff"
                    ? "border-indigo-400/30 bg-indigo-500/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <span>Petugas OSIS</span>
                <span className="text-xs text-slate-400">3</span>
              </Link>
              <Link
                to="/admin/students?sub=classes"
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  activeSub === "classes"
                    ? "border-indigo-400/30 bg-indigo-500/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <span>Kelas Paralel</span>
                <span className="text-xs text-slate-400">4</span>
              </Link>
            </div>
          </aside>

          <div className="space-y-6">
            {status.type && (
              <div
                className={`rounded-xl border p-4 text-sm backdrop-blur ${
                  status.type === "success"
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
                    : "border-red-400/20 bg-red-500/10 text-red-100"
                }`}
              >
                {status.text}
              </div>
            )}

            {activeSub === "teachers" ? (
          <>
            <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-4 text-indigo-100 backdrop-blur">
              <div className="flex items-start gap-2">
                <Lock className="mt-0.5 h-5 w-5 text-indigo-200" />
                <div>
                  <div className="font-semibold">Info Login Aplikasi</div>
                  <div className="mt-1 text-sm">
                    Gunakan <span className="font-semibold">Nama Lengkap</span> sebagai Username dan{" "}
                    <span className="font-semibold">NUPTK</span> sebagai Password.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-slate-100 placeholder:text-slate-400 shadow-sm backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                placeholder="Cari Nama Guru..."
              />
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm backdrop-blur">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Nama</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">NUPTK</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Kelas</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-300">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredTeachers.map((r) => {
                      const isActive = (r.status || "Aktif") === "Aktif";
                      const classValue = normalize(r.class);
                      const classLabel = classValue ? (classValue.toUpperCase().includes("KELAS") ? classValue : `Kelas ${classValue}`) : "-";
                      return (
                        <tr key={r.nuptk} className="hover:bg-white/5">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-white">{r.name || "-"}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-200">{r.nuptk || "-"}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-200 ring-1 ring-fuchsia-400/20">
                              {classLabel}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                                isActive
                                  ? "bg-emerald-500/10 text-emerald-200 ring-emerald-400/20"
                                  : "bg-white/5 text-slate-200 ring-white/10"
                              }`}
                            >
                              {isActive ? "Aktif" : "Nonaktif"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex items-center gap-3">
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => startTeacherEdit(r)}
                                className="text-sky-300 hover:text-sky-200 disabled:opacity-50"
                                aria-label="Edit"
                              >
                                <Pencil className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => deleteTeacherRow(r.nuptk)}
                                className="text-red-300 hover:text-red-200 disabled:opacity-50"
                                aria-label="Hapus"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredTeachers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                          Belum ada data guru/wali kelas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-sm text-slate-300">
              Menampilkan {filteredTeachers.length} dari{" "}
              {teacherRows.filter((r) => !schoolId || normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase()).length} guru
            </div>
          </>
        ) : activeSub === "staff" ? (
          <>
            <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-4 text-indigo-100 backdrop-blur">
              <div className="flex items-start gap-2">
                <Lock className="mt-0.5 h-5 w-5 text-indigo-200" />
                <div>
                  <div className="font-semibold">Info Login Aplikasi</div>
                  <div className="mt-1 text-sm">
                    Petugas OSIS tetap menggunakan akun siswa. Akses OSIS aktif jika NISN terdaftar sebagai{" "}
                    <span className="font-semibold">Petugas (OSIS)</span>.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-slate-100 placeholder:text-slate-400 shadow-sm backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                placeholder="Cari Nama, NISN, Jabatan, atau Kelas..."
              />
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm backdrop-blur">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Nama</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">NISN</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Kelas</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Jabatan</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-300">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredStaff.map((r) => {
                      const isActive = (r.status || "Aktif") === "Aktif";
                      const student = studentRows.find((s) => normalize(s.nisn) === normalize(r.nisn));
                      return (
                        <tr key={r.nisn} className="hover:bg-white/5">
                          <td className="px-4 py-3">
                            <div className="font-semibold text-white">{student?.name || "-"}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-200">{r.nisn || "-"}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200 ring-1 ring-sky-400/20">
                              {student?.class || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-200 ring-1 ring-fuchsia-400/20">
                              {normalize(r.position) || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                                isActive
                                  ? "bg-emerald-500/10 text-emerald-200 ring-emerald-400/20"
                                  : "bg-white/5 text-slate-200 ring-white/10"
                              }`}
                            >
                              {isActive ? "Aktif" : "Nonaktif"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex items-center gap-3">
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => startStaffEdit(r)}
                                className="text-sky-300 hover:text-sky-200 disabled:opacity-50"
                                aria-label="Edit"
                              >
                                <Pencil className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => deleteStaffRow(r.nisn)}
                                className="text-red-300 hover:text-red-200 disabled:opacity-50"
                                aria-label="Hapus"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredStaff.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                          Belum ada petugas (OSIS).
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-sm text-slate-300">
              Menampilkan {filteredStaff.length} dari{" "}
              {staffRows
                .filter((r) => !schoolId || normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase())
                .filter((r) => (r.role || "osis") === "osis").length}{" "}
              petugas
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur">
              <div className="flex flex-wrap gap-2">
                {gradeTabs.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold ring-1 ${
                      selectedGrade === g
                        ? "bg-indigo-600/90 text-white ring-white/10"
                        : "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
                    }`}
                  >
                    {g === 7 ? "Kelas 7" : g === 8 ? "Kelas 8" : "Kelas 9"}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-200">Kelas Paralel</div>
                  {activeSub === "classes" ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        setClassCreateForm({ className: "" });
                        setClassCreateOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/10 hover:bg-white/10 disabled:opacity-60"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Kelas
                    </button>
                  ) : null}
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                  <div className="divide-y divide-white/10">
                    {classOptions.map((c) => {
                      const key = normalize(c).toUpperCase();
                      const isSelected = normalize(selectedClass).toUpperCase() === key;
                      const count = studentCountByClass.get(key) || 0;
                      const suffix = normalize(c.split("-")[1] || c);
                      const avatarText = (suffix || "?").slice(0, 2).toUpperCase();
                      return (
                        <div
                          key={c}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedClass(c)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedClass(c);
                            }
                          }}
                          className={`flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition ${
                            isSelected ? "bg-white/10" : "hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sm font-extrabold text-sky-200 ring-1 ring-sky-400/20">
                              {avatarText}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-bold text-white">{c}</div>
                              <div className="mt-1 inline-flex items-center gap-2 text-sm text-slate-300">
                                <Users className="h-4 w-4 text-slate-400" />
                                {count} Siswa
                              </div>
                            </div>
                          </div>

                          {activeSub === "classes" ? (
                            <div className="flex shrink-0 items-center gap-3">
                              <button
                                type="button"
                                disabled={busy}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  openClassEdit(c);
                                }}
                                className="text-slate-300 hover:text-white disabled:opacity-50"
                                aria-label="Edit kelas"
                              >
                                <Pencil className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                disabled={busy}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleClassDelete(c);
                                }}
                                className="text-slate-300 hover:text-red-200 disabled:opacity-50"
                                aria-label="Hapus kelas"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {activeSub === "students" ? (
              <>
                <div className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-4 text-indigo-100 backdrop-blur">
                  Data siswa ini terhubung dengan Aplikasi Siswa.
                  <div className="mt-1 font-semibold">Username: Nama Lengkap (Sesuai Data) | Password: NISN</div>
                  <div className="mt-1 text-xs text-indigo-200/90">
                    Ikon gembok di kolom aksi digunakan untuk reset device binding siswa.
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-slate-100 placeholder:text-slate-400 shadow-sm backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                    placeholder="Cari nama, NISN, atau kelas..."
                  />
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm backdrop-blur">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-sm">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">NISN</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Nama Lengkap</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">L/P</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Kelas</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">Device</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-300">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filtered.map((r) => {
                          const isActive = (r.status || "Aktif") === "Aktif";
                          return (
                            <tr key={r.nisn} className="hover:bg-white/5">
                              <td className="px-4 py-3 font-semibold text-white">{r.nisn}</td>
                              <td className="px-4 py-3">
                                <div className="font-semibold text-white">{r.name || "-"}</div>
                              </td>
                              <td className="px-4 py-3 text-slate-200">{r.gender || "-"}</td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200 ring-1 ring-sky-400/20">
                                  {r.class || "-"}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                                    isActive
                                      ? "bg-emerald-500/10 text-emerald-200 ring-emerald-400/20"
                                      : "bg-white/5 text-slate-200 ring-white/10"
                                  }`}
                                >
                                  {isActive ? "Aktif" : "Nonaktif"}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-flex items-center rounded-md bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 ring-1 ring-white/10">
                                  {r.device || "-"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="inline-flex items-center gap-3">
                                  <button
                                    type="button"
                                    disabled={busy}
                                    onClick={() => resetStudentDeviceBinding(r.nisn)}
                                    className="text-orange-300 hover:text-orange-200 disabled:opacity-50"
                                    aria-label="Reset Device Binding"
                                    title="Reset Device Binding"
                                  >
                                    <Lock className="h-5 w-5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={busy}
                                    onClick={() => startEdit(r)}
                                    className="text-sky-300 hover:text-sky-200 disabled:opacity-50"
                                    aria-label="Edit"
                                  >
                                    <Pencil className="h-5 w-5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={busy}
                                    onClick={() => deleteRow(r.nisn)}
                                    className="text-red-300 hover:text-red-200 disabled:opacity-50"
                                    aria-label="Hapus"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {filtered.length === 0 && (
                          <tr>
                            <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                              Belum ada data siswa untuk kelas ini.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-sm text-slate-300">
                  Menampilkan {filtered.length} dari{" "}
                  {studentRows.filter((r) => !schoolId || normalize(r.schoolId).toLowerCase() === schoolId.toLowerCase()).length} siswa
                </div>
              </>
            ) : null}
          </>
        )}
          </div>
        </div>
      </div>

      {classCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Tambah Kelas</div>
            <div className="mt-1 text-sm text-slate-300">Jenjang: {romanFromGrade(selectedGrade)}</div>
            <div className="mt-4 grid gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Nama Kelas</label>
                <input
                  value={classCreateForm.className}
                  onChange={(e) => setClassCreateForm({ className: e.target.value })}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                  placeholder={`${romanFromGrade(selectedGrade)}-A`}
                />
                <div className="mt-2 text-xs text-slate-400">
                  Contoh: {romanFromGrade(selectedGrade)}-D atau cukup isi D (otomatis menjadi {romanFromGrade(selectedGrade)}-D)
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setClassCreateOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleClassCreate}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {classEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Edit Kelas</div>
            <div className="mt-1 text-sm text-slate-300">Kelas saat ini: {classEditingName || "-"}</div>
            <div className="mt-4 grid gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Nama Kelas Baru</label>
                <input
                  value={classEditForm.className}
                  onChange={(e) => setClassEditForm({ className: e.target.value })}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                  placeholder={`${romanFromGrade(selectedGrade)}-A`}
                />
                <div className="mt-2 text-xs text-slate-400">
                  Contoh: {romanFromGrade(selectedGrade)}-D atau cukup isi D (otomatis menjadi {romanFromGrade(selectedGrade)}-D)
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => {
                  setClassEditOpen(false);
                  setClassEditingName("");
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleClassEditSave}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Tambah Siswa</div>
            <div className="mt-1 text-sm text-slate-300">{schoolName ? `Sekolah: ${schoolName}` : ""}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">NISN</label>
                <input
                  value={createForm.nisn}
                  onChange={(e) => setCreateForm((s) => ({ ...s, nisn: e.target.value }))}
                  disabled={busy}
                  inputMode="numeric"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">L/P</label>
                <select
                  value={createForm.gender}
                  onChange={(e) => setCreateForm((s) => ({ ...s, gender: e.target.value as any }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                >
                  <option value="L" className="bg-slate-950 text-slate-100">
                    L
                  </option>
                  <option value="P" className="bg-slate-950 text-slate-100">
                    P
                  </option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Agama</label>
                <select
                  value={createForm.religion}
                  onChange={(e) => setCreateForm((s) => ({ ...s, religion: e.target.value as any }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                >
                  <option value="ISLAM" className="bg-slate-950 text-slate-100">
                    Islam
                  </option>
                  <option value="NON_ISLAM" className="bg-slate-950 text-slate-100">
                    Non Muslim
                  </option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Nama Lengkap</label>
                <input
                  value={createForm.name}
                  onChange={(e) => setCreateForm((s) => ({ ...s, name: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Kelas</label>
                <select
                  value={createForm.class}
                  onChange={(e) => setCreateForm((s) => ({ ...s, class: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                >
                  <option value="" disabled className="bg-slate-950 text-slate-400">
                    Pilih kelas...
                  </option>
                  {classOptions.map((c) => (
                    <option key={c} value={c} className="bg-slate-950 text-slate-100">
                      {c}
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-xs text-slate-400">Kelas hanya bisa dipilih dari daftar Kelas Paralel.</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setCreateOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleCreate}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {teacherCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Tambah Guru/Wali Kelas</div>
            <div className="mt-1 text-sm text-slate-300">{schoolName ? `Sekolah: ${schoolName}` : ""}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">NUPTK</label>
                <input
                  value={teacherCreateForm.nuptk}
                  onChange={(e) => setTeacherCreateForm((s) => ({ ...s, nuptk: e.target.value }))}
                  disabled={busy}
                  inputMode="numeric"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Kelas</label>
                <select
                  value={teacherCreateForm.class}
                  onChange={(e) => setTeacherCreateForm((s) => ({ ...s, class: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                >
                  <option value="" disabled className="bg-slate-950 text-slate-400">
                    Pilih kelas...
                  </option>
                  {teacherCreateForm.class && !allowedTeacherClassSet.has(normalize(teacherCreateForm.class).toUpperCase()) && (
                    <option value={teacherCreateForm.class} className="bg-slate-950 text-slate-100">
                      {teacherCreateForm.class}
                    </option>
                  )}
                  {teacherClassOptions.map((c) => (
                    <option key={c} value={c} className="bg-slate-950 text-slate-100">
                      {c}
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-xs text-slate-400">Kelas hanya bisa dipilih dari daftar Kelas Paralel.</div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Nama Lengkap</label>
                <input
                  value={teacherCreateForm.name}
                  onChange={(e) => setTeacherCreateForm((s) => ({ ...s, name: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setTeacherCreateOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleTeacherCreate}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {teacherEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Edit Guru/Wali Kelas</div>
            <div className="mt-1 text-sm text-slate-300">{teacherEditingNuptk ? `NUPTK: ${teacherEditingNuptk}` : ""}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Nama Lengkap</label>
                <input
                  value={teacherEditForm.name}
                  onChange={(e) => setTeacherEditForm((s) => ({ ...s, name: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Kelas</label>
                <select
                  value={teacherEditForm.class}
                  onChange={(e) => setTeacherEditForm((s) => ({ ...s, class: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                >
                  <option value="" disabled className="bg-slate-950 text-slate-400">
                    Pilih kelas...
                  </option>
                  {teacherEditForm.class && !allowedTeacherClassSet.has(normalize(teacherEditForm.class).toUpperCase()) && (
                    <option value={teacherEditForm.class} className="bg-slate-950 text-slate-100">
                      {teacherEditForm.class}
                    </option>
                  )}
                  {teacherClassOptions.map((c) => (
                    <option key={c} value={c} className="bg-slate-950 text-slate-100">
                      {c}
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-xs text-slate-400">Kelas hanya bisa dipilih dari daftar Kelas Paralel.</div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Status</label>
                <select
                  value={teacherEditForm.status}
                  onChange={(e) => setTeacherEditForm((s) => ({ ...s, status: e.target.value as any }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                >
                  <option value="Aktif" className="bg-slate-950 text-slate-100">
                    Aktif
                  </option>
                  <option value="Nonaktif" className="bg-slate-950 text-slate-100">
                    Nonaktif
                  </option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={cancelTeacherEdit}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={saveTeacherEdit}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {tatibCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Tambah Petugas OSIS</div>
            <div className="mt-1 text-sm text-slate-300">{schoolName ? `Sekolah: ${schoolName}` : ""}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Nama Lengkap</label>
                <input
                  value={tatibCreateForm.name}
                  onChange={(e) => setTatibCreateForm((s) => ({ ...s, name: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Username</label>
                <input
                  value={tatibCreateForm.username}
                  onChange={(e) => setTatibCreateForm((s) => ({ ...s, username: e.target.value.toLowerCase().replace(/\s+/g, "_") }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Password</label>
                <input
                  type="password"
                  value={tatibCreateForm.password}
                  onChange={(e) => setTatibCreateForm((s) => ({ ...s, password: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  id="tatibActiveCreate"
                  type="checkbox"
                  checked={tatibCreateForm.isActive}
                  onChange={(e) => setTatibCreateForm((s) => ({ ...s, isActive: e.target.checked }))}
                  disabled={busy}
                />
                <label htmlFor="tatibActiveCreate" className="text-sm text-slate-200">
                  Akun aktif
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setTatibCreateOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleTatibCreate}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {tatibEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Edit Petugas OSIS</div>
            <div className="mt-1 text-sm text-slate-300">{tatibEditingUsername ? `Username: ${tatibEditingUsername}` : ""}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Nama Lengkap</label>
                <input
                  value={tatibEditForm.name}
                  onChange={(e) => setTatibEditForm((s) => ({ ...s, name: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Password</label>
                <input
                  type="password"
                  value={tatibEditForm.password}
                  onChange={(e) => setTatibEditForm((s) => ({ ...s, password: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  id="tatibActiveEdit"
                  type="checkbox"
                  checked={tatibEditForm.isActive}
                  onChange={(e) => setTatibEditForm((s) => ({ ...s, isActive: e.target.checked }))}
                  disabled={busy}
                />
                <label htmlFor="tatibActiveEdit" className="text-sm text-slate-200">
                  Akun aktif
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={cancelTatibEdit}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={saveTatibEdit}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {staffCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Tambah Petugas (OSIS)</div>
            <div className="mt-1 text-sm text-slate-300">{schoolName ? `Sekolah: ${schoolName}` : ""}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">NISN</label>
                <input
                  value={staffCreateForm.nisn}
                  onChange={(e) => setStaffCreateForm((s) => ({ ...s, nisn: e.target.value }))}
                  disabled={busy}
                  inputMode="numeric"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
              <div className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 backdrop-blur">
                <div className="font-semibold text-white">Data Siswa</div>
                <div className="mt-1">
                  Nama: <span className="font-semibold text-slate-100">{staffCandidateStudent?.name || "-"}</span>
                </div>
                <div className="mt-1">
                  Kelas: <span className="font-semibold text-slate-100">{staffCandidateStudent?.class || "-"}</span>
                </div>
                {!normalize(staffCreateForm.nisn) ? null : staffCandidateStudent ? null : (
                  <div className="mt-2 text-red-200">NISN tidak ditemukan di Database Siswa sekolah ini.</div>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Jabatan (Opsional)</label>
                <input
                  value={staffCreateForm.position}
                  onChange={(e) => setStaffCreateForm((s) => ({ ...s, position: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                  placeholder="Ketua OSIS / Sekretaris / Bendahara / dll"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => setStaffCreateOpen(false)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleStaffCreate}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {staffEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
            <div className="text-lg font-bold text-white">Edit Petugas (OSIS)</div>
            <div className="mt-1 text-sm text-slate-300">{staffEditingNisn ? `NISN: ${staffEditingNisn}` : ""}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 backdrop-blur">
                <div className="font-semibold text-white">Data Siswa</div>
                <div className="mt-1">
                  Nama:{" "}
                  <span className="font-semibold text-slate-100">
                    {studentRows.find((s) => normalize(s.nisn) === normalize(staffEditingNisn))?.name || "-"}
                  </span>
                </div>
                <div className="mt-1">
                  Kelas:{" "}
                  <span className="font-semibold text-slate-100">
                    {studentRows.find((s) => normalize(s.nisn) === normalize(staffEditingNisn))?.class || "-"}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Status</label>
                <select
                  value={staffEditForm.status}
                  onChange={(e) => setStaffEditForm((s) => ({ ...s, status: e.target.value as any }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                >
                  <option value="Aktif" className="bg-slate-950 text-slate-100">
                    Aktif
                  </option>
                  <option value="Nonaktif" className="bg-slate-950 text-slate-100">
                    Nonaktif
                  </option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">Jabatan</label>
                <input
                  value={staffEditForm.position}
                  onChange={(e) => setStaffEditForm((s) => ({ ...s, position: e.target.value }))}
                  disabled={busy}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={cancelStaffEdit}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={saveStaffEdit}
                className="rounded-lg bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/10 hover:bg-indigo-600 disabled:opacity-60"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
