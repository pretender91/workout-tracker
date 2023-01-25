import { parsePaginationParams } from "../../libs/pagination.js";
import { FindUserSessions } from "../../modules/sessions/application/find-user-sessions.js";
import { FindUserById } from "../../modules/users/application/find-user-by-id.js";
import { User } from "../../modules/users/domain/user.js";
import { SessionsConnectionSchema } from "../connections/sessions-connection.js";
import { schemaBuilder } from "../schema-builder.js";
import { NodeSchema } from "./node.schema.js";

export const UserSchema = schemaBuilder.objectType(User, {
  name: "User",
  isTypeOf: (value) => value instanceof User,
  interfaces: [NodeSchema],
  fields: (t) => ({
    username: t.expose("username", { type: "Username" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    sessions: t.field({
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
      resolve: async (user, args, context) => {
        const pagination = parsePaginationParams(args);

        const findUserSessions = new FindUserSessions(
          { user, pagination },
          context
        );

        return findUserSessions.execute();
      },
    }),
  }),
});

schemaBuilder.queryField("user", (t) =>
  t.field({
    type: UserSchema,
    nullable: true,
    args: {
      id: t.arg({ type: "Id", required: true }),
    },
    resolve: async (_root, args, context) => {
      const findUserById = new FindUserById(args, context);
      return findUserById.execute();
    },
  })
);
