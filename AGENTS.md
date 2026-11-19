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

- **Completed sections:**
  - **Visual identity:**
    - Primary color (Vinotinto): `#741102` (`--color-brand-*`)
    - Secondary colors: `#042d29` (Verde azulado, `--color-secondary-*`) and `#d4c9b5` (Beige, `--color-accent-*`)
    - Typography: `Poppins` (loaded via Fontsource) and `Authenia` (`--font-script`, awaiting local `.ttf`/`.otf` file if needed)
    - Official logo: `src/assets/logo.png` (derived assets generated via `pnpm generar:imagenes`)
    - Temple cover photo: `src/assets/templo.jpg` (used in the home hero and `/nosotros` history section)
  - **Quiénes somos (`src/content/nosotros/nosotros.md`):** misión, visión, reseña histórica (1981–2026), nuestra identidad (Evangelio cuádruple + misión) y declaración de fe (11 artículos).
  - **Junta administrativa (`src/content/equipo/`):** Hno. Ennis Chacín (Tesorero), Hno. Jesús Pernalete (Secretario), Hno. Wilmer Zreik (Vocero), Hna. Esther Romero (Vocera), Hna. Elizabeth Ochoa (Vocera) y Hna. Yoibel Godoy (Vocera). *(Nota: cambio de junta a comienzos de 2027).*
- **Still pending from the church secretary:**
  1. **Equipo pastoral:** fotos (y reseñas breves opcionales) de Pr. Miguel Damario (Pastor titular) y Pr. Gustavo Angulo (Pastor auxiliar) (`src/content/equipo/`).
  2. **Ministerios:** lista definitiva, descripciones, fotos y horario de niños (`src/content/ministerios/`, `src/content/reuniones/`).
  3. **Academia Bíblica:** texto de presentación, autores, descripciones, enlaces y portadas de libros (`src/data/site.json`, `src/content/libros/`).
  4. **Donaciones:** cuentas bancarias, pago móvil y otros medios (`src/data/site.json`).
  5. **Obra misionera en Morón:** fotos y confirmar si existen otras obras misioneras (`src/content/misiones/`). *(Reseña y sectores ya integrados).*
  6. **Iglesias hijas (Yagua, Coro, Tinaquillo):** nombre oficial, dirección/mapa, pastores, horarios, contacto/redes, historia y foto (`src/content/iglesias-hijas/`).
  7. **Tipografía opcional:** archivo de fuente `Authenia` (`.ttf` o `.otf`) si está disponible.
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
