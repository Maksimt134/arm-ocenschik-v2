const fs = require('fs');
const filepath = 'C:/Users/Максим/.gemini/antigravity/scratch/arm-ocenschik/frontend/src/components/PassportPanel.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const searchStr = "        });\n            const targetIcon";
if (content.includes(searchStr)) {
    content = content.replace(searchStr, "        });\n      };\n      const targetIcon");
} else if (content.includes("        });\r\n            const targetIcon")) {
    content = content.replace("        });\r\n            const targetIcon", "        });\r\n      };\r\n      const targetIcon");
}

fs.writeFileSync(filepath, content, 'utf8');
console.log("SUCCESS");
