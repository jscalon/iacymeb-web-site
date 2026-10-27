# Sitio web — Iglesia Alianza Cristiana y Misionera "El Encuentro Bíblico"

Sitio estático hecho con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com), desplegado en Netlify. El contenido se edita desde un panel web ([Sveltia CMS](https://sveltiacms.app)) en `/admin`.

## Desarrollo

Requiere Node 22+ y pnpm.

```sh
pnpm install
pnpm dev                # servidor local en http://localhost:4321
pnpm build              # genera el sitio en dist/
pnpm preview            # sirve dist/ localmente
pnpm check              # verificación de tipos
pnpm generar:imagenes   # regenera favicon, apple-touch-icon y og-default.png
```

## Estructura

| Ruta | Qué contiene |
| --- | --- |
| `src/data/site.json` | Nombre, lema, dirección, mapa, contacto, redes y cuentas para donaciones |
| `src/content/*` | Contenido en Markdown: reuniones, ministerios, equipo, libros, iglesias hijas, misiones y la página "Quiénes somos" |
| `src/content.config.ts` | Esquemas (campos y validación) de cada colección |
| `src/pages/` | Una página por sección del sitio |
| `src/components/` | Componentes reutilizables (cabecera, pie, SEO, tarjetas, mapa…) |
| `src/styles/global.css` | **Colores y tipografía** del sitio (tokens de diseño) |
| `public/admin/` | Panel de administración (Sveltia CMS) |

## Editar contenido

- **Desde el panel:** entrar a `https://<dominio>/admin` e iniciar sesión con GitHub. Cada cambio guardado crea un commit y Netlify vuelve a publicar el sitio en uno o dos minutos.
- **En local:** abrir `http://localhost:4321/admin` en Chrome o Edge y elegir "Work with Local Repository" para editar los archivos de esta carpeta.
- **A mano:** editar los archivos de `src/content/` y `src/data/site.json`.

Las imágenes subidas desde el panel se guardan junto a cada entrada y Astro las optimiza (WebP, varios tamaños, carga diferida). Si una entrada no tiene foto, se muestra un relleno con la marca.

Si se agrega un campo nuevo, hay que añadirlo en `src/content.config.ts` **y** en `public/admin/config.yml`.

## Cambiar la identidad visual

La identidad actual es **provisional**:

1. **Colores:** editar las variables `--color-brand-*` y `--color-accent-*` en `src/styles/global.css`.
2. **Tipografías:** cambiar los nombres en `fonts` de `astro.config.mjs` (Astro las descarga y sirve desde el propio sitio).
3. **Logo:** reemplazar el SVG de `src/components/Logo.astro` y la marca de `scripts/generar-imagenes.mjs`; luego ejecutar `pnpm generar:imagenes`.

## Pendientes (`TODO`)

- Datos reales en `src/data/site.json`: dirección, enlace o coordenadas del mapa, teléfono, WhatsApp, redes y cuentas bancarias.
- Historia real en `src/content/nosotros/nosotros.md` y reseña de Morón en `src/content/misiones/moron.md`.
- Nombres y fotos del equipo pastoral y de la junta, iglesias hijas, horarios reales y portadas de los libros.
- Dominio definitivo: actualizar `SITE_URL` en `astro.config.mjs` y `site_url` en `public/admin/config.yml`.

## Despliegue en Netlify

1. Subir el repositorio a GitHub (el panel espera `JuanGimenez7/iacymeb-web-site`; si cambia, actualizar `repo` en `public/admin/config.yml`).
2. En Netlify: **Add new project → Import from Git** y elegir el repositorio. La configuración se lee de `netlify.toml` (`pnpm build`, carpeta `dist`).
3. **Inicio de sesión del panel (OAuth con GitHub):**
   - En GitHub: *Settings → Developer settings → OAuth Apps → New OAuth App*, con *Authorization callback URL* `https://api.netlify.com/auth/done`. Copiar el Client ID y generar un Client Secret.
   - En Netlify: *Project configuration → Security → OAuth → Install provider → GitHub* y pegar las credenciales.
4. Dar acceso de colaboradora en el repositorio de GitHub a la cuenta de la secretaria.
5. (Opcional) Conectar el dominio personalizado en *Domain management* y actualizar las URLs indicadas arriba.

Alternativa sin OAuth: en el panel, "Sign In with Token" con un token personal de GitHub con permiso de lectura y escritura sobre *Contents*.
