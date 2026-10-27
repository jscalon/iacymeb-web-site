import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** El CMS puede guardar campos vacíos como '' o null; los tratamos como ausentes. */
const vacioAUndefined = (valor: unknown) => (valor === '' || valor === null ? undefined : valor);

const imagenOpcional = ({ image }: SchemaContext) => z.preprocess(vacioAUndefined, image().optional());
const textoOpcional = z.preprocess(vacioAUndefined, z.string().optional());
const urlOpcional = z.preprocess(vacioAUndefined, z.url().optional());

const md = (carpeta: string) => glob({ pattern: '**/*.md', base: `./src/content/${carpeta}` });

const nosotros = defineCollection({
  loader: md('nosotros'),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    mision: z.string(),
    vision: z.string(),
    creencias: z.array(z.object({ titulo: z.string(), texto: z.string() })),
  }),
});

const reuniones = defineCollection({
  loader: md('reuniones'),
  schema: z.object({
    nombre: z.string(),
    dia: z.enum(['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']),
    hora: z.string(),
    descripcion: z.string(),
    frecuencia: textoOpcional,
    destacada: z.boolean().default(false),
    orden: z.number().default(0),
  }),
});

const ministerios = defineCollection({
  loader: md('ministerios'),
  schema: (ctx) =>
    z.object({
      nombre: z.string(),
      descripcion: z.string(),
      imagen: imagenOpcional(ctx),
      orden: z.number().default(0),
    }),
});

const equipo = defineCollection({
  loader: md('equipo'),
  schema: (ctx) =>
    z.object({
      nombre: z.string(),
      cargo: z.string(),
      grupo: z.enum(['pastoral', 'junta']),
      foto: imagenOpcional(ctx),
      orden: z.number().default(0),
    }),
});

const libros = defineCollection({
  loader: md('libros'),
  schema: (ctx) =>
    z.object({
      titulo: z.string(),
      autor: textoOpcional,
      descripcion: textoOpcional,
      portada: imagenOpcional(ctx),
      enlace: urlOpcional,
      orden: z.number().default(0),
    }),
});

const iglesiasHijas = defineCollection({
  loader: md('iglesias-hijas'),
  schema: (ctx) =>
    z.object({
      nombre: z.string(),
      ciudad: z.string(),
      direccion: textoOpcional,
      pastores: z.array(z.string()).default([]),
      foto: imagenOpcional(ctx),
      mapa: urlOpcional,
      telefono: textoOpcional,
      instagram: urlOpcional,
      facebook: urlOpcional,
      reuniones: textoOpcional,
      orden: z.number().default(0),
    }),
});

const misiones = defineCollection({
  loader: md('misiones'),
  schema: (ctx) =>
    z.object({
      titulo: z.string(),
      lugar: z.string(),
      resumen: z.string(),
      imagen: imagenOpcional(ctx),
      orden: z.number().default(0),
    }),
});

export const collections = { nosotros, reuniones, ministerios, equipo, libros, iglesiasHijas, misiones };
