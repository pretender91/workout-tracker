import { Quantity } from "../../value-objects/quantity.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("Quantity", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "number") {
      throw new Error("must be a number");
    }

    return Quantity.fromNumber(value);
  },
});
