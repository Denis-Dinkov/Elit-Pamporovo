import type { ImageMetadata } from 'astro';

// Снимки
import fdLiving from '../assets/photos/forest-dream/forest-dream-apartment.jpg';
import fdLiving2 from '../assets/photos/forest-dream/forest-dream-2.jpg';
import fdSofa from '../assets/photos/forest-dream/pamporovo-apartament-luskozen.jpg';
import fdLounge from '../assets/photos/forest-dream/pochivka-v-pamporovo.jpg';
import fdBedroom from '../assets/photos/forest-dream/hotel-pamporovo-spalnia.jpg';
import fdBedroom2 from '../assets/photos/forest-dream/uiten-apartament-pamporovo.jpg';
import fdKitchen from '../assets/photos/forest-dream/apartament-paporovo-malina.jpg';
import fdOven from '../assets/photos/forest-dream/apartament-v-pamporovo.jpg';
import fdCoffee from '../assets/photos/forest-dream/morning-coffee.jpg';
import fdDream from '../assets/photos/forest-dream/forest-dream-elit-pamporovo.jpg';
import fdBird from '../assets/photos/forest-dream/forest-dream-magic.jpg';
import fdBird2 from '../assets/photos/forest-dream/forest-magic-at-home.jpg';
import fdBird3 from '../assets/photos/forest-dream/ski-vacancia-pamporovo.jpg';
import fdBath from '../assets/photos/forest-dream/ski-vacancia-pamporovo-rodopi.jpg';
import dhLiving from '../assets/photos/deers-home/deershome.jpg';
import dhLiving2 from '../assets/photos/deers-home/deershome1.jpg';
import rrLiving from '../assets/photos/rodopski-rai/rodopski-rai-dnevna.jpg';
import rrTerraceSnow from '../assets/photos/rodopski-rai/rodopski-rai-terasa-sniag.jpg';
import rrBedroom from '../assets/photos/rodopski-rai/rodopski-rai-spalnia.jpg';
import rrSofa from '../assets/photos/rodopski-rai/rodopski-rai-divan.jpg';
import rrLiving2 from '../assets/photos/rodopski-rai/rodopski-rai-dnevna-2.jpg';
import rrDining from '../assets/photos/rodopski-rai/rodopski-rai-trapezaria.jpg';
import rrTerrace from '../assets/photos/rodopski-rai/rodopski-rai-terasa.jpg';
import rrTerrace2 from '../assets/photos/rodopski-rai/rodopski-rai-terasa-2.jpg';
import rrBedroom2 from '../assets/photos/rodopski-rai/rodopski-rai-spalnia-2.jpg';
import rrEntrance from '../assets/photos/rodopski-rai/rodopski-rai-vhod.jpg';

export type Photo = { src: ImageMetadata; alt: { bg: string; en: string } };

/**
 * Отзиви — поставяйте само истински отзиви, копирани от Booking, Airbnb или Google.
 * Пример:
 * {
 *   author: 'Мария',
 *   source: 'Booking.com',
 *   rating: 9.6,
 *   outOf: 10,
 *   date: '2025-02',
 *   text: 'Прекрасен апартамент, гледката към гората е невероятна…',
 *   lang: 'bg',
 *   url: 'https://www.booking.com/…',   // по желание — линк към оригинала
 * }
 */
export type Review = {
  author: string;
  source: 'Booking.com' | 'Airbnb' | 'Google' | 'Facebook' | 'Директно';
  rating: number;
  outOf: 5 | 10;
  date: string; // ГГГГ-ММ
  text: string;
  lang: 'bg' | 'en';
  url?: string;
};

export type Apartment = {
  id: string;
  slug: { bg: string; en: string };
  name: { bg: string; en: string };
  tagline: { bg: string; en: string };
  intro: { bg: string; en: string };
  story: { bg: string[]; en: string[] };
  bedrooms: number;
  guests: number;
  size: number;
  floor: number;
  number: number;
  amenities: { bg: string[]; en: string[] };
  cover: Photo;
  photos: Photo[];
  reviews: Review[];
};

const baseAmenities = {
  bg: ['Напълно оборудвана кухня', 'Съдомиялна машина', 'Кафе машина', 'Тераса с изглед към гората', 'Телевизор', 'Безплатен интернет'],
  en: ['Fully equipped kitchen', 'Dishwasher', 'Coffee machine', 'Terrace with forest view', 'TV', 'Free Wi‑Fi'],
};
const washer = { bg: 'Пералня и сушилня', en: 'Washing machine & dryer' };

