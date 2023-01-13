import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("Date", {
  serialize: (value) => {
    console.log("serialize", value, typeof value);
    return value.toISOString();
  },
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new Error("must be a string");
    }
    
    return new Date(value);
  },
});
