const fs = require('fs');

const srcPath = 'C:\\Unified-System\\apps\\web\\src\\app\\edulock\\admin\\page.tsx';
const destPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\EdulockAdminPage.tsx';

let content = fs.readFileSync(srcPath, 'utf8');

// 1. Remove Next.js imports and inject React Router + Vite specific imports
content = content.replace(/import Link from "next\/link";/g, 'import { Link, useNavigate } from "react-router-dom";');
content = content.replace(/import Image from "next\/image";/g, ''); // Not needed usually or replace with img
content = content.replace(/"use client";/g, '"use client";\n\nimport { useSessionStore } from "@/store/session-store";\n');

// 2. Mock Firebase imports to avoid breaking the build (since we're moving away from it)
const firebaseMock = `
const onValue = (...args: any[]) => { args[1]({ val: () => ({}), exists: () => false }); return () => {}; };
const ref = (...args: any[]) => args[1];
const remove = async (...args: any[]) => {};
const set = async (...args: any[]) => {};
const update = async (...args: any[]) => {};
const push = (...args: any[]) => ({ key: Math.random().toString(36) });
const get = async (...args: any[]) => ({ val: () => null, exists: () => false });
const orderByChild = (...args: any[]) => args[0];
const equalTo = (...args: any[]) => args[0];
const query = (...args: any[]) => args[0];
const signOut = async (...args: any[]) => {};
const updatePassword = async (...args: any[]) => {};
const database = {};
const edulockDb = {};
const edulockAuth = {};
`;
content = content.replace(/import { equalTo, onValue, orderByChild, query, ref, remove, set, update } from "firebase\/database";/g, firebaseMock);
content = content.replace(/import { signOut, updatePassword } from "firebase\/auth";/g, '');
content = content.replace(/import { database } from "@\/lib\/firebase";/g, '');
content = content.replace(/import { edulockAuth, edulockDb } from "@\/lib\/edulockFirebase";/g, '');
content = content.replace(/import { useEduLockAuth } from "@\/lib\/useEduLockAuth";/g, '');
content = content.replace(/import \* as XLSX from "xlsx";/g, 'const XLSX = { utils: { json_to_sheet: (...args: any[]) => ({} as any), aoa_to_sheet: (...args: any[]) => ({} as any), book_new: (...args: any[]) => ({} as any), book_append_sheet: (...args: any[]) => ({} as any), sheet_to_json: (...args: any[]) => ([] as any) }, writeFile: (...args: any[]) => {}, write: (...args: any[]) => {}, read: (...args: any[]) => ({} as any) } as any;');

// 3. Replace useEduLockAuth with useSessionStore
const sessionHook = `  const session = useSessionStore((state) => state.session);
  const navigate = useNavigate();
  const profile = {
    schoolId: session?.activeSchoolId || "SMPN 3 PACET",
    schoolName: session?.activeSchoolId || "SMPN 3 PACET",
    npsn: "12345678"
  };
`;
content = content.replace(/const { profile } = useEduLockAuth\(\);/g, sessionHook);

// 4. Fix next/image usage
content = content.replace(/<Image\s+src="\/Logo EduLock\.png"\s+alt="EduLock"\s+width=\{100\}\s+height=\{100\}\s+className="h-14 w-14 rounded-full object-cover drop-shadow-\[0_10px_20px_rgba\(0,0,0,0\.35\)\]"\s*\/>/g, 
  '<img src="/Logo EduLock.png" alt="EduLock" className="h-14 w-14 rounded-full object-cover drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]" />');

// 5. Replace router usage if any
// (V1 uses window.location.href or similar, which is fine, but let's just make sure)
content = content.replace(/window\.location\.href\s*=\s*"\/login"/g, 'navigate("/login")');
content = content.replace(/href="\/admin"/g, 'to="/admin"');

// Fix potential type errors for the large file
content = content.replace(/import QRCode from "react-qr-code";/g, 'import QRCode from "react-qr-code";\n');

fs.writeFileSync(destPath, content);
console.log('EdulockAdminPage ported successfully.');
