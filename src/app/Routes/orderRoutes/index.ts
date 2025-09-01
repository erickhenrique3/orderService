import { FastifyInstance } from 'fastify'
import { createOrderRoute } from './createOrderRoute'
export async function orderRoutes(app: FastifyInstance) {
  await createOrderRoute(app)
}
