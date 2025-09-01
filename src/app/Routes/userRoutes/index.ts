import { FastifyInstance } from 'fastify'
import { registerRoute } from './registerRoute'
import { loginRoute } from './loginRoute'

export async function userRoutes(app: FastifyInstance) {
  await registerRoute(app)
  await loginRoute(app)
}
