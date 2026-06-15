const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PassportPanel.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add imports if they don't exist
if (!content.includes('import ReactDOMServer')) {
  content = content.replace(
    "import React, { useEffect, useMemo, useRef, useState } from 'react';",
    "import React, { useEffect, useMemo, useRef, useState } from 'react';\nimport ReactDOMServer from 'react-dom/server';\nimport { BtiPassportReport } from './BtiPassportReport';"
  );
}

// Find the old handleDownloadBTI
const oldHandleDownloadStart = content.indexOf('const handleDownloadBTI = () => {');
const endOfHandleDownload = content.indexOf('const [validPhotos, setValidPhotos] = useState<string[]>([]);');

if (oldHandleDownloadStart !== -1 && endOfHandleDownload !== -1) {
  const newFunctions = `
  const getReportHtml = () => {
    const cadastral = okn?.cadastralNumber || okn?.cadastral_number || getDisplayCadastral(okn) || '-';
    const address = okn?.address || '-';
    const seedHash = String(okn?.id || '').split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const uchetNum = \`\${Math.floor(10 + (seedHash % 89))}-01-\${new Date().getFullYear()}-\${Math.floor(1000 + Math.random()*8000)}\`;

    const reportElement = React.createElement(BtiPassportReport, {
      okn,
      details,
      uchetNum,
      cadastral,
      address
    });
    
    return ReactDOMServer.renderToString(reportElement);
  };

  const handleDownloadBTI = async () => {
    setIsDownloading(true);
    try {
      const htmlStr = getReportHtml();
      const container = document.createElement('div');
      container.innerHTML = htmlStr;
      
      const opt = {
        margin:       0,
        filename:     'pasport_bti_' + (okn?.cadastralNumber || 'obj') + '.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(container).save();
    } catch (err) {
      console.error(err);
    }
    setIsDownloading(false);
  };

  const generateBtiPdf = (mode: 'preview') => {
    if (mode === 'preview') {
      const htmlStr = getReportHtml();
      const printWindow = window.open('', '_blank', 'width=1000,height=900');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Паспорт БТИ</title></head><body style="margin:0;padding:0;background:#e5e7eb;display:flex;justify-content:center;">');
        printWindow.document.write('<div style="background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);margin:20px;padding:0;">');
        printWindow.document.write(htmlStr);
        printWindow.document.write('</div>');
        printWindow.document.write('<script>setTimeout(() => window.print(), 1000);</script></body></html>');
        printWindow.document.close();
      }
    }
  };

  `;

  content = content.slice(0, oldHandleDownloadStart) + newFunctions + content.slice(endOfHandleDownload);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully patched PassportPanel.tsx');
} else {
  console.log('Could not find the insertion points in PassportPanel.tsx');
}
