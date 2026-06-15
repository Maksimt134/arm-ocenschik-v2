const fs = require('fs');
const path = require('path');

const srcDataDir = 'C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\data';
const mockDataPath = path.join(srcDataDir, 'mockAnalogues.ts');
const allObjectsPath = path.join(srcDataDir, 'allObjects.ts');
const publicPhotosDir = 'C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\public\\photos';

// 1. Move LOCAL_MOCK_ANALOGUES_ROSSIYA to allObjects.ts
let mockText = fs.readFileSync(mockDataPath, 'utf8');
const rossiyaRegex = /export const LOCAL_MOCK_ANALOGUES_ROSSIYA: Analogue\[\] = \[([\s\S]*?)\];/;
const match = mockText.match(rossiyaRegex);

if (match) {
  let arrayContent = match[0];
  
  // Remove from mockAnalogues.ts
  mockText = mockText.replace(rossiyaRegex, '');
  fs.writeFileSync(mockDataPath, mockText);

  // Apply the mapping and photo file search
  const mapping = {
    'analogue-rossiya-1': 'analog_b_hariton_10',
    'analogue-rossiya-2': 'analog_kursovoy_1',
    'analogue-rossiya-3': 'analog_prechistenka_28',
    'analogue-rossiya-4': 'analog_arbat_35',
    'analogue-rossiya-5': 'analog_gogol_21',
    'analogue-rossiya-6': 'analog_romanov_3',
    'analogue-rossiya-7': 'analog_myasnitskaya_15',
    'analogue-rossiya-8': 'analog_pokrovka_2_1',
    'analogue-rossiya-9': 'analog_tverskaya_25',
    'analogue-rossiya-10': 'analog_b_lubyanka_14',
    'analogue-rossiya-11': 'analog_novokuznetskaya_34',
    'analogue-rossiya-12': 'analog_stoleshnikov_11',
    'analogue-rossiya-13': 'analog_myasnitskaya_22',
    'analogue-rossiya-14': 'analog_podkopaevsky_4'
  };

  for (const [id, folder] of Object.entries(mapping)) {
    let photoFile = '1.jpg';
    try {
      const folderPath = path.join(publicPhotosDir, folder);
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(jpe?g|png|webp)$/i));
        if (files.length > 0) {
          // just pick the first valid image
          photoFile = files[0];
        }
      }
    } catch (e) {
      console.error(e);
    }
    
    const itemRegex = new RegExp(`"id":\\s*"${id}"[\\s\\S]*?\\}`);
    const itemMatch = arrayContent.match(itemRegex);
    if (itemMatch) {
      let itemStr = itemMatch[0];
      // remove old photosFolder if exists
      itemStr = itemStr.replace(/,\s*"photosFolder":\s*"[^"]*"/g, '');
      // remove old photoFile if exists
      itemStr = itemStr.replace(/,\s*"photoFile":\s*"[^"]*"/g, '');
      
      // insert new properties right before the closing brace
      itemStr = itemStr.replace(/\}$/, `, "photosFolder": "${folder}", "photoFile": "${photoFile}"}`);
      arrayContent = arrayContent.replace(itemRegex, itemStr);
    }
  }

  // Append to allObjects.ts
  let allObjectsText = fs.readFileSync(allObjectsPath, 'utf8');
  if (!allObjectsText.includes('LOCAL_MOCK_ANALOGUES_ROSSIYA')) {
    // Add import if needed
    if (!allObjectsText.includes('Analogue')) {
      allObjectsText = "import { Analogue } from '../types';\n" + allObjectsText;
    }
    allObjectsText += "\n\n" + arrayContent + "\n";
    fs.writeFileSync(allObjectsPath, allObjectsText);
    console.log("Moved and updated LOCAL_MOCK_ANALOGUES_ROSSIYA to allObjects.ts");
  } else {
      // Just update it if it's already there
      allObjectsText = allObjectsText.replace(/export const LOCAL_MOCK_ANALOGUES_ROSSIYA: Analogue\[\] = \[([\s\S]*?)\];/, arrayContent);
      fs.writeFileSync(allObjectsPath, allObjectsText);
      console.log("Updated LOCAL_MOCK_ANALOGUES_ROSSIYA in allObjects.ts");
  }
} else {
  console.log("Could not find LOCAL_MOCK_ANALOGUES_ROSSIYA in mockAnalogues.ts");
}

// 2. Fix AnaloguesPanel.tsx imports and UI
const compDir = 'C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\components';
const analoguesPanelPath = path.join(compDir, 'AnaloguesPanel.tsx');
if (fs.existsSync(analoguesPanelPath)) {
  let ap = fs.readFileSync(analoguesPanelPath, 'utf8');
  
  // Fix imports
  ap = ap.replace(/import \{ LOCAL_MOCK_ANALOGUES_ROSSIYA \} from '..\/data\/mockAnalogues';/g, "import { LOCAL_MOCK_ANALOGUES_ROSSIYA } from '../data/allObjects';");
  ap = ap.replace(/import \{ LOCAL_MOCK_ANALOGUES_ROSSIYA \} from '..\/utils\/mockData';/g, "import { LOCAL_MOCK_ANALOGUES_ROSSIYA } from '../data/allObjects';");
  
  // Fix img
  ap = ap.replace(/<img\s+src=\{`\/photos\/\$\{analog\.photosFolder\}\/1\.jpg`\}\s+alt=\{analog\.address\}/g, "<img src={`/photos/${analog.photosFolder}/${analog.photoFile || '1.jpg'}`} alt={analog.address}");
  
  // Fix similarity
  ap = ap.replace(/\{analog\.similarity\}%\s*(сходство|\?:\?\?\?'\?\?)/g, "{Math.round((analog.similarity || 0) * 100)}% сходство");
  
  // Fix price formatting - replace the whole grid block
  const oldGridRegex = /<div className="grid grid-cols-2 gap-3 mt-auto">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  const newGrid = `<div className="grid grid-cols-2 gap-3 mt-auto">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Площадь</div>
                        <div className="text-xs font-semibold text-slate-300">{analog.area} кв.м</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Цена (руб)</div>
                        <div className="text-sm font-bold text-emerald-400 tracking-tight">{analog.base_price?.toLocaleString('ru-RU')} <span className="text-[10px] font-normal text-slate-500">руб.</span></div>
                        <div className="text-[10px] text-emerald-500/70">{analog.price_per_sqm?.toLocaleString('ru-RU')} руб/кв.м</div>
                      </div>
                    </div>
                  </div>
                </div>`;
  ap = ap.replace(oldGridRegex, newGrid);

  fs.writeFileSync(analoguesPanelPath, ap);
  console.log("Updated AnaloguesPanel.tsx");
}

// 3. Fix PassportPanel.tsx imports
const passportPanelPath = path.join(compDir, 'PassportPanel.tsx');
if (fs.existsSync(passportPanelPath)) {
  let pp = fs.readFileSync(passportPanelPath, 'utf8');
  pp = pp.replace(/import \{ LOCAL_MOCK_ANALOGUES_ROSSIYA \} from '..\/data\/mockAnalogues';/g, "import { LOCAL_MOCK_ANALOGUES_ROSSIYA } from '../data/allObjects';");
  fs.writeFileSync(passportPanelPath, pp);
  console.log("Updated PassportPanel.tsx");
}
