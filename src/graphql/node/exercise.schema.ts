import { Exercise } from "../../modules/exercises/domain/exercise.js";
import { FindUserById } from "../../modules/users/application/find-user-by-id.js";
import { schemaBuilder } from "../schema-builder.js";
import { NodeSchema } from "./node.schema.js";
import { UserSchema } from "./user.schema.js";

export const ExerciseSchema = schemaBuilder.objectType(Exercise, {
  name: "Exercise",
  isTypeOf: (value) => value instanceof Exercise,
  interfaces: [NodeSchema],
  fields: (t) => ({
    name: t.expose("name", { type: "ExerciseName" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
    createdById: t.expose("createdById", { type: "Id" }),
    createdBy: t.field({
      type: UserSchema,
      resolve: async (exercise, _args, context) => {
        const findUserById = new FindUserById(context);

        const author = await findUserById.execute({ id: exercise.createdById });

        if (!author) {
          throw new Error("Author not found");
        }

        return author;
      },
    }),
    muscles: t.expose("muscles", { type: ["MuscleName"] }),
  }),
});
