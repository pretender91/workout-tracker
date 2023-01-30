import { Muscle } from "../..//modules/muscles/domain/muscle.js";
import { schemaBuilder } from "../schema-builder.js";
import { NodeSchema } from "./node.schema.js";

export const MuscleSchema = schemaBuilder.objectType(Muscle, {
  name: "Muscle",
  isTypeOf: (value) => value instanceof Muscle,
  interfaces: [NodeSchema],
  fields: (t) => ({
    name: t.expose("name", { type: "String" }),
    createdAt: t.expose("createdAt", { type: "Date" }),
    updatedAt: t.expose("updatedAt", { type: "Date" }),
  }),
});
