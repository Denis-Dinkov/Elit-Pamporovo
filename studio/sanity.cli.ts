import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '6y1hgmog',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Админ панелът се публикува на https://<hostname>.sanity.studio
  studioHost: 'elitpamporovo',
  deployment: { appId: 'kfuoctmtomfp4g8ddrtrbrc5' },
})
