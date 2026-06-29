const fs = require('fs');
const path = require('path');

const V1_BASE = 'C:\\Unified-System\\apps\\web\\src';
const V2_BASE = 'd:\\Unified-System-V2\\apps\\web-admin\\src';

// 1. Port LenteraLogoutButton
let logoutContent = fs.readFileSync(path.join(V1_BASE, 'components\\lentera\\LenteraLogoutButton.tsx'), 'utf8');
logoutContent = logoutContent.replace(/import \{ useRouter \} from "next\/navigation";/g, 'import { useNavigate } from "react-router-dom";');
logoutContent = logoutContent.replace(/const router = useRouter\(\);/g, 'const navigate = useNavigate();');
logoutContent = logoutContent.replace(/router\.replace/g, 'navigate');
logoutContent = logoutContent.replace(/import \{ useAuthStore \} from "@\/store\/useAuthStore";/g, 'import { useSessionStore } from "@/store/session-store";');
logoutContent = logoutContent.replace(/const \{ logout \} = useAuthStore\(\);/g, 'const { logout } = useSessionStore();');

fs.mkdirSync(path.join(V2_BASE, 'components\\lentera'), { recursive: true });
fs.writeFileSync(path.join(V2_BASE, 'components\\lentera\\LenteraLogoutButton.tsx'), logoutContent);

// 2. Port LenteraSidebar
let sidebarContent = fs.readFileSync(path.join(V1_BASE, 'components\\lentera\\LenteraSidebar.tsx'), 'utf8');
sidebarContent = sidebarContent.replace(/"use client";\n/g, '');
sidebarContent = sidebarContent.replace(/import Link from "next\/link";/g, 'import { Link, useLocation, useSearchParams } from "react-router-dom";');
sidebarContent = sidebarContent.replace(/import \{ usePathname, useSearchParams \} from "next\/navigation";/g, '');
sidebarContent = sidebarContent.replace(/import \{ useAuthStore \} from "@\/store\/useAuthStore";/g, 'import { useSessionStore } from "@/store/session-store";');
sidebarContent = sidebarContent.replace(/const pathname = usePathname\(\);/g, 'const location = useLocation();\n  const pathname = location.pathname;');
sidebarContent = sidebarContent.replace(/const \{ user, _hasHydrated \} = useAuthStore\(\);/g, 'const session = useSessionStore((state) => state.session);\n  const _hasHydrated = true;\n  const user = session ? { name: session.userId, role: session.activeRole || "super_admin", schoolName: "SMPN 3 PACET" } : null;');
sidebarContent = sidebarContent.replace(/href=/g, 'to=');
fs.writeFileSync(path.join(V2_BASE, 'components\\lentera\\LenteraSidebar.tsx'), sidebarContent);

// 3. Port LenteraMembersPage
let membersContent = fs.readFileSync(path.join(V1_BASE, 'app\\admin\\lentera\\anggota\\page.tsx'), 'utf8');
membersContent = membersContent.replace(/"use client";\n/g, '');
membersContent = membersContent.replace(/import Link from "next\/link";/g, 'import { Link } from "react-router-dom";');
membersContent = membersContent.replace(/import \{ useAuthStore \} from "@\/store\/useAuthStore";/g, '');
membersContent = membersContent.replace(/import \{ useStudentStore \} from "@\/store\/useStudentStore";/g, '');
membersContent = membersContent.replace(/import \{ useClassStore \} from "@\/store\/useClassStore";/g, '');

membersContent = membersContent.replace(/const \{ user, _hasHydrated \} = useAuthStore\(\);/g, 'const _hasHydrated = true;\n  const user = { schoolName: "SMPN 3 PACET" };');

// Mock data to match screenshot
const mockDataCode = `
  const loading = false;
  const students = [
    { id: "s1", nisn: "001122", name: "aku dewe", class: "VII-A", status: "active" },
    { id: "s2", nisn: "123456", name: "coba", class: "VII-A", status: "active" },
    { id: "s3", nisn: "112233", name: "putra", class: "VII-A", status: "active" },
    { id: "s4", nisn: "121212", name: "wahyu", class: "VII-A", status: "active" },
    { id: "s5", nisn: "212212", name: "Tes", class: "VII-B", status: "active" }
  ];
  const classes = [
    { id: "c1", name: "VII-A" },
    { id: "c2", name: "VII-B" }
  ];
`;

membersContent = membersContent.replace(/const \{ students, loading, syncStudents \} = useStudentStore\(\);/g, mockDataCode);
membersContent = membersContent.replace(/const \{ classes, subscribeToClasses \} = useClassStore\(\);/g, '');
membersContent = membersContent.replace(/href=/g, 'to=');

// Remove useEffect for sync
membersContent = membersContent.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[_hasHydrated, subscribeToClasses, syncStudents, user\?\.schoolId\]\);/g, '');

fs.writeFileSync(path.join(V2_BASE, 'pages\\LenteraMembersPage.tsx'), membersContent);

// 4. Create LenteraLayout
const layoutContent = `import { Suspense } from "react";
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
`;
fs.mkdirSync(path.join(V2_BASE, 'components\\layout'), { recursive: true });
fs.writeFileSync(path.join(V2_BASE, 'components\\layout\\LenteraLayout.tsx'), layoutContent);

console.log("Porting script completed!");
