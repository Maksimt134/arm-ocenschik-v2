import React, { useMemo } from 'react';
import { BarChart3, Banknote, Hammer } from 'lucide-react';
import { OknObject, Analogue, ValuationWeights } from '../types';
import { calculateKKH, calculateComparativeValue, calculateIncomeValue, calculateCostValue } from '../utils/calc';

interface ValuationIntroBlockProps {
  okn: OknObject;
  analogues?: Analogue[];
  adjustments?: Record<string, any>;
  selectedAnalogId?: string;
  weights?: ValuationWeights;
}

const ValuationIntroBlock: React.FC<ValuationIntroBlockProps> = ({
  okn,
  analogues = [],
  adjustments = {},
  selectedAnalogId = '',
  weights,
}) => {
  const kkhParams = {
    historical_weight: okn?.kkh_params?.historical_weight || 1.0,
    architectural_rarity: okn?.kkh_params?.architectural_rarity || 1.0,
    public_awareness: okn?.kkh_params?.public_awareness || 1.0,
    constraint_points: okn?.kkh_params?.constraint_points || 1.0,
  };

  const kkhMultiplier = useMemo(() => {
    const res = calculateKKH(kkhParams);
    const num = res && typeof res === 'object' && 'kkh' in res ? res.kkh : (typeof res === 'number' ? res : 1.15);
    return isNaN(Number(num)) ? 1.15 : Number(num);
  }, [okn]);

  const comparativeValue = useMemo(
    () => calculateComparativeValue(okn, analogues, adjustments, selectedAnalogId),
    [okn, analogues, adjustments, selectedAnalogId]
  );

  const incomeValue = useMemo(
    () => calculateIncomeValue(okn),
    [okn]
  );

  const costValue = useMemo(
    () => calculateCostValue(okn),
    [okn]
  );

  const effectiveWeights = weights || { comparative: 0.5, income: 0.3, cost: 0.2 };

  const rawMarketValue = useMemo(() => {
    return Math.round(
      (comparativeValue * effectiveWeights.comparative) +
      (incomeValue * effectiveWeights.income) +
      (costValue * effectiveWeights.cost)
    );
  }, [comparativeValue, incomeValue, costValue, effectiveWeights]);

  const finalPreview = Math.round(rawMarketValue * kkhMultiplier);

  const formatBln = (val: number): string => {
    if (!val || isNaN(val)) return '—';
    return (val / 1_000_000_000).toFixed(2) + ' млрд ₽';
  };

  const cards = [
    {
      label: 'Сравнительный подход',
      sub: 'Рынок',
      text: 'Анализируем текущий рынок. За сколько прямо сейчас продаются похожие исторические здания в Москве?',
      icon: BarChart3,
      accent: 'cyan' as const,
      value: comparativeValue,
    },
    {
      label: 'Доходный подход',
      sub: 'Инвестиции',
      text: 'Считаем потенциал. Сколько чистой прибыли сможет приносить это здание каждый год при грамотной сдаче в аренду?',
      icon: Banknote,
      accent: 'emerald' as const,
      value: incomeValue,
    },
    {
      label: 'Затратный подход',
      sub: 'Строительство',
      text: 'Оцениваем материалы. Сколько бы стоило с нуля возвести точную копию этого здания с учетом износа?',
      icon: Hammer,
      accent: 'orange' as const,
      value: costValue,
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1 rounded-full border border-slate-700/60 bg-slate-900/50 text-[10px] font-bold tracking-[2px] text-slate-400">
          МЕТОДОЛОГИЯ ОЦЕНКИ
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-1.2px] text-white">
          Как формируется стоимость исторического здания?
        </h2>
        <p className="mt-3 text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Для максимально точной оценки мы смотрим на объект с трех сторон, исключая любые случайности.
        </p>
      </div>

      {/* Three approach cards — glassmorphism + neon hover */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isCyan = card.accent === 'cyan';
          const isEmerald = card.accent === 'emerald';
          const isOrange = card.accent === 'orange';

          const borderHover = isCyan
            ? 'hover:border-cyan-400/60 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]'
            : isEmerald
            ? 'hover:border-emerald-400/60 hover:shadow-[0_0_24px_rgba(16,185,129,0.12)]'
            : 'hover:border-orange-500/60 hover:shadow-[0_0_24px_rgba(249,115,22,0.12)]';

          const iconBg = isCyan
            ? 'bg-cyan-500/10'
            : isEmerald
            ? 'bg-emerald-500/10'
            : 'bg-orange-500/10';

          const iconColor = isCyan
            ? 'text-cyan-400'
            : isEmerald
            ? 'text-emerald-400'
            : 'text-orange-500';

          const valueColor = isCyan
            ? 'text-cyan-400'
            : isEmerald
            ? 'text-emerald-400'
            : 'text-orange-500';

          return (
            <div
              key={idx}
              className={`group relative flex flex-col rounded-3xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl p-6 transition-all duration-300 ${borderHover}`}
            >
              {/* Geometric top accent line */}
              <div
                className={`absolute top-0 left-6 right-6 h-px ${isCyan ? 'bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent' : isEmerald ? 'bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent' : 'bg-gradient-to-r from-transparent via-orange-500/60 to-transparent'}`}
              />

              {/* Icon header (numbers 01/02/03 removed per requirements; nothing else in card design changed) */}
              <div className="flex items-start mb-5">
                <div className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center ring-1 ring-inset ring-white/5`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
              </div>

              {/* Titles */}
              <div className="mb-3">
                <div className={`text-[10px] font-extrabold tracking-[1.5px] uppercase ${isCyan ? 'text-cyan-400/80' : isEmerald ? 'text-emerald-400/80' : 'text-orange-500/80'}`}>
                  {card.label}
                </div>
                <div className="text-xl font-bold text-white tracking-[-0.3px] mt-0.5">
                  {card.sub}
                </div>
              </div>

              {/* Human explanation text — exact per spec */}
              <p className="text-[13.5px] leading-snug text-slate-300/90 flex-1">
                {card.text}
              </p>

              {/* Live real calc value — 100% dynamic from calculate* funcs in calc.ts for okn (text stub label removed) */}
              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-baseline justify-end">
                <div className={`font-mono text-sm font-bold tabular-nums ${valueColor}`}>
                  {formatBln(card.value)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emerald glowing итог — mathematical balance on real calcs */}
      <div className="mt-6 relative rounded-3xl border border-emerald-500/30 bg-emerald-950/15 backdrop-blur-xl p-6 md:p-7 shadow-[0_0_32px_rgba(16,185,129,0.1)] overflow-hidden">
        {/* subtle geometric glow accents */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-emerald-400">
              <div className="h-px w-6 bg-emerald-400/60" />
              <span className="text-[10px] font-extrabold tracking-[2.5px] uppercase">Согласование</span>
              <div className="h-px w-6 bg-emerald-400/60" />
            </div>

            <div className="mt-2 text-2xl md:text-3xl font-black text-white tracking-[-0.8px]">
              Итоговая стоимость
            </div>
            <div className="mt-1 text-emerald-300/90 text-[13.5px] leading-snug max-w-2xl">
              Это математический баланс этих трех подходов на основе реальных аналитических расчетов объекта.
            </div>
          </div>

          {/* Live итог value — computed from real three approaches + KKH */}
          <div className="md:text-right shrink-0">
            <div className="text-[10px] font-bold tracking-[1.5px] text-emerald-400/70">ПРЕДВАРИТЕЛЬНАЯ ОЦЕНКА</div>
            <div className="font-mono text-4xl md:text-5xl font-black text-emerald-400 tabular-nums tracking-[-2px] mt-0.5" style={{ textShadow: '0 0 20px rgba(16,185,129,0.35)' }}>
              {formatBln(finalPreview)}
            </div>
            <div className="text-emerald-400/50 text-xs font-medium mt-0.5">с учётом ККН</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationIntroBlock;
