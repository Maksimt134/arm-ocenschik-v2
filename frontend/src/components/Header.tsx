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
      const results = (ALL_OBJECTS.filter(obj => {
        const nameMatch = String(obj.name || '').toLowerCase().includes(lowerQuery);
        const addrMatch = String(obj.address || '').toLowerCase().includes(lowerQuery);
        const cadMatch = String(obj.cadastral_number || '').toLowerCase().includes(lowerQuery);
        const idMatch = String(obj.id || '').toLowerCase().includes(lowerQuery);
        return nameMatch || addrMatch || cadMatch || idMatch;
      }) || []).slice(0, 5);
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
                      {(currentObject.address || '').replace('г. Москва, ', '').slice(0, 35) + ((currentObject.address || '').length > 35 ? '…' : '')}
                    </div>
                  </div>
                  <span className={`ml-1.5 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider rounded border flex-shrink-0 ${
                    String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('федеральн')
                      ? 'bg-indigo-800 text-indigo-200 border-indigo-700/60'
                      : String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('региональн')
                      ? 'bg-blue-600 text-blue-100 border-blue-500'
                      : 'bg-slate-600 text-slate-200 border border-slate-500'
                  }`}>
                    {String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('федеральн') 
                      ? 'Федеральный ОКН' 
                      : String(currentObject.okn_category || currentObject.significance || '').toLowerCase().includes('региональн')
                      ? 'Региональный ОКН' 
                      : 'Без статуса ОКН'}
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