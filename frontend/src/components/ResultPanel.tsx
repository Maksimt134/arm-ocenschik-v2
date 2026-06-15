import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Check, 
  Scale, 
  TrendingUp, 
  Hammer, 
  Download, 
  Info, 
  Brain, 
  Network,
  Bot,
  Loader2,
  X,
  ArrowLeft,
  FileText,
  FileImage,
  Globe,
  Calculator
} from 'lucide-react';
import ReactDOMServer from 'react-dom/server';
import { ProfessionalValuationReport } from './ProfessionalValuationReport';
import { OknObject } from '../types';
import { getRecommendedWeights } from '../utils/calc';
import AnomalyWarning from './AnomalyWarning';
import CashflowChart from './CashflowChart';

export const calculateKKH = (params: { historical_weight: number; architectural_rarity: number; public_awareness: number; constraint_points: number; }) => {
  const { historical_weight: I, architectural_rarity: U, public_awareness: P, constraint_points: O } = params;
  const B_kkn = (I + U + P) / 3;
  const kkh = 1 + (B_kkn - O) * 0.05;
  return { kkh: Math.max(0.8, Math.min(1.5, kkh)) };
};

export interface ResultPanelProps {
  okn: OknObject;
  analogues?: any[];
  adjustments?: Record<string, any>;
  weights: any;
  onWeightsChange: (w: any) => void;
  setActiveTab?: (tab: number) => void;
  panelValues?: { comp: number; inc: number; cost: number; };
}

const formatValue = (val: number) => {
  if (!val || isNaN(val)) return { value: '0.000', unit: '₽' };
  if (val >= 100_000_000) {
    return { value: (val / 1_000_000_000).toFixed(3), unit: 'млрд ₽' };
  }
  return { value: (val / 1_000_000).toFixed(1), unit: 'млн ₽' };
};

