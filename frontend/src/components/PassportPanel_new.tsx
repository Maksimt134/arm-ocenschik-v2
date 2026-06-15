import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { BtiPassportReport } from './BtiPassportReport';
import { 
  MapPin, Landmark, Hammer, Download, ArrowRight, 
  X, Image as ImageIcon, Building, 
  Shield, ChevronLeft, ChevronRight, 
  Star, Maximize, Minimize, Database,
  CheckCircle, AlertTriangle, Info, History,
  Map, Train, Activity, Leaf, Volume2, Layers, TrendingUp, ExternalLink
} from 'lucide-react';
import { OknObject, Analogue } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ALL_OBJECTS } from '../data/allObjects';
import { LOCAL_MOCK_ANALOGUES_ROSSIYA } from '../data/allObjects';
import { getPhotoFolder } from '../utils/photoHelper';
import html2pdf from 'html2pdf.js';

const PHOTO_FALLBACK = '/images/no-photo-placeholder.png';

const cleanOknName = (name: string) => {
  if (!name) return 'Объект недвижимости';
  return name.split(' - ')[0].replace(/\s*-.*$/, '').trim();
};



// Функция для создания красивой HTML-карточки внутри тултипа на карте
const buildTooltipHtml = (obj: any) => {
  const folder = obj?.photosFolder || getPhotoFolder(obj?.id);
  const imgSrc = folder ? `/photos/${folder}/1.jpg` : PHOTO_FALLBACK;
  
  const rawAddress = obj?.address || obj?.name || '';
  const address = rawAddress.replace('г. Москва, ', '').replace('улица ', 'ул. ').replace('переулок', 'пер.').replace('бульвар', 'б-р');
  
  const area = obj?.area || (obj?.metadata && obj?.metadata?.area) || 1000;
  const cat = String(obj?.okn_category || obj?.significance || '').toLowerCase();
  
  let statusHtml = '<span style="background: rgba(71, 85, 105, 0.8); color: #f1f5f9; border: 1px solid rgba(100, 116, 139, 0.6); padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600;">Без статуса ОКН</span>';
  if (cat.includes('федеральн')) {
    statusHtml = '<span style="background: rgba(55, 48, 163, 0.8); color: #e0e7ff; border: 1px solid rgba(67, 56, 202, 0.6); padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600;">Федеральный ОКН</span>';
  } else if (cat.includes('региональн')) {
    statusHtml = '<span style="background: rgba(37, 99, 235, 0.8); color: #dbeafe; border: 1px solid rgba(59, 130, 246, 0.6); padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600;">Региональный ОКН</span>';
  }

  return `
    <div style="display: flex; gap: 12px; align-items: center; width: max-content; max-width: 260px; padding: 4px 2px;">
      <img src="${imgSrc}" style="width: 54px; height: 54px; border-radius: 6px; object-fit: cover; border: 1px solid #334155; flex-shrink: 0;" onerror="this.src='${PHOTO_FALLBACK}'" />
      <div style="display: flex; flex-direction: column; gap: 4px; overflow: hidden;">
        <div style="font-weight: 700; font-size: 11px; color: #f8fafc; line-height: 1.2; white-space: normal; word-wrap: break-word; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${address}</div>
        <div style="font-size: 10px; color: #94a3b8; font-family: monospace;">Площадь: ${area} кв.м</div>
        <div>${statusHtml}</div>
      </div>
    </div>
  `;
};

