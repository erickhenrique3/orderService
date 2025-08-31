import { FastifyInstance } from 'fastify'

export default async function registerAuthenticate(fastify: FastifyInstance) {
  fastify.decorate(
    'authenticate',
    async (request: any, reply: any) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        return reply.status(401).send({ message: 'Token inválido ou expirado' })
      }
    }
  )
}
