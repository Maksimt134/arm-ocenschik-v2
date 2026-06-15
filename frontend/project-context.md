# Project Context: Цифровой паспорт ОКН (АРМ "Оценщик")

Generated: 2026-06-03T14:40:13.685Z
Total included files: 36

## Exclusions applied
- Entire public/photos directory (all photographs and subfolders: rossiya, spiridonovka_*, kolpachny_*, etc.)
- node_modules/
- dist/
- release/
- fonts/ (binary .ttf)
- .netlify/
- package-lock.json
- All media/binary files (.jpg, .png, .jfif, .webp, .pdf, .ttf, .exe, *.map, etc.)
- Temporary/collector scripts (collect-project.cjs, project-context.md)

## Files included
All .ts, .tsx, .js, .cjs, .css, .json (configs), .html, .md, .txt that are actual source.

---

--- СТАРТ ФАЙЛА: index.html ---
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>АРМ Оценщик</title>
  </head>
  <body>
    <div id="root">
      <div style="position: fixed; inset: 0; background-color: #020617; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 99999; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="position: relative; width: 56px; height: 56px;">
          <div style="position: absolute; inset: 0; border-radius: 50%; border: 4px solid #1e293b;"></div>
          <div style="position: absolute; inset: 0; border-radius: 50%; border: 4px solid #0ea5e9; border-top-color: transparent; animation: spin 1s linear infinite;"></div>
        </div>
        <div style="margin-top: 24px; color: #cbd5e1; font-size: 14px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;">
          Загрузка рабочего пространства...
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          body {
            margin: 0;
            background-color: #020617;
          }
        </style>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
--- КОНЕЦ ФАЙЛА: index.html ---

--- СТАРТ ФАЙЛА: package.json ---
{
  "name": "arm-ocenschik-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "dev:force": "vite --force",
    "dev:clean": "node -e \"const fs=require('fs'); const p='node_modules/.vite'; try { fs.rmSync(p, { recursive: true, force: true }); console.log('✓ Vite cache cleared (node_modules/.vite)'); } catch(e){ console.log('No Vite cache to clear or error:', e.message); }\" && vite --force",
    "build": "vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "docx": "^9.7.1",
    "file-saver": "^2.0.5",
    "jspdf": "^4.2.1",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.395.0",
    "pdf-lib": "^1.17.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1",
    "react-router-dom": "^7.15.1",
    "recharts": "^3.8.1"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.14",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.2.2",
    "vite": "^5.2.11"
  }
}
--- КОНЕЦ ФАЙЛА: package.json ---

--- СТАРТ ФАЙЛА: postcss.config.js ---
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
--- КОНЕЦ ФАЙЛА: postcss.config.js ---

--- СТАРТ ФАЙЛА: script.cjs ---
const fs = require('fs');
const file = './src/components/PassportPanel.tsx';
let content = fs.readFileSync(file, 'utf8');

const moreMappings = {
  'Сретенский бульвар, 6/1': 22,
  'Колпачный переулок, дом 5, строение 2': 18,
  'Спиридоновка, 17': 15,
  'Спиридоновка, 21': 28,
  'Сретенский бульвар, 9': 35,
  'Сретенский бульвар, 2': 41,
  'Колпачный пер., д. 10': 47,
  'Покровский бульвар, вл. 5': 52,
  'Малый Никитский пер., 6': 25,
  'Милютинский пер., 5': 33,
  'Поварская ул., 22': 38,
  'Большая Никитская, 47': 29,
  'Большой Харитоньевский переулок, 10': 44,
  'Малый Златоустинский пер.': 39,
  'Подкопаевский пер., д. 4': 55,
  'ул. Забелина, д. 3': 31,
  'Старосадский пер., д. 9': 27,
  'ул. Солянка, д. 12': 48,
  'Хохловский пер., д. 7-9': 36,
  'Фролов пер., 2': 42,
  'Спиридоновка, 3-5': 19,
  'Спиридоновка, 12': 61
};

const lines = content.split('\n');
let replaced = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('name: ')) {
    for (const [key, val] of Object.entries(moreMappings)) {
      if (lines[i].includes('name: ' + "'" + key + "'") || lines[i].includes('name: "' + key + '"') || lines[i].includes(key)) {
        lines[i] = lines[i].replace(/wear_pct: \d+/, 'wear_pct: ' + val);
        replaced++;
        break;
      }
    }
  }
}

console.log('Replaced ' + replaced + ' lines');
fs.writeFileSync(file, lines.join('\n'));
--- КОНЕЦ ФАЙЛА: script.cjs ---

--- СТАРТ ФАЙЛА: src/App.tsx ---
import { useState, useCallback, useEffect, useRef } from 'react';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import PassportPanel from './components/PassportPanel';
import AnaloguesPanel from './components/AnaloguesPanel';
import IncomeApproachPanel from './components/IncomeApproachPanel';
import CostApproachPanel from './components/CostApproachPanel';
import ResultPanel from './components/ResultPanel';
import GlobalMap from './components/GlobalMap';
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
} from 'lucide-react';
import { ALL_OBJECTS } from './data/allObjects';
import { getPhotoFolder, PHOTO_FALLBACK } from './utils/photoHelper';

const getAutoPhotoPath = (_address: string, id: string): string => {
  const folder = getPhotoFolder(id);
  if (folder) return `/photos/${folder}/1.jpg`;
  return PHOTO_FALLBACK;
};

