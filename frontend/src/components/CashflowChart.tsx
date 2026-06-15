import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { OknObject } from '../types';

interface CashflowChartProps { okn?: OknObject; }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <p className="text-white font-bold mb-3 border-b border-slate-800 pb-2">{label} год</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-6 mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-300 text-sm">{entry.name}</span>
            </div>
            <span className="text-white font-mono font-medium tracking-tight">{entry.value.toFixed(2)} млрд ₽</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CashflowChart: React.FC<CashflowChartProps> = ({ okn }) => {
  const data = useMemo(() => {
    // Генерация уникальных, но стабильных данных на основе ID объекта
    const idHash = String(okn?.id || 'default').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseVal = 1.2 + (idHash % 10) * 0.15; 
    
    return Array.from({ length: 10 }).map((_, i) => {
      const year = 2025 + i;
      const trend = 1 + (i * 0.04); // Базовый рост 4% в год
      const noise = 1 + (Math.sin(idHash + i) * 0.06); // Шум ±6% для реалистичности "зубцов"
      const base = baseVal * trend * noise;
      return {
        year: String(year),
        base: Number(base.toFixed(2)),
        optimistic: Number((base * 1.25).toFixed(2)),
        pessimistic: Number((base * 0.85).toFixed(2)),
      };
    });
  }, [okn?.id]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="year" stroke="#475569" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="optimistic" name="Оптимистичный прогноз" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorOpt)" />
            <Area type="monotone" dataKey="base" name="Базовый прогноз" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBase)" />
            <Area type="monotone" dataKey="pessimistic" name="Пессимистичный прогноз" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default CashflowChart;