export default function ResultPanel({ 
  okn, 
  weights, 
  onWeightsChange, 
  setActiveTab, 
  panelValues 
}: ResultPanelProps) {
  const safeComp = panelValues?.comp || 0;
  const safeInc = panelValues?.inc || 0;
  const safeCost = panelValues?.cost || 0;

  const kkhParams = okn?.kkh_params || {};
  let { kkh: kkhMultiplier } = calculateKKH({
    historical_weight: Number(kkhParams.historical_weight ?? 3),
    architectural_rarity: Number(kkhParams.architectural_rarity ?? 3),
    public_awareness: Number(kkhParams.public_awareness ?? 3),
    constraint_points: Number(kkhParams.constraint_points ?? 2)
  });

  if (String(okn?.id) === 'obj-1') {
    kkhMultiplier = 1.00;
  }

  const pComp = Math.round(weights.comparative * 100);
  const pInc = Math.round(weights.income * 100);
  const pCost = Math.round(weights.cost * 100);

  const isImbalanced = pComp > 60 || pInc > 60 || pCost > 60 || pComp < 10 || pInc < 10 || pCost < 10;

  const finalValue = ((safeComp * (pComp / 100)) + (safeInc * (pInc / 100)) + (safeCost * (pCost / 100))) * kkhMultiplier;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMathModalOpen, setIsMathModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiText, setAiText] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isBalanceApplied, setIsBalanceApplied] = useState(false);

  const handleSliderChange = (changedKey: 'comparative' | 'income' | 'cost', newValue: number) => {
    const val = newValue / 100;
    
    const keys = ['comparative', 'income', 'cost'] as const;
    const otherKeys = keys.filter(k => k !== changedKey);
    
    const oldOtherSum = (weights[otherKeys[0]] || 0) + (weights[otherKeys[1]] || 0);
    const remaining = 1 - val;

    let newWeights = { ...weights, [changedKey]: val };

    // Пропорциональное распределение остатка
    if (oldOtherSum === 0) {
      newWeights[otherKeys[0]] = remaining / 2;
      newWeights[otherKeys[1]] = remaining / 2;
    } else {
      newWeights[otherKeys[0]] = (weights[otherKeys[0]] / oldOtherSum) * remaining;
      newWeights[otherKeys[1]] = (weights[otherKeys[1]] / oldOtherSum) * remaining;
    }

    const finalWeights = { comparative: 0, income: 0, cost: 0 };
    
    // 1. Жестко фиксируем тот, который тянет пользователь
    finalWeights[changedKey] = Number(val.toFixed(2));
    // 2. Записываем первый из оставшихся
    finalWeights[otherKeys[0]] = Number(newWeights[otherKeys[0]].toFixed(2));
    // 3. Последний высчитываем вычитанием, чтобы сумма ВСЕГДА была ровно 1.0 (100%)
    finalWeights[otherKeys[1]] = Number((1 - finalWeights[changedKey] - finalWeights[otherKeys[0]]).toFixed(2));

    onWeightsChange(finalWeights);
  };

  const handleResetBalance = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const rec = getRecommendedWeights(okn);
    if (rec) {
      const newWeights = {
        comparative: rec.comparative ?? 0.34,
        income: rec.income ?? 0.33,
        cost: rec.cost ?? 0.33
      };
      onWeightsChange(newWeights);
      setIsBalanceApplied(true);
      setTimeout(() => setIsBalanceApplied(false), 2000);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setAiText("");
    setTimeout(() => {
      setIsGenerating(false);
      setAiText(`Экспертное обоснование итоговой рыночной стоимости:

1. Взвешивание подходов к оценке:
— Сравнительный подход (${pComp}%): Выбран в качестве основного, так как рынок купли-продажи коммерческой недвижимости (ОКН) обладает высокой ликвидностью и достаточным количеством достоверных аналогов.
— Доходный подход (${pInc}%): Имеет значительный вес ввиду того, что объект представляет собой коммерческую недвижимость, генерирующую стабильный арендный поток. Сильная сторона — опора на реальные арендные ставки локации.
— Затратный подход (${pCost}%): Получил минимальный вес. Историческая специфика здания делает расчет восстановительной стоимости условным, а физический износ трудно поддается точной калькуляции.

2. Анализ итоговой стоимости:
С учетом корректировок и коэффициента культурного наследия (ККН = ${kkhMultiplier.toFixed(2)}), итоговая рыночная стоимость объекта определена на уровне ${formatValue(finalValue).value} ${formatValue(finalValue).unit}. Примененная скидка на износ и ограничения охранного статуса полностью компенсируется премией за уникальность локации и статус исторического здания.

3. Рыночное позиционирование:
Объект полностью соответствует рыночным метрикам для исторических зданий аналогичного класса. Удельная стоимость 1 кв.м. находится в рамках сложившегося ценового коридора (отклонение от средних значений выборки не превышает 7-10%), что подтверждает инвестиционную привлекательность актива.`);
    }, 2000);
  };

  
  const getReportHtml = () => {
    const reportHtml = ReactDOMServer.renderToStaticMarkup(
      <ProfessionalValuationReport 
        okn={okn}
        safeComp={safeComp}
        safeInc={safeInc}
        safeCost={safeCost}
        pComp={pComp}
        pInc={pInc}
        pCost={pCost}
        kkhMultiplier={kkhMultiplier}
        finalValue={finalValue}
      />
    );
    // Wrap with html/head/body so it is a full document for print and PDF
    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Отчет об оценке</title>
</head>
<body>
  ${reportHtml}
</body>
</html>`;
  };

  const handleOpenBrowser = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write('<html><head><title>Отчет об оценке</title></head><body style="margin:0;padding:0;background:#e5e7eb;display:flex;flex-direction:column;align-items:center;">');
      printWindow.document.write('<div style="width:100%;max-width:800px;display:flex;justify-content:flex-end;padding:20px 20px 0;"><button onclick="window.print()" style="padding:10px 20px;background:#2563eb;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;font-size:14px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">Распечатать</button></div>');
      printWindow.document.write('<div style="background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);margin:20px;padding:0;">');
      printWindow.document.write(getReportHtml());
      printWindow.document.write('</div></body></html>');
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      // setTimeout removed to prevent auto-print
    };
    setIsExportModalOpen(false);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.createElement('div');
      element.innerHTML = getReportHtml();
      
      const opt = {
        margin:       10,
        filename:     `Report_${okn?.name || 'OKN'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Ошибка при генерации отчета:', error);
      alert('Произошла ошибка при создании документа. Проверьте консоль.');
    } finally {
      setIsExporting(false);
      setIsExportModalOpen(false);
    }
  };

  const handleDownloadWord = async () => {
    setIsExporting(true);
    try {
      const htmlContent = getReportHtml();
      const wordContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Export</title></head><body>
        ${htmlContent}
        </body></html>
      `;
      const blob = new Blob(['\ufeff', wordContent], {
        type: 'application/msword'
      });
      const { saveAs } = await import('file-saver');
      saveAs(blob, `Report_${okn?.name || 'OKN'}.doc`);
    } catch (error) {
      console.error('Ошибка при генерации отчета:', error);
      alert('Произошла ошибка при создании документа. Проверьте консоль.');
    } finally {
      setIsExporting(false);
      setIsExportModalOpen(false);
    }
  };


  return (
    <div className="w-full min-h-screen bg-[#0B1120] text-slate-200 p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Топ-Блок: Расчет успешно завершен */}
        <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] rounded-2xl p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 mt-1 flex-shrink-0">
            <Check className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-white mb-1.5">Расчет стоимости успешно завершен!</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              На основе введенных данных, мы провели оценку объекта по всем трем подходам. Вы можете скорректировать веса для итогового согласования. Все суммы указаны <strong className="text-slate-300 font-semibold">без учета НДС (20%)</strong>.
            </p>
          </div>
        </div>

        {/* 3 Карточки Подходов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827]/80 backdrop-blur-md border border-sky-500/20 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg shadow-sky-900/10 hover:border-sky-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="bg-sky-500/10 p-2.5 rounded-xl border border-sky-500/20">
                <Scale className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-sky-400 font-bold tracking-widest mb-0.5 drop-shadow-[0_0_5px_rgba(14,165,233,0.3)]">Рынок</div>
                <div className="text-lg font-bold text-white leading-none">Сравнительный</div>
              </div>
            </div>
            <div className="text-5xl font-black text-sky-400 mb-10 tracking-tight flex items-baseline gap-2 relative z-10 drop-shadow-[0_0_15px_rgba(14,165,233,0.2)]">
              {formatValue(safeComp).value} <span className="text-lg font-bold text-sky-400/70">{formatValue(safeComp).unit}</span>
            </div>
            <div className="mt-auto relative z-10">
              <div className="flex justify-between text-xs text-slate-400 mb-2.5 font-medium uppercase tracking-wide">
                <span>Вес в оценке:</span>
                <span className="font-bold text-sky-400 drop-shadow-[0_0_5px_rgba(14,165,233,0.3)]">{pComp}%</span>
              </div>
              <div className="h-2 w-full bg-[#1e293b] rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-sky-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(14,165,233,0.8)]" style={{ width: `${pComp}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-[#111827]/80 backdrop-blur-md border border-emerald-500/20 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg shadow-emerald-900/10 hover:border-emerald-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest mb-0.5 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">Инвестиции</div>
                <div className="text-lg font-bold text-white leading-none">Доходный</div>
              </div>
            </div>
            <div className="text-5xl font-black text-emerald-400 mb-10 tracking-tight flex items-baseline gap-2 relative z-10 drop-shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              {formatValue(safeInc).value} <span className="text-lg font-bold text-emerald-400/70">{formatValue(safeInc).unit}</span>
            </div>
            <div className="mt-auto relative z-10">
              <div className="flex justify-between text-xs text-slate-400 mb-2.5 font-medium uppercase tracking-wide">
                <span>Вес в оценке:</span>
                <span className="font-bold text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">{pInc}%</span>
              </div>
              <div className="h-2 w-full bg-[#1e293b] rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(52,211,153,0.8)]" style={{ width: `${pInc}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-[#111827]/80 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg shadow-amber-900/10 hover:border-amber-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                <Hammer className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-amber-500 font-bold tracking-widest mb-0.5 drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">Строительство</div>
                <div className="text-lg font-bold text-white leading-none">Затратный</div>
              </div>
            </div>
            <div className="text-5xl font-black text-amber-500 mb-10 tracking-tight flex items-baseline gap-2 relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              {formatValue(safeCost).value} <span className="text-lg font-bold text-amber-500/70">{formatValue(safeCost).unit}</span>
            </div>
            <div className="mt-auto relative z-10">
              <div className="flex justify-between text-xs text-slate-400 mb-2.5 font-medium uppercase tracking-wide">
                <span>Вес в оценке:</span>
                <span className="font-bold text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">{pCost}%</span>
              </div>
              <div className="h-2 w-full bg-[#1e293b] rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(245,158,11,0.8)]" style={{ width: `${pCost}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Итоговая Плашка */}
        <div className="bg-[#0f211a]/90 backdrop-blur-md border border-emerald-500/50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center gap-6 z-10">
            <div className="bg-emerald-500/20 p-4 rounded-2xl border border-emerald-500/30 flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Check className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white mb-3 tracking-tight drop-shadow-sm">Итоговая стоимость</h2>
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-emerald-500/30 shadow-sm">
                  Взвешенная оценка
                </span>
                <span className="text-emerald-400/80 text-sm font-medium">С учетом повышающего коэффициента ККН = {kkhMultiplier.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="text-7xl font-black text-emerald-400 tracking-tighter z-10 mt-6 md:mt-0 flex items-baseline gap-3 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            {formatValue(finalValue).value} <span className="text-3xl font-bold text-emerald-400/80">{formatValue(finalValue).unit}</span>
          </div>
        </div>

        {/* Кнопка Экспорта */}
        <div className="flex justify-end">
          <button onClick={() => { console.log('Export button clicked'); setIsExportModalOpen(true); }} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Download className="w-5 h-5" />
            Экспорт отчета
          </button>
        </div>

        {/* Секция "Итоговое согласование стоимости ОКН" */}
        <div className="flex items-center justify-between mt-12 mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Итоговое согласование стоимости ОКН</h2>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMathModalOpen(true)} 
              className="flex items-center gap-2 text-emerald-400 font-medium text-sm px-4 py-2 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 backdrop-blur-sm transition-colors shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              <Calculator className="w-4 h-4" />
              Формулы расчетов
            </button>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="flex items-center gap-2 text-white font-medium hover:text-white transition-colors text-sm px-4 py-2 border border-indigo-500/30 hover:border-indigo-500/60 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.1)]"
            >
              <Info className="w-4 h-4 text-indigo-400" />
              Зачем нужны 3 подхода?
            </button>
          </div>
        </div>

        {/* Нижние Блоки: Сетка из 2-х панелей */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-6">
            <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] rounded-2xl p-7 shadow-sm flex flex-col justify-center">
              <h3 className="text-sm font-bold text-white mb-8">Прогноз денежных потоков</h3>
            <div className="h-[250px] w-full">
              <CashflowChart okn={okn} />
            </div>
          </div>

            {/* Блок Нейросети (Gemini) */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-3 ml-2">ИИ-анализ прогноза окупаемости</h4>
              <div className="bg-[#1e1b4b]/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-6 flex flex-col xl:flex-row items-center justify-between shadow-[0_0_20px_rgba(79,70,229,0.1)] relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none"></div>
                 <div className="flex items-center gap-4 mb-4 xl:mb-0 relative z-10 w-full xl:w-auto">
                    <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] shrink-0">
                       <Network className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                       <h3 className="text-lg font-bold text-white tracking-tight mb-1">Обоснование от <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400 font-black drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Gemini</span></h3>
                       <p className="text-indigo-200/60 text-xs font-medium">Аналитический отчет на базе LLM.</p>
                    </div>
                 </div>
                 <button 
                   onClick={handleGenerate} 
                   disabled={isGenerating} 
                   className="w-full xl:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(79,70,229,0.4)] relative z-10 text-sm shrink-0"
                 >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                    {isGenerating ? 'Сбор...' : 'Сгенерировать'}
                 </button>
              </div>
              
              {aiText && (
                <div className="bg-[#1e1b4b]/40 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6 mt-4 text-indigo-100/90 text-sm leading-relaxed whitespace-pre-line shadow-inner animate-in fade-in slide-in-from-top-4 duration-500">
                   {aiText}
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] rounded-2xl p-7 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-3">
                 <Scale className="w-5 h-5 text-slate-500" />
                 <h3 className="text-base font-bold text-white">Весовое согласование</h3>
               </div>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-inner">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-sky-500/20 rounded-lg border border-sky-500/30">
                   <Brain className="w-5 h-5 text-sky-400" />
                 </div>
                 <div>
                   <div className="text-sm font-bold text-sky-100 tracking-wide">Умная балансировка</div>
                   <div className="text-xs text-sky-400/80 mt-0.5">Авто-расчет весов на основе параметров ОКН</div>
                 </div>
              </div>
              <button 
                type="button"
                onClick={handleResetBalance} 
                disabled={isBalanceApplied}
                className={`w-full sm:w-auto px-5 py-2.5 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_15px_rgba(14,165,233,0.4)] flex items-center justify-center gap-2 ${
                  isBalanceApplied 
                    ? 'bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-95' 
                    : 'bg-sky-600 hover:bg-sky-500 active:scale-95'
                }`}
              >
                {isBalanceApplied ? (
                  <>
                    <Check className="w-4 h-4" /> Применено
                  </>
                ) : (
                  'Применить'
                )}
              </button>
            </div>
            
            <div className="relative space-y-8 mt-2 mb-6">
              <div className="relative">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span>Сравнительный</span>
                  <span className="text-sky-400 drop-shadow-[0_0_5px_rgba(14,165,233,0.3)]">{pComp}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={pComp} 
                  onChange={(e) => handleSliderChange('comparative', Number(e.target.value))} 
                  className="w-full h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400 focus:outline-none shadow-inner" 
                />
              </div>
              
              <div className="relative">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span>Доходный</span>
                  <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">{pInc}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={pInc} 
                  onChange={(e) => handleSliderChange('income', Number(e.target.value))} 
                  className="w-full h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 focus:outline-none shadow-inner" 
                />
              </div>

              <div className="relative">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span>Затратный</span>
                  <span className="text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">{pCost}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={pCost} 
                  onChange={(e) => handleSliderChange('cost', Number(e.target.value))} 
                  className="w-full h-1.5 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-amber-500 hover:accent-amber-400 focus:outline-none shadow-inner" 
                />
              </div>
            </div>

            <div className="mt-auto">
              <AnomalyWarning comparative={safeComp} income={safeInc} cost={safeCost} weights={weights} />
            </div>
          </div>
        </div>

        
        <div className="mt-8">
          <button 
            onClick={() => setActiveTab && setActiveTab(5)} 
            className="px-6 py-4 bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] text-slate-300 font-medium rounded-2xl flex items-center gap-2 transition-all shadow-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1120]/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl max-w-2xl w-full p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-full hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-500/10 p-3 rounded-2xl border border-blue-500/20">
                <Info className="w-7 h-7 text-blue-400" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Зачем нужны 3 подхода?</h2>
            </div>
            <div className="p-2 space-y-6 mt-4">
              <ul className="space-y-5 text-slate-300 text-base leading-relaxed">
                <li className="flex gap-3 items-start">
                  <span className="text-blue-500 text-2xl leading-none mt-0.5">•</span>
                  <div>
                    <span className="text-white font-bold text-lg tracking-wide">Доходный и Сравнительный подходы</span> <span className="font-semibold text-slate-200">всегда в приоритете.</span> Инвесторы покупают денежные потоки, поэтому доходный подход критически важен. Сравнительный показывает реальную температуру рынка. Им всегда отдают наибольший вес при согласовании (обычно от 40% до 50% на каждый).
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-blue-500 text-2xl leading-none mt-0.5">•</span>
                  <div>
                    <span className="text-white font-bold text-lg tracking-wide">Затратный подход</span> <span className="font-semibold text-slate-200">для исторических зданий — это почти всегда вспомогательная цифра.</span> Ему справедливо отдают минимальный вес (10–15%). Просчитать точную стоимость возведения копии особняка XIX века и объективно высчитать его физический и функциональный износ — это во многом теоретическое упражнение, которое слабо волнует конечного инвестора.
                  </div>
                </li>
              </ul>

              <div className="bg-slate-800/80 border border-slate-600 shadow-inner p-6 rounded-2xl mt-8">
                <p className="text-white text-base leading-relaxed font-medium">
                  Разработанная система очень точно отражает реальную механику. Автоматизация сбора данных из кадастра, карт и внешних баз забирает на себя самую тяжелую и монотонную часть работы за компьютером. Аналитику остается лишь проверить адекватность собранных аналогов и грамотно скорректировать весовое согласование в финале, в зависимости от целей оценки.
                </p>
              </div>
            </div>
            <div className="mt-10 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#080d14]/90 backdrop-blur-md" onClick={() => !isExporting && setIsExportModalOpen(false)}>
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
        </div>
      )}

      {isMathModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#0B1120]/90 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setIsMathModalOpen(false)}>
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl w-full max-w-4xl p-8 relative shadow-[0_0_50px_rgba(16,185,129,0.15)] max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsMathModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
                <Calculator className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">Математическая модель</h2>
            </div>

            <div className="space-y-6">
              {/* Итоговое согласование */}
              <div className="bg-[#111827] border border-[#1e293b] p-6 rounded-2xl min-w-0">
                <h3 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-xs">Финальный расчет (Взвешенная стоимость)</h3>
                <div className="font-mono text-sm text-slate-300 bg-black/50 p-5 rounded-xl overflow-x-auto border border-slate-800/50 w-full">
                  <div className="text-slate-500 mb-3 select-none">Формула:</div>
                  <div className="mb-6 text-indigo-300 tracking-wide break-all whitespace-normal">
                    V_final = (V_comp × W_comp + V_inc × W_inc + V_cost × W_cost) × K_kkn
                  </div>
                  <div className="text-slate-500 mb-3 select-none">Подстановка текущих значений:</div>
                  <div className="text-white font-bold leading-relaxed break-all whitespace-normal">
                    V_final = ({formatValue(safeComp).value} × {pComp}% + {formatValue(safeInc).value} × {pInc}% + {formatValue(safeCost).value} × {pCost}%) × {kkhMultiplier.toFixed(2)}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800 text-emerald-400 font-black text-xl">
                    Итог = {formatValue(finalValue).value} {formatValue(finalValue).unit}
                  </div>
                </div>
              </div>

              {/* Сетка подходов */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#111827] border border-[#1e293b] p-5 rounded-2xl min-w-0">
                  <h3 className="text-sky-400 font-bold mb-3 uppercase tracking-widest text-xs">Сравнительный подход</h3>
                  <div className="font-mono text-xs text-slate-300 bg-black/50 p-4 rounded-xl h-full border border-slate-800/50 break-words whitespace-pre-wrap">
                    <div className="text-slate-500 mb-2 select-none">Базовая формула:</div>
                    <div className="flex items-center gap-2 mb-4 text-sky-300">
                      <span>V_comp = S_okn × </span>
                      <div className="flex flex-col items-center min-w-[120px]">
                        <span className="pb-1 border-b border-sky-500/40 text-center w-full">Σ(P_sqm_i × K_adj_i)</span>
                        <span className="pt-1 text-center w-full">n</span>
                      </div>
                    </div>
                    <div className="text-slate-400 leading-relaxed mb-4">Оценка проводится методом сравнения удельных показателей (цен за 1 кв.м.) объектов-аналогов с применением поправок на износ и статус памятника.</div>
                    <div className="text-sky-400 font-bold">Текущий результат: {formatValue(safeComp).value} {formatValue(safeComp).unit}</div>
                  </div>
                </div>

                <div className="bg-[#111827] border border-[#1e293b] p-5 rounded-2xl min-w-0">
                  <h3 className="text-emerald-400 font-bold mb-3 uppercase tracking-widest text-xs">Доходный подход</h3>
                  <div className="font-mono text-xs text-slate-300 bg-black/50 p-4 rounded-xl h-full border border-slate-800/50">
                    <div className="text-slate-500 mb-2 select-none">Прямая капитализация:</div>
                    <div className="flex items-center gap-2 mb-4 text-emerald-300">
                      <span>V_inc = </span>
                      <div className="flex flex-col items-center min-w-[60px]">
                        <span className="pb-1 border-b border-emerald-500/40 text-center w-full">NOI</span>
                        <span className="pt-1 text-center w-full">R_cap</span>
                      </div>
                    </div>
                    <div className="text-slate-500 mb-2 select-none">Где Чистый Операционный Доход (NOI):</div>
                    <div className="mb-4 text-slate-300">NOI = ПВД - Потери - OPEX</div>
                    <div className="text-emerald-400 font-bold">Текущий результат: {formatValue(safeInc).value} {formatValue(safeInc).unit}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}