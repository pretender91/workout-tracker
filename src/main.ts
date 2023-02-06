import { fastify, FastifyReply, FastifyRequest } from "fastify";
import { createYoga } from "graphql-yoga";
import { Context } from "./context.js";
import { schema } from "./graphql/schema.js";
import { Token } from "./value-objects/token.js";

const app = fastify({ logger: true });

const yoga = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
  schema: schema,
  maskedErrors: false,
  context: async (ctx) => {
    const staticContext = new Context();

    await staticContext.loadCurrents(
      Token.fromString(
        ctx.req.headers.authorization?.replace("Bearer ", "") ?? ""
      )
    );

    return Context;
  },
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

await app.listen({
  port: 4000,
  host: "0.0.0.0",
});
