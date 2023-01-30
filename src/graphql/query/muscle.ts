import { FindMuscleById } from "../../modules/muscles/application/find-muscle-by-id.js";
import { MuscleSchema } from "../node/muscle.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.queryField("muscle", (t) =>
  t.field({
    type: MuscleSchema,
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    nullable: true,
    args: {
      id: t.arg({ type: "Id", required: true }),
    },
    resolve: async (_root, args, context) => {
      const findMuscleById = new FindMuscleById(
        {
          id: args.id,
        },
        context
      );
      return findMuscleById.execute();
    },
  })
);
