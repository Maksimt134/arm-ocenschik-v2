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
  'obj-14': 'dom_pertsovoy',
  'obj-15': 'vozdvizhenka_16',
  'obj-16': 'arbat_29',
  'obj-17': 'frolov_2',
  'obj-18': 'hohlovskiy_7',
  'obj-19': 'lubyanskiy_15',
  'obj-20': 'myasnitskaya_7',
  'obj-21': 'nikitskiy_11',
  'obj-23': 'pokrovka_22',
  'obj-24': 'prechistenka_8',
  'obj-25': 'pyatnitskaya_17',
  'obj-26': 'sadovaya_karetnaya_12',
  'obj-27': 'samotechnaya_8',
  'obj-28': 'solyanka_12',
  'obj-29': 'spiridonovka_3_5',
  'obj-30': 'spiridonovka_21',
  'obj-31': 'sretenskiy_2',
  'obj-33': 'tolmachevskiy_4',
  'obj-34': 'tverskaya_15',
  'obj-35': 'yakimanskiy_6',
  'obj-36': 'zabelina_3',
  'obj-38': 'novinskiy_25',
  'obj-39': 'myasnitskaya_42',
  'obj-40': 'igumnova_43',
  'obj-41': 'pashkova_3',
  'obj-42': 'prechistenka_28',
  'obj-43': 'melnikova_10',
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

  if (_manifestCache && _manifestCache[folder]?.length > 0) {
    return ((_manifestCache[folder] || []) as string[]).slice(0, count);
  }

  // Иначе генерируем пути по шаблону
  return Array.from({ length: count }, (_, i) => `/photos/${folder}/${i + 1}.jpg`);
};
