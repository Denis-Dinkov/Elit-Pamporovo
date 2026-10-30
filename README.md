# Елит Пампорово

Сайт за апартаментите в Пампорово — статичен сайт на [Astro](https://astro.build), на български и английски.

## Команди

```bash
npm install
npm run dev       # локално на http://localhost:4321
npm run build     # готов сайт в dist/
npm run preview   # преглед на билда
```

## Къде какво се сменя

- `src/data/site.ts` — телефон, имейл, координати.
- `src/data/apartments.ts` — апартаменти, текстове, удобства, снимки и отзиви.
- `src/assets/photos/` — снимки (оптимизират се автоматично при билд в AVIF/WebP).
- `public/_redirects` — 301 пренасочвания от старите адреси.

## Отзиви

Всеки апартамент в `src/data/apartments.ts` има `reviews: []`. Поставяйте само истински отзиви:

```ts
reviews: [
  { author: 'Мария', source: 'Booking.com', rating: 9.6, outOf: 10, date: '2025-02',
    text: 'Прекрасен апартамент…', lang: 'bg', url: 'https://www.booking.com/…' },
],
```

Секцията „Гостите ни разказват“ се показва автоматично, когато има поне един отзив.

## Хостинг

Подходящ за Cloudflare Pages или Netlify: build команда `npm run build`, папка `dist`. Файловете `public/_redirects` и `public/_headers` се прилагат автоматично.
