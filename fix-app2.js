const fs = require('fs');

const appPath = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

if (!content.includes('import GasStudentsDashboardPage')) {
  // Add import
  const importStatement = 'import GasStudentsDashboardPage from "@/pages/GasStudentsDashboardPage";\n';
  content = content.replace('import AdminSekolahPage from "@/pages/AdminSekolahPage";', 'import AdminSekolahPage from "@/pages/AdminSekolahPage";\n' + importStatement);
}

// Route mapping
// Replace `<Route path="/dashboard/students" element={<AdminSekolahPage />} />` 
// with `<Route path="/dashboard/students" element={<GasStudentsDashboardPage />} />`
content = content.replace(/<Route path="\/dashboard\/students" element=\{<AdminSekolahPage \/>\} \/>/, '<Route path="/dashboard/students" element={<GasStudentsDashboardPage />} />');
// just in case it was still GasDashboardPage from original state:
content = content.replace(/<Route path="\/dashboard\/students" element=\{<GasDashboardPage \/>\} \/>/, '<Route path="/dashboard/students" element={<GasStudentsDashboardPage />} />');

fs.writeFileSync(appPath, content);
console.log('App.tsx routes updated for Dashboard UI');
