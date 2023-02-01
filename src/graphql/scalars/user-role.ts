import { UserRole } from "../../value-objects/user-role.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("UserRole", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new Error("must be a string");
    }

    return UserRole.fromString(value);
  },
});