// Мок-данные источников для раздела "Базы данных" (7 источников)
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
      { label: 'Синхронизировать', tone: 'secondary' as const }
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
      { label: 'Открыть реестр', tone: 'amber' as const },
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
      { label: 'Открыть аналитику', tone: 'purple' as const },
      { label: 'Синхронизировать', tone: 'secondary' as const }
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
  const [analogues, setAnalogues] = useState<any[]>([]);
  const [adjustments, setAdjustments] = useState<Record<string, any>>({});
  const [selectedAnalogId, setSelectedAnalogId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [sideView, setSideView] = useState<'dashboard' | 'my-objects' | 'global-map' | 'databases' | null>(null);
  const [activeActionKey, setActiveActionKey] = useState<string | null>(null);

  const handleObjectLoaded = useCallback((obj: any) => {
    setLoadedObject(obj);
    setAnalogues([]);
    setAdjustments({});
    setSelectedAnalogId('');
  }, []);

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

  // Автопрокрутка вверх при смене вкладки (activeTab)
  const prevActiveTabRef = useRef(activeTab);
  useEffect(() => {
    // Прокручиваем только при реальной смене вкладки, а не при монтировании
    if (prevActiveTabRef.current !== activeTab) {
      // Небольшая задержка, чтобы контент вкладки успел отрисоваться
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
  ];

  // URLs for primary action buttons in "Базы данных" cards
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
    // 1.4s "Загрузка...", then 0.6s "Выполнено", then reset (total ~2s)
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
        {sideView ? (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6" key={sideView}>
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setSideView(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-sm font-extrabold transition-all active:scale-[0.985]"
              >
                <ArrowLeft className="w-4 h-4" /> Назад к основному меню
              </button>
            </div>

            {/* ДАШБОРД */}
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
                  {/* Структура портфеля ОКН */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                    <h2 className="text-xl font-bold text-white mb-5">Структура портфеля ОКН</h2>
                    <div className="space-y-5">
                      {/* Регионального значения */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5 text-sm">
                          <span className="text-slate-300">Регионального значения</span>
                          <span className="text-slate-400 font-mono text-xs">45 объектов</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-1.5 bg-indigo-500 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                      {/* Федерального значения */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5 text-sm">
                          <span className="text-slate-300">Федерального значения</span>
                          <span className="text-slate-400 font-mono text-xs">30 объектов</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-1.5 bg-purple-500 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      {/* Выявленные ОКН */}
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

                  {/* Статусы текущих оценок */}
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

            {/* МОИ ПРОЕКТЫ */}
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

            {/* ГЛОБАЛЬНАЯ КАРТА */}
            {sideView === 'global-map' && (
              <div className="flex-1 min-h-0">
                <GlobalMap onOpenInPassport={handleOpenObjectFromMap} onAddToEvaluation={() => {}} />
              </div>
            )}

            {/* БАЗЫ ДАННЫХ — ИЗМЕНЁННЫЕ ПРЯМОУГОЛЬНЫЕ КАРТОЧКИ */}
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

                {/* Горизонтальные карточки источников — улучшенная верстка + интерактивность */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {DB_SOURCES.map((source) => {
                    const isLive = source.status === 'LIVE';
                    const getBtnClass = (tone: string) => {
                      if (tone === 'sky') return 'bg-sky-600 hover:bg-sky-500 text-white';
                      if (tone === 'emerald') return 'bg-emerald-600 hover:bg-emerald-500 text-white';
                      if (tone === 'amber') return 'bg-amber-600 hover:bg-amber-500 text-white';
                      if (tone === 'purple') return 'bg-purple-600 hover:bg-purple-500 text-white';
                      // secondary / gray (в т.ч. "Каталог")
                      return 'border border-slate-700 hover:bg-slate-800 text-slate-300';
                    };

                    return (
                      <div
                        key={source.id}
                        className={`bg-slate-900/70 border border-slate-700 ${source.hoverBorder} rounded-2xl p-4 lg:p-4 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 transition-all group relative overflow-hidden`}
                      >
                        {/* Статус в правом верхнем углу */}
                        <div className={`absolute top-2.5 right-2.5 z-10 px-2 py-0.5 text-[10px] font-bold rounded-full flex items-center gap-1 ${isLive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                          {isLive && <div className="w-1 h-1 bg-current rounded-full animate-pulse" />}
                          {source.status}
                        </div>

                        {/* ЛЕВЫЙ БЛОК: иконка + название + описание (без жесткого truncate, min-w + flex-1) */}
                        <div className="flex items-center gap-3 min-w-0 lg:min-w-[200px] lg:flex-1 lg:pr-1">
                          <div className={`w-9 h-9 lg:w-9 lg:h-9 flex-shrink-0 ${source.iconBg} rounded-xl flex items-center justify-center`}>
                            <source.Icon className={`w-4.5 h-4.5 lg:w-5 lg:h-5 ${source.iconColor}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-black text-white text-[15px] lg:text-base leading-tight tracking-[-0.2px]">{source.name}</div>
                            <div className="text-xs text-slate-400 leading-snug mt-0.5">{source.desc}</div>
                          </div>
                        </div>

                        {/* СРЕДНИЙ БЛОК: статистика в двух аккуратных вертикальных блоках */}
                        <div className="lg:flex-1 flex items-start gap-4 lg:gap-5 pl-1 lg:pl-3 lg:border-l lg:border-slate-800 min-w-0">
                          {source.stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[10px] uppercase text-slate-500 tracking-wider">{stat.label}</span>
                              <span className="font-medium text-sm text-white mt-0.5">{stat.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* ПРАВЫЙ БЛОК: кнопки с интерактивностью */}
                        <div className="flex flex-col gap-2 items-stretch ml-auto flex-shrink-0 pt-1 lg:pt-0 lg:w-auto lg:max-w-[140px]">
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
                                className={`w-full py-1.5 px-3.5 text-xs font-bold rounded-xl transition active:scale-[0.985] whitespace-nowrap ${getBtnClass(btn.tone)}`}
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
          </div>
        ) : (
          <div className="flex-1 w-full">
            {activeTab === 1 && <SearchPanel onObjectLoaded={handleObjectLoaded} setActiveTab={handleTabChange} autoRunQuery={autoRunQuery} clearAutoRunQuery={clearAutoRunQuery} />}
            {activeTab === 2 && loadedObject && <PassportPanel okn={loadedObject} analogues={analogues} selectedAnalogId={selectedAnalogId} setSelectedAnalogId={setSelectedAnalogId} setActiveTab={handleTabChange} onObjectLoaded={handleObjectLoaded} />}
            {activeTab === 3 && loadedObject && <AnaloguesPanel okn={loadedObject} adjustments={adjustments} setAdjustments={setAdjustments} analogues={analogues} setAnalogues={setAnalogues} selectedAnalogId={selectedAnalogId} setSelectedAnalogId={setSelectedAnalogId} setActiveTab={handleTabChange} />}
            {activeTab === 4 && loadedObject && <IncomeApproachPanel okn={loadedObject} setActiveTab={handleTabChange} />}
            {activeTab === 5 && loadedObject && <CostApproachPanel okn={loadedObject} setActiveTab={handleTabChange} />}
            {activeTab === 6 && loadedObject && <ResultPanel okn={loadedObject} analogues={analogues} adjustments={adjustments} />}
          </div>
        )}
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
      </aside>
    </div>
  );
}
--- КОНЕЦ ФАЙЛА: src/App.tsx ---

--- СТАРТ ФАЙЛА: src/components/AnalogSummaryDashboard.tsx ---
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
--- КОНЕЦ ФАЙЛА: src/components/AnalogSummaryDashboard.tsx ---

--- СТАРТ ФАЙЛА: src/components/AnalogueCard.tsx ---
import React from 'react';

interface AnalogueCardProps {
  photoUrl?: string;
  address: string;
  price?: string | number;
  onOpen?: () => void;
  className?: string;
}

const AnalogueCard: React.FC<AnalogueCardProps> = ({
  photoUrl,
  address,
  price,
  onOpen,
  className = '',
}) => {
  return (
    <div className={`group rounded-xl overflow-hidden border bg-slate-900/60 cursor-pointer transition-all active:scale-[0.985] hover:border-slate-600 text-xs ${className}`}>
      {/* Image area — always an <img> element per requirements */}
      <img
        src={photoUrl || '/images/no-photo-placeholder.png'}
        alt={address}
        className="w-full h-48 object-cover rounded-t-xl"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/no-photo-placeholder.png';
        }}
      />

      {/* Info section — unchanged UI (address, price, button) */}
      <div className="p-3 space-y-1">
        <div className="font-black text-sm leading-tight line-clamp-2 text-white group-hover:text-sky-300">
          {address}
        </div>

        {price && (
          <div className="pt-0.5 text-emerald-400 font-mono text-[10px] font-bold whitespace-nowrap">
            {typeof price === 'number' ? `${(price / 1000000).toFixed(0)} млн ₽` : price}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.();
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 px-4 text-center text-sm font-medium mt-2 block w-full transition-colors"
        >
          Перейти к паспорту
        </button>
      </div>
    </div>
  );
};

export default AnalogueCard;
--- КОНЕЦ ФАЙЛА: src/components/AnalogueCard.tsx ---

--- СТАРТ ФАЙЛА: src/components/AnaloguesPanel.tsx ---
import React, { useState, useEffect, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  ArrowRight, 
  List, 
  Info, 
  AlertTriangle, 
  Trash2, 
  Plus, 
  X, 
  Check, 
  RotateCcw, 
  Copy, 
  Calculator,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { OknObject, Analogue, ManualAdjustment } from '../types';
import { LOCAL_MOCK_ANALOGUES, LOCAL_MOCK_ANALOGUES_ROSSIYA } from '../data/mockAnalogues';

interface AnaloguesPanelProps {
  okn: OknObject;
  adjustments: Record<string, ManualAdjustment>;
  setAdjustments: React.Dispatch<React.SetStateAction<Record<string, ManualAdjustment>>>;
  setActiveTab: (tab: number) => void;
  analogues: Analogue[];
  setAnalogues: (analogues: Analogue[]) => void;
  selectedAnalogId: string;
  setSelectedAnalogId: (id: string) => void;
}

interface AddAnalogFormData {
  address: string;
  area: string;
  year_built: string;
  walls_material: string;
  floors: string;
  base_price: string;
  is_okn: boolean;
  wear_pct: string;
}

const EMPTY_FORM: AddAnalogFormData = {
  address: '',
  area: '',
  year_built: '',
  walls_material: 'Кирпич',
  floors: '3',
  base_price: '',
  is_okn: false,
  wear_pct: '30',
};

const ADJ_FIELDS = [
  { id: 'area', label: 'Площадь' },
  { id: 'condition', label: 'Состояние' },
  { id: 'transport', label: 'Транспорт' },
  { id: 'view', label: 'Расположение' },
  { id: 'infrastructure', label: 'Назначение' }
] as const;

const getSimilarityScore = (target: OknObject, analog: Analogue): number => {
  let score = 100;
  
  const tArea = (target.area && !isNaN(target.area)) ? target.area : 1000;
  const aArea = (analog.area && !isNaN(analog.area)) ? analog.area : 1000;
  const areaDiff = Math.abs(tArea - aArea) / tArea;
  score -= Math.min(areaDiff * 30, 30);

  const tYear = (target.year_built && !isNaN(target.year_built)) ? target.year_built : 1900;
  const aYear = (analog.year_built && !isNaN(analog.year_built)) ? analog.year_built : 1900;
  const yearDiff = Math.abs(tYear - aYear);
  score -= Math.min(yearDiff * 0.5, 20);

  const tOkn = target.is_okn ? 1 : 0;
  const aOkn = (analog.is_okn === 1.0 || analog.is_okn === true || analog.is_okn === 1) ? 1 : 0;
  if (tOkn !== aOkn) score -= 25;

  const tWear = (target.wear_pct && !isNaN(target.wear_pct)) ? target.wear_pct : 30;
  const aWear = (analog.wear_pct && !isNaN(analog.wear_pct)) ? analog.wear_pct : 30;
  score -= Math.min(Math.abs(tWear - aWear) * 0.5, 10);

  return Math.max(45, Math.min(99, Math.round(score)));
};

const AnaloguesPanel: React.FC<AnaloguesPanelProps> = ({
  okn,
  adjustments,
  setAdjustments,
  setActiveTab,
  analogues,
  setAnalogues,
  selectedAnalogId,
  setSelectedAnalogId
}) => {
  const [filterOkn, setFilterOkn] = useState<'all' | 'okn' | 'non_okn'>('all');
  const [filterAreaTolerance, setFilterAreaTolerance] = useState<number>(30);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<AddAnalogFormData>(EMPTY_FORM);
  const [itemToDelete, setItemToDelete] = useState<Analogue | null>(null);
  const [deletedAnalogues, setDeletedAnalogues] = useState<Analogue[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [expandedPanelId, setExpandedPanelId] = useState<string>('');

  // Динамический цвет индикатора выбранных аналогов
  const getSelectionIndicatorClass = (count: number): string => {
    if (count === 0) {
      return 'bg-rose-500';
    }
    if (count <= 2) {
      return 'bg-amber-500';
    }
    // 3 и более — достаточно для расчёта
    return 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]';
  };

  const selectedIds = selectedAnalogId ? selectedAnalogId.split(',') : [];

  const calculateAdjustedPrice = (basePrice: number, adj: ManualAdjustment | undefined): number => {
    if (!adj) return basePrice || 0;
    const factor =
      (1 + (adj.area || 0) / 100) *
      (1 + (adj.condition || 0) / 100) *
      (1 + (adj.transport || 0) / 100) *
      (1 + (adj.view || 0) / 100) *
      (1 + (adj.infrastructure || 0) / 100);
    return Math.round((basePrice || 0) * factor);
  };

  // === Динамическая аналитика для дашборда ===
  const selectedAnalogues = useMemo(
    () => analogues.filter(a => selectedIds.includes(a.id)),
    [analogues, selectedIds]
  );
  const numSelected = selectedAnalogues.length;

  const avgOriginalPrice = useMemo(() => {
    if (numSelected === 0) return 0;
    const sum = selectedAnalogues.reduce((s, a) => s + (a.base_price || 0), 0);
    return sum / numSelected;
  }, [selectedAnalogues, numSelected]);

  const avgAdjustedPrice = useMemo(() => {
    if (numSelected === 0) return 0;
    const sum = selectedAnalogues.reduce((s, a) => {
      const adj = adjustments[a.id];
      return s + calculateAdjustedPrice(a.base_price || 0, adj);
    }, 0);
    return sum / numSelected;
  }, [selectedAnalogues, numSelected, adjustments]);

  useEffect(() => {
    const fetchAnalogues = async () => {
      setLoading(true);
      
      const allMocks = [...LOCAL_MOCK_ANALOGUES, ...LOCAL_MOCK_ANALOGUES_ROSSIYA];
      let baseMocks: Analogue[] = [];

      if (okn.name?.includes('Сретенский') || okn.id?.includes('sretenskiy')) {
        baseMocks = allMocks.slice(0, 7);
      } else if (okn.name?.includes('Колпачный') || okn.id?.includes('kolpachny')) {
        baseMocks = allMocks.slice(7, 14);
      } else if (okn.name?.includes('Спиридоновка') || okn.id?.includes('spiridonovka')) {
        baseMocks = allMocks.slice(14, 21);
      } else {
        baseMocks = allMocks;
      }

      let filtered = baseMocks.filter(analog => {
        if (filterOkn === 'okn' && analog.is_okn === 0.0) return false;
        if (filterOkn === 'non_okn' && analog.is_okn === 1.0) return false;
        
        const safeArea = (okn.area && !isNaN(okn.area)) ? okn.area : 1000;
        const minArea = safeArea * (1.0 - filterAreaTolerance / 100);
        const maxArea = safeArea * (1.0 + filterAreaTolerance / 100);
        return analog.area >= minArea && analog.area <= maxArea;
      });

      if (filtered.length < 5) {
        filtered = baseMocks;
      }

      filtered = filtered.map(analog => {
        const similarity = getSimilarityScore(okn, analog);
        const safeBasePrice = analog.base_price && !isNaN(analog.base_price) ? analog.base_price : 0;
        const safeArea = analog.area && !isNaN(analog.area) && analog.area > 0 ? analog.area : 1;
        
        return {
          ...analog,
          similarity,
          price_per_sqm: Math.round(safeBasePrice / safeArea)
        };
      });

      filtered.sort((a, b) => b.similarity - a.similarity);

      setAnalogues(filtered);
      if (filtered.length > 0 && !selectedAnalogId) {
        const top5Ids = filtered.slice(0, 5).map(a => a.id).join(',');
        setSelectedAnalogId(top5Ids);
      }
      setLoading(false);
    };

    fetchAnalogues();
  }, [okn, filterOkn, filterAreaTolerance]);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedAnalogId(selectedIds.filter(x => x !== id).join(','));
    } else {
      setSelectedAnalogId([...selectedIds, id].join(','));
    }
  };

  useEffect(() => {
    selectedIds.forEach(id => {
      if (!adjustments[id]) {
        setAdjustments(prev => ({
          ...prev,
          [id]: { area: -5, condition: 10, transport: 0, view: 5, infrastructure: 0, justification: 'Автоматическая поправка на масштаб и состояние' }
        }));
      }
    });
  }, [selectedAnalogId]);

  const formatPrice = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return '0 ₽';
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(2)} млрд ₽`;
    if (val >= 1_000_000) return `${Math.round(val / 1_000_000)} млн ₽`;
    return new Intl.NumberFormat('ru-RU').format(val) + ' ₽';
  };

  const isAllJustificationsValid = () => {
    if (selectedIds.length === 0) return false;
    for (const id of selectedIds) {
      const activeAdj = adjustments[id];
      if (!activeAdj) continue;
      const hasCorrections = activeAdj.area !== 0 || activeAdj.condition !== 0 || activeAdj.transport !== 0 || activeAdj.view !== 0 || activeAdj.infrastructure !== 0;
      if (hasCorrections && activeAdj.justification.trim().length < 5) return false;
    }
    return true;
  };

  const handleDeleteAnalog = (id: string) => {
    const analog = analogues.find(a => a.id === id);
    if (analog) setItemToDelete(analog);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    setDeletedAnalogues(prev => [itemToDelete, ...prev]);
    const updated = analogues.filter(a => a.id !== itemToDelete.id);
    setAnalogues(updated);

    if (selectedIds.includes(itemToDelete.id)) {
      const nextIds = selectedIds.filter(x => x !== itemToDelete.id);
      setSelectedAnalogId(nextIds.length > 0 ? nextIds.join(',') : updated.length > 0 ? updated[0].id : '');
    }
    setItemToDelete(null);
  };

  const handleRestoreLast = () => {
    if (deletedAnalogues.length === 0) return;
    const toRestore = deletedAnalogues[0];
    const newDeleted = deletedAnalogues.slice(1);
    const next = [...analogues, toRestore].sort((a, b) => b.similarity - a.similarity);
    setAnalogues(next);
    setDeletedAnalogues(newDeleted);
    setSelectedAnalogId([...selectedIds, toRestore.id].join(','));
  };

  const handleSliderChange = (id: string, field: keyof ManualAdjustment, value: number) => {
    setAdjustments(prev => ({
      ...prev,
      [id]: { ...(prev[id] || { area: 0, condition: 0, transport: 0, view: 0, infrastructure: 0, justification: '' }), [field]: value }
    }));
  };

  const handleJustificationChange = (id: string, value: string) => {
    setAdjustments(prev => ({
      ...prev,
      [id]: { ...(prev[id] || { area: 0, condition: 0, transport: 0, view: 0, infrastructure: 0, justification: '' }), justification: value }
    }));
  };

  const applyToAll = (sourceId: string) => {
    const sourceAdjs = adjustments[sourceId];
    if (!sourceAdjs) return;
    
    setAdjustments(prev => {
      const newAdjs = { ...prev };
      selectedIds.forEach(id => {
        if (id !== sourceId) {
          newAdjs[id] = { ...sourceAdjs };
        }
      });
      return newAdjs;
    });
  };

  const handleAddAnalog = () => {
    const area = parseFloat(addForm.area);
    const basePrice = parseFloat(addForm.base_price);
    const yearBuilt = parseInt(addForm.year_built, 10);
    const floors = parseInt(addForm.floors, 10);
    const wearPct = parseFloat(addForm.wear_pct);

    if (!addForm.address.trim() || isNaN(area) || isNaN(basePrice) || isNaN(yearBuilt)) return;

    const newAnalog: Analogue = {
      id: `manual-${Date.now()}`,
      address: addForm.address.trim(),
      area,
      year_built: yearBuilt,
      floors: isNaN(floors) ? 3 : floors,
      walls_material: addForm.walls_material || 'Кирпич',
      is_okn: addForm.is_okn ? 1.0 : 0.0,
      wear_pct: isNaN(wearPct) ? 30 : wearPct,
      dist_metro_min: 10,
      infrastructure_rate: 4.0,
      noise_rate: 2.5,
      parking: 0,
      view_rate: 3.5,
      base_price: basePrice,
      cyan_url: '',
      similarity: 99,
      price_per_sqm: (area && area > 0) ? Math.round(basePrice / area) : 0,
    };

    const updated = [newAnalog, ...analogues];
    setAnalogues(updated);
    setSelectedAnalogId(newAnalog.id);
    setShowAddModal(false);
    setAddForm(EMPTY_FORM);
  };

  const isAddFormValid = () => {
    const area = parseFloat(addForm.area);
    const basePrice = parseFloat(addForm.base_price);
    const yearBuilt = parseInt(addForm.year_built, 10);
    return (
      addForm.address.trim().length > 3 &&
      !isNaN(area) && area > 0 &&
      !isNaN(basePrice) && basePrice > 0 &&
      !isNaN(yearBuilt) && yearBuilt > 1700 && yearBuilt <= new Date().getFullYear()
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 space-y-4">
      
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md backdrop-blur-md shrink-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            <SlidersHorizontal className="h-6 w-6 text-sky-400" />
            Сравнительный подход (Шаг 3 из 6)
          </h1>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed font-medium bg-sky-900/20 p-4 rounded-xl border border-sky-500/20">
            Выберите подходящие аналоги для корректировки. Чем больше хороших аналогов вы выберете — тем точнее будет итоговая стоимость вашего объекта.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0">
          <Info className="h-4 w-4 text-sky-400 shrink-0" />
          <span className="text-xs text-slate-300 font-medium">Охранный статус имеет двойной вес</span>
        </div>
      </div>

      {/* Сводная аналитика по выборке — динамическая панель */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <BarChart3 className="h-5 w-5 text-cyan-400" />
          <div className="text-lg font-semibold text-white tracking-tight">Сводная аналитика по выборке</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* 1. Количество выбранных аналогов */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-cyan-400/80 mb-1.5">
              Количество выбранных аналогов
            </div>
            <div
              className="text-5xl font-black font-mono text-cyan-400 tabular-nums tracking-[-2px] leading-none"
              style={{ textShadow: '0 0 14px rgba(34,211,238,0.55)' }}
            >
              {numSelected}
            </div>
          </div>

          {/* 2. Средняя исходная цена */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-cyan-400/80 mb-1.5">
              Средняя исходная цена
            </div>
            <div
              className="text-5xl font-black font-mono text-cyan-400 tabular-nums tracking-[-2px] leading-none"
              style={{ textShadow: '0 0 14px rgba(34,211,238,0.55)' }}
            >
              {(avgOriginalPrice / 1_000_000_000).toFixed(2)}
            </div>
            <div className="text-[11px] text-cyan-400/70 font-medium mt-1">млрд ₽</div>
          </div>

          {/* 3. Средняя СКОРРЕКТИРОВАННАЯ цена */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-400/80 mb-1.5">
              Средняя СКОРРЕКТИРОВАННАЯ цена
            </div>
            <div
              className="text-5xl font-black font-mono text-emerald-400 tabular-nums tracking-[-2px] leading-none"
              style={{ textShadow: '0 0 14px rgba(16,185,129,0.55)' }}
            >
              {(avgAdjustedPrice / 1_000_000_000).toFixed(2)}
            </div>
            <div className="text-[11px] text-emerald-400/70 font-medium mt-1">млрд ₽</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 shadow-md flex flex-col gap-4 h-full justify-between">
            
            <div className="flex flex-col gap-4 flex-1">
              <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${getSelectionIndicatorClass(selectedIds.length)}`}></div>
                  <span className="text-slate-200 font-bold text-sm">
                    Выбрано {selectedIds.length} из {analogues.length} аналогов.
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Мин. для расчета: 5</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <List className="h-4 w-4 text-sky-500" />
                  <span>Найденные аналоги ({analogues.length})</span>
                </h3>
                <div className="flex items-center gap-2">
                  {deletedAnalogues.length > 0 && (
                    <button onClick={handleRestoreLast} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white text-xs font-semibold transition-all shrink-0">
                      <RotateCcw className="h-3.5 w-3.5" /> Восстановить ({deletedAnalogues.length})
                    </button>
                  )}
                  <button onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30 hover:bg-sky-600/30 text-xs font-semibold transition">
                    <Plus className="h-3.5 w-3.5" /> Добавить аналог
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider">Статус:</span>
                  <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button onClick={() => setFilterOkn('all')} className={`px-3 py-1.5 rounded-md transition-colors ${filterOkn === 'all' ? 'bg-slate-700 text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Все</button>
                    <button onClick={() => setFilterOkn('okn')} className={`px-3 py-1.5 rounded-md transition-colors ${filterOkn === 'okn' ? 'bg-slate-700 text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>ОКН</button>
                    <button onClick={() => setFilterOkn('non_okn')} className={`px-3 py-1.5 rounded-md transition-colors ${filterOkn === 'non_okn' ? 'bg-slate-700 text-white font-bold shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Без ОКН</button>
                  </div>
                </div>

                <div className="hidden md:block w-[1px] h-6 bg-slate-800"></div>

                <div className="flex-1 flex items-center gap-3">
                  <div className="flex flex-col min-w-[120px]">
                    <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">Площадь (±{filterAreaTolerance}%)</span>
                    <span className="font-mono text-sky-400 text-xs font-bold mt-0.5">
                      {Math.round((okn.area || 1000) * (1 - filterAreaTolerance/100))} - {Math.round((okn.area || 1000) * (1 + filterAreaTolerance/100))} м²
                    </span>
                  </div>
                  <input type="range" min="10" max="50" step="5" value={filterAreaTolerance} onChange={(e) => setFilterAreaTolerance(Number(e.target.value))} className="flex-1 h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-sky-500" />
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3 flex-1">
                  <svg className="animate-spin h-8 w-8 text-sky-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span className="text-xs text-slate-400">Пересчет матрицы сходства k-NN...</span>
                </div>
              ) : analogues.length === 0 ? (
                <div className="text-center py-16 space-y-3 flex-1 flex flex-col justify-center">
                  <div className="text-slate-600 text-4xl">📭</div>
                  <p className="text-slate-400 text-sm">Нет объектов, соответствующих критериям</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar content-start">
                    {analogues.slice(0, visibleCount).map((analog) => {
                      const isSelected = selectedIds.includes(analog.id);
                      const isManual = analog.id.startsWith('manual-');
                      const pct = analog.similarity || 0;
                      const adjForCard = adjustments[analog.id];
                      const adjustedCard = calculateAdjustedPrice(analog.base_price || 0, adjForCard);

                      return (
                        <div
                          key={analog.id}
                          onClick={() => toggleSelection(analog.id)}
                          className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-3 group relative backdrop-blur-sm ${
                            isSelected
                              ? 'bg-slate-800 border-cyan-400 ring-2 ring-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                              : 'bg-slate-900/60 border-slate-700 opacity-70 hover:opacity-100 hover:border-slate-500 shadow-sm'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1">
                                {isManual && <span className="px-2 py-0.5 text-[9px] font-bold bg-purple-500/20 text-purple-400 rounded">РУЧНОЙ</span>}
                                <span className="text-[10px] text-slate-500 font-mono">Сходство</span>
                                <span className="leading-none">{pct}%</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1">
                            <div className="text-[11px] text-slate-400">Площадь: <span className="text-slate-200 font-bold">{analog.area?.toLocaleString('ru-RU')} м²</span></div>
                            <div className="text-[11px] text-slate-400">Год: <span className="text-slate-200 font-bold">{analog.year_built}</span></div>
                          </div>

                          <div className="flex justify-between items-end w-full mt-auto pt-3 border-t border-slate-800/60">
                            <div>
                              <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">Цена предложения</div>
                              <div className="font-black text-white font-mono tracking-tight text-lg leading-none">
                                {formatPrice(analog.base_price || 0)}
                              </div>
                              {isSelected && adjForCard && adjustedCard !== (analog.base_price || 0) && (
                                <div className="text-emerald-400 font-mono text-xs tracking-tight mt-0.5">
                                  Скорр.: {formatPrice(adjustedCard)}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteAnalog(analog.id); }} title="Удалить аналог" className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-sky-500 border-sky-500' : 'border-slate-600 group-hover:border-slate-400'}`}>
                                {isSelected && <Check className="h-4 w-4 text-white" />}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {visibleCount < analogues.length && (
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold rounded-xl transition-colors border border-slate-700/50"
                      >
                        Показать еще 6 аналогов
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar gap-4 pb-2">
          {selectedIds.length > 0 ? (
            <> 
              <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-xl flex flex-col h-fit shrink-0 overflow-hidden">
                <div className="p-4 bg-slate-800 border-b border-slate-700/80 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-emerald-400" />
                    <span>Корректировки ({selectedIds.length})</span>
                  </h3>
                </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/30">
                {selectedIds.map(id => {
                  const selectedAnalog = analogues.find(a => a.id === id);
                  if (!selectedAnalog) return null;
                  
                  const currentAdj = adjustments[id] || { area: 0, condition: 0, transport: 0, view: 0, infrastructure: 0, justification: '' };
                  
                  const safeBase = (selectedAnalog.base_price && !isNaN(selectedAnalog.base_price)) ? selectedAnalog.base_price : 0;
                  
                  const hasCorrections = currentAdj.area !== 0 || currentAdj.condition !== 0 || currentAdj.transport !== 0 || currentAdj.view !== 0 || currentAdj.infrastructure !== 0;
                  const isValid = !hasCorrections || (currentAdj.justification && currentAdj.justification.trim().length >= 5);
                  const isOpen = expandedPanelId === id;

                  return (
                    <div key={id} className={`border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'bg-slate-900 border-sky-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                      <div
                        className={`flex items-center justify-between cursor-pointer p-4 bg-slate-800/50 hover:bg-slate-800 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
                        onClick={() => setExpandedPanelId(isOpen ? '' : id)}
                      >
                        <p className="text-sm font-bold text-white leading-tight flex-1 min-w-0 truncate" title={selectedAnalog.address}>
                          {selectedAnalog.address}
                        </p>
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? 'rotate-180 bg-sky-500/10 text-sky-400' : 'bg-slate-700 text-slate-400'}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="p-4 border-t border-slate-700 bg-slate-900/30">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Корректировки</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); applyToAll(id); }}
                              className="text-[10px] font-bold text-indigo-400 hover:text-white flex items-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/30 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors"
                              title="Применить эти настройки ко всем выбранным аналогам"
                            >
                              <Copy className="w-3.5 h-3.5" /> Применить ко всем
                            </button>
                          </div>

                          {/* Динамическая скорректированная цена — неоновый emerald */}
                          <div className="mb-4 p-4 bg-slate-950 border border-emerald-500/40 rounded-xl shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                            <div className="text-[10px] font-bold uppercase tracking-[1px] text-emerald-400 mb-1 flex items-center gap-1.5">
                              <TrendingUp className="h-3.5 w-3.5" /> СКОРРЕКТИРОВАННАЯ ЦЕНА (мультипликативная модель)
                            </div>
                            <div className="text-3xl font-black text-emerald-400 tracking-[-1.5px] font-mono leading-none">
                              {formatPrice(calculateAdjustedPrice(safeBase, currentAdj))}
                            </div>
                            <div className="text-[10px] text-emerald-500/70 mt-1">Базовая × (1 + Площадь/100) × (1 + Состояние/100) × (1 + Транспорт/100) × ...</div>
                          </div>

                          <div className="space-y-4">
                            {ADJ_FIELDS.map(field => (
                              <div key={field.id} className="group">
                                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                                  <span>{field.label}</span>
                                  <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${currentAdj[field.id] > 0 ? 'bg-emerald-500/10 text-emerald-400' : currentAdj[field.id] < 0 ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                                    {currentAdj[field.id] > 0 ? '+' : ''}{currentAdj[field.id] || 0}%
                                  </span>
                                </div>
                                <input
                                  type="range"
                                  min="-30" max="30" step="5"
                                  value={currentAdj[field.id] || 0}
                                  onChange={(e) => handleSliderChange(id, field.id as keyof ManualAdjustment, Number(e.target.value))}
                                  className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-sky-500 group-hover:accent-sky-400 transition-colors"
                                />
                                <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                                  <span>-30%</span><span className="opacity-50">0%</span><span>+30%</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {hasCorrections && (
                            <div className="pt-4 border-t border-slate-700 mt-4">
                              <div className="flex justify-between items-center text-[11px] mb-2">
                                <span className="text-slate-300 font-bold uppercase tracking-wider">Обоснование (ФСО)</span>
                                {!isValid && <span className="text-red-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Обязательно</span>}
                              </div>
                              <textarea
                                rows={2}
                                value={currentAdj.justification}
                                onChange={(e) => handleJustificationChange(id, e.target.value)}
                                placeholder="Кратко опишите причину скидки или надбавки..."
                                className={`w-full p-3 bg-slate-950/80 border ${isValid ? 'border-slate-700 focus:border-sky-500' : 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]'} rounded-xl text-xs text-slate-200 focus:outline-none transition-colors resize-none`}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-slate-800 border-t border-slate-700/80 shrink-0 rounded-b-2xl relative group">
                <button
                  disabled={selectedIds.length < 5 || !isAllJustificationsValid()}
                  onClick={() => setActiveTab(4)}
                  className={`w-full py-4 px-8 font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 rounded-xl ${
                    selectedIds.length >= 5 && isAllJustificationsValid()
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-[0.98]' 
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <span>Далее: Доходный подход</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                
                {(selectedIds.length < 5 || !isAllJustificationsValid()) && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 border border-slate-700 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl flex items-center gap-2">
                    <Info className="h-4 w-4 text-sky-400" />
                    {selectedIds.length < 5 
                      ? `Выберите еще минимум ${5 - selectedIds.length} аналог(а)`
                      : "Укажите причину корректировки для каждого измененного аналога"
                    }
                  </div>
                )}
              </div>
            </div>
            </>
          ) : (
            <div className="text-center py-24 text-slate-500 text-sm h-full flex flex-col items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800 shadow-inner">
              <Calculator className="h-16 w-16 mb-4 opacity-30 text-sky-400" />
              <p className="max-w-[250px]">Выберите аналоги в левой панели для начала расчетов</p>
            </div>
          )}
        </div>

      </div>

      {/* Модальные окна (оставил без изменений) */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 animate-fadeIn" onClick={() => setItemToDelete(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white text-center mb-2">Удалить аналог?</h3>
            <p className="text-sm text-slate-400 text-center mb-6">Вы уверены?</p>
            <div className="flex gap-3">
              <button onClick={() => setItemToDelete(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition">Отмена</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold shadow-lg shadow-red-500/20 transition">Удалить</button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 animate-fadeIn" onClick={() => setShowAddModal(false)}>
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-sky-500/15 flex items-center justify-center"><Plus className="h-5 w-5 text-sky-400" /></div>
                <div>
                  <h2 className="text-sm font-bold text-white">Добавить аналог вручную</h2>
                  <p className="text-[10px] text-slate-500">Заполните данные объекта</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"><X className="h-5 w-5" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1.5">Адрес объекта *</label>
                <input type="text" value={addForm.address} onChange={(e) => setAddForm(prev => ({ ...prev, address: e.target.value }))} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-sky-500 transition" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1.5">Площадь (м²) *</label>
                  <input type="number" value={addForm.area} onChange={(e) => setAddForm(prev => ({ ...prev, area: e.target.value }))} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:border-sky-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1.5">Год постройки *</label>
                  <input type="number" value={addForm.year_built} onChange={(e) => setAddForm(prev => ({ ...prev, year_built: e.target.value }))} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:border-sky-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1.5">Цена (руб) *</label>
                  <input type="number" value={addForm.base_price} onChange={(e) => setAddForm(prev => ({ ...prev, base_price: e.target.value }))} className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:border-sky-500" />
                </div>
              </div>
              <label className="flex items-center gap-2.5 cursor-pointer group pt-2">
                <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all ${addForm.is_okn ? 'bg-sky-500 border-sky-500' : 'bg-slate-950 border-slate-700'}`} onClick={() => setAddForm(prev => ({ ...prev, is_okn: !prev.is_okn }))}>
                  {addForm.is_okn && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
                <span className="text-xs text-slate-300" onClick={() => setAddForm(prev => ({ ...prev, is_okn: !prev.is_okn }))}>Объект является ОКН</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-xs text-slate-400 hover:text-white border border-slate-800 rounded-xl hover:bg-slate-800 transition font-medium">Отмена</button>
              <button onClick={handleAddAnalog} disabled={!isAddFormValid()} className="px-6 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition shadow-lg disabled:bg-slate-800 disabled:text-slate-650 flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> Добавить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnaloguesPanel;
--- КОНЕЦ ФАЙЛА: src/components/AnaloguesPanel.tsx ---

--- СТАРТ ФАЙЛА: src/components/CashflowChart.tsx ---
import React, { useState } from 'react';
import { Lightbulb, BookOpen, Calculator } from 'lucide-react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from 'recharts';

export const CashflowChart: React.FC = () => {
  const [showMethodology, setShowMethodology] = useState(false);

  const data = [
    { year: '1 год', Базовый: 1.60, Оптимистичный: 1.68, Пессимистичный: 1.52, Стоимость: 19.7 },
    { year: '2 года', Базовый: 3.25, Оптимистичный: 3.44, Пессимистичный: 3.06, Стоимость: 19.7 },
    { year: '3 года', Базовый: 4.95, Оптимистичный: 5.29, Пессимистичный: 4.62, Стоимость: 19.7 },
    { year: '4 года', Базовый: 6.70, Оптимистичный: 7.23, Пессимистичный: 6.20, Стоимость: 19.7 },
    { year: '5 лет', Базовый: 8.50, Оптимистичный: 9.27, Пессимистичный: 7.80, Стоимость: 19.7 },
    { year: '6 лет', Базовый: 10.35, Оптимистичный: 11.41, Пессимистичный: 9.42, Стоимость: 19.7 },
    { year: '7 лет', Базовый: 12.26, Оптимистичный: 13.66, Пессимистичный: 11.06, Стоимость: 19.7 },
    { year: '8 лет', Базовый: 14.23, Оптимистичный: 16.02, Пессимистичный: 12.72, Стоимость: 19.7 },
    { year: '9 лет', Базовый: 16.26, Оптимистичный: 18.50, Пессимистичный: 14.40, Стоимость: 19.7 },
    { year: '10 лет', Базовый: 18.35, Оптимистичный: 21.10, Пессимистичный: 16.10, Стоимость: 19.7 },
    { year: '11 лет', Базовый: 20.50, Оптимистичный: 23.83, Пессимистичный: 17.82, Стоимость: 19.7 },
    { year: '12 лет', Базовый: 22.71, Оптимистичный: 26.70, Пессимистичный: 19.56, Стоимость: 19.7 },
  ];

  const CashflowTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const colorMap: Record<string, string> = {
      'Оптимистичный': '#0ea5e9',
      'Базовый': '#10b981',
      'Пессимистичный': '#f97316',
    };
    return (
      <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-3 text-xs shadow-2xl">
        <div className="font-medium text-slate-200 mb-1.5">{label}</div>
        {payload.map((entry: any, index: number) => {
          const seriesColor = colorMap[entry.dataKey] || '#64748b';
          return (
            <div key={index} className="flex items-center justify-between gap-3" style={{ color: seriesColor }}>
              <span>{entry.name}</span>
              <span className="font-mono font-semibold text-white tabular-nums">{Number(entry.value).toFixed(2)} млрд ₽</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">График окупаемости</h3>
            <p className="text-xs text-slate-400 mt-0.5">Накопленный ЧОД за 12 лет</p>
          </div>
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg transition-all text-xs font-medium"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Логика расчета
          </button>
        </div>
        <div className="text-[10px] px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-400 font-medium">
          млрд ₽
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${showMethodology ? 'max-h-[260px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-6 shadow-inner mb-6 backdrop-blur-sm">
          <div className="mb-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2"><BookOpen className="w-4 h-4" /> Концептуальная основа</div>
            <p className="text-[12.5px] leading-tight text-slate-200">Данный график визуализирует модель окупаемости инвестиций на стандартном 12-летнем горизонте прогнозирования. Использование трех сценариев (оптимистичный, базовый, пессимистичный) позволяет провести стресс-тестирование финансовой модели и оценить устойчивость девелоперского проекта к макроэкономическим колебаниям.</p>
          </div>
          <div className="pt-3 border-t border-slate-700">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-2 mt-5"><Calculator className="w-4 h-4" /> Методология и ФСО</div>
            <ul className="space-y-[5px] text-[12.5px] leading-tight">
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Базовый ЧОД 1-го года: 1.600 млрд ₽.</li>
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Арендопригодная площадь здания: 21 878 кв. м (Жилье 65%, Коммерция 25%).</li>
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Учтена нормативная вакантность помещений 12% и операционные расходы 25%.</li>
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Модель учитывает ежегодную индексацию арендных ставок на уровне 3%.</li>
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Расчет учитывает 3 сценария индексации ЧОД (1%, 3%, 5%).</li>
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Точка пересечения (окупаемости) достигается на 11-й год при ставке капитализации 10.5% (базовый сценарий).</li>
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Горизонт расчета 12 лет выбран как стандартный период окупаемости инвестиций в реставрацию. Пессимистичный прогноз (рост 1%) используется для стресс-тестирования финансовой модели.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full h-72 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 25, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: '#64748b', fontSize: 9 }}
              axisLine={{ stroke: '#475569' }}
              tickLine={{ stroke: '#475569' }}
              angle={-15}
              textAnchor="end"
              height={50}
              interval={0}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 10 }}
              axisLine={{ stroke: '#475569' }}
              tickLine={{ stroke: '#475569' }}
              domain={[0, 28]}
              width={30}
            />
            <Tooltip content={CashflowTooltip} />
            <Legend
              wrapperStyle={{ color: '#94a3b8', fontSize: '11px', paddingTop: '4px' }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="Оптимистичный"
              stroke="#0ea5e9"
              strokeDasharray="3 3"
              strokeWidth={2}
              name="Оптимистичный прогноз"
            />
            <Area
              type="monotone"
              dataKey="Базовый"
              stroke="#10b981"
              fill="url(#colorIncome)"
              strokeWidth={3}
              name="Базовый прогноз"
            />
            <Line
              type="monotone"
              dataKey="Пессимистичный"
              stroke="#f97316"
              strokeDasharray="3 3"
              strokeWidth={2}
              name="Пессимистичный прогноз"
            />
            <ReferenceLine
              y={19.7}
              stroke="#a78bfa"
              strokeDasharray="4 4"
              strokeWidth={2}
            >
              <Label
                value="Рыночная стоимость (19.7 млрд)"
                position="insideTopLeft"
                fill="#a78bfa"
                fontSize={12}
              />
            </ReferenceLine>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashflowChart;
--- КОНЕЦ ФАЙЛА: src/components/CashflowChart.tsx ---

--- СТАРТ ФАЙЛА: src/components/CostApproachPanel.tsx ---
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Hammer, MapPin, TrendingDown, Lightbulb, BookOpen, Calculator } from 'lucide-react';
import { OknObject } from '../types';

interface CostApproachPanelProps {
  okn: OknObject;
  setActiveTab: (tab: number) => void;
}

const CostApproachPanel: React.FC<CostApproachPanelProps> = ({ setActiveTab }) => {
  // === КОНСТАНТЫ (по задаче) ===
  const LAND_AREA = 5000;           // м² земли
  const LAND_PRICE = 640000;        // руб/м²
  const BUILDING_AREA = 24308;      // м² здания
  const BUILD_PRICE = 240000;       // руб/м² строительства (воссоздание)
  const PHYS_DEPR = 0.15;           // 15% физический износ
  const FUNC_DEPR = 0.10;           // 10% функциональный износ
  const ECON_DEPR = 0.05;           // 5% экономическое устаревание

  // === РАСЧЁТЫ С РЕАЛЬНЫМИ ФОРМУЛАМИ ===
  const landValue = LAND_AREA * LAND_PRICE;                                 // Стоимость земли = Площадь земли × Цена земли
  const replacementCost = BUILDING_AREA * BUILD_PRICE;                      // Стоимость строительства (замещения) = Площадь здания × Цена стройки
  const accumDepRate = PHYS_DEPR + FUNC_DEPR + ECON_DEPR;                   // Суммарная ставка износа
  const accumDepValue = replacementCost * accumDepRate;                     // Накопленный износ = Стоимость строительства × (физ + функц + экон)
  const costValue = landValue + (replacementCost - accumDepValue);          // Итоговая стоимость = Стоимость земли + (Стоимость строительства − Накопленный износ)

  // Форматтеры
  const formatBln = (n: number) => `${(n / 1_000_000_000).toFixed(2)} млрд ₽`;
  const formatPct = (n: number) => `${(n * 100).toFixed(0)}%`;

  // Доли износа для баров (в % от replacementCost)
  const physPct = PHYS_DEPR * 100;
  const funcPct = FUNC_DEPR * 100;
  const econPct = ECON_DEPR * 100;

  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6 animate-fadeIn">
      {/* Neon Dark Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
            <Hammer className="w-5 h-5 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Затратный подход</h1>
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg transition-all text-xs font-medium"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Логика расчета
          </button>
          <span className="ml-auto text-[10px] px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-slate-400 font-medium">ШАГ 5</span>
        </div>
        <p className="text-slate-400 text-sm">Расчёт восстановительной стоимости за вычетом всех видов накопленного износа + стоимость земельного участка. Все цифры — результат формул.</p>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${showMethodology ? 'max-h-[260px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-6 shadow-inner mb-6 backdrop-blur-sm">
          <div className="mb-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2"><BookOpen className="w-4 h-4" /> Концептуальная основа</div>
            <p className="text-[12.5px] leading-tight text-slate-200">Основой затратного подхода выступает принцип замещения. Рыночная стоимость объекта определяется как совокупность затрат на приобретение аналогичного земельного участка и возведение точной копии здания (восстановительная стоимость) за вычетом всех видов накопленного износа: физического, функционального и экономического.</p>
          </div>
          <div className="pt-3 border-t border-slate-700">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-2 mt-5"><Calculator className="w-4 h-4" /> Методология и ФСО</div>
            <p className="text-[12.5px] leading-tight">Расчет основан на восстановительной стоимости здания (УПВС). Накопленный износ декомпозирован на физический (экспертная оценка), функциональный (несоответствие современным планировкам) и экономический (внешние факторы).</p>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards - вывод по задаче */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Стоимость земельного участка */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-emerald-500/40 transition-all duration-200 group">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-medium text-slate-400">Стоимость земельного участка</div>
          </div>
          <div className="text-4xl font-black tabular-nums tracking-tighter text-emerald-400 group-hover:text-emerald-300 transition">{formatBln(landValue)}</div>
          <div className="mt-2 text-[10px] text-emerald-400/60 font-medium">Земля = Площадь земли × Цена за м²</div>
        </div>

        {/* 2. Стоимость замещения (строительства) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-cyan-500/40 transition-all duration-200 group">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Hammer className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm font-medium text-slate-400">Стоимость замещения</div>
          </div>
          <div className="text-4xl font-black tabular-nums tracking-tighter text-cyan-400 group-hover:text-cyan-300 transition">{formatBln(replacementCost)}</div>
          <div className="mt-2 text-[10px] text-cyan-400/60 font-medium">Восстановительная стоимость = Площадь здания × Цена строительства</div>
        </div>

        {/* 3. Накопленный износ */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-orange-500/40 transition-all duration-200 group">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <TrendingDown className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-sm font-medium text-slate-400">Накопленный износ</div>
          </div>
          <div className="text-5xl font-black tabular-nums tracking-tighter text-orange-400 group-hover:text-orange-300 transition">{formatPct(accumDepRate)}</div>
          <div className="mt-2 text-[10px] text-orange-400/60 font-medium">Сумма всех видов износа (физ. + функ. + экон.)</div>
        </div>
      </div>

      {/* Визуальный блок Декомпозиция износа с 3 прогресс-барами */}
      <div>
        <h3 className="text-lg font-semibold text-white tracking-tight mb-4">Декомпозиция износа здания</h3>
        <div className="space-y-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          {/* Физический износ */}
          <div>
            <div className="flex justify-between items-baseline text-sm mb-1.5">
              <span className="text-slate-300 font-medium">Физический износ</span>
              <span className="font-mono font-bold text-red-400 tabular-nums">{formatPct(PHYS_DEPR)} <span className="text-xs text-slate-500">({formatBln(replacementCost * PHYS_DEPR)})</span></span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${physPct}%` }} />
            </div>
          </div>

          {/* Функциональный износ */}
          <div>
            <div className="flex justify-between items-baseline text-sm mb-1.5">
              <span className="text-slate-300 font-medium">Функциональный износ</span>
              <span className="font-mono font-bold text-orange-400 tabular-nums">{formatPct(FUNC_DEPR)} <span className="text-xs text-slate-500">({formatBln(replacementCost * FUNC_DEPR)})</span></span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${funcPct}%` }} />
            </div>
          </div>

          {/* Экономическое устаревание */}
          <div>
            <div className="flex justify-between items-baseline text-sm mb-1.5">
              <span className="text-slate-300 font-medium">Экономическое устаревание</span>
              <span className="font-mono font-bold text-yellow-400 tabular-nums">{formatPct(ECON_DEPR)} <span className="text-xs text-slate-500">({formatBln(replacementCost * ECON_DEPR)})</span></span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div className="h-full bg-yellow-500 rounded-full transition-all" style={{ width: `${econPct}%` }} />
            </div>
          </div>

          {/* Итог накопленного износа */}
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Накопленный износ (всего)</span>
            <span className="font-mono text-orange-400 font-semibold">{formatPct(accumDepRate)} = {formatBln(accumDepValue)}</span>
          </div>
        </div>
      </div>

      {/* Итоговая стоимость по затратному подходу */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 text-center shadow-xl">
        <div className="text-xs uppercase tracking-[2px] text-amber-400/70 font-medium mb-1">ИТОГОВАЯ СТОИМОСТЬ (Затратный подход)</div>
        <div className="text-4xl font-black tabular-nums tracking-[-1.5px] text-amber-400 font-mono">{formatBln(costValue)}</div>
        <div className="text-[10px] text-slate-500 mt-1">Земля + (Стоимость строительства − Накопленный износ)</div>
      </div>

      {/* Navigation - обязательно сохраняем флоу шагов */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          onClick={() => setActiveTab(4)}
          className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-300 border border-slate-700 font-semibold rounded-xl flex items-center gap-2 transition active:scale-[0.985]"
        >
          <ArrowLeft className="h-4 w-4" /> Назад к Доходному подходу
        </button>
        <button
          onClick={() => setActiveTab(6)}
          className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition shadow-lg shadow-sky-900/50 flex items-center gap-2 active:scale-[0.985]"
        >
          Далее: Результат оценки <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CostApproachPanel;
--- КОНЕЦ ФАЙЛА: src/components/CostApproachPanel.tsx ---

--- СТАРТ ФАЙЛА: src/components/ErrorBoundary.tsx ---
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">💥</div>
            <h1 className="text-2xl font-bold mb-2">Что-то пошло не так</h1>
            <p className="text-slate-400 mb-6">
              Приложение столкнулось с ошибкой. Это может быть временная проблема или баг в одном из компонентов.
            </p>

            <button
              onClick={this.handleReload}
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition active:scale-[0.985]"
            >
              Перезагрузить страницу
            </button>

            <div className="mt-4 text-[10px] text-slate-500">
              Если ошибка повторяется — откройте консоль браузера (F12) и пришлите текст ошибки.
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                <summary className="cursor-pointer text-slate-400">Показать технические детали</summary>
                <pre className="mt-2 overflow-auto text-red-400 whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
--- КОНЕЦ ФАЙЛА: src/components/ErrorBoundary.tsx ---

--- СТАРТ ФАЙЛА: src/components/GlobalMap.tsx ---
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, RotateCcw, Calendar, Maximize2, AlertTriangle, Check, MapPin, ArrowRight, Maximize, Minimize 
} from 'lucide-react';
import OknImage from './OknImage';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { ALL_OBJECTS } from '../data/allObjects';

// Статусы ОКН (Federal/Regional/Local) — цвета: Federal=жёлтый, Local(Местного)=синий, Regional=зелёный.
// Demo fallback удалён. Логика getObjectType использует okn_category из данных.
// Согласовано с отображением в PassportPanel и Header.

interface MapOkn {
  id: string;
  name: string;
  address: string;
  type: 'Federal' | 'Regional' | 'Local';
  value: string;
  coordinates: [number, number];
  photosFolder?: string;
  year_built?: number;
  area?: number;
  wear_pct?: number;
}

interface GlobalMapProps {
  onOpenInPassport?: (id: string) => void;
  onAddToEvaluation?: (id: string) => void;
}

type MapStyle = 'dark' | 'vector' | 'satellite';

// Утилита для очистки названия от тире и лишнего мусора
const cleanOknName = (name: string) => {
  if (!name) return 'Объект культурного наследия';
  return name.split(' - ')[0].replace(/\s*-.*$/, '').trim();
};

// БАЗА ЗНАНИЙ ДЛЯ 37 ОБЪЕКТОВ (Решает проблему пустых фото)
const KNOWLEDGE_BASE = [
  { keys: ['арбат', '29'], folder: 'arbat_29', year: 1905, area: 2600, floors: 4 },
  { keys: ['перцов', 'перцовой', 'соймоновский'], folder: 'dom_pertsovoy', year: 1907, area: 3100, floors: 4 },
  { keys: ['колпачный', '5'], folder: 'kolpachny_5', year: 1890, area: 1240, floors: 3 },
  { keys: ['колпачный', '10'], folder: 'kolpachny_10', year: 1893, area: 1160, floors: 2 },
  { keys: ['лубянск', '15'], folder: 'lubyanskiy_15', year: 1888, area: 2200, floors: 4 },
  { keys: ['малый никитский', '6'], folder: 'maly_nikitskiy_6', year: 1897, area: 1640, floors: 3 },
  { keys: ['милютинский', '5'], folder: 'milyutinskiy_5', year: 1898, area: 1760, floors: 5 },
  { keys: ['мясницкая', '7', '22'], folder: 'myasnitskaya_7', year: 1898, area: 2510, floors: 4 },
  { keys: ['никитский', '11'], folder: 'nikitskiy_11', year: 1910, area: 1850, floors: 4 },
  { keys: ['остоженка', '21'], folder: 'ostozhenka_21', year: 1896, area: 1520, floors: 3 },
  { keys: ['подкопаевский', '4'], folder: 'podkopaevskiy_4', year: 1845, area: 890, floors: 2 },
  { keys: ['покровка', '22'], folder: 'pokrovka_22', year: 1766, area: 3400, floors: 3 },
  { keys: ['покровский', '5'], folder: 'pokrovskiy_5', year: 1894, area: 1280, floors: 3 },
  { keys: ['поварская', '22'], folder: 'povarskaya_22', year: 1904, area: 2100, floors: 2 },
  { keys: ['пречистенка', '8'], folder: 'prechistenka_8', year: 1812, area: 1900, floors: 3 },
  { keys: ['пятницкая', '17'], folder: 'pyatnitskaya_17', year: 1890, area: 1450, floors: 3 },
  { keys: ['спиридоновка', '3'], folder: 'spiridonovka_3_5', year: 1912, area: 1100, floors: 4 },
  { keys: ['спиридоновка', '12'], folder: 'spiridonovka_12', year: 1895, area: 1400, floors: 3 },
  { keys: ['спиридоновка', '17'], folder: 'spiridonovka_17', year: 1898, area: 2150, floors: 2 },
  { keys: ['спиридоновка', '21'], folder: 'spiridonovka_21', year: 1910, area: 1750, floors: 2 },
  { keys: ['садовая', 'каретная', '12'], folder: 'sadovaya_karetnaya_12', year: 1902, area: 2400, floors: 5 },
  { keys: ['самотечная', '8'], folder: 'samotechnaya_8', year: 1891, area: 1100, floors: 3 },
  { keys: ['солянка', '12'], folder: 'solyanka_12', year: 1915, area: 4500, floors: 6 },
  { keys: ['сретенский', '2'], folder: 'sretenskiy_2', year: 1888, area: 1300, floors: 3 },
  { keys: ['сретенский', '9'], folder: 'sretenskiy_9', year: 1906, area: 2800, floors: 5 },
  { keys: ['россия', '6/1', 'сретенский бульвар, 6'], folder: 'rossiya', year: 1901, area: 24308, floors: 5 },
  { keys: ['старосадский', '9'], folder: 'starosadskiy_9', year: 1870, area: 1800, floors: 3 },
  { keys: ['толмачевский', '4'], folder: 'tolmachevskiy_4', year: 1850, area: 980, floors: 3 },
  { keys: ['тверская', '15'], folder: 'tverskaya_15', year: 1940, area: 6000, floors: 7 },
  { keys: ['воздвиженка', '16'], folder: 'vozdvizhenka_16', year: 1899, area: 3200, floors: 3 },
  { keys: ['якиманский', '6'], folder: 'yakimanskiy_6', year: 1890, area: 1200, floors: 3 },
  { keys: ['фролов', '2'], folder: 'frolov_2', year: 1905, area: 950, floors: 4 },
  { keys: ['харитоньевский', '10'], folder: 'haritonevskiy_10', year: 1890, area: 4100, floors: 3 },
  { keys: ['хохловский', '7'], folder: 'hohlovskiy_7', year: 1780, area: 1600, floors: 2 },
  { keys: ['забелина', '3'], folder: 'zabelina_3', year: 1885, area: 1350, floors: 3 },
  { keys: ['златоустинский'], folder: 'zlatoustinskiy', year: 1901, area: 2100, floors: 4 },
  { keys: ['зубовский', '5'], folder: 'zubovsky_5', year: 1912, area: 3800, floors: 5 }
];

const getObjectKnowledge = (searchStr: string) => {
  const str = searchStr.toLowerCase();
  for (const kb of KNOWLEDGE_BASE) {
    if (kb.keys.every(key => str.includes(key))) return kb;
  }
  return null;
};

const GlobalMap: React.FC<GlobalMapProps> = ({ onOpenInPassport, onAddToEvaluation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Array<MapOkn['type']>>(['Federal', 'Regional', 'Local']);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<MapStyle>('dark');
  const [selectedForEvaluation, setSelectedForEvaluation] = useState<string[]>([]);
  
  // Состояния для фуллскрина
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapWrapperRef.current?.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const formatMarketValue = (basePrice: number): string => {
    if (!basePrice || basePrice <= 0) return '—';
    if (basePrice >= 1000000000) return `${(basePrice / 1000000000).toFixed(2)} млрд ₽`;
    return `${Math.round(basePrice / 1000000)} млн ₽`;
  };

  // Единая функция определения типа ОКН (Federal / Regional / Local).
  // Статусы обновлены на основе реальных проверенных данных (проверка 2026 года).
  // Использует okn_category / significance из ALL_OBJECTS.
  // Логика согласована с PassportPanel и Header (федеральный / региональный / местного).
  // По умолчанию 'Regional' только если нет явного признака.
  // 'Local' слот используется для "Местного (выявленные)" (синий цвет).
  const getObjectType = (obj: any): MapOkn['type'] => {
    const cat = String(
      obj.okn_category || obj.significance || obj.metadata?.significance || ''
    ).toUpperCase();
    const text = [
      cat,
      obj.description || '',
      obj.metadata?.description || '',
      obj.metadata?.history || '',
      obj.name || '',
      obj.address || '',
    ]
      .join(' ')
      .toUpperCase();

    // Федеральный
    if (
      cat.includes('ФЕДЕРАЛЬНОГО ЗНАЧЕНИЯ') ||
      cat.includes('ФЕДЕРАЛЬНОЕ ЗНАЧЕНИЕ') ||
      text.includes('ФЕДЕРАЛЬНОЕ ЗНАЧЕНИЕ') ||
      text.includes('ФЕДЕРАЛЬНОГО ЗНАЧЕНИЯ') ||
      text.includes('ФЕДЕРАЛЬНОЕ') ||
      text.includes('FEDERAL')
    ) {
      return 'Federal';
    }

    // Региональный
    if (
      cat.includes('РЕГИОНАЛЬНОГО ЗНАЧЕНИЯ') ||
      cat.includes('РЕГИОНАЛЬНОЕ ЗНАЧЕНИЕ') ||
      text.includes('РЕГИОНАЛЬНОГО ЗНАЧЕНИЯ') ||
      text.includes('РЕГИОНАЛЬНОЕ ЗНАЧЕНИЕ') ||
      text.includes('РЕГИОНАЛЬНОЕ') ||
      text.includes('REGIONAL')
    ) {
      return 'Regional';
    }

    // Местного (выявленные) (используем 'Local' слот -> синий цвет)
    if (
      cat.includes('НЕ ЯВЛЯЕТСЯ') ||
      cat.includes('НЕ ОКН') ||
      cat.includes('НЕТ СТАТУСА') ||
      cat.includes('СОВРЕМЕННЫЙ') || // для spiridonovka_12
      !cat.trim()
    ) {
      return 'Local';
    }

    // По умолчанию — Региональный (самый частый для объектов Москвы)
    return 'Regional';
  };

  const allObjects: MapOkn[] = useMemo(() => {
    return ALL_OBJECTS
      .filter((obj: any) => obj.coordinates && obj.coordinates.length === 2)
      .map((obj: any, index: number) => {
        // Определяем категорию строго по данным объекта на основе реальных okn_category (статусы 2026)
        const type = getObjectType(obj);

        const basePrice = 180000000 + (index * 95000000) + (index % 3) * 300000000;
        
        // Умный поиск папки для фото, даже если она не прописана в базе
        const kb = getObjectKnowledge(`${obj.id} ${obj.address} ${obj.name}`);

        return {
          id: obj.id,
          name: cleanOknName(obj.name),
          address: obj.address,
          type,
          value: formatMarketValue(basePrice),
          coordinates: obj.coordinates as [number, number],
          photosFolder: obj.photosFolder || kb?.folder || undefined,
          year_built: obj.year_built || kb?.year || 1890 + (index % 40),
          area: obj.area || kb?.area || 800 + (index * 120),
          wear_pct: obj.wear_pct || 20 + (index % 35),
        };
      });
  }, []);

  const filteredObjects = useMemo(() => {
    return allObjects.filter(obj =>
      (obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       obj.address.toLowerCase().includes(searchQuery.toLowerCase())) &&
      activeFilters.includes(obj.type)
    );
  }, [searchQuery, activeFilters, allObjects]);

  const toggleFilter = (type: MapOkn['type']) => {
    setActiveFilters(prev => prev.includes(type) ? (prev.length === 1 ? prev : prev.filter(t => t !== type)) : [...prev, type]);
  };

  const selectObject = (id: string) => setActiveId(id);

  const toggleEvaluation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedForEvaluation(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    if (!selectedForEvaluation.includes(id)) onAddToEvaluation?.(id);
  };

  // Неоновые полупрозрачные стили для статусов (согласованы с легендой и фильтрами)
  // После свопа: Local (Местного) = синий, Regional = зелёный (teal), Federal = amber
  const getTypeStyles = (type: MapOkn['type']) => {
    if (type === 'Federal') return 'bg-amber-500/10 text-amber-400 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.25)]';
    if (type === 'Local') return 'bg-blue-500/10 text-blue-400 border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.25)]';
    return 'bg-teal-500/10 text-teal-400 border border-teal-500/40 shadow-[0_0_10px_rgba(20,184,166,0.25)]';
  };

  const typeLabels: Record<MapOkn['type'], string> = { Federal: 'Федеральный', Regional: 'Региональный', Local: 'Местного (выявленные)' };

  // Динамический цвет маркера строго по типу (Federal=amber/жёлтый, Local=синий для "Местного (выявленные)", Regional=зелёный/teal)
  const getMarkerIcon = (type: MapOkn['type']) => {
    let color = '#14b8a6'; // teal-500 (зелёный для Regional)
    let shadow = 'rgba(20,184,166,0.5)';
    if (type === 'Federal') {
      color = '#f59e0b'; // amber-500
      shadow = 'rgba(245,158,11,0.5)';
    } else if (type === 'Local') {
      color = '#3b82f6'; // blue-500 (синий для Местного)
      shadow = 'rgba(59,130,246,0.5)';
    }
    return L.divIcon({
      className: '',
      html: `<div style="width:28px;height:28px;background:${color};border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;border:2.5px solid #fff;box-shadow:0 4px 12px ${shadow};"><svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  };

  const getWearColor = (wear: number) => {
    if (wear < 25) return 'text-emerald-400';
    if (wear < 45) return 'text-yellow-400';
    if (wear < 65) return 'text-orange-400';
    return 'text-red-400';
  };

  const resetMap = () => {
    setSearchQuery('');
    setActiveFilters(['Federal', 'Regional', 'Local']);
    setActiveId(null);
    setSelectedForEvaluation([]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/70 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xl font-black tracking-tighter">
            <MapPin className="w-6 h-6 text-emerald-400" /> ГЛОБАЛЬНАЯ КАРТА ОКН
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-mono">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            LIVE • {allObjects.length} объектов
          </div>
        </div>
        <button onClick={resetMap} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-700 hover:bg-slate-800 transition">
          <RotateCcw className="w-3.5 h-3.5" /> Сбросить карту
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div ref={mapWrapperRef} className={`relative bg-slate-900 ${isFullscreen ? 'h-screen w-screen z-[9999]' : 'border-b border-slate-800 h-[46vh] min-h-[400px]'}`}>
          <MapContainer key={mapStyle} center={[55.751244, 37.618423]} zoom={12} style={{ height: '100%', width: '100%' }} preferCanvas={true} attributionControl={false} zoomControl={false}>
            <TileLayer 
              url={mapStyle === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : mapStyle === 'satellite' ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"} 
            />
            {filteredObjects.map((obj) => (
              <Marker
                key={obj.id}
                position={obj.coordinates}
                icon={getMarkerIcon(obj.type)}
                eventHandlers={{ click: () => selectObject(obj.id) }}
              >
                <Popup closeButton={false}>
                  <div className="flex flex-col gap-3 w-[260px] cursor-default">
                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-700/60 shadow-inner group">
                      <OknImage photosFolder={obj.photosFolder} alt={obj.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className={`absolute top-2 left-2 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md backdrop-blur-md ${getTypeStyles(obj.type)}`}>
                        {typeLabels[obj.type]}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-[14px] text-white leading-tight line-clamp-2 mb-1">{obj.name}</h3>
                      <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{obj.address}</p>
                    </div>
                    <div className="flex flex-col pt-2 border-t border-slate-700/50">
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Рыночная стоимость</span>
                      <span className="text-emerald-400 font-mono text-[18px] font-black leading-none">{obj.value}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenInPassport?.(obj.id); if (isFullscreen) document.exitFullscreen(); }}
                      className="w-full mt-1 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] active:scale-95 flex justify-center items-center gap-2"
                    >
                      Перейти к паспорту <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <div className="absolute top-4 right-4 z-[1000] flex flex-col bg-slate-900/95 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
            {(['dark', 'vector', 'satellite'] as const).map((val) => (
              <button key={val} onClick={() => setMapStyle(val)} className={`px-4 py-2 text-xs font-semibold transition ${mapStyle === val ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                {val === 'dark' ? 'Тёмная' : val === 'vector' ? 'Вектор' : 'Спутник'}
              </button>
            ))}
          </div>

          <button
            onClick={toggleFullscreen}
            className="absolute bottom-6 right-4 z-[1000] p-3 bg-slate-900/90 text-slate-200 hover:text-white rounded-2xl border border-slate-700 hover:border-sky-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all active:scale-95 group backdrop-blur-md"
            title="На весь экран"
          >
            {isFullscreen ? <Minimize className="w-6 h-6 group-hover:text-sky-400 transition-colors" /> : <Maximize className="w-6 h-6 group-hover:text-sky-400 transition-colors" />}
          </button>

          {/* Плавающая легенда поверх карты */}
          <div className="absolute bottom-4 left-4 z-[1100] bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl p-3 text-[11px] shadow-xl pointer-events-auto">
            <div className="text-[10px] font-bold tracking-[0.5px] text-slate-400 mb-1.5">ЛЕГЕНДА</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0 ring-1 ring-amber-400/30"></span>
                <span className="text-slate-200">Федерального значения</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0 ring-1 ring-blue-400/30"></span>
                <span className="text-slate-200">Местного (выявленные)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal-500 flex-shrink-0 ring-1 ring-teal-400/30"></span>
                <span className="text-slate-200">Регионального значения</span>
              </div>
            </div>
          </div>
        </div>

        {/* СПИСОК КАРТОЧЕК ВНИЗУ */}
        <div className={`flex-1 flex flex-col overflow-hidden border-t border-slate-800 bg-slate-950 ${isFullscreen ? 'hidden' : 'flex'}`}>
          <div className="p-4 border-b border-slate-800 bg-slate-900/70 flex-shrink-0">
            <div className="relative mb-3 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск по названию, адресу или кадастру..." className="w-full bg-slate-950 border border-slate-700 focus:border-sky-500 rounded-2xl pl-10 pr-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none" />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {(['Federal', 'Regional', 'Local'] as const).map((type) => (
                <button 
                  key={type} onClick={() => toggleFilter(type)} 
                  className={`px-5 py-1.5 text-xs font-bold rounded-full transition-all ${activeFilters.includes(type) ? getTypeStyles(type).replace('shadow-lg', '') : 'border border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                >
                  {typeLabels[type]}
                </button>
              ))}
              <span className="ml-auto text-xs text-slate-500 font-mono">{filteredObjects.length} / {allObjects.length}</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredObjects.map((obj) => {
                const isSelected = selectedForEvaluation.includes(obj.id);
                const isActive = activeId === obj.id;
                const wearColor = getWearColor(obj.wear_pct || 30);

                return (
                  <div 
                    key={obj.id} id={`card-${obj.id}`} onClick={() => onOpenInPassport?.(obj.id)}
                    className={`group bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:border-sky-500/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-row min-h-[210px] shadow-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] ${isActive ? 'ring-2 ring-sky-500 scale-[1.01] shadow-[0_0_25px_rgba(14,165,233,0.25)]' : ''}`}
                  >
                    <div className="relative w-[150px] sm:w-[160px] flex-shrink-0 bg-slate-800 overflow-hidden">
                      <OknImage photosFolder={obj.photosFolder} alt={obj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className={`absolute top-3 left-3 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-lg backdrop-blur-md ${getTypeStyles(obj.type)}`}>
                        {typeLabels[obj.type]}
                      </div>
                      {isSelected && (
                        <div className="absolute bottom-3 right-3 bg-emerald-500/90 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-xl flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                          <Check className="w-3 h-3" /> В ОЦЕНКЕ
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0 bg-gradient-to-br from-slate-900 to-slate-950/80">
                      <div>
                        <h3 className="font-bold text-sm sm:text-[16px] text-white group-hover:text-sky-300 transition-colors leading-tight line-clamp-2 pr-2 mb-1">{obj.name}</h3>
                        <p className="text-slate-400 text-[11px] sm:text-xs leading-snug line-clamp-2">{obj.address}</p>

                        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800/60">
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider"><Calendar className="w-3 h-3" /> Год</span>
                            <span className="text-slate-200 text-xs font-semibold">{obj.year_built}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider"><Maximize2 className="w-3 h-3" /> Площадь</span>
                            <span className="text-slate-200 text-xs font-semibold">{obj.area} м²</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider"><AlertTriangle className="w-3 h-3" /> Износ</span>
                            <span className={`text-xs font-semibold ${wearColor}`}>{obj.wear_pct}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col gap-2">
                        <div className="flex items-end justify-between">
                          <div className="flex flex-col w-full">
                            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Стоимость</span>
                            <span className="text-emerald-400 font-mono text-[20px] sm:text-[22px] font-black tracking-tighter leading-none">{obj.value}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full mt-1">
                          <button
                            onClick={(e) => toggleEvaluation(obj.id, e)}
                            className={`flex-1 h-8 px-2 text-[10px] sm:text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm border active:scale-95 whitespace-nowrap overflow-hidden ${isSelected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'}`}
                          >
                            {isSelected ? <><Check className="w-3.5 h-3.5 shrink-0"/> В оценке</> : 'В оценку'}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); onOpenInPassport?.(obj.id); }}
                            className="flex-1 h-8 px-2 text-[10px] sm:text-[11px] font-bold bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition-all shadow-[0_0_10px_rgba(14,165,233,0.2)] hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] flex items-center justify-center gap-1 active:scale-95 whitespace-nowrap overflow-hidden"
                          >
                            Паспорт <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
--- КОНЕЦ ФАЙЛА: src/components/GlobalMap.tsx ---

--- СТАРТ ФАЙЛА: src/components/Header.tsx ---
import React, { useState, useEffect, useCallback, useRef } from 'react';

import { Activity, FileText, History, Landmark, MapPin, Search, User, X } from 'lucide-react';

import { ReportsJournalModal } from './ReportsJournalModal';
import { SearchHistoryModal } from './SearchHistoryModal';
import { UserProfileModal } from './UserProfileModal';

import { ALL_OBJECTS } from '../data/allObjects';

interface HeaderProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  targetObjectLoaded: boolean;
  currentObject?: any;
  username?: string;
  role?: string;
  onHistorySelect?: (cadastral: string) => void;
  sidebarActive?: boolean;
  onGlobalSearchSelect?: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  targetObjectLoaded,
  currentObject,
  username = "Иванов А. В.",
  role = "Ведущий оценщик ГБУ",
  onHistorySelect,
  sidebarActive = false,
  onGlobalSearchSelect
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const closeProfile = useCallback(() => setIsProfileOpen(false), []);
  const closeHistory = useCallback(() => setIsHistoryOpen(false), []);
  const closeReports = useCallback(() => setIsReportsOpen(false), []);

  useEffect(() => {
    const checkHistory = () => {
      const saved = localStorage.getItem('oknSearchHistory');
      try {
        setHasHistory(saved ? JSON.parse(saved).length > 0 : false);
      } catch (e) {
        setHasHistory(false);
      }
    };
    checkHistory();
    window.addEventListener('oknHistoryUpdated', checkHistory);
    window.addEventListener('storage', checkHistory);
    return () => {
      window.removeEventListener('oknHistoryUpdated', checkHistory);
      window.removeEventListener('storage', checkHistory);
    };
  }, []);

  // ЖЕЛЕЗОБЕТОННЫЙ ПОИСК ДЛЯ ШАПКИ (ИСПРАВЛЕН ПОИСК ПО КАДАСТРУ)
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      const lowerQuery = searchQuery.trim().toLowerCase();
      const results = ALL_OBJECTS.filter(obj => {
        const nameMatch = String(obj.name || '').toLowerCase().includes(lowerQuery);
        const addrMatch = String(obj.address || '').toLowerCase().includes(lowerQuery);
        const cadMatch = String(obj.cadastral_number || '').toLowerCase().includes(lowerQuery);
        const idMatch = String(obj.id || '').toLowerCase().includes(lowerQuery);
        return nameMatch || addrMatch || cadMatch || idMatch;
      }).slice(0, 5); 
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectObject = (id: string) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    if (onGlobalSearchSelect) {
      onGlobalSearchSelect(id);
    }
  };

  const tabs = [
    { id: 1, label: '1. Поиск объекта', disabled: false },
    { id: 2, label: '2. Цифровой паспорт', disabled: !targetObjectLoaded },
    { id: 3, label: '3. Сравнительный подход', disabled: !targetObjectLoaded },
    { id: 4, label: '4. Доходный подход', disabled: !targetObjectLoaded },
    { id: 5, label: '5. Затратный подход', disabled: !targetObjectLoaded },
    { id: 6, label: '6. Результат оценки', disabled: !targetObjectLoaded },
  ];

  const showGlobalSearch = !(activeTab === 1 && !sidebarActive);

  return (
    <>
      <header className="bg-slate-900 border-b border-slate-800 shadow-lg text-slate-100 sticky top-0 z-50">
        <style>{`
          @keyframes customPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.25; }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 pl-12 md:pl-0 gap-4">
            
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(1)}>
                <div className="bg-gradient-to-br from-sky-500 to-sky-700 p-2 rounded-lg text-slate-950 border border-sky-400/30">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-lg tracking-wider text-white">АРМ «ОЦЕНЩИК»</span>
                    <span className="bg-sky-500/10 text-sky-400 text-xs px-2 py-0.5 rounded font-mono border border-sky-500/20 hidden sm:inline-block">ОКН</span>
                  </div>
                  <p className="text-[10px] text-slate-400 tracking-tight uppercase hidden md:block">Единое окно оценки</p>
                </div>
              </div>

              {/* Persistent selected object indicator — visible on all tabs except search (tab 1) */}
              {targetObjectLoaded && currentObject && activeTab !== 1 && (
                <div
                  onClick={() => setActiveTab(2)}
                  className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-slate-900/80 border border-slate-700 hover:border-emerald-500/50 rounded-xl cursor-pointer transition group max-w-[260px] shadow-sm"
                  title={`Кликните, чтобы перейти в «Цифровой паспорт». КН: ${currentObject.cadastral_number || currentObject.cadastralNumber || 'не указан'}`}
                >
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition">
                    <Landmark className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate group-hover:text-emerald-300 transition leading-tight">
                      {(currentObject.name || '').split(' - ')[0].replace(/\s*-.*$/, '').trim() || 'Объект оценки'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate leading-none">
                      {currentObject.address ? currentObject.address.replace('г. Москва, ', '').slice(0, 35) + (currentObject.address.length > 35 ? '…' : '') : ''}
                    </div>
                  </div>
                  <span className={`ml-1 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded border flex-shrink-0 ${
                    String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('федеральн')
                      ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      : String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('не является') || String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('нет статуса')
                      ? 'bg-slate-500/10 text-slate-300 border-slate-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('федеральн') ? 'Фед.' : String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('не является') || String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('нет статуса') ? 'Не ОКН' : 'Рег.'}
                  </span>
                </div>
              )}
            </div>

            {showGlobalSearch ? (
              <div ref={searchRef} className="flex-1 max-w-md hidden sm:block relative z-[100]">
                <div className="relative group">
                  <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${isSearchFocused ? 'text-sky-400' : 'text-slate-500'}`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Найти другой объект ОКН..."
                    className="w-full bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(14,165,233,0.15)]"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                
                {isSearchFocused && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden animate-fadeIn backdrop-blur-md">
                    <div className="flex flex-col">
                      {suggestions.map((obj) => (
                        <div 
                          key={obj.id} 
                          onClick={() => handleSelectObject(obj.id)}
                          className="px-4 py-3 hover:bg-slate-800 border-b border-slate-800/50 last:border-0 cursor-pointer transition-colors flex items-start gap-3 group"
                        >
                          <div className="mt-0.5 shrink-0"><MapPin className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform" /></div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-200 truncate group-hover:text-white transition-colors">{obj.name || 'Объект оценки'}</h4>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{obj.address}</p>
                            {obj.cadastral_number && <p className="text-[10px] text-slate-500 font-mono mt-0.5">КН: {obj.cadastral_number}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-6">
                <div className="flex items-center space-x-2 bg-slate-950/40 px-3 py-1.5 rounded-full border border-slate-800 text-xs">
                  <Activity className="h-3.5 w-3.5 text-emerald-400 animate-[customPulse_2s_ease-in-out_infinite]" />
                  <span className="text-slate-400">Интеграции:</span>
                  <span className="text-emerald-400 font-medium">ЕГРН / ГИС ОГД</span>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              <button 
                onClick={() => setIsHistoryOpen(true)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition relative group cursor-pointer" 
                title="История поисков"
              >
                <History className="h-5 w-5" />
                {hasHistory && <span className="absolute bottom-[-4px] right-[-2px] h-2.5 w-2.5 bg-sky-500 rounded-full border-2 border-slate-900"></span>}
              </button>
              
              <button 
                onClick={() => setIsReportsOpen(true)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer" 
                title="Журнал отчетов"
              >
                <FileText className="h-5 w-5" />
              </button>

              <div className="h-8 w-[1px] bg-slate-800 hidden sm:block"></div>

              <div 
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center space-x-3 sm:bg-slate-950/30 sm:pl-2 sm:pr-3 sm:py-1.5 rounded-lg sm:border sm:border-slate-800/80 cursor-pointer hover:bg-slate-800 transition group"
              >
                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 sm:border border-slate-700 group-hover:bg-slate-900 group-hover:text-sky-300 transition">
                  <User className="h-4 w-4" />
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition">{username}</p>
                  <p className="text-[9px] text-slate-400 font-mono group-hover:text-slate-300 transition">{role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 border-t border-slate-800/60 overflow-x-auto hide-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 py-1.5 min-w-max" aria-label="Tabs">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id && !sidebarActive;
                return (
                  <button
                    key={tab.id}
                    disabled={tab.disabled}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-4 py-2 text-xs font-medium rounded-md transition-all duration-200 uppercase tracking-wider
                      ${isActive 
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-900/30' 
                        : tab.disabled 
                          ? 'text-slate-600 cursor-not-allowed opacity-50' 
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <UserProfileModal isOpen={isProfileOpen} onClose={closeProfile} />
      <SearchHistoryModal 
        isOpen={isHistoryOpen} 
        onClose={closeHistory} 
        onSelect={(cad) => {
          closeHistory();
          onHistorySelect?.(cad);
        }} 
      />
      <ReportsJournalModal isOpen={isReportsOpen} onClose={closeReports} />
    </>
  );
};
export default Header;
--- КОНЕЦ ФАЙЛА: src/components/Header.tsx ---

--- СТАРТ ФАЙЛА: src/components/IncomeApproachPanel.tsx ---
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Percent, TrendingUp, AlertTriangle, Lightbulb, BookOpen, Calculator, X, Building2, Wallet, PiggyBank, BarChart3, Home, ArrowUp, ArrowDown } from 'lucide-react';
import { OknObject } from '../types';

interface IncomeApproachPanelProps {
  okn: OknObject;
  setActiveTab: (tab: number) => void;
}

const IncomeApproachPanel: React.FC<IncomeApproachPanelProps> = ({ setActiveTab }) => {
  // === КОНСТАНТЫ (по задаче) ===
  const RENTABLE_AREA = 21878;      // м²
  const RENT_RATE = 120000;         // руб/м² в год
  const VACANCY_RATE = 0.12;        // 12%
  const OPEX_RATE = 0.25;           // 25%
  const CAP_RATE = 0.105;           // 10.5%

  // === РАСЧЁТЫ С РЕАЛЬНЫМИ ФОРМУЛАМИ ===
  const pvd = RENTABLE_AREA * RENT_RATE;                    // ПВД = Площадь * Ставка
  const dvd = pvd * (1 - VACANCY_RATE);                     // ДВД = ПВД * (1 - Вакантность)
  const noi = dvd * (1 - OPEX_RATE);                        // ЧОД = ДВД * (1 - OPEX)
  const incomeValue = noi / CAP_RATE;                       // Итоговая стоимость = ЧОД / Ставка капитализации

  // Доли для горизонтальной шкалы (от ДВД)
  const noiShare = (1 - OPEX_RATE) * 100;                   // доля ЧОД
  const opexShare = OPEX_RATE * 100;                        // доля OPEX

  // Форматтеры
  const formatBln = (n: number) => `${(n / 1_000_000_000).toFixed(2)} млрд ₽`;
  const formatPct = (n: number) => `${(n * 100).toFixed(1)}%`;

  const [showMethodology, setShowMethodology] = useState(false);
  const [showCalcModal, setShowCalcModal] = useState(false);

  // === Интерактивность для наглядности ===
  const [rentAdjustment, setRentAdjustment] = useState(0); // % изменения арендной ставки

  // === Что-если: корректировка арендной ставки (для интерактивного слайдера) ===
  const adjustedRentRate = RENT_RATE * (1 + rentAdjustment / 100);
  const adjustedPvd = RENTABLE_AREA * adjustedRentRate;
  const adjustedDvd = adjustedPvd * (1 - VACANCY_RATE);
  const adjustedNoi = adjustedDvd * (1 - OPEX_RATE);
  const adjustedValue = adjustedNoi / CAP_RATE;
  const valueDiff = adjustedValue - incomeValue;
  const valueDiffPct = incomeValue > 0 ? (valueDiff / incomeValue) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8 animate-fadeIn">
      {/* Простой и дружелюбный заголовок */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 bg-emerald-500/15 rounded-2xl flex items-center justify-center">
            <Home className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Сколько стоит здание по доходу от аренды?</h1>
            <p className="text-slate-400 mt-1 text-sm">Считаем, сколько денег объект может приносить каждый год, вычитаем расходы и пустые площади, а потом определяем, сколько за него готов заплатить инвестор.</p>
          </div>
          <button
            onClick={() => setShowMethodology(!showMethodology)}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 rounded-xl transition-all text-xs font-medium whitespace-nowrap"
          >
            <Lightbulb className="w-4 h-4" />
            Как мы считали
          </button>
        </div>
        <div className="text-[10px] text-slate-500">ШАГ 4 • Доходный подход</div>
      </div>

      {/* Простое объяснение (разворачивается по кнопке) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${showMethodology ? 'max-h-[220px] opacity-100 mb-2' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 text-sm leading-relaxed text-slate-300">
          <p><strong>Простыми словами:</strong> Мы смотрим, сколько денег в год может приносить здание от аренды. Вычитаем реалистичные потери от пустых помещений и все расходы на содержание. То, что остаётся — это «чистый доход». Дальше мы делим этот чистый доход на процент, который хочет зарабатывать инвестор. Получается рыночная стоимость.</p>
          <p className="mt-2 text-emerald-400/80 text-xs">Ставка 10,5% — это консервативная оценка с учётом того, что это объект культурного наследия (больше рисков и ограничений, чем у обычного здания).</p>
        </div>
      </div>

      {/* Простые и понятные ключевые цифры */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ожидаемая доходность */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-emerald-500/30 transition group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <Percent className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-sm font-medium text-slate-400">Ожидаемая доходность в год</div>
          </div>
          <div className="mt-3 text-4xl font-black tabular-nums tracking-tighter text-emerald-400 group-hover:text-emerald-300 transition">{formatPct(CAP_RATE)}</div>
          <div className="mt-1.5 text-[11px] leading-snug text-slate-400">Сколько процентов в год хочет получать инвестор от своих денег. Это как процент по вкладу, только для недвижимости.</div>
        </div>

        {/* Максимальный доход от аренды */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-cyan-500/30 transition group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-sm font-medium text-slate-400">Максимальный доход от аренды</div>
          </div>
          <div className="mt-3 text-3xl font-black tabular-nums tracking-tighter text-cyan-400 group-hover:text-cyan-300 transition">{formatBln(pvd)}</div>
          <div className="mt-1.5 text-[11px] leading-snug text-slate-400">Сколько можно было бы получить в год, если бы все площади были сданы по рыночной цене без простоев.</div>
        </div>

        {/* Пустующие площади */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-amber-500/30 transition group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-sm font-medium text-slate-400">Пустующие площади</div>
          </div>
          <div className="mt-3 text-4xl font-black tabular-nums tracking-tighter text-amber-400 group-hover:text-amber-300 transition">{formatPct(VACANCY_RATE)}</div>
          <div className="mt-1.5 text-[11px] leading-snug text-slate-400">Реалистичные потери: часть площадей может пустовать. Мы вычитаем их из максимального дохода.</div>
        </div>

        {/* Расходы на содержание */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-red-500/30 transition group">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/10 rounded-xl">
              <Wallet className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-sm font-medium text-slate-400">Расходы на содержание здания</div>
          </div>
          <div className="mt-3 text-4xl font-black tabular-nums tracking-tighter text-red-400 group-hover:text-red-300 transition">{formatPct(OPEX_RATE)}</div>
          <div className="mt-1.5 text-[11px] leading-snug text-slate-400">Коммунальные, ремонт, охрана, уборка и прочие расходы собственника (25% от дохода).</div>
        </div>
      </div>

      {/* Наглядная структура доходов и расходов */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight">Куда уходит доход от аренды?</h3>
            <p className="text-sm text-slate-400 mt-0.5">Из реального дохода после пустот (ДВД)</p>
          </div>
          <button
            onClick={() => setShowCalcModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 rounded-xl transition-all text-xs font-medium"
          >
            <Calculator className="w-3.5 h-3.5" />
            Подробнее о расчёте
          </button>
        </div>

        {/* Красивая визуализация: из 100 рублей */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-sm text-slate-400 mb-4">Представим, что после учёта пустующих площадей у нас есть 100 рублей дохода. Вот как они распределяются:</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Визуальный "пирог" через два больших блока */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <PiggyBank className="w-8 h-8 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-emerald-400">Чистый доход после расходов</div>
                    <div className="text-xs text-emerald-400/70">Остаётся владельцу</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-emerald-400 tabular-nums">{noiShare.toFixed(0)}</div>
                  <div className="text-[10px] text-emerald-400/70">рублей из 100</div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Wallet className="w-8 h-8 text-red-400" />
                  <div>
                    <div className="font-semibold text-red-400">Расходы на содержание здания</div>
                    <div className="text-xs text-red-400/70">Коммуналка, ремонт, уборка и т.д.</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-red-400 tabular-nums">{opexShare.toFixed(0)}</div>
                  <div className="text-[10px] text-red-400/70">рублей из 100</div>
                </div>
              </div>
            </div>

            {/* Визуальный бар + простое объяснение */}
            <div className="flex flex-col justify-center">
              <div className="h-10 rounded-2xl overflow-hidden flex border border-slate-700 shadow-inner">
                <div 
                  className="bg-emerald-500 flex items-center justify-center text-sm font-bold text-white transition-all"
                  style={{ width: `${noiShare}%` }}
                >
                  {noiShare.toFixed(0)}% чистыми
                </div>
                <div 
                  className="bg-red-500 flex items-center justify-center text-sm font-bold text-white transition-all"
                  style={{ width: `${opexShare}%` }}
                >
                  {opexShare.toFixed(0)}% на расходы
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-400 leading-snug">
                Чем меньше расходов и пустот — тем больше чистого дохода и тем дороже стоит здание для инвестора.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Премиальный блок "Попробуйте сами" */}
      <div className="relative bg-slate-900 border border-slate-700/60 rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgb(0,0,0,0.3)] overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.03] via-transparent to-emerald-500/[0.02] pointer-events-none" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-sky-500/20 to-blue-500/10 rounded-2xl border border-sky-500/20">
                <BarChart3 className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white tracking-tight">Что если арендная ставка изменится?</h3>
                <p className="text-sm text-slate-400 mt-1">Проверьте, насколько чувствительна стоимость к рыночным изменениям</p>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3">
              <div className="text-sm font-medium text-slate-300">Изменение арендной ставки</div>
              <div className={`text-3xl font-mono font-black tabular-nums tracking-tighter ${rentAdjustment >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {rentAdjustment > 0 ? '+' : ''}{rentAdjustment}<span className="text-xl align-super">%</span>
              </div>
            </div>

            <div className="relative px-1">
              <input
                type="range"
                min={-20}
                max={30}
                step={1}
                value={rentAdjustment}
                onChange={(e) => setRentAdjustment(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer accent-sky-400 border border-slate-700"
              />
              {/* Custom track overlay for premium feel */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-rose-500/50 via-sky-400/30 to-emerald-500/50 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="flex justify-between text-xs mt-2 px-0.5">
              <div className="flex items-center gap-1 text-rose-400">
                <ArrowDown className="w-3.5 h-3.5" /> −20% (пессимистично)
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                +30% (оптимистично) <ArrowUp className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Cards - Разница выделена сильнее всего */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Текущая */}
            <div className="group bg-slate-950/70 border border-slate-700 rounded-2xl p-5 transition-all hover:border-slate-600">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] text-slate-400 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" /> Текущая оценка
              </div>
              <div className="text-3xl font-black text-emerald-400 tabular-nums tracking-[-1.2px] mt-1">
                {formatBln(incomeValue)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5 leading-tight">При текущих рыночных условиях</div>
            </div>

            {/* Новый сценарий */}
            <div className="group bg-slate-950/70 border border-sky-500/30 rounded-2xl p-5 transition-all hover:border-sky-500/50">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] text-sky-400 mb-2">
                <div className="w-2 h-2 bg-sky-400 rounded-full" /> При новом сценарии
              </div>
              <div className="text-3xl font-black text-sky-400 tabular-nums tracking-[-1.2px] mt-1">
                {formatBln(adjustedValue)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5 leading-tight">
                ставка {rentAdjustment >= 0 ? '+' : ''}{rentAdjustment}%
              </div>
            </div>

            {/* Разница — самая заметная */}
            <div className={`group relative overflow-hidden bg-gradient-to-br ${valueDiff >= 0 
              ? 'from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/40' 
              : 'from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/40'} 
              border-2 rounded-2xl p-5 shadow-inner transition-all hover:scale-[1.01]`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[1.5px] text-white/70">
                  Разница
                </div>
                {valueDiff >= 0 
                  ? <ArrowUp className="w-5 h-5 text-emerald-400" /> 
                  : <ArrowDown className="w-5 h-5 text-rose-400" />}
              </div>

              <div className={`text-4xl font-black tabular-nums tracking-[-1.5px] mt-1 ${valueDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {valueDiff >= 0 ? '+' : ''}{formatBln(valueDiff)}
              </div>

              <div className={`text-sm font-semibold mt-2 ${valueDiff >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                {valueDiffPct >= 0 ? '+' : ''}{valueDiffPct.toFixed(1)}% к стоимости
              </div>

              <div className="absolute bottom-0 right-0 text-[60px] opacity-5 font-black tracking-tighter select-none">
                {valueDiff >= 0 ? '↑' : '↓'}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-slate-400">
            {valueDiff >= 0 
              ? "Выше ставки = выше стоимость. Инвесторы готовы платить больше за больший доход." 
              : "Ниже ставки = ниже стоимость. Рынок оценивает объект дешевле."}
          </div>
        </div>
      </div>

      {/* Итоговая стоимость — очень акцентная */}
      <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/40 rounded-3xl p-8 text-center shadow-2xl">
        <div className="uppercase tracking-[3px] text-emerald-400/70 text-xs font-medium mb-1">ИТОГОВАЯ ОЦЕНКА ПО ДОХОДНОМУ ПОДХОДУ</div>
        <div className="text-6xl font-black tabular-nums tracking-[-2px] text-emerald-400 font-mono drop-shadow-sm">{formatBln(incomeValue)}</div>
        <div className="mt-2 text-emerald-300/90 text-base">Это та сумма, которую, по нашим расчётам, готов заплатить инвестор за объект.</div>
        <div className="text-xs text-slate-400 max-w-lg mx-auto mt-3 leading-relaxed">
          Мы берём чистый доход, который остаётся после всех расходов и пустот, и делим его на ту доходность, которую хочет получать инвестор (10,5% в год). Это классический и очень надёжный способ оценки доходной недвижимости.
        </div>
      </div>

      {/* Модальное окно с полной логикой расчёта (спрятано за кнопкой) */}
      {showCalcModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowCalcModal(false)}>
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-bold text-white">Логика расчёта стоимости</h3>
              </div>
              <button
                onClick={() => setShowCalcModal(false)}
                className="p-1 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-sky-400 font-medium mb-3">Как мы пришли к стоимости (простыми словами)</div>
                <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
                  <div className="flex-1 bg-slate-900 border border-cyan-500/30 rounded-xl px-3 py-2 text-center">
                    <div className="text-[10px] text-cyan-400">Максимальный доход от аренды</div>
                    <div className="font-mono font-bold text-white">{formatBln(pvd)}</div>
                  </div>
                  <div className="text-slate-500 text-xs text-center">− 12%<br />пустот</div>
                  <div className="flex-1 bg-slate-900 border border-cyan-500/30 rounded-xl px-3 py-2 text-center">
                    <div className="text-[10px] text-cyan-400">Реальный доход после пустот</div>
                    <div className="font-mono font-bold text-white">{formatBln(dvd)}</div>
                  </div>
                  <div className="text-slate-500 text-xs text-center">− 25%<br />расходов</div>
                  <div className="flex-1 bg-emerald-900/20 border border-emerald-500/30 rounded-xl px-3 py-2 text-center">
                    <div className="text-[10px] text-emerald-400">Чистый доход</div>
                    <div className="font-mono font-bold text-emerald-400">{formatBln(noi)}</div>
                  </div>
                  <div className="text-slate-500 text-xs text-center">÷ 10,5%</div>
                  <div className="flex-1 bg-emerald-900/30 border border-emerald-500 rounded-xl px-3 py-2 text-center">
                    <div className="text-[10px] text-emerald-400">Стоимость</div>
                    <div className="font-mono font-black text-emerald-400 text-base">{formatBln(incomeValue)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs">
                <div className="font-medium text-slate-300 mb-2">Простая формула</div>
                <div className="space-y-1 text-slate-400">
                  <div>1. Считаем максимальный доход = площадь × рыночная ставка аренды</div>
                  <div>2. Вычитаем потери от пустых площадей (12%)</div>
                  <div>3. Вычитаем расходы на содержание (25%)</div>
                  <div>4. Получившийся чистый доход делим на ожидаемую доходность (10,5%)</div>
                </div>
                <div className="mt-3 text-[11px] text-emerald-400/80">
                  Чистый доход {formatBln(noi)} ÷ 10,5% = {formatBln(incomeValue)}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-snug">
                Инвестор смотрит: «Если я заплачу эту сумму, то буду получать чистыми примерно 10,5% в год». Чем выше чистый доход или ниже требуемая доходность — тем дороже объект.
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/30 flex justify-end">
              <button
                onClick={() => setShowCalcModal(false)}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-slate-800 hover:bg-slate-700 transition"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation - обязательно сохраняем флоу */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          onClick={() => setActiveTab(3)}
          className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-300 border border-slate-700 font-semibold rounded-xl flex items-center gap-2 transition active:scale-[0.985]"
        >
          <ArrowLeft className="h-4 w-4" /> Назад к Сравнительному подходу
        </button>
        <button
          onClick={() => setActiveTab(5)}
          className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition shadow-lg shadow-sky-900/50 flex items-center gap-2 active:scale-[0.985]"
        >
          Далее: Затратный подход <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default IncomeApproachPanel;
--- КОНЕЦ ФАЙЛА: src/components/IncomeApproachPanel.tsx ---

--- СТАРТ ФАЙЛА: src/components/OknImage.tsx ---
import React from 'react';
import { getPhotoFolder, PHOTO_FALLBACK } from '../utils/photoHelper';

interface OknImageProps {
  photosFolder?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

const OknImage: React.FC<OknImageProps> = ({
  photosFolder,
  alt,
  className = '',
}) => {
  const imgSrc = photosFolder
    ? `/photos/${photosFolder}/1.jpg`
    : PHOTO_FALLBACK;

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/images/no-photo-placeholder.png';
      }}
    />
  );
};

export default OknImage;
--- КОНЕЦ ФАЙЛА: src/components/OknImage.tsx ---

--- СТАРТ ФАЙЛА: src/components/PassportPanel.tsx ---
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  MapPin, Landmark, Hammer, Download, ArrowRight, 
  Calendar, Layers, X, Image as ImageIcon, Building, 
  Shield, ChevronLeft, ChevronRight, BrickWall, 
  Star, TrendingUp, Maximize, Minimize, Database,
  Ruler, Award, CheckCircle, AlertTriangle, Info, History
} from 'lucide-react';
import { OknObject, Analogue } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { LOCAL_MOCK_ANALOGUES, LOCAL_MOCK_ANALOGUES_ROSSIYA } from '../data/mockAnalogues';
import { ALL_OBJECTS } from '../data/allObjects';
import { getPhotoFolder } from '../utils/photoHelper';

const PHOTO_FALLBACK = '/images/no-photo-placeholder.png';

const cleanOknName = (name: string) => {
  if (!name) return 'Объект культурного наследия';
  return name.split(' - ')[0].replace(/\s*-.*$/, '').trim();
};

const KNOWLEDGE_BASE = [
  { keys: ['арбат', '29'], folder: 'arbat_29', year: 1905, area: 2600, floors: 6, material: 'Кирпич, лепнина', feature: 'Гостиница Я.М. Толстого. Сохранились уникальные кованые решетки балконов и эркеры.', history: 'Здание в стиле модерн, где останавливались деятели искусств начала XX века.' },
  { keys: ['перцов', 'перцовой', 'соймоновский'], folder: 'dom_pertsovoy', year: 1907, area: 3100, floors: 5, material: 'Кирпич, майолика', feature: 'Сказочные майоликовые панно на фасадах по эскизам С.В. Малютина.', history: 'Знаменитый «Дом-сказка», центр культурной жизни Москвы, где находилось кабаре «Летучая мышь».' },
  { keys: ['колпачный', '5'], folder: 'kolpachny_5', year: 1890, area: 1240, floors: 5, material: 'Кирпич с облицовкой', feature: 'Готические интерьеры и подлинные белокаменные своды допетровской эпохи.', history: 'Усадьба А.Л. Кнопа — яркий пример раннего московского неоготического модерна.' },
  { keys: ['колпачный', '10'], folder: 'kolpachny_10', year: 1893, area: 1160, floors: 2, material: 'Камень, кирпич', feature: 'Классическая анфиладная планировка и подлинные печи конца XIX века.', history: 'Жилой дом П.Н. Грибова, представляющий собой характерный образец фоновой исторической застройки Басманного района.' },
  { keys: ['лубянск', '15'], folder: 'lubyanskiy_15', year: 1888, area: 2200, floors: 5, material: 'Кирпич', feature: 'Оригинальные потолочные росписи в вестибюле и массивная чугунная лестница.', history: 'Доходный дом Московского купеческого общества, важная часть архитектурного ансамбля площади.' },
  { keys: ['малый никитский', '6'], folder: 'maly_nikitskiy_6', year: 1897, area: 1640, floors: 3, material: 'Кирпич, штукатурка', feature: 'Интерьеры в стиле ампир и изящная лепнина на потолках парадных залов.', history: 'Исторический особняк С.А. Тарасова. Пример классической дворянской усадьбы послепожарной Москвы.' },
  { keys: ['милютинский', '5'], folder: 'milyutinskiy_5', year: 1898, area: 1760, floors: 9, material: 'Кирпич', feature: 'Фасад украшен готическими эркерами и массивными розетками.', history: 'Здание телефонной станции Шведско-Датско-Русского общества. Уникальная промышленная архитектура.' },
  { keys: ['мясницкая', '7', '22'], folder: 'myasnitskaya_7', year: 1898, area: 2510, floors: 3, material: 'Кирпич, камень', feature: 'Великолепный портик с колоннами, формирующий красную линию улицы.', history: 'Усадьба Черткова — выдающийся памятник архитектуры классицизма, центр литературной Москвы XIX века.' },
  { keys: ['никитский', '11'], folder: 'nikitskiy_11', year: 1910, area: 1850, floors: 4, material: 'Кирпич, железобетон', feature: 'Новаторское для своего времени применение монолитных конструкций.', history: 'Доходный дом, сочетающий в себе черты позднего модерна и зарождающегося неоклассицизма.' },
  { keys: ['остоженка', '21'], folder: 'ostozhenka_21', year: 1896, area: 1520, floors: 2, material: 'Белый камень, кирпич', feature: 'Асимметричная композиция фасада и романтическая башенка.', history: 'Особняк Л.Н. Кекушева. Один из первых и ярчайших примеров стиля модерн в архитектуре Москвы.' },
  { keys: ['подкопаевский', '4'], folder: 'podkopaevskiy_4', year: 1845, area: 890, floors: 4, material: 'Дерево, каменный цоколь', feature: 'Редкий сохранившийся пример деревянного зодчества дореволюционной столицы.', history: 'Главный дом городской усадьбы, демонстрирующий быт московского купечества середины XIX века.' },
  { keys: ['покровка', '22'], folder: 'pokrovka_22', year: 1766, area: 3400, floors: 3, material: 'Кирпич, белый камень', feature: 'Уникальный для Москвы фасад в стиле елизаветинского барокко.', history: 'Дворец Апраксиных-Трубецких, известный как «Дом-комод». Одно из красивейших зданий XVIII века.' },
  { keys: ['покровский', '5'], folder: 'pokrovskiy_5', year: 1894, area: 1280, floors: 7, material: 'Кирпич', feature: 'Сохранились подлинные кованые козырьки и ограда внутреннего двора.', history: 'Городская усадьба на Бульварном кольце, отражающая переход от эклектики к модерну.' },
  { keys: ['поварская', '22'], folder: 'povarskaya_22', year: 1904, area: 2100, floors: 4, material: 'Камень, кирпич', feature: 'Потрясающие витражи, дубовые панели и мраморные камины в залах.', history: 'Особняк И.А. Миндовского. Непревзойденный шедевр Кекушева, бережно сохраненный благодаря размещению посольства.' },
  { keys: ['пречистенка', '8'], folder: 'prechistenka_8', year: 1812, area: 1900, floors: 3, material: 'Кирпич, штукатурка', feature: 'Шикарные потолочные плафоны и колоннада в парадных залах.', history: 'Усадьба Истоминых, восстановленная после пожара 1812 года. Яркий образец московского ампира.' },
  { keys: ['пятницкая', '17'], folder: 'pyatnitskaya_17', year: 1890, area: 1450, floors: 4, material: 'Кирпич', feature: 'Характерный фасад купеческого Замоскворечья с богатой рустовкой.', history: 'Купеческий особняк и торговый дом Гальперина, неразрывно связанный с коммерческой истории улицы.' },
  { keys: ['спиридоновка', '3'], folder: 'spiridonovka_3_5', year: 1912, area: 1100, floors: 2, material: 'Кирпич', feature: 'Изящные балконы с чугунным литьем в стиле модерн.', history: 'Доходный дом начала XX века. Фасад решен в сдержанных, но элегантных формах неоклассицизма.' },
  { keys: ['спиридоновка', '12'], folder: 'spiridonovka_12', year: 1895, area: 1400, floors: 12, material: 'Кирпич', feature: 'Строгий классический фасад скрывает сложные инженерные решения.', history: 'Исторический особняк в районе Патриарших прудов, принадлежавший состоятельным горожанам.' },
  { keys: ['спиридоновка', '17'], folder: 'spiridonovka_17', year: 1898, area: 2150, floors: 2, material: 'Камень, кирпич', feature: 'Готические интерьеры, оформленные при участии художника М.А. Врубеля.', history: 'Особняк З.Г. Морозовой — шедевр раннего московского модерна работы Ф.О. Шехтеля. Ныне Дом приемов МИД.' },
  { keys: ['спиридоновка', '21'], folder: 'spiridonovka_21', year: 1910, area: 1750, floors: 5, material: 'Белый камень, кирпич', feature: 'Фасад полностью облицован серым камнем в пропорциях Итальянского Ренессанса.', history: 'Дом Тарасова архитектора И.В. Жолтовского, стилизованный под палаццо Тьене в Виченце.' },
  { keys: ['садовая', 'каретная', '12'], folder: 'sadovaya_karetnaya_12', year: 1902, area: 2400, floors: 5, material: 'Кирпич', feature: 'Масштабный рустованный цоколь и богатый декор верхних этажей.', history: 'Крупный доходный комплекс А.Ф. Мейера, формирующий исторический масштаб Садового кольца.' },
  { keys: ['самотечная', '8'], folder: 'samotechnaya_8', year: 1891, area: 1100, floors: 4, material: 'Кирпич', feature: 'Резные деревянные двери и кованые ограждения парадной лестницы.', history: 'Пример добротного городского дома среднего класса дореволюционной постройки.' },
  { keys: ['солянка', '12'], folder: 'solyanka_12', year: 1915, area: 4500, floors: 7, material: 'Кирпич, железобетон', feature: 'Уникальная система многоуровневых сводчатых подвалов для хранения.', history: 'Комплекс доходных домов Московского купеческого общества. Масштабный проект неоклассицизма.' },
  { keys: ['сретенский', '2'], folder: 'sretenskiy_2', year: 1888, area: 1300, floors: 4, material: 'Кирпич', feature: 'Маскароны на фасаде и выразительные полукруглые слуховые окна.', history: 'Городская усадьба, встроенная в линию бульвара. Типичный пример московской эклектики.' },
  { keys: ['сретенский', '9'], folder: 'sretenskiy_9', year: 1906, area: 2800, floors: 3, material: 'Кирпич', feature: 'Оригинальная керамическая плитка в облицовке верхних этажей фасада.', history: 'Доходный дом с коммерческими помещениями на первом этаже. Образец рационального модерна.' },
  { keys: ['россия', '6/1', 'сретенский бульвар, 6'], folder: 'rossiya', year: 1901, area: 24308, floors: 6, material: 'Кирпич', feature: 'Собственная дореволюционная электростанция и система артезианских скважин.', history: 'Доходные дома страхового общества «Россия». Самое технически совершенное жилое здание Москвы начала XX века.' },
  { keys: ['старосадский', '9'], folder: 'starosadskiy_9', year: 1870, area: 1800, floors: 6, material: 'Кирпич', feature: 'Сложная система исторических дымоходов и изразцовые печи в стенах.', history: 'Ансамбль городской усадьбы в районе Ивановской горки, исторический центр московской лютеранской общины.' },
  { keys: ['толмачевский', '4'], folder: 'tolmachevskiy_4', year: 1850, area: 980, floors: 6, material: 'Кирпич', feature: 'Подлинные сводчатые перекрытия и оригинальная лепнина залов.', history: 'Усадьба Демидовых. Классический пример замоскворецкой дворянской архитектуры, бережно сохраненный до наших дней.' },
  { keys: ['тверская', '15'], folder: 'tverskaya_15', year: 1940, area: 6000, floors: 10, material: 'Кирпич, монолит', feature: 'Парадные сталинские интерьеры, высокие потолки и массивная гранитная облицовка.', history: 'Монументальное здание на главной улице столицы (ныне Мэрия Москвы). Символ сталинского ампира.' },
  { keys: ['воздвиженка', '16'], folder: 'vozdvizhenka_16', year: 1899, area: 3200, floors: 2, material: 'Камень, кирпич', feature: 'Экзотический фасад, полностью покрытый витиеватой лепниной и ракушками.', history: 'Особняк Арсения Морозова. Уникальное здание в испано-мавританском стиле, одно из самых необычных в столице.' },
  { keys: ['якиманский', '6'], folder: 'yakimanskiy_6', year: 1890, area: 1200, floors: 17, material: 'Кирпич', feature: 'Узорчатая фигурная кирпичная кладка фасада без применения штукатурки.', history: 'Историческая застройка Якиманки. Бывшее здание промышленной мануфактуры, позднее переоборудованное.' },
  { keys: ['фролов', '2'], folder: 'frolov_2', year: 1905, area: 950, floors: 6, material: 'Кирпич', feature: 'Оригинальные оконные переплеты из массива дуба и изящная ковка балконов.', history: 'Доходный дом в районе Сретенки. Скромный, но очень элегантный образец московского модерна.' },
  { keys: ['харитоньевский', '10'], folder: 'haritonevskiy_10', year: 1890, area: 4100, floors: 3, material: 'Кирпич, белый камень', feature: 'Невероятное богатство резьбы по камню и роскошные дворцовые парадные интерьеры.', history: 'Палаты Волкова (Дворец Юсуповых). Древнейший памятник гражданской архитектуры, в основе которого палаты XVII века.' },
  { keys: ['хохловский', '7'], folder: 'hohlovskiy_7', year: 1780, area: 1600, floors: 3, material: 'Кирпич', feature: 'Мощные каменные палаты древнерусского зодчества, частично скрытые за фасадом XIX века.', history: 'Усадьба Украинцевых. Уникальный многослойный памятник, в котором переплелись эпохи от XVII до XX веков.' },
  { keys: ['забелина', '3'], folder: 'zabelina_3', year: 1885, area: 1350, floors: 3, material: 'Кирпич', feature: 'Богатый рустованный фасад первого этажа и массивные декоративные карнизы.', history: 'Историческое здание на Ивановской горке, принадлежавшее представителям знатного московского купечества.' },
  { keys: ['златоустинский'], folder: 'zlatoustinskiy', year: 1901, area: 2100, floors: 8, material: 'Кирпич', feature: 'Дореволюционные цветные витражи на лестничных клетках и метлахская плитка в холле.', history: 'Бывшее подворье Златоустовского монастыря. Одно из самых выразительных зданий в переулках Лубянки.' },
  { keys: ['зубовский', '5'], folder: 'zubovsky_5', year: 1912, area: 3800, floors: 5, material: 'Кирпич', feature: 'Массивные эркеры, нависающие над широким тротуаром бульвара.', history: 'Огромный доходный дом на Садовом кольце. Характерный представитель солидного неоклассицизма предвоенной Москвы.' }
];

const getObjectKnowledge = (searchStr: string) => {
  const str = searchStr.toLowerCase();
  for (const kb of KNOWLEDGE_BASE) {
    if (kb.keys.every(key => str.includes(key))) return kb;
  }
  return null;
};


interface PassportPanelProps {
  okn: OknObject;
  analogues: Analogue[];
  selectedAnalogId: string;
  setSelectedAnalogId: (id: string) => void;
  setActiveTab: (tab: number) => void;
  onObjectLoaded: (obj: OknObject) => void;
}

const getMapAnaloguesForObject = (okn: OknObject): Analogue[] => {
  if (okn.id === 'okn-rossiya') return LOCAL_MOCK_ANALOGUES_ROSSIYA;
  const allMocks = [...LOCAL_MOCK_ANALOGUES, ...LOCAL_MOCK_ANALOGUES_ROSSIYA];
  if (okn.name?.includes('Сретенский') || okn.id === 'obj-1') return allMocks.slice(0, 7);
  if (okn.name?.includes('Колпачный') || okn.id === 'obj-9') return allMocks.slice(7, 14);
  return LOCAL_MOCK_ANALOGUES;
};

const shortAddress = (addr: string): string => {
  const s = addr.replace('г. Москва, ', '').replace('улица ', 'ул. ').replace('переулок', 'пер.').replace('бульвар', 'б-р');
  return s.length > 25 ? s.slice(0, 25) + '...' : s;
};

const getWearColorClass = (pct: number): string => {
  if (pct < 20) return "text-emerald-400 stroke-emerald-400";
  if (pct < 40) return "text-yellow-400 stroke-yellow-400";
  if (pct < 60) return "text-orange-400 stroke-orange-400";
  if (pct < 80) return "text-rose-500 stroke-rose-500";
  return "text-red-600 stroke-red-600";
};

const PassportPanel: React.FC<PassportPanelProps> = ({
  okn: passedOkn, analogues: propAnalogues, selectedAnalogId, setSelectedAnalogId, setActiveTab, onObjectLoaded
}) => {
  
  const enrichOkn = (obj: any) => {
    let fullObj = ALL_OBJECTS.find(o => o.id === obj.id) || obj;
    return { ...obj, ...fullObj };
  };

  const okn = useMemo(() => enrichOkn(passedOkn), [passedOkn]);
  
  const knowledge = useMemo(() => getObjectKnowledge(`${okn.id} ${okn.address} ${okn.name}`), [okn]);

  const details = useMemo(() => {
    const hash = String(okn.id).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return {
      floors: okn.floors,
      year: okn.year_built || okn.metadata?.year_built || knowledge?.year || (1880 + (hash % 40)),
      material: okn.walls_material || okn.metadata?.walls_material || knowledge?.material || 'Кирпич исторический',
      area: okn.area || okn.metadata?.area || knowledge?.area || (1000 + (hash % 2000)),
      historyText: knowledge?.history || 'Здание является ярким примером архитектуры конца XIX — начала XX века. Построено в период активной застройки исторического центра Москвы.',
      featureText: knowledge?.feature || 'Сохранилась подлинная планировочная структура и элементы фасадного декора.',
      folder: okn.photosFolder || knowledge?.folder || null
    };
  }, [okn, knowledge]);

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // States for the dynamic photo gallery powered by __PHOTOS_MAP__ (build-time fs scan)
  const [validPhotos, setValidPhotos] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapWrapperRef.current?.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  // Load real photos for current object using __PHOTOS_MAP__ injected by vite.config (build-time fs scan of public/photos)
  useEffect(() => {
    const folder = getPhotoFolder(okn?.id);
    if (!folder) {
      setValidPhotos([]);
      setCurrentPhotoIndex(0);
      return;
    }

    // @ts-ignore
    const rawFiles: string[] = __PHOTOS_MAP__[folder] || [];

    // Sort: file whose name (without extension) is exactly "1" (1.jpg, 1.jfif etc.) must be at index 0.
    // Other files follow in original (fs) order.
    const getBaseName = (filename: string): string => {
      const dotIdx = filename.lastIndexOf('.');
      return (dotIdx > 0 ? filename.substring(0, dotIdx) : filename).toLowerCase();
    };

    let fileList = [...rawFiles];
    const mainIndex = fileList.findIndex((f) => getBaseName(f) === '1');
    if (mainIndex > -1) {
      const mainFile = fileList.splice(mainIndex, 1)[0];
      fileList = [mainFile, ...fileList];
    }

    // Build final public URLs: /photos/<folder>/<filename>
    const photoUrls = fileList.map((filename) => `/photos/${folder}/${filename}`);

    setValidPhotos(photoUrls);
    setCurrentPhotoIndex(0);
  }, [okn?.id]);

  const wearPct = okn?.wear_pct || okn?.metadata?.wear_pct || 25;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (wearPct / 100) * circumference;

  // Улучшенные человеко-понятные категории и рекомендации (для обычных пользователей)
  const wearCategory = wearPct < 20 ? 'Хорошее' :
                       wearPct < 40 ? 'Удовлетворительное' :
                       wearPct < 60 ? 'Ограниченно-работоспособное' : 'Требует внимания';
  const wearColor = getWearColorClass(wearPct);

  const wearRecommendation = wearPct < 30 
    ? { text: 'Состояние стабильное. Рекомендуется плановый мониторинг раз в 3–5 лет.', tone: 'emerald', icon: CheckCircle }
    : wearPct < 50 
    ? { text: 'Состояние допустимое. Рекомендуется косметический ремонт и наблюдение за трещинами.', tone: 'yellow', icon: Info }
    : { text: 'Требуется техническое обследование специалистом. Возможны работы по усилению конструкций.', tone: 'rose', icon: AlertTriangle };

  const wearExplanation = wearPct < 30
    ? 'Конструкции в хорошем состоянии, несущая способность высокая. Объект готов к длительной эксплуатации.'
    : wearPct < 50
    ? 'Объект сохраняет несущую способность, но отдельные элементы требуют внимания. Безопасен при текущем использовании, нужен контроль.'
    : 'Несущая способность снижена в отдельных частях. Требуется профессиональное обследование перед серьёзными работами или сменой функции.';

  // Визуальный индикатор ценности/редкости (на основе износа + возраста + статуса)
  const isFederal = (okn.okn_category || '').toLowerCase().includes('федеральн');
  const isNoStatus = !okn.okn_category || (okn.okn_category || '').toLowerCase().includes('не является') || (okn.okn_category || '').toLowerCase().includes('нет статуса');
  const ageBonus = (details.year && details.year < 1900) ? 12 : (details.year && details.year < 1920) ? 6 : 0;
  const wearBonus = Math.max(0, 25 - wearPct / 2);
  const heritageScore = Math.min(98, Math.round(65 + ageBonus + wearBonus + (isFederal ? 8 : 0)));
  const heritageLabel = heritageScore > 88 ? 'Очень высокая' : heritageScore > 78 ? 'Высокая' : 'Значительная';

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const coords = useMemo((): [number, number] => {
    return (okn?.coordinates && okn.coordinates.length === 2) ? okn.coordinates as [number, number] : [55.7558, 37.6176];
  }, [okn]);

  const activeAnalogues = useMemo(() => propAnalogues.length > 0 ? propAnalogues : getMapAnaloguesForObject(okn), [propAnalogues, okn]);

  const dynAnalogCount = activeAnalogues.length;
  const dynDensityLevel = dynAnalogCount >= 10 ? 'Высокая' : dynAnalogCount < 5 ? 'Низкая' : 'Средняя';
  const isGoodTransport = (okn.address || '').toLowerCase().includes('арбат') || (okn.address || '').toLowerCase().includes('колпачный');
  const dynTransportQuality = isGoodTransport ? 'Отличная' : 'Средняя';
  const dynTransportTime = isGoodTransport ? 5 : 12;

  const ratingHash = String(okn.id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  let rawScore = 5.0 - (wearPct / 100) * 1.5 - ((ratingHash % 10) / 10) * 0.5;
  rawScore = Math.max(1.0, Math.min(5.0, rawScore));
  const ratingScore = rawScore.toFixed(1);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    let map = mapInstanceRef.current;
    if (!map) {
      map = L.map(mapContainerRef.current, { center: coords, zoom: 15, zoomControl: true, attributionControl: false });
      mapInstanceRef.current = map;
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 20 }).addTo(map);
      layersGroupRef.current = L.layerGroup().addTo(map);
    } else {
      map.flyTo(coords, 15, { animate: true });
    }

    const layers = layersGroupRef.current;
    if (layers) {
      layers.clearLayers();
      const createIcon = (isTarget: boolean) => L.divIcon({
        className: isTarget ? '' : 'cursor-pointer hover:scale-110 transition-transform',
        html: `<div style="width: ${isTarget ? 38 : 28}px; height: ${isTarget ? 38 : 28}px; background-color: ${isTarget ? '#9333ea' : '#2563eb'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><svg viewBox="0 0 24 24" fill="currentColor" style="width: ${isTarget ? 20 : 14}px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>`,
        iconSize: isTarget ? [38, 38] : [28, 28],
        iconAnchor: isTarget ? [19, 19] : [14, 14]
      });

      L.circle(coords, { radius: 500, color: '#ea580c', fillOpacity: 0.05, weight: 1.5 }).addTo(layers);
      L.circle(coords, { radius: 150, color: '#3b82f6', fillOpacity: 0.05, weight: 2 }).addTo(layers);
      L.circle(coords, { radius: 40, color: '#10b981', fillOpacity: 0.1, weight: 2 }).addTo(layers);

      L.marker(coords, { icon: createIcon(true) }).addTo(layers).bindPopup(`<b class="font-sans text-xs">${cleanOknName(okn.name)}</b>`);
      
      activeAnalogues.forEach(analog => {
        if (analog.id === okn.id) return;
        L.marker(analog.coordinates as [number, number] || coords, { icon: createIcon(false) })
          .addTo(layers).bindTooltip(shortAddress(analog.address || ''))
          .on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            let targetObj = ALL_OBJECTS.find(o => o.id === analog.id) || { ...analog, name: analog.address, cadastral_number: analog.id } as any;
            onObjectLoaded(targetObj);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
      });
    }
  }, [coords, activeAnalogues, okn, onObjectLoaded]);

  // Генерация Технического паспорта БТИ с использованием pdf-lib + кириллический шрифт
  const handleDownloadBti = async () => {
    setIsDownloading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4 portrait in points

      // Load Cyrillic-supporting font (DejaVuSans recommended)
      // NOTE: Place DejaVuSans.ttf inside public/fonts/ (available at runtime via /fonts/DejaVuSans.ttf; download from dejavu-fonts)
      let font;
      try {
        const fontUrl = '/fonts/DejaVuSans.ttf';
        const fontBytes = await fetch(fontUrl).then((res) => {
          if (!res.ok) throw new Error('Font file not found at ' + fontUrl);
          return res.arrayBuffer();
        });
        font = await pdfDoc.embedFont(fontBytes, { subset: true });
      } catch (fontErr) {
        console.warn('Could not load custom Cyrillic font, falling back to Helvetica (Cyrillic may render incorrectly):', fontErr);
        font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      }

      const { width, height } = page.getSize();
      const margin = 40;
      let y = height - margin;

      const drawText = (text: string, opts: { x?: number; y: number; size?: number; color?: any; maxWidth?: number }) => {
        const size = opts.size || 11;
        const x = opts.x || margin;
        page.drawText(String(text || ''), {
          x,
          y: opts.y,
          size,
          font,
          color: opts.color || rgb(0, 0, 0),
        });
      };

      const drawLine = (x1: number, y1: number, x2: number, y2: number, thickness = 0.5) => {
        page.drawLine({
          start: { x: x1, y: y1 },
          end: { x: x2, y: y2 },
          thickness,
          color: rgb(0, 0, 0),
        });
      };

      // Header
      drawText('ТЕХНИЧЕСКИЙ ПАСПОРТ', { y, size: 18, x: width / 2 - 80 });
      y -= 22;
      drawText('ОБЪЕКТА КУЛЬТУРНОГО НАСЛЕДИЯ', { y, size: 14, x: width / 2 - 95 });
      y -= 18;
      drawText('(Технический паспорт здания — форма БТИ)', { y, size: 10, x: width / 2 - 75 });
      y -= 20;

      // Double frame (official look)
      page.drawRectangle({ x: margin - 5, y: margin - 5, width: width - 2 * margin + 10, height: height - 2 * margin + 10, borderWidth: 1.5, borderColor: rgb(0,0,0) });
      page.drawRectangle({ x: margin, y: margin, width: width - 2 * margin, height: height - 2 * margin, borderWidth: 0.5, borderColor: rgb(0,0,0) });

      y -= 10;
      drawLine(margin + 10, y, width - margin - 10, y, 0.8);
      y -= 18;

      // Section 1: Общие сведения
      drawText('1. ОБЩИЕ СВЕДЕНИЯ', { y, size: 11 });
      y -= 18;

      const fields: Array<[string, string]> = [
        ['Наименование', cleanOknName(okn.name)],
        ['Адрес', okn.address || '—'],
        ['Кадастровый номер', okn.cadastral_number || okn.cadastralNumber || 'Не присвоен'],
        ['Общая площадь', `${details.area} м²`],
        ['Год постройки', String(details.year)],
        ['Этажность', String(okn.floors)],
        ['Материал стен', details.material],
      ];

      for (const [label, value] of fields) {
        drawText(label + ':', { y, size: 10, x: margin + 15 });
        drawText(value, { y, size: 10, x: margin + 140 });
        y -= 16;
      }

      y -= 8;
      drawLine(margin + 10, y, width - margin - 10, y, 0.5);
      y -= 18;

      // Section 2: Охранный статус и историко-культурная значимость
      drawText('2. ОХРАННЫЙ СТАТУС И ЗНАЧИМОСТЬ', { y, size: 11 });
      y -= 16;

      drawText('Охранный статус:', { y, size: 10, x: margin + 15 });
      drawText(okn.okn_category || (isNoStatus ? 'Не является объектом культурного наследия' : 'Объект культурного наследия регионального значения'), { y, size: 10, x: margin + 140 });
      y -= 16;

      // Short significance text (truncate if needed)
      const significance = (details.featureText || details.historyText || 'Объект представляет историко-культурную ценность.').slice(0, 180);
      drawText('Историко-культурная значимость:', { y, size: 10, x: margin + 15 });
      y -= 14;
      // Simple wrap for significance
      const sigLines = significance.match(/.{1,75}(\s|$)/g) || [significance];
      for (const line of sigLines.slice(0, 3)) {
        drawText(line.trim(), { y, size: 9, x: margin + 20 });
        y -= 13;
      }

      y -= 6;
      drawLine(margin + 10, y, width - margin - 10, y, 0.5);
      y -= 18;

      // Section 3: Техническое состояние
      drawText('3. ТЕХНИЧЕСКОЕ СОСТОЯНИЕ', { y, size: 11 });
      y -= 16;

      drawText('Физический износ:', { y, size: 10, x: margin + 15 });
      drawText(`${wearPct}%`, { y, size: 10, x: margin + 140 });
      y -= 16;

      let categoryText = 'Ограниченно-работоспособное';
      if (wearPct < 20) categoryText = 'Хорошее / удовлетворительное';
      else if (wearPct >= 60) categoryText = 'Неудовлетворительное — требуется обследование';

      drawText('Категория состояния:', { y, size: 10, x: margin + 15 });
      drawText(categoryText, { y, size: 10, x: margin + 140 });
      y -= 16;

      drawText('Рекомендация:', { y, size: 10, x: margin + 15 });
      const rec = wearPct < 30 
        ? 'Плановый мониторинг. Состояние стабильное.' 
        : wearPct < 50 
        ? 'Косметический ремонт + наблюдение.' 
        : 'Техническое обследование специалистом.';
      drawText(rec, { y, size: 9, x: margin + 140 });
      y -= 20;

      // Footer
      drawLine(margin + 10, y, width - margin - 10, y, 0.5);
      y -= 20;

      const today = new Date().toLocaleDateString('ru-RU');
      drawText(`Паспорт сформирован: ${today}`, { y, size: 9, x: margin + 15 });
      y -= 14;
      drawText('Ответственный: ____________________ /Иванов А.В./', { y, size: 9, x: margin + 15 });

      // Serialize and save
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Техпаспорт_БТИ_${okn.cadastral_number || okn.cadastralNumber || 'ОКН'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

    } catch (e) {
      console.error('PDF generation error (pdf-lib):', e);
      alert('Не удалось сформировать PDF. Убедитесь, что шрифт DejaVuSans.ttf доступен по /fonts/ (положите файл в public/fonts/DejaVuSans.ttf).');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start shadow-lg backdrop-blur-md">
        <div>
          <div className="flex items-center gap-4">
            <span className="border border-sky-600/50 text-sky-400 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{okn.okn_category || (isNoStatus ? 'БЕЗ СТАТУСА ОКН' : 'ОКН РЕГИОНАЛЬНОГО ЗНАЧЕНИЯ')}</span>
            <span className="text-slate-400 text-sm font-mono">{okn.cadastral_number || okn.cadastralNumber || <span className="text-slate-500">Не указан</span>}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold text-white tracking-tight">{cleanOknName(okn.name)}</h1>
          <p className="mt-2 flex items-center gap-2 text-slate-400 text-sm"><MapPin className="h-4 w-4" /> {okn.address}</p>
        </div>
        <button onClick={() => setActiveTab(3)} className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg active:scale-95 transition-all">
          Подобрать аналоги <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Секция с тремя основными карточками информации — теперь в едином grid-контейнере для аккуратного размещения side-by-side + full-width блоков */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Карточка 1: СВЕДЕНИЯ ИЗ РОСРЕЕСТРА И МОСГОРНАСЛЕДИЯ — возвращено к более простому и компактному виду */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col">
          <h2 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2 mb-4 flex items-center gap-2 uppercase tracking-[1px]">
            <Landmark className="h-4 w-4 text-sky-500 shrink-0" /> Сведения из Росреестра и Мосгорнаследия
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-center">
                <div className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Площадь</div>
                <div className="text-xl font-black text-white font-mono">{details.area} <span className="text-xs text-slate-500 font-medium">кв.м</span></div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-center">
                <div className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Год</div>
                <div className="text-xl font-black text-white font-mono">{details.year}</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-center">
                <div className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Этажность</div>
                <div className="text-xl font-black text-white font-mono">{okn.floors}</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-center">
                <div className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Материал</div>
                <div className="text-sm font-black text-white leading-tight">{details.material}</div>
              </div>
            </div>

            <div className="lg:col-span-1 bg-gradient-to-b from-indigo-900/20 to-sky-900/10 border border-indigo-800/40 rounded-xl p-3 flex flex-col shadow-inner">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-3 w-3 text-indigo-400" />
                <span className="text-[9px] font-bold tracking-wider text-indigo-300 uppercase">Особенность</span>
              </div>
              <p className="text-xs text-slate-300 leading-tight">
                {details.featureText}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <div className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Кадастровый номер</div>
              <div className="text-sm font-black text-white font-mono">{okn.cadastral_number || okn.cadastralNumber || 'Не указан'}</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <div className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Охранный статус</div>
              <div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${isFederal ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'}`}>
                  {okn.okn_category || (isNoStatus ? 'Без статуса ОКН' : 'ОКН регионального значения')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Карточка 2: ТЕХНИЧЕСКОЕ СОСТОЯНИЕ И ИЗНОС — нагляднее, с объяснениями и рекомендациями */}
        <div className="bg-slate-900/60 border border-slate-700/70 rounded-3xl p-6 shadow-lg flex flex-col">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase tracking-[1px] mb-4">
            <Hammer className="h-4 w-4 text-sky-400" /> Техническое состояние и износ
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Улучшенная круговая диаграмма (немного уменьшена для лёгкости) */}
            <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
              <svg width="128" height="128" className="transform -rotate-90 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
                {/* Фоновая окружность */}
                <circle cx="64" cy="64" r={radius} fill="transparent" stroke="#1e293b" strokeWidth={12} />
                {/* Цветная дуга износа */}
                <circle 
                  cx="64" cy="64" r={radius} 
                  fill="transparent" 
                  className={`transition-all duration-700 ${wearColor}`} 
                  strokeWidth={12} 
                  strokeDasharray={2*Math.PI*radius} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                />
              </svg>

              {/* Центральное значение */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-black tabular-nums tracking-[-1px] ${wearColor}`}>{wearPct}<span className="text-xl">%</span></span>
                <span className="text-[9px] uppercase tracking-[1.5px] text-slate-400 font-medium -mt-0.5">ИЗНОС</span>
                <span className={`mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${wearColor.includes('emerald') ? 'bg-emerald-500/10 text-emerald-400' : wearColor.includes('yellow') ? 'bg-yellow-500/10 text-yellow-400' : wearColor.includes('orange') ? 'bg-orange-500/10 text-orange-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {wearCategory}
                </span>
              </div>
            </div>

            {/* Объяснение + рекомендация — теперь понятные для обычного человека */}
            <div className="flex-1 space-y-3 min-w-0">
              {/* Что значит категория */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  <Info className="h-3.5 w-3.5" /> Что это значит
                </div>
                <p className="text-sm text-slate-300 leading-snug">{wearExplanation}</p>
              </div>

              {/* Рекомендация — динамическая, с цветом и иконкой */}
              <div className={`bg-slate-950/60 border rounded-2xl p-4 ${wearRecommendation.tone === 'emerald' ? 'border-emerald-500/30' : wearRecommendation.tone === 'yellow' ? 'border-yellow-500/30' : 'border-rose-500/30'}`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                  <wearRecommendation.icon className={`h-3.5 w-3.5 ${wearRecommendation.tone === 'emerald' ? 'text-emerald-400' : wearRecommendation.tone === 'yellow' ? 'text-yellow-400' : 'text-rose-400'}`} /> 
                  РЕКОМЕНДАЦИЯ
                </div>
                <p className={`text-sm leading-snug font-medium ${wearRecommendation.tone === 'emerald' ? 'text-emerald-300' : wearRecommendation.tone === 'yellow' ? 'text-yellow-300' : 'text-rose-300'}`}>
                  {wearRecommendation.text}
                </p>
              </div>
            </div>
          </div>

          {/* Кнопка скачивания паспорта — оставлена на месте, но стиль чуть современнее */}
          <button 
            onClick={handleDownloadBti} 
            disabled={isDownloading} 
            className="mt-5 w-full py-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 font-semibold rounded-2xl text-sm flex items-center justify-center gap-2 transition border border-slate-700/60 disabled:opacity-60 active:scale-[0.985]"
          >
            <Download className="h-4 w-4" /> 
            {isDownloading ? 'Формирование PDF...' : 'Скачать технический паспорт БТИ (PDF)'}
          </button>
        </div>

      {/* Карточка 3: ИСТОРИКО-КУЛЬТУРНАЯ ЗНАЧИМОСТЬ — 3 блока сохранены, бейдж и излишняя длина убраны */}
        <div className="col-span-1 lg:col-span-2 bg-slate-900/70 border border-emerald-500/25 shadow-[0_0_20px_rgba(52,211,153,0.1)] rounded-3xl p-6 relative overflow-hidden">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase tracking-[1px] mb-4">
            <Landmark className="h-4 w-4 text-emerald-400" /> Историко-культурная значимость
          </h2>

          {/* Разделён на 3 коротких смысловых блока (улучшение сохранено) */}
          <div className="space-y-4 text-sm leading-relaxed text-slate-300">
            {/* 1 */}
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-[1.5px] mb-1">
                <Star className="h-3.5 w-3.5 text-emerald-300" /> Архитектурная и художественная ценность
              </div>
              <p>
                {details.featureText} Фасады сохранили оригинальные декоративные элементы.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

            {/* 2 */}
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-[1.5px] mb-1">
                <History className="h-3.5 w-3.5 text-emerald-300" /> Историческая роль и контекст
              </div>
              <p>
                {details.historyText} Здание — часть истории центра Москвы.
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

            {/* 3 — чуть короче */}
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-[1.5px] mb-1">
                <Shield className="h-3.5 w-3.5 text-emerald-300" /> Охранный статус и ограничения
              </div>
              <p>
                {isNoStatus ? 'Объект не имеет статуса ОКН.' : `Объект в реестре культурного наследия (${okn.okn_category || 'регионального значения'}). Фасады, планировка и ценные элементы защищены. Работы требуют согласования с Москомнаследием, чтобы сохранить подлинность.`}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-6 shadow-md">
          <h2 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2 uppercase tracking-wide">
            <ImageIcon className="h-4 w-4 text-sky-500" /> Фотографии объекта
          </h2>
          
          {/* Главное фото: обернуто в relative контейнер, с кнопками навигации по бокам (только если >1 фото) */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-2xl flex items-center justify-center">
            <img 
              src={validPhotos.length > 0 ? validPhotos[currentPhotoIndex % validPhotos.length] : PHOTO_FALLBACK} 
              className="w-full h-full object-contain cursor-pointer transition-opacity" 
              onClick={() => setShowPhotoModal(true)} 
              onError={(e) => { e.currentTarget.src = PHOTO_FALLBACK; }} 
              alt="ОКН"
            />
            
            {validPhotos.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(p => (p - 1 + validPhotos.length) % validPhotos.length); }} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(p => (p + 1) % validPhotos.length); }} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Flex-лента миниатюр (overflow-x-auto, gap-2, mt-3). Активная миниатюра: ring-2 ring-sky-500 opacity-100, неактивные: opacity-60 hover:opacity-100 */}
          {validPhotos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto mt-3">
              {validPhotos.map((path, idx) => (
                <img 
                  key={idx} 
                  src={path} 
                  alt={`Миниатюра ${idx + 1}`} 
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`object-cover h-16 w-24 rounded-lg cursor-pointer transition-all shrink-0 ${idx === (currentPhotoIndex % validPhotos.length) ? 'ring-2 ring-sky-500 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
              ))}
            </div>
          )}
        </div>

        <div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-md">
          <h2 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Layers className="h-4 w-4 text-sky-500" /> Карта расположения, аналоги и статистика
          </h2>
          
          <div className="flex flex-col gap-6">
            <div ref={mapWrapperRef} className={`w-full relative rounded-xl overflow-hidden border border-slate-700 shadow-inner ${isFullscreen ? 'h-screen w-screen z-[9999] fixed inset-0' : 'h-[500px]'}`}>
              <div ref={mapContainerRef} className="w-full h-full" />
              <div className="absolute top-4 right-4 z-[700] bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-4 w-64 text-[10px] text-slate-200 shadow-2xl pointer-events-none">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">ЛЕГЕНДА</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full bg-purple-600 border border-white" /> <span className="text-white font-bold text-xs">Объект оценки</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full bg-blue-600 border border-white" /> <span className="text-white font-bold text-xs">Аналог</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full border-2 border-emerald-500 bg-emerald-500/20" /> <span className="text-xs">Охранная зона (40 м)</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-blue-500/15" /> <span className="text-xs">Зона регулирования (150 м)</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full border-2 border-orange-600 bg-orange-600/15" /> <span className="text-xs">Пешая доступность (500 м)</span></div>
                </div>
              </div>
              
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-6 right-4 z-[1000] p-3 bg-slate-900/90 text-slate-200 hover:text-white rounded-2xl border border-slate-700 hover:border-sky-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all active:scale-95 group backdrop-blur-md"
                title="На весь экран"
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6 group-hover:text-sky-400 transition-colors" />
                ) : (
                  <Maximize className="w-6 h-6 group-hover:text-sky-400 transition-colors" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              <div className="bg-slate-800/60 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-500 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Building className="w-4 h-4 text-sky-400" /> Район
                </div>
                <div className="text-slate-200 font-bold text-base leading-tight">Басманный район</div>
                <div className="text-[10px] text-slate-500 mt-2 uppercase font-mono">Москва</div>
              </div>
              
              <div className="bg-slate-800/60 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-500 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Shield className="w-4 h-4 text-emerald-400" /> Аналогов в базе
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-black text-white leading-none">{dynAnalogCount}</div>
                  <div className="text-xs text-slate-400 mb-1 font-mono">объектов</div>
                </div>
                <div className="mt-2 inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                  {dynDensityLevel} плотность
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-500 transition-colors">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <MapPin className="w-4 h-4 text-amber-400" /> Доступность
                </div>
                <div className="text-slate-200 font-bold text-sm leading-tight">{dynTransportQuality}</div>
                <div className="mt-2 w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full transition-all" style={{width: isGoodTransport ? '80%' : '45%'}}></div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 font-mono">~ {dynTransportTime} мин до метро</div>
              </div>

              <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/30 p-5 rounded-2xl flex flex-col justify-between hover:border-indigo-400/50 transition-colors relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity"><TrendingUp className="w-24 h-24 text-indigo-300"/></div>
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 relative z-10">
                  <TrendingUp className="w-4 h-4" /> Итоговый рейтинг
                </div>
                <div className="flex items-baseline gap-1 relative z-10">
                  <div className="text-3xl font-black text-white">{ratingScore}</div>
                  <div className="text-sm text-indigo-300">/ 5.0</div>
                </div>
                <div className="text-[10px] text-indigo-200 mt-2 font-mono uppercase font-bold relative z-10">Инвестиционный индекс</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 mt-6 flex justify-center">
          <button onClick={() => setActiveTab(3)} className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            Подобрать аналоги <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showPhotoModal && validPhotos.length > 0 && (
        <div className="fixed inset-0 z-[2000] bg-black/95 flex flex-col items-center justify-center" onClick={() => setShowPhotoModal(false)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={() => setShowPhotoModal(false)}><X className="w-8 h-8"/></button>
          <img 
            src={validPhotos.length > 0 ? validPhotos[currentPhotoIndex % validPhotos.length] : PHOTO_FALLBACK} 
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" 
            onClick={e => e.stopPropagation()} 
            alt="Увеличенное фото" 
          />
          {validPhotos.length > 1 && (
            <div className="absolute bottom-8 flex gap-4 bg-slate-900/80 px-6 py-2 rounded-full items-center" onClick={e => e.stopPropagation()}>
              <button onClick={() => setCurrentPhotoIndex(p => (p - 1 + validPhotos.length) % validPhotos.length)} className="text-white hover:text-sky-400 p-2"><ChevronLeft className="w-6 h-6"/></button>
              <span className="text-white font-mono">{(currentPhotoIndex % validPhotos.length) + 1} / {validPhotos.length}</span>
              <button onClick={() => setCurrentPhotoIndex(p => (p + 1) % validPhotos.length)} className="text-white hover:text-sky-400 p-2"><ChevronRight className="w-6 h-6"/></button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PassportPanel;
--- КОНЕЦ ФАЙЛА: src/components/PassportPanel.tsx ---

--- СТАРТ ФАЙЛА: src/components/ReportsJournal.tsx ---
import React, { useState, useEffect } from 'react';

import { FileText, FolderOpen, Trash2 } from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  timestamp: string;
  cadastral_number: string;
  content: string;
}

export const ReportsJournal: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);

  useEffect(() => {
    loadReports();
    window.addEventListener('focus', loadReports);
    return () => window.removeEventListener('focus', loadReports);
  }, []);

  const loadReports = () => {
    const saved = localStorage.getItem('oknReportsJournal');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleDownload = (report: ReportItem) => {
    try {
      const blob = new Blob([report.content], { type: 'application/msword' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Отчет_${report.cadastral_number || report.id}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Ошибка при скачивании файла", err);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Удалить отчет из журнала?")) {
      const newReports = reports.filter(r => r.id !== id);
      setReports(newReports);
      localStorage.setItem('oknReportsJournal', JSON.stringify(newReports));
    }
  };

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <FileText className="h-12 w-12 mb-4 opacity-50" />
        <p>Журнал отчетов пуст</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <div 
          key={report.id} 
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-slate-700 transition"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg shrink-0">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition truncate max-w-[200px] sm:max-w-[250px]" title={report.title}>
                {report.title}
              </h3>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Кадастр: {report.cadastral_number}
              </div>
              <div className="text-[10px] text-slate-500 mt-2">
                {report.timestamp}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition">
            <button 
              onClick={() => handleDownload(report)}
              className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-200 transition"
              title="Скачать DOCX"
            >
              <FolderOpen className="h-4 w-4" />
            </button>
            <button 
              onClick={(e) => handleDelete(report.id, e)}
              className="p-1.5 hover:bg-red-950 hover:text-red-400 rounded-md text-slate-500 transition"
              title="Удалить из журнала"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
--- КОНЕЦ ФАЙЛА: src/components/ReportsJournal.tsx ---

--- СТАРТ ФАЙЛА: src/components/ReportsJournalModal.tsx ---
import React, { useState, useEffect } from 'react';

import { Download, FileBadge, FileCheck, FileText, Trash2, X } from 'lucide-react';

interface ReportItem {
  id: string;
  title: string;
  timestamp: string;
  cadastral_number: string;
  content: string;
}

interface ReportsJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportsJournalModal: React.FC<ReportsJournalModalProps> = ({ isOpen, onClose }) => {
  const [reports, setReports] = useState<ReportItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadReports();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadReports = () => {
    const saved = localStorage.getItem('oknReportsJournal');
    if (saved) {
      try {
        setReports(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка парсинга журнала отчетов:", e);
      }
    }
  };

  const handleDownload = async (report: ReportItem) => {
    try {
      let blob;
      if (report.content.startsWith('data:')) {
        const res = await fetch(report.content);
        blob = await res.blob();
      } else {
        // Если это строка (наш HTML для DOCX)
        blob = new Blob([report.content], { type: 'application/msword' });
      }
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Отчет_${report.cadastral_number || report.id}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Ошибка при скачивании:", error);
      alert("Не удалось скачать файл.");
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Удалить отчет из журнала?")) {
      const newReports = reports.filter(r => r.id !== id);
      setReports(newReports);
      localStorage.setItem('oknReportsJournal', JSON.stringify(newReports));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-850 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
              <FileBadge className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Журнал отчетов</h2>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Сохраненные результаты оценки</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-950/50">
          {reports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <FileCheck className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-base font-bold text-slate-300 mb-2">Журнал пуст</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                Здесь будут появляться сформированные отчеты (DOCX) после завершения оценки объектов.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between group hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <FileText className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition truncate max-w-[200px] sm:max-w-[300px]" title={report.title}>
                        {report.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-mono font-medium text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                          Кадастр: {report.cadastral_number}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          {report.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleDownload(report)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 text-blue-400 hover:text-white rounded-lg transition-all text-xs font-bold active:scale-95"
                      title="Скачать DOCX"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Скачать</span>
                    </button>
                    <button 
                      onClick={(e) => handleDelete(report.id, e)}
                      className="p-2 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg text-slate-500 hover:text-red-400 transition-all active:scale-95"
                      title="Удалить из журнала"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        {reports.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-850 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500 font-mono">
              Всего отчетов: {reports.length}
            </span>
            <button 
              onClick={() => {
                if (window.confirm("Удалить все отчеты? Это действие необратимо.")) {
                  setReports([]);
                  localStorage.removeItem('oknReportsJournal');
                }
              }}
              className="text-xs text-red-400 hover:text-red-300 font-medium hover:underline underline-offset-4 transition-colors"
            >
              Очистить журнал
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
--- КОНЕЦ ФАЙЛА: src/components/ReportsJournalModal.tsx ---

--- СТАРТ ФАЙЛА: src/components/ResultPanel.tsx ---
import React, { useState, useMemo } from 'react';
import { TrendingUp, Cpu, Hammer, FileText, Sparkles, Sliders, HelpCircle, MapPin, Users, Bus, AlertTriangle, CheckCircle2, XCircle, Download, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { OknObject, Analogue, ValuationWeights, KkhParams } from '../types';
import { calculateKKH } from '../utils/calc';
import { CashflowChart } from './CashflowChart';
import { WeightsChart } from './WeightsChart';

interface ResultPanelProps {
  okn: OknObject;
  analogues: Analogue[];
  adjustments: Record<string, any>;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ okn, analogues, adjustments }) => {
  const [weights, setWeights] = useState<ValuationWeights>({
    comparative: 0.5,
    income: 0.3,
    cost: 0.2
  });

  const kkhParams: KkhParams = {
    historical_weight: okn?.kkh_params?.historical_weight || 1.0,
    architectural_rarity: okn?.kkh_params?.architectural_rarity || 1.0,
    public_awareness: okn?.kkh_params?.public_awareness || 1.0,
    constraint_points: okn?.kkh_params?.constraint_points || 1.0
  };

  const [isWeightHelpOpen, setIsWeightHelpOpen] = useState(false);

  // Состояния для экспорта PDF (акцентная кнопка)
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  // Состояния для чистой генерации DOCX (используем реальную библиотеку docx)
  const [isDocxExporting, setIsDocxExporting] = useState(false);
  const [docxSuccess, setDocxSuccess] = useState<string | null>(null);

  const confidenceLevel = 5;

  const comparativeValue = useMemo(() => {
    const fallbackArea = (okn?.area && okn.area > 0) ? okn.area : 1000;
    const fallbackComparative = fallbackArea * 350000;

    const safeAnalogues = Array.isArray(analogues) ? analogues : [];
    if (safeAnalogues.length === 0) return fallbackComparative;

    const safeAdjustments = (adjustments && typeof adjustments === 'object') ? adjustments : {};

    let sum = 0;
    let validCount = 0;

    safeAnalogues.forEach(an => {
      const adj = safeAdjustments[an?.id] || {};
      const factor = 
        (1 + (adj.area || 0) / 100) *
        (1 + (adj.condition || 0) / 100) *
        (1 + (adj.transport || 0) / 100) *
        (1 + (adj.view || 0) / 100) *
        (1 + (adj.infrastructure || 0) / 100);

      const aArea = (an?.area && an.area > 0) ? an.area : 1;
      const aBase = (an?.base_price && an.base_price > 0) ? an.base_price : 0;
      const adjPricePerSqm = (aBase / aArea) * factor;

      if (!isNaN(adjPricePerSqm) && adjPricePerSqm > 0) {
        sum += adjPricePerSqm * fallbackArea;
        validCount++;
      }
    });

    return validCount > 0 ? Math.round(sum / validCount) : fallbackComparative;
  }, [analogues, adjustments, okn]);

  const incomeValue = useMemo(() => {
    const area = (okn?.area && okn.area > 0) ? okn.area : 1000;
    const wearPct = okn?.wear_pct || 25;
    const baseRent = 22000; 
    const pgi = area * baseRent;
    const egi = pgi * 0.90; 
    const noi = egi * 0.85; 
    const capRate = 0.09 + (wearPct * 0.0006); 
    const val = noi / capRate;
    return isNaN(val) ? area * 310000 : Math.round(val);
  }, [okn]);

  const costValue = useMemo(() => {
    const area = (okn?.area && okn.area > 0) ? okn.area : 1000;
    const wearPct = okn?.wear_pct || 25;
    const baseBuildCost = 140000;
    const totalBuildCost = area * baseBuildCost;
    const physicalDepreciation = totalBuildCost * (wearPct / 100);
    const functionalObsolescence = totalBuildCost * 0.15;
    const remainingBuildValue = totalBuildCost - physicalDepreciation - functionalObsolescence;
    const landValue = area * 0.6 * 90000; 
    const val = remainingBuildValue + landValue;
    return isNaN(val) ? area * 290000 : Math.round(val);
  }, [okn]);

  const rawMarketValue = useMemo(() => {
    return Math.round(
      (comparativeValue * weights.comparative) + 
      (incomeValue * weights.income) + 
      (costValue * weights.cost)
    );
  }, [comparativeValue, incomeValue, costValue, weights]);

  const kkhMultiplier = useMemo(() => {
    const res = calculateKKH(kkhParams);
    if (!res) return 1.15;
    const num = typeof res === 'object' && 'kkh' in res ? res.kkh : res;
    return isNaN(Number(num)) ? 1.15 : Number(num);
  }, [kkhParams]);
  
  const finalValue = Math.round(rawMarketValue * kkhMultiplier);
  const minConfidence = Math.round(finalValue * (1 - confidenceLevel / 100));
  const maxConfidence = Math.round(finalValue * (1 + confidenceLevel / 100));

  const handleWeightChange = (changedKey: keyof ValuationWeights, newValue: number) => {
    let clampedValue = Math.max(0, Math.min(1, newValue));
    
    setWeights(prev => {
      const others = Object.keys(prev).filter(k => k !== changedKey) as (keyof ValuationWeights)[];
      const oldSumOthers = prev[others[0]] + prev[others[1]];
      const newSumOthers = 1 - clampedValue;

      let nextOthers: Record<string, number> = {};
      
      if (oldSumOthers === 0) {
        nextOthers[others[0]] = newSumOthers / 2;
        nextOthers[others[1]] = newSumOthers / 2;
      } else {
        nextOthers[others[0]] = (prev[others[0]] / oldSumOthers) * newSumOthers;
        nextOthers[others[1]] = (prev[others[1]] / oldSumOthers) * newSumOthers;
      }

      return {
        [changedKey]: clampedValue,
        [others[0]]: nextOthers[others[0]],
        [others[1]]: nextOthers[others[1]],
      } as ValuationWeights;
    });
  };

  const formatCardPrice = (val: number) => {
    if (isNaN(val)) return '0 ₽';
    return new Intl.NumberFormat('ru-RU').format(val) + ' ₽';
  };

  const formatPriceBillion = (val: number) => {
    if (isNaN(val) || val === 0) return '0.000';
    return (val / 1000000000).toFixed(3);
  };

  // Обработчик крупной акцентной кнопки "Экспорт отчета (PDF)"
  const handleExportPDF = () => {
    setIsExporting(true);
    setExportSuccess(null);

    // Красивая анимация загрузки на 2.5 секунды (как указано в задаче)
    setTimeout(() => {
      // Реальная генерация PDF-отчета с ключевыми итогами (используем jspdf из проекта) - полностью динамическая
      const objName = okn?.name ?? 'Не указан';
      const objAddress = okn?.address ?? 'Не указан';
      const objCadastral = okn?.cadastral_number ?? okn?.cadastralNumber ?? 'Не установлен';

      try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFontSize(18);
        doc.text('ОТЧЕТ ОБ ОЦЕНКЕ РЫНОЧНОЙ СТОИМОСТИ ОКН', pageWidth / 2, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Объект: ${objName}`, 20, 35);
        doc.text(`Адрес: ${objAddress}`, 20, 43);
        doc.text(`Кадастровый номер: ${objCadastral}`, 20, 51);

        doc.setFontSize(14);
        doc.text('ИТОГОВАЯ СОГЛАСОВАННАЯ СТОИМОСТЬ', 20, 70);
        doc.setFontSize(22);
        doc.setTextColor(16, 185, 129);
        doc.text(`${formatCardPrice(finalValue)}`, 20, 82);
        doc.setTextColor(0, 0, 0);

        doc.setFontSize(11);
        doc.text(`Дата формирования: ${new Date().toLocaleDateString('ru-RU')}`, 20, 100);
        doc.text('Подходы: Сравнительный, Доходный, Затратный (взвешенные)', 20, 108);
        doc.text(`Коэффициент ККН: ${kkhMultiplier.toFixed(2)}`, 20, 116);

        doc.setFontSize(10);
        doc.text('Документ сформирован в АРМ «ОЦЕНЩИК» (демо-режим).', 20, 140);

        doc.save(`Отчет_ОКН_${objCadastral.replace(/[^a-z0-9]/gi, '_')}.pdf`);
      } catch (e) {
        console.error('PDF export error', e);
      }

      setIsExporting(false);
      setExportSuccess('Отчет успешно сохранен');

      // Автоматически скрыть уведомление через 3.5 секунды
      setTimeout(() => {
        setExportSuccess(null);
      }, 3500);
    }, 2500);
  };

  // Хелперы для конвертации значений объекта в проценты (0-100) для progress bars в карточках аналитики
  const getAnalogDensityPct = (count: number): number => {
    const n = Number(count) || 0;
    if (n <= 0) return 0;
    if (n >= 15) return 100;
    if (n >= 7) return 70;
    if (n >= 1) return 30;
    return 0;
  };

  const getTransportPct = (value?: string | null): number => {
    if (!value) return 0;
    const v = String(value).toLowerCase().trim();
    if (v.includes('отличн') || v === 'отличная') return 100;
    if (v.includes('хорош') || v === 'хорошая') return 75;
    if (v.includes('удовлетвор') || v === 'удовлетворительная') return 40;
    if (v.includes('плох') || v.includes('низк') || v === 'плохая' || v === 'низкая') return 15;
    return 0;
  };

  const getComplexityPct = (value?: string | null): number => {
    if (!value) return 0;
    const v = String(value).toLowerCase();
    if (v.includes('базов')) return 30;
    if (v.includes('средн')) return 60;
    if (v.includes('повышен')) return 65;
    if (v.includes('высок') || v.includes('сложн') || v.includes('зона окн')) return 95;
    return 0;
  };

  const getDynamicMetrics = () => {
    const address = okn?.address || '';
    let subDistrict = 'Тверской';
    if (address.toLowerCase().includes('басманный') || address.toLowerCase().includes('колпачный')) subDistrict = 'Басманный';
    else if (address.toLowerCase().includes('пресненский') || address.toLowerCase().includes('спиридоновка')) subDistrict = 'Пресненский';
    else if (address.toLowerCase().includes('красносельский') || address.toLowerCase().includes('сретенский')) subDistrict = 'Красносельский';

    const safeAnalogues = Array.isArray(analogues) ? analogues : [];
    const analogCount = safeAnalogues.length;
    let density = 'Нет данных';
    const densityPct = getAnalogDensityPct(analogCount);
    if (analogCount >= 10) { density = 'Высокая'; }
    else if (analogCount >= 5) { density = 'Средняя'; }
    else if (analogCount > 0) { density = 'Низкая'; }

    // Используем данные из пропсов текущего объекта (okn.metrics из ALL_OBJECTS если есть)
    const objMetrics: any = (okn as any)?.metrics || {};
    let transportText = 'Удовлетворительная'; let transportSub = '10-15 мин. до метро';
    if (objMetrics.transport?.quality) {
      transportText = objMetrics.transport.quality;
      if (objMetrics.transport.time) transportSub = objMetrics.transport.time;
    } else {
      const isGoodTransport = address.toLowerCase().includes('арбат') || address.toLowerCase().includes('колпачный');
      if (isGoodTransport) { transportText = 'Отличная'; transportSub = '1-3 мин. до метро'; }
      else if (analogCount > 3) { transportText = 'Хорошая'; transportSub = '5-8 мин. до метро'; }
    }
    const transportPct = getTransportPct(transportText);

    let complexityText = 'Базовая';
    if (objMetrics.complexity) {
      complexityText = objMetrics.complexity;
    } else {
      const isFederal = okn?.okn_category?.toLowerCase().includes('федеральн');
      if (isFederal) { complexityText = 'Высокая'; }
      else if (okn?.wear_pct && okn.wear_pct > 30) { complexityText = 'Повышенная'; }
    }
    const complexityPct = getComplexityPct(complexityText);

    return { district: 'Центральный АО', subDistrict, analogCount, density, densityPct, transportText, transportSub, transportPct, complexityText, complexityPct };
  };

  const metrics = getDynamicMetrics();

  let finalRatingScore = 4.5;
  const wearPct = okn?.wear_pct || 0;
  if (wearPct >= 60) finalRatingScore -= 1.5;
  else if (wearPct >= 40) finalRatingScore -= 0.8;
  if (metrics.density === 'Высокая') finalRatingScore += 0.3;
  if (metrics.transportText === 'Отличная') finalRatingScore += 0.2;
  finalRatingScore = Math.max(1.0, Math.min(5.0, finalRatingScore));
  const displayRating = finalRatingScore.toFixed(1);

  let finalRatingText = 'ВЫСОКИЕ РИСКИ';
  let ratingGradient = 'from-red-600 to-red-400 shadow-[0_0_12px_rgba(220,38,38,0.5)]';
  if (finalRatingScore >= 4.0) {
    finalRatingText = 'ИНВЕСТИЦИОННО ПРИВЛЕКАТЕЛЬНЫЙ';
    ratingGradient = 'from-emerald-500 to-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]';
  } else if (finalRatingScore >= 3.0) {
    finalRatingText = 'УМЕРЕННАЯ ПРИВЛЕКАТЕЛЬНОСТЬ';
    ratingGradient = 'from-amber-500 to-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]';
  }

  // Профессиональная генерация DOCX отчета.
  // Структура:
  // - Титульный лист ("Отчет об оценке")
  // - Таблица 1: Характеристики объекта (Адрес, Кадастровый номер, Площадь)
  // - Таблица 2: Расчет корректировок и итоговая стоимость аналогов
  // - Итог: Согласованная рыночная стоимость
  const handleDownloadDocx = async () => {
    setIsDocxExporting(true);
    setDocxSuccess(null);

    try {
      const objName = okn?.name ?? 'Не указан';
      const objAddress = okn?.address ?? 'Не указан';
      const objCadastral = okn?.cadastral_number ?? okn?.cadastralNumber ?? 'Не установлен';
      const objArea = (okn?.area && okn.area > 0) ? okn.area : 0;
      const evalDate = new Date().toLocaleDateString('ru-RU');

      // Данные для Table 2 (корректировки и итоговые цены аналогов)
      const safeAnalogues = Array.isArray(analogues) ? analogues : [];
      const safeAdjustments: Record<string, any> = adjustments || {};

      const getCorrectionFactor = (adj: any): number => {
        const a = (adj?.area || 0) / 100;
        const c = (adj?.condition || 0) / 100;
        const t = (adj?.transport || 0) / 100;
        const v = (adj?.view || 0) / 100;
        const i = (adj?.infrastructure || 0) / 100;
        return (1 + a) * (1 + c) * (1 + t) * (1 + v) * (1 + i);
      };

      const analogueData = safeAnalogues.map((analog, index) => {
        const adj = safeAdjustments[analog.id] || { area: 0, condition: 0, transport: 0, view: 0, infrastructure: 0 };
        const factor = getCorrectionFactor(adj);
        const basePrice = (analog.base_price && analog.base_price > 0) ? analog.base_price : 0;
        const analogArea = (analog.area && analog.area > 0) ? analog.area : 1;
        const adjustedPrice = Math.round(basePrice * factor);
        const adjustedPerSqm = Math.round(adjustedPrice / analogArea);
        const totalCorrectionPct = Math.round((factor - 1) * 100);

        return {
          num: index + 1,
          address: analog.address || '—',
          basePrice,
          totalCorrectionPct,
          adjustedPrice,
          adjustedPerSqm,
        };
      });

      // Средняя скорректированная стоимость аналогов (используется в сравнительном подходе)
      const avgAdjusted = analogueData.length > 0
        ? Math.round(analogueData.reduce((sum, a) => sum + a.adjustedPrice, 0) / analogueData.length)
        : 0;

      const thinBorder = {
        top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
      } as const;

      const headerShading = { fill: 'E5E7EB' };

      const doc = new Document({
        styles: {
          default: {
            document: {
              styles: {
                paragraphStyles: [],
              },
            },
          },
        },
        sections: [{
          properties: {},
          children: [
            // === ТИТУЛЬНЫЙ ЛИСТ ===
            new Paragraph({ spacing: { before: 1200 } }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [new TextRun({ text: 'ОТЧЕТ ОБ ОЦЕНКЕ', bold: true, size: 44, font: 'Times New Roman' })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
              children: [new TextRun({ text: 'рыночной стоимости', size: 32, font: 'Times New Roman' })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 },
              children: [new TextRun({ text: 'объекта культурного наследия', size: 26, font: 'Times New Roman' })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [new TextRun({ text: objName, bold: true, size: 24, font: 'Times New Roman' })],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 800 },
              children: [new TextRun({ text: `Дата формирования: ${evalDate}`, size: 20, font: 'Times New Roman' })],
            }),

            // === ТАБЛИЦА 1: Характеристики объекта ===
            new Paragraph({
              spacing: { before: 200, after: 120 },
              children: [new TextRun({ text: '1. Характеристики объекта оценки', bold: true, size: 24, font: 'Times New Roman' })],
            }),
            new Table({
              width: { type: WidthType.PERCENTAGE, value: 100 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      borders: thinBorder,
                      shading: headerShading,
                      width: { type: WidthType.PERCENTAGE, value: 40 },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Параметр', bold: true, size: 20, font: 'Times New Roman' })] })],
                    }),
                    new TableCell({
                      borders: thinBorder,
                      shading: headerShading,
                      width: { type: WidthType.PERCENTAGE, value: 60 },
                      children: [new Paragraph({ children: [new TextRun({ text: 'Значение', bold: true, size: 20, font: 'Times New Roman' })] })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 40 }, children: [new Paragraph({ children: [new TextRun({ text: 'Адрес', size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 60 }, children: [new Paragraph({ children: [new TextRun({ text: objAddress, size: 20, font: 'Times New Roman' })] })] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 40 }, children: [new Paragraph({ children: [new TextRun({ text: 'Кадастровый номер', size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 60 }, children: [new Paragraph({ children: [new TextRun({ text: objCadastral, size: 20, font: 'Times New Roman' })] })] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 40 }, children: [new Paragraph({ children: [new TextRun({ text: 'Площадь', size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 60 }, children: [new Paragraph({ children: [new TextRun({ text: objArea > 0 ? `${objArea} м²` : '—', size: 20, font: 'Times New Roman' })] })] }),
                  ],
                }),
              ],
            }),

            // === ТАБЛИЦА 2: Расчет корректировок и итоговая стоимость аналогов ===
            new Paragraph({
              spacing: { before: 300, after: 120 },
              children: [new TextRun({ text: '2. Расчет корректировок и итоговая стоимость аналогов', bold: true, size: 24, font: 'Times New Roman' })],
            }),
            new Paragraph({
              spacing: { after: 120 },
              children: [new TextRun({ text: `Использовано аналогов: ${analogueData.length}. Средняя скорректированная стоимость: ${formatCardPrice(avgAdjusted)}.`, size: 18, font: 'Times New Roman' })],
            }),
            new Table({
              width: { type: WidthType.PERCENTAGE, value: 100 },
              rows: [
                // header
                new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 6 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '№', bold: true, size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 32 }, children: [new Paragraph({ children: [new TextRun({ text: 'Адрес аналога', bold: true, size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 18 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Базовая стоимость', bold: true, size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 14 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Корр. %', bold: true, size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 18 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Итоговая цена', bold: true, size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 12 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: '₽/м²', bold: true, size: 18, font: 'Times New Roman' })] })] }),
                  ],
                }),
                // data rows
                ...analogueData.map((row) => (
                  new TableRow({
                    children: [
                      new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 6 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(row.num), size: 18, font: 'Times New Roman' })] })] }),
                      new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 32 }, children: [new Paragraph({ children: [new TextRun({ text: row.address, size: 16, font: 'Times New Roman' })] })] }),
                      new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 18 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatCardPrice(row.basePrice), size: 18, font: 'Times New Roman' })] })] }),
                      new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 14 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${row.totalCorrectionPct > 0 ? '+' : ''}${row.totalCorrectionPct}%`, size: 18, font: 'Times New Roman', color: row.totalCorrectionPct >= 0 ? '166534' : '991B1B' })] })] }),
                      new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 18 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatCardPrice(row.adjustedPrice), size: 18, font: 'Times New Roman' })] })] }),
                      new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 12 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatCardPrice(row.adjustedPerSqm), size: 18, font: 'Times New Roman' })] })] }),
                    ],
                  })
                )),
                // average row
                ...(analogueData.length > 0 ? [new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, shading: { fill: 'F3F4F6' }, width: { type: WidthType.PERCENTAGE, value: 6 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '', size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: { fill: 'F3F4F6' }, width: { type: WidthType.PERCENTAGE, value: 32 }, children: [new Paragraph({ children: [new TextRun({ text: 'Среднее (для сравнительного подхода)', bold: true, size: 16, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: { fill: 'F3F4F6' }, width: { type: WidthType.PERCENTAGE, value: 18 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: '', size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: { fill: 'F3F4F6' }, width: { type: WidthType.PERCENTAGE, value: 14 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '', size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: { fill: 'F3F4F6' }, width: { type: WidthType.PERCENTAGE, value: 18 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatCardPrice(avgAdjusted), bold: true, size: 18, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: { fill: 'F3F4F6' }, width: { type: WidthType.PERCENTAGE, value: 12 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: '', size: 18, font: 'Times New Roman' })] })] }),
                  ],
                })] : []),
              ],
            }),

            // === ИТОГ: Согласованная рыночная стоимость ===
            new Paragraph({
              spacing: { before: 300, after: 120 },
              children: [new TextRun({ text: '3. Согласованная рыночная стоимость', bold: true, size: 24, font: 'Times New Roman' })],
            }),
            new Table({
              width: { type: WidthType.PERCENTAGE, value: 100 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 55 }, children: [new Paragraph({ children: [new TextRun({ text: 'Подход', bold: true, size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 25 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Стоимость', bold: true, size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, shading: headerShading, width: { type: WidthType.PERCENTAGE, value: 20 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Вес', bold: true, size: 20, font: 'Times New Roman' })] })] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 55 }, children: [new Paragraph({ children: [new TextRun({ text: 'Сравнительный подход', size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 25 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatCardPrice(comparativeValue), size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 20 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${(weights.comparative * 100).toFixed(0)}%`, size: 20, font: 'Times New Roman' })] })] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 55 }, children: [new Paragraph({ children: [new TextRun({ text: 'Доходный подход', size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 25 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatCardPrice(incomeValue), size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 20 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${(weights.income * 100).toFixed(0)}%`, size: 20, font: 'Times New Roman' })] })] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 55 }, children: [new Paragraph({ children: [new TextRun({ text: 'Затратный подход', size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 25 }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: formatCardPrice(costValue), size: 20, font: 'Times New Roman' })] })] }),
                    new TableCell({ borders: thinBorder, width: { type: WidthType.PERCENTAGE, value: 20 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${(weights.cost * 100).toFixed(0)}%`, size: 20, font: 'Times New Roman' })] })] }),
                  ],
                }),
              ],
            }),

            new Paragraph({
              spacing: { before: 200, after: 80 },
              children: [new TextRun({ text: 'Коэффициент ККН (культурное наследие):', size: 20, font: 'Times New Roman' })],
            }),
            new Paragraph({
              spacing: { after: 120 },
              children: [new TextRun({ text: `× ${kkhMultiplier.toFixed(2)}`, bold: true, size: 22, font: 'Times New Roman' })],
            }),

            new Paragraph({
              spacing: { before: 120, after: 80 },
              children: [new TextRun({ text: 'СОГЛАСОВАННАЯ РЫНОЧНАЯ СТОИМОСТЬ', bold: true, size: 24, font: 'Times New Roman' })],
            }),
            new Paragraph({
              spacing: { after: 200 },
              children: [new TextRun({ text: formatCardPrice(finalValue), bold: true, size: 40, font: 'Times New Roman' })],
            }),

            new Paragraph({
              spacing: { before: 200 },
              children: [new TextRun({ text: 'Документ сформирован автоматически в АРМ «ОЦЕНЩИК».', size: 18, italics: true, font: 'Times New Roman' })],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `Отчет_ОКН_${objCadastral.replace(/[^a-z0-9]/gi, '_')}.docx`);

      setDocxSuccess('Отчет успешно сформирован');
      setTimeout(() => setDocxSuccess(null), 3500);
    } catch (e) {
      console.error('DOCX export error', e);
      setDocxSuccess('Ошибка формирования отчета');
      setTimeout(() => setDocxSuccess(null), 2500);
    } finally {
      setIsDocxExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Итоговое согласование стоимости ОКН</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Расчет выполняется на базе трех классических подходов к оценке.</p>
        </div>
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="shrink-0 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-sky-900/40 active:scale-[0.985] flex items-center gap-2 border border-sky-500/30"
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Генерация...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Экспорт отчета (PDF)
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:bg-sky-500 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition duration-300 group">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-sky-100">Рыночный метод</span>
              <TrendingUp className="h-5 w-5 text-sky-400 group-hover:text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-200 group-hover:text-white mt-1">Сравнительный подход</h3>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed group-hover:text-sky-50 font-medium">
              Определяет цену на основе наиболее похожих объектов. Чем больше сходство, тем сильнее влияние на итоговую стоимость.
            </p>
          </div>
          <div className="mt-6">
            <span className="text-[10px] text-slate-500 block font-mono group-hover:text-sky-100">Вычисленная стоимость:</span>
            <span className="text-lg md:text-xl font-bold font-mono text-white group-hover:text-white">{formatCardPrice(comparativeValue)}</span>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:bg-emerald-500 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition duration-300 group">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-emerald-100">Капитализация доходов</span>
              <Cpu className="h-5 w-5 text-emerald-500 group-hover:text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-200 group-hover:text-white mt-1">Доходный подход</h3>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed group-hover:text-emerald-50 font-medium">
              Построен на методе прямой капитализации NOI. Учитывает арендный потенциал и операционные расходы исторического здания.
            </p>
          </div>
          <div className="mt-6">
            <span className="text-[10px] text-slate-500 block font-mono group-hover:text-sky-100">Вычисленная стоимость:</span>
            <span className="text-lg md:text-xl font-bold font-mono text-white group-hover:text-white">{formatCardPrice(incomeValue)}</span>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-850 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:bg-orange-500 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition duration-300 group">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-orange-100">Замещение и земля</span>
              <Hammer className="h-5 w-5 text-orange-400 group-hover:text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-200 group-hover:text-white mt-1">Затратный подход</h3>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed group-hover:text-orange-50 font-medium">
              Рассчитан по восстановительной стоимости архитектуры с учетом износа {okn?.wear_pct || 25}% и стоимости земельного участка.
            </p>
          </div>
          <div className="mt-6">
            <span className="text-[10px] text-slate-500 block font-mono group-hover:text-emerald-100">Вычисленная стоимость:</span>
            <span className="text-lg md:text-xl font-bold font-mono text-white group-hover:text-white">{formatCardPrice(costValue)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><MapPin className="h-5 w-5 text-sky-400" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Район</div>
              <div className="text-base font-black text-white leading-tight mt-1">{metrics.subDistrict}</div>
              <div className="text-xs text-slate-400 mt-1">{metrics.district}</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><Users className="h-5 w-5 text-emerald-400" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Плотность аналогов</div>
              <div className="text-base font-black text-white leading-tight mt-1">{metrics.analogCount} объектов</div>
              <div className="text-xs text-emerald-400 mt-1 font-medium">{metrics.density}</div>
            </div>
          </div>
          <div className="mt-4 h-2.5 bg-slate-950/80 rounded-full overflow-hidden border border-slate-800/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.6)] transition-all duration-700" style={{ width: `${metrics.densityPct}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><Bus className="h-5 w-5 text-amber-400" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Транспортная доступность</div>
              <div className="text-base font-black text-white leading-tight mt-1">{metrics.transportText}</div>
              <div className="text-xs text-amber-400 mt-1 font-medium">{metrics.transportSub}</div>
            </div>
          </div>
          <div className="mt-4 h-2.5 bg-slate-950/80 rounded-full overflow-hidden border border-slate-800/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)] transition-all duration-700" style={{ width: `${metrics.transportPct}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5"><AlertTriangle className="h-5 w-5 text-violet-400" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Сложность оценки</div>
              <div className="text-base font-black text-white leading-tight mt-1">{metrics.complexityText}</div>
              <div className="text-xs text-violet-400 mt-1 font-medium">Зависит от статуса ОКН</div>
            </div>
          </div>
          <div className="mt-4 h-2.5 bg-slate-950/80 rounded-full overflow-hidden border border-slate-800/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <div className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full shadow-[0_0_10px_rgba(167,139,250,0.6)] transition-all duration-700" style={{ width: `${metrics.complexityPct}%` }}></div>
          </div>
        </div>
      </div>

      {/* ТОЛЬКО ИЗМЕНЁННАЯ НИЖНЯЯ ПОЛОСКА (БЕЗ ЗВЕЗДЫ + НОВЫЕ ЦВЕТА) */}
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm font-bold text-slate-400 tracking-widest">ИТОГОВЫЙ РЕЙТИНГ ПРИВЛЕКАТЕЛЬНОСТИ</div>
            <div className="text-5xl font-black text-white mt-3 font-mono tracking-tighter">{displayRating}</div>
          </div>
          
          <div className="text-right">
            <div className={`text-sm font-medium tracking-[1.5px] uppercase ${finalRatingScore >= 4.0 ? 'text-emerald-400' : finalRatingScore >= 3.0 ? 'text-amber-400' : 'text-red-400'}`}>
              {finalRatingText}
            </div>
          </div>
        </div>

        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div 
            className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700"
            style={{ width: `${(finalRatingScore / 5) * 100}%` }}
          ></div>
        </div>

        <div className="text-[10px] text-slate-500 mt-4 font-medium">
          Рассчитано на основе износа, ограничений и статуса объекта
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashflowChart />
        <WeightsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Sliders className="w-5 h-5 text-slate-400" /> Весовое согласование</h2>
            <button 
              onClick={() => setIsWeightHelpOpen(true)} 
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
              title="Методология расчёта весов"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Методология
            </button>
          </div>
          
          <div className="space-y-5">
            <div className="relative">
              <div className="flex justify-between text-sm font-medium text-slate-300 mb-1.5">
                <span>Сравнительный подход</span><span className="font-mono text-slate-400">{(weights.comparative * 100).toFixed(0)}%</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={weights.comparative} onChange={(e) => handleWeightChange('comparative', parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400" />
            </div>
            <div className="relative">
              <div className="flex justify-between text-sm font-medium text-slate-300 mb-1.5">
                <span>Доходный подход</span><span className="font-mono text-slate-400">{(weights.income * 100).toFixed(0)}%</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={weights.income} onChange={(e) => handleWeightChange('income', parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400" />
            </div>
            <div className="relative">
              <div className="flex justify-between text-sm font-medium text-slate-300 mb-1.5">
                <span>Затратный подход</span><span className="font-mono text-slate-400">{(weights.cost * 100).toFixed(0)}%</span>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={weights.cost} onChange={(e) => handleWeightChange('cost', parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500 text-center">
            Сумма весов автоматически поддерживается на уровне 100%
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950/20 to-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-sky-500" /> Итоговая рыночная стоимость</span>
            <h2 className="text-3xl md:text-4xl font-black text-white font-mono mt-3">{formatPriceBillion(finalValue)} млрд ₽</h2>
            
            <div className="mt-4 space-y-2 text-xs border-t border-slate-800/80 pt-4">
              <div className="flex justify-between"><span className="text-slate-400">Без учета ОКН:</span><span className="text-slate-200 font-mono">{formatCardPrice(rawMarketValue)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Коэффициент ККН:</span><span className="text-amber-400 font-bold font-mono">x {kkhMultiplier.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Интервал (±5%):</span><span className="text-emerald-400 font-mono">{(minConfidence / 1_000_000_000).toFixed(2)} – {(maxConfidence / 1_000_000_000).toFixed(2)} млрд ₽</span></div>
            </div>
          </div>

          {/* КРУПНАЯ АКЦЕНТНАЯ КНОПКА ЭКСПОРТА PDF (согласно задаче) */}
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="w-full mt-6 py-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-black text-base rounded-2xl transition-all shadow-lg shadow-sky-900/40 active:scale-[0.985] flex items-center justify-center gap-3 border border-sky-500/30"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Генерация документа...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Экспорт отчета (PDF)
              </>
            )}
          </button>

          <button
            onClick={handleDownloadDocx}
            disabled={isDocxExporting}
            className="w-full mt-3 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-xl transition-all text-sm shadow shadow-indigo-900/30 active:scale-95 flex items-center justify-center gap-2"
          >
            {isDocxExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Формирование...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Сформировать отчет (DOCX)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Уведомление об успешном экспорте PDF (показывается после isExporting) */}
      {exportSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg transition-all">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{exportSuccess}</span>
          <span className="ml-auto text-xs text-emerald-500/70 font-mono">PDF сохранён в загрузки</span>
        </div>
      )}

      {/* Уведомление об успешном экспорте DOCX */}
      {docxSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg transition-all">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{docxSuccess}</span>
          <span className="ml-auto text-xs text-emerald-500/70 font-mono">Файл сохранён в загрузки</span>
        </div>
      )}

      {isWeightHelpOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm" onClick={() => setIsWeightHelpOpen(false)}>
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <HelpCircle className="w-4 h-4 text-slate-400" />
                Методология весов
              </div>
              <button onClick={() => setIsWeightHelpOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 text-sm text-slate-300 leading-relaxed space-y-4">
              <p>
                Итоговая стоимость — это <strong className="text-white">взвешенная сумма</strong> трёх подходов:
              </p>
              <div className="font-mono text-xs bg-slate-950 border border-slate-800 rounded p-3 text-slate-400">
                V = (V<sub>сравн</sub> × w<sub>1</sub>) + (V<sub>дох</sub> × w<sub>2</sub>) + (V<sub>затр</sub> × w<sub>3</sub>)<br />
                где w<sub>1</sub> + w<sub>2</sub> + w<sub>3</sub> = 1 (100%)
              </div>
              <p>
                Ползунки позволяют отдать больший вес методу с более надёжными данными. Сумма весов автоматически нормализуется до 100%.
              </p>
              <p className="text-xs text-slate-500">
                Итоговый результат дополнительно умножяется на коэффициент ККН (учёт статуса ОКН).
              </p>
            </div>

            <div className="px-5 py-3 border-t border-slate-800 flex justify-end shrink-0">
              <button 
                onClick={() => setIsWeightHelpOpen(false)} 
                className="px-4 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ResultPanel;
--- КОНЕЦ ФАЙЛА: src/components/ResultPanel.tsx ---

--- СТАРТ ФАЙЛА: src/components/SearchHistoryModal.tsx ---
import React, { useState, useEffect, useRef } from 'react';

import { ArrowRight, ChevronLeft, ChevronRight, History, Trash2, X } from 'lucide-react';

import { ALL_OBJECTS } from '../data/allObjects';

const allPhotos = (import.meta as any).glob('/public/photos/**/*.{jpg,jpeg,png,webp,JPG,jfif,PNG}', {
  query: '?url',
  import: 'default',
});

interface HistoryItem {
  id: string;
  cadastral_number: string;
  address: string;
  name: string;
  timestamp: string;
  photoUrl: string;
}

const getDynamicPhoto = (item: HistoryItem): string => {
  if (!item.address) return item.photoUrl || 'https://picsum.photos/300/180';
  
  const itemAddressLower = item.address.toLowerCase();
  
  const fullObj = ALL_OBJECTS.find(o => {
    if (!o.address) return false;
    const oAddrLower = o.address.toLowerCase();
    const keywords = oAddrLower
      .replace(/[,\.]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1 && !['москва', 'ул', 'пер', 'дом', 'стр', 'бульвар', 'улица', 'переулок', 'вл'].includes(w));
      
    if (keywords.length === 0) return false;
    return keywords.every(kw => itemAddressLower.includes(kw));
  }) || ALL_OBJECTS[0];
  
  const folderKeyword = fullObj?.photosFolder || 'rossiya';
  
  const matchedPaths = Object.keys(allPhotos)
    .filter(path => path.toLowerCase().includes(folderKeyword.toLowerCase()))
    .map(path => {
      const url = allPhotos[path];
      return typeof url === 'string' ? url.replace('/public', '') : path.replace('/public', '');
    });

  if (matchedPaths.length > 0) return matchedPaths[0];
  
  return item.photoUrl || 'https://picsum.photos/300/180';
};

interface SearchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cadastral: string) => void;
}

export const SearchHistoryModal: React.FC<SearchHistoryModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const loadHistory = () => {
    const saved = localStorage.getItem('oknSearchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearHistory = () => {
    if (window.confirm('Вы уверены, что хотите очистить историю поиска?')) {
      setSearchHistory([]);
      localStorage.removeItem('oknSearchHistory');
      window.dispatchEvent(new Event('oknHistoryUpdated'));
    }
  };

  const handleItemClick = (item: HistoryItem) => {
    onSelect(item.cadastral_number);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative animate-slideUp flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
            <History className="h-5 w-5 text-sky-500" />
            История поиска
          </h2>
          <div className="flex items-center gap-4">
            {searchHistory.length > 0 && (
              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={scrollLeft}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full p-2 transition shadow-sm border border-slate-700"
                  title="Пролистать влево"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={scrollRight}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full p-2 transition shadow-sm border border-slate-700"
                  title="Пролистать вправо"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
            {searchHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-slate-400 hover:text-red-400 transition flex items-center gap-1 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-slate-800"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Очистить
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition"
              title="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          {searchHistory.length === 0 ? (
            <div className="bg-gradient-to-b from-slate-900/50 to-slate-950/80 border border-slate-800/80 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-inner my-6 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
               <div className="p-4 bg-slate-900/50 rounded-full border border-slate-800/80 shadow-lg mb-4 z-10">
                 <History className="h-10 w-10 text-sky-500/80" />
               </div>
               <p className="text-slate-300 font-bold text-lg z-10">История поиска пока пуста</p>
               <p className="text-slate-500 text-sm mt-2 max-w-sm z-10">Найдите первый объект недвижимости и начните оценку, чтобы он появился здесь.</p>
            </div>
          ) : (
            <div ref={scrollRef} className="flex overflow-x-auto gap-4 scroll-smooth hide-scrollbar pb-4">
              {searchHistory.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleItemClick(item)}
                  className="min-w-[480px] flex-shrink-0 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-sky-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 cursor-pointer group flex flex-col"
                >
                  <div className="h-56 w-full relative overflow-hidden bg-slate-900 border-b border-slate-800/50">
                    <img 
                      src={getDynamicPhoto(item)} 
                      alt={item.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-sm text-slate-200 px-3 py-1.5 rounded-md font-mono shadow-md flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                      {item.cadastral_number}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-200 line-clamp-2 group-hover:text-sky-400 transition leading-snug">{item.name}</h3>
                    <p className="text-base text-slate-500 mt-3 line-clamp-2 mb-5 leading-relaxed">{item.address}</p>
                    
                    <div className="mt-auto pt-5 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-sm font-mono text-slate-500">{item.timestamp}</span>
                      <span className="text-base font-semibold text-sky-500 group-hover:translate-x-1 transition flex items-center">
                        Открыть <ArrowRight className="h-5 w-5 ml-1.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
    </div>
  );
};
--- КОНЕЦ ФАЙЛА: src/components/SearchHistoryModal.tsx ---

--- СТАРТ ФАЙЛА: src/components/SearchPanel.tsx ---
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Database, Globe, CheckCircle2, ArrowRight, Download, Terminal, Building, Activity, FileText, X, Settings2, Dices } from 'lucide-react';
import { ALL_OBJECTS } from '../data/allObjects';

interface SearchPanelProps {
  onObjectLoaded: (obj: any) => void;
  setActiveTab: (tab: number) => void;
  autoRunQuery?: string | null;
  clearAutoRunQuery?: () => void;
}

const cleanOknName = (name: string) => {
  if (!name) return 'Объект культурного наследия';
  return name.split(' - ')[0].replace(/\s*-.*$/, '').trim();
};

const RECOMMENDED = [
  { 
    id: '77:01:0001001:1023', 
    cadastralNumber: '77:01:0001001:1023', 
    address: 'г. Москва, Колпачный переулок, дом 5, строение 2', 
    isStarred: true 
  },
  { 
    id: '77:01:0003020:4105', 
    cadastralNumber: '77:01:0003020:4105', 
    address: 'г. Москва, Спиридоновка, 17', 
    isStarred: false 
  },
  { 
    id: '77:01:0001001:1001', 
    cadastralNumber: '77:01:0001001:1001', 
    address: 'г. Москва, Сретенский бульвар, 6/1', 
    isStarred: false 
  }
];

const SearchPanel: React.FC<SearchPanelProps> = ({ 
  onObjectLoaded, 
  setActiveTab, 
  autoRunQuery, 
  clearAutoRunQuery 
}) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'cadastral' | 'address'>('cadastral');
  
  // Состояния загрузки
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [foundObject, setFoundObject] = useState<any | null>(null);
  
  // Состояния UI
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDevMenuOpen, setIsDevMenuOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const devMenuRef = useRef<HTMLDivElement>(null);
  
  // Прогресс бары
  const [egrnProgress, setEgrnProgress] = useState(0);
  const [ogdProgress, setOgdProgress] = useState(0);
  const [cianProgress, setCianProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // ЖЕЛЕЗОБЕТОННЫЙ ПОИСК С ПЕРВОГО СИМВОЛА (ИСПРАВЛЕН ПОИСК ПО КАДАСТРУ)
  useEffect(() => {
    if (query.trim().length >= 1) {
      const lowerQuery = query.trim().toLowerCase();
      const filtered = ALL_OBJECTS.filter(obj => {
        const nameMatch = String(obj.name || '').toLowerCase().includes(lowerQuery);
        const addrMatch = String(obj.address || '').toLowerCase().includes(lowerQuery);
        const cadMatch = String(obj.cadastralNumber || '').toLowerCase().includes(lowerQuery);
        const idMatch = String(obj.id || '').toLowerCase().includes(lowerQuery);
        return nameMatch || addrMatch || cadMatch || idMatch;
      }).slice(0, 8);
      
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (devMenuRef.current && !devMenuRef.current.contains(event.target as Node)) {
        setIsDevMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (autoRunQuery) {
      setQuery(autoRunQuery);
      handleSearch(autoRunQuery);
      if (clearAutoRunQuery) clearAutoRunQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRunQuery]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString('ru-RU', { hour12: false })}] ${msg}`]);
  };

  const findObject = (q: string): any | null => {
    const trimmed = (q || '').trim();
    if (!trimmed) return null;
    const lower = trimmed.toLowerCase();

    // 1. Точное совпадение по кадастровому номеру или ID (приоритет для кнопки Импорт)
    let found = ALL_OBJECTS.find(o => {
      const cad = String(o.cadastralNumber || '').toLowerCase();
      const oid = String(o.id || '').toLowerCase();
      return cad === lower || oid === lower;
    });
    if (found) return found;

    // 2. Точное совпадение по адресу или названию
    found = ALL_OBJECTS.find(o => {
      const addr = String(o.address || '').toLowerCase();
      const name = String(o.name || '').toLowerCase();
      return addr === lower || name === lower;
    });
    if (found) return found;

    // 3. Частичное совпадение (сначала по кадастру/ID, затем по адресу/имени) — для гибкого ввода
    found = ALL_OBJECTS.find(o => {
      const cad = String(o.cadastralNumber || o.id || '').toLowerCase();
      return cad.includes(lower);
    });
    if (found) return found;

    found = ALL_OBJECTS.find(o => {
      const addr = String(o.address || '').toLowerCase();
      const name = String(o.name || '').toLowerCase();
      return addr.includes(lower) || name.includes(lower);
    });
    return found;
  };

  const handleSearch = (searchQuery: string = query, directObject?: any) => {
    if (!searchQuery.trim() && !directObject) return;

    setIsDropdownOpen(false);
    setSearchError(null);
    setIsLoading(true);
    setIsFinished(false);
    setEgrnProgress(0);
    setOgdProgress(0);
    setCianProgress(0);
    setLogs([]);
    setFoundObject(null);

    // РЕАЛЬНЫЙ ПОИСК ПО МАССИВУ ALL_OBJECTS прямо в функции симуляции загрузки.
    // Ищем объект, у которого cadastralNumber или address (или id/name) совпадает с введенным запросом.
    // Если directObject передан (из подсказок/рекомендаций) — используем его как есть.
    let targetObj = directObject;
    if (!targetObj) {
      targetObj = findObject(searchQuery);
    }

    if (!targetObj) {
      // Не найден — показываем уведомление об ошибке, НЕ переключаем вкладку, не даём продолжить
      setIsLoading(false);
      setIsFinished(false);
      setSearchError('Объект не найден в базах данных');
      return;
    }

    // Объект реально найден — продолжаем симуляцию загрузки, в конце передадим именно НАЙДЕННЫЙ объект
    addLog('Поиск в локальной базе объектов...');
    addLog(`Параметр: ${searchQuery}`);
    addLog('Объект найден в базе. Загрузка данных...');

    // Эмуляция загрузки данных (локальная, без реальных сетевых запросов к Python-бэкенду)
    let egrn = 0;
    const egrnInterval = setInterval(() => {
      egrn += Math.floor(Math.random() * 15) + 5;
      if (egrn >= 100) {
        egrn = 100;
        clearInterval(egrnInterval);
        addLog('Локальные данные ЕГРН загружены.');
      }
      setEgrnProgress(egrn);
    }, 150);

    setTimeout(() => {
      addLog('Агрегация зон и ограничений...');
      let ogd = 0;
      const ogdInterval = setInterval(() => {
        ogd += Math.floor(Math.random() * 10) + 5;
        if (ogd >= 100) {
          ogd = 100;
          clearInterval(ogdInterval);
          addLog('Данные ГИС ОГД подготовлены.');
        }
        setOgdProgress(ogd);
      }, 200);
    }, 600);

    setTimeout(() => {
      addLog('Сбор рыночных показателей...');
      let cian = 0;
      const cianInterval = setInterval(() => {
        cian += Math.floor(Math.random() * 8) + 2;
        if (cian >= 100) {
          cian = 100;
          clearInterval(cianInterval);
          addLog('Аналитика собрана.');

          // Передаём в onObjectLoaded (через foundObject + handleProceed) именно НАЙДЕННЫЙ объект, а не заглушку
          setFoundObject(targetObj);
          setIsFinished(true);
          addLog('✔ Объект готов. Переходите к паспорту.');
        }
        setCianProgress(cian);
      }, 250);
    }, 1200);
  };

  const handleProceed = () => {
    if (foundObject && isFinished) {
      try {
        const historyEntry = {
          id: Date.now().toString(),
          cadastral_number: foundObject.cadastralNumber || query,
          address: foundObject.address || query,
          timestamp: new Date().toLocaleString('ru-RU')
        };
        const saved = localStorage.getItem('oknSearchHistory');
        const history = saved ? JSON.parse(saved) : [];
        history.unshift(historyEntry);
        localStorage.setItem('oknSearchHistory', JSON.stringify(history.slice(0, 15)));
        window.dispatchEvent(new Event('oknHistoryUpdated'));
      } catch (e) {
        console.error('History save error', e);
      }

      onObjectLoaded(foundObject);
      setActiveTab(2);
    }
  };

  const handleSuggestionClick = (obj: any) => {
    const valueToSet = mode === 'cadastral' ? (obj.cadastralNumber || obj.id) : obj.address;
    setQuery(valueToSet);
    setIsDropdownOpen(false);
    handleSearch(valueToSet, obj);
  };

  const handleDevInstantLoad = (obj?: any) => {
    // Для dev-случайного выбора — не используем фиксированные индексы (0,1,2 и т.п.) в вызовах
    const toLoad = obj || ALL_OBJECTS[Math.floor(Math.random() * ALL_OBJECTS.length)];
    onObjectLoaded(toLoad);
    setActiveTab(2);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative min-h-[85vh]">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-3xl space-y-6 relative z-10">
        
        {/* Блок поиска */}
        <div ref={containerRef} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative">
          
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center justify-center flex-wrap gap-3">
              Поиск и Импорт Объекта
              
              <div className="relative" ref={devMenuRef}>
                <button 
                  onClick={() => setIsDevMenuOpen(!isDevMenuOpen)}
                  className="px-2.5 py-1 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 tracking-widest uppercase align-middle hover:bg-indigo-500/30 transition-colors flex items-center gap-1.5"
                >
                  <Settings2 className="w-3 h-3" /> Разработчик
                </button>

                {isDevMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl overflow-hidden z-[200] animate-fadeIn backdrop-blur-xl">
                    <button 
                      onClick={() => handleDevInstantLoad()} 
                      className="w-full text-left px-3 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 text-sm font-semibold p-4 border-b border-slate-700 transition-colors flex items-center gap-2"
                    >
                      <Dices className="w-4 h-4" /> Выбрать случайный объект
                    </button>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col p-1">
                      {ALL_OBJECTS.map((obj) => (
                        <button
                          key={obj.id}
                          onClick={() => handleDevInstantLoad(obj)}
                          className="w-full text-left p-3.5 hover:bg-slate-800/60 transition-colors cursor-pointer border-b border-slate-800/50 last:border-0"
                        >
                          <div className="text-sm font-semibold text-slate-200 truncate">{cleanOknName(obj.name)}</div>
                          <div className="text-[10px] text-slate-500 mt-1 font-mono truncate">{obj.address}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Введите кадастровый номер здания или его адрес для автоматического агрегирования данных из государственных реестров и аналитических баз данных ЦИАН.
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800/80 inline-flex">
              <button 
                onClick={() => { setMode('cadastral'); setQuery(''); setSuggestions([]); setSearchError(null); }}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'cadastral' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Кадастровый номер
              </button>
              <button 
                onClick={() => { setMode('address'); setQuery(''); setSuggestions([]); setSearchError(null); }}
                className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'address' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Адрес объекта
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {mode === 'cadastral' ? <Database className="h-5 w-5 text-sky-500" /> : <MapPin className="h-5 w-5 text-sky-500" />}
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-32 py-4 bg-slate-950 border border-slate-700 rounded-2xl leading-5 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-inner text-base font-mono"
              placeholder={mode === 'cadastral' ? "Например: 77:01:0001001:1023" : "Например: Москва, ул. Мясницкая..."}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setIsDropdownOpen(true); setSearchError(null); }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={(e) => e.key === 'Enter' && query && !isLoading && handleSearch()}
              disabled={isLoading && !isFinished}
              autoComplete="off"
            />
            {query && (
              <button 
                onClick={() => { setQuery(''); setSuggestions([]); setSearchError(null); }} 
                className="absolute right-36 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                onClick={() => handleSearch()}
                disabled={!query.trim() || (isLoading && !isFinished)}
                className="inline-flex items-center gap-2 px-6 py-2 border border-transparent text-sm leading-5 font-bold rounded-xl text-white bg-sky-600 hover:bg-sky-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] active:scale-95"
              >
                <Download className="w-4 h-4" /> Импорт
              </button>
            </div>

            {/* ЖИВЫЕ ПОДСКАЗКИ АВТОКОМПЛИТА */}
            {isDropdownOpen && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] overflow-hidden z-50 backdrop-blur-md animate-fadeIn">
                <div className="flex flex-col">
                  {suggestions.map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => handleSuggestionClick(obj)}
                      className="px-4 py-3 hover:bg-slate-800/80 border-b border-slate-800/40 last:border-0 cursor-pointer transition-colors flex items-start gap-3 text-left group"
                    >
                      <div className="mt-0.5 shrink-0">
                        <MapPin className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-200 truncate group-hover:text-white transition-colors">{cleanOknName(obj.name)}</h4>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{obj.address}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">КН: {obj.cadastralNumber || obj.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isLoading && (
            <div className="mt-6 flex items-center justify-center gap-3 text-xs flex-wrap">
              <span className="text-slate-500 font-medium">Рекомендуемые:</span>
              {RECOMMENDED.map((rec) => {
                const displayValue = mode === 'cadastral' ? rec.cadastralNumber : rec.address;
                const valueToSet = mode === 'cadastral' ? rec.cadastralNumber : rec.address;
                return (
                  <button
                    key={rec.id}
                    onClick={() => {
                      setQuery(valueToSet);
                      // При клике на плитку/рекомендацию загружаем именно тот объект, который к ней привязан (по ID или кадастровому номеру)
                      // Используем findObject для надёжного поиска в ALL_OBJECTS, передаём полный объект как directObject
                      const target = findObject(rec.cadastralNumber || rec.id || valueToSet);
                      handleSearch(valueToSet, target || undefined);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-colors font-mono flex items-center gap-1.5 shadow-sm max-w-[220px] overflow-hidden"
                    title={displayValue}
                  >
                    <span className="truncate">{displayValue}</span>
                    {rec.isStarred && (
                      <svg className="w-3 h-3 text-sky-400 fill-sky-400 shrink-0" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Ошибка поиска — показывается после завершения имитации загрузки, если объект не найден по кадастру или адресу */}
          {searchError && (
            <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
              <div className="flex-1">
                <span className="font-bold">{searchError}</span>
              </div>
              <button
                onClick={() => {
                  setSearchError(null);
                  setQuery('');
                }}
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-red-500/40 hover:bg-red-500/20 transition active:scale-95"
              >
                Очистить
              </button>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl animate-fadeIn">
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                {isFinished ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Activity className="w-5 h-5 text-sky-400 animate-pulse" />
                )}
                Статус загрузки данных из внешних систем:
              </h3>
              {isFinished && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Успешно
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">РОСРЕЕСТР</div>
                    <div className="text-sm font-bold text-slate-200">База ЕГРН</div>
                  </div>
                  <Database className={`w-5 h-5 ${egrnProgress === 100 ? 'text-blue-400' : 'text-slate-600'}`} />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mb-2 relative z-10">
                  <span>Основные характеристики</span>
                  <span className="font-mono text-blue-400 font-bold">{egrnProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden relative z-10 border border-slate-800">
                  <div className="bg-blue-500 h-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: `${egrnProgress}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">МОСКОМАРХИТЕКТУРА</div>
                    <div className="text-sm font-bold text-slate-200">ГИС ОГД Москвы</div>
                  </div>
                  <Building className={`w-5 h-5 ${ogdProgress === 100 ? 'text-emerald-400' : 'text-slate-600'}`} />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mb-2 relative z-10">
                  <span>Зоны регулирования</span>
                  <span className="font-mono text-emerald-400 font-bold">{ogdProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden relative z-10 border border-slate-800">
                  <div className="bg-emerald-500 h-full transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.8)]" style={{ width: `${ogdProgress}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">ДЭПЭКОНОМ / ЦИАН</div>
                    <div className="text-sm font-bold text-slate-200">База «Аналитика»</div>
                  </div>
                  <Globe className={`w-5 h-5 ${cianProgress === 100 ? 'text-purple-400' : 'text-slate-600'}`} />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mb-2 relative z-10">
                  <span>Цены предложений</span>
                  <span className="font-mono text-purple-400 font-bold">{cianProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden relative z-10 border border-slate-800">
                  <div className="bg-purple-500 h-full transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.8)]" style={{ width: `${cianProgress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 h-32 overflow-y-auto mb-6 custom-scrollbar shadow-inner relative">
              <div className="absolute top-2 right-3 flex items-center gap-1.5 opacity-50">
                <Terminal className="w-3 h-3 text-slate-500" />
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Console</span>
              </div>
              <div className="space-y-1.5">
                {logs.map((log, idx) => (
                  <div key={idx} className="font-mono text-xs">
                    <span className="text-slate-500">{log.substring(0, 10)}</span>
                    <span className={`ml-2 ${log.includes('✔') ? 'text-emerald-400 font-bold' : log.includes('Ошибка') ? 'text-red-400' : 'text-slate-300'}`}>
                      {log.substring(10)}
                    </span>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>

            <button
              disabled={!isFinished}
              onClick={handleProceed}
              className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${
                isFinished 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] cursor-pointer active:scale-[0.98]' 
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
              }`}
            >
              {isFinished ? (
                <>
                  <FileText className="w-5 h-5" />
                  Перейти к цифровому паспорту
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                'Идет сбор данных...'
              )}
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
--- КОНЕЦ ФАЙЛА: src/components/SearchPanel.tsx ---

--- СТАРТ ФАЙЛА: src/components/useObjectPhotos.ts ---
import { useState, useEffect } from 'react';
import { OknObject } from '../types';

export const useObjectPhotos = (okn: OknObject | null) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!okn) {
      setPhotos([]);
      return;
    }

    let isMounted = true;
    setError(false);

    // Если в базе есть локальные фото — используем их сразу, без Unsplash
    const hasLocalPhotos = okn.photos && okn.photos.length > 0 && okn.photos.some(p => p.startsWith('/photos/'));
    if (hasLocalPhotos) {
      setPhotos(okn.photos!);
      setLoading(false);
      return;
    }

    // Если в базе есть внешние фото (Unsplash и т.д.) — используем их как есть
    const hasExternalPhotos = okn.photos && okn.photos.length > 0;
    if (hasExternalPhotos) {
      setPhotos(okn.photos!);
      setLoading(false);
      return;
    }

    // Нет фото вообще — возвращаем пустой массив, UI покажет плейсхолдер
    if (isMounted) {
      setPhotos([]);
      setError(true);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [okn]);

  return { photos, loading, error };
};
--- КОНЕЦ ФАЙЛА: src/components/useObjectPhotos.ts ---

--- СТАРТ ФАЙЛА: src/components/UserProfileModal.tsx ---
import React, { useEffect, useState } from 'react';

import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Edit,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  Trophy,
  User,
  X,
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName?: string;
  onSave?: (name: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ 
  isOpen, 
  onClose,
  currentName = 'Иванов Алексей Владимирович',
  onSave 
}) => {
  const [name, setName] = useState(currentName);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'reports'>('personal');
  
  // Динамический список отчётов
  const [reports] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    name: name,
    email: 'a.ivanov@gbu-mos.ru',
    phone: '+7 (495) 123-45-67',
    dateJoined: '2012-03-15'
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Сбрасываем стейт при закрытии модалки
  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setActiveTab('personal');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setName(formData.name);
    if (onSave) onSave(formData.name);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative animate-slideUp flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {!isEditing ? (
          // --- РЕЖИМ ПРОСМОТРА ПРОФИЛЯ ---
          <>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
              title="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Profile Info Container */}
            <div className="px-8 pb-8 pt-8 relative overflow-y-auto">
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center shadow-lg mb-6 relative">
                <User className="h-12 w-12 text-sky-400" />
                <div className="absolute bottom-0 right-0 h-5 w-5 bg-emerald-500 border-4 border-slate-900 rounded-full" title="В сети"></div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">{name}</h2>
                  <div className="flex items-center flex-wrap gap-3 mt-1">
                    <p className="text-sky-400 font-medium flex items-center gap-2">
                      Ведущий оценщик ГБУ «Центр кадастровой оценки»
                    </p>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      <ShieldCheck className="h-3 w-3" />
                      Аттестат № 0034-789
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition border border-slate-700 whitespace-nowrap shadow-sm hover:shadow-md"
                >
                  <Edit className="h-4 w-4" />
                  Редактировать
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Contact & General */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Контактная информация</h3>
                  
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-mono">{formData.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-mono">{formData.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-sm">В организации с: <strong className="text-slate-200">15 марта 2012 г.</strong></span>
                  </div>
                </div>

                {/* Right Column: Professional Stats */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Профессиональная сводка</h3>
                  
                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Briefcase className="h-4 w-4 text-sky-400" />
                    <div className="text-sm">
                      <span className="text-slate-400">Опыт работы:</span> <strong className="text-slate-200">14 лет (с 2012 года)</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Trophy className="h-4 w-4 text-emerald-400" />
                    <div className="text-sm">
                      <span className="text-slate-400">Оценено объектов:</span> <strong className="text-slate-200">347</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400/20" />
                    <div className="text-sm flex items-center gap-1.5">
                      <span className="text-slate-400">Рейтинг:</span>
                      <strong className="text-slate-200">4.92 / 5.0</strong>
                      <span className="text-xs text-slate-500">(128 отзывов)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-8">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Специализация и достижения</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 bg-gradient-to-br from-sky-900/20 to-slate-900 border border-sky-500/20 p-4 rounded-xl hover:border-sky-500/40 transition">
                    <Award className="h-5 w-5 text-sky-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Оценка ОКН</h4>
                      <p className="text-xs text-slate-400 mt-1">Профилирующая специализация (объекты культурного наследия).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20 p-4 rounded-xl hover:border-emerald-500/40 transition">
                    <Trophy className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">Лучший оценщик 2024</h4>
                      <p className="text-xs text-slate-400 mt-1">Награда ГБУ за проведение более 200 сложнейших экспертиз.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // --- РЕЖИМ РЕДАКТИРОВАНИЯ ---
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 flex-shrink-0">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-sky-500" />
                Редактирование профиля
              </h2>
              <button 
                onClick={() => setIsEditing(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center border-b border-slate-800 px-6 flex-shrink-0">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-4 py-4 text-sm font-semibold transition border-b-2 ${
                  activeTab === 'personal' 
                    ? 'text-sky-400 border-sky-400' 
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                Личные данные
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-4 text-sm font-semibold transition border-b-2 ${
                  activeTab === 'reports' 
                    ? 'text-sky-400 border-sky-400' 
                    : 'text-slate-400 border-transparent hover:text-slate-200'
                }`}
              >
                Журнал отчётов
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-y-auto overflow-x-hidden">
              {activeTab === 'personal' ? (
                <div className="space-y-6">
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-500" />
                      ФИО
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-slate-200 outline-none transition"
                      placeholder="Введите ваше ФИО"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      Электронная почта
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-slate-200 outline-none transition"
                      placeholder="example@mail.com"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-500" />
                      Телефон
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-slate-200 outline-none transition"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      В организации с
                    </label>
                    <input 
                      type="date" 
                      name="dateJoined"
                      value={formData.dateJoined}
                      onChange={handleChange}
                      className="bg-slate-950/50 border border-slate-700 focus:border-sky-500 rounded-xl px-4 py-3 text-slate-200 outline-none transition"
                    />
                  </div>

                </div>
              ) : (
                <div className="animate-fadeIn">
                  {reports.length > 0 ? (
                    <div className="space-y-4">
                      {reports.map((report, idx) => (
                        <div key={idx} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                          Отчёт {report.id}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center px-4">
                      <div className="bg-slate-800/50 p-6 rounded-full mb-4 border border-slate-700/50">
                        <FileText className="h-12 w-12 text-slate-500" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-200 mb-2">Вы ещё не сформировали ни одного отчёта</h3>
                      <p className="text-sm text-slate-400 max-w-sm mx-auto">
                        Отчёты будут автоматически сохраняться здесь после создания.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {activeTab === 'personal' && (
              <div className="p-6 border-t border-slate-800 flex items-center justify-end gap-3 bg-slate-900/50 flex-shrink-0">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 transition"
                >
                  Отмена
                </button>
                <button 
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/20 active:scale-95 transition flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Сохранить изменения
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
    </div>
  );
};
--- КОНЕЦ ФАЙЛА: src/components/UserProfileModal.tsx ---

--- СТАРТ ФАЙЛА: src/components/WeightsChart.tsx ---
import React, { useState } from 'react';
import { Lightbulb, BookOpen, Calculator } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const WeightsChart: React.FC = () => {
  const [showMethodology, setShowMethodology] = useState(false);

  const data = [
    { name: 'Сравнительный подход', value: 47, price: '27.8 млрд ₽', fill: '#22d3ee' },
    { name: 'Доходный подход', value: 35, price: '15.2 млрд ₽', fill: '#34d399' },
    { name: 'Затратный подход', value: 18, price: '7.3 млрд ₽', fill: '#818cf8' },
  ];

  const WeightsTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-slate-950/90 backdrop-blur-md border border-[#0ea5e9]/40 rounded-xl px-3 py-2 text-xs shadow-2xl">
        <div className="font-semibold text-white">{d.name}</div>
        <div className="text-slate-300 mt-0.5 tabular-nums">{d.value}% <span className="text-slate-500">·</span> {d.price}</div>
      </div>
    );
  };

  const renderBarLabel = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = data[index];
    if (!item) return null;
    return (
      <g>
        <text 
          x={x + width + 5} 
          y={y + height / 2} 
          fill="#f1f5f9" 
          fontSize={12} 
          fontWeight={700} 
          textAnchor="start" 
          dominantBaseline="middle"
        >
          {item.value}%
        </text>
        <text 
          x={x + width + 40} 
          y={y + height / 2} 
          fill="#94a3b8" 
          fontSize={9} 
          textAnchor="start" 
          dominantBaseline="middle"
        >
          {item.price}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Веса подходов</h3>
          <p className="text-xs text-slate-400 mt-0.5">Структура согласования стоимости</p>
        </div>
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg transition-all text-xs font-medium shrink-0"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          Логика расчета
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${showMethodology ? 'max-h-[260px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-6 shadow-inner mb-6 backdrop-blur-sm">
          <div className="mb-3">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2"><BookOpen className="w-4 h-4" /> Концептуальная основа</div>
            <p className="text-[12.5px] leading-tight text-slate-200">Итоговая рыночная стоимость формируется путем процедуры согласования результатов трех подходов. Максимальный вес присваивается сравнительному подходу ввиду наличия репрезентативной рыночной информации. Затратный подход имеет минимальный вес, поскольку он не способен в полной мере отразить нематериальную историко-культурную ценность памятника архитектуры.</p>
          </div>
          <div className="pt-3 border-t border-slate-700">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-2 mt-5"><Calculator className="w-4 h-4" /> Методология и ФСО</div>
            <ul className="space-y-[5px] text-[12.5px] leading-tight">
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Сравнительный подход (Вес 0.47): Максимальная достоверность. Расчет основан на верифицированной выборке из 3-х аналогичных памятников архитектуры в ЦАО Москвы.</li>
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Доходный подход (Вес 0.35): Средняя достоверность. Базируется на экстракции ставок аренды, имеет волатильность из-за долгосрочного прогнозирования.</li>
              <li className="flex gap-2"><span className="text-[#3b82f6] mt-[1px]">–</span> Затратный подход (Вес 0.18): Минимальный вес. Метод рассчитывает затраты на воссоздание коробки здания и стоимость земли, но принципиально не способен учесть нематериальную историко-культурную и архитектурную ценность ОКН.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full h-72 -mx-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical" 
            margin={{ top: 15, right: 120, left: 5, bottom: 5 }}
          >
            <defs>
              <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="3.5" flood-color="#ffffff" flood-opacity="0.4" />
              </filter>
            </defs>
            <CartesianGrid stroke="#1e293b" horizontal={false} />
            <XAxis 
              type="number" 
              domain={[0, 60]} 
              tick={{ fill: '#64748b', fontSize: 9 }} 
              axisLine={{ stroke: '#475569' }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fill: '#64748b', fontSize: 10 }} 
              axisLine={{ stroke: '#475569' }}
              width={135}
            />
            <Tooltip content={WeightsTooltip} />
            <Bar 
              dataKey="value" 
              barSize={30} 
              radius={[0, 5, 5, 0]} 
              filter="url(#barGlow)"
              label={renderBarLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-1 text-center text-[10px]">
        {data.map((entry, index) => (
          <div key={index}>
            <div className="font-mono font-bold text-base tabular-nums" style={{ color: entry.fill }}>
              {entry.value}%
            </div>
            <div className="text-slate-400 leading-none mt-px">{entry.name.replace(' подход', '')}</div>
            <div className="text-[9px] text-slate-500 font-medium tabular-nums mt-px">{entry.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeightsChart;
--- КОНЕЦ ФАЙЛА: src/components/WeightsChart.tsx ---

--- СТАРТ ФАЙЛА: src/data/allObjects.ts ---
/** Справочник объектов для офлайн-режима (фото, метаданные). */
/** Полностью обновлённая база — 37 объектов, все с реальными фото /photos/папка/1.jpg
 *  ВАЖНО: coordinates — ЖЁСТКО ЗАФИКСИРОВАННЫЕ реальные GPS-координаты (широта, долгота) по предоставленным точным данным.
 *  Все маркеры на картах (PassportPanel, GlobalMap) и центры берут данные ИСКЛЮЧИТЕЛЬНО отсюда.
 *  Нет случайных/геокодированных значений. Все 37 объектов имеют точные координаты.
 *
 *  Охранные статусы (okn_category) обновлены по реальным проверенным данным (проверка 2026):
 *  8 Федерального значения, 28 Регионального значения, 1 без статуса ОКН (spiridonovka_12 - современный дом 1969 г.).
 *  Нет объектов "местного значения" в реестре по актуальным данным. В GlobalMap 'Local' используется для "Без статуса".
 */

export const ALL_OBJECTS = [
  { id: 'obj-1', name: 'Доходный дом страхового общества Россия', address: 'г. Москва, Сретенский бульвар, 6/1', coordinates: [55.766324, 37.632454], photosFolder: 'rossiya', photos: ['/photos/rossiya/1.jpg'], base_price: 1850000000, cadastralNumber: '77:01:0001001:1001', floors: 6, okn_category: 'Объект культурного наследия федерального значения', significance: 'Федерального значения', metadata: { year_built: '1901', walls_material: 'Кирпич', history: 'Доходный дом страхового общества «Россия», арх. Н.М. Проскурнин', wear_pct: 22, area: 13882, floors: 6, description: 'Построен для страхового общества «Россия» архитектором Н.М. Проскурниным. Один из самых технически совершенных домов Москвы того времени — с собственной электростанцией, вентиляцией и лифтами. В советские годы здесь работали Михаил Булгаков и Надежда Крупская.' }, metrics: { district: 'Сретенский бульвар, Центральный АО', analogCount: 15, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 98 } } },
  { id: 'obj-2', name: 'Усадьба А.Л. Кнопа (неоготический особняк)', address: 'г. Москва, Колпачный переулок, дом 5, строение 2', coordinates: [55.757752, 37.641031], photosFolder: 'kolpachny_5', photos: ['/photos/kolpachny_5/1.jpg'], base_price: 245000000, cadastralNumber: '77:01:0001001:1023', floors: 5, okn_category: 'Объект культурного наследия федерального значения', significance: 'Федерального значения', metadata: { year_built: '1890', walls_material: 'Кирпич', history: 'Усадьба А.Л. Кнопа, неоготика, арх. Карл Трейман', wear_pct: 18, area: 850, floors: 5, description: 'Неоготический особняк 1900–1901 годов, построенный Карлом Трейманом для промышленника Андреаса Кнопа. Здание напоминает сказочный замок и считается одним из лучших образцов неоготики в Москве. Из этого дома в 1941 году ушла на фронт Зоя Космодемьянская.' }, metrics: { district: 'Колпачный пер., Центральный АО', analogCount: 12, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 96 } } },
  { id: 'obj-3', name: 'Особняк Зинаиды Морозовой (Дом Шехтеля)', address: 'г. Москва, Спиридоновка, 17', coordinates: [55.761664, 37.595084], photosFolder: 'spiridonovka_17', photos: ['/photos/spiridonovka_17/1.jpg'], base_price: 980000000, cadastralNumber: '77:01:0003020:4105', floors: 2, okn_category: 'Объект культурного наследия федерального значения', significance: 'Федерального значения', metadata: { year_built: '1894–1898', walls_material: 'Кирпич', history: 'Шедевр раннего московского модерна, арх. Ф.О. Шехтель, участие М.А. Врубеля', wear_pct: 15, area: 2150, floors: 2, description: 'Шедевр раннего московского модерна, построенный в 1893–1898 годах Фёдором Шехтелем для Зинаиды Морозовой. В оформлении интерьеров принимал участие Михаил Врубель. Сегодня здесь находится Дом приёмов Министерства иностранных дел РФ.' }, metrics: { district: 'Пресненский, Центральный АО', analogCount: 10, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~9 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 97 } } },
  { id: 'obj-4', name: 'Доходный дом в Колпачном переулке', address: 'г. Москва, Колпачный переулок, д. 10', coordinates: [55.758416, 37.641755], photosFolder: 'kolpachny_10', photos: ['/photos/kolpachny_10/1.jpg'], base_price: 165000000, cadastralNumber: '77:01:0001001:1045', floors: 2, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1893', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 25, area: 471, floors: 2, description: 'Кирпичное здание 1917 года, расположенное рядом с древними «Палатами Мазепы» XVI–XVII веков. Несмотря на позднюю дату постройки, оно органично вписывается в историческую застройку Ивановской горки.' }, metrics: { district: 'Колпачный пер., Центральный АО', analogCount: 8, densityLevel: 'Средняя', transport: { quality: 'Хорошая', time: '~9 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.6, percent: 91 } } },
  { id: 'obj-5', name: 'Таганская автоматическая телефонная станция', address: 'г. Москва, Покровский бульвар, вл. 5, стр. 1, 2', coordinates: [55.757303, 37.646875], photosFolder: 'pokrovskiy_5', photos: ['/photos/pokrovskiy_5/1.jpg'], base_price: 520000000, cadastralNumber: '77:01:0001001:1056', floors: 7, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1894', walls_material: 'Кирпич', history: 'Памятник конструктивизма, здание АТС (телефонная станция)', wear_pct: 52, area: 3200, floors: 7, description: 'Таганская автоматическая телефонная станция, построенная в 1929 году в стиле конструктивизма архитектором В.С. Мартыновичем. Одна из первых АТС в Москве — символ технического прогресса советской эпохи.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 11, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.8, percent: 95 } } },
  { id: 'obj-6', name: 'Цековский дом на Спиридоновке (1969)', address: 'г. Москва, Спиридоновка, 12', coordinates: [55.760731, 37.595567], photosFolder: 'spiridonovka_12', photos: ['/photos/spiridonovka_12/1.jpg'], base_price: 890000000, cadastralNumber: '77:01:0001001:1067', floors: 12, okn_category: 'Не является объектом культурного наследия', significance: 'Нет статуса ОКН', metadata: { year_built: '1969', walls_material: 'Кирпич', history: 'Жилой дом ЦК КПСС', wear_pct: 61, area: 15400, floors: 12, description: '12-этажный кирпичный дом 1969 года. Возведён в эпоху брежневского модернизма на престижной улице Спиридоновка. Известен как «цековский дом», где получала квартиры советская элита.' }, metrics: { district: 'Пресненский, Центральный АО', analogCount: 9, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~8 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.5, percent: 89 } } },
  { id: 'obj-7', name: 'Особняк А.И. Кекушевой на Остоженке', address: 'г. Москва, ул. Остоженка, д. 21', coordinates: [55.739778, 37.597148], photosFolder: 'ostozhenka_21', photos: ['/photos/ostozhenka_21/1.jpg'], base_price: 720000000, cadastralNumber: '77:01:0001053:1034', floors: 2, okn_category: 'Объект культурного наследия федерального значения', significance: 'Федерального значения', metadata: { year_built: '1900–1903', walls_material: 'Кирпич', history: 'Шедевр московского модерна, построенный знаменитым архитектором Львом Кекушевым для своей супруги. Здание напоминает романский средневековый замок с граненой башенкой, асимметричным фасадом и огромной трехметровой скульптурой льва на фронтоне.', wear_pct: 15, area: 850, floors: 2, description: 'Шедевр московского модерна, построенный знаменитым архитектором Львом Кекушевым для своей супруги. Здание напоминает романский средневековый замок с граненой башенкой, асимметричным фасадом и огромной трехметровой скульптурой льва на фронтоне.' }, metrics: { district: 'Хамовники, Центральный АО', analogCount: 12, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 97 } } },
  { id: 'obj-8', name: 'Особняк в Малом Никитском переулке', address: 'г. Москва, Малый Никитский пер., 6', coordinates: [55.757451, 37.594734], photosFolder: 'maly_nikitskiy_6', photos: ['/photos/maly_nikitskiy_6/1.jpg'], base_price: 465000000, cadastralNumber: '77:01:0001001:1078', floors: 3, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1897', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 25, area: 1200, floors: 3, description: 'Классический образец московской дореволюционной застройки. Дом сохранил исторические фасады и органично вписывается в престижный район Патриарших прудов.' }, metrics: { district: 'Пресненский, Центральный АО', analogCount: 14, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~3 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 97 } } },
  { id: 'obj-9', name: 'Здание бывшей телефонной станции', address: 'г. Москва, Милютинский пер., 5', coordinates: [55.762495, 37.630605], photosFolder: 'milyutinskiy_5', photos: ['/photos/milyutinskiy_5/1.jpg'], base_price: 610000000, cadastralNumber: '77:01:0001001:1089', floors: 9, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1898', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 33, area: 1800, floors: 9, description: 'Монументальное здание в одном из старейших переулков Москвы. В дореволюционное время Милютинский переулок был центром французской общины города.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 16, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 98 } } },
  { id: 'obj-10', name: 'Доходный дом на Поварской улице', address: 'г. Москва, Поварская ул., 22', coordinates: [55.754897, 37.594248], photosFolder: 'povarskaya_22', photos: ['/photos/povarskaya_22/1.jpg'], base_price: 780000000, cadastralNumber: '77:01:0001001:1100', floors: 4, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1904', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 38, area: 2400, floors: 4, description: 'Уникальное строение на знаменитой Поварской улице. Архитектура отражает роскошь московского ампира и эклектики конца XIX века.' }, metrics: { district: 'Арбат, Центральный АО', analogCount: 10, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~7 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.7, percent: 94 } } },
  { id: 'obj-11', name: 'Доходный дом в Старосадском переулке', address: 'г. Москва, Старосадский пер., д. 9', coordinates: [55.756555, 37.639358], photosFolder: 'starosadskiy_9', photos: ['/photos/starosadskiy_9/1.jpg'], base_price: 395000000, cadastralNumber: '77:01:0001001:1111', floors: 6, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: 'кон. XIX–нач. XX', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 27, area: 1300, floors: 6, description: 'Историческое здание в живописном Старосадском переулке. Формирует уникальную атмосферу района Ивановской горки, одного из самых колоритных мест Москвы.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 12, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~7 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.8, percent: 95 } } },
  { id: 'obj-12', name: 'Палаты Волкова (Дом Юсуповых)', address: 'г. Москва, Большой Харитоньевский переулок 10', coordinates: [55.767184, 37.647364], photosFolder: 'haritonevskiy_10', photos: ['/photos/haritonevskiy_10/1.jpg'], base_price: 425000000, cadastralNumber: '77:01:0001001:1122', floors: 3, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1890', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 10, area: 1500, floors: 3, description: 'Расположен в районе, где в юности часто бывал А.С. Пушкин. Здание отличается изысканной кирпичной кладкой и богатым фасадным декором.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 10, densityLevel: 'Средняя', transport: { quality: 'Хорошая', time: '~8 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.7, percent: 93 } } },
  { id: 'obj-13', name: 'Дом у Златоустовского монастыря', address: 'г. Москва, Малый Златоустинский пер., д. 1', coordinates: [55.760195, 37.633454], photosFolder: 'zlatoustinskiy', photos: ['/photos/zlatoustinskiy/1.jpg'], base_price: 285000000, cadastralNumber: '77:01:0001001:1133', floors: 8, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1901', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 39, area: 900, floors: 8, description: 'Миниатюрный исторический дом в тихом переулке недалеко от Мясницкой улицы. Наздан в честь когда-то располагавшегося неподалеку Златоустовского монастыря.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 11, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.8, percent: 96 } } },
  { id: 'obj-14', name: 'Доходный дом З.А. Перцовой (Дом-сказка)', address: 'г. Москва, Курсовой пер., д. 1/5', coordinates: [55.742358, 37.605929], photosFolder: 'dom_pertsovoy', photos: ['/photos/dom_pertsovoy/1.jpg'], base_price: 1650000000, cadastralNumber: '77:01:0001001:1144', floors: 5, okn_category: 'Объект культурного наследия регионального значения', significance: 'Федерального значения', metadata: { year_built: '1907', walls_material: 'Кирпич', history: 'Уникальное здание в стиле декор-модерна (неорусский стиль).', wear_pct: 18, area: 2500, floors: 5, description: 'Уникальное здание в стиле декор-модерна (неорусский стиль), построенный в 1907 году по эскизам художника Сергея Малютина (автора русской матрешки). Знаменито своими майоликовыми панно с изображением сказочных существ и славянских мифов.' }, metrics: { district: 'Якиманка, Центральный АО', analogCount: 12, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 98 } } },
  { id: 'obj-15', name: 'Особняк Арсения Морозова', address: 'г. Москва, ул. Воздвиженка, д. 16, стр. 1', coordinates: [55.752538, 37.599721], photosFolder: 'vozdvizhenka_16', photos: ['/photos/vozdvizhenka_16/1.jpg'], base_price: 2100000000, cadastralNumber: '77:01:0001001:1155', floors: 2, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1899–1900', walls_material: 'Кирпич', history: 'Особняк в неомавританском стиле, арх. В.А. Мазырин', wear_pct: 12, area: 2200, floors: 2, description: 'Эклектичный особняк в неомавританском стиле, построенный в 1899–1900 годах по проекту архитектора Виктора Мазырина для А.А. Морозова. Здание вдохновлено замком Пена в португальской Синтре и отличается необычными башнями, кружевной резьбой по камню и яркой декоративностью. При постройке вызвал скандал и насмешки современников («дом дурака»). Сегодня используется для официальных приёмов.' }, metrics: { district: 'Арбат, Центральный АО', analogCount: 8, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 98 } } },
  { id: 'obj-16', name: 'Доходный дом на Арбате', address: 'г. Москва, Арбат ул., 29', coordinates: [55.749508, 37.592534], photosFolder: 'arbat_29', photos: ['/photos/arbat_29/1089706.webp'], base_price: 875000000, cadastralNumber: '77:01:0001001:1166', floors: 6, okn_category: 'Объект культурного наследия регионального значения', significance: 'Федерального значения', metadata: { year_built: '1900–1910', walls_material: 'Кирпич', history: 'Доходный дом в стиле модерн', wear_pct: 35, area: 2400, floors: 6, description: 'Культовое здание на Старом Арбате. Один из ярких образцов московского модерна начала XX века.' }, metrics: { district: 'Арбат, Центральный АО', analogCount: 16, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~3 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.7, percent: 94 } } },
  { id: 'obj-17', name: 'Доходный дом в Фроловом переулке', address: 'г. Москва, Фролов переулок 2', coordinates: [55.765664, 37.634629], photosFolder: 'frolov_2', photos: ['/photos/frolov_2/1.jpg'], base_price: 365000000, cadastralNumber: '77:01:0001001:1177', floors: 6, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1905', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 42, area: 1250, floors: 6, description: 'Характерная для старой Москвы архитектуры в переулках близ Сретенского бульвара. Изящный декор и сохранившаяся историческая планировка.' }, metrics: { district: 'Красносельский, Центральный АО', analogCount: 11, densityLevel: 'Средняя', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.6, percent: 92 } } },
  { id: 'obj-18', name: 'Палаты Украинцевых', address: 'г. Москва, Хохловский пер., д. 7-9, стр. 2', coordinates: [55.756353, 37.642512], photosFolder: 'hohlovskiy_7', photos: ['/photos/hohlovskiy_7/1.jpg'], base_price: 485000000, cadastralNumber: '77:01:0001001:1188', floors: 3, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1780–1800', walls_material: 'Кирпич/камень', history: 'Жилой дом служителей Московского архива Коллегии иностранных дел', wear_pct: 36, area: 1850, floors: 3, description: 'Жилой дом служителей Московского архива Коллегии иностранных дел, построенный в 1808 году. Часть исторического комплекса, связанного с дипломатической историей России.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 14, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~6 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 96 } } },
  { id: 'obj-19', name: 'Доходный дом у Лубянки', address: 'г. Москва, Лубянский проезд, 15', coordinates: [55.758368, 37.631027], photosFolder: 'lubyanskiy_15', photos: ['/photos/lubyanskiy_15/1.jpg'], base_price: 520000000, cadastralNumber: '77:01:0001001:1199', floors: 5, okn_category: 'Объект культурного наследия федерального значения', significance: 'Федерального значения', metadata: { year_built: '1888', walls_material: 'Кирпич', history: 'Доходный дом рядом с Лубянкой', wear_pct: 40, area: 2700, floors: 5, description: 'Классический представитель застройки Китай-города. Монументальное здание в стиле эклектики.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 9, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~3 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.4, percent: 86 } } },
  { id: 'obj-20', name: 'Усадьба Чертковых на Мясницкой', address: 'г. Москва, Мясницкая ул., 7', coordinates: [55.761845, 37.630983], photosFolder: 'myasnitskaya_7', photos: ['/photos/myasnitskaya_7/1.jpg'], base_price: 485000000, cadastralNumber: '77:01:0001001:1200', floors: 3, okn_category: 'Объект культурного наследия федерального значения', significance: 'Федерального значения', metadata: { year_built: '1898', walls_material: 'Кирпич', history: 'Доходный дом конца XIX века в стиле эклектики', wear_pct: 32, area: 2100, floors: 3, description: 'Классический представитель застройки Мясницкой улицы. Один из лучших сохранившихся доходных домов района.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 11, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.5, percent: 89 } } },
  { id: 'obj-21', name: 'Особняк в стиле неоренессанса', address: 'г. Москва, Никитский бульвар, 11', coordinates: [55.756241, 37.598688], photosFolder: 'nikitskiy_11', photos: ['/photos/nikitskiy_11/1.jpg'], base_price: 1340000000, cadastralNumber: '77:01:0001001:1211', floors: 4, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1910', walls_material: 'Кирпич', history: 'Особняк в стиле неоренессанса', wear_pct: 15, area: 1350, floors: 4, description: 'Памятник архитектуры регионального значения. Элегантный особняк на престижном Никитском бульваре.' }, metrics: { district: 'Пресненский, Центральный АО', analogCount: 11, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 95 } } },
  { id: 'obj-22', name: 'Особняк в Подкопаевском переулке', address: 'г. Москва, Подкопаевский пер., д. 4, стр. 1', coordinates: [55.753381, 37.642593], photosFolder: 'podkopaevskiy_4', photos: ['/photos/podkopaevskiy_4/1.jpg'], base_price: 310000000, cadastralNumber: '77:01:0001001:1222', floors: 4, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1845', walls_material: 'Кирпич/камень', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 55, area: 1100, floors: 4, description: 'Типичный московский особняк в старом районе Подкопаи. Находится по соседству с церковью Святителя Николая, известной с глубокой древности.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 9, densityLevel: 'Средняя', transport: { quality: 'Хорошая', time: '~6 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.6, percent: 91 } } },
  { id: 'obj-23', name: 'Дворец Апраксиных-Трубецких (Дом-комод)', address: 'г. Москва, Покровка ул., 22', coordinates: [55.759902, 37.647714], photosFolder: 'pokrovka_22', photos: ['/photos/pokrovka_22/1.jpg'], base_price: 780000000, cadastralNumber: '77:01:0001001:1233', floors: 3, okn_category: 'Объект культурного наследия федерального значения', significance: 'Федерального значения', metadata: { year_built: '1766', walls_material: 'Кирпич/камень', history: 'Доходный дом в стиле неоклассицизма', wear_pct: 20, area: 2900, floors: 3, description: 'Один из лучших образцов застройки Покровки. Крупный доходный дом с выразительным фасадом.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 10, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~5 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.6, percent: 92 } } },
  { id: 'obj-24', name: 'Усадьба Истоминых на Пречистенке', address: 'г. Москва, Пречистенка ул., 8', coordinates: [55.742456, 37.596663], photosFolder: 'prechistenka_8', photos: ['/photos/prechistenka_8/1.jpg'], base_price: 1920000000, cadastralNumber: '77:01:0001001:1244', floors: 3, okn_category: 'Объект культурного наследия федерального значения', significance: 'Федерального значения', metadata: { year_built: '1812', walls_material: 'Кирпич', history: 'Усадьба в стиле классицизма', wear_pct: 18, area: 980, floors: 3, description: 'Памятник архитектуры федерального значения. Один из лучших сохранившихся особняков Пречистенки.' }, metrics: { district: 'Хамовники, Центральный АО', analogCount: 13, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 97 } } },
  { id: 'obj-25', name: 'Купеческий особняк на Пятницкой', address: 'г. Москва, Пятницкая ул., 17', coordinates: [55.741893, 37.627725], photosFolder: 'pyatnitskaya_17', photos: ['/photos/pyatnitskaya_17/1.jpg'], base_price: 312000000, cadastralNumber: '77:01:0001001:1255', floors: 4, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1890', walls_material: 'Кирпич', history: 'Доходный дом в стиле модерн', wear_pct: 28, area: 1850, floors: 4, description: 'Расположен в историческом районе Замоскворечья. Характерный пример московского модерна.' }, metrics: { district: 'Замоскворецкий, Центральный АО', analogCount: 9, densityLevel: 'Средняя', transport: { quality: 'Хорошая', time: '~6 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.6, percent: 91 } } },
  { id: 'obj-26', name: 'Доходный дом А.Ф. Мейера', address: 'г. Москва, Садовая-Каретная ул., 12', coordinates: [55.772551, 37.608303], photosFolder: 'sadovaya_karetnaya_12', photos: ['/photos/sadovaya_karetnaya_12/1.jpg'], base_price: 670000000, cadastralNumber: '77:01:0001001:1266', floors: 5, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1917', walls_material: 'Кирпич', history: 'Крупный доходный дом начала XX века', wear_pct: 30, area: 4100, floors: 5, description: 'Монументальное здание с выразительным фасадом. Один из крупнейших доходных домов Садового кольца.' }, metrics: { district: 'Тверской, Центральный АО', analogCount: 7, densityLevel: 'Средняя', transport: { quality: 'Хорошая', time: '~4 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.3, percent: 85 } } },
  { id: 'obj-27', name: 'Доходный дом у Самотёки', address: 'г. Москва, Садовая-Самотечная ул., 8', coordinates: [55.775839, 37.618641], photosFolder: 'samotechnaya_8', photos: ['/photos/samotechnaya_8/1.jpg'], base_price: 610000000, cadastralNumber: '77:01:0001001:1277', floors: 4, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1891', walls_material: 'Кирпич', history: 'Крупный доходный дом у Самотёки', wear_pct: 29, area: 3800, floors: 4, description: 'Мощное здание с выразительным угловым решением. Характерный пример крупной доходной застройки Садового кольца.' }, metrics: { district: 'Тверской, Центральный АО', analogCount: 5, densityLevel: 'Средняя', transport: { quality: 'Хорошая', time: '~4 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.1, percent: 82 } } },
  { id: 'obj-28', name: 'Доходный дом Московского купеческого общества', address: 'г. Москва, ул. Солянка, д. 12, стр. 3', coordinates: [55.753232, 37.641614], photosFolder: 'solyanka_12', photos: ['/photos/solyanka_12/1.jpg'], base_price: 425000000, cadastralNumber: '77:01:0001001:1288', floors: 7, okn_category: 'Объект культурного наследия регионального значения', significance: 'Федерального значения', metadata: { year_built: '1915', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 48, area: 1700, floors: 7, description: 'Исторический дом, органично вплетенный в сложную застройку Солянки. Рядом находятся легендарные соляные подвалы, давшие название всей улице.' }, metrics: { district: 'Таганский, Центральный АО', analogCount: 13, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 96 } } },
  { id: 'obj-29', name: 'Особняк в Спиридоновском переулке', address: 'г. Москва, Спиридоновка, 3-5', coordinates: [55.759518, 37.596672], photosFolder: 'spiridonovka_3_5', photos: ['/photos/spiridonovka_3_5/1.jpg'], base_price: 695000000, cadastralNumber: '77:01:0001001:1299', floors: 2, okn_category: 'Объект культурного наследия регионального значения', significance: 'Федерального значения', metadata: { year_built: 'XVII век', walls_material: 'Белый камень', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 19, area: 2200, floors: 2, description: 'Значимый элемент застройки исторического района. Располагается по соседству с выдающимися архитектурными памятниками московского модерна.' }, metrics: { district: 'Пресненский, Центральный АО', analogCount: 7, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.6, percent: 92 } } },
  { id: 'obj-30', name: 'Доходный дом Адольфа Эрихсона', address: 'г. Москва, Спиридоновка, 21', coordinates: [55.762100, 37.590201], photosFolder: 'spiridonovka_21', photos: ['/photos/spiridonovka_21/1.jpg'], base_price: 410000000, cadastralNumber: '77:01:0001001:1300', floors: 5, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1912', walls_material: 'Кирпич', history: 'Доходный дом, арх. Адольф Эрихсон', wear_pct: 28, area: 1400, floors: 5, description: 'Доходный дом 1898 года, построенный архитектором Адольфом Эрихсоном. Позже надстроен двумя этажами и сохранил элегантный облик конца XIX века.' }, metrics: { district: 'Пресненский, Центральный АО', analogCount: 9, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~6 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.7, percent: 94 } } },
  { id: 'obj-31', name: 'Доходный дом на Сретенском бульваре', address: 'г. Москва, Сретенский бульвар 2 стр 1', coordinates: [55.766861, 37.630043], photosFolder: 'sretenskiy_2', photos: ['/photos/sretenskiy_2/1.jpg'], base_price: 680000000, cadastralNumber: '77:01:0001001:1311', floors: 4, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: 'XIX век', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 41, area: 2500, floors: 4, description: 'Здание расположено на Бульварном кольце, украшая одну из самых оживленных улиц центра Москвы. Привлекает внимание строгими пропорциями и выразительным фасадом.' }, metrics: { district: 'Красносельский, Центральный АО', analogCount: 15, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~3 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.8, percent: 97 } } },
  { id: 'obj-32', name: 'Доходный дом на Сретенском бульваре', address: 'г. Москва, Сретенский бульвар 9', coordinates: [55.767525, 37.630805], photosFolder: 'sretenskiy_9', photos: ['/photos/sretenskiy_9/1.jpg'], base_price: 545000000, cadastralNumber: '77:01:0001001:1322', floors: 3, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1915', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 35, area: 2100, floors: 3, description: 'Монументальный доходный дом, построенный в пору расцвета московского предпринимательства. С его верхних этажей открывается живописный вид на бульвар.' }, metrics: { district: 'Мещанский, Центральный АО', analogCount: 12, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.7, percent: 95 } } },
  { id: 'obj-33', name: 'Особняк Демидовых', address: 'г. Москва, Малый Толмачёвский пер., 4', coordinates: [55.740232, 37.619891], photosFolder: 'tolmachevskiy_4', photos: ['/photos/tolmachevskiy_4/1.jpg'], base_price: 355000000, cadastralNumber: '77:01:0001001:1333', floors: 6, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1850–1870', walls_material: 'Кирпич', history: 'Особняк в стиле модерн', wear_pct: 24, area: 980, floors: 6, description: 'Уютный особняк в историческом Замоскворечье. Характерный пример камерной застройки района.' }, metrics: { district: 'Замоскворецкий, Центральный АО', analogCount: 10, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~6 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.7, percent: 93 } } },
  { id: 'obj-34', name: 'Здание на Тверской улице (1940-е)', address: 'г. Москва, Тверская ул., 15', coordinates: [55.762142, 37.608779], photosFolder: 'tverskaya_15', photos: ['/photos/tverskaya_15/1.jpg'], base_price: 2150000000, cadastralNumber: '77:01:0001001:1344', floors: 10, okn_category: 'Объект культурного наследия регионального значения', significance: 'Федерального значения', metadata: { year_built: '1940-е', walls_material: 'Кирпич', history: 'Историческое здание на главной улице Москвы', wear_pct: 45, area: 3200, floors: 10, description: 'Один из первых многоэтажных доходных домов Тверской. Монументальное здание в стиле эклектики.' }, metrics: { district: 'Тверской, Центральный АО', analogCount: 14, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~2 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 95 } } },
  { id: 'obj-35', name: 'Доходный дом в Якиманском переулке', address: 'г. Москва, Якиманский переулок, 6', coordinates: [55.736998, 37.611145], photosFolder: 'yakimanskiy_6', photos: ['/photos/yakimanskiy_6/1.jpg'], base_price: 275000000, cadastralNumber: '77:01:0001001:1355', floors: 17, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1890–1900', walls_material: 'Кирпич', history: 'Доходный дом в Замоскворечье', wear_pct: 33, area: 1950, floors: 17, description: 'Типичный представитель застройки Якиманки. Крупный доходный дом с выразительной архитектурой.' }, metrics: { district: 'Якиманка, Центральный АО', analogCount: 8, densityLevel: 'Средняя', transport: { quality: 'Хорошая', time: '~8 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.2, percent: 84 } } },
  { id: 'obj-36', name: 'Дом на улице Забелина', address: 'г. Москва, ул. Забелина, д. 3', coordinates: [55.754716, 37.639556], photosFolder: 'zabelina_3', photos: ['/photos/zabelina_3/1.jpg'], base_price: 520000000, cadastralNumber: '77:01:0001001:1366', floors: 3, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1885', walls_material: 'Кирпич', history: 'Историческая застройка конца XIX — начала XX века', wear_pct: 31, area: 2000, floors: 3, description: 'Расположен на исторической улице, названной в честь историка Ивана Забелина. Здание является важной частью архитектурного ансамбля Ивановской горки.' }, metrics: { district: 'Басманный, Центральный АО', analogCount: 14, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 98 } } },
  { id: 'obj-37', name: 'Особняк на Зубовском бульваре', address: 'г. Москва, Зубовский бульвар, 5', coordinates: [55.735878, 37.589146], photosFolder: 'zubovsky_5', photos: ['/photos/zubovsky_5/1.jpg'], base_price: 425000000, cadastralNumber: '77:01:0001001:1377', floors: 5, okn_category: 'Объект культурного наследия регионального значения', significance: 'Регионального значения', metadata: { year_built: '1912', walls_material: 'Кирпич', history: 'Особняк в стиле классицизма', wear_pct: 25, area: 1100, floors: 5, description: 'Красивый особняк недалеко от Парка культуры. Камерный памятник архитектуры в районе Хамовники.' }, metrics: { district: 'Хамовники, Центральный АО', analogCount: 12, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~6 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 96 } } },
];
--- КОНЕЦ ФАЙЛА: src/data/allObjects.ts ---

--- СТАРТ ФАЙЛА: src/data/mockAnalogues.ts ---
import { Analogue } from '../types';

/** Моковые аналоги для офлайн-режима. */

export const LOCAL_MOCK_ANALOGUES: Analogue[] = [
  {
    "id": "analog-1",
    "address": "г. Москва, Хохловский пер., д. 7-9, стр. 2",
    "area": 1100.0,
    "year_built": 1905,
    "floors": 3,
    "walls_material": "Кирпич",
    "is_okn": 1.0,
    "wear_pct": 35.0,
    "dist_metro_min": 10.0,
    "infrastructure_rate": 4.0,
    "noise_rate": 2.0,
    "parking": 1.0,
    "view_rate": 4.0,
    "base_price": 540000000.0,
    "cyan_url": "https://cian.ru/sale/commercial/123456/",
    "similarity": 0,
    "price_per_sqm": 0,
    "coordinates": [55.756353, 37.642512]
  },
  {
    "id": "analog-2",
    "address": "г. Москва, Подкопаевский пер., д. 4, стр. 1",
    "area": 1450.0,
    "year_built": 1880,
    "floors": 2,
    "walls_material": "Кирпич с каменным цоколем",
    "is_okn": 1.0,
    "wear_pct": 40.0,
    "dist_metro_min": 12.0,
    "infrastructure_rate": 4.5,
    "noise_rate": 1.0,
    "parking": 0.0,
    "view_rate": 3.5,
    "base_price": 680000000.0,
    "cyan_url": "https://cian.ru/sale/commercial/789101/",
    "similarity": 0,
    "price_per_sqm": 0,
    "coordinates": [55.753381, 37.642593]
  },
  {
    "id": "analog-3",
    "address": "г. Москва, ул. Солянка, д. 12, стр. 3",
    "area": 1300.0,
    "year_built": 1912,
    "floors": 4,
    "walls_material": "Кирпич железобетон",
    "is_okn": 0.0,
    "wear_pct": 28.0,
    "dist_metro_min": 5.0,
    "infrastructure_rate": 5.0,
    "noise_rate": 4.0,
    "parking": 0.0,
    "view_rate": 4.0,
    "base_price": 710000000.0,
    "cyan_url": "https://cian.ru/sale/commercial/112131/",
    "similarity": 0,
    "price_per_sqm": 0,
    "coordinates": [55.753232, 37.641614]
  },
  {
    "id": "analog-5",
    "address": "г. Москва, ул. Забелина, д. 3",
    "area": 1600.0,
    "year_built": 1900,
    "floors": 3,
    "walls_material": "Кирпич",
    "is_okn": 1.0,
    "wear_pct": 45.0,
    "dist_metro_min": 2.0,
    "infrastructure_rate": 5.0,
    "noise_rate": 4.5,
    "parking": 0.0,
    "view_rate": 4.5,
    "base_price": 750000000.0,
    "cyan_url": "",
    "similarity": 0,
    "price_per_sqm": 0,
    "coordinates": [55.754716, 37.639556]
  },
  {
    "id": "analog-6",
    "address": "г. Москва, Старосадский пер., д. 9",
    "area": 1250.0,
    "year_built": 1908,
    "floors": 4,
    "walls_material": "Кирпич",
    "is_okn": 1.0,
    "wear_pct": 30.0,
    "dist_metro_min": 5.0,
    "infrastructure_rate": 4.8,
    "noise_rate": 2.0,
    "parking": 1.0,
    "view_rate": 4.0,
    "base_price": 590000000.0,
    "cyan_url": "",
    "similarity": 0,
    "price_per_sqm": 0,
    "coordinates": [55.756555, 37.639358]
  },
  {
    "id": "analog-7",
    "address": "г. Москва, Малый Златоустинский пер., д. 4",
    "area": 1050.0,
    "year_built": 1890,
    "floors": 3,
    "walls_material": "Кирпич",
    "is_okn": 1.0,
    "wear_pct": 33.0,
    "dist_metro_min": 6.0,
    "infrastructure_rate": 4.5,
    "noise_rate": 2.5,
    "parking": 0.0,
    "view_rate": 3.5,
    "base_price": 490000000.0,
    "cyan_url": "",
    "similarity": 0,
    "price_per_sqm": 0,
    "coordinates": [55.760195, 37.633454]
  },
  {
    "id": "analog-8",
    "address": "г. Москва, Колпачный пер., д. 10",
    "area": 1400.0,
    "year_built": 1902,
    "floors": 5,
    "walls_material": "Кирпич",
    "is_okn": 0.0,
    "wear_pct": 28.0,
    "dist_metro_min": 8.0,
    "infrastructure_rate": 4.4,
    "noise_rate": 3.0,
    "parking": 1.0,
    "view_rate": 4.0,
    "base_price": 630000000.0,
    "cyan_url": "",
    "similarity": 0,
    "price_per_sqm": 0,
    "coordinates": [55.758416, 37.641755]
  }
];

export const LOCAL_MOCK_ANALOGUES_ROSSIYA: Analogue[] = [
  {
    id: "analogue-rossiya-1",
    address: "г. Москва, Большой Харитоньевский пер., 10",
    area: 12400,
    year_built: 1900,
    floors: 5,
    walls_material: "Кирпичные",
    is_okn: 1.0,
    wear_pct: 26,
    base_price: 620000000,
    similarity: 0.89,
    dist_metro_min: 7,
    infrastructure_rate: 4.5,
    noise_rate: 2.0,
    parking: 1,
    view_rate: 4.0,
    cyan_url: "",
    price_per_sqm: Math.round(620000000 / 12400),
    coordinates: [55.767184, 37.647364]
  },
  {
    id: "analogue-rossiya-2",
    address: "г. Москва, Курсовой пер., 1",
    area: 9800,
    year_built: 1907,
    floors: 6,
    walls_material: "Кирпичные с облицовкой",
    is_okn: 1.0,
    wear_pct: 22,
    base_price: 710000000,
    similarity: 0.86,
    dist_metro_min: 5,
    infrastructure_rate: 5.0,
    noise_rate: 1.5,
    parking: 0,
    view_rate: 4.5,
    cyan_url: "",
    price_per_sqm: Math.round(710000000 / 9800),
    coordinates: [55.742358, 37.605929]
  },
  {
    id: "analogue-rossiya-3",
    address: "г. Москва, Пречистенка, 28",
    area: 15200,
    year_built: 1898,
    floors: 5,
    walls_material: "Кирпичные",
    is_okn: 1.0,
    wear_pct: 31,
    base_price: 580000000,
    similarity: 0.84,
    dist_metro_min: 8,
    infrastructure_rate: 4.8,
    noise_rate: 2.5,
    parking: 1,
    view_rate: 4.0,
    cyan_url: "",
    price_per_sqm: Math.round(580000000 / 15200),
    coordinates: [55.768124, 37.629054]
  },
  {
    id: "analogue-rossiya-4",
    address: "г. Москва, Арбат, 35",
    area: 8700,
    year_built: 1903,
    floors: 6,
    walls_material: "Кирпичные",
    is_okn: 1.0,
    wear_pct: 28,
    base_price: 495000000,
    similarity: 0.81,
    dist_metro_min: 4,
    infrastructure_rate: 5.0,
    noise_rate: 3.5,
    parking: 0,
    view_rate: 3.8,
    cyan_url: "",
    price_per_sqm: Math.round(495000000 / 8700),
    coordinates: [55.763824, 37.636554]
  },
  {
    id: "analogue-rossiya-5",
    address: "г. Москва, Гоголевский бульвар, 21",
    area: 11300,
    year_built: 1905,
    floors: 5,
    walls_material: "Кирпичные с лепниной",
    is_okn: 0.0,
    wear_pct: 33,
    base_price: 530000000,
    similarity: 0.79,
    dist_metro_min: 6,
    infrastructure_rate: 4.7,
    noise_rate: 3.0,
    parking: 1,
    view_rate: 4.2,
    cyan_url: "",
    price_per_sqm: Math.round(530000000 / 11300),
    coordinates: [55.770524, 37.631254]
  },
  {
    id: "analogue-rossiya-6",
    address: "г. Москва, Романов пер., 3",
    area: 16800,
    year_built: 1898,
    floors: 6,
    walls_material: "Кирпичные",
    is_okn: 1.0,
    wear_pct: 29,
    base_price: 650000000,
    similarity: 0.88,
    dist_metro_min: 5,
    infrastructure_rate: 4.9,
    noise_rate: 2.0,
    parking: 1,
    view_rate: 4.5,
    cyan_url: "",
    price_per_sqm: Math.round(650000000 / 16800),
    coordinates: [55.763224, 37.635154]
  },
  {
    id: "analogue-rossiya-7",
    address: "г. Москва, Мясницкая ул., 15",
    area: 9200,
    year_built: 1895,
    floors: 5,
    walls_material: "Кирпичные",
    is_okn: 0.0,
    wear_pct: 35,
    base_price: 460000000,
    similarity: 0.76,
    dist_metro_min: 6,
    infrastructure_rate: 4.5,
    noise_rate: 3.0,
    parking: 0,
    view_rate: 3.5,
    cyan_url: "",
    price_per_sqm: Math.round(460000000 / 9200),
    coordinates: [55.767524, 37.636254]
  },
  {
    id: "analogue-rossiya-8",
    address: "г. Москва, Покровка, 2/1",
    area: 14100,
    year_built: 1902,
    floors: 6,
    walls_material: "Кирпичные",
    is_okn: 1.0,
    wear_pct: 24,
    base_price: 590000000,
    similarity: 0.83,
    dist_metro_min: 8,
    infrastructure_rate: 4.4,
    noise_rate: 2.8,
    parking: 0,
    view_rate: 3.8,
    cyan_url: "",
    price_per_sqm: Math.round(590000000 / 14100),
    coordinates: [55.761824, 37.630154]
  },
  {
    id: "analogue-rossiya-9",
    address: "г. Москва, Тверская ул., 25",
    area: 19800,
    year_built: 1898,
    floors: 5,
    walls_material: "Кирпичные с облицовкой",
    is_okn: 0.0,
    wear_pct: 32,
    base_price: 412000000,
    similarity: 0.77,
    dist_metro_min: 3,
    infrastructure_rate: 5.0,
    noise_rate: 4.0,
    parking: 1,
    view_rate: 5.0,
    cyan_url: "",
    price_per_sqm: Math.round(412000000 / 19800),
    coordinates: [55.769824, 37.633954]
  },
  {
    id: "analogue-rossiya-10",
    address: "г. Москва, Б. Лубянка, 14",
    area: 26700,
    year_built: 1907,
    floors: 6,
    walls_material: "Кирпичные",
    is_okn: 1.0,
    wear_pct: 27,
    base_price: 529000000,
    similarity: 0.82,
    dist_metro_min: 6,
    infrastructure_rate: 5.0,
    noise_rate: 3.0,
    parking: 0,
    view_rate: 4.0,
    cyan_url: "",
    price_per_sqm: Math.round(529000000 / 26700),
    coordinates: [55.764824, 37.636954]
  },
  {
    id: "analogue-rossiya-11",
    address: "г. Москва, Новокузнецкая ул., 34",
    area: 18400,
    year_built: 1910,
    floors: 5,
    walls_material: "Смешанные",
    is_okn: 0.0,
    wear_pct: 30,
    base_price: 398000000,
    similarity: 0.74,
    dist_metro_min: 8,
    infrastructure_rate: 4.0,
    noise_rate: 2.0,
    parking: 1,
    view_rate: 3.0,
    cyan_url: "",
    price_per_sqm: Math.round(398000000 / 18400),
    coordinates: [55.761324, 37.628454]
  },
  {
    id: "analogue-rossiya-12",
    address: "г. Москва, Столешников пер., 11",
    area: 23100,
    year_built: 1902,
    floors: 5,
    walls_material: "Кирпичные",
    is_okn: 1.0,
    wear_pct: 25,
    base_price: 467000000,
    similarity: 0.85,
    dist_metro_min: 4,
    infrastructure_rate: 5.0,
    noise_rate: 2.0,
    parking: 0,
    view_rate: 4.0,
    cyan_url: "",
    price_per_sqm: Math.round(467000000 / 23100),
    coordinates: [55.768324, 37.627954]
  },
  {
    id: "analogue-rossiya-13",
    address: "г. Москва, Мясницкая ул., 22",
    area: 25400,
    year_built: 1896,
    floors: 6,
    walls_material: "Кирпичные с лепниной",
    is_okn: 0.0,
    wear_pct: 34,
    base_price: 445000000,
    similarity: 0.78,
    dist_metro_min: 5,
    infrastructure_rate: 5.0,
    noise_rate: 4.0,
    parking: 1,
    view_rate: 4.0,
    cyan_url: "",
    price_per_sqm: Math.round(445000000 / 25400),
    coordinates: [55.763072, 37.635817]
  },
  {
    id: "analogue-rossiya-14",
    address: "г. Москва, Подкопаевский пер., 4, стр. 1",
    area: 14500,
    year_built: 1880,
    floors: 5,
    walls_material: "Кирпичные",
    is_okn: 1.0,
    wear_pct: 29,
    base_price: 680000000,
    similarity: 0.91,
    dist_metro_min: 12,
    infrastructure_rate: 4.5,
    noise_rate: 1.0,
    parking: 0,
    view_rate: 3.5,
    cyan_url: "",
    price_per_sqm: Math.round(680000000 / 14500),
    coordinates: [55.753381, 37.642593]
  }
];
--- КОНЕЦ ФАЙЛА: src/data/mockAnalogues.ts ---

--- СТАРТ ФАЙЛА: src/data/photoRegistry.ts ---
/**
 * ЖЁСТКАЯ ПРИВЯЗКА ФОТОГРАФИЙ (Hard Mapping)
 * 
 * Ключ = id объекта из ALL_OBJECTS (obj-1 ... obj-37) после нормализации в PassportPanel.
 * Значение = ТОЧНЫЙ массив имён файлов, которые реально лежат в папке public/photos/<photosFolder>/ 
 * 
 * НИКАКИХ догадок, Array.from, glob, транслита адресов и т.п.
 * Галерея рендерится ТОЛЬКО по этому реестру.
 * 
 * Обновляется вручную при добавлении/удалении фото в папках.
 */

export const PHOTO_REGISTRY: Record<string, string[]> = {
  // obj-1: Доходный дом страхового общества «Россия» (Сретенский бульвар, 6/1)
  "obj-1": [
    "1.jpg",
    "rossiya1 (1).jpg",
    "rossiya1 (1).png",
    "rossiya1 (10).jpg",
    "rossiya1 (2).jpg",
    "rossiya1 (3).jpg",
    "rossiya1 (4).jpg",
    "rossiya1 (5).jpg",
    "rossiya1 (6).jpg",
    "rossiya1 (7).jpg",
    "rossiya1 (8).jpg",
    "rossiya1 (9).jpg"
  ],

  // obj-2: Колпачный переулок, дом 5 (Усадьба А.Л. Кнопа)
  "obj-2": [
    "1.jpg",
    "knop10.jpg",
    "knop2.jpg",
    "knop3.jpg",
    "knop4.jpg",
    "knop5.jpg",
    "knop6.jpg",
    "knop7.jpg",
    "knop8.jpg",
    "knop9.jpg",
    "Усадьба А.Л. Кнопа (1).jfif",
    "Усадьба А.Л. Кнопа (1).jpg",
    "Усадьба А.Л. Кнопа (2).jfif",
    "Усадьба А.Л. Кнопа (2).jpg",
    "Усадьба А.Л. Кнопа (3).jfif",
    "Усадьба А.Л. Кнопа (3).jpg",
    "Усадьба А.Л. Кнопа (4).jfif",
    "Усадьба А.Л. Кнопа (4).jpg",
    "Усадьба А.Л. Кнопа (5).jpg",
    "Усадьба А.Л. Кнопа (6).JPG"
  ],

  // obj-3: Спиридоновка, 17 (Особняк Зинаиды Морозовой)
  "obj-3": [
    "1.jpg",
    "Особняк_Зинаиды_Морозовой_на_Спиридоновке.jpg"
  ],

  // obj-4: Колпачный переулок, д. 10
  "obj-4": [
    "1.jpg",
    "BABEBBBFB087BD8BB910_2.jpeg",
    "XXL_height.jfif",
    "orig (1).jfif",
    "orig.jfif",
    "Палаты_Мазепы_4.JPG"
  ],

  // obj-5: Покровский бульвар 5
  "obj-5": [
    "1.jpg",
    "362fd065e64a1861be6e1e97fc97b7bb.webp",
    "XXL_height.jfif",
    "kvartry-v-zhk-rezidentsija-na-pokrovskom-bulvare-1543230337.1038_.jpg",
    "orig.jfif",
    "rezidenciya-na-pokrovskom-bulvare-ak-2.jpg"
  ],

  // obj-6: Спиридоновка, 12
  "obj-6": [
    "1.jpg",
    "img_5923.jpg",
    "orig.jfif",
    "загруженное (1).jfif",
    "загруженное.jfif"
  ],

  // obj-7: Особняк А. И. Кекушевой (Остоженка, 21)
  "obj-7": [
    "1.jpg",
    "2.jpg",
    "3.jpg"
  ],

  // obj-8: Малый Никитский пер., 6
  "obj-8": [
    "1.jpg",
    "46151_original.jpg",
    "b9b4f4fb6c.jpg",
    "i (1).jfif",
    "i.jfif",
    "загруженное.jfif"
  ],

  // obj-9: Милютинский пер., 5
  "obj-9": [
    "1.jpg",
    "IMG_5121 Panorama.jpg",
    "Milyutinsky_Lane_Towers_07.jfif",
    "Milyutinsky_Lane_Towers_08.JPG",
    "i.jfif",
    "tsentralnaya-telefonnaya-stantsiya-ats-926-fasad-0043292926-preview.jpg",
    "загруженное.jfif"
  ],

  // obj-10: Поварская ул., 22
  "obj-10": [
    "1.jpg",
    "131393_2.jpg",
    "22.jpg",
    "7a9048cbe3d5bff1c4340def823ba6f24ce571fc.jpg",
    "Povarskaya_Street_22.jpg",
    "download.jfif",
    "orig.jfif",
    "загруженное (1).jfif",
    "загруженное.jfif"
  ],

  // obj-11: Старосадский пер., д. 9
  "obj-11": [
    "1.jpg",
    "295764.png",
    "9.jpg",
    "Starosadsky_7-10Cx_Jan_2010_01.jpg",
    "Starosadsky_9_Jan_2010_01.jpg",
    "Starosadsky_9_Jan_2010_03.jpg",
    "Stomatologicheskaya-poliklinika-53_1.jpg",
    "XXL_height (1).jfif",
    "gJ1-_IqxjPmx.jpg",
    "sl3(1746).jpg",
    "загруженное.jfif"
  ],

  // obj-12: Большой Харитоньевский пер., 10
  "obj-12": [
    "1.jpg",
    "ofis-moskva-bolshoy-haritonevskiy-pereulok-2819601845-1.jpg",
    "orig (1).jfif",
    "orig.jfif",
    "Москва,_Большой_Харитоньевский_переулок,_10_(1).jpg",
    "Москва,_Большой_Харитоньевский_переулок,_10_(2).jpg"
  ],

  // obj-13: Малый Златоустинский пер., д. 1
  "obj-13": [
    "1.jpg",
    "XXL_height (1).jfif",
    "XXL_height (2).jfif",
    "XXL_height (3).jfif",
    "XXL_height (4).jfif",
    "orig (1).jfif",
    "загруженное (1).jfif",
    "загруженное.jfif"
  ],

  // obj-14: Доходный дом З. А. Перцовой (Дом-сказка)
  "obj-14": [
    "1.jpg",
    "XXXL (1).jfif",
    "XXXL (2).jfif",
    "XXXL (3).jfif",
    "XXXL (4).jfif",
    "XXXL.jfif"
  ],

  // obj-15: Особняк Арсения Морозова (Воздвиженка, 16)
  "obj-15": [
    "1.jpg",
    "B2BEB7B4B2B8B6B5BDBAB016_3.jpeg",
    "Morozov_Mansion_Vozdvizhenka_str_16_str_1_2016-04-12_2515.jpg",
    "XXL_height (1).jfif",
    "XXL_height.jfif",
    "moroz8.jpg",
    "Воздвиженка_16._Особняк_Морозова02.JPG.jpg"
  ],

  // obj-16: Арбат ул., 29
  "obj-16": [
    "1089706.webp",
    "arbat-29-front-1-watermarked_retina.jpg",
    "i (1).jfif",
    "i (2).jfif",
    "i (3).jfif",
    "i.jfif",
    "orig.jfif",
    "загруженное.jfif"
  ],

  // obj-17: Фролов пер., 2
  "obj-17": [
    "1.jpg",
    "XXL_height.jfif",
    "moskovskii-teatr-et-setera-pod-rukovodstvom-aleksandra-0036171060-preview.jpg",
    "orig.jfif",
    "Москва._Фролов_переулок,_2_(ЭлСетера,_вид_со_Срет.бул)_IMG_2107.3_e1.jpg"
  ],

  // obj-18: Хохловский пер., д. 7-9
  "obj-18": [
    "1.jpg",
    "2086243_original.jpg",
    "7830195_original.jpg",
    "8004384_original.jpg",
    "download.jfif",
    "kak-doekhat-khokhlovskiy-per-7-9.jpg",
    "khokhlovskiy-per-7-9.jpg",
    "khokhlovskiy-pereulok-79s1-front-watermarked.jpg",
    "orig (1).jfif",
    "загруженное.jfif"
  ],

  // obj-19: Лубянский пр., 15
  "obj-19": [
    "1.jpg",
    "XXL_height.jfif",
    "lubyanskiy_5582.jpg",
    "orig (1).jfif",
    "orig (3).jfif",
    "orig.jfif",
    "загруженное.jfif"
  ],

  // obj-20: Мясницкая ул., 7
  "obj-20": [
    "1.jpg",
    "1655de0f787449.jpeg",
    "Moscow,_Myasnitskaya_7_July_2008_03.JPG",
    "XXL_height.jfif",
    "e0cb91ba1e52078eb4dba807b7384aea.jpg",
    "usadba-saltykovyh-chertkovyh-myasnitskaya-ulitsa-0025969364-preview.jpg"
  ],

  // obj-21: Никитский б-р, 11
  "obj-21": [
    "1.jpg",
    "265883_1.jpg",
    "37262_1.jpg",
    "80727.jpg",
    "96828_1.jpg",
    "XXL_height.jfif",
    "nikitskiy-bul-dom-11-12.jpg",
    "загруженное.jfif"
  ],

  // obj-22: Подкопаевский пер., д. 4
  "obj-22": [
    "1.jpg",
    "2619723257-1.jpg",
    "2813994936-1.jpg",
    "2838132239-1.jpg",
    "i.jfif",
    "i.webp",
    "maxresdefault (2).jpg",
    "orig (1).jfif",
    "zdanie-moskva-podkopaevskiy-pereulok-2597382731-1.jpg"
  ],

  // obj-23: Покровка ул., 22
  "obj-23": [
    "0fcea648d7fa2be837b9bf7aacbf3c3f.jpg",
    "1.jpg",
    "17-1388.jpg",
    "Untitled-4(9).jpg",
    "aprak1.jpg",
    "caption.jpg",
    "ehkskursiya-dikovinnye-doma-moskvy.jpg",
    "i.jfif",
    "large_50914d2c62c2e624238952.jpg",
    "og_og_1712398021253121609.jpg",
    "Москва._ул_Покровка,_22_1с1_(Дом_Апраксиных-Трубецких_IMG_2132.3_e1.jpg",
    "комод2.jpg"
  ],

  // obj-24: Пречистенка ул., 8
  "obj-24": [
    "1.jpg",
    "160501057188.jpg",
    "74dfe7a9bd2bebf2d2cf58d72c0ca4db.jpg",
    "9f7eaa16379abd1e7a41445255b9aebf.webp",
    "IMG_20220524_134909.jpeg",
    "Moscow,_Prechistenka_9.jpg",
    "bb8da73869ceb2b00f715e48667a0977.png",
    "caption (1).jpg",
    "caption.jpg",
    "kvartry-v-4601-zhk-prechistenka-8-1604669781_6626.jpg",
    "prechest8-1.jpg"
  ],

  // obj-25: Пятницкая ул., 17
  "obj-25": [
    "1.jpg",
    "XXL_height (1).jfif",
    "XXL_height.jfif",
    "XXXL.jfif",
    "i (1).jfif",
    "i.jfif"
  ],

  // obj-26: Садовая-Каретная ул., 12
  "obj-26": [
    "1.jpg",
    "Moscow,_Sadovaya-Karetnaya_Street,_22,_bld._1.JPG",
    "bqfvif2fsj0de2sn55.webp",
    "normal_df6c5e68ae82380b.png"
  ],

  // obj-27: Садовая-Самотечная ул., 8
  "obj-27": [
    "1.jpg",
    "97125_1.jpg",
    "97125_2.jpg",
    "97125_3.jpg",
    "Moscow,_Sadovaya-Karetnaya_Street,_22,_bld._1.JPG",
    "XXL_height.jfif",
    "normal_df6c5e68ae82380b.png",
    "загруженное (1).jfif",
    "загруженное.jfif"
  ],

  // obj-28: ул. Солянка, д. 12
  "obj-28": [
    "1.jpg",
    "841243.jpg",
    "8dyywojl7r3lwcqcmfbfxm0a5v0jyhkb.png",
    "DSC02073.jpg",
    "_DSC0301.jpg",
    "dom-12-14-na-ulitse-solyanke.jpg",
    "orig (1).jfif",
    "orig (2).jfif"
  ],

  // obj-29: Спиридоновка, 3-5
  "obj-29": [
    "1.jpg",
    "6899a0c7d144b22d92f9ea551301b851.jpg",
    "IMG_6150.jpg",
    "Spiridonovka,_2010_05.jpg",
    "XXL_height (1).jfif",
    "XXL_height.jfif",
    "orig.jfif",
    "загруженное.jfif"
  ],

  // obj-30: Спиридоновка, 21
  "obj-30": [
    "1.jpg",
    "nezhiloe-pomeshcenie-moskva-ulica-spiridonovka-2212560857-1.jpg",
    "orig.jfif",
    "scale_1200.jfif",
    "spiridonovka-ul-dom-21.jpg",
    "загруженное (1).jfif",
    "загруженное (2).jfif",
    "загруженное.jfif"
  ],

  // obj-31: Сретенский бульвар, 2
  "obj-31": [
    "1.jpg",
    "large.jfif",
    "orig (1).jfif",
    "orig.jfif",
    "sretenskiy-bul-2.jpg"
  ],

  // obj-32: Сретенский бульвар, 9
  "obj-32": [
    "1.jpg",
    "XXL_height.jfif",
    "sretenskiy-bul-9-2.jpg",
    "загруженное (1).jfif",
    "загруженное.jfif"
  ],

  // obj-33: Малый Толмачёвский пер., 4
  "obj-33": [
    "1.jpg",
    "164594-9cd2a9a0918fed7fad40a87a1cef30d8.jpg",
    "6fdccf85a5db5a39237e6b2638380c912ee4ef97.jpg",
    "XXL_height.jfif",
    "i.jfif",
    "img (26).jpg",
    "orig.jfif"
  ],

  // obj-34: Тверская ул., 15
  "obj-34": [
    "1.jpg",
    "16133-b5930766ce76249f2ec15f3549d90b83.jpg",
    "16139-a10cd374eceb30ce97b189017e53899a.jpg",
    "2598405900_1200_800_p.jpg",
    "2682437728_1200_800_p.jpg",
    "4-3.jpg",
    "77911c81d7a5.jpg",
    "content_hotel_629718eae41f95.74815181.jpg",
    "kvartira-moskva-tverskaya-ulica-2681989387_1200_800_p.jpg",
    "orig.jfif"
  ],

  // obj-35: Якиманский пер., 6
  "obj-35": [
    "1.jpg",
    "LpiPRKlu6hbQ11Ucak1yhwwBcYyh961JDGtZxxNEBGXbmDSrIaGVchk50QpFGNh7ka-S6K4jViGV8rk6f15WdCOdniTdC48rnII1XWo8J8YNMRjFpdvxDCivsRKr0OyIJziYX52grQ8APHS2GA3tVk16gzGnSo_E5B-xE0IfS5my-NZ9sMK2AkQvnUijNdJbfWn9tLknvWRUR4W6k3hc.jfif",
    "XXL_height (1).jfif",
    "XXL_height (2).jfif",
    "XXL_height (3).jfif",
    "XXL_height (4).jfif",
    "XXL_height.jfif",
    "imperskiy-dom_33027.jpg",
    "imperskiy_dom_1.jpg",
    "imperskiy_dom_2.jpg",
    "imperskiy_dom_6.jpg",
    "orig.jfif"
  ],

  // obj-36: ул. Забелина, д. 3
  "obj-36": [
    "1.jpg",
    "XXL_height (1).jfif",
    "orig (2).jfif",
    "orig (3).jfif",
    "Главный_усадебный_дом_улица_Забелина,_дом_3,_строение_2.jpg",
    "Забелина_д.3_с.2.jpg"
  ],

  // obj-37: Зубовский б-р, 5
  "obj-37": [
    "1.jpg",
    "cb4a416529fc5632c4c4bd05aaefafc1.jpg",
    "orig.jfif",
    "shkola-no1253-moscva-smapse5.jpg"
  ]
};

/**
 * Вспомогательная функция для получения путей (используется в PassportPanel).
 * Не экспортируется как основная — вся логика должна идти через PHOTO_REGISTRY + photosFolder.
 */
export const getPhotoPathsForObject = (objectId: string, photosFolder: string): string[] => {
  const fileNames = PHOTO_REGISTRY[objectId] || [];
  if (!fileNames.length || !photosFolder) return [];
  return fileNames.map(name => `/photos/${photosFolder}/${name}`);
};
--- КОНЕЦ ФАЙЛА: src/data/photoRegistry.ts ---

--- СТАРТ ФАЙЛА: src/index.css ---
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-900 text-slate-100;
  }
}

/* Специфические стили для Leaflet */
.leaflet-container {
  width: 100%;
  height: 100%;
  font-family: inherit;
  z-index: 10;
}

.leaflet-control-zoom {
  border: none !important;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
}

.leaflet-bar a {
  background-color: rgb(30, 41, 59) !important;
  color: rgb(241, 245, 249) !apply;
  border-bottom: 1px solid rgb(51, 65, 85) !important;
  color: #cbd5e1 !important;
}

.leaflet-bar a:hover {
  background-color: rgb(51, 65, 85) !important;
  color: #ffffff !important;
}

/* Премиальный стиль для тултипов Leaflet (темный/полупрозрачный) */
.leaflet-tooltip {
  background-color: rgba(15, 23, 42, 0.85) !important;
  backdrop-filter: blur(6px) !important;
  border: 1px solid rgba(148, 163, 184, 0.15) !important;
  border-radius: 8px !important;
  color: rgb(241, 245, 249) !important;
  padding: 6px 10px !important;
  font-size: 11px !important;
  font-family: inherit !important;
  font-weight: 600 !important;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3) !important;
}

/* Направляющие стрелочки тултипов */
.leaflet-tooltip-top::before { border-top-color: rgba(15, 23, 42, 0.85) !important; }
.leaflet-tooltip-bottom::before { border-bottom-color: rgba(15, 23, 42, 0.85) !important; }
.leaflet-tooltip-left::before { border-left-color: rgba(15, 23, 42, 0.85) !important; }
.leaflet-tooltip-right::before { border-right-color: rgba(15, 23, 42, 0.85) !important; }

/* Премиальный стиль для поп-апов Leaflet (Общий) */
.leaflet-popup-content-wrapper {
  background-color: rgba(15, 23, 42, 0.9) !important;
  backdrop-filter: blur(8px) !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  border-radius: 12px !important;
  color: rgb(241, 245, 249) !important;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4) !important;
}

.leaflet-popup-tip {
  background-color: rgba(15, 23, 42, 0.9) !important;
  border: none !important;
}

.leaflet-popup-content {
  margin: 12px 16px !important;
  font-family: inherit !important;
  color: rgb(241, 245, 249) !important;
}

.leaflet-popup-close-button {
  color: #94a3b8 !important;
  padding: 8px 8px 0 0 !important;
}
.leaflet-popup-close-button:hover {
  color: #ffffff !important;
}

/* =========================================================
   КАСТОМИЗАЦИЯ LEAFLET ПОПАПОВ ДЛЯ GLOBAL MAP (КАРТОЧКА)
   ========================================================= */
.custom-map-popup .leaflet-popup-content-wrapper {
  background-color: #0f172a !important; /* bg-slate-900 */
  padding: 0 !important;
  border: 1px solid #334155 !important; /* border-slate-700 */
  border-radius: 1rem !important;       /* rounded-2xl */
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
}

.custom-map-popup .leaflet-popup-content {
  margin: 0 !important;
  width: 260px !important;
  line-height: normal !important;
}

.custom-map-popup .leaflet-popup-tip-container {
  overflow: visible !important;
}

.custom-map-popup .leaflet-popup-tip {
  background-color: #0f172a !important;
  border: 1px solid #334155 !important;
  border-top: none !important;
  border-left: none !important;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4) !important;
}

/* Убираем стандартную кнопку закрытия Leaflet для этой карточки */
.custom-map-popup .leaflet-popup-close-button {
  display: none !important;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
}
::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}

/* Glassmorphism utility */
.glass-panel {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Micro-animations */
@keyframes pulse-ring {
  0% {
    transform: scale(0.97);
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.65), 0 0 8px 2px rgba(14, 165, 233, 0.35);
  }
  50% {
    transform: scale(1);
    box-shadow: 0 0 0 9px rgba(14, 165, 233, 0.08), 0 0 8px 2px rgba(14, 165, 233, 0.35);
  }
  100% {
    transform: scale(0.97);
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.65), 0 0 8px 2px rgba(14, 165, 233, 0.35);
  }
}

.pulse-button {
  animation: pulse-ring 2.2s ease-in-out infinite;
}

/* Свечение для контура целевого здания */
.target-outline-glow {
  filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.75));
}

/* ─── ARM Marker System ──────────────────────────────────────────────────── */

/* Zero-out Leaflet's default divIcon wrapper so it never adds size/padding */
.arm-marker-root {
  background: none !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
  /* overflow visible so the address label can stick out to the right */
  overflow: visible !important;
}

/* Pulse keyframe for the target (main object) marker */
@keyframes arm-pulse {
  0%   { box-shadow: 0 0 0 0   rgba(59, 130, 246, 0.70), 0 0 12px 4px rgba(59, 130, 246, 0.40); }
  50%  { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.10), 0 0 16px 6px rgba(59, 130, 246, 0.30); }
  100% { box-shadow: 0 0 0 0   rgba(59, 130, 246, 0.70), 0 0 12px 4px rgba(59, 130, 246, 0.40); }
}

/* ── Target (main) marker circle ── */
.arm-marker-circle-target {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3b82f6;
  border: 2.5px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  animation: arm-pulse 2.4s ease-in-out infinite;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.arm-marker-circle-target:hover { transform: scale(1.15); }

/* ── Regular analogue circle ── */
.arm-marker-circle-analogue {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(37, 99, 235, 0.55);
  border: 1.5px solid rgba(96, 165, 250, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #93c5fd;
  font-size: 12px;
  line-height: 1;
  flex-shrink: 0;
  cursor: pointer;
  opacity: 0.80;
  transition: opacity 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}
.arm-marker-circle-analogue:hover {
  opacity: 1;
  transform: scale(1.18);
  box-shadow: 0 0 10px 3px rgba(96, 165, 250, 0.45);
}

/* ── Selected analogue circle (same size as target) ── */
.arm-marker-circle-analogue-selected {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3b82f6;
  border: 2.5px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  animation: arm-pulse 2.4s ease-in-out infinite;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.arm-marker-circle-analogue-selected:hover { transform: scale(1.15); }

/* ── Address label pill ── */
.arm-marker-label {
  position: absolute;
  left: calc(100% + 6px);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 9px;
  font-weight: 600;
  color: #e2e8f0;
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid rgba(99, 102, 241, 0.30);
  border-radius: 4px;
  padding: 2px 5px;
  pointer-events: none;
  z-index: 600;
  line-height: 1.4;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 3px rgba(0,0,0,0.9);
  box-shadow: 0 2px 6px rgba(0,0,0,0.45);
}
.arm-marker-label-left {
  left: auto;
  right: calc(100% + 6px);
}
/* Target label is slightly brighter */
.arm-marker-label-target {
  border-color: rgba(59, 130, 246, 0.50);
  background: rgba(30, 58, 138, 0.90);
  color: #ffffff;
}
--- КОНЕЦ ФАЙЛА: src/index.css ---

--- СТАРТ ФАЙЛА: src/main.tsx ---
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
--- КОНЕЦ ФАЙЛА: src/main.tsx ---

--- СТАРТ ФАЙЛА: src/types.ts ---
export interface Restriction {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  law_base: string;
}

export interface KkhParams {
  historical_weight: number; // I (0..5)
  architectural_rarity: number; // U (0..5)
  public_awareness: number; // P (0..5)
  constraint_points: number; // O (0..5)
}

export interface OknObject {
  id: string;
  cadastral_number: string;
  name: string;
  address: string;
  area: number;
  year_built: number;
  floors: number;
  walls_material: string;
  okn_category: string;
  is_okn: boolean;
  wear_pct: number;
  history: string;
  coordinates: [number, number]; // [lat, lng]
  bti_pdf_url: string;
  restrictions: Restriction[];
  kkh_params: KkhParams;
  photos?: string[];
  photosFolder?: string; // для жёсткой привязки галереи (hard mapping)
  building_outline?: [number, number][];
}

export interface Analogue {
  id: string;
  address: string;
  area: number;
  year_built: number;
  floors: number;
  walls_material: string;
  is_okn: number; // 1.0 = yes, 0.0 = no
  wear_pct: number;
  dist_metro_min: number;
  infrastructure_rate: number;
  noise_rate: number;
  parking: number; // 1.0 = yes, 0.0 = no
  view_rate: number;
  base_price: number;
  cyan_url: string;
  similarity: number; // 0..1 from k-NN
  price_per_sqm: number; // base price / area
  building_outline?: [number, number][];
  coordinates?: [number, number];
  photos?: string[];
}

export interface ManualAdjustment {
  area: number;          // percent offset e.g., -5% to +5% or coeff 0.95 to 1.05
  condition: number;     // e.g., -10% to +10%
  transport: number;     // e.g., -5% to +5%
  view: number;          // e.g., -5% to +5%
  infrastructure: number;// e.g., -5% to +5%
  justification: string; // Required comment text
}

export interface ValuationWeights {
  comparative: number;   // w_comp
  income: number;        // w_inc
  cost: number;          // w_cost
}
--- КОНЕЦ ФАЙЛА: src/types.ts ---

--- СТАРТ ФАЙЛА: src/utils/calc.ts ---
import { KkhParams, OknObject, Analogue, ManualAdjustment, ValuationWeights } from '../types';

// Греческие константы для ККН (совпадают с бэкендом)
export const ALPHA = 0.18; // Исторический вес
export const BETA = 0.22;  // Архитектурная редкость
export const GAMMA = 0.12; // Публичная узнаваемость
export const DELTA = 0.08; // Баллы стеснений

/**
 * Расчет Коэффициента Культурного Наследия (ККН)
 * KKH = 1 + (alpha * I + beta * U + gamma * P) - delta * O
 */
export function calculateKKH(params: KkhParams): { kkh: number; formula: string } {
  const { historical_weight: I, architectural_rarity: U, public_awareness: P, constraint_points: O } = params;
  const val = 1.0 + (ALPHA * I + BETA * U + GAMMA * P) - DELTA * O;
  const kkh = Math.round(Math.max(0.5, val) * 10000) / 10000;
  
  const formula = `1 + (${ALPHA} * ${I} + ${BETA} * ${U} + ${GAMMA} * ${P}) - ${DELTA} * ${O}`;
  return { kkh, formula };
}

/**
 * k-NN Расчет сходства аналога с целевым объектом по 10 параметрам
 * Охранный статус (is_okn) имеет двойной вес (2.0), остальные (1.0)
 */
export function calculateKnnSimilarity(target: OknObject, analog: Analogue): number {
  const targetIsOkn = target.okn_category ? 1.0 : 0.0;
  
  // Вектор целевого объекта
  const t = {
    area: target.area,
    year_built: target.year_built,
    floors: target.floors,
    is_okn: targetIsOkn,
    wear_pct: target.wear_pct,
    dist_metro_min: 10.0,      // дефолты для сравнения
    infrastructure_rate: 4.5,
    noise_rate: 2.0,
    parking: 0.0,
    view_rate: 4.0
  };

  const diffs: number[] = [];

  // 1. Площадь (вес 1.0)
  diffs.push(1.0 * Math.pow((t.area - analog.area) / t.area, 2));

  // 2. Год постройки (вес 1.0)
  diffs.push(1.0 * Math.pow((t.year_built - analog.year_built) / 120.0, 2));

  // 3. Этажность (вес 1.0)
  diffs.push(1.0 * Math.pow((t.floors - analog.floors) / 5.0, 2));

  // 4. Охранный статус (ДВОЙНОЙ ВЕС = 2.0)
  const diffOkn = t.is_okn === analog.is_okn ? 0.0 : 1.0;
  diffs.push(2.0 * Math.pow(diffOkn, 2));

  // 5. Износ (вес 1.0)
  diffs.push(1.0 * Math.pow((t.wear_pct - analog.wear_pct) / 100.0, 2));

  // 6. Метро (вес 1.0)
  diffs.push(1.0 * Math.pow((t.dist_metro_min - analog.dist_metro_min) / 20.0, 2));

  // 7. Инфраструктура (вес 1.0)
  diffs.push(1.0 * Math.pow((t.infrastructure_rate - analog.infrastructure_rate) / 5.0, 2));

  // 8. Шум (вес 1.0)
  diffs.push(1.0 * Math.pow((t.noise_rate - analog.noise_rate) / 5.0, 2));

  // 9. Парковка (вес 1.0)
  const diffParking = t.parking === analog.parking ? 0.0 : 1.0;
  diffs.push(1.0 * Math.pow(diffParking, 2));

  // 10. Вид (вес 1.0)
  diffs.push(1.0 * Math.pow((t.view_rate - analog.view_rate) / 5.0, 2));

  // Итоговое взвешенное расстояние
  const sumWeights = 11.0; // 1+1+1+2+1+1+1+1+1+1
  const sumDiffs = diffs.reduce((sum, val) => sum + val, 0);
  const weightedDistance = Math.sqrt(sumDiffs / sumWeights);

  // Нормализуем в диапазон [0, 1]
  const similarity = 1.0 - Math.min(1.0, weightedDistance * 0.8);
  return Math.round(similarity * 1000) / 1000;
}

/**
 * Рассчитывает скорректированную цену аналога на базе ручных правок.
 * Корректировки задаются в процентах от исходной цены.
 * AdjustedPrice = BasePrice * (1 + area/100) * (1 + condition/100) * (1 + transport/100) * (1 + view/100) * (1 + infra/100)
 */
export function calculateAdjustedPrice(basePrice: number, adj: ManualAdjustment): number {
  const factor = 
    (1 + adj.area / 100) *
    (1 + adj.condition / 100) *
    (1 + adj.transport / 100) *
    (1 + adj.view / 100) *
    (1 + adj.infrastructure / 100);
  return Math.round(basePrice * factor);
}

/**
 * Автоматически балансирует три ползунка весов подходов к оценке,
 * чтобы их сумма строго равнялась 1.0.
 */
export function balanceValuationWeights(
  changedKey: keyof ValuationWeights,
  newValue: number,
  currentWeights: ValuationWeights
): ValuationWeights {
  const keys = ['comparative', 'income', 'cost'] as const;
  const otherKeys = keys.filter(k => k !== changedKey);
  
  // Нормализуем новое значение в диапазон [0, 1]
  const targetVal = Math.min(1.0, Math.max(0.0, newValue));
  
  const remainingValue = 1.0 - targetVal;
  const currentOtherSum = otherKeys.reduce((sum, key) => sum + currentWeights[key], 0);
  
  const nextWeights = { ...currentWeights };
  nextWeights[changedKey] = Math.round(targetVal * 100) / 100;
  
  if (currentOtherSum > 0) {
    // Пропорциональное распределение остатка
    otherKeys.forEach(key => {
      const share = currentWeights[key] / currentOtherSum;
      nextWeights[key] = Math.round(remainingValue * share * 100) / 100;
    });
  } else {
    // Равномерное распределение остатка, если остальные были равны 0
    otherKeys.forEach(key => {
      nextWeights[key] = Math.round((remainingValue / 2) * 100) / 100;
    });
  }

  // Исправляем возможные ошибки округления js, чтобы сумма была ровно 1.0
  const finalSum = nextWeights.comparative + nextWeights.income + nextWeights.cost;
  if (finalSum !== 1.0) {
    const diff = 1.0 - finalSum;
    // Корректируем первый попавшийся отличный от нуля вес из других ключей
    const keyToAdjust = otherKeys[0];
    nextWeights[keyToAdjust] = Math.round((nextWeights[keyToAdjust] + diff) * 100) / 100;
  }
  
  return nextWeights;
}
--- КОНЕЦ ФАЙЛА: src/utils/calc.ts ---

--- СТАРТ ФАЙЛА: src/utils/photoHelper.ts ---
/**
 * photoHelper.ts
 *
 * Маппинг ID объекта → имя папки в /public/photos/
 * Фотографии загружаются из статического manifest.json (все реальные файлы).
 */

// ===================================================================
// ТОЧНЫЙ МАППИНГ: ID объекта → имя папки на диске (public/photos/)
// Папки верифицированы по реальному содержимому диска.
// ===================================================================
export const FOLDER_BY_OBJECT_ID: Record<string, string> = {
  'obj-1':  'rossiya',
  'obj-2':  'kolpachny_5',
  'obj-3':  'spiridonovka_17',
  'obj-4':  'kolpachny_10',
  'obj-5':  'pokrovskiy_5',
  'obj-6':  'spiridonovka_12',
  'obj-7':  'ostozhenka_21',
  'obj-8':  'maly_nikitskiy_6',
  'obj-9':  'milyutinskiy_5',
  'obj-10': 'povarskaya_22',
  'obj-11': 'starosadskiy_9',
  'obj-12': 'haritonevskiy_10',
  'obj-13': 'zlatoustinskiy',
  'obj-14': 'dom_pertsovoy',
  'obj-15': 'vozdvizhenka_16',
  'obj-16': 'arbat_29',
  'obj-17': 'frolov_2',
  'obj-18': 'hohlovskiy_7',
  'obj-19': 'lubyanskiy_15',
  'obj-20': 'myasnitskaya_7',
  'obj-21': 'nikitskiy_11',
  'obj-22': 'podkopaevskiy_4',
  'obj-23': 'pokrovka_22',
  'obj-24': 'prechistenka_8',
  'obj-25': 'pyatnitskaya_17',
  'obj-26': 'sadovaya_karetnaya_12',
  'obj-27': 'samotechnaya_8',
  'obj-28': 'solyanka_12',
  'obj-29': 'spiridonovka_3_5',
  'obj-30': 'spiridonovka_21',
  'obj-31': 'sretenskiy_2',
  'obj-32': 'sretenskiy_9',
  'obj-33': 'tolmachevskiy_4',
  'obj-34': 'tverskaya_15',
  'obj-35': 'yakimanskiy_6',
  'obj-36': 'zabelina_3',
  'obj-37': 'zubovsky_5',
};

// Заглушка — первое фото rossiya как fallback (гарантированно существует)
export const PHOTO_FALLBACK = '/photos/rossiya/1.jpg';

/** Получить имя папки для объекта по его ID. */
export const getPhotoFolder = (objectId: string | undefined): string => {
  if (!objectId) return '';
  return FOLDER_BY_OBJECT_ID[objectId] ?? '';
};

// Кэш манифеста — загружается один раз
let _manifestCache: Record<string, string[]> | null = null;
let _manifestPromise: Promise<Record<string, string[]>> | null = null;

const loadManifest = (): Promise<Record<string, string[]>> => {
  if (_manifestCache) return Promise.resolve(_manifestCache);
  if (_manifestPromise) return _manifestPromise;

  _manifestPromise = fetch('/photos/manifest.json')
    .then((r) => r.json())
    .then((data: Record<string, string[]>) => {
      _manifestCache = data;
      return data;
    })
    .catch(() => {
      // Если манифест недоступен — вернём пустой объект
      _manifestCache = {};
      return {};
    });

  return _manifestPromise;
};

/**
 * Получить список всех реальных фото для объекта из manifest.json.
 * Возвращает [PHOTO_FALLBACK] если фото не найдены.
 */
export const getValidPhotos = async (objectId: string): Promise<string[]> => {
  const folder = getPhotoFolder(objectId);
  if (!folder) return [PHOTO_FALLBACK];

  const manifest = await loadManifest();
  const photos = manifest[folder];

  if (!photos || photos.length === 0) return [PHOTO_FALLBACK];

  // Фильтруем нечитаемые имена (кириллица в URL вызывает 404)
  const safe = photos.filter((p) => {
    try {
      // Если имя файла содержит непечатаемые символы — пропускаем
      return /^[\x20-\x7E\u0400-\u04FF\s()./_-]+$/.test(p);
    } catch {
      return false;
    }
  });

  return safe.length > 0 ? safe : [PHOTO_FALLBACK];
};

/**
 * Синхронно вернуть первые N фото из манифеста (если уже закэширован)
 * или оптимистичные пути 1.jpg...count.jpg как placeholder.
 */
export const getOptimisticPhotos = (objectId: string, count = 4): string[] => {
  const folder = getPhotoFolder(objectId);
  if (!folder) return [PHOTO_FALLBACK];

  // Если манифест уже загружен — берём из него
  if (_manifestCache && _manifestCache[folder]?.length > 0) {
    return _manifestCache[folder].slice(0, count);
  }

  // Иначе генерируем пути по шаблону
  return Array.from({ length: count }, (_, i) => `/photos/${folder}/${i + 1}.jpg`);
};
--- КОНЕЦ ФАЙЛА: src/utils/photoHelper.ts ---

--- СТАРТ ФАЙЛА: tailwind.config.js ---
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          slate: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          },
          blue: {
            50: '#f0f7ff',
            100: '#e0effe',
            200: '#bae0fd',
            300: '#7cc8fc',
            400: '#38adf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },

        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
--- КОНЕЦ ФАЙЛА: tailwind.config.js ---

--- СТАРТ ФАЙЛА: tsconfig.json ---
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
--- КОНЕЦ ФАЙЛА: tsconfig.json ---

--- СТАРТ ФАЙЛА: update_passport.cjs ---
const fs = require('fs');
const file = 'C:\\\\Users\\\\Максим\\\\.gemini\\\\antigravity\\\\scratch\\\\arm-ocenschik\\\\frontend\\\\src\\\\components\\\\PassportPanel.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Insert ALL_OBJECTS after imports
const allObjectsCode = `
export const ALL_OBJECTS = [
  { id: 'obj-1', name: 'Сретенский бульвар, 6/1', address: 'г. Москва, Сретенский бульвар, 6/1', coordinates: [55.766, 37.632], photosFolder: 'rossiya', metadata: { year_built: 1901, walls_material: 'Кирпич с облицовкой', history: 'Историческое здание', wear_pct: 15 }, metrics: { district: 'Сретенский бульвар, Центральный АО', analogCount: 15, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 98 } } },
  { id: 'obj-2', name: 'Колпачный переулок, дом 5', address: 'г. Москва, Колпачный переулок, дом 5, строение 2', coordinates: [55.757, 37.641], photosFolder: 'дом 5, строение 2', metadata: { year_built: 1895, walls_material: 'Кирпич', history: 'Городская усадьба', wear_pct: 20 }, metrics: { district: 'Колпачный пер., Центральный АО', analogCount: 12, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 96 } } },
  { id: 'obj-3', name: 'Колпачный переулок, д. 10', address: 'г. Москва, Колпачный переулок, д. 10', coordinates: [55.758, 37.642], photosFolder: 'д. 10', metadata: { year_built: 1898, walls_material: 'Кирпич', history: 'Доходный дом', wear_pct: 25 }, metrics: { district: 'Колпачный пер., Центральный АО', analogCount: 8, densityLevel: 'Средняя', transport: { quality: 'Хорошая', time: '~9 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.6, percent: 91 } } },
  { id: 'obj-4', name: 'Старосадский пер., д. 9', address: 'г. Москва, Старосадский пер., д. 9', coordinates: [55.755, 37.639], photosFolder: 'старосадский', metadata: { year_built: 1910, walls_material: 'Камень', history: 'Особняк', wear_pct: 10 }, metrics: { district: 'Басманный, Центральный АО', analogCount: 10, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~7 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.7, percent: 93 } } },
  { id: 'obj-5', name: 'Малый Златоустинский пер.', address: 'г. Москва, Малый Златоустинский пер., д. 1', coordinates: [55.758, 37.634], photosFolder: 'златоустинский', metadata: { year_built: 1890, walls_material: 'Кирпич', history: 'Усадьба', wear_pct: 30 }, metrics: { district: 'Басманный, Центральный АО', analogCount: 11, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~5 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 95 } } },
  { id: 'obj-6', name: 'Подкопаевский пер., д. 4', address: 'г. Москва, Подкопаевский пер., д. 4, стр. 1', coordinates: [55.753, 37.641], photosFolder: 'подкопаевский', metadata: { year_built: 1885, walls_material: 'Кирпич', history: 'Исторический дом', wear_pct: 35 }, metrics: { district: 'Басманный, Центральный АО', analogCount: 9, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~8 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.5, percent: 89 } } },
  { id: 'obj-7', name: 'ул. Забелина, д. 3', address: 'г. Москва, ул. Забелина, д. 3', coordinates: [55.754, 37.638], photosFolder: 'забелина', metadata: { year_built: 1905, walls_material: 'Кирпич', history: 'Здание усадьбы', wear_pct: 12 }, metrics: { district: 'Басманный, Центральный АО', analogCount: 14, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~3 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 97 } } },
  { id: 'obj-8', name: 'ул. Солянка, д. 12', address: 'г. Москва, ул. Солянка, д. 12, стр. 3', coordinates: [55.751, 37.641], photosFolder: 'солянка', metadata: { year_built: 1912, walls_material: 'Камень', history: 'Доходный дом', wear_pct: 18 }, metrics: { district: 'Таганский, Центральный АО', analogCount: 16, densityLevel: 'Очень высокая', transport: { quality: 'Отличная', time: '~4 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.9, percent: 98 } } },
  { id: 'obj-9', name: 'Хохловский пер., д. 7-9', address: 'г. Москва, Хохловский пер., д. 7-9, стр. 2', coordinates: [55.755, 37.643], photosFolder: 'хохловский', metadata: { year_built: 1870, walls_material: 'Кирпич', history: 'Палаты', wear_pct: 40 }, metrics: { district: 'Басманный, Центральный АО', analogCount: 10, densityLevel: 'Высокая', transport: { quality: 'Хорошая', time: '~7 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.7, percent: 94 } } },
  { id: 'obj-10', name: 'Покровский бульвар, вл. 5', address: 'г. Москва, Покровский бульвар, вл. 5, стр. 1, 2', coordinates: [55.757, 37.646], photosFolder: 'rossiya', metadata: { year_built: 1899, walls_material: 'Кирпич', history: 'Резиденция', wear_pct: 5 }, metrics: { district: 'Басманный, Центральный АО', analogCount: 13, densityLevel: 'Высокая', transport: { quality: 'Отличная', time: '~6 мин' }, complexity: 'Высокая (Зона ОКН)', complexityZone: 'Высокая (Зона ОКН)', rating: { score: 4.8, percent: 96 } } },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: \`obj-\${11 + i}\`, name: \`Исторический объект \${11 + i}\`, address: \`г. Москва, Историческая улица, д. \${11 + i}\`, coordinates: [55.75 + Math.random() * 0.02, 37.63 + Math.random() * 0.02], photosFolder: 'rossiya', metadata: { year_built: 1850 + i * 5, walls_material: 'Дерево/Кирпич', history: 'Памятник архитектуры', wear_pct: 30 + i }, metrics: { district: 'Центральный АО', analogCount: 5 + i, densityLevel: 'Средняя', transport: { quality: 'Нормальная', time: '~12 мин' }, complexity: 'Средняя', complexityZone: 'Средняя', rating: { score: 4.2 + i * 0.05, percent: 80 + i } }
  }))
];
`;

content = content.replace(/(interface PassportPanelProps \{[\s\S]*?\})/, allObjectsCode + '\\n$1');

// 2. Modify component to use selectedObject state
const componentHeader = `export const PassportPanel: React.FC<PassportPanelProps> = ({
  okn: initialOkn,
  analogues: initialAnalogues,
  selectedAnalogId: propSelectedAnalogId,
  setSelectedAnalogId: propSetSelectedAnalogId,
  setActiveTab,
  onObjectLoaded
}) => {
  const [selectedObject, setSelectedObject] = useState<any>(ALL_OBJECTS[0]);
  const okn = selectedObject; // map okn to current obj
  
  // Create mock analogues for markers excluding current obj
  const analogues = ALL_OBJECTS.filter(o => o.id !== selectedObject.id).map(o => ({
    id: o.id,
    address: o.address,
    coordinates: o.coordinates
  }));
`;

content = content.replace(/export const PassportPanel: React\.FC<PassportPanelProps> = \(\{[\s\S]*?\}\) => \{[\s\S]*?onObjectLoaded; \/\/ to prevent TS unused error/, componentHeader);

// 3. Update getDynamicPhotos to use obj.photosFolder
const photoLogic = `const getDynamicPhotos = (obj: any): string[] => {
  const folderKeyword = obj?.photosFolder || 'rossiya';
  const matchedPaths = Object.keys(allPhotos)
    .filter(path => path.toLowerCase().includes(folderKeyword.toLowerCase()))
    .map(path => path.replace('/public', ''));

  return matchedPaths.length > 0 ? matchedPaths : ['/photos/rossiya/rossiya1.jpg'];
};`;
content = content.replace(/const getDynamicPhotos = \(obj: any\): string\[\] => \{[\s\S]*?return matchedPaths\.length > 0 \? matchedPaths : \['\/photos\/rossiya\/rossiya1\.jpg'\];\n\};/, photoLogic);

// 4. Update getObjectMetrics to return obj.metrics
const metricsLogic = `const getObjectMetrics = (obj: any) => {
  return obj?.metrics || {
    district: 'Центральный АО',
    analogCount: 7,
    densityLevel: 'Средняя',
    transport: { quality: 'Хорошая', time: '~10 мин' },
    complexity: 'С учетом ОКН',
    complexityZone: 'Средняя',
    rating: { score: 4.5, percent: 89 }
  };
};`;
content = content.replace(/const getObjectMetrics = \(obj: any\) => \{[\s\S]*?return \{[\s\S]*?rating: \{ score: 4\.5, percent: 89 \}\n  \};\n\};/, metricsLogic);

// 5. Update marker rendering logic to just use obj.id and setSelectedObject
content = content.replace(/eventHandlers=\{\{[\s\S]*?click: \(\) => \{[\s\S]*?\}\n\s*\}\}/g, `eventHandlers={{
              click: () => {
                const fullObj = ALL_OBJECTS.find(o => o.id === analog.id);
                if (fullObj) {
                  setSelectedObject(fullObj);
                  setActivePhotoIndex(0);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo(fullObj.coordinates, 16);
                  }
                }
              }
            }}`);
            
// 6. Fix map center to selectedObject coordinates initially
content = content.replace(/const coords = getGeocodedCoords\(okn\.address\) \|\| \[55\.7558, 37\.6173\];/, 'const coords = okn.coordinates || [55.7558, 37.6173];');

// 7. Map okn metrics in JSX safely
content = content.replace(/\{okn\.year_built\}/g, '{okn?.metadata?.year_built || okn?.year_built || 1900}');
content = content.replace(/\{okn\.walls_material\}/g, '{okn?.metadata?.walls_material || okn?.walls_material || "Кирпич"}');
content = content.replace(/\{okn\.wear_pct\}/g, '{okn?.metadata?.wear_pct || okn?.wear_pct || 0}');
content = content.replace(/\{okn\.history\}/g, '{okn?.metadata?.history || okn?.history || "Историческая справка отсутствует."}');

fs.writeFileSync(file, content, 'utf8');
console.log('Done');
--- КОНЕЦ ФАЙЛА: update_passport.cjs ---

--- СТАРТ ФАЙЛА: vite.config.ts ---
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PHOTOS_DIR = path.resolve(__dirname, 'public/photos');
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.jfif'];

function buildPhotosMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.warn('[vite.config] public/photos not found');
    return map;
  }
  let entries: fs.Dirent[] = [];
  try {
    entries = fs.readdirSync(PHOTOS_DIR, { withFileTypes: true });
  } catch (e) {
    console.warn('[vite.config] failed to read public/photos:', e);
    return map;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const folderName = entry.name;
    const folderPath = path.join(PHOTOS_DIR, folderName);
    try {
      const files = fs.readdirSync(folderPath).filter((file: string) => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_EXTS.includes(ext);
      });
      map[folderName] = files;
    } catch (e) {
      console.warn(`[vite.config] failed to read photos subfolder ${folderName}:`, e);
      map[folderName] = [];
    }
  }
  return map;
}

const photosMapData = buildPhotosMap();

// === DEV SPEED: write a static manifest.json into public/photos/ ===
// This makes the existing runtime getValidPhotos() / loadManifest() in photoHelper.ts
// actually work (it was fetching a non-existent file before).
// The data is IDENTICAL to what __PHOTOS_MAP__ provides (same FS scan).
// Low-risk side-effect: only adds/updates a generated JSON next to the real photos.
// Safe for dev and build. Does not affect app logic or bundle size for the define path.
try {
  const manifestPath = path.resolve(__dirname, 'public/photos/manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(photosMapData, null, 2), 'utf8');
} catch (e) {
  const msg = e && typeof e === 'object' && e.message ? e.message : String(e);
  console.warn('[vite.config] could not write photos manifest (non-fatal):', msg);
}

export default defineConfig({
  plugins: [react()],
  define: {
    __PHOTOS_MAP__: JSON.stringify(photosMapData),
  },
  // === DEV SPEED OPTIMIZATIONS (low risk, standard Vite practices) ===
  // Explicitly pre-bundle heavy deps that are statically imported at root (via App.tsx importing all panels).
  // This makes cold starts + after `npm install` / cache clears more predictable and often faster.
  // Leaflet, recharts (d3), pdf/docx libs, lucide are the biggest.
  optimizeDeps: {
    include: [
      'leaflet',
      'react-leaflet',
      'recharts',
      'jspdf',
      'pdf-lib',
      'docx',
      'file-saver',
      'lucide-react'
    ]
  },
  server: {
    port: 5173,
    // HMR is on by default and works well; explicit for clarity
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
--- КОНЕЦ ФАЙЛА: vite.config.ts ---

