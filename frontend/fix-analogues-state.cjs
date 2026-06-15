const fs = require('fs');
const path = require('path');

// 1. Create a shared constants file for LOCAL_MOCK_ANALOGUES
const mockDataPath = path.join(__dirname, 'src', 'utils', 'mockData.ts');
const mockDataContent = `import { Analogue } from '../types';

export const LOCAL_MOCK_ANALOGUES: Analogue[] = [
    { id: 'analog-10', address: 'г. Москва, Малокисловский пер., д. 10', area: 1400, year_built: 1902, base_price: 630000000, similarity: 86, is_okn: true },
    { id: 'analog-12', address: 'г. Москва, пл. Миусская, д. 12, стр. 3', area: 1300, year_built: 1912, base_price: 710000000, similarity: 84, is_okn: true },
    { id: 'analog-25', address: 'г. Москва, Уланский пер., 25', area: 800, year_built: 1898, base_price: 412000000, similarity: 68, is_okn: false },
    { id: 'analog-7', address: 'г. Москва, Фуркасовский пер., д. 7-9, стр. 2', area: 1100, year_built: 1905, base_price: 540000000, similarity: 67, is_okn: true },
    { id: 'analog-4', address: 'г. Москва, Малый Знаменский пер., д. 4', area: 1050, year_built: 1890, base_price: 490000000, similarity: 67, is_okn: false },
    { id: 'analog-21', address: 'г. Москва, Гоголевский бульвар, 21', area: 1300, year_built: 1905, base_price: 530000000, similarity: 66, is_okn: true },
    { id: 'analog-22', address: 'г. Москва, Печатников пер., 22', area: 2400, year_built: 1896, base_price: 445000000, similarity: 64, is_okn: false },
    { id: 'analog-15', address: 'г. Москва, Печатников пер., 15', area: 920, year_built: 1895, base_price: 460000000, similarity: 62, is_okn: true },
];
`;
fs.writeFileSync(mockDataPath, mockDataContent, 'utf8');

// 2. Update App.tsx
const appPath = path.join(__dirname, 'src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

if (!appContent.includes("import { LOCAL_MOCK_ANALOGUES } from './utils/mockData';")) {
  appContent = appContent.replace(
    "import { calculateComparativeValue, calculateIncomeValue, calculateCostValue, getRecommendedWeights } from './utils/calc';",
    "import { calculateComparativeValue, calculateIncomeValue, calculateCostValue, getRecommendedWeights } from './utils/calc';\nimport { LOCAL_MOCK_ANALOGUES } from './utils/mockData';"
  );
  
  appContent = appContent.replace(
    "setAnalogues([]);\n        setAdjustments({});\n        setSelectedAnalogId('');",
    "setAnalogues(LOCAL_MOCK_ANALOGUES);\n        setAdjustments({});\n        // Default select top 5 analogues by similarity\n        const top5 = [...LOCAL_MOCK_ANALOGUES].sort((a, b) => (b.similarity || 0) - (a.similarity || 0)).slice(0, 5).map(a => String(a.id)).join(',');\n        setSelectedAnalogId(top5);"
  );
  fs.writeFileSync(appPath, appContent, 'utf8');
}

// 3. Update AnaloguesPanel.tsx
const analogPath = path.join(__dirname, 'src', 'components', 'AnaloguesPanel.tsx');
let analogContent = fs.readFileSync(analogPath, 'utf8');

if (!analogContent.includes("import { LOCAL_MOCK_ANALOGUES } from '../utils/mockData';")) {
  analogContent = analogContent.replace(
    "import { OknObject, Analogue } from '../types';",
    "import { OknObject, Analogue } from '../types';\nimport { LOCAL_MOCK_ANALOGUES } from '../utils/mockData';"
  );
  
  const mockRegex = /const LOCAL_MOCK_ANALOGUES: Analogue\[\] = \[\s*\{[^\]]*\}\s*\];/;
  analogContent = analogContent.replace(mockRegex, '');
  // Because the regex might not capture it well if there are many entries, let's just do string replacement
  const mockStart = "const LOCAL_MOCK_ANALOGUES: Analogue[] = [";
  const mockEnd = "];\n";
  const startIdx = analogContent.indexOf(mockStart);
  if (startIdx !== -1) {
    let endIdx = analogContent.indexOf(mockEnd, startIdx);
    if (endIdx !== -1) {
      analogContent = analogContent.substring(0, startIdx) + analogContent.substring(endIdx + mockEnd.length);
    }
  }
  fs.writeFileSync(analogPath, analogContent, 'utf8');
}

console.log("Success");
