import data from '@/data/site.json';

/** Forma de src/data/site.json; los campos opcionales pueden faltar si el CMS los deja vacíos. */
export type Sitio = {
  nombre: string;
  nombreCorto: string;
  denominacion: string;
  lema: string;
  descripcion: string;
  direccion: {
    calle: string;
    ciudad: string;
    estado?: string;
    pais: string;
    codigoPais: string;
    codigoPostal?: string;
  };
  mapa: { enlace?: string; consulta?: string; latitud?: number | null; longitud?: number | null };
  contacto: { email: string; telefono?: string; whatsapp?: string };
  redes: { instagram?: string; facebook?: string; youtube?: string; spotify?: string };
  academia: { horario?: string; presentacion?: string };
  donaciones: {
    cuentas: { banco: string; titular: string; tipo: string; numero: string; documento: string }[];
    pagoMovil: { banco?: string; telefono?: string; documento?: string };
  };
};

export const site: Sitio = data;

const { direccion, mapa, contacto, redes } = site;

export const direccionCompleta = [direccion.calle, direccion.ciudad, direccion.estado, direccion.pais]
  .filter(Boolean)
  .join(', ');

const coordenadas =
  mapa.latitud != null && mapa.longitud != null ? `${mapa.latitud},${mapa.longitud}` : '';

/** Texto que se envía a Google Maps cuando no hay enlace ni coordenadas exactas. */
const consultaMapa = mapa.consulta || coordenadas || `${site.nombre}, ${direccionCompleta}`;

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
].filter((red): red is typeof red & { url: string } => Boolean(red.url));

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
