import { parsePaginationParams } from "../../libs/pagination.js";
import { FindWorkouts } from "../../modules/workouts/application/find-workouts.js";
import { WorkoutsConnectionSchema } from "../connections/workouts-connection.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.queryField("workouts", (t) =>
  t.field({
    authScopes: {
      admin: true,
      user: true,
    },
    type: WorkoutsConnectionSchema,
    args: {
      userId: t.arg({
        type: "Id",
        required: false,
      }),
      dateBefore: t.arg({
        type: "Date",
        required: false,
      }),
      dateAfter: t.arg({
        type: "Date",
        required: false,
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
      const findWorkouts = new FindWorkouts(context);
      return findWorkouts.execute({
        filter: {
          userId: args.userId ?? undefined,
          dateBefore: args.dateBefore ?? undefined,
          dateAfter: args.dateAfter ?? undefined,
        },
        pagination: parsePaginationParams(args),
      });
    },
  })
);
