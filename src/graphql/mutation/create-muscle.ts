import { CreateMuscle } from "../../modules/muscles/application/create-muscle.js";
import { MuscleSchema } from "../node/muscle.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("createMuscle", (t) =>
  t.field({
    type: MuscleSchema,
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    args: {
      name: t.arg({ type: "String", required: true }),
    },
    resolve: async (_root, args, context) => {
      const createMuscle = new CreateMuscle(
        {
          name: args.name,
        },
        context
      );

      return createMuscle.execute();
    },
  })
);
