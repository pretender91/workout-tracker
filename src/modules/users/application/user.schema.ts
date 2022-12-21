import { schemaBuilder } from "../../../schema-builder.js";
import { User } from "../domain/user.js";
import { Id } from "../../../libs/value-object/id.js";
import { Username } from "../domain/value-objects/username.js";
import { Password } from "../domain/value-objects/password.js";
import { CreateUser } from "./create-user.js";

const UserSchema = schemaBuilder.objectRef<User>("User");

schemaBuilder.objectType(UserSchema, {
  name: "User",
  isTypeOf: (value) => value instanceof User,
  description: "User of the application",
  fields: (t) => ({
    id: t.id({
      resolve: (user) => user.id.valueOf(),
    }),
    username: t.string({
      resolve: (user) => user.username.valueOf(),
    }),
    createdAt: t.string({
      resolve: (user) => user.createdAt.toISOString(),
    }),
  }),
});

schemaBuilder.queryFields((t) => ({
  me: t.field({
    type: UserSchema,
    resolve: () => {
      return User.fromGateway({
        id: Id.generate().getOrThrow().valueOf(),
        username: Username.fromString("aplusd").getOrThrow().valueOf(),
        password: Password.fromString("Keklol1@").getOrThrow().valueOf(),
        createdAt: new Date(),
      }).getOrThrow();
    },
  }),
}));

schemaBuilder.mutationField("createUser", (t) =>
  t.field({
    type: UserSchema,
    errors: {
      types: [AggregateError],
    },
    args: {
      username: t.arg.string({
        description: "User username",
        required: true,
      }),
      password: t.arg.string({
        description: "User password",
        required: true,
      }),
    },
    resolve: async (_root, args, context) => {
      const createUser = new CreateUser(context);
      const createUserResult = await createUser.execute(args);
      return createUserResult.getOrThrow();
    },
  })
);
