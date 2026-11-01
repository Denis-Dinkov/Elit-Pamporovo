// Апартаменти: идват от Sanity (админ панела), а ако Sanity не е настроен — от src/data/apartments.ts.
import type { ImageMetadata } from 'astro';
import { createClient } from '@sanity/client';
import { localApartments } from '../data/apartments';

export type Lang = 'bg' | 'en';
type L<T = string> = { bg: T; en: T };

/** Снимка от Sanity CDN */
export type RemoteImage = { url: string; width: number; height: number };
export type AnyImage = ImageMetadata | RemoteImage;
export const isRemote = (i: AnyImage): i is RemoteImage => 'url' in i;

export type Photo = { src: AnyImage; alt: L };

export type Review = {
  author: string;
  source: string;
  rating: number;
  outOf: 5 | 10;
  date: string; // ГГГГ-ММ
  text: string;
  lang: Lang;
  url?: string;
};

export type Host = {
  name?: string;
  phone: string;
  email?: string;
  viber?: boolean;
  whatsapp?: boolean;
  languages?: string[];
};

export type Apartment = {
  id: string;
  slug: L;
  name: L;
  tagline: L;
  intro: L;
  story: L<string[]>;
  bedrooms: number;
  guests: number;
  size?: number;
  floor?: number;
  number?: string;
  checkIn?: string;
  checkOut?: string;
  amenities: L<string[]>;
  host: Host;
  cover: Photo;
  photos: Photo[];
  reviews: Review[];
};

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) || 'production';
export const usingSanity = Boolean(projectId);

const QUERY = `*[_type == "apartment" && published != false] | order(order asc, name.bg asc){
  _id, name, tagline, intro, story, bedrooms, guests, size, floor, number, checkIn, checkOut, amenities, host, reviews,
  "slug": { "bg": slug.bg.current, "en": slug.en.current },
  "cover": cover{ altBg, altEn, "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height },
  "gallery": gallery[]{ altBg, altEn, "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height }
}`;

type SanityImg = { altBg?: string; altEn?: string; url: string; w: number; h: number } | null;
const toPhoto = (i: SanityImg, fallbackAlt: L): Photo | null =>
  i?.url ? { src: { url: i.url, width: i.w, height: i.h }, alt: { bg: i.altBg || fallbackAlt.bg, en: i.altEn || i.altBg || fallbackAlt.en } } : null;
const paragraphs = (t?: string) => (t || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const both = (o: any, fb = ''): L => ({ bg: o?.bg || fb, en: o?.en || o?.bg || fb });

async function fromSanity(): Promise<Apartment[]> {
  // SANITY_API_HOST — само за локални тестове срещу мок сървър
  const apiHost = import.meta.env.SANITY_API_HOST as string | undefined;
  const client = createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false, ...(apiHost ? { apiHost, useProjectHostname: false } : {}) });
  const rows: any[] = await client.fetch(QUERY);
  return rows
    .filter((r) => r.slug?.bg && r.slug?.en && r.cover?.url && r.host?.phone)
    .map((r) => {
      const name = both(r.name);
      const alt = { bg: `Апартамент ${name.bg} в Пампорово`, en: `${name.en} apartment in Pamporovo` };
      return {
        id: r._id,
        slug: { bg: r.slug.bg, en: r.slug.en },
        name,
        tagline: both(r.tagline),
        intro: both(r.intro),
        story: { bg: paragraphs(r.story?.bg), en: paragraphs(r.story?.en || r.story?.bg) },
        bedrooms: r.bedrooms ?? 1,
        guests: r.guests ?? 2,
        size: r.size ?? undefined,
        floor: r.floor ?? undefined,
        number: r.number ?? undefined,
        checkIn: r.checkIn || undefined,
        checkOut: r.checkOut || undefined,
        amenities: { bg: r.amenities?.bg || [], en: r.amenities?.en || r.amenities?.bg || [] },
        host: r.host,
        cover: toPhoto(r.cover, alt)!,
        photos: (r.gallery || []).map((g: SanityImg) => toPhoto(g, alt)).filter(Boolean) as Photo[],
        reviews: (r.reviews || []).map((x: any) => ({ ...x, date: (x.date || '').slice(0, 7) })),
      } satisfies Apartment;
    });
}

let cache: Promise<Apartment[]> | undefined;
/** Всички публикувани апартаменти (зарежда се веднъж за целия билд) */
export const getApartments = () => (cache ??= usingSanity ? fromSanity() : Promise.resolve(localApartments));

/** Телефон във вид за линкове: +359886867053 */
export const telHref = (phone: string) => phone.replace(/[^\d+]/g, '');

const WORDS = {
  bg: ['', 'един', 'два', 'три', 'четири', 'пет', 'шест', 'седем', 'осем', 'девет', 'десет'],
  en: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
};
/** Брой с думи („три“ / „three“), с главна буква при cap */
export const countWord = (n: number, lang: Lang, cap = false) => {
  const w = WORDS[lang][n] ?? String(n);
  return cap ? w.charAt(0).toUpperCase() + w.slice(1) : w;
};
/** Обхват „4–5“ или „5“ */
export const range = (nums: (number | undefined)[]) => {
  const v = nums.filter((x): x is number => typeof x === 'number');
  if (!v.length) return '';
  const lo = Math.min(...v), hi = Math.max(...v);
  return lo === hi ? String(lo) : `${lo}–${hi}`;
};
/** Обобщение за всички апартаменти — за заглавия и описания */
export const summary = (list: Apartment[]) => ({
  count: list.length,
  guests: range(list.map((a) => a.guests)),
  maxGuests: Math.max(0, ...list.map((a) => a.guests)),
  size: range(list.map((a) => a.size)),
});
