const fs = require('fs');
const content = fs.readFileSync('src/components/PassportPanel.tsx', 'utf8');

function extract(startStr, endStr) {
  let s = content.indexOf(startStr);
  let e = content.indexOf(endStr, s);
  if (s===-1 || e===-1) throw new Error('Not found: ' + startStr.substring(0,30) + ' or ' + endStr.substring(0,30));
  return content.substring(s, e);
}

const rosreestr = extract(
  '<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col">',
  '<div className="bg-slate-900/70 border border-emerald-500/25 shadow-[0_0_20px_rgba(52,211,153,0.1)] rounded-3xl p-6 flex flex-col relative overflow-hidden">'
);

const history = extract(
  '<div className="bg-slate-900/70 border border-emerald-500/25 shadow-[0_0_20px_rgba(52,211,153,0.1)] rounded-3xl p-6 flex flex-col relative overflow-hidden">',
  '</div>\n      </div>\n\n      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">'
);

const mapBlock = extract(
  '<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col h-full">',
  '<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-md flex flex-col">'
);

const photosBlock = extract(
  '<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-md flex flex-col">',
  '</div>\n      </div>\n\n      <div className="bg-slate-900/60 border border-slate-700/70 rounded-3xl p-6 shadow-lg flex flex-col">'
);

const conditionBlock = extract(
  '<div className="bg-slate-900/60 border border-slate-700/70 rounded-3xl p-6 shadow-lg flex flex-col">',
  '<div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 flex flex-col">'
);

const gisBlock = extract(
  '<div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 flex flex-col">',
  '        {/* Bottom Button */}'
);

const preamble = content.substring(0, content.indexOf('<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">'));
const postamble = content.substring(content.indexOf('        {/* Bottom Button */}'));

const newLayout = `
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
        {/* А. ЛЕВАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">
          ${photosBlock.trim()}
          ${mapBlock.trim()}
        </div>

        {/* Б. ЦЕНТРАЛЬНАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">
          ${rosreestr.trim()}
          ${conditionBlock.trim()}
        </div>

        {/* В. ПРАВАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">
          ${history.trim()}
          ${gisBlock.trim()}
        </div>
      </div>
`;

fs.writeFileSync('src/components/PassportPanel.tsx', preamble + newLayout + '\n\n' + postamble);
console.log('Refactor successful!');
