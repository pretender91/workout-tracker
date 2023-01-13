import { Entity } from "../../libs/entity/entity.js";
import { schemaBuilder } from "../schema-builder.js";

export const NodeSchema = schemaBuilder.interfaceType(Entity, {
  name: "Node",
  fields: (t) => ({
    id: t.expose("id", { type: "Id" }),
  }),
});
