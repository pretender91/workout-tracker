import { ValueObject } from "../../../../libs/value-object/value-object.js";
import { Result } from "../../../../libs/result/result.js";
import { StringValidator } from "../../../../libs/validator/string-validator.js";
import { createHmac } from "node:crypto";

export class Password extends ValueObject<string> {
  private constructor(hash: string) {
    super(hash);
  }

  public static fromString(password: string): Result<Password, Error> {
    return StringValidator.minLength(8, "should be 8 min length")
      .maxLength(64, "should be 64 max length")
      .execute(password)
      .map(() => {
        const hmac = createHmac("sha256", "Keklol1@");
        hmac.update(password);
        return new Password(hmac.digest("hex"));
      })
      .mapFailure((error) => new Error(error));
  }

  public static fromHash(hash: string): Result<Password, Error> {
    return Result.success(new Password(hash));
  }
}
