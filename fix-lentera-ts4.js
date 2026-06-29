const fs = require('fs');
const path = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\LenteraPage.tsx';

let content = fs.readFileSync(path, 'utf8');

content = content.replace(/key=\{studentClass\}/g, 'key={studentClass as string}');
content = content.replace(/setSelectedClassId\(studentClass\)/g, 'setSelectedClassId(studentClass as string)');
content = content.replace(/>\{studentClass\}<\//g, '>{studentClass as any}</');

fs.writeFileSync(path, content);
console.log('Fixed type unknown in LenteraPage.tsx');
