import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PHOTOS_DIR = path.resolve(__dirname, 'public/photos');
const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.jfif'];
const IGNORE_FILES = ['.gitkeep', '.DS_Store', 'Thumbs.db'];

function buildPhotosMap() {
  const map = {};
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.warn('[generate-manifest] public/photos not found');
    return map;
  }
  let entries = [];
  try {
    entries = fs.readdirSync(PHOTOS_DIR, { withFileTypes: true });
  } catch (e) {
    console.warn('[generate-manifest] failed to read public/photos:', e.message);
    return map;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const folderName = entry.name;
    const folderPath = path.join(PHOTOS_DIR, folderName);
    try {
      const files = fs.readdirSync(folderPath).filter((file) => {
        if (IGNORE_FILES.includes(file)) return false;
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_EXTS.includes(ext);
      });
      map[folderName] = files;
    } catch (e) {
      console.warn(`[generate-manifest] failed to read photos subfolder ${folderName}:`, e.message);
      map[folderName] = [];
    }
  }
  return map;
}

const photosMapData = buildPhotosMap();

const manifestPath = path.resolve(__dirname, 'public/photos/manifest.json');
try {
  fs.writeFileSync(manifestPath, JSON.stringify(photosMapData, null, 2), 'utf8');
  console.log(`[generate-manifest] ✓ Updated ${manifestPath}`);
  console.log(`[generate-manifest] Found ${Object.keys(photosMapData).length} object folders.`);
} catch (e) {
  console.error('[generate-manifest] Failed to write manifest:', e.message);
  process.exit(1);
}
