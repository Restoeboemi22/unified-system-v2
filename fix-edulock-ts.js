const fs = require('fs');
const path = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\EdulockAdminPage.tsx';

let content = fs.readFileSync(path, 'utf8');

// Fix 1: profile mock
content = content.replace(/schoolName: session\?\.activeSchoolId \|\| "SMPN 3 PACET",\n    npsn: "12345678"\n  \};/g, 
`schoolName: session?.activeSchoolId || "SMPN 3 PACET",
    npsn: "12345678",
    mustChangePassword: false
  };`);

// Fix 2: edulockAuth mock
content = content.replace(/const edulockAuth = \{\};/g, 'const edulockAuth = { currentUser: { uid: "mock-uid" } } as any;');

// Fix 3: Link href to to
content = content.replace(/<Link([^>]*?)href=/g, '<Link$1to=');

fs.writeFileSync(path, content);
console.log('TS errors fixed in EdulockAdminPage.tsx');
