import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createOrderRepo } from './orderRepository'
import { z } from 'zod'

export async function orderRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/orders',
    {
      schema: {
        summary: 'Create an order',
        tags: ['orders'],
        body: z.object({
          customerId: z.number().int().positive(),
          products: z.array(
            z.object({
              productId: z.number().int().positive(),
              quantity: z.number().int().positive(),
              price: z.number().positive(),
            })
          ).min(1, 'Informe pelo menos 1 produto'),
          total: z.number().positive(),
        }),
        response: {
          201: z.object({
            orderId: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { customerId, products, total } = request.body
      const order = await createOrderRepo({ customerId, total, products })

      return reply.status(201).send({ orderId: order.id })
    }
  )
}