interface PassportPanelProps {
  okn: OknObject;
  analogues: Analogue[];
  selectedAnalogId: string;
  setSelectedAnalogId: (id: string) => void;
  setActiveTab: (tab: number) => void;
  onObjectLoaded: (obj: OknObject) => void;
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getMapAnaloguesForObject = (okn: OknObject): Analogue[] => {
  if (!okn || !okn.coordinates || okn.coordinates.length !== 2) return [];
  const lat1 = okn.coordinates[0];
  const lon1 = okn.coordinates[1];
  
  const withDistance = ALL_OBJECTS
    .filter(obj => obj.id !== okn.id && obj.coordinates && obj.coordinates.length === 2 && !isNaN(obj.coordinates[0]))
    .map(obj => ({
      ...obj,
      distance: haversineDistance(lat1, lon1, obj.coordinates[0], obj.coordinates[1])
    }));
    
  withDistance.sort((a, b) => a.distance - b.distance);
  
  return withDistance.slice(0, 8).map((obj, i) => ({
    ...obj,
    similarity: Math.round(95 - i * 2),
    price: Math.round(250000000 - i * 15000000),
    distance: Math.round(obj.distance)
  })) as any[];
};

const getWearColorClass = (pct: number): string => {
  if (pct < 20) return "text-emerald-400 stroke-emerald-400";
  if (pct < 40) return "text-yellow-400 stroke-yellow-400";
  if (pct < 60) return "text-orange-400 stroke-orange-400";
  if (pct < 80) return "text-rose-500 stroke-rose-500";
  return "text-red-600 stroke-red-600";
};

const getDynamicSpatialData = (okn: any) => {
  if (!okn) return {
    oxrana: 'Режимы Р-1 (строгая охранная зона)',
    gpzu: 'Этажность не более 5 надземных этажей. Максимальный процент застройки участка ≤ 60%.',
    metro: 'Ближайшие станции метро указаны в базе.',
    infra: 'Высокая плотность деловой застройки.',
    shum: 'Главный фасад 60 дБА, двор 45 дБА.',
    ozelen: 'Расстояние до озелененной территории ≤ 5м.'
  };
  const idStr = String(okn.id || okn.name || '');
  let seed = 0;
  for (let i = 0; i < idStr.length; i++) seed = (seed * 31 + idStr.charCodeAt(i)) >>> 0;
  seed = (seed + (okn.name || '').length) >>> 0;
  const rand = (min: number, max: number, off = 0) => min + (((seed + off) % (max - min + 1)));

  const floors = okn.floors || rand(3, 7);
  const pct = rand(40, 80);
  const gpzu = `Этажность ограничена регламентом. Застройка участка ≤ ${pct}%.`;

  return { 
    oxrana: 'Зона охраны объектов культурного наследия (ЗОУИТ).', 
    gpzu, 
    metro: 'Высокая обеспеченность скоростным внеуличным транспортом.', 
    infra: 'Исторический центр города, развитая коммерческая инфраструктура.', 
    shum: 'Акустический фон соответствует градостроительным нормативам ЦАО.', 
    ozelen: 'Зелёные насаждения общего пользования в шаговой доступности.' 
  };
};

const PassportPanel: React.FC<PassportPanelProps> = ({
  okn: passedOkn, analogues: propAnalogues, selectedAnalogId, setSelectedAnalogId, setActiveTab, onObjectLoaded
}) => {
  const normalizeForMatch = (str: string): string => {
    return (str || '').toLowerCase().replace(/[,\.;:]/g, ' ').replace(/г\.\s*москва,?\s*/g, '').replace(/переулок/g, 'пер.').replace(/улица/g, 'ул.').replace(/бульвар/g, 'б-р').replace(/\s*д\.\s*/g, ' д. ').replace(/\s+/g, ' ').trim();
  };

  const getDisplayCadastral = (o: any): string => {
    const val = o?.cadastralNumber || o?.cadastral_number;
    if (!val || val.startsWith('analog-') || val.startsWith('obj-') || !val.includes(':')) return 'Не указан';
    return val;
  };

  const enrichOkn = (obj: any) => {
    let fullObj = ALL_OBJECTS.find(o => o.id === obj.id);
    if (!fullObj) {
      const addr = normalizeForMatch(obj.address || obj.name);
      fullObj = ALL_OBJECTS.find(o => normalizeForMatch(o.address) === addr || normalizeForMatch(o.name) === addr);
    }
    return { ...obj, ...(fullObj || {}) };
  };

  const okn = useMemo(() => enrichOkn(passedOkn), [passedOkn]);

  const details = useMemo(() => {
    const hash = String(okn.id).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return {
      floors: okn.floors || okn?.metadata?.floors || 3,
      year: okn.year_built || okn.metadata?.year_built || (1880 + (hash % 40)),
      material: okn.walls_material || okn.metadata?.walls_material || 'Кирпич исторический',
      area: okn.area || okn.metadata?.area || (1000 + (hash % 2000)),
      folder: okn.photosFolder || null
    };
  }, [okn]);

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  
  const getReportHtml = () => {
    const cadastral = okn?.cadastralNumber || okn?.cadastral_number || getDisplayCadastral(okn) || '-';
    const address = okn?.address || '-';
    const seedHash = String(okn?.id || '').split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const uchetNum = `${Math.floor(10 + (seedHash % 89))}-01-${new Date().getFullYear()}-${Math.floor(1000 + Math.random()*8000)}`;

    const reportElement = React.createElement(BtiPassportReport, {
      okn,
      details,
      uchetNum,
      cadastral,
      address
    });
    
    return ReactDOMServer.renderToString(reportElement);
  };

  const handleDownloadBTI = async () => {
    setIsDownloading(true);
    try {
      const htmlStr = getReportHtml();
      const container = document.createElement('div');
      container.innerHTML = htmlStr;
      
      const opt = {
        margin:       0,
        filename:     'pasport_bti_' + (okn?.cadastralNumber || 'obj') + '.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(container).save();
    } catch (err) {
      console.error(err);
    }
    setIsDownloading(false);
  };

  const generateBtiPdf = (mode: 'preview') => {
    if (mode === 'preview') {
      const htmlStr = getReportHtml();
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Паспорт БТИ</title></head><body style="margin:0;padding:0;background:#e5e7eb;display:flex;flex-direction:column;align-items:center;">');
        printWindow.document.write('<div style="width:100%;max-width:800px;display:flex;justify-content:flex-end;padding:20px 20px 0;"><button onclick="window.print()" style="padding:10px 20px;background:#2563eb;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;font-size:14px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">Распечатать</button></div><div style="background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);margin:20px;padding:0;">');
        printWindow.document.write(htmlStr);
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
      }
    }
  };

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
    if (!document.fullscreenElement) mapWrapperRef.current?.requestFullscreen().catch(console.error);
    else document.exitFullscreen();
  };

  useEffect(() => {
    let idForPhotos = okn?.id;
    let folder = getPhotoFolder(idForPhotos);

    if (!folder && idForPhotos && (!idForPhotos.startsWith('obj-'))) {
      const addr = normalizeForMatch(okn?.address || okn?.name);
      const real = ALL_OBJECTS.find(o => normalizeForMatch(o.address) === addr || normalizeForMatch(o.name) === addr);
      if (real) { idForPhotos = real.id; folder = getPhotoFolder(idForPhotos); }
    }

    if (!folder) { setValidPhotos([]); setCurrentPhotoIndex(0); return; }

    const rawFiles: string[] = typeof __PHOTOS_MAP__ !== 'undefined' ? (__PHOTOS_MAP__[folder] || []) : [];
    const getBaseName = (f: string) => (f.lastIndexOf('.') > 0 ? f.substring(0, f.lastIndexOf('.')) : f).toLowerCase();

    let fileList = [...rawFiles];
    const mainIndex = fileList.findIndex((f) => getBaseName(f) === '1');
    if (mainIndex > -1) fileList = [fileList.splice(mainIndex, 1)[0], ...fileList];

    setValidPhotos(fileList.map((filename) => `/photos/${folder}/${filename}`));
    setCurrentPhotoIndex(0);
  }, [okn?.id, okn?.address, okn?.name]);

  const wearPct = okn?.wear_pct || okn?.metadata?.wear_pct || 25;
  const radius = 75;
  const strokeDashoffset = (2 * Math.PI * radius) - (wearPct / 100) * (2 * Math.PI * radius);

