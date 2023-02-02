import { RemoveExercise } from "../../modules/exercises/application/remove-exercise.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.mutationField("removeExercise", (t) =>
  t.field({
    type: "Id",
    nullable: true,
    authScopes: {
      admin: true,
    },
    args: {
      id: t.arg({ type: "Id", required: true }),
    },
    resolve: async (_root, args, context) => {
      const removeExercise = new RemoveExercise(context);

      return removeExercise.execute({ id: args.id });
    },
  })
);