export const apartments: Apartment[] = [
  {
    id: 'forest-dream',
    slug: { bg: 'forest-dream', en: 'forest-dream' },
    name: { bg: 'Forest Dream', en: 'Forest Dream' },
    tagline: { bg: 'Сутрини със сърнички пред терасата', en: 'Mornings with deer outside the terrace' },
    intro: {
      bg: 'Уютен апартамент с една спалня, много близо до ски център Малина. От терасата и прозореца често се виждат горски птички и сърнички.',
      en: 'A cozy one-bedroom apartment very close to Malina Ski Center. Forest birds and deer are regular visitors outside the terrace and windows.',
    },
    story: {
      bg: [
        'Forest Dream е за хората, които искат да усетят гората отблизо. Кафето сутрин се пие на терасата, докато червеногръдите птички прелитат между смърчовете, а ако имате късмет, и сърничка ще надникне.',
        'След ден на пистите ви чака голям и удобен диван, библиотека с книги и настолни игри за дългите зимни вечери. Спалнята е с голямо двойно легло, а кухнята е напълно оборудвана, със съдомиялна, за да не губите от ваканцията си.',
      ],
      en: [
        'Forest Dream is for people who want to feel the forest up close. Morning coffee happens on the terrace while bullfinches flit between the spruces, and if you are lucky, a deer will peek out too.',
        'After a day on the slopes there is a big, comfortable sofa, a shelf of books and board games for long winter evenings. The bedroom has a large double bed, and the fully equipped kitchen has a dishwasher so you never lose holiday time to chores.',
      ],
    },
    bedrooms: 1,
    guests: 4,
    size: 60,
    floor: 5,
    number: 82,
    amenities: {
      bg: ['Голямо двойно легло', 'Голям удобен диван', ...baseAmenities.bg, washer.bg, 'Книги и настолни игри'],
      en: ['Large double bed', 'Large comfortable sofa', ...baseAmenities.en, washer.en, 'Books & board games'],
    },
    cover: { src: fdLiving, alt: { bg: 'Дневна на апартамент Forest Dream в Пампорово с изглед към гората', en: 'Forest Dream apartment living room in Pamporovo with forest view' } },
    photos: [
      { src: fdSofa, alt: { bg: 'Удобен диван в дневната на Forest Dream', en: 'Comfortable sofa in the Forest Dream living room' } },
      { src: fdBedroom, alt: { bg: 'Спалня с двойно легло в апартамент в Пампорово', en: 'Bedroom with double bed in a Pamporovo apartment' } },
      { src: fdLounge, alt: { bg: 'Кът за почивка с изглед към гората', en: 'Lounge corner with forest view' } },
      { src: fdKitchen, alt: { bg: 'Оборудвана кухня в апартамент близо до ски център Малина', en: 'Equipped kitchen in an apartment near Malina Ski Center' } },
      { src: fdCoffee, alt: { bg: 'Сутрешно кафе до прозореца с изглед към гората', en: 'Morning coffee by the window overlooking the forest' } },
      { src: fdBird, alt: { bg: 'Декоративна птичка, горската магия у дома', en: 'Bird decoration, forest magic at home' } },
      { src: fdBedroom2, alt: { bg: 'Уютна спалня в Пампорово', en: 'Cozy bedroom in Pamporovo' } },
      { src: fdLiving2, alt: { bg: 'Светла дневна с голям прозорец', en: 'Bright living room with a large window' } },
      { src: fdBird3, alt: { bg: 'Червенушка, кацнала на терасата', en: 'A bullfinch landing on the terrace' } },
      { src: fdDream, alt: { bg: 'Декорация „Dream" в апартамента', en: '"Dream" decoration in the apartment' } },
      { src: fdBird2, alt: { bg: 'Детайл от дневната', en: 'Living room detail' } },
      { src: fdOven, alt: { bg: 'Фурна и кухненски уреди', en: 'Oven and kitchen appliances' } },
      { src: fdBath, alt: { bg: 'Баня с пералня и сушилня', en: 'Bathroom with washer and dryer' } },
    ],
    reviews: [],
  },
  {
    id: 'rodopski-rai',
    slug: { bg: 'rodopski-rai', en: 'rhodope-paradise' },
    name: { bg: 'Родопски рай', en: 'Rhodope Paradise' },
    tagline: { bg: 'Светло гнездо високо над гората', en: 'A bright nest high above the forest' },
    intro: {
      bg: 'Апартамент с една спалня, до 4 гости, 60 м², на 5-ия етаж, с тераса с изглед към гората, пералня и сушилня.',
      en: 'One-bedroom apartment for up to 4 guests, 60 m², on the 5th floor, with a forest-view terrace, washer and dryer.',
    },
    story: {
      bg: [
        'На последния етаж, над върховете на смърчовете, Родопски рай е светъл и спокоен, с тераса, от която гледате как мъглата се вдига от гората сутрин.',
        'Тук има всичко за безгрижна ски почивка: пералня и сушилня за мокрите дрехи, кафе машина за първото кафе и съдомиялна, за да остане вечерта за вас.',
      ],
      en: [
        'On the top floor, above the spruce tops, Rhodope Paradise is bright and calm, with a terrace where you watch the morning mist lift from the forest.',
        'Everything for a carefree ski break is here: washer and dryer for wet gear, a coffee machine for the first cup and a dishwasher so the evening stays yours.',
      ],
    },
    bedrooms: 1,
    guests: 4,
    size: 60,
    floor: 5,
    number: 83,
    amenities: { bg: [...baseAmenities.bg, washer.bg], en: [...baseAmenities.en, washer.en] },
    cover: { src: rrLiving, alt: { bg: 'Дневна с трапезария и прозорец към заснежената гора, апартамент Родопски рай в Пампорово', en: 'Rhodope Paradise apartment living and dining area in Pamporovo' } },
    photos: [
      { src: rrTerraceSnow, alt: { bg: 'Заснежена тераса с изглед към смърчовата гора в Пампорово', en: 'Snowy terrace overlooking the spruce forest in Pamporovo' } },
      { src: rrBedroom, alt: { bg: 'Спалня с двойно легло в апартамент Родопски рай', en: 'Double bedroom in Rhodope Paradise apartment' } },
      { src: rrSofa, alt: { bg: 'Ъглов диван и голям прозорец към заснежената гора', en: 'Corner sofa and a large window onto the snowy forest' } },
      { src: rrDining, alt: { bg: 'Маса за хранене за четирима', en: 'Dining table for four' } },
      { src: rrTerrace, alt: { bg: 'Тераса със сняг и изглед към гората', en: 'Snow-covered terrace with forest view' } },
      { src: rrLiving2, alt: { bg: 'Светла дневна в Родопски рай', en: 'Bright living room in Rhodope Paradise' } },
      { src: rrBedroom2, alt: { bg: 'Спалня с телевизор и огледало', en: 'Bedroom with TV and mirror' } },
      { src: rrTerrace2, alt: { bg: 'Дълга тераса на петия етаж', en: 'Long terrace on the fifth floor' } },
      { src: rrEntrance, alt: { bg: 'Входно антре на апартамента', en: 'Apartment entrance hall' } },
    ],
    reviews: [],
  },
  {
    id: 'deers-home',
    slug: { bg: 'deers-home', en: 'deers-home' },
    name: { bg: "Deer's Home", en: "Deer's Home" },
    tagline: { bg: 'Две спални и място за цялото семейство', en: 'Two bedrooms and room for the whole family' },
    intro: {
      bg: 'Апартамент с две спални, до 5 гости, 68 м², на 4-ия етаж, с тераса с изглед към гората, пералня и сушилня.',
      en: 'Two-bedroom apartment for up to 5 guests, 68 m², on the 4th floor, with a forest-view terrace, washer and dryer.',
    },
    story: {
      bg: [
        "Deer's Home е създаден за семейства и приятели. Две отделни спални означават, че децата заспиват спокойно, а възрастните остават на масата с още една чаша вино.",
        'Светлата трапезария е сърцето на апартамента. Тук се планира утрешният ден на пистите и се разказва кой колко пъти е паднал днес.',
      ],
      en: [
        "Deer's Home is made for families and friends. Two separate bedrooms mean the kids fall asleep in peace while the grown-ups stay at the table for one more glass of wine.",
        "The bright dining area is the heart of the apartment, where tomorrow's ski day gets planned and today's tumbles get retold.",
      ],
    },
    bedrooms: 2,
    guests: 5,
    size: 68,
    floor: 4,
    number: 66,
    amenities: { bg: [...baseAmenities.bg, washer.bg], en: [...baseAmenities.en, washer.en] },
    cover: { src: dhLiving, alt: { bg: "Трапезария и дневна на апартамент Deer's Home в Пампорово", en: "Deer's Home apartment dining and living area in Pamporovo" } },
    photos: [
      { src: dhLiving2, alt: { bg: 'Дневна с диван и маса за хранене', en: 'Living room with sofa and dining table' } },
    ],
    reviews: [],
  },
];

export const findBySlug = (lang: 'bg' | 'en', slug: string) => apartments.find((a) => a.slug[lang] === slug);
