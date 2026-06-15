import React, { useMemo, useEffect } from 'react';
import { Hammer, Building, MapPin, TrendingDown, ArrowRight, ArrowLeft, Activity } from 'lucide-react';
import { OknObject } from '../types';

interface CostApproachPanelProps {
  okn: OknObject;
  setActiveTab: (tab: number) => void;
  panelValues?: any;
}

const formatValue = (val: number) => {
  if (!val || isNaN(val)) return { value: '0', unit: '₽' };
  if (val >= 100_000_000) {
    return { value: (val / 1_000_000_000).toFixed(2), unit: 'млрд ₽' };
  }
  return { value: (val / 1_000_000).toFixed(1), unit: 'млн ₽' };
};

const calculateCostBreakdown = (okn: any) => {
  const area = Number(okn?.area || okn?.metadata?.area) || 1000;
  
  const idStr = String(okn?.id || '123');
  const hash = idStr.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const pseudoRandom = Math.abs(hash % 100) / 100;
  
  const plotArea = area * (1.2 + pseudoRandom * 0.5);
  const landPricePerSqm = 120000 + (pseudoRandom * 80000); // 120k to 200k
  const landValue = plotArea * landPricePerSqm;

  const buildCostPerSqm = 180000 + (pseudoRandom * 120000); // 180k to 300k
  const replacementCost = area * buildCostPerSqm;

  // Износ зависит от возраста
  const yearStr = String(okn?.year_built || '1900');
  const yearBuilt = parseInt(yearStr.replace(/\D/g, '')) || 1900;
  const age = Math.max(0, new Date().getFullYear() - yearBuilt);
  
  const physicalDep = Math.min(0.6, age * 0.005);
  const functionalDep = Math.min(0.2, age * 0.002);
  const economicDep = Math.min(0.15, age * 0.001);

  const totalDepPct = physicalDep + functionalDep + economicDep;
  const accumulatedDepreciation = replacementCost * totalDepPct;

  return { plotArea, landPricePerSqm, landValue, buildCostPerSqm, replacementCost, physicalDep, functionalDep, economicDep, totalDepPct, accumulatedDepreciation };
};

