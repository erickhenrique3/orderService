import fastify from 'fastify'
import { registerAppModules } from '../../app/index'

const server = fastify();

registerAppModules(server)

server.get('/', async () => {
  return { message: 'Hello from Fastify!' }
});

server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
