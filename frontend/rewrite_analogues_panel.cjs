const fs = require('fs');
let code = fs.readFileSync('C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\components\\AnaloguesPanel.tsx', 'utf8');

// The block to replace:
const oldCardRegex = /<div\s+key=\{analog\.id\}\s+onClick=\{\(\) => toggleAnalog\(String\(analog\.id\)\)\}\s+className=\{`group flex items-center p-4 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden \$\{[\s\S]*?`\}\s*>\s*<div className="flex-1 min-w-0 pr-4">[\s\S]*?<\/div>\s*<\/div>/g;

const newCard = `<div
                  key={analog.id}
                  onClick={() => toggleAnalog(String(analog.id))}
                  className={\`group bg-[#0f172a]/60 backdrop-blur-md border border-[#1e293b] hover:border-sky-500/50 rounded-2xl transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer overflow-hidden flex flex-col \${
                    isActive 
                      ? 'ring-1 ring-sky-500 bg-sky-950/20 shadow-[0_0_20px_rgba(14,165,233,0.15)]' 
                      : ''
                  }\`}
                >
                  <div className="relative h-40 flex-shrink-0 bg-[#080d14] overflow-hidden">
                    <img 
                      src={\`/photos/\${analog.photosFolder}/1.jpg\`} 
                      alt={analog.address} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/no-photo-placeholder.png';
                      }}
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-2">
                      <div className="px-2 py-1 bg-[#1e293b]/90 backdrop-blur text-sky-400 text-xs font-bold rounded-lg border border-sky-500/30">
                        {analog.similarity}% сходство
                      </div>
                      {analog.is_okn === 1.0 && (
                        <div className="px-2 py-1 bg-rose-500/10 backdrop-blur text-rose-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-rose-500/20">
                          ОКН
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="text-sm font-medium text-white mb-3 line-clamp-2 leading-snug group-hover:text-sky-300 transition-colors">
                      {analog.address}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Площадь</div>
                        <div className="text-xs font-semibold text-slate-300">{analog.area} кв.м</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Цена (руб/кв.м)</div>
                        <div className="text-sm font-bold text-emerald-400 tracking-tight">{valFmt.value} <span className="text-[10px] font-normal text-slate-500">{valFmt.unit}</span></div>
                      </div>
                    </div>
                  </div>
                </div>`;

code = code.replace(oldCardRegex, newCard);

fs.writeFileSync('C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\components\\AnaloguesPanel.tsx', code);
console.log('AnaloguesPanel updated');
