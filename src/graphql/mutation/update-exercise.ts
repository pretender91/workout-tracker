import { UpdateExercise } from "../../modules/exercises/application/update-exercise.js";
import { ExerciseSchema } from "../node/exercise.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("updateExercise", (t) =>
  t.field({
    type: ExerciseSchema,
    authScopes: {
      admin: true,
    },
    args: {
      id: t.arg({ type: "Id", required: true }),
      name: t.arg({
        type: "ExerciseName",
        required: true,
      }),
      muscles: t.arg({
        type: ["MuscleName"],
        required: true,
      }),
    },
    resolve: async (_root, args, context) => {
      const updateExercise = new UpdateExercise(context);
      return updateExercise.execute(args);
    },
  })
);
