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
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
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