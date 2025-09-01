import { FastifyInstance } from 'fastify'
import { userRoutes } from './Routes/userRoutes/userRoutes'
import { orderRoutes } from './Routes/orderRoutes'

export async function registerAppModules(app: FastifyInstance) {
  await app.register(userRoutes)
  await app.register(orderRoutes)
}
