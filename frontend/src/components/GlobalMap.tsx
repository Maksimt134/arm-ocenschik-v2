import React, { useEffect, useRef, useState, useMemo } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Maximize2, AlertTriangle, Building, X, Calendar, Check, ArrowRight, Minimize2, Layers, Filter, RefreshCcw } from 'lucide-react';
import { OknObject } from '../types';
import { ALL_OBJECTS as mockObjects } from '../data/allObjects';
import OknImage from './OknImage';

interface GlobalMapProps {
  oknObjects?: OknObject[];
  onSelectOkn?: (id: string) => void;
  onOpenInPassport?: (id: string) => void;
  onAddToEvaluation?: (id: string) => void;
}

const filterOptions = [
  { value: 'Объект культурного наследия федерального значения', label: 'Федеральный' },
  { value: 'Объект культурного наследия регионального значения', label: 'Региональный' },
  { value: 'Не является объектом культурного наследия', label: 'Местный / Выявленный' }
];

const getTypeStyles = (category: string) => {
  const lowerCat = (category || '').toLowerCase();
  if (lowerCat.includes('федераль')) {
    return 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]';
  } else if (lowerCat.includes('региональ')) {
    return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
  }
  return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]';
};

const getBadgeLabel = (category: string) => {
  const lowerCat = (category || '').toLowerCase();
  if (lowerCat.includes('федераль')) return 'Федеральный';
  if (lowerCat.includes('региональ')) return 'Региональный';
  return 'Местный / Выявленный';
};

const getWearColor = (pct: number) => {
  if (pct > 70) return 'text-rose-400';
  if (pct > 40) return 'text-amber-400';
  return 'text-emerald-400';
};

