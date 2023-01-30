import { parsePaginationParams } from "../../libs/pagination.js";
import { FindUserSessions } from "../../modules/sessions/application/find-user-sessions.js";
import { FindUserById } from "../../modules/users/application/find-user-by-id.js";
import type { User } from "../../modules/users/domain/user.js";
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
        return null;
      }

      let user: User | null = null;

      if (args.userId) {
        const findUserById = new FindUserById(
          {
            id: args.userId,
          },
          context
        );
        user = await findUserById.execute();
      } else {
        user = context.currentUser;
      }

      if (!user) {
        return null;
      }

      const pagination = parsePaginationParams(args);
      const findUserSessions = new FindUserSessions(
        { user, pagination },
        { sessionGateway: context.sessionGateway }
      );

      return findUserSessions.execute();
    },
  })
);
