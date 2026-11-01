import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '6y1hgmog',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // The admin panel is deployed to https://<hostname>.sanity.studio
  studioHost: 'elitpamporovo',
  deployment: { appId: 'kfuoctmtomfp4g8ddrtrbrc5' },
})
