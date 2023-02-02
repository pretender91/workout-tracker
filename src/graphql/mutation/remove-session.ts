import { RemoveSession } from "../../modules/sessions/application/remove-session.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("removeSession", (t) =>
  t.field({
    type: "Id",
    nullable: true,
    authScopes: {
      user: true,
      admin: true,
    },
    args: {
      token: t.arg({ type: "Token", required: true }),
    },
    resolve: async (_root, args, context) => {
      const removeSession = new RemoveSession(context);
      return removeSession.execute(args);
    },
  })
);
