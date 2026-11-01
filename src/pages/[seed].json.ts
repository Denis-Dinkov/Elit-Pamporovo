// Exports the local apartments for studio/scripts/seed.mjs.
// Generated ONLY when SEED_EXPORT=1; a normal build emits nothing for this route.
import type { APIRoute } from 'astro';
import { localApartments } from '../data/apartments';

export function getStaticPaths() {
  return import.meta.env.SEED_EXPORT === '1' || process.env.SEED_EXPORT === '1' ? [{ params: { seed: '__seed' } }] : [];
}

const img = (p: { src: any; alt: { bg: string; en: string } }) => ({ path: p.src.src, altBg: p.alt.bg, altEn: p.alt.en });

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      localApartments.map((a, i) => ({ ...a, order: (i + 1) * 10, cover: img(a.cover), photos: a.photos.map(img) })),
    ),
    { headers: { 'Content-Type': 'application/json' } },
  );
