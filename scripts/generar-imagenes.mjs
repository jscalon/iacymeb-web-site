// Genera favicon, apple-touch-icon y la imagen para redes sociales (OG) a partir de la marca provisional.
// Uso: pnpm generar:imagenes  (volver a ejecutar cuando cambien el logo o los colores)
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import site from '../src/data/site.json' with { type: 'json' };

const AZUL = '#1d3f6d';
const AZUL_OSCURO = '#10223a';
const DORADO = '#dfa935';

const marca = (tamano, radio = 12) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${tamano}" height="${tamano}">
  <rect width="48" height="48" rx="${radio}" fill="${AZUL}"/>
  <path d="M22 8h4v8h7v4h-7v12h-4V20h-7v-4h7z" fill="${DORADO}"/>
  <path d="M10 34c4.5-1.8 9.2-1.6 14 1 4.8-2.6 9.5-2.8 14-1v4c-4.5-1.8-9.2-1.6-14 1-4.8-2.6-9.5-2.8-14-1z" fill="#fff"/>
</svg>`;

const escapar = (texto) => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${AZUL}"/>
      <stop offset="1" stop-color="${AZUL_OSCURO}"/>
    </linearGradient>
    <radialGradient id="brillo">
      <stop offset="0" stop-color="${DORADO}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${DORADO}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M19 12h2v6h6v2h-6v8h-2v-8h-6v-2h6z" fill="#fff" fill-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#p)"/>
  <circle cx="1100" cy="560" r="420" fill="url(#brillo)"/>
  <g transform="translate(90 110) scale(2.6)">${marca(48).replace(/<\/?svg[^>]*>/g, '')}</g>
  <text x="90" y="330" font-family="Georgia, serif" font-size="30" fill="${DORADO}" letter-spacing="4">
    IGLESIA ${escapar(site.denominacion.toUpperCase())}
  </text>
  <text x="90" y="420" font-family="Georgia, serif" font-size="84" font-weight="bold" fill="#fff">
    ${escapar(site.nombreCorto)}
  </text>
  <text x="90" y="490" font-family="Georgia, serif" font-size="34" font-style="italic" fill="#d6e4f5">
    ${escapar(site.lema)}
  </text>
</svg>`;

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

await writeFile('public/favicon.svg', marca(48).trim() + '\n');
await writeFile('public/favicon.ico', pngAIco(await sharp(Buffer.from(marca(32))).png().toBuffer()));
await sharp(Buffer.from(marca(180, 0))).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-default.png');
console.log('Imágenes generadas en public/');
