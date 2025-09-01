import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userService } from '../../users/userService'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const registerResponseSchema = registerSchema.omit({ password: true })
const errorResponseSchema = z.object({ message: z.string() })

export async function registerRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users/register',
    {
      schema: {
        summary: 'Register a new user',
        tags: ['users'],
        body: registerSchema,
        response: {
          201: registerResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const user = await userService.register(request.body)
        return reply.status(201).send(user)
      } catch (err: any) {
        return reply.status(400).send({ message: err.message || 'Erro ao registrar usuário' })
      }
    }
  )
}
