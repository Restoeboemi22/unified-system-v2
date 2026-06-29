const fs = require('fs');

const srcPath = 'C:\\Unified-System\\apps\\web\\src\\app\\edulock\\super\\page.tsx';
const destPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\EdulockSuperAdminPage.tsx';

let content = fs.readFileSync(srcPath, 'utf8');

// Replace next/link
content = content.replace(/import Link from "next\/link";/g, 'import { Link, useNavigate } from "react-router-dom";');
// Replace next/image
content = content.replace(/import Image from "next\/image";/g, '');
content = content.replace(/<Image([^>]+)\/>/g, (match, p1) => {
  // Convert Image to img, remove width/height if we want or keep them
  return `<img${p1.replace(/priority/g, '').replace(/fill/g, '')} />`;
});

// Remove next/navigation and next/router
content = content.replace(/import { useRouter } from "next\/navigation";/g, '');
content = content.replace(/const router = useRouter\(\);/g, 'const navigate = useNavigate();');
content = content.replace(/router\.replace\(/g, 'navigate(');
content = content.replace(/router\.push\(/g, 'navigate(');

// Replace firebase imports and hooks with dummy data/functions to make it compile for POC
// Actually we can keep firebase imports if we have them or just comment them out to mock
// Wait, V2 does NOT have firebase! V2 uses API!
content = content.replace(/import \{.*?\} from "firebase\/.*?";/g, '');
content = content.replace(/import \{ edulockAuth, edulockDb \} from "@\/lib\/edulockFirebase";/g, '');
content = content.replace(/import \{ useEduLockAuth \} from "@\/lib\/useEduLockAuth";/g, '');

// We need to inject a dummy useEduLockAuth hook
const dummyHook = `
function useEduLockAuth() {
  return { role: 'super_admin', profile: { email: 'super@edulock.local' }, isLoading: false };
}
`;
content = content.replace(/export default function EduLockSuperAdminPage/g, dummyHook + '\nexport default function EduLockSuperAdminPage');

// The `onValue`, `ref`, `update`, `set`, `remove`, `sendPasswordResetEmail` functions will be undefined.
// Let's add dummy functions for them.
const dummyFirebase = `
const onValue = (r, cb) => { cb({ val: () => ({}), exists: () => false }); return () => {}; };
const ref = (db, path) => path;
const remove = async () => {};
const set = async () => {};
const update = async () => {};
const sendPasswordResetEmail = async () => {};
const edulockDb = {};
const edulockAuth = {};
`;
content = content.replace(dummyHook, dummyFirebase + dummyHook);

fs.writeFileSync(destPath, content);
console.log('Successfully ported EdulockSuperAdminPage.tsx');
