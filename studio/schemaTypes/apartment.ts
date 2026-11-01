import { defineArrayMember, defineField, defineType } from 'sanity'

// Helpers for fields with Bulgarian and English text
const bgEn = (name: string, title: string, opts: { rows?: number; required?: boolean; description?: string } = {}) =>
  defineField({
    name,
    title,
    type: 'object',
    description: opts.description,
    options: { columns: 2 },
    fields: (['bg', 'en'] as const).map((lang) =>
      defineField({
        name: lang,
        title: lang === 'bg' ? 'Български' : 'English',
        type: opts.rows ? 'text' : 'string',
        rows: opts.rows,
        validation: (r) => (opts.required && lang === 'bg' ? r.required() : r),
      }),
    ),
  })

const photo = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({ name: 'altBg', title: 'Описание (BG)', type: 'string', description: 'Какво се вижда на снимката — важно за Google и незрящи.' }),
      defineField({ name: 'altEn', title: 'Description (EN)', type: 'string' }),
    ],
  })

export const apartment = defineType({
  name: 'apartment',
  title: 'Апартамент',
  type: 'document',
  groups: [
    { name: 'main', title: 'Основно', default: true },
    { name: 'text', title: 'Текстове' },
    { name: 'photos', title: 'Снимки' },
    { name: 'host', title: 'Домакин и контакти' },
    { name: 'details', title: 'Детайли' },
    { name: 'reviews', title: 'Оценки и отзиви' },
  ],
  fields: [
    defineField({ name: 'published', title: 'Показвай на сайта', type: 'boolean', initialValue: true, group: 'main' }),
    defineField({ name: 'order', title: 'Подредба', type: 'number', description: 'По-малкото число е по-напред.', initialValue: 10, group: 'main' }),
    { ...bgEn('name', 'Име', { required: true }), group: 'main' },
    defineField({
      name: 'slug',
      title: 'Адрес на страницата',
      type: 'object',
      group: 'main',
      description: 'Само латински букви и тирета, напр. forest-dream. Не сменяйте след публикуване — губи се класирането в Google.',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'bg', title: 'BG (/bg/…)', type: 'slug', options: { source: 'name.en' }, validation: (r) => r.required() }),
        defineField({ name: 'en', title: 'EN (/en/…)', type: 'slug', options: { source: 'name.en' }, validation: (r) => r.required() }),
      ],
    }),
    { ...bgEn('tagline', 'Кратко мото', { description: 'Едно изречение под името.' }), group: 'main' },
    { ...bgEn('intro', 'Кратко описание', { rows: 3, description: 'Показва се в картата на апартамента и в Google.' }), group: 'text' },
    { ...bgEn('story', 'Подробно описание', { rows: 8, description: 'Отделяйте абзаците с празен ред.' }), group: 'text' },

    { ...photo('cover', 'Главна снимка'), group: 'photos', validation: (r: any) => r.required() },
    defineField({ name: 'gallery', title: 'Галерия', type: 'array', group: 'photos', of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'altBg', title: 'Описание (BG)', type: 'string' }),
      defineField({ name: 'altEn', title: 'Description (EN)', type: 'string' }),
    ] })], options: { layout: 'grid' } }),

    defineField({
      name: 'host',
      title: 'Домакин',
      type: 'object',
      group: 'host',
      description: 'Гостите се свързват директно с този човек, за да проверят свободни дати.',
      fields: [
        defineField({ name: 'name', title: 'Име', type: 'string' }),
        defineField({ name: 'phone', title: 'Телефон', type: 'string', description: 'С код на страната, напр. +359 886 86 70 53', validation: (r) => r.required() }),
        defineField({ name: 'email', title: 'Имейл', type: 'string', validation: (r) => r.email() }),
        defineField({ name: 'viber', title: 'Има Viber на този телефон', type: 'boolean', initialValue: true }),
        defineField({ name: 'whatsapp', title: 'Има WhatsApp на този телефон', type: 'boolean', initialValue: true }),
        defineField({ name: 'languages', title: 'Говори езици', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
      ],
    }),

    defineField({ name: 'bedrooms', title: 'Спални', type: 'number', group: 'details', validation: (r) => r.required().min(0) }),
    defineField({ name: 'guests', title: 'Максимум гости', type: 'number', group: 'details', validation: (r) => r.required().min(1) }),
    defineField({ name: 'size', title: 'Площ (м²)', type: 'number', group: 'details' }),
    defineField({ name: 'floor', title: 'Етаж', type: 'number', group: 'details' }),
    defineField({ name: 'number', title: 'Номер на апартамента', type: 'string', group: 'details' }),
    defineField({ name: 'checkIn', title: 'Настаняване (часове)', type: 'string', placeholder: '14:00 – 20:00', group: 'details' }),
    defineField({ name: 'checkOut', title: 'Напускане (часове)', type: 'string', placeholder: '08:00 – 11:00', group: 'details' }),
    defineField({
      name: 'amenities',
      title: 'Удобства',
      type: 'object',
      group: 'details',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'bg', title: 'Български', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'en', title: 'English', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),

    defineField({
      name: 'booking',
      title: 'Обява в Booking.com (по желание)',
      type: 'object',
      group: 'reviews',
      fields: [
        defineField({ name: 'url', title: 'Линк към обявата', type: 'url' }),
        defineField({ name: 'score', title: 'Оценка (от 10)', type: 'number', validation: (r) => r.min(0).max(10) }),
        defineField({ name: 'reviews', title: 'Брой отзиви', type: 'number' }),
      ],
    }),
    defineField({
      name: 'reviews',
      title: 'Отзиви',
      type: 'array',
      group: 'reviews',
      description: 'Поставяйте само истински отзиви, с източника им.',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'author', title: 'Автор', type: 'string' }),
          defineField({ name: 'source', title: 'Източник', type: 'string', options: { list: ['Booking.com', 'Airbnb', 'Google', 'Facebook', 'Директно'] } }),
          defineField({ name: 'rating', title: 'Оценка', type: 'number' }),
          defineField({ name: 'outOf', title: 'От', type: 'number', options: { list: [5, 10] }, initialValue: 10 }),
          defineField({ name: 'date', title: 'Месец', type: 'date', options: { dateFormat: 'MM.YYYY' } }),
          defineField({ name: 'text', title: 'Текст', type: 'text', rows: 4 }),
          defineField({ name: 'lang', title: 'Език на отзива', type: 'string', options: { list: ['bg', 'en'] }, initialValue: 'bg' }),
          defineField({ name: 'url', title: 'Линк към оригинала', type: 'url' }),
        ],
        preview: { select: { title: 'author', subtitle: 'source' } },
      })],
    }),
  ],
  orderings: [{ title: 'Подредба', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name.bg', subtitle: 'host.name', media: 'cover', published: 'published' },
    prepare: ({ title, subtitle, media, published }) => ({
      title: (published === false ? '⏸ ' : '') + (title || 'Нов апартамент'),
      subtitle: subtitle ? `Домакин: ${subtitle}` : 'Без домакин',
      media,
    }),
  },
})
