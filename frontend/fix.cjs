const fs = require('fs');
const filepath = 'C:/Users/Максим/.gemini/antigravity/scratch/arm-ocenschik/frontend/src/components/PassportPanel.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const target1 = `  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);`;

const replacement1 = `  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadBTI = () => {
    const cadastral = okn?.cadastralNumber || okn?.cadastral_number || getDisplayCadastral(okn) || '-';
    const address = okn?.address || '-';
    const yearBuilt = details?.year || '-';
    const areaVal = details?.area || '-';
    
    const seedHash = String(okn?.id || '').split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const uchetNum = \`\${Math.floor(10 + (seedHash % 89))}-01-\${new Date().getFullYear()}-\${Math.floor(1000 + Math.random()*8000)}\`;

    const printWindow = window.open('', '', 'width=800,height=900');
    if (!printWindow) return;

    const html = \`
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="utf-8">
        <title>ТЕХНИЧЕСКИЙ ПАСПОРТ НА ЗДАНИЕ (СТРОЕНИЕ) БТИ - \${cadastral}</title>
        <style>
          body { font-family: "Times New Roman", Times, serif; font-size: 14pt; color: black; background: white; margin: 0 auto; padding: 40px; max-width: 800px; box-sizing: border-box; }
          h1 { text-align: center; text-transform: uppercase; font-size: 18pt; margin-bottom: 30px; border-bottom: 2px solid black; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          th, td { border: 1px solid black; padding: 12px 8px; text-align: left; }
          .bold { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>ТЕХНИЧЕСКИЙ ПАСПОРТ НА ЗДАНИЕ (СТРОЕНИЕ) БТИ</h1>
        <table>
          <tr><td class="bold" style="width: 40%;">Инвентарный номер</td><td>\${uchetNum}</td></tr>
          <tr><td class="bold">Кадастровый номер</td><td>\${cadastral}</td></tr>
          <tr><td class="bold">Адрес</td><td>\${address}</td></tr>
          <tr><td class="bold">Площадь</td><td>\${areaVal} кв. м</td></tr>
          <tr><td class="bold">Год постройки</td><td>\${yearBuilt}</td></tr>
          <tr><td class="bold">Процент физического износа</td><td>\${okn?.wear_pct || okn?.metadata?.wear_pct || 30}%</td></tr>
        </table>
        <script>
          setTimeout(function() { window.print(); }, 300);
        </script>
      </body>
      </html>
    \`;
    printWindow.document.write(html);
    printWindow.document.close();
  };`;

content = content.replace(target1, replacement1);

const target2 = `onClick={() => generateBtiPdf('download')}`;
const replacement2 = `onClick={handleDownloadBTI}`;

content = content.replace(target2, replacement2);

fs.writeFileSync(filepath, content, 'utf8');
console.log('SUCCESS');
