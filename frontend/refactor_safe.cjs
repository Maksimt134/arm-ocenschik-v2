const fs = require('fs');
const content = fs.readFileSync('src/components/PassportPanel.tsx', 'utf8');

function search(str, start = 0) {
    const idx = content.indexOf(str, start);
    if(idx === -1) throw new Error("Could not find: " + str.substring(0,40));
    return idx;
}

// Actual blocks in current code:
// 1. Rosreestr
const sRosreestr = search('<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col">');

// 2. Condition
const sCondition = search('<div className="bg-slate-900/60 border border-slate-700/70 rounded-3xl p-6 shadow-lg flex flex-col">');

// 3. GIS
const sGis = search('<div className="col-span-1 lg:col-span-2 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6">');

// 4. History
const sHistory = search('<div className="col-span-1 lg:col-span-2 bg-slate-900/70 border border-emerald-500/25 shadow-[0_0_20px_rgba(52,211,153,0.1)] rounded-3xl p-6 relative overflow-hidden">');

// 5. Photos (Includes BTI buttons)
const sPhotos = search('<div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-6 shadow-md">');

// 6. Map
const sMap = search('<div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-md">');

console.log("Indexes found successfully.");

function extractBlock(startIndex) {
    let open = 0;
    let i = startIndex;
    let started = false;
    while(i < content.length) {
        if (content.substr(i, 4) === '<div') {
            open++;
            started = true;
        } else if (content.substr(i, 6) === '</div') { 
            open--;
            if (open === 0 && started) {
                return content.substring(startIndex, i + 6);
            }
        }
        i++;
    }
    throw new Error("Could not find closing div for " + startIndex);
}

const rosreestrHtml = extractBlock(sRosreestr);
const conditionHtml = extractBlock(sCondition);
const gisHtml = extractBlock(sGis);
const historyHtml = extractBlock(sHistory);
const photosHtml = extractBlock(sPhotos);
const mapHtml = extractBlock(sMap);

// Preamble up to grid definition
const preamble = content.substring(0, content.indexOf('<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">'));
// Postamble from bottom button wrapper
const postamble = content.substring(content.indexOf('        <div className="col-span-1 lg:col-span-2 mt-6 flex justify-center">'));

// Strip outer col-span classes from blocks since they are now nested
const clean = (html) => html.replace(/col-span-1 lg:col-span-2 /g, '');

const newLayout = `
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
        {/* А. ЛЕВАЯ КОЛОНКА (Фото + Карта) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          ${clean(photosHtml)}
          ${clean(mapHtml).replace('h-[500px]', 'flex-1 min-h-[500px]')}
        </div>

        {/* Б. ЦЕНТРАЛЬНАЯ КОЛОНКА (Росреестр + Износ) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          ${clean(rosreestrHtml)}
          ${clean(conditionHtml)}
        </div>

        {/* В. ПРАВАЯ КОЛОНКА (История + ГИС) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          ${clean(historyHtml).replace('<div className="space-y-4 text-sm leading-relaxed text-slate-300">', '<div className="space-y-4 text-sm leading-relaxed text-slate-300 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">')}
          ${clean(gisHtml)}
        </div>
      </div>
`;

// wait, postamble includes the button which originally had "col-span-1 lg:col-span-2" - let's strip it
const cleanPostamble = postamble.replace('col-span-1 lg:col-span-2 mt-6 ', 'mt-4 ');

fs.writeFileSync('src/components/PassportPanel.tsx', preamble + newLayout + '\n' + cleanPostamble);
console.log("Refactored layout written successfully.");
