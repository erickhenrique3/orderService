import { z } from 'zod'

export const createOrderSchema = z.object({
  customerId: z.number().int().positive(),
  products: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })).min(1, 'Informe pelo menos 1 produto'),
  total: z.number().positive()
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
