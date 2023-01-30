import { RemoveMuscle } from "../../modules/muscles/application/remove-muscle.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("removeMuscle", (t) =>
  t.field({
    type: "Id",
    nullable: true,
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    args: {
      id: t.arg({ type: "Id", required: true }),
    },
    resolve: async (_root, args, context) => {
      const removeMuscle = new RemoveMuscle(
        {
          id: args.id,
        },
        context
      );

      return removeMuscle.execute();
    },
  })
);
