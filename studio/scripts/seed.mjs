// One-off import of the local apartments (with all photos) into Sanity, using your Sanity CLI login.
//
// 1) In the project root:  SEED_EXPORT=1 npm run build && npm run preview
// 2) In studio/:           npx sanity login   (once)
//                          npm run seed
//
// Re-running overwrites the same documents (no duplicates).
import { getCliClient } from 'sanity/cli';

const { SEED_BASE = 'http://localhost:4321' } = process.env;
const client = getCliClient({ apiVersion: '2025-01-01' });
const { projectId, dataset } = client.config();

const res = await fetch(`${SEED_BASE}/__seed.json`);
if (!res.ok) {
  console.error(`Не мога да прочета ${SEED_BASE}/__seed.json — пуснете първо „SEED_EXPORT=1 npm run build && npm run preview“.`);
  process.exit(1);
}
const apartments = await res.json();

const uploaded = new Map();
async function upload(img) {
  if (uploaded.has(img.path)) return uploaded.get(img.path);
  const r = await fetch(SEED_BASE + img.path);
  const buf = Buffer.from(await r.arrayBuffer());
  const asset = await client.assets.upload('image', buf, { filename: img.path.split('/').pop() });
  uploaded.set(img.path, asset._id);
  return asset._id;
}
const imageField = async (img, key) => ({
  _type: 'image',
  ...(key ? { _key: key } : {}),
  asset: { _type: 'reference', _ref: await upload(img) },
  altBg: img.altBg,
  altEn: img.altEn,
});

for (const a of apartments) {
  process.stdout.write(`${a.name.bg}: качвам ${a.photos.length + 1} снимки… `);
  const doc = {
    _id: `apartment-${a.slug.en}`,
    _type: 'apartment',
    published: true,
    order: a.order,
    name: a.name,
    slug: { bg: { _type: 'slug', current: a.slug.bg }, en: { _type: 'slug', current: a.slug.en } },
    tagline: a.tagline,
    intro: a.intro,
    story: { bg: a.story.bg.join('\n\n'), en: a.story.en.join('\n\n') },
    bedrooms: a.bedrooms,
    guests: a.guests,
    size: a.size,
    floor: a.floor,
    number: a.number != null ? String(a.number) : undefined,
    checkIn: a.checkIn,
    checkOut: a.checkOut,
    amenities: a.amenities,
    host: { ...a.host },
    cover: await imageField(a.cover),
    gallery: await Promise.all(a.photos.map((p, i) => imageField(p, `img${i}`))),
    reviews: (a.reviews || []).map((r, i) => ({ _key: `r${i}`, ...r, date: r.date ? `${r.date}-01` : undefined })),
  };
  await client.createOrReplace(doc);
  console.log('готово');
}
console.log(`\nКачени ${apartments.length} апартамента в ${projectId}/${dataset}.`);
