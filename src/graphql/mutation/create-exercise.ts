import { CreateExercise } from "../../modules/exercises/application/create-exercise.js";
import { ExerciseSchema } from "../node/exercise.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("createExercise", (t) =>
  t.field({
    type: ExerciseSchema,
    authScopes: {
      admin: true,
    },
    args: {
      name: t.arg({ type: "ExerciseName", required: true }),
      muscles: t.arg({ type: ["MuscleName"], required: true }),
    },
    resolve: async (_root, args, context) => {
      const createExercise = new CreateExercise(context);
      return createExercise.execute(args);
    },
  })
);
