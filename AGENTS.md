## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Git Workflow

- After every set of changes, **stage all modified/added/deleted files** (`git add`).
- **Do not run `git commit` or `git push` yourself.** Instead, provide a clear commit message in your response so the user can commit and push manually.
- Keep this `AGENTS.md` file updated whenever project state, rules, or pending tasks change.

## Project Context & Pending Content

- **Visual identity (Completed):**
  - Primary color (Vinotinto): `#741102` (`--color-brand-*`)
  - Secondary colors: `#042d29` (Verde azulado, `--color-secondary-*`) and `#d4c9b5` (Beige, `--color-accent-*`)
  - Typography: `Poppins` (loaded via Fontsource) and `Authenia` (`--font-script`, awaiting local `.ttf`/`.otf` file if needed)
  - Official logo: `src/assets/logo.png` (derived assets generated via `pnpm generar:imagenes`)
- **Still pending from the church secretary:**
  1. **Quiénes somos:** misión, visión, historia y versículo lema (`src/content/nosotros/nosotros.md`).
  2. **Junta administrativa:** nombres y cargos (`src/content/equipo/`).
  3. **Equipo pastoral:** reseñas breves y fotos (`src/content/equipo/`).
  4. **Ministerios:** lista definitiva, descripciones, fotos y horario de niños (`src/content/ministerios/`, `src/content/reuniones/`).
  5. **Academia Bíblica:** texto de presentación, autores, descripciones, enlaces y portadas de libros (`src/data/site.json`, `src/content/libros/`).
  6. **Donaciones:** cuentas bancarias, pago móvil y otros medios (`src/data/site.json`).
  7. **Obra misionera en Morón:** fotos y confirmar si existen otras obras misioneras (`src/content/misiones/`). *(Reseña y sectores ya integrados).*
  8. **Iglesias hijas (Yagua, Coro, Tinaquillo):** nombre oficial, dirección/mapa, pastores, horarios, contacto/redes, historia y foto (`src/content/iglesias-hijas/`).
  9. **Imagen de la iglesia:** foto de portada (congregación o templo) y archivo de fuente `Authenia` si está disponible.
- **Technical pending items:**
  - Configure GitHub OAuth in Netlify for `/admin` (Sveltia CMS) and grant repo access to the secretary.
  - Custom domain (update `SITE_URL` in `astro.config.mjs` and `site_url` in `public/admin/config.yml`).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
