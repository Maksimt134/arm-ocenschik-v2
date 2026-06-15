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
