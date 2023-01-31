import { CreateExercise } from "../../modules/exercises/application/create-exercise.js";
import { ExerciseSchema, MuscleEnum } from "../node/exercise.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("createExercise", (t) =>
  t.field({
    type: ExerciseSchema,
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    args: {
      name: t.arg({ type: "ExerciseName", required: true }),
      muscles: t.arg({ type: [MuscleEnum], required: true }),
    },
    resolve: async (_root, args, context) => {
      const createExercise = new CreateExercise(
        {
          name: args.name,
          muscles: args.muscles,
        },
        context
      );

      return createExercise.execute();
    },
  })
);
