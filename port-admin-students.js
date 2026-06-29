const fs = require('fs');

const srcPath = 'C:\\Unified-System\\apps\\web\\src\\app\\admin\\students\\page.tsx';
const destPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\AdminSekolahPage.tsx';

let content = fs.readFileSync(srcPath, 'utf8');

// Replace next/link
content = content.replace(/import Link from "next\/link";/g, 'import { Link, useNavigate, useLocation } from "react-router-dom";');
// Replace next/image
content = content.replace(/import Image from "next\/image";/g, '');
content = content.replace(/<Image([^>]+)\/>/g, (match, p1) => {
  return `<img${p1.replace(/priority/g, '').replace(/fill/g, '').replace(/src=\{\([^}]+\)\}/g, 'src=""')} />`;
});

// Remove next/navigation
content = content.replace(/import \{ usePathname, useRouter, useSearchParams \} from "next\/navigation";/g, '');
content = content.replace(/const router = useRouter\(\);/g, 'const navigate = useNavigate();');
content = content.replace(/router\.replace\(/g, 'navigate(');
content = content.replace(/router\.push\(/g, 'navigate(');
content = content.replace(/const searchParams = useSearchParams\(\);/g, 'const searchParams = new URLSearchParams(useLocation().search);');
content = content.replace(/const pathname = usePathname\(\);/g, 'const pathname = useLocation().pathname;');

// Replace firebase imports
content = content.replace(/import \{.*?\} from "firebase\/.*?";/g, '');
content = content.replace(/import \{ database \} from "@\/lib\/firebase";/g, '');
content = content.replace(/import \{ edulockAuth, edulockDb \} from "@\/lib\/edulockFirebase";/g, '');
content = content.replace(/import \{ useEduLockAuth \} from "@\/lib\/useEduLockAuth";/g, '');
content = content.replace(/import \{ useAuthStore \} from "@\/store\/useAuthStore";/g, 'import { useSessionStore } from "@/store/session-store";');
content = content.replace(/const \{ school \} = useAuthStore\(\);/g, 'const school = { id: useSessionStore(s => s.session?.activeSchoolId), name: "SMPN 3 PACET" };');

// Mock Firebase functions
const dummyFirebase = `
const onValue = (...args) => { args[1]({ val: () => ({}), exists: () => false }); return () => {}; };
const ref = (...args) => args[1];
const remove = async (...args) => {};
const set = async (...args) => {};
const update = async (...args) => {};
const push = (...args) => ({ key: Math.random().toString(36) });
const get = async (...args) => ({ val: () => null, exists: () => false });
const orderByChild = (...args) => args[0];
const equalTo = (...args) => args[0];
const dbQuery = (...args) => args[0];
const sendPasswordResetEmail = async (...args) => {};
const database = {};
const edulockDb = {};
const edulockAuth = {};
`;

// rename component to AdminSekolahPage
content = content.replace(/export default function Page\\(\\)/g, 'export default function AdminSekolahPage()');

// Put dummyFirebase right before export default
content = content.replace(/export default function AdminSekolahPage/g, dummyFirebase + '\nexport default function AdminSekolahPage');

fs.writeFileSync(destPath, content);
console.log('Successfully ported AdminStudentsPage to AdminSekolahPage');
