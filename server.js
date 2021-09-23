const fastify = require('fastify')({ logger: true });
const fs = require('fs');

const port = 3000;

fastify.get('/', async (request, reply) => {
  await fs.readFile('./data/response.txt', function (err, data) {
    if (err) {
      throw err;
    }
    reply.send({ hello: data.toString().trim() });
  });
  return reply;
});

const start = async () => {
  try {
    await fastify.listen(port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
