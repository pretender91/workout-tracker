import { Password } from "../../value-objects/password.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("Password", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new Error("must be a string");
    }

    return Password.fromString(value);
  },
});
