import React, { useState, useEffect } from 'react';

import { FileText, FolderOpen, Trash2 } from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  timestamp: string;
  cadastral_number: string;
  content: string;
}

export const ReportsJournal: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);

  useEffect(() => {
    loadReports();
    window.addEventListener('focus', loadReports);
    return () => window.removeEventListener('focus', loadReports);
  }, []);

  const loadReports = () => {
    const saved = localStorage.getItem('oknReportsJournal');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDownload = (report: ReportItem) => {
    try {
      const blob = new Blob([report.content], { type: 'application/msword' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Отчет_${report.cadastral_number || report.id}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Ошибка при скачивании файла", err);
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

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <FileText className="h-12 w-12 mb-4 opacity-50" />
        <p>Журнал отчетов пуст</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <div 
          key={report.id} 
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700 transition"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg shrink-0">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition truncate max-w-[200px] sm:max-w-[250px]" title={report.title}>
                {report.title}
              </h3>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Кадастр: {report.cadastral_number}
              </div>
              <div className="text-[10px] text-slate-500 mt-2">
                {report.timestamp}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition">
            <button 
              onClick={() => handleDownload(report)}
              className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-200 transition"
              title="Скачать DOCX"
            >
              <FolderOpen className="h-4 w-4" />
            </button>
            <button 
              onClick={(e) => handleDelete(report.id, e)}
              className="p-1.5 hover:bg-red-950 hover:text-red-400 rounded-md text-slate-500 transition"
              title="Удалить из журнала"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};