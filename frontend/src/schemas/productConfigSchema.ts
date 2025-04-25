import { z } from 'zod'

export const productConfigSchema = z.object({
  scraperConfig: z.union([
    z.object({
      value: z.string().min(1, 'Scraper config is required.'),
    }),
    z.any().refine((val) => false, { message: 'Scraper config is required.' }),
  ]),
  searchUrl: z.string().min(1, 'Search URL is required'),
  productName: z.string().min(1, 'Product name is required'),
  maxPrice: z.number().nullable(),
})

export type ProductConfigSchemaType = Zod.infer<typeof productConfigSchema>
