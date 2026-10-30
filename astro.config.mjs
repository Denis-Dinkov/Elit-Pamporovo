import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://elitpamporovo.com',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'bg', locales: { bg: 'bg-BG', en: 'en-US' } },
      filter: (page) => !page.endsWith('/404/') && page !== 'https://elitpamporovo.com/',
    }),
  ],
});
