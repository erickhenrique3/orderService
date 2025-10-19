import { FastifyInstance } from 'fastify'
import { orderRoutes } from './orderRoutes'

export async function registerAppRoutes(app: FastifyInstance) {
  await app.register(orderRoutes)
}