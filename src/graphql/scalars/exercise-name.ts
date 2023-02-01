import { ExerciseName } from "../../value-objects/exercise-name.js";
import { schemaBuilder } from "../schema-builder.js";

schemaBuilder.scalarType("ExerciseName", {
  serialize: (value) => value.valueOf(),
  parseValue: (value) => {
    if (typeof value !== "string") {
      throw new Error("must be a string");
    }

    return ExerciseName.fromString(value);
  },
});
