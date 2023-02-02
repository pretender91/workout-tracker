import { RemoveSession } from "../../modules/sessions/application/remove-session.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("removeCurrentSession", (t) =>
  t.field({
    type: "Id",
    nullable: true,
    authScopes: {
      user: true,
      admin: true,
    },
    args: {},
    resolve: async (_root, _args, context) => {
      if (!context.currentSession) {
        return null;
      }
      const removeSession = new RemoveSession(context);
      return removeSession.execute({ token: context.currentSession.token });
    },
  })
);
