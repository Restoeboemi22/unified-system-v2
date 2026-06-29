const fs = require('fs');
const file = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\ServiceStatusPage.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\`/g, '`');
content = content.replace(/\\n/g, '\n');
fs.writeFileSync(file, content);
