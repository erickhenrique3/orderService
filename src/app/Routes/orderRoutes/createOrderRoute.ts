import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createOrderService } from '../../orders/orderService'
import { z } from 'zod'

const productSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
})

const createOrderSchema = z.object({
  products: z.array(productSchema).min(1, 'Informe pelo menos 1 produto'),
  total: z.number().positive(),
})

const createOrderResponseSchema = z.object({
  orderId: z.number(),
})

export async function createOrderRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/orders',
    {
      preValidation: [app.authenticate],
      schema: {
        summary: 'Create an order',
        tags: ['orders'],
        body: createOrderSchema,
        response: { 201: createOrderResponseSchema },
      },
    },
    async (request, reply) => {
      const { products, total } = request.body
      const customerId = request.user.id
      const order = await createOrderService({ customerId, total, products })
      return reply.status(201).send({ orderId: order.id })
    }
  )
}
