import { parsePaginationParams } from "../../libs/pagination.js";
import { FindExercises } from "../../modules/exercises/application/find-exercises.js";
import { ExercisesConnectionSchema } from "../connections/exercises-connection.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.queryField("exercises", (t) =>
  t.field({
    type: ExercisesConnectionSchema,
    nullable: true,
    args: {
      createdById: t.arg({
        type: "Id",
      }),
      muscles: t.arg({
        type: ["MuscleName"],
      }),
      name: t.arg({
        type: "ExerciseName",
      }),
      first: t.arg({
        type: "Quantity",
      }),
      after: t.arg({
        type: "Id",
      }),
      last: t.arg({
        type: "Quantity",
      }),
      before: t.arg({
        type: "Id",
      }),
    },
    resolve: async (_root, args, context) => {
      const findExercises = new FindExercises(context);
      return findExercises.execute({
        filter: {
          createdById: args.createdById ?? undefined,
          muscles: args.muscles ?? undefined,
          name: args.name ?? undefined,
        },
        pagination: parsePaginationParams(args),
      });
    },
  })
);