const MapResizer = () => {
  const map = useMap();
  useEffect(() => { 
    const timer = setTimeout(() => map.invalidateSize(), 300); 
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const getCategoryColor = (category: string) => {
  const lowerCat = (category || '').toLowerCase();
  if (lowerCat.includes('федераль')) return '#f59e0b';
  if (lowerCat.includes('региональ')) return '#10b981';
  return '#22d3ee';
};

const createIcon = (category: string, isActive: boolean) => {
  const color = getCategoryColor(category);
  
  const size = isActive ? 32 : 24;
  const innerSize = isActive ? 12 : 8;
  const shadowBlur = isActive ? '12px' : '6px';
  const opacity = isActive ? '1' : '0.9';

  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        width: ${size}px; 
        height: ${size}px; 
        background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%); 
        border-radius: 50%; 
        border: 2px solid rgba(255,255,255,0.95); 
        box-shadow: 0 4px ${shadowBlur} rgba(0,0,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.3), 0 0 15px ${color}80; 
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: ${opacity};
        transform: scale(${isActive ? 1.15 : 1});
        z-index: ${isActive ? 1000 : 1};
      ">
        <div style="
          width: ${innerSize}px;
          height: ${innerSize}px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.5);
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

const TILE_LAYERS = {
  dark: { name: 'Тёмная', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' },
  light: { name: 'Светлая', url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' },
  satellite: { name: 'Спутник', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' }
};

const GlobalMap: React.FC<GlobalMapProps> = ({ oknObjects, onSelectOkn, onOpenInPassport }) => {
  const mapRef = useRef<L.Map | null>(null);
  
  const allObjects = useMemo(() => {
    if (oknObjects && oknObjects.length > 0) return oknObjects;
    return (mockObjects as OknObject[]) || [];
  }, [oknObjects]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Объект культурного наследия федерального значения',
    'Объект культурного наследия регионального значения',
    'Не является объектом культурного наследия'
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedForEvaluation, setSelectedForEvaluation] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapTheme, setMapTheme] = useState<keyof typeof TILE_LAYERS>('dark');
  
  const defaultCenter = [55.751244, 37.618423] as L.LatLngExpression;
  const mapCenter = useMemo(() => {
    if (allObjects.length > 0) {
      const validObj = allObjects.find(obj => obj && obj.coordinates && obj.coordinates.length === 2 && !isNaN(obj.coordinates[0]) && !isNaN(obj.coordinates[1]));
      if (validObj) {
        return [validObj.coordinates[0], validObj.coordinates[1]] as L.LatLngExpression;
      }
    }
    return defaultCenter;
  }, [allObjects]);

  const filteredObjects = useMemo(() => {
    return allObjects.filter(obj => {
      const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            obj.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = activeFilters.includes(obj.okn_category);
      return matchesSearch && matchesType;
    });
  }, [allObjects, searchQuery, activeFilters]);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        try {
          mapRef.current?.invalidateSize();
        } catch(e) {}
      }, 300);
    }
  }, [isFullscreen]);

  const toggleFilter = (val: string) => {
    setActiveFilters(prev => 
      prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val]
    );
  };

  const resetMap = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(defaultCenter, 11, { duration: 0.5 });
      setActiveId(null);
    }
  };

  const handleObjectClick = (obj: OknObject) => {
    setActiveId(obj.id);
    if (mapRef.current && obj.coordinates && obj.coordinates.length === 2) {
      mapRef.current.flyTo([obj.coordinates[0], obj.coordinates[1]], 16, { duration: 0.5 });
    }
    setTimeout(() => {
      const el = document.getElementById(`card-${obj.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
  };

  const toggleEvaluation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedForEvaluation(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className={`flex flex-col bg-[#0B1120] font-sans ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : 'rounded-3xl border border-[#1e293b]'}`}>
      
      {/* MAP SECTION (TOP) */}
      <div className={`relative ${isFullscreen ? 'h-[60vh] shrink-0' : 'h-[500px] xl:h-[600px] shrink-0'} border-b border-[#1e293b] overflow-hidden ${!isFullscreen && 'rounded-t-3xl'}`}>
        
        {/* Map Header Overlay */}
        <div className="absolute top-6 left-6 z-[400] pointer-events-none flex items-center gap-4">
          <h2 className="text-xl font-bold text-white tracking-wide drop-shadow-md">ГЛОБАЛЬНАЯ КАРТА ОКН</h2>
          <div className="bg-emerald-500/20 border border-emerald-500/50 px-3 py-1 rounded-full flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-emerald-400 text-xs font-bold tracking-wider">LIVE • {filteredObjects.length} объектов</span>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="absolute top-6 right-6 z-[400] flex bg-[#0f172a]/90 backdrop-blur-md border border-[#1e293b] rounded-xl p-1 shadow-lg">
          {(Object.keys(TILE_LAYERS) as Array<keyof typeof TILE_LAYERS>).map(themeKey => (
            <button
              key={themeKey}
              onClick={() => setMapTheme(themeKey)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mapTheme === themeKey 
                ? 'bg-sky-500 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              {TILE_LAYERS[themeKey].name}
            </button>
          ))}
        </div>

        {/* Reset Map Button */}
        <div className="absolute top-20 right-6 z-[400]">
          <button 
            onClick={resetMap}
            className="flex items-center gap-2 bg-[#0f172a]/90 hover:bg-[#1e293b] text-sky-400 px-4 py-2 rounded-xl border border-[#1e293b] backdrop-blur-md transition-all shadow-lg text-xs font-bold tracking-wider uppercase"
          >
            <RefreshCcw className="w-4 h-4" /> Сбросить карту
          </button>
        </div>

        <MapContainer 
          center={mapCenter} 
          zoom={11} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          zoomControl={false}
          ref={mapRef}
        >
          <MapResizer />
          <TileLayer 
            url={TILE_LAYERS[mapTheme].url} 
            attribution="&copy; OpenStreetMap" 
          />
          {filteredObjects.filter(obj => obj && obj.coordinates && obj.coordinates.length === 2 && !isNaN(obj.coordinates[0]) && !isNaN(obj.coordinates[1])).map((obj) => {
            const color = getCategoryColor(obj.okn_category);
            const isActive = activeId === obj.id;
            return (
              <React.Fragment key={obj.id}>
                {isActive && (
                  <Circle 
                    center={[obj.coordinates[0], obj.coordinates[1]]} 
                    radius={500} 
                    pathOptions={{ 
                      color: color, 
                      fillColor: color, 
                      fillOpacity: 0.15, 
                      weight: 2,
                      dashArray: '4 4'
                    }} 
                  />
                )}
                <Marker 
                  position={[obj.coordinates[0], obj.coordinates[1]]}
                  icon={createIcon(obj.okn_category, isActive)}
                  eventHandlers={{
                    click: () => handleObjectClick(obj)
                  }}
                >
                  <Popup className="custom-popup" closeButton={false}>
                    <div className="font-sans">
                      <strong className="text-slate-800 text-sm">{obj.name}</strong><br/>
                      <span className="text-slate-500 text-xs">{obj.address}</span>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 z-[400] bg-[#0f172a]/90 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-col gap-3 pointer-events-none">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Статус объекта</h4>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full border border-white/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f59e0bdd 100%)' }}></div>
            <span className="text-xs text-slate-300 font-medium drop-shadow-sm">Федерального значения</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full border border-white/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" style={{ background: 'linear-gradient(135deg, #10b981 0%, #10b981dd 100%)' }}></div>
            <span className="text-xs text-slate-300 font-medium drop-shadow-sm">Регионального значения</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full border border-white/80 shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #22d3eedd 100%)' }}></div>
            <span className="text-xs text-slate-300 font-medium drop-shadow-sm">Местные / Выявленные</span>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-[400]">
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-3 bg-[#0f172a]/90 hover:bg-[#1e293b] text-sky-400 rounded-xl border border-[#1e293b] shadow-lg backdrop-blur-md transition-all">
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* CONTROLS & LIST SECTION (BOTTOM) */}
      <div className="flex flex-col bg-[#080d14] rounded-b-3xl">
        
        {/* Search & Filters */}
        <div className="p-6 border-b border-[#1e293b] bg-[#0f172a]/30 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Поиск по названию или адресу..." 
              className="w-full bg-[#080d14] border border-[#1e293b] focus:border-sky-500 rounded-2xl pl-12 pr-4 py-3.5 text-sm placeholder:text-slate-500 focus:outline-none text-white shadow-inner transition-colors" 
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {filterOptions.map((opt) => (
              <button 
                key={opt.value} onClick={() => toggleFilter(opt.value)} 
                className={`px-4 py-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap border ${
                  activeFilters.includes(opt.value) 
                  ? getTypeStyles(opt.value).replace('shadow-[0_0_15px_rgba(244,63,94,0.15)]', '') 
                  : 'border-[#1e293b] text-slate-500 hover:bg-[#1e293b]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredObjects.map((obj) => {
              const isSelected = selectedForEvaluation.includes(obj.id);
              const isActive = activeId === obj.id;
              const wear = obj.wear_pct || obj.metadata?.wear_pct || 30;
              const area = obj.area || obj.metadata?.area || '—';
              const wearColor = getWearColor(wear);

              return (
                <div 
                  key={obj.id} id={`card-${obj.id}`} onClick={() => onOpenInPassport?.(obj.id)}
                  className={`group bg-[#0f172a]/60 backdrop-blur-md border border-[#1e293b] hover:border-sky-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${isActive ? 'ring-1 ring-sky-500 bg-sky-950/10 shadow-[0_0_20px_rgba(14,165,233,0.15)] transform -translate-y-1' : ''}`}
                >
                  <div className="relative h-48 flex-shrink-0 bg-[#080d14] overflow-hidden">
                    <OknImage photosFolder={obj.photosFolder} alt={obj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                    <div className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border backdrop-blur-md ${getTypeStyles(obj.okn_category)}`}>
                      {getBadgeLabel(obj.okn_category)}
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-[#080d14] text-[10px] font-black px-2 py-1 rounded shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                        В ОЦЕНКЕ
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm text-white group-hover:text-sky-300 transition-colors leading-snug line-clamp-2 mb-2">{obj.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-5">{obj.address}</p>

                    <div className="grid grid-cols-2 gap-4 mb-5 mt-auto border-t border-[#1e293b] pt-4">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Площадь</span>
                        <span className="text-white text-sm font-semibold">{area} кв.м</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Износ</span>
                        <span className={`text-sm font-semibold ${wearColor}`}>{wear}%</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={(e) => toggleEvaluation(obj.id, e)}
                        className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border ${
                          isSelected 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                          : 'bg-[#080d14] text-slate-400 border-[#1e293b] hover:bg-[#1e293b] hover:text-white'
                        }`}
                      >
                        {isSelected ? 'УБРАТЬ' : 'В ОЦЕНКУ'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onOpenInPassport?.(obj.id); }}
                        className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] flex items-center justify-center gap-1.5"
                      >
                        ПАСПОРТ <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #1e293b; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #38bdf8; }
        .custom-popup .leaflet-popup-content-wrapper {
          background-color: rgba(255, 255, 255, 0.95);
          border-radius: 8px;
          padding: 2px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .custom-popup .leaflet-popup-tip {
          background-color: rgba(255, 255, 255, 0.95);
        }
      `}</style>
    </div>
  );
};

export default GlobalMap;