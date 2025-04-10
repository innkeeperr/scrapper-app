import { api } from './axios'

interface CreateScraperConfigBody {
  baseUrl: string
  itemList: string
  title: string
  price: string
  priceFraction: string
  link: string
}

const createScraperConfig = async (data: CreateScraperConfigBody) => {
  const response = await api.post('/scraper-config', data)
  console.log(response)
  return response
}

export const scraperApi = {
  createScraperConfig,
}
