import { createHmac } from "node:crypto";
import { StringValidator } from "../libs/validator/string-validator.js";
import { ValueObject } from "../libs/value-object/value-object.js";

export class Password extends ValueObject<string> {
  private constructor(hash: string) {
    super(hash);
  }

  public static fromString(password: string, salt: string = "Keklol1@") {
    return new StringValidator()
      .minLength(8)
      .maxLength(64)
      .execute(password)
      .map(() => {
        const hmac = createHmac("sha256", salt);
        hmac.update(password);
        return new Password(hmac.digest("hex"));
      })
      .getOrThrow();
  }

  public static fromHash(hash: string) {
    return new Password(hash);
  }
}
