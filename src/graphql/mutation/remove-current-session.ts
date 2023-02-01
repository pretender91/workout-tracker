import { RemoveSession } from "../../modules/sessions/application/remove-session.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("removeCurrentSession", (t) =>
  t.field({
    type: "Id",
    nullable: true,
    authScopes: {
      user: true,
      admin: false,
    },
    args: {},
    resolve: async (_root, _args, context) => {
      if (!context.currentSession) {
        return null;
      }
      const removeSession = new RemoveSession(
        { token: context.currentSession.token },
        context
      );
      return removeSession.execute();
    },
  })
);
