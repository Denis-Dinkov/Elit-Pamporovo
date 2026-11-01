import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// projectId идва от SANITY_STUDIO_PROJECT_ID (файл .env в тази папка) — вижте README
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '6y1hgmog'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'elit-pamporovo',
  title: 'Елит Пампорово',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Съдържание')
          .items([S.documentTypeListItem('apartment').title('Апартаменти')]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
