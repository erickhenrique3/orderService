import { FastifyInstance } from 'fastify'
import { orderRoutes } from './orders/orderRoutes'
import { userRoutes } from './users/userRoutes'

export async function registerAppModules(app: FastifyInstance) {
  await app.register(userRoutes)
  await app.register(orderRoutes)
}
