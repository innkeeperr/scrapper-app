import { api } from './axios'

export interface ExecuteScraperPayload {
  productConfigId: string
}

const executeScraper = async (data: ExecuteScraperPayload) => {
  const response = await api.post('/scraper', data)
  return response
}

export const scraperApi = {
  executeScraper,
}
