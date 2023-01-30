import { UpdateMuscle } from "../../modules/muscles/application/update-muscle.js";
import { MuscleSchema } from "../node/muscle.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("updateMuscle", (t) =>
  t.field({
    type: MuscleSchema,
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    args: {
      id: t.arg({ type: "Id", required: true }),
      name: t.arg({ type: "String", required: true }),
    },

    resolve: async (_root, args, context) => {
      const updateMuscle = new UpdateMuscle(args, context);

      return updateMuscle.execute();
    },
  })
);
