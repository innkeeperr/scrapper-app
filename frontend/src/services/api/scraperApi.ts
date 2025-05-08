import type { ScraperConfigSchemaType } from '@/schemas/scraperConfigSchema'
import { api } from './axios'

export interface ExecuteScraperPayload {
  productConfigId: string
}

const executeScraper = async (data: ExecuteScraperPayload) => {
  const response = await api.post('/scraper', data)
  return response
}

type TestScraperConfigurationPayload = {
  config: Omit<ScraperConfigSchemaType, 'baseUrl'>
  exampleProductUrl: string
}

const testScraperConfiguration = async (data: TestScraperConfigurationPayload) => {
  const response = await api.post('/test-scraper-config', data)
  return response
}

export const scraperApi = {
  executeScraper,
  testScraperConfiguration,
}
