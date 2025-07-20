import { FastifyInstance } from 'fastify'
import { createOrderSchema } from './orderSchema'
import { createOrderService } from './orderService'

export async function orderRoutes(app: FastifyInstance) {
  app.post('/orders', async (request, reply) => {
    const data = createOrderSchema.parse(request.body)
    const order = await createOrderService(data)
    reply.code(201).send({ id: order.id })
  })
}
