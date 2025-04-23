import type { ProductConfigSchemaType } from '@/schemas/productConfigSchema'
import { api } from './axios'

export interface CreateProductConfigPayload extends Omit<ProductConfigSchemaType, 'scraperConfig'> {
  scraperConfigId: string
}

const createProductConfig = async (data: CreateProductConfigPayload) => {
  const response = await api.post('/product-config', data)
  return response
}

const fetchAllProductConfigs = async () => {
  const response = await api.get('/product-config')
  return response.data
}

export const productConfigApi = {
  createProductConfig,
  fetchAllProductConfigs,
}
