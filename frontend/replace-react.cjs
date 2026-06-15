const fs = require('fs');

const path = "C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\components\\ResultPanel.tsx";
let content = fs.readFileSync(path, 'utf8');

// 1. Add ReactDOMServer import and ProfessionalValuationReport import
// Replace the old reportGenerator import
content = content.replace(
  "import { generateDetailedReportHtml } from '../utils/reportGenerator';",
  "import ReactDOMServer from 'react-dom/server';\nimport { ProfessionalValuationReport } from './ProfessionalValuationReport';"
);

// 2. Replace getReportHtml implementation
const oldGetReportHtml = `  const getReportHtml = () => {
    return generateDetailedReportHtml(okn, safeComp, safeInc, safeCost, pComp, pInc, pCost, kkhMultiplier, finalValue, formatValue);
  };`;

const newGetReportHtml = `  const getReportHtml = () => {
    const reportHtml = ReactDOMServer.renderToStaticMarkup(
      <ProfessionalValuationReport 
        okn={okn}
        safeComp={safeComp}
        safeInc={safeInc}
        safeCost={safeCost}
        pComp={pComp}
        pInc={pInc}
        pCost={pCost}
        kkhMultiplier={kkhMultiplier}
        finalValue={finalValue}
      />
    );
    // Wrap with html/head/body so it is a full document for print and PDF
    return \`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Отчет об оценке</title>
</head>
<body>
  \${reportHtml}
</body>
</html>\`;
  };`;

content = content.replace(oldGetReportHtml, newGetReportHtml);

fs.writeFileSync(path, content, 'utf8');
console.log("Replaced ReactDOMServer successfully!");
