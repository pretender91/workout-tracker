import { StringValidator } from "../libs/validator/string-validator.js";
import { ValueObject } from "../libs/value-object/value-object.js";

export class Username extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(value: string) {
    return new StringValidator()
      .isRequired()
      .minLength(1)
      .maxLength(15)
      .hasPattern(/[a-zA-z1-9_]/)
      .execute(value)
      .map(() => new Username(value))
      .getOrThrow();
  }
}
