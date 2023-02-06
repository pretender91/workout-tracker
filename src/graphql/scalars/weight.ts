import { Weight } from "../../value-objects/weight.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("Weight", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "number") {
      throw new Error("must be a number");
    }

    return Weight.fromNumber(value);
  },
});
