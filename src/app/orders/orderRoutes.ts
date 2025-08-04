import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createOrderRepo } from './orderRepository'

export async function orderRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/orders',
    {
      schema: {
        summary: 'Create an order',
        tags: ['orders'],
        body: z.object({
          customerId: z.number().int().positive(),
          total: z.number().positive(),
          products: z
            .array(
              z.object({
                productId: z.number().int().positive(),
                quantity: z.number().int().positive(),
                price: z.number().positive(),
              })
            )
            .min(1),
        }),
        response: {
          201: z.object({
            orderId: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { customerId, total, products } = request.body

      const order = await createOrderRepo({
        customerId,
        total,
        products,
      })

      

      return reply.status(201).send({ orderId: order.id })
    }
  )
}
