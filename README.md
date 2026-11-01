# Елит Пампорово

Сайт за апартаментите в Пампорово: статичен сайт на [Astro](https://astro.build), на български и английски.

## Команди

```bash
npm install
npm run dev       # локално на http://localhost:4321
npm run build     # готов сайт в dist/
npm run preview   # преглед на билда
```

## Админ панел (Sanity)

Апартаментите (текстове, снимки, домакин и контакти) се управляват от админ панела на Sanity:
**https://elitpamporovo.sanity.studio** (или `/admin` на сайта). Влиза се с имейл; всеки поканен потребител може да добавя и редактира всички апартаменти. Безплатният план на Sanity позволява до 20 потребители.

Всеки апартамент е отделна обява със свой домакин. Гостите не проверяват дати на сайта, а се свързват директно с домакина (телефон, Viber, WhatsApp, имейл).

### Първоначална настройка (еднократно)

1. Създайте проект на [sanity.io/manage](https://www.sanity.io/manage) (dataset `production`, видимост **public**).
2. В `studio/` създайте `.env` по образеца на `studio/.env.example` с Project ID, после:
   ```bash
   cd studio && npm install && npx sanity login && npm run deploy
   ```
   Публикува админ панела на `elitpamporovo.sanity.studio`.
3. Поканете потребителите: sanity.io/manage → проекта → **Members** → Invite (по имейл, роля Administrator).
4. Пренесете текущите апартаменти със снимките (токен с права Editor от **API → Tokens**):
   ```bash
   SEED_EXPORT=1 npm run build && npm run preview          # терминал 1
   SANITY_PROJECT_ID=xxx SANITY_WRITE_TOKEN=yyy node scripts/seed-sanity.mjs   # терминал 2
   ```
5. Във Vercel → Settings → Environment Variables добавете `PUBLIC_SANITY_PROJECT_ID` и `PUBLIC_SANITY_DATASET=production`.
6. Автоматично обновяване на сайта при публикуване:
   - Vercel → Settings → Git → **Deploy Hooks** → създайте hook за клон `main` и копирайте URL-а;
   - sanity.io/manage → API → **Webhooks** → Add: URL = deploy hook-а, Dataset `production`, Trigger on create/update/delete, Filter `_type == "apartment"`.

   След публикуване в админ панела сайтът се обновява за около минута.

Без `PUBLIC_SANITY_PROJECT_ID` сайтът ползва резервните данни от `src/data/apartments.ts`.

## Къде какво се сменя

- Админ панел: апартаменти, домакини, контакти, снимки, отзиви.
- `src/data/site.ts`: данни за комплекса, менюта, преводи.
- `src/lib/apartments.ts`: зареждане на апартаментите от Sanity.
- `studio/schemaTypes/apartment.ts`: полетата в админ панела.
- `public/_redirects`, `vercel.json`: 301 пренасочвания от старите адреси.

## Хостинг

Подходящ за Cloudflare Pages или Netlify: build команда `npm run build`, папка `dist`. Файловете `public/_redirects` и `public/_headers` се прилагат автоматично.
