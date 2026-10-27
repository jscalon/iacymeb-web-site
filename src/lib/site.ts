import data from '@/data/site.json';

export const site = data;

const { direccion, mapa, contacto, redes } = data;

export const direccionCompleta = [direccion.calle, direccion.ciudad, direccion.estado, direccion.pais]
  .filter(Boolean)
  .join(', ');

const coordenadas =
  mapa.latitud != null && mapa.longitud != null ? `${mapa.latitud},${mapa.longitud}` : '';

/** Texto que se envía a Google Maps cuando no hay enlace ni coordenadas exactas. */
const consultaMapa = mapa.consulta || coordenadas || `${data.nombre}, ${direccionCompleta}`;

export const enlaceMapa =
  mapa.enlace || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consultaMapa)}`;

export function urlMapaEmbebido(consulta: string = consultaMapa) {
  return `https://www.google.com/maps?q=${encodeURIComponent(consulta)}&output=embed`;
}

export function enlaceMapaDe(consulta: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;
}

/** Ruta limpia de la página (en el build, `Astro.url.pathname` incluye `.html`). */
export function rutaLimpia(url: URL) {
  return url.pathname.replace(/(\/index)?\.html$/, '').replace(/\/$/, '') || '/';
}

export function enlaceWhatsapp(numero: string) {
  return `https://wa.me/${numero.replace(/\D/g, '')}`;
}

export function enlaceTelefono(numero: string) {
  return `tel:${numero.replace(/[^\d+]/g, '')}`;
}

export const redesSociales = [
  { nombre: 'Instagram', url: redes.instagram, icono: 'simple-icons:instagram' },
  { nombre: 'Facebook', url: redes.facebook, icono: 'simple-icons:facebook' },
  { nombre: 'YouTube', url: redes.youtube, icono: 'simple-icons:youtube' },
  { nombre: 'Spotify', url: redes.spotify, icono: 'simple-icons:spotify' },
  {
    nombre: 'WhatsApp',
    url: contacto.whatsapp ? enlaceWhatsapp(contacto.whatsapp) : '',
    icono: 'simple-icons:whatsapp',
  },
].filter((red) => red.url);

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const navegacion: NavItem[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Nosotros',
    href: '/nosotros',
    children: [
      { label: 'Quiénes somos', href: '/nosotros' },
      { label: 'Equipo pastoral', href: '/equipo-pastoral' },
      { label: 'Ministerios', href: '/ministerios' },
    ],
  },
  { label: 'Reuniones', href: '/reuniones' },
  { label: 'Academia', href: '/academia' },
  {
    label: 'Misiones',
    href: '/obra-misionera',
    children: [
      { label: 'Obra misionera', href: '/obra-misionera' },
      { label: 'Iglesias hijas', href: '/iglesias-hijas' },
    ],
  },
  { label: 'Donaciones', href: '/donaciones' },
  { label: 'Contacto', href: '/contacto' },
];
