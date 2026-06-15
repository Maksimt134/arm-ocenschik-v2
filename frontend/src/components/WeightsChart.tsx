import React, { useState } from 'react';
import { BarChart, Bar, Cell, Tooltip, ResponsiveContainer, LabelList, XAxis, YAxis, CartesianGrid } from 'recharts';
import { BookOpen } from 'lucide-react';
import { ValuationWeights } from '../types';

interface WeightsChartProps {
  weights: ValuationWeights;
}

// Премиальный тултип для весов
const CustomWeightsTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col gap-1">
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Подход к оценке</span>
        <span className="text-white font-bold text-lg">{data.name}</span>
        <div className="mt-2 flex items-center justify-between gap-8 border-t border-slate-800 pt-2">
          <span className="text-slate-300 text-sm">Итоговый вес:</span>
          <span className="font-mono text-xl font-black" style={{ color: data.color }}>{data.value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const WeightsChart: React.FC<WeightsChartProps> = ({ weights }) => {
  const [showMethodology, setShowMethodology] = useState(false);

  // Данные напрямую привязаны к пропсам
  const data = [
    { name: 'Сравнительный', value: Math.round(weights.comparative * 100), color: '#06b6d4', gradient: 'gradCyan' }, // cyan
    { name: 'Доходный', value: Math.round(weights.income * 100), color: '#10b981', gradient: 'gradEmerald' }, // emerald
    { name: 'Затратный', value: Math.round(weights.cost * 100), color: '#f59e0b', gradient: 'gradAmber' }, // amber
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Веса подходов</h3>
          <p className="text-sm text-slate-400 mt-1">Структура согласования стоимости</p>
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
            <div className="uppercase tracking-wider text-sky-400 font-semibold mb-1 text-[10px]">Рекомендация весов</div>
            <p className="text-slate-300 leading-tight">Автоподбор на основе объекта: больше аналогов — выше сравнительный; федеральный ОКН — выше затратный (дорогая реставрация); большая площадь — выше доходный.</p>
          </div>
          <div className="flex-1 min-w-0">
            <div className="uppercase tracking-wider text-sky-400 font-semibold mb-1 text-[10px]">Нормализация и ручная правка</div>
            <p className="text-slate-300 leading-tight">Веса всегда суммируются строго до 100%. Ползунки ниже позволяют вручную скорректировать — остальные автоматически пересчитываются пропорционально.</p>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-[300px] relative mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
          >
            <defs>
              {/* Градиенты для премиального вида баров */}
              <linearGradient id="gradCyan" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0891b2" /> {/* cyan-600 */}
                <stop offset="100%" stopColor="#22d3ee" /> {/* cyan-400 */}
              </linearGradient>
              <linearGradient id="gradEmerald" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#059669" /> {/* emerald-600 */}
                <stop offset="100%" stopColor="#34d399" /> {/* emerald-400 */}
              </linearGradient>
              <linearGradient id="gradAmber" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d97706" /> {/* amber-600 */}
                <stop offset="100%" stopColor="#fbbf24" /> {/* amber-400 */}
              </linearGradient>
            </defs>

            <CartesianGrid vertical={true} horizontal={false} stroke="rgba(255,255,255,0.05)" />

            <XAxis 
              type="number" 
              domain={[0, 100]} 
              ticks={[0, 25, 50, 75, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={110} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
            />
            <Tooltip 
              content={<CustomWeightsTooltip />} 
              cursor={{ fill: 'rgba(255,255,255,0.03)' }} 
            />
            
            <Bar 
              dataKey="value" 
              radius={[0, 6, 6, 0]} 
              barSize={40}
              background={{ fill: 'rgba(255,255,255,0.03)', radius: 6 }}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#${entry.gradient})`} />
              ))}
              
              {/* Значения процентов справа от баров */}
              <LabelList 
                dataKey="value" 
                position="right" 
                formatter={(val) => `${val}%`}
                fill="#fff" 
                offset={12}
                style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'monospace' }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeightsChart;