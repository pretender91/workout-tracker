import { createYoga } from "graphql-yoga";
import { fastify, FastifyReply, FastifyRequest } from "fastify";
import { schema } from "./schema.js";

const app = fastify({ logger: true });

const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  // Integrate Fastify logger
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
  schema: schema,
  maskedErrors: false,
});

app.route({
  url: "/graphql",
  method: ["GET", "POST", "OPTIONS"],
  handler: async (req, reply) => {
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply,
    });
    //@ts-ignore
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });
    reply.status(response.status);
    reply.send(response.body);
    return reply;
  },
});

await app.listen(4000);
