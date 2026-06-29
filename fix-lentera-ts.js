const fs = require('fs');
const path = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\LenteraPage.tsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Fix User mock
content = content.replace(
  /user: \{ role: 'admin', schoolId: session\?\.activeSchoolId \|\| 'SMPN 3 PACET', name: 'Admin Demo' \},/g,
  `user: { id: 'admin123', role: 'admin', schoolId: session?.activeSchoolId || 'SMPN 3 PACET', name: 'Admin Demo', class: 'Admin', schoolName: 'SMPN 3 PACET' },`
);

// 2. Fix LiteracyReport interface
content = content.replace(
  /export interface LiteracyReport \{ id: string; studentId: string; taskId\?: string; bookTitle\?: string; status: string; timestamp: number; \[key: string\]: any; \}/g,
  `export interface LiteracyReport { id: string; studentId: string; taskId?: string; bookTitle?: string; status: string; timestamp: number; submissionDate?: number; summary?: string; readingDuration?: string; grade?: string; author?: string; [key: string]: any; }`
);

// 3. Fix LiteracyTask interface
content = content.replace(
  /export interface LiteracyTask \{ id: string; title: string; points: number; duration: number; status: string; createdAt: number; \[key: string\]: any; \}/g,
  `export interface LiteracyTask { id: string; title: string; points: number; duration: number; status: string; createdAt: number; isActive?: boolean; description?: string; durationMinutes?: number; [key: string]: any; }`
);

// 4. Fix useSettingsStore taskDefaults
content = content.replace(
  /const useSettingsStore = \(\) => \(\{ taskDefaults: \{\}, loading: false \}\);/g,
  `const useSettingsStore = () => ({ taskDefaults: { defaultPoints: 30, defaultDurationMinutes: 45 }, loading: false });`
);

// 5. Fix TS2554: Expected 0 arguments, but got 1 or 2
// The mock functions initBooksSync, initBorrowRecordSync, etc. have no arguments in mock but take arguments in real code.
content = content.replace(/initBooksSync: \(\) => \(\) => \{\},/g, 'initBooksSync: (...args: any[]) => () => {},');
content = content.replace(/initBorrowRecordSync: \(\) => \(\) => \{\},/g, 'initBorrowRecordSync: (...args: any[]) => () => {},');
content = content.replace(/initLiteracyTaskSync: \(\) => \(\) => \{\},/g, 'initLiteracyTaskSync: (...args: any[]) => () => {},');
content = content.replace(/initLiteracyReportSync: \(\) => \(\) => \{\},/g, 'initLiteracyReportSync: (...args: any[]) => () => {},');
content = content.replace(/createLiteracyTask: async \(\) => \{\},/g, 'createLiteracyTask: async (...args: any[]) => {},');
content = content.replace(/toggleTaskStatus: async \(\) => \{\},/g, 'toggleTaskStatus: async (...args: any[]) => {},');
content = content.replace(/addLiteracyReport: async \(\) => \{\},/g, 'addLiteracyReport: async (...args: any[]) => {},');
content = content.replace(/borrowBook: async \(\) => \{\}/g, 'borrowBook: async (...args: any[]) => {}');

// 6. Fix `useClassStore().classes` if any error appears, though none was in logs, it's good to type it as any[]
content = content.replace(/classes: \[\]/g, 'classes: [] as any[]');

fs.writeFileSync(path, content);
console.log('TS errors fixed in LenteraPage.tsx');
