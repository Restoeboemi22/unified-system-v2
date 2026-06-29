const fs = require('fs');

const appPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\App.tsx';

let content = fs.readFileSync(appPath, 'utf8');

// Route path="/dashboard/students" should be AdminSekolahPage, not GasDashboardPage
content = content.replace(/<Route path="\/dashboard\/students" element=\{<GasDashboardPage \/>\} \/>/, '<Route path="/dashboard/students" element={<AdminSekolahPage />} />');

fs.writeFileSync(appPath, content);
console.log('Fixed App.tsx routes');
