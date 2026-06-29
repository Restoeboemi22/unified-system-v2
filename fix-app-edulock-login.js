const fs = require('fs');
const appPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

if (!content.includes('<Route path="/edulock/login" element={<Navigate to="/login" replace />} />')) {
  content = content.replace('<Route path="/login" element={<LoginPage />} />', '<Route path="/login" element={<LoginPage />} />\n        <Route path="/edulock/login" element={<Navigate to="/login" replace />} />');
  fs.writeFileSync(appPath, content);
}
console.log('App.tsx route for /edulock/login added');
