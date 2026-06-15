const fs = require('fs');
const filepath = 'C:/Users/Максим/.gemini/antigravity/scratch/arm-ocenschik/frontend/src/components/PassportPanel.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const badStart = "L12 17.77l-6.18 3.25L7 14.14  const generateBtiPdf = async (mode: 'download' | 'preview') => {";
let startIdx = content.indexOf(badStart);
if (startIdx === -1) {
    console.log("badStart not found");
    process.exit(1);
}

let endStr = "    } finally {\n      setIsDownloading(false);\n    }\n  };";
let endIdx = content.indexOf(endStr, startIdx);
if (endIdx === -1) {
    endStr = "    } finally {\r\n      setIsDownloading(false);\r\n    }\r\n  };";
    endIdx = content.indexOf(endStr, startIdx);
}
if (endIdx === -1) {
    console.log("endStr not found");
    process.exit(1);
}

let newContent = content.substring(0, startIdx) + "L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"/></svg></div>`\n        });\n      };\n" + content.substring(endIdx + endStr.length);

fs.writeFileSync(filepath, newContent, 'utf8');
console.log("FIXED");
