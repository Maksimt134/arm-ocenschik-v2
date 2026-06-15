const fs = require('fs');
let code = fs.readFileSync('C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\components\\PassportPanel.tsx', 'utf8');

// 1. Add import for LOCAL_MOCK_ANALOGUES_ROSSIYA if it's missing
if (!code.includes('LOCAL_MOCK_ANALOGUES_ROSSIYA')) {
  code = code.replace(/import { ALL_OBJECTS } from '\.\.\/data\/allObjects';/g, "import { ALL_OBJECTS } from '../data/allObjects';\nimport { LOCAL_MOCK_ANALOGUES_ROSSIYA } from '../data/mockAnalogues';");
}

// 2. Replace getMapAnaloguesForObject logic entirely
const oldFuncRegex = /const getMapAnaloguesForObject = \(okn: OknObject\): Analogue\[\] => \{[\s\S]*?\} as Analogue\)\);\s*\};/g;
const newFunc = `const getMapAnaloguesForObject = (okn: OknObject): Analogue[] => {
  return LOCAL_MOCK_ANALOGUES_ROSSIYA;
};`;
code = code.replace(oldFuncRegex, newFunc);

// 3. Remove random offset logic
const oldMarkerRegex = /\/\/ [^\n]*\n\s*const offsetLat = \(Math\.random\(\) - 0\.5\) \* 0\.002;\n\s*const offsetLng = \(Math\.random\(\) - 0\.5\) \* 0\.002;\n\s*const m = L\.marker\(\[an\.coordinates\[0\] \+ offsetLat, an\.coordinates\[1\] \+ offsetLng\], \{/g;
const newMarker = `const m = L.marker([an.coordinates[0], an.coordinates[1]], {`;
code = code.replace(oldMarkerRegex, newMarker);

fs.writeFileSync('C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\components\\PassportPanel.tsx', code);
console.log('PassportPanel updated');
