import type { ProductConfigSchemaType } from '@/schemas/productConfigSchema'
import { api } from './axios'

const createProductConfig = async (data: ProductConfigSchemaType) => {
  const response = await api.post('/product-config', data)
  return response
}

export const productConfigApi = {
  createProductConfig,
}
