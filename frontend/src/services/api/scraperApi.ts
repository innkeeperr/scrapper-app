import type { ScraperConfigSchemaType } from '@/schemas/scraperConfigSchema'
import { api } from './axios'

const createScraperConfig = async (data: ScraperConfigSchemaType) => {
  const response = await api.post('/scraper-config', data)
  return response
}

const fetchAllScraperConfigs = async () => {
  const response = await api.get('/scraper-config')
  return response.data
}

export const scraperApi = {
  createScraperConfig,
  fetchAllScraperConfigs,
}
