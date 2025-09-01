import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { userService } from '../../users/userService'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const loginResponseSchema = z.object({ token: z.string() })
const errorResponseSchema = z.object({ message: z.string() })

export async function loginRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users/login',
    {
      schema: {
        summary: 'Authenticate a user',
        tags: ['users'],
        body: loginSchema,
        response: {
          200: loginResponseSchema,
          401: errorResponseSchema,
        },
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
