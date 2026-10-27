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
      name: 'Lora',
      cssVariable: '--font-lora',
      weights: ['400 700'],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 700'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
