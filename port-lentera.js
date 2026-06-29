const fs = require('fs');

const srcPath = 'C:\\Unified-System\\apps\\web\\src\\app\\dashboard\\library\\page.tsx';
const destPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\LenteraPage.tsx';

let content = fs.readFileSync(srcPath, 'utf8');

// 1. Remove Next.js / Firebase / V1 Store imports
content = content.replace(/import Link from "next\/link";/g, 'import { Link, useNavigate } from "react-router-dom";');
content = content.replace(/import Image from "next\/image";/g, '');
content = content.replace(/import { usePathname, useRouter, useSearchParams } from "next\/navigation";/g, 'import { useLocation, useNavigate, useSearchParams } from "react-router-dom";');
content = content.replace(/import { onValue, ref } from "firebase\/database";/g, '');
content = content.replace(/import { database } from "@\/lib\/firebase";/g, '');
content = content.replace(/import { useLibraryStore(.*?) } from "@\/store\/useLibraryStore";/g, '');
content = content.replace(/import { useStudentStore } from "@\/store\/useStudentStore";/g, '');
content = content.replace(/import { useClassStore } from "@\/store\/useClassStore";/g, '');
content = content.replace(/import { useAuthStore } from "@\/store\/useAuthStore";/g, 'import { useSessionStore } from "@/store/session-store";');
content = content.replace(/import { useSettingsStore } from "@\/store\/useSettingsStore";/g, '');

// 2. Inject Mock Interfaces and Stores
const mocks = `
export interface LiteracyReport { id: string; studentId: string; taskId?: string; bookTitle?: string; status: string; timestamp: number; [key: string]: any; }
export interface LiteracyTask { id: string; title: string; points: number; duration: number; status: string; createdAt: number; [key: string]: any; }

const useLibraryStore = () => ({
  books: [
    { id: "b1", title: "Laskar Pelangi", author: "Andrea Hirata", category: "Novel", stock: 5, available: 2 },
    { id: "b2", title: "Bumi Manusia", author: "Pramoedya Ananta Toer", category: "Sejarah", stock: 3, available: 1 },
  ],
  borrowRecords: [],
  literacyReports: [
    { id: "r1", studentId: "s1", studentName: "Ahmad Fauzi", studentClass: "VIII-A", bookTitle: "Laskar Pelangi", timestamp: Date.now() - 86400000, status: "PENDING" },
  ],
  literacyTasks: [
    { id: "t1", title: "Review Buku Kartun", points: 30, duration: 45, status: "ACTIVE", createdAt: Date.now() },
  ],
  reviewLiteracyReport: async () => {},
  initBooksSync: () => () => {},
  initBorrowRecordSync: () => () => {},
  initLiteracyTaskSync: () => () => {},
  initLiteracyReportSync: () => () => {},
  createLiteracyTask: async () => {},
  toggleTaskStatus: async () => {},
  addLiteracyReport: async () => {},
  borrowBook: async () => {}
});

const useStudentStore = () => ({ students: [] });
const useClassStore = () => ({ classes: [] });
const useSettingsStore = () => ({ taskDefaults: {}, loading: false });

const useAuthStore = () => {
  const session = useSessionStore(state => state.session);
  return { 
    user: { role: 'admin', schoolId: session?.activeSchoolId || 'SMPN 3 PACET', name: 'Admin Demo' }, 
    _hasHydrated: true 
  };
};

const useRouter = () => {
  const navigate = useNavigate();
  return { push: navigate, replace: navigate, back: () => navigate(-1) };
};
const usePathname = () => useLocation().pathname;
`;

content = content.replace(/"use client";\n/g, '"use client";\n' + mocks + '\n');

// 3. Fix Link components
// Next.js Link uses href, React Router uses to
content = content.replace(/<Link([^>]*?)href=/g, '<Link$1to=');

// 4. Default export rename
content = content.replace(/export default function LibraryPage/g, 'export default function LenteraPage');

// Also in V1 it was default exported as LibraryPage, but maybe the file exported LibraryPageContent and LibraryPage?
// Let's replace LibraryPage with LenteraPage globally where it makes sense.

fs.writeFileSync(destPath, content);
console.log('LenteraPage ported successfully.');
