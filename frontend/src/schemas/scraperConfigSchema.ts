import { z } from 'zod'

export const scraperConfigSchema = z.object({
  baseUrl: z.string().min(1, { message: 'Base URL is required.' }),
  itemListSelector: z.string().min(1, { message: 'Item list is required.' }),
  titleSelector: z.string().min(1, { message: 'Product title is required.' }),
  priceSelector: z.string().min(1, { message: 'Price is required.' }),
  linkSelector: z.string().optional(),
})

export type ScraperConfigSchemaType = Zod.infer<typeof scraperConfigSchema>
