import { CreateWorkout } from "../../modules/workouts/application/create-workout.js";
import { WorkoutSchema } from "../node/workout.schema.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("createWorkout", (t) =>
  t.field({
    type: WorkoutSchema,
    authScopes: {
      user: true,
      admin: true,
    },
    args: {
      date: t.arg({ type: "Date", required: true }),
    },
    resolve: async (_root, args, context) => {
      const createWorkout = new CreateWorkout(context);
      return createWorkout.execute(args);
    },
  })
);
