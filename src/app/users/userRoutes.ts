import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userService } from './userService'
import { z } from 'zod'

// Schemas para registro e login
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const errorResponseSchema = z.object({ message: z.string()})
const registerResponseSchema = registerSchema.omit({ password: true })
const loginResponseSchema = z.object({ token: z.string() })

export async function userRoutes(app: FastifyInstance) {
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

  app.withTypeProvider<ZodTypeProvider>().post(
    '/users/login',
    {
      schema: {
        summary: 'Authenticate a user',
        tags: ['users'],
        body: loginSchema,
        response: { 
          200: loginResponseSchema,
          401: errorResponseSchema
        }
      },
    },
    async (request, reply) => {
      const user = await userService.authenticate(request.body)
      if (!user) {
        return reply.status(401).send({ message: 'Credenciais inválidas' })
      }

      const token = app.jwt.sign({ id: user.id, email: user.email })
      return reply.send({ token })
    }
  )
}