const CostApproachPanel: React.FC<CostApproachPanelProps> = ({ okn, setActiveTab, panelValues }) => {
  const b = useMemo(() => calculateCostBreakdown(okn), [okn]);
  
  const landValue = b.landValue;
  const replacementCost = b.replacementCost;
  const accumDepValue = b.accumulatedDepreciation;
  
  const finalValue = panelValues?.cost || 0;

  const physPct = b.physicalDep * 100;
  const funcPct = b.functionalDep * 100;
  const econPct = b.economicDep * 100;
  const totalDepPct = (b.physicalDep + b.functionalDep + b.economicDep) * 100;

  const physAmount = replacementCost * b.physicalDep;
  const funcAmount = replacementCost * b.functionalDep;
  const econAmount = replacementCost * b.economicDep;

  const finalFmt = formatValue(finalValue);
  const landFmt = formatValue(landValue);
  const repFmt = formatValue(replacementCost);
  const accFmt = formatValue(accumDepValue);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-slate-300 font-sans min-h-screen bg-[#0B1120]">
      
      <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-[#1e293b] rounded-[2.5rem] p-8 md:p-10 mb-8 relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.05)]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full uppercase border border-amber-500/20 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              Шаг 5 из 6 • Затраты
            </div>
            <h1 className="text-3xl font-medium text-white mb-2 flex items-center gap-3">
              <Hammer className="w-6 h-6 text-amber-500" /> Затратный подход
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Определяет сумму, необходимую для полного воссоздания исторического здания с нуля, с учетом стоимости земли и вычетом накопленного износа.
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-500/80 mb-2 drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">Итоговая стоимость по затратному подходу</div>
            <div className="text-5xl md:text-6xl font-bold text-amber-500 tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(245,158,11,0.25)] flex items-baseline gap-2">
              {finalFmt.value} <span className="text-2xl text-amber-500/50">{finalFmt.unit}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#0f172a]/80 backdrop-blur-md border border-[#1e293b] rounded-3xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><MapPin className="w-32 h-32 text-amber-500" /></div>
          <div className="flex items-center gap-2 mb-4 relative z-10 text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">
            <MapPin className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Стоимость участка</span>
          </div>
          <div className="text-4xl font-semibold text-white tabular-nums tracking-tight mb-6 relative z-10">
            {landFmt.value} <span className="text-xl text-slate-500 font-medium">{landFmt.unit}</span>
          </div>
          <div className="text-xs text-slate-400 bg-[#080d14] p-4 rounded-xl border border-[#1e293b] relative z-10 flex flex-col gap-2">
            <div className="flex justify-between"><span>Площадь участка:</span> <strong className="text-white">{Math.round(b.plotArea).toLocaleString('ru-RU')} м²</strong></div>
            <div className="flex justify-between"><span>Кадастровая ставка:</span> <strong className="text-white">{Math.round(b.landPricePerSqm).toLocaleString('ru-RU')} ₽/м²</strong></div>
          </div>
        </div>

        <div className="bg-[#0f172a]/80 backdrop-blur-md border border-[#1e293b] rounded-3xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Building className="w-32 h-32 text-sky-500" /></div>
          <div className="flex items-center gap-2 mb-4 relative z-10 text-sky-500 drop-shadow-[0_0_5px_rgba(14,165,233,0.3)]">
            <Building className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Стоимость строительства</span>
          </div>
          <div className="text-4xl font-semibold text-white tabular-nums tracking-tight mb-6 relative z-10">
            {repFmt.value} <span className="text-xl text-slate-500 font-medium">{repFmt.unit}</span>
          </div>
          <div className="text-xs text-slate-400 bg-[#080d14] p-4 rounded-xl border border-[#1e293b] relative z-10 flex flex-col gap-2">
            <div className="flex justify-between"><span>Площадь здания:</span> <strong className="text-white">{Math.round(okn?.area || 1400).toLocaleString('ru-RU')} м²</strong></div>
            <div className="flex justify-between"><span>Базовая ставка возведения:</span> <strong className="text-white">{Math.round(b.buildCostPerSqm).toLocaleString('ru-RU')} ₽/м²</strong></div>
          </div>
        </div>

        <div className="bg-[#0f172a]/80 backdrop-blur-md border border-rose-900/30 rounded-3xl p-8 shadow-[0_0_20px_rgba(225,29,72,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><TrendingDown className="w-32 h-32 text-rose-500" /></div>
          <div className="flex items-center gap-2 mb-4 relative z-10 text-rose-500 drop-shadow-[0_0_5px_rgba(244,63,94,0.3)]">
            <TrendingDown className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Накопленный износ</span>
          </div>
          <div className="text-4xl font-semibold text-rose-400 tabular-nums tracking-tight mb-6 relative z-10">
            −{accFmt.value} <span className="text-xl text-rose-500/50 font-medium">{accFmt.unit}</span>
          </div>
          <div className="text-xs text-rose-300/80 bg-rose-950/30 p-4 rounded-xl border border-rose-900/50 relative z-10 flex flex-col gap-2">
            <div className="flex justify-between"><span>Суммарный % износа:</span> <strong className="text-rose-400">{totalDepPct.toFixed(1)}%</strong></div>
            <div className="flex justify-between"><span>Остаточная стоимость здания:</span> <strong className="text-white">{formatValue(replacementCost - accumDepValue).value} {formatValue(replacementCost - accumDepValue).unit}</strong></div>
          </div>
        </div>
      </div>

      <div className="bg-[#080d14]/80 backdrop-blur-xl border border-[#1e293b] rounded-[2.5rem] p-8 md:p-10 mb-10 shadow-lg">
        <div className="flex items-center gap-3 mb-8">
          <Activity className="w-6 h-6 text-indigo-400" />
          <div>
            <h3 className="text-xl font-medium text-white">Декомпозиция накопленного износа</h3>
            <p className="text-slate-500 text-sm">Детальный разбор потери стоимости исторического здания</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-sm font-bold text-rose-400 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(244,63,94,0.3)]">Физический износ</div>
                  <div className="bg-rose-500/10 text-rose-400 text-xs px-2 py-0.5 rounded border border-rose-500/20">{physPct.toFixed(1)}%</div>
                </div>
                <div className="text-xs text-slate-400 max-w-2xl">Естественное старение конструкций, фасадов, инженерных систем и отделки за прошедшие десятилетия. Для исторических зданий он обычно самый высокий.</div>
              </div>
              <div className="text-2xl font-bold text-white tabular-nums">{formatValue(physAmount).value} <span className="text-sm text-slate-500">{formatValue(physAmount).unit}</span></div>
            </div>
            <div className="h-3 bg-[#1e293b] rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]" style={{ width: `${Math.min(100, physPct)}%` }} />
            </div>
          </div>

          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-sm font-bold text-orange-400 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(249,115,22,0.3)]">Функциональный износ</div>
                  <div className="bg-orange-500/10 text-orange-400 text-xs px-2 py-0.5 rounded border border-orange-500/20">{funcPct.toFixed(1)}%</div>
                </div>
                <div className="text-xs text-slate-400 max-w-2xl">Потеря стоимости из-за устаревших планировок, отсутствия подземного паркинга, низкой энергоэффективности и отсутствия современных коммуникаций.</div>
              </div>
              <div className="text-2xl font-bold text-white tabular-nums">{formatValue(funcAmount).value} <span className="text-sm text-slate-500">{formatValue(funcAmount).unit}</span></div>
            </div>
            <div className="h-3 bg-[#1e293b] rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]" style={{ width: `${Math.min(100, funcPct)}%` }} />
            </div>
          </div>

          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(99,102,241,0.3)]">Экономический износ</div>
                  <div className="bg-indigo-500/10 text-indigo-400 text-xs px-2 py-0.5 rounded border border-indigo-500/20">{econPct.toFixed(1)}%</div>
                </div>
                <div className="text-xs text-slate-400 max-w-2xl">Потеря стоимости из-за внешних факторов: строгие охранные обязательства ОКН, градостроительные регламенты, сложности и длительность согласований реконструкции.</div>
              </div>
              <div className="text-2xl font-bold text-white tabular-nums">{formatValue(econAmount).value} <span className="text-sm text-slate-500">{formatValue(econAmount).unit}</span></div>
            </div>
            <div className="h-3 bg-[#1e293b] rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]" style={{ width: `${Math.min(100, econPct)}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={() => setActiveTab(4)} className="px-6 py-4 bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] text-slate-300 font-medium rounded-2xl flex items-center gap-2 transition-all shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
        <button onClick={() => setActiveTab(6)} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
          ДАЛЕЕ: РЕЗУЛЬТАТЫ <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default CostApproachPanel;
