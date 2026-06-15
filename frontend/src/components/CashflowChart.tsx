import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { BookOpen } from 'lucide-react';
import { OknObject } from '../types';

interface CashflowChartProps {
  okn?: OknObject;
}

// Премиальный кастомный тултип для графика окупаемости
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <p className="text-white font-bold mb-3 border-b border-slate-800 pb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-6 mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-300 text-sm">{entry.name}</span>
            </div>
            <span className="text-white font-mono font-medium tracking-tight">
              {entry.value.toFixed(2)} млрд ₽
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CashflowChart: React.FC<CashflowChartProps> = ({ okn }) => {
  const [showMethodology, setShowMethodology] = useState(false);

  // Динамическая генерация реалистичных данных на основе объекта
  const { chartData, estimatedMarketValue } = useMemo(() => {
    const area = (okn?.area && okn.area > 0) ? okn.area : 1000;
    const baseNoi = (area * 120000 * (1 - 0.12) * (1 - 0.25)) / 1_000_000_000; // в млрд
    const estimatedMarketValue = baseNoi * 9.5;
    
    let currentBase = baseNoi;
    let currentOpt = baseNoi;
    let currentPess = baseNoi;
    
    const chartData = [];
    
    for (let i = 1; i <= 12; i++) {
      // Базовый: ровный рост, небольшая коррекция на 3 и 6 год
      const baseGrowth = (i === 3 || i === 6) ? 0.98 : 1.05;
      currentBase *= baseGrowth;
      
      // Оптимистичный: экспоненциальный разгон
      const optGrowth = 1.05 + (i * 0.015);
      currentOpt *= optGrowth;
      
      // Пессимистичный: стагнация и просадки на 2, 5, 8 год
      const pessGrowth = (i === 2 || i === 5 || i === 8) ? 0.95 : 1.02;
      currentPess *= pessGrowth;
      
      chartData.push({
        year: `${i} год`,
        base: currentBase,
        optimistic: currentOpt,
        pessimistic: currentPess,
      });
    }
    return { chartData, estimatedMarketValue };
  }, [okn]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">График окупаемости</h3>
          <p className="text-sm text-slate-400 mt-1">Накопленный ЧОД за 12 лет (динамический)</p>
        </div>
        
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-xl transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Логика расчета</span>
        </button>
      </div>

      {showMethodology && (
        <div className="absolute top-20 left-6 right-6 z-20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-row gap-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl text-xs">
          <div className="flex-1 min-w-0">
            <div className="uppercase tracking-wider text-sky-400 font-semibold mb-1 text-[10px]">Базовая модель</div>
            <p className="text-slate-300 leading-tight">ЧОД = площадь × ставка × (1 − вакантность) × (1 − опер. расходы). 12-летняя проекция накопленного дохода для доходного подхода.</p>
          </div>
          <div className="flex-1 min-w-0">
            <div className="uppercase tracking-wider text-sky-400 font-semibold mb-1 text-[10px]">Сценарии роста</div>
            <p className="text-slate-300 leading-tight">Базовый: стабильный +5% с корректировками на 3/6 год. Оптимистичный: экспоненциальный разгон. Пессимистичный: просадки в 2,5,8 год.</p>
          </div>
          <div className="flex-1 min-w-0">
            <div className="uppercase tracking-wider text-sky-400 font-semibold mb-1 text-[10px]">Применение</div>
            <p className="text-slate-300 leading-tight">Используется в доходном подходе при итоговом согласовании. Прямой метод капитализации без дисконтирования.</p>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-[300px] relative mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid vertical={false} stroke="#334155" strokeDasharray="4 4" />

            <defs>
              {/* Полупрозрачные градиентные заливки, уходящие в фон */}
              <linearGradient id="fillOpt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#0ea5e9" stopOpacity={1} />
                <stop offset="90%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="90%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickMargin={10} />
            <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val} млрд`} domain={[0, 'auto']} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '5 5' }} />

            <ReferenceLine
              y={estimatedMarketValue}
              stroke="#a78bfa"
              strokeDasharray="3 4"
              strokeWidth={2}
              label={{ position: 'top', value: 'Рыночная стоимость', fill: '#a78bfa', fontSize: 12, fontWeight: 500 }}
            />

            {/* Оптимистичный + градиент */}
            <Area
              type="monotone"
              dataKey="optimistic"
              name="Оптимистичный прогноз"
              stroke="#0ea5e9"
              strokeWidth={2.5}
              fill="url(#fillOpt)"
              fillOpacity={0.3}
              dot={false}
              activeDot={{ r: 5, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }}
            />
            {/* Базовый + градиент */}
            <Area
              type="monotone"
              dataKey="base"
              name="Базовый прогноз"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#fillBase)"
              fillOpacity={0.3}
              dot={false}
              activeDot={{ r: 5, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            />
            {/* Пессимистичный — только пунктирная линия (без заливки) */}
            <Area
              type="monotone"
              dataKey="pessimistic"
              name="Пессимистичный прогноз"
              stroke="#f97316"
              strokeWidth={2}
              fill="none"
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 5, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span className="text-sm text-emerald-400 font-medium">Базовый прогноз</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
          <span className="text-sm text-sky-400 font-medium">Оптимистичный прогноз</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
          <span className="text-sm text-orange-400 font-medium">Пессимистичный прогноз</span>
        </div>
      </div>
    </div>
  );
};

export default CashflowChart;