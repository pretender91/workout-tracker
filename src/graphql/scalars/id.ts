import { Id } from "../../value-objects/id.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("Id", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new Error("must be a string");
    }

    return Id.fromString(value);
  },
});
