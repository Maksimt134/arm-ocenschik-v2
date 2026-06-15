import React, { useState, useEffect } from 'react';

import { Download, FileBadge, FileCheck, FileText, Trash2, X } from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  timestamp: string;
  cadastral_number: string;
  content: string;
}

interface ReportsJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportsJournalModal: React.FC<ReportsJournalModalProps> = ({ isOpen, onClose }) => {
  const [reports, setReports] = useState<ReportItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadReports();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadReports = () => {
    const saved = localStorage.getItem('oknReportsJournal');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка парсинга журнала отчетов:", e);
      }
    }
  };

  const handleDownload = async (report: ReportItem) => {
    try {
      let blob;
      if (report.content.startsWith('data:')) {
        const res = await fetch(report.content);
        blob = await res.blob();
      } else {
        // Если это строка (наш HTML для DOCX)
        blob = new Blob([report.content], { type: 'application/msword' });
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Отчет_${report.cadastral_number || report.id}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Ошибка при скачивании:", error);
      alert("Не удалось скачать файл.");
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Удалить отчет из журнала?")) {
      const newReports = reports.filter(r => r.id !== id);
      setReports(newReports);
      localStorage.setItem('oknReportsJournal', JSON.stringify(newReports));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-850 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
              <FileBadge className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Журнал отчетов</h2>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Сохраненные результаты оценки</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-950/50">
          {reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <FileCheck className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-base font-bold text-slate-300 mb-2">Журнал пуст</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Здесь будут появляться сформированные отчеты (DOCX) после завершения оценки объектов.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <FileText className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition truncate max-w-[200px] sm:max-w-[300px]" title={report.title}>
                        {report.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                          Кадастр: {report.cadastral_number}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          {report.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDownload(report)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-white rounded-lg transition-all text-xs font-bold active:scale-95"
                      title="Скачать DOCX"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Скачать</span>
                    </button>
                    <button 
                      onClick={(e) => handleDelete(report.id, e)}
                      className="p-2 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg text-slate-500 hover:text-red-400 transition-all active:scale-95"
                      title="Удалить из журнала"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {reports.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-850 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500 font-mono">
              Всего отчетов: {reports.length}
            </span>
            <button 
              onClick={() => {
                if (window.confirm("Удалить все отчеты? Это действие необратимо.")) {
                  setReports([]);
                  localStorage.removeItem('oknReportsJournal');
                }
              }}
              className="text-xs text-red-400 hover:text-red-300 font-medium hover:underline underline-offset-4 transition-colors"
            >
              Очистить журнал
            </button>
          </div>
        )}
      </div>
    </div>
  );
};