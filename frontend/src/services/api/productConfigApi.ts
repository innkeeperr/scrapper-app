import type { ProductConfigSchemaType } from '@/schemas/productConfigSchema'
import { api } from './axios'

export interface CreateProductConfigPayload extends Omit<ProductConfigSchemaType, 'scraperConfig'> {
  scraperConfigId: string
}

const createProductConfig = async (data: CreateProductConfigPayload) => {
  const response = await api.post('/product-config', data)
  return response
}

export const productConfigApi = {
  createProductConfig,
}
