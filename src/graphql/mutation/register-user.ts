import type { Session } from "../../modules/sessions/domain/session.js";
import { RegisterUser } from "../../modules/users/application/register-user.js";
import type { User } from "../../modules/users/domain/user.js";
import { SessionSchema } from "../node/session.schema.js";
import { UserSchema } from "../node/user.schema.js";
import { schemaBuilder } from "../schema-builder.js";

const RegisterUserSchema = schemaBuilder
  .objectRef<{
    user: User;
    session: Session;
  }>("RegisterUserResult")
  .implement({
    fields: (t) => ({
      user: t.expose("user", { type: UserSchema }),
      session: t.expose("session", { type: SessionSchema }),
    }),
  });

schemaBuilder.mutationField("registerUser", (t) =>
  t.field({
    type: RegisterUserSchema,
    args: {
      username: t.arg({ type: "Username", required: true }),
      password: t.arg({ type: "Password", required: true }),
    },
    resolve: async (_root, args, context) => {
      const registerUser = new RegisterUser(args, context);
      return registerUser.execute();
    },
  })
);
