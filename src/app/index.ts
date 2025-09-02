import { FastifyInstance } from 'fastify'
import { userRoutes } from './routes/userRoutes/userRoutes'
import { orderRoutes } from './routes/orderRoutes'

export async function registerAppModules(app: FastifyInstance) {
  await app.register(userRoutes)
  await app.register(orderRoutes)
}
