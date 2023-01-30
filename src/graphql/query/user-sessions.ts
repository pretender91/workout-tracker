import { parsePaginationParams } from "../../libs/pagination.js";
import { FindUserSessions } from "../../modules/sessions/application/find-user-sessions.js";
import { SessionsConnectionSchema } from "../connections/sessions-connection.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.queryField("sessions", (t) =>
  t.field({
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    type: SessionsConnectionSchema,
    nullable: true,
    args: {
      first: t.arg({
        type: "Quantity",
      }),
      after: t.arg({
        type: "Id",
      }),
      last: t.arg({
        type: "Quantity",
      }),
      before: t.arg({
        type: "Id",
      }),
    },
    resolve: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new Error("User not found");
      }

      const pagination = parsePaginationParams(args);
      const findUserSessions = new FindUserSessions(
        { user: context.currentUser, pagination },
        context
      );

      return findUserSessions.execute();
    },
  })
);
