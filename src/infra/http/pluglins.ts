import { FastifyInstance } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from '@/core/env'

export default async function registerPlugins(fastify: FastifyInstance) {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET
  })
}
