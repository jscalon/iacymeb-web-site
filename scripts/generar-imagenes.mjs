// Genera favicon, apple-touch-icon y la imagen para redes sociales (OG) a partir del logo oficial.
// Uso: pnpm generar:imagenes  (volver a ejecutar cuando cambien el logo o los colores)
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import site from '../src/data/site.json' with { type: 'json' };

const LOGO_PATH = 'src/assets/logo.png';
const VINOTINTO = '#741102';
const VERDE_AZULADO = '#042d29';
const BEIGE = '#d4c9b5';
const PAPEL = '#fbfaf7';

const escapar = (texto) => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// 1. Favicon SVG (con el logo embebido en alta nitidez) y Favicon ICO (32x32)
const png64 = await sharp(LOGO_PATH).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toBuffer();
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <image width="64" height="64" href="data:image/png;base64,${png64.toString('base64')}"/>
</svg>\n`;

/** Empaqueta un PNG de 32×32 dentro de un contenedor .ico (formato admitido por todos los navegadores). */
function pngAIco(png) {
  const cabecera = Buffer.alloc(22);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // tipo: ícono
  cabecera.writeUInt16LE(1, 4); // cantidad de imágenes
  cabecera.writeUInt8(32, 6); // ancho
  cabecera.writeUInt8(32, 7); // alto
  cabecera.writeUInt16LE(1, 10); // planos de color
  cabecera.writeUInt16LE(32, 12); // bits por píxel
  cabecera.writeUInt32LE(png.length, 14);
  cabecera.writeUInt32LE(22, 18); // desplazamiento de los datos
  return Buffer.concat([cabecera, png]);
}

const png32 = await sharp(LOGO_PATH).resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

// 2. Apple Touch Icon (180x180 sobre fondo cálido para que iOS no ponga fondo negro)
const logo152 = await sharp(LOGO_PATH).resize(152, 152, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const appleTouchIcon = await sharp({
  create: { width: 180, height: 180, channels: 4, background: PAPEL },
})
  .composite([{ input: logo152, top: 14, left: 14 }])
  .png({ compressionLevel: 9 })
  .toBuffer();

// 3. Imagen Open Graph (1200x630)
const logoOg = await sharp(LOGO_PATH).resize(130, 130, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const ogFondo = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${VINOTINTO}"/>
      <stop offset="1" stop-color="#480a01"/>
    </linearGradient>
    <radialGradient id="brillo">
      <stop offset="0" stop-color="${VERDE_AZULADO}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${VERDE_AZULADO}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M19 12h2v6h6v2h-6v8h-2v-8h-6v-2h6z" fill="#fff" fill-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#p)"/>
  <circle cx="1100" cy="560" r="460" fill="url(#brillo)"/>
  <circle cx="165" cy="175" r="78" fill="${PAPEL}"/>
  <text x="90" y="335" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600" fill="${BEIGE}" letter-spacing="4">
    IGLESIA ${escapar(site.denominacion.toUpperCase())}
  </text>
  <text x="90" y="425" font-family="Segoe UI, Arial, sans-serif" font-size="80" font-weight="700" fill="#fff">
    ${escapar(site.nombreCorto)}
  </text>
  <text x="90" y="495" font-family="Georgia, serif" font-size="34" font-style="italic" fill="${BEIGE}">
    ${escapar(site.lema)}
  </text>
</svg>`;

await writeFile('public/favicon.svg', faviconSvg);
await writeFile('public/favicon.ico', pngAIco(png32));
await writeFile('public/apple-touch-icon.png', appleTouchIcon);
await sharp(Buffer.from(ogFondo))
  .composite([{ input: logoOg, top: 110, left: 100 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-default.png');

console.log('Imágenes generadas en public/');
