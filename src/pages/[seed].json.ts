// Експорт на локалните апартаменти за studio/scripts/seed.mjs.
// Генерира се САМО при SEED_EXPORT=1 — в нормалния билд този файл не създава нищо.
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
