const fs = require('fs');
const path = 'd:\\Unified-System-V2\\apps\\web-admin\\src\\pages\\LenteraPage.tsx';

let content = fs.readFileSync(path, 'utf8');

// Fix unknown type for catalogCategories
content = content.replace(
  /const catalogCategories = useMemo\(\(\) => \{/g,
  'const catalogCategories: string[] = useMemo(() => {'
);

fs.writeFileSync(path, content);
console.log('Fixed catalogCategories type in LenteraPage.tsx');
