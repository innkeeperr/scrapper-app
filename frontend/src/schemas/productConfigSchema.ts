import { z } from 'zod'

export const productConfigSchema = z.object({
  scraperConfig: z.union([
    z.object({
      name: z.string().min(1, 'Scraper config is required.'),
    }),
    z.any().refine((val) => false, { message: 'Scraper config is required.' }),
  ]),
  productName: z.string().min(1, 'Product name is required'),
})

export type ProductConfigSchemaType = Zod.infer<typeof productConfigSchema>
