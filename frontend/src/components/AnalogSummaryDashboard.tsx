import React from 'react';

interface AnalogSummaryDashboardProps {
  selectedCount: number;
  avgBasePrice: number;
  avgAdjustedPrice: number;
}

const AnalogSummaryDashboard: React.FC<AnalogSummaryDashboardProps> = ({
  selectedCount,
  avgBasePrice,
  avgAdjustedPrice,
}) => {
  const safeCount = Number.isFinite(selectedCount) ? Math.max(0, Math.floor(selectedCount)) : 0;
  const safeBase = Number.isFinite(avgBasePrice) ? avgBasePrice : 0;
  const safeAdj = Number.isFinite(avgAdjustedPrice) ? avgAdjustedPrice : 0;

  const baseBln = safeBase / 1_000_000_000;
  const adjBln = safeAdj / 1_000_000_000;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg mt-6">
      <div className="text-slate-300 text-lg font-semibold tracking-tight">
        Сводная аналитика по выборке
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Колонка 1: Выбрано аналогов */}
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-cyan-400">
            Выбрано аналогов
          </div>
          <div className="mt-1.5 text-3xl font-black text-cyan-400 font-mono tabular-nums tracking-[-1.5px]">
            {safeCount}
          </div>
        </div>

        {/* Колонка 2: Средняя базовая цена */}
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-slate-400">
            Средняя базовая цена
          </div>
          <div className="mt-1.5 text-3xl font-black text-white font-mono tabular-nums tracking-[-1.5px]">
            {baseBln.toFixed(2)}
          </div>
          <div className="text-[10px] font-medium text-slate-400 mt-0.5">млрд ₽</div>
        </div>

        {/* Колонка 3: Средняя СКОРР. цена */}
        <div className="text-center">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-400">
            Средняя СКОРР. цена
          </div>
          <div className="mt-1.5 text-3xl font-black text-emerald-400 font-mono tabular-nums tracking-[-1.5px]">
            {adjBln.toFixed(2)}
          </div>
          <div className="text-[10px] font-medium text-emerald-400/70 mt-0.5">млрд ₽</div>
        </div>
      </div>
    </div>
  );
};

export default AnalogSummaryDashboard;
