import { FindExerciseById } from "../../modules/exercises/application/find-exercise-by-id.js";
import { ExerciseSchema } from "../node/exercise.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.queryField("exercise", (t) =>
  t.field({
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    type: ExerciseSchema,
    nullable: true,
    args: {
      id: t.arg({
        type: "Id",
        required: true,
      }),
    },
    resolve: async (_root, args, context) => {
      const findExerciseById = new FindExerciseById(
        {
          id: args.id,
        },
        context
      );

      return findExerciseById.execute();
    },
  })
);
