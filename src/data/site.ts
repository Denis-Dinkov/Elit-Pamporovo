// Основни данни за сайта — сменете тук и се обновява навсякъде.
export const SITE = {
  url: 'https://elitpamporovo.com',
  name: 'Елит Пампорово',
  nameEn: 'Elit Pamporovo',
  phone: '+359886867053',
  phoneDisplay: '+359 886 86 70 53',
  // TODO: попълнете реален имейл — използва се от формата за запитване
  email: '',
  locality: { bg: 'Пампорово', en: 'Pamporovo' },
  region: { bg: 'област Смолян', en: 'Smolyan Province' },
  postalCode: '4870',
  street: { bg: 'Комплекс „Елит Пампорово“', en: 'Elit Pamporovo Holiday Village' },
  // Координати на комплекса (от обявите в Booking.com)
  geo: { lat: 41.65353, lng: 24.68843 } as null | { lat: number; lng: number },
  // Разстояния (по данни от Booking.com / OpenStreetMap)
  distances: [
    { bg: 'Ски център Малина', en: 'Malina Ski Center', value: { bg: '~800 м', en: '~800 m' } },
    { bg: 'Лифт Студенец 3', en: 'Studenets 3 ski lift', value: { bg: '~700 м', en: '~700 m' } },
    { bg: 'Смолян', en: 'Smolyan', value: { bg: '~15 км', en: '~15 km' } },
    { bg: 'Летище Пловдив', en: 'Plovdiv Airport', value: { bg: '~70 км', en: '~70 km' } },
  ],
};

export type Lang = 'bg' | 'en';

export const t = {
  bg: {
    nav: { day: 'Един ден тук', apartments: 'Апартаменти', location: 'Местоположение', reviews: 'Отзиви', winter: 'Зимата', ski: 'Ски в Пампорово', book: 'Запитване' },
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
    nav: { day: 'A day here', apartments: 'Apartments', location: 'Location', reviews: 'Reviews', winter: 'Winter', ski: 'Skiing in Pamporovo', book: 'Enquire' },
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
