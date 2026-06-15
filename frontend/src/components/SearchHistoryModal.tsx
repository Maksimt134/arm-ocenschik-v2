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
