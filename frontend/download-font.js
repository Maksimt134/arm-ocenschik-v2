import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'fonts');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const filePath = path.join(dir, 'DejaVuSans.ttf');
const file = fs.createWriteStream(filePath);

// Use a reliable public CDN for DejaVuSans.ttf (the one in the example 404s)
const fontUrl = 'https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.0/ttf/DejaVuSans.ttf';

https.get(fontUrl, function(response) {
    if (response.statusCode !== 200) {
        console.error('Failed to download font, status:', response.statusCode);
        file.close();
        return;
    }
    response.pipe(file);
    file.on('finish', function() {
        file.close();
        console.log('Шрифт успешно скачан в public/fonts/DejaVuSans.ttf');
    });
}).on('error', (err) => {
    console.error('Download error:', err.message);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
});
