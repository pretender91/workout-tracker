import { Exercise } from "../../modules/exercises/domain/exercise.js";
import { schemaBuilder } from "../schema-builder.js";
import { NodeSchema } from "./node.schema.js";

export const ExerciseSchema = schemaBuilder.objectType(Exercise, {
  name: "Exercise",
  isTypeOf: (value) => value instanceof Exercise,
  interfaces: [NodeSchema],
  fields: (t) => ({
    name: t.expose("name", { type: "String" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
  }),
});
