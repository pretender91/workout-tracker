import { FindWorkoutById } from "../../modules/workouts/application/find-workout-by-id.js";
import { WorkoutSchema } from "../node/workout.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.queryField("workout", (t) =>
  t.field({
    type: WorkoutSchema,
    authScopes: {
      user: true,
      admin: true,
    },
    args: {
      id: t.arg({
        type: "Id",
        required: true,
      }),
    },
    resolve: async (_root, args, context) => {
      const findWorkoutById = new FindWorkoutById(context);
      return findWorkoutById.execute(args);
    },
  })
);
