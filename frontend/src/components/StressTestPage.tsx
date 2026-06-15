import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ChevronDown, RefreshCw, RefreshCcw, TrendingUp, AlertTriangle, TrendingDown, Building2, Sparkles, Percent } from 'lucide-react';
import { ALL_OBJECTS } from '../data/allObjects';
import { calculateComparativeValue, calculateIncomeValue, calculateCostValue, getRecommendedWeights } from '../utils/calc';

interface Scenario {
  id: string;
  label: string;
  rent: number;
  vacancy: number;
  cost: number;
  opex: number;
  cap: number;
  prob: string;
  context: string;
  tone: 'rose' | 'amber' | 'sky' | 'emerald';
}

const StressTestPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(ALL_OBJECTS[0]?.id || '');
  const [rentShock, setRentShock] = useState<number>(0);
  const [restoreCostShock, setRestoreCostShock] = useState<number>(0);
  const [capRateShock, setCapRateShock] = useState<number>(0);
  const [vacancyRate, setVacancyRate] = useState<number>(0);
  const [opexShock, setOpexShock] = useState<number>(0);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [scenarioPage, setScenarioPage] = useState(0);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiForecastText, setAiForecastText] = useState<string | null>(null);
  const aiGenerationRef = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    aiGenerationRef.current += 1;
    setAiForecastText(null);
    setIsGeneratingAI(false);
  }, [selectedId, rentShock, restoreCostShock, capRateShock, vacancyRate, opexShock]);

  const selectedOkn = useMemo(() => {
    return ALL_OBJECTS.find((o) => o.id === selectedId) || ALL_OBJECTS[0];
  }, [selectedId]);

  const getArea = useCallback((o: any): number => {
    if (o && typeof o.area === 'number' && o.area > 0) return o.area;
    if (o?.metadata && typeof o.metadata.area === 'number' && o.metadata.area > 0) return o.metadata.area;
    const parsed = parseFloat(String(o?.metadata?.area || ''));
    return isNaN(parsed) || parsed <= 0 ? 1000 : parsed;
  }, []);

  const getWear = useCallback((o: any): number => {
    if (o && typeof o.wear_pct === 'number' && !isNaN(o.wear_pct)) return o.wear_pct;
    if (o?.metadata && typeof o.metadata.wear_pct === 'number' && !isNaN(o.metadata.wear_pct)) return o.metadata.wear_pct;
    const parsed = parseFloat(String(o?.metadata?.wear_pct || ''));
    return isNaN(parsed) ? 25 : parsed;
  }, []);

  const getCategory = useCallback((o: any): string => {
    return o?.okn_category || o?.significance || o?.metadata?.significance || '';
  }, []);

  const formatCurrency = (value: number): string => {
    let val = value;
    if (Math.abs(val) > 10000) val = val / 1_000_000_000;
    const absVal = Math.abs(val);
    const sign = val < 0 ? '-' : '';
    if (absVal > 0 && absVal < 1) {
      const millions = absVal * 1000;
      const rounded = Math.round(millions * 10) / 10;
      const str = Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1);
      return `${sign}${str} млн ₽`;
    }
    return `${sign}${absVal.toFixed(3)} млрд ₽`;
  };

  const getCurrencyParts = (value: number): { num: string; unit: string } => {
    const full = formatCurrency(value);
    const idx = full.lastIndexOf(' ');
    if (idx === -1) return { num: full, unit: '' };
    return { num: full.slice(0, idx), unit: full.slice(idx + 1) };
  };

  const scenarios: Scenario[] = [
    { id: 'crisis2008', label: 'Кризис ликвидности 2008', rent: -35, vacancy: 30, cost: 15, opex: 20, cap: 2.5, prob: 'Вероятность повторения: 15% в ближайшие 5 лет.', context: 'Ставки аренды рухнули, вакантность подскочила, реставрации замораживались из-за отсутствия денег и ликвидности.', tone: 'rose' },
    { id: 'pandemic', label: 'Пандемия и локдаун', rent: -45, vacancy: 40, cost: 10, opex: 15, cap: 1.5, prob: 'Вероятность: 8–12% в горизонте 10 лет.', context: 'Локдауны вызвали массовый отток арендаторов, взрыв вакантности и перебои с материалами и рабочими.', tone: 'amber' },
    { id: 'gentrification', label: 'Джентрификация района', rent: 30, vacancy: 0, cost: 20, opex: 5, cap: -1.0, prob: 'Вероятность: 22% в ближайшие 3 года.', context: 'Благоустройство и приток качественных арендаторов резко повышает доходность исторических объектов.', tone: 'emerald' },
    { id: 'globalwar', label: 'Глобальный военный конфликт', rent: -70, vacancy: 60, cost: 200, opex: 100, cap: 8.0, prob: 'Вероятность низкая, но последствия катастрофические.', context: 'Полный паралич рыночной экономики и разрыв всех цепочек поставок.', tone: 'rose' },
    { id: 'hyperinflation', label: 'Тотальный дефолт и гиперинфляция', rent: -50, vacancy: 45, cost: 300, opex: 250, cap: 10.0, prob: 'Крайне редкое, но разрушительное событие.', context: 'Гиперинфляция обесценивает все активы, сметы на реставрацию взлетают в разы.', tone: 'rose' },
    { id: 'catastrophe', label: 'Техногенная катастрофа в ЦАО', rent: -80, vacancy: 80, cost: 150, opex: 50, cap: 5.0, prob: 'Локальное событие с глобальными последствиями для рынка.', context: 'Катастрофа в центре парализует весь сегмент исторической недвижимости.', tone: 'rose' },
    { id: 'tourism', label: 'Бум внутреннего туризма', rent: 40, vacancy: 0, cost: 10, opex: 15, cap: -1.5, prob: 'Вероятность: 22% в ближайшие 3 года.', context: 'Приток туристов и платежеспособных арендаторов резко повышает доходность и капитализацию.', tone: 'emerald' },
    { id: 'kgiop', label: 'Внезапная проверка КГИОП', rent: 0, vacancy: 10, cost: 100, opex: 40, cap: 0.5, prob: 'Вероятность: Высокая (40%).', context: 'Ужесточение охранных обязательств приводит к взрывному росту смет и операционных расходов.', tone: 'amber' },
    { id: 'hollywood-blockbuster', label: 'Съемки голливудского блокбастера', rent: 45, vacancy: -30, cost: 15, opex: 10, cap: -0.5, prob: 'Вероятность: низкая, но очень прибыльный кейс.', context: 'Здание арендовано под съемки исторического фильма на год. Арендная ставка летит в космос, но износ здания немного увеличивается из-за пиротехники.', tone: 'emerald' },
    { id: 'poltergeist-invasion', label: 'Нашествие полтергейста', rent: -40, vacancy: 80, cost: 25, opex: 30, cap: 3.0, prob: 'Вероятность: крайне низкая (но в старых зданиях кто знает).', context: 'Арендаторы в панике бегут из здания из-за паранормальной активности. Вакантность достигает критических значений, требуются затраты на экзорциста.', tone: 'rose' },
    { id: 'imperial-treasure', label: 'Клад Российской Империи', rent: 100, vacancy: -80, cost: 0, opex: -10, cap: -2.5, prob: 'Вероятность: сказочная.', context: 'При реставрации в подвале найдены сундуки с золотом. Здание мгновенно становится сверхпопулярным объектом, риски инвестирования падают до нуля.', tone: 'emerald' },
  ];

  const currentScenario = useMemo(() => scenarios.find((s) => s.id === activeScenarioId) || null, [activeScenarioId, scenarios]);

  const applyScenario = useCallback((sc: Scenario) => {
    const duration = 620;
    const steps = 13;
    const stepMs = duration / steps;
    const fromRent = rentShock, fromCost = restoreCostShock, fromCap = capRateShock, fromVac = vacancyRate, fromOpex = opexShock;
    let step = 0;
    const iv = setInterval(() => {
      step += 1;
      const t = Math.min(1, step / steps);
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setRentShock(Math.round(fromRent + (sc.rent - fromRent) * e));
      setRestoreCostShock(Math.round(fromCost + (sc.cost - fromCost) * e));
      setCapRateShock(parseFloat((fromCap + (sc.cap - fromCap) * e).toFixed(1)));
      setVacancyRate(Math.max(0, Math.min(50, Math.round(fromVac + (sc.vacancy - fromVac) * e))));
      setOpexShock(Math.max(0, Math.min(300, Math.round(fromOpex + (sc.opex - fromOpex) * e))));
      if (step >= steps) {
        clearInterval(iv);
        setRentShock(sc.rent); setRestoreCostShock(sc.cost); setCapRateShock(sc.cap); setVacancyRate(Math.max(0, Math.min(50, sc.vacancy))); setOpexShock(Math.max(0, Math.min(300, sc.opex)));
        setActiveScenarioId(sc.id);
        aiGenerationRef.current += 1;
        setAiForecastText(null); setIsGeneratingAI(false);
      }
    }, stepMs);
  }, [rentShock, restoreCostShock, capRateShock, vacancyRate, opexShock]);

  const resetAll = useCallback(() => {
    setRentShock(0); setRestoreCostShock(0); setCapRateShock(0); setVacancyRate(0); setOpexShock(0);
    setActiveScenarioId(null); setScenarioPage(0); setAiForecastText(null); setIsGeneratingAI(false);
    aiGenerationRef.current += 1;
  }, []);

  const generateAIForecast = () => {
    if (!selectedOkn) return;
    setIsGeneratingAI(true);
    setTimeout(() => {
      const wear = getWear(selectedOkn);
      const category = getCategory(selectedOkn);
      const isFederal = category.toLowerCase().includes('федеральн');
      const amount = formatCurrency(Math.abs(deltaVal));
      const intro = `Анализ объекта: ${selectedOkn.name}.`;
      let wearText = wear > 40 ? `Критический износ конструкций (${wear}%) делает здание ветхим и резко повышает риски при любом шоке. ` : wear > 20 ? `Физический износ на уровне ${wear}% требует дополнительных резервов на поддержание. ` : `При относительно хорошем состоянии (износ ${wear}%) `;
      let statusText = isFederal ? 'Федеральный статус памятника накладывает строгие ограничения и грозит крупными штрафами КГИОП при нарушении охранных обязательств. ' : 'Охранный статус ОКН существенно ограничивает возможности по оптимизации расходов и сроков работ. ';
      let mainBody = '';
      if (isLoss) {
        mainBody = incomeLossPct > costLossPct 
          ? `Сценарий наносит основной удар по доходной части. ${wearText}Отток арендаторов и рост вакантности превращают объект в убыточный. Без снижения ставок привлечь новых жильцов и ритейлеров практически невозможно. Расчётные потери достигают ${amount}.`
          : `Главный риск — в резком росте затрат. ${statusText}${wearText}Удорожание материалов, работ и OPEX съедает маржу. Срыв сроков или необходимость дорогих решений по реставрации приведёт к потере ${amount}.`;
      } else {
        mainBody = `Позитивный сценарий генерирует сверхприбыль. ${wearText}Прирост капитализации составит ${formatCurrency(deltaVal)}. Снижение давления на рынок или приток новой аудитории позволит существенно увеличить NOI и переоценить объект в плюс.`;
      }
      const conclusion = isLoss ? 'Резюме: Рекомендуется срочно сформировать резервный фонд, пересмотреть арендную политику и подготовить антикризисный план монетизации.' : 'Резюме: Благоприятный момент для фиксации прибыли, рефинансирования или расширения портфеля подобных активов.';
      setAiForecastText(`${intro}\n\n${mainBody}\n\n${conclusion}`);
      setIsGeneratingAI(false);
    }, 2000);
  };

  const handleSelectChange = (id: string) => {
    setSelectedId(id); resetAll(); setDropdownOpen(false);
  };

  const baseValues = useMemo(() => {
    const norm = { ...selectedOkn, area: getArea(selectedOkn), wear_pct: getWear(selectedOkn), okn_category: getCategory(selectedOkn) };
    const comp = calculateComparativeValue(norm, [], {}, '');
    const inc = calculateIncomeValue(norm);
    const cst = calculateCostValue(norm);
    const w = getRecommendedWeights(norm, []);
    const baseTotal = Math.round(comp * w.comparative + inc * w.income + cst * w.cost);
    return { comp, inc, cst, weights: w, baseTotal, income: inc, cost: cst };
  }, [selectedOkn, getArea, getWear, getCategory]);

  const stressResult = useMemo(() => {
    const { comp: baseComp, inc: baseIncome, cst: baseCost, weights, baseTotal } = baseValues;
    const wear = getWear(selectedOkn);
    const isFederal = getCategory(selectedOkn).toLowerCase().includes('федеральн');
    const effRent = (rentShock / 100) * (isFederal ? 1.2 : 1);
    const effCost = (restoreCostShock / 100) * (wear > 30 ? 1.5 : 1);
    const capF = 0.09 / Math.max(0.01, 0.09 + capRateShock / 100);
    const vacancyF = Math.max(0.1, 1 - vacancyRate / 100);
    const opexF = Math.max(0.1, 1 - opexShock / 100);
    const stressedIncome = baseIncome * (1 + effRent) * capF * vacancyF * opexF;
    const stressedCost = baseCost * (1 + effCost);
    const stressTotal = Math.round(baseComp * weights.comparative + stressedIncome * weights.income + stressedCost * weights.cost);
    const dropPct = baseTotal > 0 ? Math.round(((baseTotal - stressTotal) / baseTotal) * 100) : 0;
    return { baseTotal, stressTotal, baseComp, baseIncome, baseCost, stressedComp: baseComp, stressedIncome, stressedCost, weights, dropPct };
  }, [baseValues, rentShock, restoreCostShock, capRateShock, vacancyRate, opexShock, selectedOkn, getWear, getCategory]);

  const { baseTotal, stressTotal, baseIncome, baseCost, stressedIncome, stressedCost, weights, dropPct } = stressResult;
  const deltaVal = stressTotal - baseTotal;
  const isLoss = deltaVal < 0;
  const pctString = dropPct < 0 ? `+${Math.abs(dropPct)}%` : (dropPct > 0 ? `-${dropPct}%` : `${dropPct}%`);
  const valColor = isLoss ? "text-rose-500" : "text-emerald-500";
  const badgeBg = isLoss ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400";
  const incomeLoss = Math.max(0, (baseValues.income * weights.income) - (stressedIncome * weights.income));
  const costLoss = Math.max(0, (baseValues.cost * weights.cost) - (stressedCost * weights.cost));
  const totalLossesForChart = incomeLoss + costLoss;
  const incomeLossPct = (isLoss && totalLossesForChart > 0) ? Math.round((incomeLoss / totalLossesForChart) * 100) : 0;
  const costLossPct = (isLoss && totalLossesForChart > 0) ? 100 - incomeLossPct : 0;

  const rangeCss = `
    .range-premium { appearance: none; outline: none; }
    .range-premium::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 1.5rem; height: 1.5rem; background: #fff; border-radius: 9999px; box-shadow: 0 0 10px currentColor; cursor: pointer; border: 1px solid rgba(255,255,255,0.25); transition: transform .1s ease; }
    .range-premium::-webkit-slider-thumb:hover { transform: scale(1.12); }
    .range-premium::-moz-range-thumb { width: 1.5rem; height: 1.5rem; background: #fff; border-radius: 9999px; box-shadow: 0 0 10px currentColor; cursor: pointer; border: 1px solid rgba(255,255,255,0.25); }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #1e2937; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
  `;

  return (
    <div className="py-1 px-1 sm:px-2 space-y-7">
      <style>{rangeCss}</style>
      <div>
        <div className="text-[10px] uppercase tracking-[2.5px] text-slate-500 font-semibold mb-1.5 pl-1">ОБЪЕКТ ДЛЯ СТРЕСС-ТЕСТА</div>
        <div className="relative" ref={dropdownRef}>
          <div onClick={() => setDropdownOpen(!dropdownOpen)} className="flex justify-between items-center w-full bg-slate-900/60 backdrop-blur-md border border-slate-700 hover:border-indigo-500/50 rounded-2xl p-4 cursor-pointer text-slate-100 shadow-lg transition-colors">
            <span className="truncate pr-3 text-sm font-medium text-slate-100">{selectedOkn ? `${selectedOkn.name} • ${selectedOkn.address}` : 'Выберите объект ОКН'}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </div>
          {dropdownOpen && (
            <div className="absolute z-50 w-full bg-slate-800 border border-slate-600 rounded-xl mt-2 max-h-60 overflow-y-auto shadow-2xl custom-scrollbar">
              {ALL_OBJECTS.map((o) => (
                <div key={o.id} onClick={() => handleSelectChange(o.id)} className={`p-3 cursor-pointer hover:bg-slate-700 border-b border-slate-700/50 last:border-0 text-sm transition-colors ${o.id === selectedId ? 'bg-slate-700/70 text-white font-medium' : 'text-slate-200'}`}>{o.name} • {o.address}</div>
              ))}
            </div>
          )}
        </div>
        {selectedOkn && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 pl-1 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {getArea(selectedOkn).toLocaleString('ru-RU')} м²</span>
            <span>Износ {getWear(selectedOkn)}%</span>
            <span className="text-slate-500">•</span>
            <span>{getCategory(selectedOkn) || 'ОКН'}</span>
          </div>
        )}
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-7">
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Сценарный анализ и чувствительность модели</h1>
          <p className="mt-3 text-slate-400 text-base leading-relaxed max-w-4xl">Интерактивная среда для проверки финансовой устойчивости объекта. Моделируйте макроэкономические шоки вручную или используйте исторические прецеденты, чтобы оценить реальный запас прочности актива и сгенерировать ИИ-прогноз.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="text-sm font-semibold text-slate-200">ИСТОРИЧЕСКИЕ СЦЕНАРИИ</div>
              <div className="flex items-center gap-2">
                <button onClick={resetAll} className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 active:scale-[0.985] transition"><RefreshCw className="w-3.5 h-3.5" /> Сбросить</button>
                <button onClick={() => setScenarioPage(p => p === 0 ? 1 : (p === 1 ? 2 : 0))} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors"><RefreshCcw className="w-3 h-3" /> Другие сценарии</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scenarios.slice(scenarioPage * 4, scenarioPage * 4 + 4).map((sc) => (
                <button key={sc.id} onClick={() => applyScenario(sc)} className={`group w-full text-left px-4 py-3.5 rounded-xl border transition-all active:scale-[0.985] bg-slate-800/40 hover:bg-slate-800 text-slate-200 ${activeScenarioId === sc.id ? 'border-slate-400 bg-slate-700' : 'border-slate-700/50 hover:border-slate-500'}`}>
                  <div className="font-semibold text-sm text-slate-200 tracking-wide group-hover:text-white transition">{sc.label}</div>
                  <div className="mt-1 text-[10px] text-slate-500 leading-snug">Аренда {sc.rent > 0 ? '+' : ''}{sc.rent}% • Вак. +{sc.vacancy}% • Сметы +{sc.cost}% • OPEX +{sc.opex}% • Cap {sc.cap > 0 ? '+' : ''}{sc.cap}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5"><TrendingUp className="w-4 h-4 text-slate-300" /><div className="font-semibold">Ручное управление</div></div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div>
                    <div className="font-semibold text-rose-300 flex items-center gap-2"><TrendingDown className="w-4 h-4" /> Арендная ставка</div>
                    <div className="font-sans text-xs text-slate-400 mt-0.5">Ожидаемое падение или рост арендных ставок на рынке.</div>
                  </div>
                  <span className={`font-mono text-base tabular-nums ${rentShock >= 0 ? 'text-emerald-400' : 'text-rose-400'} [text-shadow:0_0_8px_currentColor]`}>{rentShock > 0 ? '+' : ''}{rentShock}%</span>
                </div>
                <input type="range" min={-60} max={50} step={1} value={rentShock} onChange={(e) => { setRentShock(parseInt(e.target.value)); setActiveScenarioId(null); setAiForecastText(null); setIsGeneratingAI(false); }} className="range-premium appearance-none w-full bg-slate-800 h-1.5 rounded-full cursor-pointer text-rose-500" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div>
                    <div className="font-semibold text-amber-300">Стоимость реставрации / восстановления</div>
                    <div className="font-sans text-xs text-slate-400 mt-0.5">Насколько дороже обойдутся стройматериалы и работы?</div>
                  </div>
                  <span className={`font-mono text-base tabular-nums ${restoreCostShock >= 0 ? 'text-amber-400' : 'text-emerald-400'} [text-shadow:0_0_8px_currentColor]`}>{restoreCostShock > 0 ? '+' : ''}{restoreCostShock}%</span>
                </div>
                <input type="range" min={-20} max={150} step={1} value={restoreCostShock} onChange={(e) => { setRestoreCostShock(parseInt(e.target.value)); setActiveScenarioId(null); setAiForecastText(null); setIsGeneratingAI(false); }} className="range-premium appearance-none w-full bg-slate-800 h-1.5 rounded-full cursor-pointer text-amber-500" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div>
                    <div className="font-semibold text-orange-300">Ставка капитализации</div>
                    <div className="font-sans text-xs text-slate-400 mt-0.5">Премия за риск. Изменение ожидаемой доходности инвесторов.</div>
                  </div>
                  <span className={`font-mono text-base tabular-nums ${capRateShock >= 0 ? 'text-orange-400' : 'text-emerald-400'} [text-shadow:0_0_8px_currentColor]`}>{capRateShock > 0 ? '+' : ''}{capRateShock.toFixed(1)} п.п.</span>
                </div>
                <input type="range" min={-2} max={5} step={0.1} value={capRateShock} onChange={(e) => { setCapRateShock(parseFloat(e.target.value)); setActiveScenarioId(null); setAiForecastText(null); setIsGeneratingAI(false); }} className="range-premium appearance-none w-full bg-slate-800 h-1.5 rounded-full cursor-pointer text-orange-400" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div>
                    <div className="font-semibold text-purple-300 flex items-center gap-2"><Percent className="w-4 h-4" /> Уровень вакантности</div>
                    <div className="font-sans text-xs text-slate-400 mt-0.5">Какой процент площадей будут пустовать из-за ухода арендаторов?</div>
                  </div>
                  <span className={`font-mono text-base tabular-nums ${vacancyRate > 0 ? 'text-purple-400' : 'text-emerald-400'} [text-shadow:0_0_8px_currentColor]`}>+{vacancyRate}%</span>
                </div>
                <input type="range" min={0} max={50} step={1} value={vacancyRate} onChange={(e) => { setVacancyRate(parseInt(e.target.value)); setActiveScenarioId(null); setAiForecastText(null); setIsGeneratingAI(false); }} className="range-premium appearance-none w-full bg-slate-800 h-1.5 rounded-full cursor-pointer text-purple-500" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div>
                    <div className="font-semibold text-sky-300 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Рост операционных расходов (OPEX)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Насколько вырастут налоги, коммунальные платежи и обслуживание?</div>
                  </div>
                  <span className={`font-mono text-base tabular-nums ${opexShock > 0 ? 'text-sky-400' : 'text-emerald-400'} [text-shadow:0_0_8px_currentColor]`}>+{opexShock}%</span>
                </div>
                <input type="range" min={0} max={300} step={1} value={opexShock} onChange={(e) => { setOpexShock(parseInt(e.target.value)); setActiveScenarioId(null); setAiForecastText(null); setIsGeneratingAI(false); }} className="range-premium appearance-none w-full bg-slate-800 h-1.5 rounded-full cursor-pointer text-sky-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-[#0B1120] to-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl font-sans">
            {/* ИСПРАВЛЕННАЯ СЕТКА: Идеальное выравнивание и защита от прыжков */}
            <div className="grid grid-cols-3 gap-2 lg:gap-4 items-start bg-slate-900/50 p-4 rounded-xl">
              <div className="text-center flex flex-col items-center">
                <div className="text-[10px] lg:text-xs text-slate-400 font-medium uppercase mb-1">Было</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg lg:text-xl font-semibold tabular-nums tracking-tight text-slate-300">{getCurrencyParts(baseTotal).num}</span>
                  <span className="text-[10px] lg:text-xs font-normal text-slate-500">{getCurrencyParts(baseTotal).unit}</span>
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="text-[10px] lg:text-xs text-slate-400 font-medium uppercase mb-1">Изменение</div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-lg lg:text-xl font-semibold tabular-nums tracking-tight ${valColor}`}>{getCurrencyParts(deltaVal).num}</span>
                  <span className="text-[10px] lg:text-xs font-normal text-slate-500">{getCurrencyParts(deltaVal).unit}</span>
                </div>
                <div className={`mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeBg}`}>{pctString}</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="text-[10px] lg:text-xs text-slate-400 font-medium uppercase mb-1">Стало</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg lg:text-xl font-semibold tabular-nums tracking-tight text-white">{getCurrencyParts(stressTotal).num}</span>
                  <span className="text-[10px] lg:text-xs font-normal text-slate-500">{getCurrencyParts(stressTotal).unit}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-lg transition-all min-h-[130px] flex flex-col justify-center font-sans">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500">Структура потерь (Декомпозиция)</h3>
              {isLoss && totalLossesForChart > 0 && <span className="text-xs text-slate-400">100% = {formatCurrency(totalLossesForChart)}</span>}
            </div>
            <div className="min-h-[60px]">
              {isLoss && totalLossesForChart > 0 ? (
                <>
                  <div className="h-5 w-full bg-slate-800/50 rounded-full overflow-hidden flex mb-4 border border-slate-700/30">
                    {incomeLossPct > 0 && <div style={{ width: `${incomeLossPct}%` }} className="h-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all duration-700" />}
                    {costLossPct > 0 && <div style={{ width: `${costLossPct}%` }} className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-700" />}
                  </div>
                  <div className="flex justify-between text-sm">
                    {incomeLossPct > 0 ? <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span><span className="text-slate-300">Доходный ({incomeLossPct}%)</span></div> : <div />}
                    {costLossPct > 0 ? <div className="flex items-center gap-2"><span className="text-slate-300">Затратный ({costLossPct}%)</span><span className="w-3 h-3 rounded-full bg-amber-500"></span></div> : <div />}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-2"><span className="text-emerald-500/80 font-medium tracking-wide">Потерь не зафиксировано (Сценарий роста)</span></div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-l-4 border-l-indigo-500 rounded-xl p-6 shadow-xl">
            <div className="text-lg font-sans text-slate-300 mb-3">Аналитический отчет и прецеденты</div>
            {currentScenario && (
              <div className="min-h-[200px]">
                <p className="text-base leading-relaxed text-slate-400 mb-4">{currentScenario.prob}</p>
                <p className="text-base leading-relaxed text-slate-400">{currentScenario.context}</p>
                <div className="pt-2 text-[10px] text-slate-500">Сценарий применён к текущему объекту. Двигайте ползунки для тонкой настройки.</div>
              </div>
            )}
            {stressTotal !== baseTotal ? (
              isGeneratingAI ? (
                <div className="mt-4 flex items-center gap-2 text-sm text-indigo-300"><span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> Анализ уязвимостей объекта...</div>
              ) : aiForecastText ? (
                <div className="font-sans text-lg text-slate-200 leading-relaxed whitespace-pre-line mt-3">{aiForecastText}</div>
              ) : (
                <button onClick={generateAIForecast} disabled={isGeneratingAI} className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all flex items-center justify-center gap-3 text-lg"><Sparkles className="w-5 h-5" /> Сгенерировать ИИ-прогноз</button>
              )
            ) : (
              <p className="text-sm text-slate-400 leading-relaxed">Настройте параметры макроэкономического шока. Нейросеть проанализирует финансовую модель и расскажет, что произойдет с объектом, простыми словами.</p>
            )}
          </div>

          <div className="bg-[#0a0f16]/90 border border-slate-700 rounded-2xl p-6">
            <div className="text-[10px] uppercase tracking-[1.5px] text-slate-500 mb-3">Изменения подходов (веса: {(weights.comparative*100).toFixed(0)}% / {(weights.income*100).toFixed(0)}% / {(weights.cost*100).toFixed(0)}%)</div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sky-300 text-sm w-32 shrink-0">Сравнительный (фикс.)</span>
              <div className="relative h-2.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-sky-400/30 transition-all" style={{ width: '100%' }} />
                <div className="absolute top-0 left-0 h-full bg-sky-400 transition-all" style={{ width: '100%' }} />
              </div>
              <span className="font-mono text-sm text-sky-400 w-10 text-right shrink-0">0%</span>
            </div>
            {(() => {
              const maxInc = Math.max(baseIncome, stressedIncome, 1);
              const baseW = Math.round((baseIncome / maxInc) * 100);
              const strW = Math.round((stressedIncome / maxInc) * 100);
              const d = baseIncome > 0 ? Math.round(((stressedIncome - baseIncome) / baseIncome) * 100) : 0;
              return (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-rose-300 text-sm w-32 shrink-0">Доходный</span>
                  <div className="relative h-2.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-rose-400/30 transition-all" style={{ width: `${baseW}%` }} />
                    <div className="absolute top-0 left-0 h-full bg-rose-400 transition-all" style={{ width: `${strW}%` }} />
                  </div>
                  <span className={`font-mono text-sm w-10 text-right shrink-0 ${d >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{d > 0 ? '+' : ''}{d}%</span>
                </div>
              );
            })()}
            {(() => {
              const maxCst = Math.max(baseCost, stressedCost, 1);
              const baseW = Math.round((baseCost / maxCst) * 100);
              const strW = Math.round((stressedCost / maxCst) * 100);
              const d = baseCost > 0 ? Math.round(((stressedCost - baseCost) / baseCost) * 100) : 0;
              return (
                <div className="flex items-center gap-3">
                  <span className="text-amber-300 text-sm w-32 shrink-0">Затратный</span>
                  <div className="relative h-2.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-amber-400/30 transition-all" style={{ width: `${baseW}%` }} />
                    <div className="absolute top-0 left-0 h-full bg-amber-400 transition-all" style={{ width: `${strW}%` }} />
                  </div>
                  <span className={`font-mono text-sm w-10 text-right shrink-0 ${d >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{d > 0 ? '+' : ''}{d}%</span>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTestPage;