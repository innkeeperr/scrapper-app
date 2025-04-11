import type { ScraperConfigSchemaType } from '@/schemas/scraperConfigSchema'
import { api } from './axios'

const createScraperConfig = async (data: ScraperConfigSchemaType) => {
  const response = await api.post('/scraper-config', data)
  console.log(response)
  return response
}

export const scraperApi = {
  createScraperConfig,
}
