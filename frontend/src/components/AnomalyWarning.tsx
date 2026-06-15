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
  const approaches = [
    { name: 'Сравнительный', val: comparative },
    { name: 'Доходный', val: income },
    { name: 'Затратный', val: cost },
  ];

  const valid = (approaches || []).filter((a) => a.val > 0);
  if (valid.length < 2) {
    return null;
  }

  const sortedValid = [...valid].sort((a, b) => a.val - b.val);
  const minApp = sortedValid[0];
  const maxApp = sortedValid[sortedValid.length - 1];

  const diffRatio = (maxApp.val - minApp.val) / maxApp.val;
  if (diffRatio <= 0.40) {
    return null;
  }

  if (weights) {
    const wMap: Record<string, number> = {
      'Сравнительный': weights.comparative || 0,
      'Доходный': weights.income || 0,
      'Затратный': weights.cost || 0,
    };
    const wMin = wMap[minApp.name] || 0;
    const wMax = wMap[maxApp.name] || 0;
    if (wMin < 0.15 || wMax < 0.15) {
      return null;
    }
  }

  let recText = 'Рекомендуется перепроверить исходные данные, параметры капитализации или скорректировать итоговые веса.';
  const maxN = maxApp.name;
  const minN = minApp.name;

  if (maxN === 'Доходный' && minN === 'Затратный') {
    recText = 'Доходный подход значительно выше затратного — проверьте ставку капитализации, вакантность и операционные расходы.';
  } else if (maxN === 'Сравнительный' && minN === 'Доходный') {
    recText = 'Сравнительный подход значительно выше доходного — проверьте релевантность аналогов или параметры доходного подхода (NOI, кап. ставка).';
  } else if (minN === 'Доходный') {
    recText = 'Доходный подход существенно ниже остальных — рекомендуется увеличить его вес только после проверки параметров капитализации.';
  } else if (minN === 'Затратный') {
    recText = 'Затратный подход существенно ниже — проверьте расчёт восстановительной стоимости, износа и стоимости земли.';
  } else if (maxN === 'Затратный') {
    recText = 'Затратный подход значительно выше — возможно, завышена стоимость строительства или занижен износ.';
  }

  return (
    <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 animate-fade-in shadow-lg shadow-amber-500/5">
      <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <div className="text-amber-500 font-semibold text-sm">Обнаружено значительное расхождение подходов</div>
        <div className="text-slate-300 text-xs mt-1 leading-relaxed">
          {`Разрыв между самым дорогим (${maxApp.name.toLowerCase()}) и самым дешевым (${minApp.name.toLowerCase()}) подходами превышает 40%. ${recText}`}
        </div>
      </div>
    </div>
  );
};

export default AnomalyWarning;
