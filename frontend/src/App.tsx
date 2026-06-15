import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import PassportPanel from './components/PassportPanel';
import AnaloguesPanel from './components/AnaloguesPanel';
import IncomeApproachPanel from './components/IncomeApproachPanel';
import CostApproachPanel from './components/CostApproachPanel';
import ResultPanel from './components/ResultPanel';
import GlobalMap from './components/GlobalMap';
import StressTestPage from './components/StressTestPage';
import MethodologyPage from './components/MethodologyPage';
import ErrorBoundary from './components/ErrorBoundary';
import { calculateComparativeValue, calculateIncomeValue, calculateCostValue, getRecommendedWeights } from './utils/calc';
import { LOCAL_MOCK_ANALOGUES_ROSSIYA } from './data/allObjects';
import type { ValuationWeights } from './types';
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Clock,
  Database,
  FileText,
  Globe,
  Home,
  Landmark,
  LayoutDashboard,
  MapPinned,
  Menu,
  Search,
  TrendingUp,
  X,
  Activity,
  BookOpen,
} from 'lucide-react';
import { ALL_OBJECTS } from './data/allObjects';
import { getPhotoFolder, PHOTO_FALLBACK } from './utils/photoHelper';

const getAutoPhotoPath = (_address: string, id: string): string => {
  const folder = getPhotoFolder(id);
  if (folder) return `/photos/${folder}/1.jpg`;
  return PHOTO_FALLBACK;
};

