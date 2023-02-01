import { StringValidator } from "../libs/validator/string-validator.js";
import { ValueObject } from "../libs/value-object/value-object.js";

export class ExerciseName extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(value: string) {
    return new StringValidator()
      .isRequired()
      .minLength(3)
      .maxLength(64)
      .hasPattern(/[a-zA-z1-9_]/)
      .execute(value)
      .map(() => new ExerciseName(value))
      .getOrThrow();
  }
}
