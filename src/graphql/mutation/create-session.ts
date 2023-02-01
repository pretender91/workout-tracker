import { CreateSession } from "../../modules/sessions/application/create-session.js";
import { SessionSchema } from "../node/session.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("createSession", (t) =>
  t.field({
    type: SessionSchema,
    authScopes: {
      unauthenticated: true,
    },
    args: {
      username: t.arg({ type: "Username", required: true }),
      password: t.arg({ type: "Password", required: true }),
    },
    resolve: async (_root, args, context) => {
      const createSession = new CreateSession(args, context);
      return createSession.execute();
    },
  })
);
