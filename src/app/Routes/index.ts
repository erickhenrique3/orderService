import { FastifyInstance } from 'fastify'
import { userRoutes } from './userRoutes'
import { orderRoutes } from './orderRoutes'

export async function registerAppRoutes(app: FastifyInstance) {
  await app.register(userRoutes)
  await app.register(orderRoutes)
}