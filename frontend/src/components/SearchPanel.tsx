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
    id: ALL_OBJECTS[0]?.cadastralNumber || '77:01:0001001:1023', 
    cadastralNumber: ALL_OBJECTS[0]?.cadastralNumber || '77:01:0001001:1023', 
    address: ALL_OBJECTS[0]?.address || 'г. Москва, Колпачный переулок, дом 5, строение 2', 
    isStarred: true 
  },
  { 
    id: ALL_OBJECTS[3]?.cadastralNumber || '77:01:0001001:1001', 
    cadastralNumber: ALL_OBJECTS[3]?.cadastralNumber || '77:01:0001001:1001', 
    address: ALL_OBJECTS[3]?.address || 'г. Москва, Колпачный переулок, д. 10', 
    isStarred: false 
  },
  { 
    id: ALL_OBJECTS[6]?.cadastralNumber || '77:01:0001052:1069', 
    cadastralNumber: ALL_OBJECTS[6]?.cadastralNumber || '77:01:0001052:1069', 
    address: ALL_OBJECTS[6]?.address || 'г. Москва, ул. Остоженка, д. 21, стр. 1', 
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
      const filtered = (ALL_OBJECTS.filter(obj => {
        const nameMatch = String(obj.name || '').toLowerCase().includes(lowerQuery);
        const addrMatch = String(obj.address || '').toLowerCase().includes(lowerQuery);
        const cadMatch = String(obj.cadastralNumber || '').toLowerCase().includes(lowerQuery);
        const idMatch = String(obj.id || '').toLowerCase().includes(lowerQuery);
        return nameMatch || addrMatch || cadMatch || idMatch;
      }) || []).slice(0, 8);
      
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
    // Усиление связи с ИСОГД для диплома: явное разделение источников
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
      addLog('Агрегация зон и ограничений из ГИС ОГД...');
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
      addLog('Сбор рыночных показателей из ГИС Аналитика...');
      let cian = 0;
      const cianInterval = setInterval(() => {
        cian += Math.floor(Math.random() * 8) + 2;
        if (cian >= 100) {
          cian = 100;
          clearInterval(cianInterval);
          addLog('Аналитика собрана.');

          // Усиление связи с ИСОГД для диплома
          addLog('Данные успешно агрегированы из государственных информационных систем обеспечения градостроительной деятельности.');

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
        localStorage.setItem('oknSearchHistory', JSON.stringify((history || []).slice(0, 15)));
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