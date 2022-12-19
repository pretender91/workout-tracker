import { schemaBuilder } from "../../../schema-builder.js";
import { User } from "../domain/user.js";
import { Id } from "../../../libs/value-object/id.js";
import { Username } from "../domain/value-objects/username.js";
import { Password } from "../domain/value-objects/password.js";
import { CreateUser } from "./create-user.js";

schemaBuilder.objectType(User, {
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
    type: User,
    resolve: () => {
      return new User({
        id: Id.generate(),
        username: new Username("aplusd"),
        password: new Password("Keklol1@"),
        createdAt: new Date(),
      });
    },
  }),
}));

schemaBuilder.mutationField("createUser", (t) =>
  t.field({
    type: User,
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
    resolve: async (_root, args) => {
      const createUser = new CreateUser();
      const createUserResult = await createUser.execute(args);
      return createUserResult.getOrThrow();
    },
  })
);
