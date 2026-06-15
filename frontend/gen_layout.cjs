const fs = require('fs');
const content = fs.readFileSync('src/components/PassportPanel.tsx', 'utf8');

const s1 = content.indexOf('<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col">');
const e1 = content.indexOf('        <div className="bg-slate-900/60 border border-slate-700/70 rounded-3xl p-6 shadow-lg flex flex-col">', s1);

const s2 = e1;
const e2 = content.indexOf('      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">', s2);

const s3 = content.indexOf('<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col h-full">');
const e3 = content.indexOf('        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-md flex flex-col">', s3);

const s4 = e3;
const e4 = content.indexOf('        <div className="bg-slate-900/70 border border-emerald-500/25 shadow-[0_0_20px_rgba(52,211,153,0.1)] rounded-3xl p-6 flex flex-col relative overflow-hidden">', s4);

const s5 = e4;
const e5 = content.indexOf('        <div className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 flex flex-col">', s5);

const s6 = e5;
const e6 = content.indexOf('      <div className="flex justify-center mt-4">', s6);

const header = content.substring(content.indexOf('      <div className="bg-slate-900/80'), content.indexOf('      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">'));
const preamble = content.substring(0, content.indexOf('      <div className="bg-slate-900/80'));
const postamble = content.substring(content.indexOf('      <div className="flex justify-center mt-4">'));

const r = content.substring(s1, e1);
const c = content.substring(s2, e2);
const m = content.substring(s3, e3);
const p = content.substring(s4, e4);
const h = content.substring(s5, e5);
const g = content.substring(s6, e6);

const out = preamble + header + `
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
        {/* А. ЛЕВАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">
` + p.replace(/^        /gm, '          ') + m.replace(/^        /gm, '          ') + `
        </div>

        {/* Б. ЦЕНТРАЛЬНАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">
` + r.replace(/^        /gm, '          ') + c.replace(/^        /gm, '          ') + `
        </div>

        {/* В. ПРАВАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">
` + h.replace(/^        /gm, '          ') + g.replace(/^        /gm, '          ') + `
        </div>
      </div>
` + postamble;

fs.writeFileSync('src/components/PassportPanel_new.tsx', out);
console.log('done');
