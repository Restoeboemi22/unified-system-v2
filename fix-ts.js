const fs = require('fs');
const path = require('path');

const BASE = 'd:\\Unified-System-V2\\apps\\web-admin\\src';

// 1. App.tsx
let appContent = fs.readFileSync(path.join(BASE, 'App.tsx'), 'utf8');
appContent = appContent.replace(/import GasTenantsPage from "@\/pages\/GasTenantsPage";\r?\nimport GasTenantsPage from "@\/pages\/GasTenantsPage";/g, 'import GasTenantsPage from "@/pages/GasTenantsPage";');
fs.writeFileSync(path.join(BASE, 'App.tsx'), appContent);

// 2. LenteraLogoutButton.tsx
let btnContent = fs.readFileSync(path.join(BASE, 'components\\lentera\\LenteraLogoutButton.tsx'), 'utf8');
btnContent = btnContent.replace(/const \{ logout \} = useAuthStore\(\);/g, 'const { logout } = useSessionStore();');
// Since I already replaced useAuthStore import with useSessionStore, I should just make sure there are no other references to useAuthStore.
fs.writeFileSync(path.join(BASE, 'components\\lentera\\LenteraLogoutButton.tsx'), btnContent);

// 3. LenteraSidebar.tsx
let sbContent = fs.readFileSync(path.join(BASE, 'components\\lentera\\LenteraSidebar.tsx'), 'utf8');
sbContent = sbContent.replace(/const searchParams = useSearchParams\(\);/g, 'const [searchParams] = useSearchParams();');
fs.writeFileSync(path.join(BASE, 'components\\lentera\\LenteraSidebar.tsx'), sbContent);

console.log("Fixes applied.");
