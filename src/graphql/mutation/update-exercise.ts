import { UpdateExercise } from "../../modules/exercises/application/update-exercise.js";
import { ExerciseSchema, MuscleEnum } from "../node/exercise.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("updateExercise", (t) =>
  t.field({
    type: ExerciseSchema,
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    args: {
      id: t.arg({ type: "Id", required: true }),
      name: t.arg({
        type: "String",
        required: true,
      }),
      muscles: t.arg({
        type: [MuscleEnum],
        required: true,
      }),
    },
    resolve: async (_root, args, context) => {
      const updateExercise = new UpdateExercise(args, context);
      return updateExercise.execute();
    },
  })
);
