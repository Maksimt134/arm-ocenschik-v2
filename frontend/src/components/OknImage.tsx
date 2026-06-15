import React from 'react';
import { getPhotoFolder, PHOTO_FALLBACK } from '../utils/photoHelper';

interface OknImageProps {
  photosFolder?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

// Helper to resolve the actual cover image (prefers 1.* cover from real file list via injected map).
// This replaces old hardcoded /1.jpg which caused 404s (and grey placeholders) for .jfif / .png covers etc.
const getCoverImageSrc = (photosFolder?: string): string => {
  if (!photosFolder) return PHOTO_FALLBACK;

  // Use the build-time injected __PHOTOS_MAP__ (same as PassportPanel gallery) for real filenames.
  // @ts-ignore - injected by vite.config.ts
  const files: string[] = (typeof __PHOTOS_MAP__ !== 'undefined' && __PHOTOS_MAP__ ? __PHOTOS_MAP__[photosFolder] : null) || [];

  if (files && files.length > 0) {
    // Prefer the cover file whose basename is exactly "1" (1.jpg, 1.jfif, 1.png etc.)
    const getBaseName = (filename: string): string => {
      const dotIdx = filename.lastIndexOf('.');
      return (dotIdx > 0 ? filename.substring(0, dotIdx) : filename).toLowerCase();
    };
    const mainIndex = files.findIndex((f) => getBaseName(f) === '1');
    const chosen = mainIndex > -1 ? files[mainIndex] : files[0];
    return `/photos/${photosFolder}/${chosen}`;
  }

  // Fallback (should rarely hit after cover fixes + manifest)
  return `/photos/${photosFolder}/1.jpg`;
};

const OknImage: React.FC<OknImageProps> = ({
  photosFolder,
  alt,
  className = '',
}) => {
  const imgSrc = getCoverImageSrc(photosFolder);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (!target.src.includes('no-photo-placeholder.png')) {
          target.src = '/images/no-photo-placeholder.png';
        }
      }}
    />
  );
};

export default OknImage;
