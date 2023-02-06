import { RemoveWorkout } from "../../modules/workouts/application/remove-workout.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("removeWorkout", (t) =>
  t.field({
    type: "Id",
    authScopes: {
      admin: true,
    },
    args: {
      id: t.arg({ type: "Id", required: true }),
    },
    resolve: async (_root, args, context) => {
      const removeWorkout = new RemoveWorkout(context);
      await removeWorkout.execute(args);
      return args.id;
    },
  })
);
