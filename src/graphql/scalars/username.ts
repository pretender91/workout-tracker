import { Username } from "../../value-objects/username.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("Username", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new Error("must be a string");
    }

    return Username.fromString(value);
  },
});
