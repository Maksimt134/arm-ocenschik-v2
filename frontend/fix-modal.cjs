const fs = require('fs');
const path = "C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\components\\ResultPanel.tsx";
let content = fs.readFileSync(path, 'utf8');

// First, fix the React import to include createPortal
if (!content.includes('createPortal')) {
  content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { createPortal } from 'react-dom';");
}

// Now replace the corrupted modal section with a clean createPortal version
// We'll use a regex to match the corrupted modal from {/* Export Modal */} to the end of its block.
const corruptedModalRegex = /\{\/\* Export Modal \*\/\}[\s\S]*?\{isExportModalOpen && \([\s\S]*?\}\)/;

const cleanModalJsx = `
      {/* Export Modal */}
      {isExportModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#080d14]/90 backdrop-blur-md" onClick={() => !isExporting && setIsExportModalOpen(false)}>
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl w-full max-w-2xl p-8 relative shadow-[0_0_50px_rgba(37,99,235,0.15)]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white tracking-wide">Формат экспорта отчета</h3>
              <button onClick={() => !isExporting && setIsExportModalOpen(false)} className="p-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="bg-[#111827]/80 border border-sky-500/20 rounded-2xl p-6 flex flex-col gap-4">
                <h4 className="text-sky-400 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Скачать файл
                </h4>
                <button 
                  onClick={handleDownloadPdf}
                  disabled={isExporting}
                  className="w-full bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-white p-4 rounded-xl flex items-center gap-4 transition-all disabled:opacity-50"
                >
                  <div className="bg-red-500/20 p-2.5 rounded-lg text-red-400">
                    <FileImage className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base">PDF Формат</div>
                    <div className="text-xs text-slate-400">С чертежами и печатями</div>
                  </div>
                </button>
                <button 
                  onClick={handleDownloadWord}
                  disabled={isExporting}
                  className="w-full bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-white p-4 rounded-xl flex items-center gap-4 transition-all disabled:opacity-50"
                >
                  <div className="bg-blue-500/20 p-2.5 rounded-lg text-blue-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base">Microsoft Word</div>
                    <div className="text-xs text-slate-400">Редактируемый .doc файл</div>
                  </div>
                </button>
              </div>

              {/* Right Column */}
              <div className="bg-[#111827]/80 border border-emerald-500/20 rounded-2xl p-6 flex flex-col gap-4">
                <h4 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Просмотр
                </h4>
                <button 
                  onClick={handleOpenBrowser}
                  disabled={isExporting}
                  className="w-full h-full bg-[#1e293b] hover:bg-[#334155] border border-slate-700 text-white p-4 rounded-xl flex flex-col items-center justify-center gap-4 transition-all disabled:opacity-50"
                >
                  <div className="bg-emerald-500/20 p-4 rounded-full text-emerald-400">
                    <Globe className="w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg mb-1">Открыть в браузере</div>
                    <div className="text-sm text-slate-400">Мгновенный просмотр и печать</div>
                  </div>
                </button>
              </div>
            </div>

            {isExporting && (
              <div className="absolute inset-0 z-10 bg-[#0f172a]/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <div className="text-white font-bold">Генерация отчета...</div>
                <div className="text-slate-400 text-sm mt-1">Это может занять несколько секунд</div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
`;

content = content.replace(corruptedModalRegex, cleanModalJsx);

// Write with utf8 encoding
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed modal with createPortal and correct encoding!');
