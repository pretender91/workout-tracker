import { ValueObject } from "../../../../libs/value-object/value-object.js";
import type { Result } from "../../../../libs/result/result.js";
import { StringValidator } from "../../../../libs/validator/string-validator.js";

export class Password extends ValueObject<string> {}

const passwordValidator = StringValidator.minLength(
  8,
  "should be 8 min length"
).maxLength(64, "should be 64 max length");

export const PasswordFactory = {
  fromString(password: string): Result<Password, Error> {
    return passwordValidator
      .execute(password)
      .map(() => new Password(password))
      .mapFailure((error) => new Error(error));
  },
  fromHash(_hash: string): Result<Password, Error> {
    throw new Error("Not implemented");
  },
};
