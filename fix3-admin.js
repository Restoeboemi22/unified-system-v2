const fs = require('fs');
const destPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\AdminSekolahPage.tsx';
let content = fs.readFileSync(destPath, 'utf8');

// Fix react-navigate-dom
content = content.replace(/react-navigate-dom/g, 'react-router-dom');

// Fix useAuthStore mock object to include missing properties
content = content.replace(/\{ user: \{ role: "admin" \}, school: \{ id: "SMPN 3 PACET", name: "SMPN 3 PACET" \} \}/g, '{ user: { role: "admin" }, school: { id: "SMPN 3 PACET", name: "SMPN 3 PACET" }, isAuthenticated: true, _hasHydrated: true, profile: { email: "admin@smpn3.com" } } as any');

// Fix useEduLockAuth mock object
content = content.replace(/\{ role: "admin" \}/g, '{ role: "admin", isLoading: false, profile: { id: "1", email: "admin@smpn3.com" } } as any');

// Fix XLSX mock
content = content.replace(/const XLSX = \{ utils: \{ json_to_sheet: \(\) => \{\}, book_new: \(\) => \{\}, book_append_sheet: \(\) => \{\} \}, writeFile: \(\) => \{\} \};/g, 'const XLSX = { utils: { json_to_sheet: (...args: any[]) => ({} as any), aoa_to_sheet: (...args: any[]) => ({} as any), book_new: (...args: any[]) => ({} as any), book_append_sheet: (...args: any[]) => ({} as any), sheet_to_json: (...args: any[]) => ([] as any) }, writeFile: (...args: any[]) => {}, write: (...args: any[]) => {}, read: (...args: any[]) => ({} as any) } as any;');

// Fix activeSub union again just in case (the previous one might have been missed if it was let activeSub)
content = content.replace(/type ActiveSub = "students" \| "teachers" \| "classes" \| "staff";/, 'type ActiveSub = "students" | "teachers" | "classes" | "staff" | "tatib";');

fs.writeFileSync(destPath, content);
console.log('Successfully fixed AdminSekolahPage.tsx again');
