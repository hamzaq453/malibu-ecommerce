/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

// Fallback values ensure the studio works even if env vars are missing
const projectId = '8jecpclu'
const dataset = 'production'

export default defineCliConfig({ 
  api: { projectId, dataset },
  studioHost: 'pink-malibu'
})
