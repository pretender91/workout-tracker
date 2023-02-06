import { UpdateWorkout } from "../../modules/workouts/application/update-workout.js";
import { WorkoutSchema } from "../node/workout.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("updateWorkout", (t) =>
  t.field({
    type: WorkoutSchema,
    args: {
      id: t.arg({ type: "Id", required: true }),
      date: t.arg({ type: "Date", required: true }),
    },
    authScopes: {
      admin: true,
      user: true,
    },
    resolve: async (_root, args, context) => {
      const updateWorkout = new UpdateWorkout(context);
      return updateWorkout.execute(args);
    },
  })
);
