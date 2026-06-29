const fs = require('fs');

const srcPath = 'C:\\Unified-System\\apps\\web\\src\\app\\dashboard\\super\\service-status\\page.tsx';
const destPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\ServiceStatusPage.tsx';

let content = fs.readFileSync(srcPath, 'utf8');

// Replace next/link
content = content.replace(/import Link from "next\/link";/g, 'import { Link } from "react-router-dom";');
// Replace useSearchParams
content = content.replace(/import \{ useSearchParams \} from "next\/navigation";/g, 'import { useLocation } from "react-router-dom";');
content = content.replace(/const searchParams = useSearchParams\(\);/g, 'const searchParams = new URLSearchParams(useLocation().search);');
content = content.replace(/href=/g, 'to='); // Next.js link href to react-router to

// Replace firebase imports
content = content.replace(/import \{.*?\} from "firebase\/.*?";/g, '');
content = content.replace(/import \{.*?\} from "@\/lib\/firebase";/g, '');
content = content.replace(/import \{.*?\} from "@\/lib\/edulockFirebase";/g, '');
content = content.replace(/import \{.*?\} from "@\/store\/useAuthStore";/g, '');
content = content.replace(/import \{.*?\} from "@\/lib\/useEduLockAuth";/g, '');

const dummyFirebase = `
const onValue = (r, cb) => { cb({ val: () => ({}), exists: () => false }); return () => {}; };
const ref = (db, path) => path;
const update = async () => {};
const edulockDb = {};
const database = {};
const ensureGasAuth = async () => {};

function useAuthStore() { return { user: { email: 'super@local' } }; }
function useEduLockAuth() { return { isLoading: false }; }
`;

content = content.replace(/export default function GasSuperAdminServiceStatusPage/g, dummyFirebase + '\nexport default function GasSuperAdminServiceStatusPage');

// Also wrap it in GasLegacyLayout
content = content.replace(/return \(/g, 'return (\n    <GasLegacyLayout>');
// find last `  );` and insert closing tag
const lastParenIndex = content.lastIndexOf('  );');
content = content.substring(0, lastParenIndex) + '    </GasLegacyLayout>\n' + content.substring(lastParenIndex);
content = 'import { GasLegacyLayout } from "@/components/layout/GasLegacyLayout";\n' + content;

fs.writeFileSync(destPath, content);
console.log('Successfully ported ServiceStatusPage.tsx');
