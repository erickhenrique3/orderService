import type { FastifyInstance } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from 'fastify-type-provider-zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

const formatIssues = (issues: any[], removeLeadingSlash = true) => {
  const formatted: { [key: string]: string[] } = {}

  issues.forEach(e => {
    const path = removeLeadingSlash
      ? (e.instancePath || e.path || '').replace(/^\//, '')
      : (e.path?.[0] || '').toString()

    if (!formatted[path]) {
      formatted[path] = []
    }

    formatted[path].push(e.message)
  })

  return Object.entries(formatted).map(([path, messages]) => ({
    path,
    message: messages,
  }))
}

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    const issues = formatIssues(error.validation.flat())
    return reply.code(422).send({
      error: 'Validation Error',
      message: "Request doesn't match the schema",
      statusCode: 422,
      issues,
    })
  }

  if (isResponseSerializationError(error)) {
    const issues = formatIssues(error.cause?.issues || [], false)
    return reply.code(500).send({
      error: 'Internal Server Error',
      message: "Response doesn't match the schema",
      statusCode: 500,
      issues,
    })
  }

  if (error instanceof Error) {
    return reply.status(400).send({
      error: 'Error',
      message: error.message,
    })
  }

  return reply.status(500).send({
    error: 'Internal server error',
    message: 'Something went wrong',
  })
}
