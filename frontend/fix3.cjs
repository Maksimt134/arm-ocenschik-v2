const fs = require('fs');
const filepath = 'C:/Users/Максим/.gemini/antigravity/scratch/arm-ocenschik/frontend/src/components/PassportPanel.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const search1 = "        });\n      };\n";
let idx1 = content.indexOf(search1);
if (idx1 === -1) {
    idx1 = content.indexOf("        });\r\n      };\r\n");
    if (idx1 === -1) {
        console.log("Could not find end of createIcon");
        process.exit(1);
    }
}
// Skip the matched part
const cutStart = idx1 + (content.includes("        });\r\n      };\r\n") ? 20 : 18);

const search2 = "  return (\n    <div className=\"max-w-7xl mx-auto py-6 px-4 space-y-6 animate-fadeIn\">\n";
let idx2 = content.indexOf(search2, cutStart);
if (idx2 === -1) {
    const search2rn = "  return (\r\n    <div className=\"max-w-7xl mx-auto py-6 px-4 space-y-6 animate-fadeIn\">\r\n";
    idx2 = content.indexOf(search2rn, cutStart);
    if (idx2 === -1) {
        console.log("Could not find return statement");
        process.exit(1);
    }
}

const replacement = `      const targetIcon = createIcon(true, okn?.okn_category);
      L.marker(coords, { icon: targetIcon, zIndexOffset: 1000 }).addTo(layers);
      
      const validAnalogues = getMapAnaloguesForObject(okn);
      validAnalogues.forEach((an) => {
        if (!an.coordinates || an.coordinates.length !== 2) return;
        const m = L.marker([an.coordinates[0], an.coordinates[1]], {
          icon: createIcon(false, '')
        }).addTo(layers);
      });
    }
  }, [coords, okn]);

`;

let newContent = content.substring(0, cutStart) + replacement + content.substring(idx2);

fs.writeFileSync(filepath, newContent, 'utf8');
console.log("SUCCESS");
