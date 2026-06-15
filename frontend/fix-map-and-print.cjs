const fs = require('fs');
const path = require('path');

// Fix PassportPanel.tsx
const passportPath = path.join(__dirname, 'src', 'components', 'PassportPanel.tsx');
let passportContent = fs.readFileSync(passportPath, 'utf8');

// 1. Map Circle
const circleToAdd = `
      L.circle(coords, {
        radius: 500,
        color: '#f97316',
        fillColor: '#f97316',
        fillOpacity: 0.1,
        weight: 1,
        dashArray: '4 4'
      }).addTo(layers);
`;
if (!passportContent.includes('radius: 500')) {
  passportContent = passportContent.replace(
    'L.marker(coords, { icon: targetIcon, zIndexOffset: 1000 }).addTo(layers);',
    'L.marker(coords, { icon: targetIcon, zIndexOffset: 1000 }).addTo(layers);' + circleToAdd
  );
}

// 2. generateBtiPdf ('width=1000,height=900' -> '', remove window.print, add Print button)
if (passportContent.includes("printWindow.document.write('<script>setTimeout(() => window.print(), 1000);</script></body></html>');")) {
  passportContent = passportContent.replace(
    "const printWindow = window.open('', '_blank', 'width=1000,height=900');",
    "const printWindow = window.open('', '_blank');"
  );
  passportContent = passportContent.replace(
    "printWindow.document.write('<html><head><title>Паспорт БТИ</title></head><body style=\"margin:0;padding:0;background:#e5e7eb;display:flex;justify-content:center;\">');",
    "printWindow.document.write('<html><head><title>Паспорт БТИ</title></head><body style=\"margin:0;padding:0;background:#e5e7eb;display:flex;flex-direction:column;align-items:center;\">');"
  );
  passportContent = passportContent.replace(
    "printWindow.document.write('<div style=\"background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);margin:20px;padding:0;\">');",
    "printWindow.document.write('<div style=\"width:100%;max-width:800px;display:flex;justify-content:flex-end;padding:20px 20px 0;\"><button onclick=\"window.print()\" style=\"padding:10px 20px;background:#2563eb;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;font-size:14px;box-shadow:0 4px 6px rgba(0,0,0,0.1);\">Распечатать</button></div><div style=\"background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);margin:20px;padding:0;\">');"
  );
  passportContent = passportContent.replace(
    "printWindow.document.write('<script>setTimeout(() => window.print(), 1000);</script></body></html>');",
    "printWindow.document.write('</body></html>');"
  );
}
fs.writeFileSync(passportPath, passportContent, 'utf8');


// Fix ResultPanel.tsx
const resultPath = path.join(__dirname, 'src', 'components', 'ResultPanel.tsx');
let resultContent = fs.readFileSync(resultPath, 'utf8');

// 1. Fix handleOpenBrowser
if (resultContent.includes("setTimeout(() => printWindow.print(), 500);")) {
  resultContent = resultContent.replace(
    "printWindow.document.write(getReportHtml());",
    "printWindow.document.write('<html><head><title>Отчет об оценке</title></head><body style=\"margin:0;padding:0;background:#e5e7eb;display:flex;flex-direction:column;align-items:center;\">');\n      printWindow.document.write('<div style=\"width:100%;max-width:800px;display:flex;justify-content:flex-end;padding:20px 20px 0;\"><button onclick=\"window.print()\" style=\"padding:10px 20px;background:#2563eb;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;font-size:14px;box-shadow:0 4px 6px rgba(0,0,0,0.1);\">Распечатать</button></div>');\n      printWindow.document.write('<div style=\"background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);margin:20px;padding:0;\">');\n      printWindow.document.write(getReportHtml());\n      printWindow.document.write('</div></body></html>');"
  );
  resultContent = resultContent.replace(
    "setTimeout(() => printWindow.print(), 500);",
    "// setTimeout removed to prevent auto-print"
  );
}

fs.writeFileSync(resultPath, resultContent, 'utf8');

console.log("Fixes applied successfully.");
