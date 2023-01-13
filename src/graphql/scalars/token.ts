import { Token } from "../../value-objects/token.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("Token", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new Error("must be a string");
    }

    return Token.fromString(value);
  },
});