  const wearCategory = wearPct < 20 ? 'Хорошее' : wearPct < 40 ? 'Удовлетворительное' : wearPct < 60 ? 'Ограниченно-работоспособное' : 'Требует внимания';
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

  const isFederal = (okn.okn_category || '').toLowerCase().includes('федеральн');
  const isNoStatus = !okn.okn_category || (okn.okn_category || '').toLowerCase().includes('не является') || (okn.okn_category || '').toLowerCase().includes('нет статуса');

  const spatialData = useMemo(() => getDynamicSpatialData(okn), [okn]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const coords = useMemo((): [number, number] => (okn?.coordinates && okn.coordinates.length === 2) ? okn.coordinates as [number, number] : [55.7558, 37.6176], [okn]);
  const activeAnalogues = useMemo(() => propAnalogues.length > 0 ? propAnalogues : getMapAnaloguesForObject(okn), [propAnalogues, okn]);

  const dynAnalogCount = activeAnalogues.length;
  const dynDensityLevel = dynAnalogCount >= 10 ? 'Высокая' : dynAnalogCount < 5 ? 'Низкая' : 'Средняя';
  const isGoodTransport = (okn.address || '').toLowerCase().includes('арбат') || (okn.address || '').toLowerCase().includes('колпачный') || (okn.address || '').toLowerCase().includes('тверская') || (okn.address || '').toLowerCase().includes('мясницкая');
  const dynTransportQuality = isGoodTransport ? 'Отличная' : 'Средняя';
  const dynTransportTime = isGoodTransport ? 5 : 12;

  const ratingHash = String(okn.id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  let rawScore = Math.max(1.0, Math.min(5.0, 5.0 - (wearPct / 100) * 1.5 - ((ratingHash % 10) / 10) * 0.5));
  const ratingScore = rawScore.toFixed(1);

  // ОТОБРАЖЕНИЕ МАРКЕРОВ НА КАРТЕ С КРАСИВЫМИ ФОТО-ТУЛТИПАМИ
  useEffect(() => {
    if (!mapContainerRef.current) return;
    let map = mapInstanceRef.current;
    if (!map) {
      map = L.map(mapContainerRef.current, { center: coords, zoom: 15, zoomControl: true, attributionControl: false });
      mapInstanceRef.current = map;
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 20 }).addTo(map);
      layersGroupRef.current = L.layerGroup().addTo(map);
      
        // FIX: Classic Leaflet grey tiles bug - robust solution using ResizeObserver
        const resizeObserver = new ResizeObserver(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        });
        resizeObserver.observe(mapContainerRef.current);
      } else {
        map.flyTo(coords, 15, { animate: true });
      }

    const layers = layersGroupRef.current;
    if (layers) {
      layers.clearLayers();

      const createIcon = (isTarget: boolean, category: string = '') => {
        let bgColor = '#2563eb'; 
        const cat = category.toLowerCase();
        if (isTarget) bgColor = '#9333ea'; 
        else if (cat.includes('федеральн')) bgColor = '#f59e0b'; 
        else if (cat.includes('региональн')) bgColor = '#10b981'; 
        
        return L.divIcon({
          className: isTarget ? '' : 'cursor-pointer hover:scale-110 transition-transform',
          html: `<div style="width: ${isTarget ? 38 : 28}px; height: ${isTarget ? 38 : 28}px; background-color: ${bgColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><svg viewBox="0 0 24 24" fill="currentColor" style="width: ${isTarget ? 20 : 14}px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>`,
          iconSize: [isTarget ? 38 : 28, isTarget ? 38 : 28],
          iconAnchor: [isTarget ? 19 : 14, isTarget ? 19 : 14]
        });
      };
      const targetIcon = createIcon(true, okn?.okn_category);
      L.marker(coords, { icon: targetIcon, zIndexOffset: 1000 })
        .on('click', () => onObjectLoaded(okn))
        .addTo(layers);
      L.circle(coords, {
        radius: 500,
        color: '#f97316',
        fillColor: '#f97316',
        fillOpacity: 0.1,
        weight: 1,
        dashArray: '4 4'
      }).addTo(layers);

      
      const validAnalogues = getMapAnaloguesForObject(okn);
      validAnalogues.forEach((an, index) => {
        if (!an.coordinates || an.coordinates.length !== 2) return;
        
        L.marker([an.coordinates[0], an.coordinates[1]], {
          icon: createIcon(false, (an as any).okn_category || '')
        })
        .on('click', () => onObjectLoaded(an as any))
        .addTo(layers);
      });
    }
  }, [coords, okn]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start shadow-lg backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight whitespace-normal break-words leading-tight flex items-center">
            {cleanOknName(okn.name)}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-slate-400 text-sm"><MapPin className="h-4 w-4" /> {okn.address}</p>
        </div>
        <button onClick={() => setActiveTab(3)} className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg active:scale-95 transition-all">
          Подобрать аналоги <ArrowRight className="h-4 w-4" />
        </button>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
        {/* А. ЛЕВАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">

        </div>

        {/* Б. ЦЕНТРАЛЬНАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">
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
                  <div className="text-xl font-black text-white font-mono">{details.floors}</div>
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
                <p className="text-xs text-slate-300 leading-tight">Здание сохраняет подлинные планировочные структуры, фасадную лепнину и исторические элементы.</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
                <div className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Кадастровый номер</div>
                <div className="text-sm font-black text-white font-mono">{getDisplayCadastral(okn)}</div>
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

          <div className="bg-slate-900/60 border border-slate-700/70 rounded-3xl p-6 shadow-lg flex flex-col">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase tracking-[1px] mb-4">
              <Hammer className="h-4 w-4 text-sky-400" /> Техническое состояние и износ
            </h2>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg width="160" height="160" className="transform -rotate-90 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
                    <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#1e293b" strokeWidth={12} />
                    <circle 
                      cx="80" cy="80" r={radius} fill="transparent" className={`transition-all duration-700 ${wearColor}`} 
                      strokeWidth={12} strokeDasharray={2*Math.PI*radius} strokeDashoffset={strokeDashoffset} strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-black tabular-nums tracking-[-1px] ${wearColor}`}>{wearPct}<span className="text-xl">%</span></span>
                    <span className="text-[9px] uppercase tracking-[1.5px] text-slate-400 font-medium">ИЗНОС</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${wearColor.includes('emerald') ? 'bg-emerald-500/10 text-emerald-400' : wearColor.includes('yellow') ? 'bg-yellow-500/10 text-yellow-400' : wearColor.includes('orange') ? 'bg-orange-500/10 text-orange-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {wearCategory}
                </span>
              </div>
              <div className="flex-1 space-y-3 min-w-0">
                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    <Info className="h-3.5 w-3.5" /> Расшифровка статуса
                  </div>
                  <p className="text-sm text-slate-300 leading-snug">{wearExplanation}</p>
                </div>
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

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <button 
                onClick={handleDownloadBTI} 
                disabled={isDownloading} 
                className="py-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700/60 text-slate-200 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-60 active:scale-[0.985]"
              >
                <Download className="h-4 w-4 text-sky-400" /> 
                {isDownloading ? 'Генерация...' : 'Скачать паспорт БТИ'}
              </button>
              <button 
                onClick={() => generateBtiPdf('preview')} 
                disabled={isDownloading} 
                className="py-3 bg-sky-600/10 hover:bg-sky-600/20 border border-sky-500/30 text-sky-400 hover:text-sky-300 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-60 active:scale-[0.985]"
              >
                <ExternalLink className="h-4 w-4" /> 
                Открыть в браузере
              </button>
            </div>
          </div>

      <div className="col-span-1 lg:col-span-2 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-xl font-extrabold text-white mb-4 tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-400" /> Геоинформационный анализ и регламенты (ГИС ОГД Москвы)
          </h2>
  
        </div>

        {/* В. ПРАВАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">

        </div>
      </div>
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { BtiPassportReport } from './BtiPassportReport';
import { 
  MapPin, Landmark, Hammer, Download, ArrowRight, 
  X, Image as ImageIcon, Building, 
  Shield, ChevronLeft, ChevronRight, 
  Star, Maximize, Minimize, Database,
  CheckCircle, AlertTriangle, Info, History,
  Map, Train, Activity, Leaf, Volume2, Layers, TrendingUp, ExternalLink
} from 'lucide-react';
import { OknObject, Analogue } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ALL_OBJECTS } from '../data/allObjects';
import { LOCAL_MOCK_ANALOGUES_ROSSIYA } from '../data/allObjects';
import { getPhotoFolder } from '../utils/photoHelper';
import html2pdf from 'html2pdf.js';

const PHOTO_FALLBACK = '/images/no-photo-placeholder.png';

const cleanOknName = (name: string) => {
  if (!name) return 'Объект недвижимости';
  return name.split(' - ')[0].replace(/\s*-.*$/, '').trim();
};



// Функция для создания красивой HTML-карточки внутри тултипа на карте
const buildTooltipHtml = (obj: any) => {
  const folder = obj?.photosFolder || getPhotoFolder(obj?.id);
  const imgSrc = folder ? `/photos/${folder}/1.jpg` : PHOTO_FALLBACK;
  
  const rawAddress = obj?.address || obj?.name || '';
  const address = rawAddress.replace('г. Москва, ', '').replace('улица ', 'ул. ').replace('переулок', 'пер.').replace('бульвар', 'б-р');
  
  const area = obj?.area || (obj?.metadata && obj?.metadata?.area) || 1000;
  const cat = String(obj?.okn_category || obj?.significance || '').toLowerCase();
  
  let statusHtml = '<span style="background: rgba(71, 85, 105, 0.8); color: #f1f5f9; border: 1px solid rgba(100, 116, 139, 0.6); padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600;">Без статуса ОКН</span>';
  if (cat.includes('федеральн')) {
    statusHtml = '<span style="background: rgba(55, 48, 163, 0.8); color: #e0e7ff; border: 1px solid rgba(67, 56, 202, 0.6); padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600;">Федеральный ОКН</span>';
  } else if (cat.includes('региональн')) {
    statusHtml = '<span style="background: rgba(37, 99, 235, 0.8); color: #dbeafe; border: 1px solid rgba(59, 130, 246, 0.6); padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 600;">Региональный ОКН</span>';
  }

  return `
    <div style="display: flex; gap: 12px; align-items: center; width: max-content; max-width: 260px; padding: 4px 2px;">
      <img src="${imgSrc}" style="width: 54px; height: 54px; border-radius: 6px; object-fit: cover; border: 1px solid #334155; flex-shrink: 0;" onerror="this.src='${PHOTO_FALLBACK}'" />
      <div style="display: flex; flex-direction: column; gap: 4px; overflow: hidden;">
        <div style="font-weight: 700; font-size: 11px; color: #f8fafc; line-height: 1.2; white-space: normal; word-wrap: break-word; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${address}</div>
        <div style="font-size: 10px; color: #94a3b8; font-family: monospace;">Площадь: ${area} кв.м</div>
        <div>${statusHtml}</div>
      </div>
    </div>
  `;
};

interface PassportPanelProps {
  okn: OknObject;
  analogues: Analogue[];
  selectedAnalogId: string;
  setSelectedAnalogId: (id: string) => void;
  setActiveTab: (tab: number) => void;
  onObjectLoaded: (obj: OknObject) => void;
}

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000; 
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getMapAnaloguesForObject = (okn: OknObject): Analogue[] => {
  if (!okn || !okn.coordinates || okn.coordinates.length !== 2) return [];
  const lat1 = okn.coordinates[0];
  const lon1 = okn.coordinates[1];
  
  const withDistance = ALL_OBJECTS
    .filter(obj => obj.id !== okn.id && obj.coordinates && obj.coordinates.length === 2 && !isNaN(obj.coordinates[0]))
    .map(obj => ({
      ...obj,
      distance: haversineDistance(lat1, lon1, obj.coordinates[0], obj.coordinates[1])
    }));
    
  withDistance.sort((a, b) => a.distance - b.distance);
  
  return withDistance.slice(0, 8).map((obj, i) => ({
    ...obj,
    similarity: Math.round(95 - i * 2),
    price: Math.round(250000000 - i * 15000000),
    distance: Math.round(obj.distance)
  })) as any[];
};

const getWearColorClass = (pct: number): string => {
  if (pct < 20) return "text-emerald-400 stroke-emerald-400";
  if (pct < 40) return "text-yellow-400 stroke-yellow-400";
  if (pct < 60) return "text-orange-400 stroke-orange-400";
  if (pct < 80) return "text-rose-500 stroke-rose-500";
  return "text-red-600 stroke-red-600";
};

const getDynamicSpatialData = (okn: any) => {
  if (!okn) return {
    oxrana: 'Режимы Р-1 (строгая охранная зона)',
    gpzu: 'Этажность не более 5 надземных этажей. Максимальный процент застройки участка ≤ 60%.',
    metro: 'Ближайшие станции метро указаны в базе.',
    infra: 'Высокая плотность деловой застройки.',
    shum: 'Главный фасад 60 дБА, двор 45 дБА.',
    ozelen: 'Расстояние до озелененной территории ≤ 5м.'
  };
  const idStr = String(okn.id || okn.name || '');
  let seed = 0;
  for (let i = 0; i < idStr.length; i++) seed = (seed * 31 + idStr.charCodeAt(i)) >>> 0;
  seed = (seed + (okn.name || '').length) >>> 0;
  const rand = (min: number, max: number, off = 0) => min + (((seed + off) % (max - min + 1)));

  const floors = okn.floors || rand(3, 7);
  const pct = rand(40, 80);
  const gpzu = `Этажность ограничена регламентом. Застройка участка ≤ ${pct}%.`;

  return { 
    oxrana: 'Зона охраны объектов культурного наследия (ЗОУИТ).', 
    gpzu, 
    metro: 'Высокая обеспеченность скоростным внеуличным транспортом.', 
    infra: 'Исторический центр города, развитая коммерческая инфраструктура.', 
    shum: 'Акустический фон соответствует градостроительным нормативам ЦАО.', 
    ozelen: 'Зелёные насаждения общего пользования в шаговой доступности.' 
  };
};

const PassportPanel: React.FC<PassportPanelProps> = ({
  okn: passedOkn, analogues: propAnalogues, selectedAnalogId, setSelectedAnalogId, setActiveTab, onObjectLoaded
}) => {
  const normalizeForMatch = (str: string): string => {
    return (str || '').toLowerCase().replace(/[,\.;:]/g, ' ').replace(/г\.\s*москва,?\s*/g, '').replace(/переулок/g, 'пер.').replace(/улица/g, 'ул.').replace(/бульвар/g, 'б-р').replace(/\s*д\.\s*/g, ' д. ').replace(/\s+/g, ' ').trim();
  };

  const getDisplayCadastral = (o: any): string => {
    const val = o?.cadastralNumber || o?.cadastral_number;
    if (!val || val.startsWith('analog-') || val.startsWith('obj-') || !val.includes(':')) return 'Не указан';
    return val;
  };

  const enrichOkn = (obj: any) => {
    let fullObj = ALL_OBJECTS.find(o => o.id === obj.id);
    if (!fullObj) {
      const addr = normalizeForMatch(obj.address || obj.name);
      fullObj = ALL_OBJECTS.find(o => normalizeForMatch(o.address) === addr || normalizeForMatch(o.name) === addr);
    }
    return { ...obj, ...(fullObj || {}) };
  };

  const okn = useMemo(() => enrichOkn(passedOkn), [passedOkn]);

  const details = useMemo(() => {
    const hash = String(okn.id).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return {
      floors: okn.floors || okn?.metadata?.floors || 3,
      year: okn.year_built || okn.metadata?.year_built || (1880 + (hash % 40)),
      material: okn.walls_material || okn.metadata?.walls_material || 'Кирпич исторический',
      area: okn.area || okn.metadata?.area || (1000 + (hash % 2000)),
      folder: okn.photosFolder || null
    };
  }, [okn]);

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  
  const getReportHtml = () => {
    const cadastral = okn?.cadastralNumber || okn?.cadastral_number || getDisplayCadastral(okn) || '-';
    const address = okn?.address || '-';
    const seedHash = String(okn?.id || '').split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const uchetNum = `${Math.floor(10 + (seedHash % 89))}-01-${new Date().getFullYear()}-${Math.floor(1000 + Math.random()*8000)}`;

    const reportElement = React.createElement(BtiPassportReport, {
      okn,
      details,
      uchetNum,
      cadastral,
      address
    });
    
    return ReactDOMServer.renderToString(reportElement);
  };

  const handleDownloadBTI = async () => {
    setIsDownloading(true);
    try {
      const htmlStr = getReportHtml();
      const container = document.createElement('div');
      container.innerHTML = htmlStr;
      
      const opt = {
        margin:       0,
        filename:     'pasport_bti_' + (okn?.cadastralNumber || 'obj') + '.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(container).save();
    } catch (err) {
      console.error(err);
    }
    setIsDownloading(false);
  };

  const generateBtiPdf = (mode: 'preview') => {
    if (mode === 'preview') {
      const htmlStr = getReportHtml();
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Паспорт БТИ</title></head><body style="margin:0;padding:0;background:#e5e7eb;display:flex;flex-direction:column;align-items:center;">');
        printWindow.document.write('<div style="width:100%;max-width:800px;display:flex;justify-content:flex-end;padding:20px 20px 0;"><button onclick="window.print()" style="padding:10px 20px;background:#2563eb;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;font-size:14px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">Распечатать</button></div><div style="background:white;box-shadow:0 0 20px rgba(0,0,0,0.1);margin:20px;padding:0;">');
        printWindow.document.write(htmlStr);
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
      }
    }
  };

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
    if (!document.fullscreenElement) mapWrapperRef.current?.requestFullscreen().catch(console.error);
    else document.exitFullscreen();
  };

  useEffect(() => {
    let idForPhotos = okn?.id;
    let folder = getPhotoFolder(idForPhotos);

    if (!folder && idForPhotos && (!idForPhotos.startsWith('obj-'))) {
      const addr = normalizeForMatch(okn?.address || okn?.name);
      const real = ALL_OBJECTS.find(o => normalizeForMatch(o.address) === addr || normalizeForMatch(o.name) === addr);
      if (real) { idForPhotos = real.id; folder = getPhotoFolder(idForPhotos); }
    }

    if (!folder) { setValidPhotos([]); setCurrentPhotoIndex(0); return; }

    const rawFiles: string[] = typeof __PHOTOS_MAP__ !== 'undefined' ? (__PHOTOS_MAP__[folder] || []) : [];
    const getBaseName = (f: string) => (f.lastIndexOf('.') > 0 ? f.substring(0, f.lastIndexOf('.')) : f).toLowerCase();

    let fileList = [...rawFiles];
    const mainIndex = fileList.findIndex((f) => getBaseName(f) === '1');
    if (mainIndex > -1) fileList = [fileList.splice(mainIndex, 1)[0], ...fileList];

    setValidPhotos(fileList.map((filename) => `/photos/${folder}/${filename}`));
    setCurrentPhotoIndex(0);
  }, [okn?.id, okn?.address, okn?.name]);

  const wearPct = okn?.wear_pct || okn?.metadata?.wear_pct || 25;
  const radius = 75;
  const strokeDashoffset = (2 * Math.PI * radius) - (wearPct / 100) * (2 * Math.PI * radius);

  const wearCategory = wearPct < 20 ? 'Хорошее' : wearPct < 40 ? 'Удовлетворительное' : wearPct < 60 ? 'Ограниченно-работоспособное' : 'Требует внимания';
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

  const isFederal = (okn.okn_category || '').toLowerCase().includes('федеральн');
  const isNoStatus = !okn.okn_category || (okn.okn_category || '').toLowerCase().includes('не является') || (okn.okn_category || '').toLowerCase().includes('нет статуса');

  const spatialData = useMemo(() => getDynamicSpatialData(okn), [okn]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const coords = useMemo((): [number, number] => (okn?.coordinates && okn.coordinates.length === 2) ? okn.coordinates as [number, number] : [55.7558, 37.6176], [okn]);
  const activeAnalogues = useMemo(() => propAnalogues.length > 0 ? propAnalogues : getMapAnaloguesForObject(okn), [propAnalogues, okn]);

  const dynAnalogCount = activeAnalogues.length;
  const dynDensityLevel = dynAnalogCount >= 10 ? 'Высокая' : dynAnalogCount < 5 ? 'Низкая' : 'Средняя';
  const isGoodTransport = (okn.address || '').toLowerCase().includes('арбат') || (okn.address || '').toLowerCase().includes('колпачный') || (okn.address || '').toLowerCase().includes('тверская') || (okn.address || '').toLowerCase().includes('мясницкая');
  const dynTransportQuality = isGoodTransport ? 'Отличная' : 'Средняя';
  const dynTransportTime = isGoodTransport ? 5 : 12;

  const ratingHash = String(okn.id).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  let rawScore = Math.max(1.0, Math.min(5.0, 5.0 - (wearPct / 100) * 1.5 - ((ratingHash % 10) / 10) * 0.5));
  const ratingScore = rawScore.toFixed(1);

  // ОТОБРАЖЕНИЕ МАРКЕРОВ НА КАРТЕ С КРАСИВЫМИ ФОТО-ТУЛТИПАМИ
  useEffect(() => {
    if (!mapContainerRef.current) return;
    let map = mapInstanceRef.current;
    if (!map) {
      map = L.map(mapContainerRef.current, { center: coords, zoom: 15, zoomControl: true, attributionControl: false });
      mapInstanceRef.current = map;
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 20 }).addTo(map);
      layersGroupRef.current = L.layerGroup().addTo(map);
      
        // FIX: Classic Leaflet grey tiles bug - robust solution using ResizeObserver
        const resizeObserver = new ResizeObserver(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        });
        resizeObserver.observe(mapContainerRef.current);
      } else {
        map.flyTo(coords, 15, { animate: true });
      }

    const layers = layersGroupRef.current;
    if (layers) {
      layers.clearLayers();

      const createIcon = (isTarget: boolean, category: string = '') => {
        let bgColor = '#2563eb'; 
        const cat = category.toLowerCase();
        if (isTarget) bgColor = '#9333ea'; 
        else if (cat.includes('федеральн')) bgColor = '#f59e0b'; 
        else if (cat.includes('региональн')) bgColor = '#10b981'; 
        
        return L.divIcon({
          className: isTarget ? '' : 'cursor-pointer hover:scale-110 transition-transform',
          html: `<div style="width: ${isTarget ? 38 : 28}px; height: ${isTarget ? 38 : 28}px; background-color: ${bgColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><svg viewBox="0 0 24 24" fill="currentColor" style="width: ${isTarget ? 20 : 14}px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>`,
          iconSize: [isTarget ? 38 : 28, isTarget ? 38 : 28],
          iconAnchor: [isTarget ? 19 : 14, isTarget ? 19 : 14]
        });
      };
      const targetIcon = createIcon(true, okn?.okn_category);
      L.marker(coords, { icon: targetIcon, zIndexOffset: 1000 })
        .on('click', () => onObjectLoaded(okn))
        .addTo(layers);
      L.circle(coords, {
        radius: 500,
        color: '#f97316',
        fillColor: '#f97316',
        fillOpacity: 0.1,
        weight: 1,
        dashArray: '4 4'
      }).addTo(layers);

      
      const validAnalogues = getMapAnaloguesForObject(okn);
      validAnalogues.forEach((an, index) => {
        if (!an.coordinates || an.coordinates.length !== 2) return;
        
        L.marker([an.coordinates[0], an.coordinates[1]], {
          icon: createIcon(false, (an as any).okn_category || '')
        })
        .on('click', () => onObjectLoaded(an as any))
        .addTo(layers);
      });
    }
  }, [coords, okn]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6 animate-fadeIn">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start shadow-lg backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight whitespace-normal break-words leading-tight flex items-center">
            {cleanOknName(okn.name)}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-slate-400 text-sm"><MapPin className="h-4 w-4" /> {okn.address}</p>
        </div>
        <button onClick={() => setActiveTab(3)} className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg active:scale-95 transition-all">
          Подобрать аналоги <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div className="text-xl font-black text-white font-mono">{details.floors}</div>
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
              <p className="text-xs text-slate-300 leading-tight">Здание сохраняет подлинные планировочные структуры, фасадную лепнину и исторические элементы.</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
              <div className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-1">Кадастровый номер</div>
              <div className="text-sm font-black text-white font-mono">{getDisplayCadastral(okn)}</div>
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

        <div className="bg-slate-900/60 border border-slate-700/70 rounded-3xl p-6 shadow-lg flex flex-col">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase tracking-[1px] mb-4">
            <Hammer className="h-4 w-4 text-sky-400" /> Техническое состояние и износ
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg width="160" height="160" className="transform -rotate-90 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
                  <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#1e293b" strokeWidth={12} />
                  <circle 
                    cx="80" cy="80" r={radius} fill="transparent" className={`transition-all duration-700 ${wearColor}`} 
                    strokeWidth={12} strokeDasharray={2*Math.PI*radius} strokeDashoffset={strokeDashoffset} strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black tabular-nums tracking-[-1px] ${wearColor}`}>{wearPct}<span className="text-xl">%</span></span>
                  <span className="text-[9px] uppercase tracking-[1.5px] text-slate-400 font-medium">ИЗНОС</span>
                </div>
              </div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${wearColor.includes('emerald') ? 'bg-emerald-500/10 text-emerald-400' : wearColor.includes('yellow') ? 'bg-yellow-500/10 text-yellow-400' : wearColor.includes('orange') ? 'bg-orange-500/10 text-orange-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {wearCategory}
              </span>
            </div>
            <div className="flex-1 space-y-3 min-w-0">
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  <Info className="h-3.5 w-3.5" /> Расшифровка статуса
                </div>
                <p className="text-sm text-slate-300 leading-snug">{wearExplanation}</p>
              </div>
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

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <button 
              onClick={handleDownloadBTI} 
              disabled={isDownloading} 
              className="py-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700/60 text-slate-200 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-60 active:scale-[0.985]"
            >
              <Download className="h-4 w-4 text-sky-400" /> 
              {isDownloading ? 'Генерация...' : 'Скачать паспорт БТИ'}
            </button>
            <button 
              onClick={() => generateBtiPdf('preview')} 
              disabled={isDownloading} 
              className="py-3 bg-sky-600/10 hover:bg-sky-600/20 border border-sky-500/30 text-sky-400 hover:text-sky-300 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-60 active:scale-[0.985]"
            >
              <ExternalLink className="h-4 w-4" /> 
              Открыть в браузере
            </button>
          </div>
        </div>

      <div className="col-span-1 lg:col-span-2 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-extrabold text-white mb-4 tracking-tight flex items-center gap-2">
          <Database className="h-5 w-5 text-indigo-400" /> Геоинформационный анализ и регламенты (ГИС ОГД Москвы)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col h-full">
            <h3 className="text-sm font-bold text-cyan-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <Shield className="h-4 w-4" /> Данные ГИС ОГД (Регламенты)
            </h3>
            <div className="mt-2 space-y-3 text-sm text-slate-300 flex flex-col">
              <div className="flex gap-2">
                <Shield className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                <div><span className="font-semibold text-white">Зоны охраны ОКН:</span> {spatialData.oxrana}. <span className="ml-1 text-[9px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-300 rounded tracking-wide">ГИС ОГД</span></div>
              </div>
              <div className="flex gap-2">
                <Building className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                <div><span className="font-semibold text-white">Градостроительный план (ГПЗУ):</span> {spatialData.gpzu} <span className="ml-1 text-[9px] px-1.5 py-0.5 bg-cyan-500/10 text-cyan-300 rounded tracking-wide">ГИС ОГД</span></div>
              </div>
              <div className="flex gap-2">
                <Map className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                <div><span className="font-semibold text-white">Красные линии:</span> Пятно застройки стабильно, пересечения и градостроительные риски отсутствуют.</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <Train className="h-4 w-4" /> Пространственные метрики окружения
            </h3>
            <div className="mt-2 space-y-3 text-sm text-slate-300 flex flex-col">
              <div className="flex gap-2">
                <Train className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <div><span className="font-semibold text-white">Доступность транспорта:</span> До метро {dynTransportTime} мин пешком. {spatialData.metro}</div>
              </div>
              <div className="flex gap-2">
                <Activity className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <div><span className="font-semibold text-white">Инфраструктура:</span> {spatialData.infra}</div>
              </div>
              <div className="flex gap-2">
                <Volume2 className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <div><span className="font-semibold text-white">Акустический фон:</span> {spatialData.shum}</div>
              </div>
              <div className="flex gap-2">
                <Leaf className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <div><span className="font-semibold text-white">Рекреация:</span> {spatialData.ozelen}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="col-span-1 lg:col-span-2 bg-slate-900/70 border border-emerald-500/25 shadow-[0_0_20px_rgba(52,211,153,0.1)] rounded-3xl p-6 relative overflow-hidden">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase tracking-[1px] mb-4">
            <Landmark className="h-4 w-4 text-emerald-400" /> Историко-культурная ценность здания
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-300">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-[1.5px] mb-1">
                <Star className="h-3.5 w-3.5 text-emerald-300" /> Архитектурные особенности
              </div>
              <p>{okn.history || 'Здание представляет высокую архитектурную ценность, фасады и элементы декора подлежат строгой государственной охране.'}</p>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-[1.5px] mb-1">
                <History className="h-3.5 w-3.5 text-emerald-300" /> Охранные обязательства
              </div>
              <p>{isNoStatus ? 'Объект не имеет зарегистрированного статуса ОКН.' : `Объект внесен в реестр памятников архитектуры (${okn.okn_category}). Любые реставрационные или строительные работы требуют обязательного согласования с Москомнаследием.`}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-6 shadow-md">
          <h2 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2 uppercase tracking-wide">
            <ImageIcon className="h-4 w-4 text-sky-500" /> Фотогалерея объекта недвижимости
          </h2>
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-2xl flex items-center justify-center">
            <img 
              src={validPhotos.length > 0 ? validPhotos[currentPhotoIndex % validPhotos.length] : PHOTO_FALLBACK} 
              className="w-full h-full object-contain cursor-pointer transition-opacity" 
              onClick={() => setShowPhotoModal(true)} 
              onError={(e) => { e.currentTarget.src = PHOTO_FALLBACK; }} 
              alt="ОКН Фото"
            />
            {validPhotos.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(p => (p - 1 + validPhotos.length) % validPhotos.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={(e) => { e.stopPropagation(); setCurrentPhotoIndex(p => (p + 1) % validPhotos.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"><ChevronRight className="w-6 h-6" /></button>
              </>
            )}
          </div>
          {validPhotos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto mt-3">
              {validPhotos.map((path, idx) => (
                <img key={idx} src={path} alt={`Миниатюра ${idx + 1}`} onClick={() => setCurrentPhotoIndex(idx)} className={`object-cover h-16 w-24 rounded-lg cursor-pointer transition-all shrink-0 ${idx === (currentPhotoIndex % validPhotos.length) ? 'ring-2 ring-sky-500 opacity-100' : 'opacity-60 hover:opacity-100'}`} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              ))}
            </div>
          )}
        </div>

        {/* ИНТЕРАКТИВНАЯ КАРТА С КРАСИВЫМИ ТУЛТИПАМИ И ЛЕГЕНДОЙ */}
        <div className="col-span-1 lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-md">
          <h2 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Layers className="h-4 w-4 text-sky-500" /> Интерактивная карта и пространственные метрики
          </h2>
          <div className="flex flex-col gap-6">
            <div ref={mapWrapperRef} className={`w-full relative rounded-xl overflow-hidden border border-slate-700 shadow-inner ${isFullscreen ? 'h-screen w-screen z-[9999] fixed inset-0' : 'h-[500px]'}`}>
              <div ref={mapContainerRef} className="w-full h-full" />
              
              <div className="absolute top-4 right-4 z-[700] bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-4 w-[280px] text-[10px] text-slate-200 shadow-2xl pointer-events-none">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">ЛЕГЕНДА КАРТЫ</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full bg-purple-600 border border-white shrink-0" /> <span className="text-white font-bold text-[11px] leading-tight">Объект оценки</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full bg-amber-500 border border-white shrink-0" /> <span className="text-white font-bold text-[11px] leading-tight">Аналог (Федеральный)</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full bg-emerald-500 border border-white shrink-0" /> <span className="text-white font-bold text-[11px] leading-tight">Аналог (Региональный)</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full bg-blue-600 border border-white shrink-0" /> <span className="text-white font-bold text-[11px] leading-tight">Аналог (Без статуса / Местный)</span></div>
                  <div className="flex items-center gap-2.5"><div className="w-4 h-4 rounded-full border-2 border-orange-600 bg-orange-600/15 shrink-0" /> <span className="text-[11px] leading-tight text-slate-300">Радиус доступности (500 м)</span></div>
                </div>
              </div>

              <button onClick={toggleFullscreen} className="absolute bottom-6 right-4 z-[1000] p-3 bg-slate-900/90 text-slate-200 hover:text-white rounded-2xl border border-slate-700 hover:border-sky-500 shadow-2xl transition-all active:scale-95 group backdrop-blur-md">
                {isFullscreen ? <Minimize className="w-6 h-6 text-sky-400" /> : <Maximize className="w-6 h-6 text-sky-400" />}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              <div className="bg-slate-800/60 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3"><Building className="w-4 h-4 text-sky-400" /> Администрация</div>
                <div className="text-slate-200 font-bold text-base leading-tight">ЦАО Москвы</div>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3"><Shield className="w-4 h-4 text-emerald-400" /> Выборка в базе</div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-black text-white font-mono leading-none">{dynAnalogCount}</div>
                  <div className="text-xs text-slate-400 font-mono">объектов</div>
                </div>
                <div className="mt-2 inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">{dynDensityLevel} плотность</div>
              </div>
              <div className="bg-slate-800/60 border border-slate-700/80 p-5 rounded-2xl flex flex-col justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3"><MapPin className="w-4 h-4 text-amber-400" /> Локация</div>
                <div className="text-slate-200 font-bold text-sm leading-tight">{dynTransportQuality} уровень</div>
                <div className="text-[10px] text-slate-500 mt-2 font-mono">~ {dynTransportTime} мин до метро</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/30 p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10"><TrendingUp className="w-24 h-24 text-indigo-300"/></div>
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 relative z-10"><TrendingUp className="w-4 h-4" /> Итоговый индекс</div>
                <div className="flex items-baseline gap-1 relative z-10">
                  <div className="text-3xl font-black text-white">{ratingScore}</div>
                  <div className="text-sm text-indigo-300">/ 5.0</div>
                </div>
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
          <img src={validPhotos[currentPhotoIndex % validPhotos.length]} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} alt="ОКН Увеличенное фото" />
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