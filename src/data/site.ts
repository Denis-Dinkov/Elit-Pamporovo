// Core site data: change it here and it updates everywhere.
export const SITE = {
  url: 'https://elitpamporovo.com',
  name: 'Елит Пампорово',
  nameEn: 'Elit Pamporovo',
  locality: { bg: 'Пампорово', en: 'Pamporovo' },
  region: { bg: 'област Смолян', en: 'Smolyan Province' },
  // TODO: fill in the complex's exact coordinates (Google Maps → right click → coordinates)
  geo: null as null | { lat: number; lng: number },
};

export type Lang = 'bg' | 'en';

export const t = {
  bg: {
    nav: { day: 'Един ден тук', apartments: 'Апартаменти', winter: 'Зимата', ski: 'Ски в Пампорово', book: 'Контакти' },
    home: '/bg/',
    apartments: '/bg/apartamenti/',
    blog: '/bg/blog/ski-v-pamporovo/',
    other: 'English',
    guests: (n: number) => `до ${n} гости`,
    bedrooms: (n: number) => (n === 1 ? '1 спалня' : `${n} спални`),
    floor: (n: number) => `${n} етаж`,
    view: 'Изглед към гората',
    more: 'Разгледай',
    ask: 'Запитване',
    call: 'Обадете се',
    reviews: 'Какво казват гостите',
    gallery: 'Снимки',
    amenities: 'Удобства',
    others: 'Другите апартаменти',
    breadcrumbsHome: 'Начало',
    footer: 'Апартаменти под наем в Пампорово, близо до ски център Малина.',
  },
  en: {
    nav: { day: 'A day here', apartments: 'Apartments', winter: 'Winter', ski: 'Skiing in Pamporovo', book: 'Contact' },
    home: '/en/',
    apartments: '/en/apartments/',
    blog: '/en/blog/skining-pamporovo/',
    other: 'Български',
    guests: (n: number) => `up to ${n} guests`,
    bedrooms: (n: number) => (n === 1 ? '1 bedroom' : `${n} bedrooms`),
    floor: (n: number) => `floor ${n}`,
    view: 'Forest view',
    more: 'View',
    ask: 'Enquire',
    call: 'Call us',
    reviews: 'What guests say',
    gallery: 'Photos',
    amenities: 'Amenities',
    others: 'Other apartments',
    breadcrumbsHome: 'Home',
    footer: 'Holiday apartments in Pamporovo, close to Malina Ski Center.',
  },
} as const;
