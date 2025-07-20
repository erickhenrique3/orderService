import { FastifyInstance } from 'fastify'
import { orderRoutes } from './orders/orderRoutes'

export async function registerAppModules(app: FastifyInstance) {
  await app.register(orderRoutes)
}
