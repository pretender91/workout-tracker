import { FindUserById } from "../../modules/users/application/find-user-by-id.js";
import { Workout } from "../../modules/workouts/domain/workout.js";
import { schemaBuilder } from "../schema-builder.js";
import { NodeSchema } from "./node.schema.js";
import { UserSchema } from "./user.schema.js";

export const WorkoutSchema = schemaBuilder.objectType(Workout, {
  name: "Workout",
  isTypeOf: (value) => value instanceof Workout,
  interfaces: [NodeSchema],
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
    date: t.expose("date", { type: "Date" }),
    userId: t.expose("userId", { type: "Id" }),
    user: t.field({
      type: UserSchema,
      resolve: async (workout, _args, context) => {
        const findUserById = new FindUserById(context);
        return findUserById.execute({ id: workout.userId });
      },
    }),
  }),
});
