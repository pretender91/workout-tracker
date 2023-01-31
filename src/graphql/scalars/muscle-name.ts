import { MuscleName } from "../../value-objects/muscle-name.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("MuscleName", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new Error("must be a string");
    }

    return MuscleName.fromString(value);
  },
});
