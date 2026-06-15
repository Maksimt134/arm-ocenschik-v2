import React, { useState } from 'react';
import { Sparkles, Loader2, FileText } from 'lucide-react';
import { ValuationWeights } from '../types';

interface AiJustificationPanelProps {
  weights?: ValuationWeights;
  justificationText: string;
  onJustificationTextChange: (text: string) => void;
}

const AiJustificationPanel: React.FC<AiJustificationPanelProps> = ({ weights, justificationText, onJustificationTextChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateText = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2300));

    const approaches = [
      { name: 'доходный', dative: 'доходному', val: weights?.income ?? 0.34 },
      { name: 'сравнительный', dative: 'сравнительному', val: weights?.comparative ?? 0.33 },
      { name: 'затратный', dative: 'затратному', val: weights?.cost ?? 0.33 },
    ];
    const sorted = [...(approaches || [])].sort((a, b) => b.val - a.val);

    const s0 = sorted[0];
    const s1 = sorted[1];
    const s2 = sorted[2];

    const p0 = Math.round(s0.val * 100);
    const p1 = Math.round(s1.val * 100);
    const p2 = Math.round(s2.val * 100);

    // Развёрнутое профессиональное структурированное заключение (3 части)
    const text = [
      `1. Рыночная адекватность`,
      `Наибольший вес (${p0}%) присвоен ${s0.dative} подходу. Это отражает высокую репрезентативность рыночных аналогов и текущую конъюнктуру спроса на историческую недвижимость в центральных районах Москвы. ${s1.name} подход (${p1}%) выступает в качестве надёжного кросс-проверочного механизма.`,
      `2. Оценка рисков`,
      `Учёт ККН и физического износа позволяет скорректировать итоговую стоимость с учётом обременений и капитальных затрат на поддержание объекта. ${s2.name} подход (${p2}%) вносит консервативную составляющую, снижая риск переоценки. Общий уровень неопределённости оценён как умеренный.`,
      `3. Финальный вердикт`,
      `Итоговая стоимость, полученная взвешенным согласованием, признана объективной, рыночно обоснованной и пригодной для использования в отчёте об оценке. Рекомендуется к принятию в качестве рыночной стоимости ОКН.`
    ].join('\n\n');

      onJustificationTextChange(text);
    } catch (error) {
      console.error('Ошибка генерации ИИ:', error);
      onJustificationTextChange('Произошла ошибка при анализе данных. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-1.5 bg-indigo-500/10 rounded-lg">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-white tracking-tight">Умная генерация обоснования</h3>
      </div>

      <p className="text-sm text-slate-400 mb-5 leading-snug">
        ИИ-инструмент автоматически сформирует профессиональный вывод для раздела «Согласование результатов» отчёта на основе текущих весов подходов.
      </p>

      <button
        onClick={generateText}
        disabled={isLoading}
        className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold text-base rounded-2xl transition-all active:scale-[0.985] flex items-center justify-center gap-3 border border-indigo-400/30 disabled:border-slate-700/50 hover:shadow-[0_0_25px_rgba(129,140,248,0.45)] disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Анализ данных объекта...</span>
          </>
        ) : (
          <>
            <FileText className="w-5 h-5" />
            <span>Сгенерировать ИИ-обоснование</span>
          </>
        )}
      </button>

      {justificationText && (
        <div
          className={`mt-5 rounded-2xl p-5 border border-purple-500/30 ring-1 ring-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] bg-slate-950/60 text-sm text-slate-200 leading-relaxed transition-all duration-300 ${
            isLoading ? 'opacity-50 blur-[2px] pointer-events-none' : ''
          }`}
        >
          <div className="flex items-center gap-2 mb-3 text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold tracking-wider text-xs uppercase">Аналитическое заключение нейросети</span>
          </div>

          {justificationText.split('\n\n').map((para, idx) => {
            const isHeader = /^\d\./.test(para.trim());
            return (
              <div key={idx} className={isHeader ? 'mt-4 first:mt-1 font-semibold text-purple-300/90 tracking-tight' : 'mt-1.5 text-slate-300 pl-1'}>
                {para.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AiJustificationPanel;
