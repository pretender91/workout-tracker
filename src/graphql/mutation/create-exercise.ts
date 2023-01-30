import { CreateExercise } from "../../modules/exercises/application/create-exercise.js";
import { ExerciseSchema } from "../node/exercise.schema.js";
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
      name: t.arg({ type: "String", required: true }),
    },
    resolve: async (_root, args, context) => {
      const createExercise = new CreateExercise(
        {
          name: args.name,
        },
        context
      );

      return createExercise.execute();
    },
  })
);
