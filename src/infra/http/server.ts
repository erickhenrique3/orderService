import fastify from 'fastify'
import { registerAppModules } from '../../app/index'
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";

import { startKafka } from '../../infra/kafka/producer'
import registerPlugins from './pluglins';
import registerAuthenticate from '../middlewares/authenticate';
import { errorHandler } from '../errors/errorHandler';

async function main() {
  const server = fastify();

  server.register(fastifyCors, { origin: "*" });

  server.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Order Service API",
        description: "API para gerenciamento de pedidos - Microserviço de Pedidos",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(fastifySwaggerUI, { routePrefix: "/docs" });

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);
  server.setErrorHandler(errorHandler)

  await registerPlugins(server)
  await registerAuthenticate(server)
  await registerAppModules(server)

  server.get('/', async () => {
    return { message: 'Hello from Fastify!' }
  });

  try {
    await startKafka()
    await server.listen({ port: 3000, host: '0.0.0.0' })
    console.log(`🚀 Server running on http://localhost:3000`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
