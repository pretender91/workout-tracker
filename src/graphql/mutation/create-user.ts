import { CreateUser } from "../../modules/users/application/create-user.js";
import { UserSchema } from "../node/user.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("createUser", (t) =>
  t.field({
    type: UserSchema,
    authScopes: {
      unauthenticated: true,
    },
    args: {
      username: t.arg({ type: "Username", required: true }),
      password: t.arg({ type: "Password", required: true }),
    },
    resolve: async (_root, args, context) => {
      const createUser = new CreateUser(context);
      return createUser.execute(args);
    },
  })
);
