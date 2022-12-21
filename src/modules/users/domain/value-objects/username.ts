import { ValueObject } from "../../../../libs/value-object/value-object.js";
import type { Result } from "../../../../libs/result/result.js";
import { StringValidator } from "../../../../libs/validator/string-validator.js";

export class Username extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static fromString(username: string): Result<Username, Error> {
    return StringValidator.minLength(1, "should be 1 min length")
      .maxLength(15, "should be 15 max length")
      .hasPattern(/[a-zA-z1-9_]/, "should contain only latin chars and numbers")
      .execute(username)
      .map(() => new Username(username))
      .mapFailure((error) => new Error(error));
  }
}


