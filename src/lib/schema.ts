import { direccionCompleta, enlaceMapa, redesSociales, site } from '@/lib/site';

export type Miga = { label: string; href: string };

/** Datos estructurados schema.org de la iglesia (se usan en la portada y en contacto). */
export function esquemaIglesia(origen: URL) {
  const { direccion, mapa, contacto } = site;
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    '@id': new URL('/#iglesia', origen).href,
    name: site.nombre,
    alternateName: site.nombreCorto,
    description: site.descripcion,
    url: origen.href,
    logo: new URL('/apple-touch-icon.png', origen).href,
    image: new URL('/og-default.png', origen).href,
    email: contacto.email,
    ...(contacto.telefono && { telephone: contacto.telefono }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: direccion.calle,
      addressLocality: direccion.ciudad,
      ...(direccion.estado && { addressRegion: direccion.estado }),
      ...(direccion.codigoPostal && { postalCode: direccion.codigoPostal }),
      addressCountry: direccion.codigoPais,
    },
    ...(mapa.latitud != null &&
      mapa.longitud != null && {
        geo: { '@type': 'GeoCoordinates', latitude: mapa.latitud, longitude: mapa.longitud },
      }),
    hasMap: enlaceMapa,
    sameAs: redesSociales.filter((red) => red.nombre !== 'WhatsApp').map((red) => red.url),
    parentOrganization: { '@type': 'Organization', name: site.denominacion },
    keywords: `iglesia cristiana, iglesia evangélica, ${site.denominacion}, ${direccionCompleta}`,
  };
}

export function esquemaMigas(migas: Miga[], origen: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Inicio', href: '/' }, ...migas].map((miga, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: miga.label,
      item: new URL(miga.href, origen).href,
    })),
  };
}
