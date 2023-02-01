import { Connection, parsePaginationParams } from "../../libs/pagination.js";
import { FindUserSessions } from "../../modules/sessions/application/find-user-sessions.js";
import type { Session } from "../../modules/sessions/domain/session.js";
import { FindUserById } from "../../modules/users/application/find-user-by-id.js";
import type { User } from "../../modules/users/domain/user.js";
import { SessionsConnectionSchema } from "../connections/sessions-connection.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.queryField("sessions", (t) =>
  t.field({
    authScopes: {
      admin: true,
      user: true,
    },
    type: SessionsConnectionSchema,
    args: {
      userId: t.arg({
        type: "Id",
        required: false,
      }),
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
        return Connection.empty<Session>();
      }

      let user: User | null;

      if (args.userId) {
        const findUserById = new FindUserById(context);
        user = await findUserById.execute({ id: args.userId });
      } else {
        user = context.currentUser;
      }

      if (!user) {
        return Connection.empty<Session>();
      }

      const pagination = parsePaginationParams(args);
      const findUserSessions = new FindUserSessions({
        sessionGateway: context.sessionGateway,
      });

      return findUserSessions.execute({ user, pagination });
    },
  })
);
