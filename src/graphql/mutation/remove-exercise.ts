import { RemoveExercise } from "../../modules/exercises/application/remove-exercise.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("removeExercise", (t) =>
  t.field({
    type: "Id",
    nullable: true,
    authScopes: {
      unauthenticated: false,
      user: true,
      admin: true,
    },
    args: {
      id: t.arg({ type: "Id", required: true }),
    },
    resolve: async (_root, args, context) => {
      const removeExercise = new RemoveExercise(args, context);

      return removeExercise.execute();
    },
  })
);
