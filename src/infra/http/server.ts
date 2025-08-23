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

const server = fastify();

server.register(fastifyCors, {
  origin: "*",
});

server.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    
    info: {
      title: "Order Service",
      description: "Documentação oficial da API do pass-in",
      version: "1.0.0",
    },
  },

  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});


server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

registerAppModules(server)

server.get('/', async () => {
  return { message: 'Hello from Fastify!' }
});

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at ${address}');
});