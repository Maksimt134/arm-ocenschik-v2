import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ValuationWeights } from '../types';

interface AnomalyWarningProps {
  comparative: number;
  income: number;
  cost: number;
  weights?: ValuationWeights;
}

const AnomalyWarning: React.FC<AnomalyWarningProps> = ({ comparative, income, cost, weights }) => {
  // Check if we have valid weights to analyze
  let isVisible = false;
  let maxWeightName = '';
  let minWeightName = '';
  let maxWeightVal = 0;
  let minWeightVal = 1;

  if (weights) {
    const approaches = [
      { name: 'Сравнительный', val: weights.comparative || 0, active: comparative > 0 },
      { name: 'Доходный', val: weights.income || 0, active: income > 0 },
      { name: 'Затратный', val: weights.cost || 0, active: cost > 0 },
    ];

    // Only consider active approaches (where value was calculated)
    const activeApproaches = approaches.filter(a => a.active);
    
    if (activeApproaches.length >= 2) {
      const sorted = [...activeApproaches].sort((a, b) => a.val - b.val);
      const minApp = sorted[0];
      const maxApp = sorted[sorted.length - 1];

      // Условие появления плашки: один вес >= 70% и другой <= 20%
      if (maxApp.val >= 0.70 && minApp.val <= 0.20) {
        isVisible = true;
        maxWeightName = maxApp.name;
        minWeightName = minApp.name;
        maxWeightVal = Math.round(maxApp.val * 100);
        minWeightVal = Math.round(minApp.val * 100);
      }
    }
  }

  return (
    <div 
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isVisible ? 'max-h-[300px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
      }`}
    >
      <div className="flex items-start gap-4 bg-gradient-to-r from-orange-500/10 to-orange-900/5 border border-orange-500/30 rounded-xl p-4 shadow-lg shadow-orange-500/5">
        <div className="bg-orange-500/20 p-2.5 rounded-lg border border-orange-500/30 flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-sm font-bold text-orange-500 mb-1 tracking-widest uppercase">
            Внимание: Дисбаланс весов
          </h3>
          <p className="text-orange-200/90 text-xs leading-relaxed font-medium">
            Обнаружен сильный перекос: <span className="text-orange-400 font-bold">{maxWeightName} подход ({maxWeightVal}%)</span> доминирует, 
            тогда как <span className="text-orange-400 font-bold">{minWeightName} ({minWeightVal}%)</span> практически исключен. 
            Это может привести к искажению итоговой рыночной стоимости. Убедитесь в обоснованности такого решения.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnomalyWarning;