const DB_SOURCES = [
  {
    id: 'fgi-egrn',
    name: 'ФГИС ЕГРН',
    desc: 'Росреестр • Единый государственный реестр недвижимости',
    status: 'LIVE' as const,
    Icon: Database,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    hoverBorder: 'hover:border-sky-500/50',
    stats: [
      { label: 'Записей', value: '2.4 млн' },
      { label: 'Обновлено', value: 'Сегодня' }
    ],
    buttons: [
      { label: 'Открыть', tone: 'sky' as const },
      { label: 'Обновить', tone: 'secondary' as const }
    ]
  },
  {
    id: 'reestr-okn',
    name: 'Реестр ОКН',
    desc: 'Москомнаследие • Объекты культурного наследия Москвы',
    status: 'LIVE' as const,
    Icon: Landmark,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    hoverBorder: 'hover:border-amber-500/50',
    stats: [
      { label: 'Объектов', value: '1 240' },
      { label: 'В портфеле', value: '87' }
    ],
    buttons: [
      { label: 'Реестр', tone: 'amber' as const },
      { label: 'Экспорт', tone: 'secondary' as const }
    ]
  },
  {
    id: 'cian',
    name: 'ЦИАН Аналитика',
    desc: 'Коммерческие предложения • Рыночные данные',
    status: 'LIVE' as const,
    Icon: TrendingUp,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
    hoverBorder: 'hover:border-purple-500/50',
    stats: [
      { label: 'Предложений', value: '184k' },
      { label: 'Цена/м²', value: '412k ₽' }
    ],
    buttons: [
      { label: 'Аналитика', tone: 'purple' as const },
      { label: 'Обновить', tone: 'secondary' as const }
    ]
  },
  {
    id: 'gis-ogd',
    name: 'ГИС ОГД Москвы',
    desc: 'Охранные зоны • ПЗЗ • Градостроительные ограничения',
    status: 'LIVE' as const,
    Icon: MapPinned,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/50',
    stats: [
      { label: 'Зон', value: '18.4k' },
      { label: 'Обновлено', value: '2 ч назад' }
    ],
    buttons: [
      { label: 'Открыть карту', tone: 'emerald' as const },
      { label: 'Скачать слои', tone: 'secondary' as const }
    ]
  },
  {
    id: 'pkk-rosreestr',
    name: 'ПКК Росреестра',
    desc: 'Публичная кадастровая карта • Границы участков',
    status: 'LIVE' as const,
    Icon: Globe,
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
    hoverBorder: 'hover:border-sky-500/50',
    stats: [
      { label: 'Участков', value: '8.2 млн' },
      { label: 'Обновлено', value: 'Сегодня' }
    ],
    buttons: [
      { label: 'Открыть карту', tone: 'sky' as const },
      { label: 'Слои', tone: 'secondary' as const }
    ]
  },
  {
    id: 'nash-dom',
    name: 'Наш.Дом.РФ',
    desc: 'ЕИСЖС • Данные по новостройкам и застройщикам',
    status: 'LIVE' as const,
    Icon: Home,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/50',
    stats: [
      { label: 'Новостроек', value: '124k' },
      { label: 'Застройщиков', value: '3.1k' }
    ],
    buttons: [
      { label: 'Аналитика', tone: 'emerald' as const },
      { label: 'API', tone: 'secondary' as const }
    ]
  },
  {
    id: 'portal-data',
    name: 'Портал открытых данных',
    desc: 'Правительство Москвы • Датасеты и статистика',
    status: 'OFFLINE' as const,
    Icon: FileText,
    iconBg: 'bg-slate-500/10',
    iconColor: 'text-slate-400',
    hoverBorder: 'hover:border-slate-500/50',
    stats: [
      { label: 'Датасетов', value: '2 340' },
      { label: 'Обновлено', value: '3 дня' }
    ],
    buttons: [
      { label: 'Каталог', tone: 'slate' as const },
      { label: 'Обновить', tone: 'secondary' as const }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [loadedObject, setLoadedObject] = useState<any>(null);
  const [autoRunQuery, setAutoRunQuery] = useState<string | null>(null);
  const [analogues, setAnalogues] = useState<any[]>(LOCAL_MOCK_ANALOGUES_ROSSIYA);
  const [adjustments, setAdjustments] = useState<Record<string, any>>({});
  const [selectedAnalogId, setSelectedAnalogId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [sideView, setSideView] = useState<'dashboard' | 'my-objects' | 'global-map' | 'databases' | 'stress-test' | 'methodology' | null>(null);

  const [activeActionKey, setActiveActionKey] = useState<string | null>(null);

  const calculatedValues = useMemo(() => {
    if (!loadedObject) return { comp: 0, inc: 0, cost: 0 };
    return {
      comp: calculateComparativeValue(loadedObject, analogues, adjustments, selectedAnalogId),
      inc: calculateIncomeValue(loadedObject, adjustments),
      cost: calculateCostValue(loadedObject)
    };
  }, [loadedObject, analogues, adjustments, selectedAnalogId]);
  const [objectWeights, setObjectWeights] = useState<Record<string, ValuationWeights>>({});

  const handleObjectLoaded = useCallback((obj: any) => {
    const newId = obj?.id;
    const prevId = loadedObject?.id;

    setLoadedObject(obj);

    if (newId !== prevId) {
      setAnalogues(LOCAL_MOCK_ANALOGUES_ROSSIYA);
      setAdjustments({});
      const top5 = [...LOCAL_MOCK_ANALOGUES_ROSSIYA].sort((a, b) => (b.similarity || 0) - (a.similarity || 0)).slice(0, 5).map(a => String(a.id)).join(',');
      setSelectedAnalogId(top5);
    }
  }, [loadedObject?.id]);

  useEffect(() => {
    if (!loadedObject?.id) return;
  }, [loadedObject?.id]);

  useEffect(() => {
    // Left empty since we don't need to reset a state variable anymore
  }, [loadedObject]);

  useEffect(() => {
    if (loadedObject && !objectWeights[loadedObject.id]) {
      const rec = getRecommendedWeights(loadedObject, analogues);
      setObjectWeights(prev => ({ ...prev, [loadedObject.id]: rec }));
    }
  }, [loadedObject?.id]);

  const handleHistorySelect = useCallback((cadastral: string) => {
    setAutoRunQuery(cadastral);
    setActiveTab(1);
  }, []);

  const clearAutoRunQuery = useCallback(() => setAutoRunQuery(null), []);

  const handleOpenObjectFromMap = useCallback((id: string) => {
    const found = ALL_OBJECTS.find((o: any) => o.id === id);
    if (found) handleObjectLoaded(found);
    setSideView(null);
    setActiveTab(2);
  }, [handleObjectLoaded]);

  const handleTabChange = useCallback((tab: number) => {
    setActiveTab(tab);
    setSideView(null);
  }, []);

  const prevActiveTabRef = useRef(activeTab);
  useEffect(() => {
    if (prevActiveTabRef.current !== activeTab) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 80);
      prevActiveTabRef.current = activeTab;
      return () => clearTimeout(timer);
    }
    prevActiveTabRef.current = activeTab;
  }, [activeTab]);

  const navItems = [
    { id: 1, label: 'Дашборд', Icon: LayoutDashboard },
    { id: 2, label: 'Мои проекты', Icon: Building2 },
    { id: 3, label: 'Глобальная карта', Icon: MapPinned },
    { id: 4, label: 'Базы данных', Icon: Database },
    { id: 5, label: 'Сценарный анализ', Icon: Activity },
  ];

  const DB_PRIMARY_URLS: Record<string, string> = {
    'fgi-egrn': 'https://rosreestr.gov.ru',
    'reestr-okn': 'https://data.mos.ru/opendata/7702155262-obekty-kulturnogo-naslediya',
    'cian': 'https://www.cian.ru/',
    'gis-ogd': 'https://isogd.mos.ru/',
    'pkk-rosreestr': 'https://pkk.rosreestr.ru/',
    'nash-dom': 'https://наш.дом.рф/',
  };

  const handlePrimaryAction = (sourceId: string) => {
    const url = DB_PRIMARY_URLS[sourceId];
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleSecondaryAction = (sourceId: string, label: string) => {
    const key = `${sourceId}:${label}`;
    setActiveActionKey(key);
    setTimeout(() => {
      setActiveActionKey(`done:${key}`);
      setTimeout(() => {
        setActiveActionKey((current) => (current === `done:${key}` ? null : current));
      }, 600);
    }, 1400);
  };

  const myPortfolio = [
    { id: '1', stage: 'Сбор данных', obj: ALL_OBJECTS.find(o => o.id === 'okn-myasnitskaya') || ALL_OBJECTS[3], date: '2 часа назад', val: '—' },
    { id: '2', stage: 'Оценка', obj: ALL_OBJECTS.find(o => o.id === 'obj-15') || ALL_OBJECTS[2], date: 'Сегодня', val: '1,24 млрд ₽' },
    { id: '3', stage: 'Оценка', obj: ALL_OBJECTS.find(o => o.id === 'obj-9') || ALL_OBJECTS[0], date: 'Вчера', val: '142 млн ₽' },
    { id: '4', stage: 'Завершено', obj: ALL_OBJECTS.find(o => o.id === 'obj-1') || ALL_OBJECTS[1], date: '12 мая', val: '19,7 млрд ₽' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white relative overflow-x-hidden font-sans">
      
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-3.5 left-3 z-[9999] h-9 w-9 flex items-center justify-center text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-all active:scale-95 shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        targetObjectLoaded={!!loadedObject}
        currentObject={loadedObject}
        username="Иванов А. В."
        role="Ведущий оценщик ГБУ"
        onHistorySelect={handleHistorySelect}
        sidebarActive={!!sideView}
        onGlobalSearchSelect={handleOpenObjectFromMap} 
      />

      <main className="flex-1 w-full flex flex-col relative z-10 pb-20">
        <ErrorBoundary>
        {sideView ? (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6" key={sideView}>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => { setSideView(null); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-sm font-extrabold transition-all active:scale-[0.985]"
              >
                <ArrowLeft className="w-4 h-4" /> Назад к основному меню
              </button>
            </div>

            {sideView === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight">Дашборд</h1>
                  <p className="text-slate-400 mt-2 text-lg">Сводка по всем объектам и активным сессиям</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  {[
                    { label: 'Активных оценок', value: '14', delta: '+3 за неделю', icon: BarChart3, color: 'emerald' },
                    { label: 'Объектов в портфеле', value: '87', delta: '12 ОКН федерального значения', icon: Home, color: 'sky' },
                    { label: 'Среднее время оценки', value: '4.2 дня', delta: '−18% к прошлому кварталу', icon: Clock, color: 'amber' },
                    { label: 'Экономия по ККН', value: '₽142 млн', delta: 'от рыночной стоимости', icon: TrendingUp, color: 'emerald' },
                  ].map((kpi, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-mono tracking-widest text-slate-400">{kpi.label}</div>
                          <div className="text-4xl font-black text-white mt-3">{kpi.value}</div>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl bg-${kpi.color}-500/10 text-${kpi.color}-400 flex items-center justify-center`}>
                          <kpi.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="text-xs text-emerald-400 mt-4 font-medium">{kpi.delta}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-xl font-bold text-white mb-5">Структура портфеля ОКН</h2>
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-center justify-between mb-1.5 text-sm">
                          <span className="text-slate-300">Регионального значения</span>
                          <span className="text-slate-400 font-mono text-xs">45 объектов</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-1.5 bg-indigo-500 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5 text-sm">
                          <span className="text-slate-300">Федерального значения</span>
                          <span className="text-slate-400 font-mono text-xs">30 объектов</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-1.5 bg-purple-500 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5 text-sm">
                          <span className="text-slate-300">Выявленные ОКН</span>
                          <span className="text-slate-400 font-mono text-xs">12 объектов</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-1.5 bg-teal-500 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-xl font-bold text-white mb-5">Статусы текущих оценок</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">Сбор данных (ЕГРН, ЦИАН)</span>
                        <span className="px-3 py-0.5 text-xs font-bold bg-sky-500/10 text-sky-400 rounded-full">8 проектов</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">Построение фин. модели</span>
                        <span className="px-3 py-0.5 text-xs font-bold bg-amber-500/10 text-amber-400 rounded-full">4 проектов</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">Подготовка и согласование отчета</span>
                        <span className="px-3 py-0.5 text-xs font-bold bg-emerald-500/10 text-emerald-400 rounded-full">2 проектов</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {sideView === 'my-objects' && (
              <div className="space-y-6">
                <h1 className="text-4xl font-extrabold tracking-tight">Мои проекты</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {myPortfolio.map(item => (
                    <div key={item.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 flex gap-5 hover:border-slate-600 transition cursor-pointer" onClick={() => handleOpenObjectFromMap(item.obj.id)}>
                      <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-800 shrink-0">
                        <img src={getAutoPhotoPath(item.obj.address || '', item.obj.id || '')} alt="" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = PHOTO_FALLBACK; }} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded border border-sky-500/20">{item.stage}</span>
                          <span className="text-xs text-slate-500 font-mono">{item.date}</span>
                        </div>
                        <h3 className="font-bold text-white text-xl truncate">{item.obj.name}</h3>
                        <p className="text-sm text-slate-400 mt-1 truncate">{item.obj.address}</p>
                        <div className="mt-4 text-emerald-400 font-mono text-2xl font-black">{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sideView === 'global-map' && (
              <div className="flex-1 min-h-0">
                <GlobalMap onOpenInPassport={handleOpenObjectFromMap} onAddToEvaluation={() => {}} oknObjects={ALL_OBJECTS} />
              </div>
            )}

            {sideView === 'databases' && (
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-4xl font-extrabold tracking-tight">Базы данных</h1>
                      <p className="text-slate-400 mt-2 text-lg">Подключённые государственные и коммерческие источники</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-xl text-sm font-bold flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        {DB_SOURCES.length} источников • {DB_SOURCES.filter(s => s.status === 'LIVE').length} онлайн
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Поиск по названию источника..." 
                      className="w-full bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-2xl pl-12 py-3.5 text-sm placeholder:text-slate-500"
                    />
                    <Search className="absolute left-5 top-4 text-slate-500" />
                  </div>
                  <div className="flex gap-2">
                    <button className="px-5 py-3.5 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-2xl text-sm font-medium flex items-center gap-2">Все источники</button>
                    <button className="px-5 py-3.5 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-2xl text-sm font-medium flex items-center gap-2">Государственные</button>
                    <button className="px-5 py-3.5 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-2xl text-sm font-medium flex items-center gap-2">Коммерческие</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {DB_SOURCES.map((source) => {
                    const isLive = source.status === 'LIVE';
                    const getBtnClass = (tone: string) => {
                      if (tone === 'sky') return 'bg-sky-600 hover:bg-sky-500 text-white';
                      if (tone === 'emerald') return 'bg-emerald-600 hover:bg-emerald-500 text-white';
                      if (tone === 'amber') return 'bg-amber-600 hover:bg-amber-500 text-white';
                      if (tone === 'purple') return 'bg-purple-600 hover:bg-purple-500 text-white';
                      return 'border border-slate-700 hover:bg-slate-800 text-slate-300';
                    };

                    return (
                      <div
                        key={source.id}
                        className={`bg-slate-900/70 border border-slate-700 ${source.hoverBorder} rounded-2xl p-4 lg:p-4 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 transition-all group relative overflow-hidden`}
                      >
                        <div className={`absolute top-2.5 right-2.5 z-10 px-2 py-0.5 text-[10px] font-bold rounded-full flex items-center gap-1 ${isLive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                          {isLive && <div className="w-1 h-1 bg-current rounded-full animate-pulse" />}
                          {source.status}
                        </div>

                        <div className="flex items-center gap-3 min-w-0 lg:min-w-[200px] lg:flex-1 lg:pr-1">
                          <div className={`w-9 h-9 lg:w-9 lg:h-9 flex-shrink-0 ${source.iconBg} rounded-xl flex items-center justify-center`}>
                            <source.Icon className={`w-4.5 h-4.5 lg:w-5 lg:h-5 ${source.iconColor}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-black text-white text-[15px] lg:text-base leading-tight tracking-[-0.2px]">{source.name}</div>
                            <div className="text-xs text-slate-400 leading-snug mt-0.5">{source.desc}</div>
                          </div>
                        </div>

                        <div className="lg:flex-1 flex items-start gap-4 lg:gap-5 pl-1 lg:pl-3 lg:border-l lg:border-slate-800 min-w-0">
                          {source.stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[10px] uppercase text-slate-500 tracking-wider">{stat.label}</span>
                              <span className="font-medium text-sm text-white mt-0.5">{stat.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-2 flex-shrink-0 min-w-[140px] ml-auto pt-1 lg:pt-0">
                          {source.buttons.map((btn, i) => {
                            const btnKey = `${source.id}:${btn.label}`;
                            const isLoading = activeActionKey === btnKey;
                            const isDone = activeActionKey === `done:${btnKey}`;
                            const displayLabel = isLoading ? 'Загрузка...' : isDone ? 'Выполнено' : btn.label;
                            const isSecondary = btn.tone === 'secondary' || btn.tone === 'slate';

                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  if (isSecondary) {
                                    handleSecondaryAction(source.id, btn.label);
                                  } else {
                                    handlePrimaryAction(source.id);
                                  }
                                }}
                                className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap text-center active:scale-[0.985] ${getBtnClass(btn.tone)}`}
                              >
                                {displayLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 text-sm text-slate-400">
                  Все источники синхронизируются автоматически каждые 15 минут. Последняя полная синхронизация: <span className="text-white font-mono">01.06.2026 14:58</span>
                </div>
              </div>
            )}

            {sideView === 'stress-test' && (
              <StressTestPage />
            )}
            {sideView === 'methodology' && (
              <MethodologyPage />
            )}
          </div>
        ) : (
          <div className="flex-1 w-full">
            {activeTab === 1 && <SearchPanel onObjectLoaded={handleObjectLoaded} setActiveTab={handleTabChange} autoRunQuery={autoRunQuery} clearAutoRunQuery={clearAutoRunQuery} />}
            {activeTab === 2 && loadedObject && <PassportPanel okn={loadedObject} analogues={analogues} selectedAnalogId={selectedAnalogId} setSelectedAnalogId={setSelectedAnalogId} setActiveTab={handleTabChange} onObjectLoaded={handleObjectLoaded} />}
            {activeTab === 3 && loadedObject && <AnaloguesPanel okn={loadedObject} adjustments={adjustments} setAdjustments={setAdjustments} analogues={analogues} setAnalogues={setAnalogues} selectedAnalogId={selectedAnalogId} setSelectedAnalogId={setSelectedAnalogId} setActiveTab={handleTabChange} panelValues={calculatedValues} />}
            {activeTab === 4 && loadedObject && <IncomeApproachPanel okn={loadedObject} setActiveTab={handleTabChange} panelValues={calculatedValues} adjustments={adjustments} setAdjustments={setAdjustments} />}
            {activeTab === 5 && loadedObject && <CostApproachPanel okn={loadedObject} setActiveTab={handleTabChange} panelValues={calculatedValues} />}
            {activeTab === 6 && loadedObject && <ResultPanel okn={loadedObject} analogues={analogues} adjustments={adjustments} weights={objectWeights[loadedObject.id] || getRecommendedWeights(loadedObject, analogues)} onWeightsChange={(w) => setObjectWeights(prev => ({...prev, [loadedObject.id]: w}))} panelValues={calculatedValues} setActiveTab={handleTabChange} />}
          </div>
        )}
        </ErrorBoundary>
      </main>

      {isSidebarOpen && <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-md z-[9998]" onClick={() => setIsSidebarOpen(false)} />}

      <aside className={`fixed top-0 left-0 h-full w-72 bg-slate-950 border-r border-slate-800 shadow-[8px_0_40px_rgba(0,0,0,0.6)] z-[9999] transform transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center"><Landmark className="w-4.5 h-4.5 text-white" /></div>
            <div>
              <div className="text-sm font-black text-white">АРМ «ОЦЕНЩИК»</div>
              <div className="text-[10px] text-slate-400">Навигация</div>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 px-3 py-4 flex flex-col gap-1.5 overflow-y-auto">
          {navItems.map(({ id, label, Icon }) => {
            if (id === 5) {
              const isActive = sideView === 'stress-test';
              return (
                <button
                  key={id}
                  onClick={() => { setSideView('stress-test'); setIsSidebarOpen(false); }}
                  className={`flex items-center gap-3.5 w-full px-4 py-3.5 rounded-2xl text-left transition-all ${isActive ? 'bg-slate-900 text-white border border-rose-500/40' : 'text-slate-300 hover:bg-slate-900/70 border border-transparent hover:border-rose-500/30'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800/60'}`}><Icon className="w-5 h-5" /></div>
                  <span className="font-bold">{label}</span>
                </button>
              );
            }
            const viewKey = id === 1 ? 'dashboard' : id === 2 ? 'my-objects' : id === 3 ? 'global-map' : 'databases';
            const isActive = sideView === viewKey;
            return (
              <button 
                key={id} 
                onClick={() => { setSideView(viewKey); setIsSidebarOpen(false); }} 
                className={`flex items-center gap-3.5 w-full px-4 py-3.5 rounded-2xl text-left transition-all ${isActive ? 'bg-slate-900 text-white border border-sky-500/30' : 'text-slate-300 hover:bg-slate-900/70 border border-transparent'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-800/60'}`}><Icon className="w-5 h-5" /></div>
                <span className="font-bold">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="px-3 py-4 border-t border-slate-800 mt-auto">
          <div className="text-[10px] font-semibold uppercase tracking-[1.5px] text-slate-500 px-4 mb-2">СПРАВОЧНИК</div>
          <button
            onClick={() => { setSideView('methodology'); setIsSidebarOpen(false); }}
            className={`flex items-center gap-3.5 w-full px-4 py-3 rounded-2xl text-left transition-all ${sideView === 'methodology' ? 'bg-slate-900 text-white border border-emerald-500/40' : 'text-slate-300 hover:bg-slate-900/70 border border-transparent hover:border-emerald-500/30'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sideView === 'methodology' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800/60'}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold">Методология</span>
          </button>
        </div>
      </aside>

    </div>
  );
}