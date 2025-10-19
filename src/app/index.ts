import { FastifyInstance } from 'fastify'
import { orderRoutes } from './routes/orderRoutes'

export async function registerAppModules(app: FastifyInstance) {
  await app.register(orderRoutes)
}
