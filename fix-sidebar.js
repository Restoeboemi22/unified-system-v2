const fs = require('fs');

const v1Path = 'C:\\Unified-System\\apps\\web\\src\\components\\layout\\Sidebar.tsx';
const v2Path = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\components\\layout\\LegacySidebar.tsx';

let v1Content = fs.readFileSync(v1Path, 'utf8');
let v2Content = fs.readFileSync(v2Path, 'utf8');

// Extract the missing menus from V1 (from just after Pengaturan Sistem to the end of the admin block)
const startMarker = '<div className="h-px bg-white/10 my-3 mx-2"></div>\n                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Monitoring & Laporan</div>';
const endMarker = '{/* TEACHER MENU (Matched with APK Structure) */}';

let missingBlock = v1Content.substring(v1Content.indexOf(startMarker), v1Content.indexOf(endMarker));

// Replace href= with to= for React Router
missingBlock = missingBlock.replace(/href=/g, 'to=');

// Find where to insert in V2
const insertMarker = '</Link>\n              </>\n            )}\n          </>\n        )}';
const v2Index = v2Content.indexOf(insertMarker);

if (v2Index !== -1 && missingBlock.length > 0) {
  // we want to insert right after the Pengaturan Sistem </Link>
  const insertPos = v2Content.indexOf('</Link>', v2Content.indexOf('<span>Pengaturan Sistem</span>')) + 7;
  
  v2Content = v2Content.substring(0, insertPos) + '\n                ' + missingBlock + v2Content.substring(insertPos);
  fs.writeFileSync(v2Path, v2Content);
  console.log('Successfully injected missing menus into LegacySidebar.tsx');
} else {
  console.log('Failed to find markers');
}
