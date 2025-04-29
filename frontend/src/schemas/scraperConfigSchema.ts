import { z } from 'zod'

const createFieldSchema = ({
  required,
  selectorMessage,
}: {
  required: boolean
  selectorMessage?: string
}) => {
  const base = z.object({
    selector: required
      ? z.string().min(1, { message: selectorMessage || 'Selector is required.' })
      : z.string().optional(),
    attribute: z.string().default('text'),
  })

  return required ? base : base.optional()
}

export const scraperConfigSchema = z.object({
  baseUrl: z.string().min(1, { message: 'Base URL is required.' }),
  title: createFieldSchema({ required: true, selectorMessage: 'Product title is required.' }),
  price: createFieldSchema({ required: true, selectorMessage: 'Price is required.' }),
  link: createFieldSchema({ required: false }), // optional
})

// export const scraperConfigSchema = z.object({
//   baseUrl: z.string().min(1, { message: 'Base URL is required.' }),
//   titleSelector: z.string().min(1, { message: 'Product title is required.' }),
//   titleAttribute: z.string().optional(),
//   priceSelector: z.string().min(1, { message: 'Price is required.' }),
//   priceAttribute: z.string().optional(),
//   linkSelector: z.string().optional(),
//   linkAttribute: z.string().optional(),
// })

export type ScraperConfigSchemaType = Zod.infer<typeof scraperConfigSchema>
