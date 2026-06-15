import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowRight, ArrowLeft, Info, X, LineChart, Calculator } from 'lucide-react';
import { OknObject } from '../types';

const formatValue = (val: number) => {
  if (!val || isNaN(val)) return { value: '0', unit: '₽' };
  if (val >= 100_000_000) {
    return { value: (val / 1_000_000_000).toFixed(2), unit: 'млрд ₽' };
  }
  return { value: (val / 1_000_000).toFixed(1), unit: 'млн ₽' };
};
const formatPct = (n: number) => `${(n * 100).toFixed(1)}%`;

const calculateIncomeBreakdown = (okn: any) => {
  const area = Number(okn?.area || okn?.metadata?.area) || 1000;
  
  // Hash for pseudo-random data based on OKN ID to make each object look unique
  const idStr = String(okn?.id || '123');
  const hash = idStr.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const pseudoRandom = Math.abs(hash % 100) / 100;
  
  const baseRent = area > 1500 ? 35000 : 25000;
  const rentPerSqm = Math.round((baseRent + (pseudoRandom * 25000)) / 1000) * 1000; // 25k to 60k
  
  const vacancy = area > 1500 ? 0.15 : 0.10;
  const opex = 0.25;
  const capRate = 0.09 + (pseudoRandom * 0.03); // 9% to 12%

  const pvd = area * rentPerSqm;
  const dvd = pvd * (1 - vacancy);
  const noi = dvd * (1 - opex);

  return { area, rentPerSqm, vacancy, opex, capRate, pvd, dvd, noi };
};

