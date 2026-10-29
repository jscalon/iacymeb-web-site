// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// TODO: reemplazar por el dominio definitivo cuando se registre.
const SITE_URL = 'https://iacymencuentrobiblico.netlify.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Netlify sirve /pagina desde pagina.html, así las URLs quedan sin barra final.
  trailingSlash: 'never',
  build: {
    format: 'file',
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Poppins',
      cssVariable: '--font-poppins',
      weights: ['400', '500', '600', '700'],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
