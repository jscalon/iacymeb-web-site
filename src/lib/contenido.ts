import { getCollection, type CollectionKey } from 'astro:content';

/** Devuelve una colección ordenada por su campo `orden`. */
export async function obtenerOrdenado<C extends Exclude<CollectionKey, 'nosotros'>>(coleccion: C) {
  const entradas = await getCollection(coleccion);
  return entradas.sort((a, b) => a.data.orden - b.data.orden);
}

export async function obtenerNosotros() {
  const [nosotros] = await getCollection('nosotros');
  if (!nosotros) throw new Error('Falta src/content/nosotros/nosotros.md');
  return nosotros;
}
