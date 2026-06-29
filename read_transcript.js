const fs = require('fs');
const lines = fs.readFileSync('C:/Users/mikoe/.gemini/antigravity-ide/brain/6637f6ef-8e71-4bed-aa64-20c06e543795/.system_generated/logs/transcript.jsonl', 'utf8').split('\n').filter(Boolean);
const userInputs = lines.map(l => {
    try { return JSON.parse(l); } catch(e) { return null; }
}).filter(p => p && p.type === 'USER_INPUT');
console.log(userInputs.map(p => p.content).join('\n---\n'));
