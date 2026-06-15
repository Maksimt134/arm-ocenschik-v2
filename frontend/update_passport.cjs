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