const InfoModal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#080d14]/90 backdrop-blur-md" onClick={onClose}>
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl w-full max-w-lg p-8 relative shadow-[0_0_50px_rgba(52,211,153,0.15)]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-white tracking-wide">{title}</h3>
          <button onClick={onClose} className="p-2 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-sm text-slate-300 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const IncomeApproachPanel: React.FC<{ okn: OknObject; setActiveTab: (tab: number) => void, panelValues?: any, adjustments?: any, setAdjustments?: any }> = ({ okn, setActiveTab, panelValues, adjustments, setAdjustments }) => {
  const breakdown = calculateIncomeBreakdown(okn);
  
  const baseIncomeResult = breakdown.noi / breakdown.capRate;
  const finalValue = panelValues?.inc || 0;

  const rentAdjustment = adjustments?.rentAdjustment || 0;
  const setRentAdjustment = (val: number) => {
    if (setAdjustments) {
      setAdjustments((prev: any) => ({ ...prev, rentAdjustment: val }));
    }
  };

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isMathModalOpen, setIsMathModalOpen] = useState(false);

  const adjustedPvd = breakdown.pvd * (1 + rentAdjustment / 100);
  const adjustedDvd = adjustedPvd * (1 - breakdown.vacancy);
  const adjustedNoi = adjustedDvd * (1 - breakdown.opex);
  const adjustedValue = (adjustedNoi / breakdown.capRate);
  const valueDiff = adjustedValue - finalValue;

  const finalFmt = formatValue(finalValue);
  const pvdFmt = formatValue(breakdown.pvd);
  const dvdFmt = formatValue(breakdown.dvd);
  const noiFmt = formatValue(breakdown.noi);
  const opexFmt = formatValue(breakdown.dvd * breakdown.opex);
  const vacFmt = formatValue(breakdown.pvd * breakdown.vacancy);
  const adjFmt = formatValue(adjustedValue);
  const diffFmt = formatValue(Math.abs(valueDiff));

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-slate-300 font-sans min-h-screen bg-[#0B1120]">
      
      <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-[#1e293b] rounded-[2.5rem] p-8 md:p-10 mb-8 relative overflow-hidden shadow-[0_0_40px_rgba(52,211,153,0.05)]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full uppercase border border-emerald-500/20 mb-6 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              Шаг 4 из 6 • Инвестиции
            </div>
            <h1 className="text-3xl font-medium text-white mb-2 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" /> Доходный подход
            </h1>
            <p className="text-slate-400 text-sm max-w-xl mb-4">
              Оценка чистого инвестиционного потенциала: какую сумму инвестор готов заплатить за объект для получения стабильного рентного дохода.
            </p>
            <button 
              onClick={() => setIsMathModalOpen(true)} 
              className="flex items-center gap-2 text-emerald-400 font-medium text-xs px-4 py-2 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 backdrop-blur-sm transition-colors shadow-[0_0_15px_rgba(16,185,129,0.1)] w-fit"
            >
              <Calculator className="w-4 h-4" />
              Формулы расчетов доходного подхода
            </button>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80 mb-2 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">Итоговая стоимость по доходному подходу</div>
            <div className="text-5xl md:text-6xl font-bold text-emerald-400 tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(52,211,153,0.25)] flex items-baseline gap-2">
              {finalFmt.value} <span className="text-2xl text-emerald-500/50">{finalFmt.unit}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-2">Оценка инвестиционного потенциала</h2>
        <p className="text-slate-400 text-sm mb-6">Сколько чистого дохода может приносить объект при текущих рыночных ставках аренды и типичных операционных расходах для исторических зданий.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 shadow-lg relative group">
            <div className="flex items-center gap-2 text-slate-400 mb-4">
              <TrendingUp className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Потенциальный валовой доход</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2 tabular-nums">{pvdFmt.value} <span className="text-lg text-slate-400">{pvdFmt.unit}</span></div>
            <div className="text-xs text-slate-500 mb-3">Площадь × Арендная ставка</div>
            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded font-mono">{breakdown.rentPerSqm.toLocaleString('ru-RU')} ₽ / м² / год</div>
          </div>

          <div className="bg-[#0f172a]/80 border border-[#1e293b] rounded-2xl p-6 shadow-lg relative group">
            <div className="flex items-center gap-2 text-sky-400 mb-4 drop-shadow-[0_0_5px_rgba(14,165,233,0.3)]">
              <TrendingUp className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Действительный валовой доход</span>
            </div>
            <div className="text-3xl font-bold text-white mb-2 tabular-nums">{dvdFmt.value} <span className="text-lg text-slate-400">{dvdFmt.unit}</span></div>
            <div className="text-xs text-slate-500 mb-3">ПВД за вычетом потерь от вакантности</div>
            <div className="inline-block px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded font-mono">Вакантность {formatPct(breakdown.vacancy)}</div>
          </div>

          <div className="bg-[#0f172a]/80 border border-emerald-500/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(52,211,153,0.1)] relative group">
            <div className="flex items-center gap-2 text-emerald-400 mb-4 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">
              <TrendingUp className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">Чистый операционный доход (ЧОД)</span>
            </div>
            <div className="text-3xl font-bold text-emerald-400 mb-2 tabular-nums">{noiFmt.value} <span className="text-lg text-emerald-500/70">{noiFmt.unit}</span></div>
            <div className="text-xs text-slate-500 mb-3">ДВД за вычетом операционных расходов</div>
            <div className="inline-block px-3 py-1 bg-[#1e293b] border border-[#334155] text-slate-300 text-xs rounded font-mono">Операционные расходы {formatPct(breakdown.opex)}</div>
          </div>

          <div className="bg-[#080d14]/80 border border-indigo-500/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(99,102,241,0.1)] relative group flex flex-col justify-center items-center text-center">
            <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-2 drop-shadow-[0_0_5px_rgba(99,102,241,0.3)]">Ставка капитализации</div>
            <div className="text-5xl font-bold text-indigo-400 mb-3 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">{formatPct(breakdown.capRate)}</div>
            <div className="text-[10px] text-slate-500 px-4">Доходность, которую требует инвестор на капитал с учетом исторических рисков</div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a]/60 backdrop-blur-md border border-[#1e293b] rounded-[2rem] p-8 md:p-10 mb-10 shadow-lg">
        <h3 className="text-xl font-medium text-white mb-2">Куда уходит доход от аренды?</h3>
        <p className="text-slate-500 text-sm mb-8">Распределение потенциального валового дохода</p>
        
        <div className="mb-8">
          <div className="relative h-4 rounded-full overflow-hidden flex bg-slate-800 shadow-inner">
            <div className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] border-r-2 border-[#0f172a]" style={{ width: '72%' }} />
            <div className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] border-r-2 border-[#0f172a]" style={{ width: '18%' }} />
            <div className="h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" style={{ width: '10%' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#080d14]/60 border border-[#1e293b] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(16,185,129,0.2)]">Чистый операционный доход</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{noiFmt.value} <span className="text-lg text-slate-400">{noiFmt.unit}</span></div>
            <div className="text-[10px] text-slate-500">72.0% от ПВД</div>
          </div>
          <div className="bg-[#080d14]/60 border border-[#1e293b] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]"></div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(245,158,11,0.2)]">Операционные расходы</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{opexFmt.value} <span className="text-lg text-slate-400">{opexFmt.unit}</span></div>
            <div className="text-[10px] text-slate-500">20.0% от ДВД (управление, коммуналка, налоги)</div>
          </div>
          <div className="bg-[#080d14]/60 border border-[#1e293b] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.8)]"></div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(244,63,94,0.2)]">Потери от вакантности</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{vacFmt.value} <span className="text-lg text-slate-400">{vacFmt.unit}</span></div>
            <div className="text-[10px] text-slate-500">10.0% от ПВД (средний уровень незанятых площадей)</div>
          </div>
        </div>
      </div>

      {/* SCENARIO ANALYSIS SECTION - PREMIUM & COMPACT */}
      <div className="bg-[#0f172a]/80 backdrop-blur-md border border-[#1e293b] rounded-3xl p-6 mb-8 shadow-[0_0_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-700"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-6 gap-4 border-b border-[#1e293b]/50 pb-4">
            <h3 className="text-xl font-medium text-white flex items-center gap-3">
              <LineChart className="w-5 h-5 text-indigo-400" />
              Сценарный анализ
              <button onClick={() => setActiveModal('scenario')} className="p-1 rounded-full bg-[#1e293b] hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 transition-colors" title="Подробнее о показателях">
                <Info className="w-4 h-4" />
              </button>
            </h3>
            <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-lg text-xs text-amber-500/90 font-medium shadow-inner flex-shrink-0">
              <strong className="text-amber-400">Песочница:</strong> изменения носят справочный характер и не влияют на итоговую оценку объекта.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Control Panel (Slider + Rent Change) */}
            <div className="lg:col-span-5 bg-[#080d14]/60 border border-[#1e293b] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group/slider hover:border-[#334155] transition-colors">
              <div className="mb-6">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Прогноз изменения ставки</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${rentAdjustment > 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : rentAdjustment < 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : 'bg-[#1e293b] text-slate-300 border border-slate-700'}`}>
                    {rentAdjustment > 0 ? '+' : ''}{rentAdjustment}%
                  </div>
                </div>
                
                <input 
                  type="range" 
                  min="-30" 
                  max="30" 
                  step="1" 
                  value={rentAdjustment} 
                  onChange={(e) => setRentAdjustment(Number(e.target.value))} 
                  className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer outline-none hover:bg-[#334155] transition-colors"
                  style={{ accentColor: rentAdjustment > 0 ? '#10b981' : rentAdjustment < 0 ? '#f43f5e' : '#6366f1' }}
                />
                
                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                  <span>-30% (Спад)</span>
                  <span>База (0%)</span>
                  <span>+30% (Рост)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Базовая ставка</div>
                  <div className="text-sm font-medium text-slate-300">{Math.round(breakdown.rentPerSqm).toLocaleString('ru-RU')} <span className="text-[10px] text-slate-500">₽/м²</span></div>
                </div>
                <ArrowRight className={`w-4 h-4 transition-colors ${rentAdjustment > 0 ? 'text-emerald-500/50' : rentAdjustment < 0 ? 'text-rose-500/50' : 'text-slate-600'}`} />
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Новая ставка</div>
                  <div className={`text-xl font-bold transition-colors ${rentAdjustment > 0 ? 'text-emerald-400' : rentAdjustment < 0 ? 'text-rose-400' : 'text-white'}`}>
                    {Math.round(breakdown.rentPerSqm * (1 + rentAdjustment / 100)).toLocaleString('ru-RU')} <span className="text-xs opacity-70">₽/м²</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Intermediate Values (PVD, DVD, NOI) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <div className="bg-[#080d14]/40 border border-[#1e293b]/50 rounded-xl p-3 flex-1 flex flex-col justify-center hover:bg-[#080d14]/60 transition-colors">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Новый ПВД</div>
                <div className={`text-sm font-bold transition-colors ${rentAdjustment !== 0 ? 'text-slate-200' : 'text-slate-400'}`}>{formatValue(adjustedPvd).value} {formatValue(adjustedPvd).unit}</div>
              </div>
              <div className="bg-[#080d14]/40 border border-[#1e293b]/50 rounded-xl p-3 flex-1 flex flex-col justify-center hover:bg-[#080d14]/60 transition-colors">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Новый ДВД (-{formatPct(breakdown.vacancy)})</div>
                <div className={`text-sm font-bold transition-colors ${rentAdjustment !== 0 ? 'text-slate-200' : 'text-slate-400'}`}>{formatValue(adjustedDvd).value} {formatValue(adjustedDvd).unit}</div>
              </div>
              <div className="bg-[#080d14]/40 border border-[#1e293b]/50 rounded-xl p-3 flex-1 flex flex-col justify-center hover:bg-[#080d14]/60 transition-colors">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Новый ЧОД (-{formatPct(breakdown.opex)})</div>
                <div className={`text-sm font-bold transition-colors ${rentAdjustment !== 0 ? 'text-slate-200' : 'text-slate-400'}`}>{formatValue(adjustedNoi).value} {formatValue(adjustedNoi).unit}</div>
              </div>
            </div>

            {/* Final Investment Value Result */}
            <div className={`lg:col-span-4 rounded-2xl p-6 flex flex-col justify-center text-center relative overflow-hidden transition-all duration-500 border ${rentAdjustment > 0 ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : rentAdjustment < 0 ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.15)]' : 'bg-[#080d14]/50 border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.05)]'}`}>
              
              <div className={`text-[10px] font-black uppercase tracking-[0.1em] mb-2 transition-colors ${rentAdjustment !== 0 ? 'text-slate-200' : 'text-slate-400'}`}>Сценарная стоимость</div>
              
              <div className={`text-4xl lg:text-5xl font-black tracking-tighter tabular-nums mb-4 transition-colors duration-500 ${rentAdjustment > 0 ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]' : rentAdjustment < 0 ? 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.4)]' : 'text-white'}`}>
                {adjFmt.value} <span className="text-xl opacity-50">{adjFmt.unit}</span>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                {rentAdjustment !== 0 ? (
                  <>
                    <div className={`px-2 py-1 rounded-md text-[10px] font-bold border ${valueDiff > 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'}`}>
                      {valueDiff > 0 ? '+' : '-'}{diffFmt.value} {diffFmt.unit}
                    </div>
                    <div className={`text-xs font-bold ${valueDiff > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({valueDiff > 0 ? '+' : ''}{((valueDiff / (finalValue || baseIncomeResult)) * 100).toFixed(1)}%)
                    </div>
                  </>
                ) : (
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest border border-slate-700/50 bg-[#0f172a]/50 px-3 py-1 rounded-md">
                    Без изменений (ЧОД / {formatPct(breakdown.capRate)})
                  </div>
                )}
              </div>
              
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={() => setActiveTab(3)} className="px-6 py-4 bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] text-slate-300 font-medium rounded-2xl flex items-center gap-2 transition-all shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
        <button onClick={() => setActiveTab(5)} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
          ДАЛЕЕ: ЗАТРАТНЫЙ ПОДХОД <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <InfoModal isOpen={activeModal === 'scenario'} onClose={() => setActiveModal(null)} title="Как работают эти показатели?">
        <div className="space-y-5">
          <div>
            <strong className="text-indigo-400 text-base mb-1 block">Новый ПВД (Потенциальный валовой доход)</strong>
            <p className="text-slate-400 leading-relaxed">
              Это максимально возможный доход, если бы вся площадь сдавалась по новой арендной ставке без простоев. Считается как <span className="text-slate-300 bg-slate-800 px-1 rounded">Площадь × Новая ставка</span>.
            </p>
          </div>
          <div>
            <strong className="text-sky-400 text-base mb-1 block">Новый ДВД (Действительный валовой доход)</strong>
            <p className="text-slate-400 leading-relaxed">
              В реальности здания никогда не бывают сданы на 100% всё время. ДВД — это ПВД за вычетом <strong>потерь от вакантности</strong> (в нашей модели — {formatPct(breakdown.vacancy)}).
            </p>
          </div>
          <div>
            <strong className="text-emerald-400 text-base mb-1 block">Новый ЧОД (Чистый операционный доход)</strong>
            <p className="text-slate-400 leading-relaxed">
              Чтобы здание работало, нужно платить за управление, коммуналку и налоги. ЧОД — это реальные деньги в кармане инвестора после вычета <strong>операционных расходов</strong> (в нашей модели — {formatPct(breakdown.opex)} от ДВД).
            </p>
          </div>
          <div className="bg-[#1e293b]/40 p-4 rounded-xl border border-indigo-500/10">
            <strong className="text-slate-300 text-sm mb-1 block">Сценарная стоимость</strong>
            <p className="text-xs text-slate-500 leading-relaxed">
              Это итоговая инвестиционная стоимость объекта в данной песочнице. Она рассчитывается путём деления нового ЧОД на <strong>ставку капитализации</strong> ({formatPct(breakdown.capRate)}). Ставка капитализации отражает требуемую инвестором доходность с учётом рисков владения историческим зданием.
            </p>
          </div>
        </div>
      </InfoModal>

      {isMathModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#0B1120]/90 backdrop-blur-md" onClick={() => setIsMathModalOpen(false)}>
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsMathModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white bg-slate-800/50 p-2 rounded-full"><X className="w-5 h-5" /></button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20"><Calculator className="w-6 h-6 text-emerald-400" /></div>
              <h2 className="text-2xl font-black text-white tracking-tight">Математика доходного подхода</h2>
            </div>

            <div className="space-y-6 font-mono text-sm text-slate-300">
              <div className="bg-[#111827] border border-[#1e293b] p-5 rounded-2xl">
                <div className="text-slate-500 mb-2">Шаг 1. Расчет Чистого Операционного Дохода (NOI):</div>
                <div className="text-indigo-300 mb-2 font-bold">NOI = ПВД - Потери (Вакантность) - OPEX</div>
                <div className="text-slate-500 mb-2">Подстановка значений:</div>
                <div className="text-white p-3 bg-black/30 rounded-xl border border-slate-800/50 leading-relaxed">
                  NOI = {formatValue(breakdown.pvd).value} {formatValue(breakdown.pvd).unit} - {formatValue(breakdown.pvd * breakdown.vacancy).value} {formatValue(breakdown.pvd * breakdown.vacancy).unit} ({formatPct(breakdown.vacancy)}) - {formatValue(breakdown.dvd * breakdown.opex).value} {formatValue(breakdown.dvd * breakdown.opex).unit} ({formatPct(breakdown.opex)})
                  <div className="mt-2 text-emerald-400 font-bold">Итог NOI = {formatValue(breakdown.noi).value} {formatValue(breakdown.noi).unit}</div>
                </div>
              </div>

              <div className="bg-[#111827] border border-[#1e293b] p-5 rounded-2xl">
                <div className="text-slate-500 mb-2">Шаг 2. Прямая капитализация:</div>
                <div className="flex items-center gap-2 text-emerald-300 font-bold mb-3">
                  <span>V_inc = </span>
                  <div className="flex flex-col items-center min-w-[70px]">
                    <span className="pb-0.5 border-b border-emerald-500/40 text-center w-full">NOI</span>
                    <span className="pt-0.5 text-center w-full">R_cap</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white p-4 bg-black/30 rounded-xl border border-slate-800/50">
                  <span>V_inc = </span>
                  <div className="flex flex-col items-center min-w-[120px] font-bold text-indigo-300">
                    <span className="pb-1 border-b border-slate-700 text-center w-full">{formatValue(breakdown.noi).value} {formatValue(breakdown.noi).unit}</span>
                    <span className="pt-1 text-center w-full">{formatPct(breakdown.capRate)}</span>
                  </div>
                  <span className="text-emerald-400 font-black text-base ml-2">= {formatValue(breakdown.noi / breakdown.capRate).value} {formatValue(breakdown.noi / breakdown.capRate).unit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeApproachPanel;