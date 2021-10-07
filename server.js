import fastify from 'fastify';
import { access, constants, fstat } from 'fs';
import { readFile } from 'fs/promises';

const port = 3000;
const responsePath = './data/response.txt'

const server = fastify({logger: true});

server.get('/', (request, reply) => {
  access(responsePath, constants.W_OK, async (err) => {
    if (err) {
      const data = await readFile('./data/response.txt')
      reply.code(200);
      reply.send({ hello: data.toString().trim() });
    } else {
      reply.code(400);
      reply.send({ error: "response.txt should not be writable" });
    }
  })
});

const start = async () => {
  try {
    await server.listen(port)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
