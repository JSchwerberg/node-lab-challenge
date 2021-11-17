import fastify from 'fastify';
import { access, constants, fstat } from 'fs';
import { readFile } from 'fs/promises';

const address = '127.0.0.1';
const port = 3000;
const responsePath = './data/response.txt'

const server = fastify({logger: true});

server.get('/', (request, reply) => {
  reply.code(200);
  reply.send({ hello: 'world' });
});

const start = async () => {
  try {
    await server.listen(port, address)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
