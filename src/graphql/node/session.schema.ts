import { Session } from "../../modules/sessions/domain/session.js";
import { FindUserById } from "../../modules/users/application/find-user-by-id.js";
import { schemaBuilder } from "../schema-builder.js";
import { NodeSchema } from "./node.schema.js";
import { UserSchema } from "./user.schema.js";

export const SessionSchema = schemaBuilder.objectType(Session, {
  name: "Session",
  interfaces: [NodeSchema],
  isTypeOf: (value) => value instanceof Session,
  fields: (t) => ({
    userId: t.expose("userId", { type: "Id" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    token: t.expose("token", {
      type: "Token",
    }),
    user: t.field({
      type: UserSchema,
      resolve: async (root, _args, context) => {
        const findUserById = new FindUserById({ id: root.userId }, context);
        return findUserById.execute();
      },
    }),
  }),
});
