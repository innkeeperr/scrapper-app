import { z } from 'zod'

export const scraperConfigSchema = z.object({
  baseUrl: z.string().min(1, { message: 'Base URL is required.' }),
  itemList: z.string().min(1, { message: 'Item list is required.' }),
  title: z.string().min(1, { message: 'Product title is required.' }),
  price: z.string().min(1, { message: 'Price is required.' }),
  priceFraction: z.string().optional(),
  link: z.string().optional(),
})

export type ScraperConfigSchemaType = Zod.infer<typeof scraperConfigSchema>
